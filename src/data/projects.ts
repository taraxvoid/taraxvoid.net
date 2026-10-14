export interface Project {
    group: 'open-source' | 'professional';
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
        group: 'open-source',
        title: 'Voidflow',
        description:
            'Open-source CI/CD workflows with security, accessibility, performance and license gating. Used across my sites.',
        annotation: 'public',
        repo: 'https://github.com/taraxvoid/voidflow'
    },
    {
        group: 'open-source',
        title: 'QueerOmaha.net',
        description: "Community-driven noncommercial resource for Omaha's queer community.",
        href: 'https://queeromaha.net',
        linkLabel: 'Website',
        annotation: 'here and queer',
        repo: 'https://github.com/taraxvoid/queeromaha'
    },
    {
        group: 'open-source',
        title: 'SoundryOmaha.org',
        description: 'Omaha experimental music collective ran by Stacey Barelos',
        href: 'https://soundryomaha.org',
        linkLabel: 'Website',
        annotation: 'amped up',
        repo: 'https://github.com/taraxvoid/soundry'
    },
    {
        group: 'open-source',
        title: 'SynthOmaha.net',
        description: "Omaha's Electronic Music Meetup",
        href: 'https://synthomaha.net',
        linkLabel: 'Website',
        annotation: 'wired in',
        repo: 'https://github.com/taraxvoid/synthomaha'
    },
    {
        group: 'professional',
        title: 'RavenFlight.io',
        description: 'RavenFlight Frontend / Dashboard with analytics-based dogfooding and continuous roll-forwards.',
        closedSource: true,
        href: 'https://ravenflight.io',
        linkLabel: 'Website'
    },
    {
        group: 'professional',
        title: "RavenFlight's API/Product",
        description: 'Agentic CRO SaaS product on Typescript monorepo with model cost telemetry and sandboxing.',
        closedSource: true
    }
];
