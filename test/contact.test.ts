import { describe, expect, it } from 'vitest';
import { buildEmail, parseContact, rateLimitKey } from '../src/lib/contact';

const form = (fields: Record<string, string>) => {
    const data = new FormData();
    for (const [key, value] of Object.entries(fields)) data.set(key, value);
    return data;
};

const valid = { name: 'Ada', email: 'ada@example.com', message: 'hello', website: '' };

describe('parseContact', () => {
    it('accepts a valid submission and trims fields', () => {
        expect(parseContact(form({ ...valid, name: '  Ada  ' }))).toEqual({
            kind: 'ok',
            data: { name: 'Ada', email: 'ada@example.com', message: 'hello' }
        });
    });

    it('flags a filled honeypot as a bot, even when the rest is invalid', () => {
        expect(parseContact(form({ ...valid, website: 'http://spam' })).kind).toBe('bot');
        expect(parseContact(form({ website: 'x' })).kind).toBe('bot');
    });

    it.each([
        ['missing name', { name: '' }],
        ['bad email', { email: 'not-an-email' }],
        ['empty message', { message: '   ' }],
        ['oversized message', { message: 'x'.repeat(5001) }],
        ['oversized name', { name: 'x'.repeat(101) }]
    ])('rejects %s', (_label, override) => {
        expect(parseContact(form({ ...valid, ...override })).kind).toBe('invalid');
    });

    it('rejects non-string (file) fields', () => {
        const data = form(valid);
        data.set('message', new File(['x'], 'x.txt'));
        expect(parseContact(data).kind).toBe('invalid');
    });
});

describe('buildEmail', () => {
    it('sets reply_to to the submitter and strips newlines from the subject', () => {
        const email = buildEmail(
            { name: 'Ada\r\nBcc: evil@example.com', email: 'ada@example.com', message: 'hi' },
            'contact@taraxvoid.net',
            'inbox@example.com'
        );
        expect(email.reply_to).toBe('ada@example.com');
        expect(email.to).toEqual(['inbox@example.com']);
        expect(email.subject).not.toMatch(/[\r\n]/);
    });
});

describe('rateLimitKey', () => {
    it('is stable per ip', () => {
        expect(rateLimitKey('1.2.3.4')).toBe(rateLimitKey('1.2.3.4'));
        expect(rateLimitKey('1.2.3.4')).not.toBe(rateLimitKey('1.2.3.5'));
    });
});
