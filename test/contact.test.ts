import { describe, expect, it } from 'vitest'
import { buildEmail, parseContact, rateLimitKey } from '../src/lib/contact'

const form = (fields: Record<string, string>) => {
    const data = new FormData()
    for (const [key, value] of Object.entries(fields)) data.set(key, value)
    return data
}

const valid = { message: 'hello', website: '' }

describe('parseContact', () => {
    it('accepts a valid submission and trims fields', () => {
        expect(parseContact(form({ ...valid, message: '  hello  ' }))).toEqual({
            kind: 'ok',
            data: { message: 'hello' },
        })
    })

    it('flags a filled honeypot as a bot, even when the rest is invalid', () => {
        expect(
            parseContact(form({ ...valid, website: 'http://spam' })).kind,
        ).toBe('bot')
        expect(parseContact(form({ website: 'x' })).kind).toBe('bot')
    })

    it('keeps an optional reply-to email when valid', () => {
        expect(
            parseContact(form({ ...valid, email: '  me@example.com ' })),
        ).toEqual({
            kind: 'ok',
            data: { message: 'hello', email: 'me@example.com' },
        })
    })

    it('treats a blank email as absent', () => {
        expect(parseContact(form({ ...valid, email: '  ' }))).toEqual({
            kind: 'ok',
            data: { message: 'hello' },
        })
    })

    it.each([
        ['empty message', { message: '   ' }],
        ['oversized message', { message: 'x'.repeat(141) }],
        ['email without @', { email: 'nope' }],
        ['email with whitespace', { email: 'a b@example.com' }],
        ['oversized email', { email: `${'x'.repeat(250)}@e.co` }],
    ])('rejects %s', (_label, override) => {
        expect(parseContact(form({ ...valid, ...override })).kind).toBe(
            'invalid',
        )
    })

    it('rejects non-string (file) fields', () => {
        const data = form(valid)
        data.set('message', new File(['x'], 'x.txt'))
        expect(parseContact(data).kind).toBe('invalid')
    })
})

describe('buildEmail', () => {
    it('addresses the inbox and uses the message as the body', () => {
        const email = buildEmail(
            { message: 'hi' },
            'contact@taraxvoid.net',
            'inbox@example.com',
        )
        expect(email.from).toBe('contact@taraxvoid.net')
        expect(email.to).toEqual(['inbox@example.com'])
        expect(email.text).toBe('hi')
        expect(email).not.toHaveProperty('reply_to')
    })

    it('sets reply_to when the sender left an email', () => {
        const email = buildEmail(
            { message: 'hi', email: 'me@example.com' },
            'a@b.co',
            'c@d.co',
        )
        expect(email.reply_to).toBe('me@example.com')
    })
})

describe('rateLimitKey', () => {
    it('is stable per ip', () => {
        expect(rateLimitKey('1.2.3.4')).toBe(rateLimitKey('1.2.3.4'))
        expect(rateLimitKey('1.2.3.4')).not.toBe(rateLimitKey('1.2.3.5'))
    })
})
