import { env } from 'cloudflare:workers'
import type { APIRoute } from 'astro'
import {
    buildEmail,
    parseContact,
    RATE_LIMIT_TTL_SECONDS,
    rateLimitKey,
} from '../../lib/contact'

export const prerender = false

const EXPECTED_ACTION = 'contact'

const forbidden = () => new Response('forbidden', { status: 403 })
const failure = (status: number, error: string) =>
    Response.json({ ok: false, error }, { status })

export const POST: APIRoute = async ({ request, clientAddress }) => {
    const form = await request.formData()

    const parsed = parseContact(form)
    // Pretend success so bots don't learn the honeypot exists.
    if (parsed.kind === 'bot') return Response.json({ ok: true })
    if (parsed.kind === 'invalid') return failure(400, 'invalid')

    const limitKey = rateLimitKey(clientAddress)
    if (await env.RATE_LIMIT.get(limitKey)) return failure(429, 'rate_limited')

    const expectedHostnames = new Set(
        (env.TURNSTILE_HOSTNAMES ?? '')
            .split(',')
            .map((hostname) => hostname.trim())
            .filter(Boolean),
    )

    const token = form.get('cf-turnstile-response')
    if (
        typeof token !== 'string' ||
        token.length === 0 ||
        token.length > 2048 ||
        expectedHostnames.size === 0 ||
        !env.TURNSTILE_SECRET
    ) {
        return forbidden()
    }

    let result: {
        success?: boolean
        action?: string
        hostname?: string
        metadata?: { result_with_testing_key?: boolean }
    }
    try {
        const verify = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                signal: AbortSignal.timeout(10_000),
                body: new URLSearchParams({
                    secret: env.TURNSTILE_SECRET,
                    response: token,
                    remoteip: clientAddress,
                }),
            },
        )
        if (!verify.ok) throw new Error(`siteverify ${verify.status}`)
        result = await verify.json()
    } catch {
        return forbidden()
    }

    // Cloudflare's dummy secrets (local dev only) return no action, so skip that check for them.
    const testing = result.metadata?.result_with_testing_key === true
    if (
        result.success !== true ||
        (!testing && result.action !== EXPECTED_ACTION) ||
        !result.hostname ||
        !expectedHostnames.has(result.hostname)
    ) {
        return forbidden()
    }

    // Claim the slot before sending so concurrent submissions can't both pass;
    // release it if delivery fails so the sender can retry.
    await env.RATE_LIMIT.put(limitKey, '1', {
        expirationTtl: RATE_LIMIT_TTL_SECONDS,
    })

    // Local dev only: log instead of sending. Never set in wrangler.jsonc or prod secrets.
    if (env.CONTACT_DRY_RUN === '1') {
        console.log(
            'contact dry run',
            buildEmail(parsed.data, env.CONTACT_FROM, env.CONTACT_TO),
        )
        return Response.json({ ok: true })
    }

    try {
        const send = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(10_000),
            body: JSON.stringify(
                buildEmail(parsed.data, env.CONTACT_FROM, env.CONTACT_TO),
            ),
        })
        if (!send.ok) throw new Error(`resend ${send.status}`)
    } catch (error) {
        console.error('contact delivery failed', error)
        await env.RATE_LIMIT.delete(limitKey)
        return failure(502, 'delivery_failed')
    }

    return Response.json({ ok: true })
}
