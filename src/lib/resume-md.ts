import { coreSkills, education, experience, location, name, openSource, summary } from '../data/resume';

// The single renderer for the Markdown resume. `src/data/resume.ts` is the
// canonical source; /resume.md (src/pages/resume.md.ts) and the PDF script
// (scripts/resume-pdf.ts) both call this, so no copy is checked in to drift.
export function renderResumeMarkdown(): string {
    const lines: string[] = [`# ${name}`, '', location, '', '## Summary', '', summary, '', '## Core Skills', ''];
    for (const skill of coreSkills) lines.push(`- ${skill}`);
    lines.push('', '## Experience');
    for (const e of experience) {
        lines.push('', `### ${e.org}`, '', `${e.dates}, ${e.location}`, e.role, '');
        for (const h of e.highlights) lines.push(`- ${h}`);
    }
    lines.push('', '## Open Source', '');
    for (const item of openSource) lines.push(`- ${item}`);
    lines.push('', '## Education', '', `${education.school} - ${education.degree}`);
    return `${lines.join('\n')}\n`;
}
