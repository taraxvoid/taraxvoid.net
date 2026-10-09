export interface Project {
    ref: string;
    title: string;
    description: string;
    href?: string;
    linkLabel?: string;
    repo?: string;
    closedSource?: boolean;
    annotation?: string;
}

export const projects: Project[] = [
    {
        ref: 'TXV-01',
        title: 'Voidflow',
        description:
            'Open-source CI/CD workflows with security, accessibility, performance and license gating. Used across my sites.',
        annotation: 'public',
        repo: 'https://github.com/taraxvoid/voidflow'
    },
    {
        ref: 'TXV-02',
        title: 'QueerOmaha.net',
        description: "Community-driven noncommercial resource for Omaha's queer community.",
        href: 'https://queeromaha.net',
        linkLabel: 'Website',
        annotation: 'here and queer',
        repo: 'https://github.com/taraxvoid/queeromaha'
    },
    {
        ref: 'TXV-03',
        title: 'SoundryOmaha.org',
        description: 'Omaha experimental music collective ran by Stacey Barelos',
        href: 'https://soundryomaha.org',
        linkLabel: 'Website',
        annotation: 'amped up',
        repo: 'https://github.com/taraxvoid/soundry'
    },
    {
        ref: 'TXV-04',
        title: 'SynthOmaha.net',
        description: "Omaha's Electronic Music Meetup",
        href: 'https://synthomaha.net',
        linkLabel: 'Website',
        annotation: 'wired in',
        repo: 'https://github.com/taraxvoid/synthomaha'
    },
    {
        ref: 'RVN-01',
        title: 'RavenFlight.io',
        description: 'RavenFlight Frontend / Dashboard with analytics-based dogfooding and continuous roll-forwards.',
        closedSource: true,
        href: 'https://ravenflight.io',
        linkLabel: 'Website'
    },
    {
        ref: 'RVN-02',
        title: "RavenFlight's API/Product",
        description: 'Agentic CRO SaaS product on Typescript monorepo with model cost telemetry and sandboxing.',
        closedSource: true
    }
];
