// Renders public/resume.md to public/resume.pdf via the `typst` CLI
// (`brew install typst`). Same markdown -> Typst -> PDF shape as igor's
// tailor/typst.ts, trimmed to the constructs this resume actually uses:
// headings, bullets, and plain lines. Run with `bun run resume:pdf` and
// commit the result (CI has no typst, so the PDF is checked in).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../public/resume.md', import.meta.url));
const OUT = fileURLToPath(new URL('../public/resume.pdf', import.meta.url));
const TYP = join(tmpdir(), 'taraxvoid-resume.typ');

// Characters significant in Typst markup; backslash-escaping is always valid.
const escapeTypst = (s: string) => s.replace(/[\\_#$@<>[\]`*~]/g, '\\$&').replace(/^\+/, '\\+');

const PREAMBLE = `#set page(margin: (x: 1.6cm, y: 1.4cm))
#set text(font: "New Computer Modern", size: 9.5pt)
#set par(justify: false, leading: 0.55em)
#set list(marker: [\u2022], indent: 0.6em, body-indent: 0.4em)
#set heading(numbering: none)
#show heading.where(level: 1): set text(size: 15pt, weight: "bold")
#show heading.where(level: 2): it => block(above: 0.9em, below: 0.45em)[
  #set text(size: 11.5pt, weight: "bold")
  #it.body
  #line(length: 100%, stroke: 0.4pt)
]
#show heading.where(level: 3): set text(size: 10pt, weight: "bold", style: "italic")
`;

const lines = readFileSync(SRC, 'utf8').split('\n');
const out = lines.map((line: string, i: number) => {
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) return `${'='.repeat(heading[1].length)} ${escapeTypst(heading[2])}`;
    if (line.startsWith('- ')) return `- ${escapeTypst(line.slice(2))}`;
    if (!line.trim()) return '';
    // Adjacent plain lines (dates/location, then title) must stay on
    // separate lines; a bare newline inside a Typst paragraph is a space.
    const next = lines[i + 1] ?? '';
    const continues = next.trim() && !next.startsWith('#') && !next.startsWith('- ');
    return `${escapeTypst(line)}${continues ? ' #linebreak()' : ''}`;
});

writeFileSync(TYP, `${PREAMBLE}\n${out.join('\n')}\n`);
try {
    execFileSync('typst', ['compile', TYP, OUT], { stdio: 'inherit' });
} catch {
    console.error('typst failed (is it installed? brew install typst)');
    process.exit(1);
}
console.log(`wrote ${OUT}`);
