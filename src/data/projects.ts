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
            'Multi-tenant SaaS on Cloudflare Workers, routing every LLM call through one callModel() boundary for cost telemetry and provider fallback.',
        visibility: 'private',
    },
    {
        ref: 'RVN-02',
        title: 'ravenflight.io',
        description:
            'Marketing site whose live audits run against the production API; every staging deploy rehearses a rollback and verifies the served build.',
        visibility: 'public',
        href: 'https://ravenflight.io',
        linkLabel: 'View site',
        annotation: 'shipped',
    },
    {
        ref: 'RVN-03',
        title: 'flock',
        description:
            'Scale-to-zero self-hosted GitHub Actions runner pool: zero public ingress (SSH and the k3s API are Tailscale-only), secrets encrypted at rest with SOPS + age, and first-boot node joins use one-hour single-use OAuth keys instead of 90-day static tokens.',
        visibility: 'private',
    },
    {
        ref: 'TXV-01',
        title: 'voidflow',
        description:
            'Reusable GitHub Actions workflows, SHA-pinned and hardened with zizmor and actionlint, shared across four production sites.',
        visibility: 'public',
        href: 'https://github.com/taraxvoid/voidflow',
        linkLabel: 'View source',
    },
    {
        ref: 'TXV-02',
        title: 'Queer Omaha, Synth Omaha, Soundry',
        description:
            "Three free community sites for Omaha's queer and music scenes, run with the same CI discipline as commercial work: shared voidflow pipelines, Playwright and axe-core gates, and a license-policy check on every dependency change.",
        visibility: 'public',
        href: 'https://queeromaha.net',
        linkLabel: 'View sites',
    },
];
