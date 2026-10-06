import { describe, expect, it } from 'vitest';
import { coreSkills, education, experience, location, openSource, summary } from '../src/data/resume';
import { renderResumeMarkdown } from '../src/lib/resume-md';

// Guards the privacy constraint from the design spec: the public resume
// data must never carry the legal name or phone number from the private,
// gitignored source resume.
const FORBIDDEN = [/REDACTED/i, /REDACTED/i, /REDACTED_PHONE/];

describe('resume data stays redacted', () => {
    const haystack = `${JSON.stringify({ summary, location, experience, coreSkills, openSource, education })}\n${renderResumeMarkdown()}`;

    for (const pattern of FORBIDDEN) {
        it(`never contains ${pattern}`, () => {
            expect(haystack).not.toMatch(pattern);
        });
    }
});

describe('markdown resume is generated from the data', () => {
    const md = renderResumeMarkdown();

    it('contains every role and highlight', () => {
        for (const entry of experience) {
            expect(md).toContain(`### ${entry.org}`);
            for (const h of entry.highlights) expect(md).toContain(`- ${h}`);
        }
    });

    it('lists the open source work', () => {
        for (const item of openSource) expect(md).toContain(`- ${item}`);
    });

    it('carries the summary, location and education', () => {
        expect(md).toContain(summary);
        expect(md).toContain(location);
        expect(md).toContain(education.school);
    });
});
