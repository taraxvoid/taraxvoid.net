export const RATE_LIMIT_TTL_SECONDS = 3600;

// Keep in sync with the textarea maxlength in ContactForm.astro.
const MAX_MESSAGE = 140;

export type ContactInput = { message: string };

export type ParsedContact = { kind: 'ok'; data: ContactInput } | { kind: 'bot' } | { kind: 'invalid' };

const field = (form: FormData, key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
};

export const parseContact = (form: FormData): ParsedContact => {
    // Real users never see the honeypot; anything in it is a bot.
    if (field(form, 'website') !== '') return { kind: 'bot' };

    const message = field(form, 'message');
    if (!message || message.length > MAX_MESSAGE) return { kind: 'invalid' };
    return { kind: 'ok', data: { message } };
};

export const rateLimitKey = (ip: string) => `contact:${ip}`;

export const buildEmail = (input: ContactInput, from: string, to: string) => ({
    from,
    to: [to],
    subject: 'taraxvoid.net contact',
    text: input.message
});
