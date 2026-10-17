import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { experience, location } from '../src/data/resume';
import data from '../src/data/resume.json';
import { parseResume } from '../src/lib/resume-parse';

const markdown = readFileSync(new URL('../public/resume.md', import.meta.url), 'utf8');

// Guards the privacy constraint from the design spec: the public resume
// must never carry the legal name or phone number from the private source.
const FORBIDDEN = [/REDACTED/i, /REDACTED/i, /REDACTED_PHONE/];

describe('vendored resume stays redacted', () => {
    const haystack = `${JSON.stringify(data)}\n${markdown}`;

    for (const pattern of FORBIDDEN) {
        it(`never contains ${pattern}`, () => {
            expect(haystack).not.toMatch(pattern);
        });
    }
});

describe('vendored resume', () => {
    it('matches the shape taraxvoid/resumes publishes', () => {
        expect(() => parseResume(data)).not.toThrow();
        expect(() => parseResume({ ...data, version: 2 })).toThrow();
        expect(() => parseResume({ ...data, experience: [] })).toThrow();
        expect(() => parseResume(null)).toThrow();
    });

    it('is the Omaha variant', () => {
        expect(location).toContain('Omaha, NE');
    });

    it('has a Markdown copy from the same build', () => {
        expect(markdown).toContain(location);
        for (const entry of experience) expect(markdown).toContain(entry.org);
    });
});
