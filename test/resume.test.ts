import { describe, expect, it } from 'vitest';
import { coreSkills, education, experience, location, summary } from '../src/data/resume';

// Guards the privacy constraint from the design spec: the public resume
// data must never carry the legal name or phone number from the private,
// gitignored source resume.
const FORBIDDEN = [/REDACTED/i, /REDACTED/i, /REDACTED_PHONE/];

describe('resume data stays redacted', () => {
    const haystack = JSON.stringify({ summary, location, experience, coreSkills, education });

    for (const pattern of FORBIDDEN) {
        it(`never contains ${pattern}`, () => {
            expect(haystack).not.toMatch(pattern);
        });
    }
});
