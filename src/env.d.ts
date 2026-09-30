/// <reference types="astro/client" />

// Secrets are set with `wrangler secret put` and only appear in generated types
// when a local .dev.vars exists, so declare them here for CI.
declare namespace Cloudflare {
    interface Env {
        TURNSTILE_SECRET: string;
        RESEND_API_KEY: string;
        CONTACT_DRY_RUN?: string;
    }
}
