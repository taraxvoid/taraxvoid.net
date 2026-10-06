export interface Project {
    ref: string;
    title: string;
    description: string;
    visibility: 'public' | 'private';
    href?: string;
    linkLabel?: string;
    annotation?: string;
}

export const projects: Project[] = [
    {
        ref: 'RVN-01',
        title: 'rvnflt',
        description:
            'Agentic CRO SaaS product monorepo on Cloudflare Workers with first-class model cost telemetry and evaluation.',
        visibility: 'private'
    },
    {
        ref: 'RVN-02',
        title: 'ravenflight.io',
        description: 'Frontend to the rvnflt API that dogfoods itself with roll-forward.',
        visibility: 'public',
        href: 'https://ravenflight.io',
        linkLabel: 'View site',
        annotation: 'shipped'
    },
    {
        ref: 'TXV-01',
        title: 'voidflow',
        description:
            'CI/CD platform for Astro sites on Netlify / Cloudflare: reusable GitHub Actions workflows, SHA-pinned and audited with zizmor and actionlint, with accessibility, performance and license-policy gates.',
        visibility: 'public',
        href: 'https://github.com/taraxvoid/voidflow',
        linkLabel: 'View source'
    },
    {
        ref: 'TXV-02',
        title: 'Queer Omaha, Synth Omaha, Soundry',
        description: "Open-source sites for Omaha's queer community, using voidflow pipelines and content-linting.",
        visibility: 'public',
        href: 'https://queeromaha.net',
        linkLabel: 'View sites'
    }
];
