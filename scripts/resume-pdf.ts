// Renders the Markdown resume (generated from src/data/resume.ts) to
// public/resume.pdf via the `typst` CLI. Same markdown -> Typst -> PDF shape
// as igor's tailor/typst.ts, trimmed to the constructs this resume actually
// uses: headings, bullets, and plain lines.
//
// The PDF is a build artifact (gitignored; `bun run build` runs this first).
// Uses `typst` from PATH when present (`brew install typst`); otherwise
// downloads the pinned release below into .cache/typst and verifies its
// SHA-256, so CI and fresh clones need no extra setup.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderResumeMarkdown } from '../src/lib/resume-md';

const OUT = fileURLToPath(new URL('../public/resume.pdf', import.meta.url));
const CACHE = fileURLToPath(new URL('../.cache/typst', import.meta.url));
const TYP = join(tmpdir(), 'taraxvoid-resume.typ');

const TYPST_VERSION = '0.15.1';
const TYPST_SHA256: Record<string, string> = {
    'x86_64-unknown-linux-musl': 'a6d077d0a95eed5a2eba715b2dae06be954f624ccbf85758a03f389ded33118c',
    'aarch64-unknown-linux-musl': '5aa8d74a3d906e60ea12a66ac2f37f8eef1b14cbad7182a745e393a10c23dcee',
    'aarch64-apple-darwin': '48f62ed034aa3a7978309579ac6ca00045e2ef0da73114e8af27cfd8e74dc05a',
    'x86_64-apple-darwin': '7f9fdd9584866245de9a79e0add8f9236fae6f40a8a45e2c4771ccc14db4e0fa'
};

const onPath = () => {
    try {
        execFileSync('typst', ['--version'], { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
};

async function resolveTypst(): Promise<string> {
    if (onPath()) return 'typst';
    const arch = process.arch === 'arm64' ? 'aarch64' : 'x86_64';
    const target = process.platform === 'darwin' ? `${arch}-apple-darwin` : `${arch}-unknown-linux-musl`;
    const expected = TYPST_SHA256[target];
    if (!expected || !['darwin', 'linux'].includes(process.platform)) {
        throw new Error(`no pinned typst for ${process.platform}/${process.arch}; install typst`);
    }
    const bin = join(CACHE, TYPST_VERSION, `typst-${target}`, 'typst');
    if (existsSync(bin)) return bin;
    const url = `https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-${target}.tar.xz`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download failed: ${res.status} ${url}`);
    const archive = new Uint8Array(await res.arrayBuffer());
    const actual = new Bun.CryptoHasher('sha256').update(archive).digest('hex');
    if (actual !== expected) throw new Error(`typst checksum mismatch for ${target}: ${actual}`);
    const dir = join(CACHE, TYPST_VERSION);
    mkdirSync(dir, { recursive: true });
    const tarball = join(dir, `${target}.tar.xz`);
    writeFileSync(tarball, archive);
    execFileSync('tar', ['-xJf', tarball, '-C', dir], { stdio: 'inherit' });
    return bin;
}

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

const lines = renderResumeMarkdown().split('\n');
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
    execFileSync(await resolveTypst(), ['compile', TYP, OUT], { stdio: 'inherit' });
} catch (error) {
    console.error('typst failed:', error instanceof Error ? error.message : error);
    process.exit(1);
}
console.log(`wrote ${OUT}`);
