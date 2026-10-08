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
        ref: 'TXV-01',
        title: 'voidflow pipeline',
        description:
            'CI/CD platform for Astro sites on Netlify / Cloudflare: reusable GitHub Actions workflows, SHA-pinned and audited with zizmor and actionlint, with accessibility, performance and license-policy gates.',
        visibility: 'public',
        href: 'https://github.com/taraxvoid/voidflow',
        linkLabel: 'View source',
        annotation: 'shipped'
    },
    {
        ref: 'TXV-02',
        title: 'QueerOmaha.net',
        description:
            "Community-driven noncommercial resource for Omaha's queer community, using the voidflow pipeline.",
        visibility: 'public',
        href: 'https://queeromaha.net',
        linkLabel: 'View sites',
        annotation: 'shipped'
    },
    {
        ref: 'TXV-03',
        title: 'SoundryOmaha.org',
        description: 'Omaha experimental music collective ran by Stacey Barelos',
        visibility: 'public',
        href: 'https://soundryomaha.org',
        linkLabel: 'View sites',
        annotation: 'shipped'
    },
    {
        ref: 'TXV-04',
        title: 'SynthOmaha.net',
        description: "Omaha's Electronic Music Meetup",
        visibility: 'public',
        href: 'https://soundryomaha.org',
        linkLabel: 'View sites',
        annotation: 'shipped'
    },
    {
        ref: 'RVN-01',
        title: 'rvnflt',
        description:
            'Agentic CRO SaaS product monorepo on Cloudflare Workers with first-class model cost telemetry and evaluation.',
        visibility: 'private'
    },
    {
        ref: 'RVN-02',
        title: 'RavenFlight.io',
        description: 'Frontend to the rvnflt API that dogfoods itself with roll-forward.',
        visibility: 'public',
        href: 'https://ravenflight.io',
        linkLabel: 'View site',
        annotation: 'shipped'
    }
];
