export const RATE_LIMIT_TTL_SECONDS = 3600;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactInput = { name: string; email: string; message: string };

export type ParsedContact = { kind: 'ok'; data: ContactInput } | { kind: 'bot' } | { kind: 'invalid' };

const field = (form: FormData, key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
};

export const parseContact = (form: FormData): ParsedContact => {
    // Real users never see the honeypot; anything in it is a bot.
    if (field(form, 'website') !== '') return { kind: 'bot' };

    const name = field(form, 'name');
    const email = field(form, 'email');
    const message = field(form, 'message');
    if (
        !name ||
        name.length > MAX_NAME ||
        !email ||
        email.length > MAX_EMAIL ||
        !EMAIL_SHAPE.test(email) ||
        !message ||
        message.length > MAX_MESSAGE
    ) {
        return { kind: 'invalid' };
    }
    return { kind: 'ok', data: { name, email, message } };
};

export const rateLimitKey = (ip: string) => `contact:${ip}`;

// Names go into the subject line, so strip anything that could break the header.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

export const buildEmail = (input: ContactInput, from: string, to: string) => ({
    from,
    to: [to],
    reply_to: input.email,
    subject: `taraxvoid.net contact: ${oneLine(input.name)}`,
    text: `From: ${oneLine(input.name)} <${input.email}>\n\n${input.message}`
});
