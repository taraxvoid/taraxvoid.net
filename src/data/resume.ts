// Curated/redacted for the public site. Source of truth for the full
// (private) resume is input/taraxvoid_resume_post_ai_slop_edits.md,
// which is gitignored and never read at build time. No legal name,
// phone number, or street-level address appears here or anywhere else
// in this repo's public output - city-level location is fine to keep.

export const summary =
    "Platform / DevEx / DevSecOps engineer with 15 years across security engineering, threat intelligence, and production operations at MITRE, Salesforce, Datadog, and Yahoo, plus a Director-level security role at Tile. Since 2026 I've run RavenFlight Industries, where I design, ship, and operate the whole stack solo.";

export const location = 'Hayward, CA (remote-friendly)';

export interface ExperienceEntry {
    org: string;
    role: string;
    dates: string;
    location: string;
    highlights: string[];
}

export const experience: ExperienceEntry[] = [
    {
        org: 'RavenFlight Industries, LLC',
        role: 'Founder & Principal Engineer (Platform, DevEx, Security)',
        dates: 'Apr 2026 - present',
        location: 'Hayward, CA',
        highlights: [
            'Bun/TypeScript monorepo (Hono API, Astro admin dashboard, Zod schemas, Drizzle + D1) running entirely on Cloudflare Workers, Workflows, D1, R2, KV and Durable Objects.',
            'Astro + React islands + Tailwind v4 marketing site with live audits, KV-backed rate limiting, and a rehearsed rollback/roll-forward drill on every staging deploy.',
            'Five reusable GitHub Actions workflows and three composite actions consumed by four production sites, hardened with actionlint, zizmor, and ShellCheck.',
            'Scale-to-zero self-hosted GitHub Actions runner pool with zero public ingress, SOPS + age secrets, and single-use OAuth join tokens.'
        ]
    },
    {
        org: 'Lindsay Corporation',
        role: 'Senior DevOps Engineer',
        dates: 'Jan 2025 - Apr 2026',
        location: 'Omaha, NE',
        highlights: [
            'Owned business-critical hosting and CI/CD on Azure and GitLab, with developer productivity as the explicit success metric.',
            'Introduced agentic development workflows (GitHub Copilot, Claude) to the engineering team.'
        ]
    },
    {
        org: 'Datadog, Inc',
        role: 'Senior Security Engineer (Product Security)',
        dates: 'Jan 2022 - May 2024',
        location: 'San Francisco Bay Area',
        highlights: [
            'Product security for services carrying billions in revenue; secured Go, Python, Kafka, Redis, NoSQL, and Postgres code paths.',
            'Implemented DevSecOps controls: code security, secrets scanning, and security review programs across product, database, infrastructure, and engineering teams.'
        ]
    },
    {
        org: 'Salesforce, Inc',
        role: 'Senior Security Engineer (Threat Intelligence)',
        dates: 'Feb 2019 - Jan 2022',
        location: 'San Francisco Bay Area',
        highlights: [
            'Built and owned DevOps for a production threat-intelligence platform on AWS: Python, Redis, DynamoDB, Kafka, Celery / RabbitMQ, Lambda.'
        ]
    },
    {
        org: 'Tile, Inc',
        role: 'Director of Security',
        dates: 'Oct 2016 - Jan 2018',
        location: 'San Francisco Bay Area',
        highlights: [
            'Owned product security for millions of users across mobile, cloud, and embedded hardware.',
            'Ran threat intelligence, threat modeling, pentesting, and bug-bounty programs.'
        ]
    },
    {
        org: 'MITRE Corporation',
        role: 'Senior Security Engineer (Threat Intelligence, Counter-Espionage)',
        dates: 'Mar 2014 - Jan 2016',
        location: 'McLean, VA',
        highlights: [
            'Published security research in IEEE and Springer; developed sensitive and classified research.',
            'Wrote mitigations and threat modeling for MITRE ATT&CK; helped design and implement the STIX threat-intelligence sharing format.'
        ]
    }
];

export const coreSkills = [
    'Platform & Infrastructure: Kubernetes, Flux GitOps, Docker/OCI, Terraform / OpenTofu, Ansible, Tailscale',
    'Cloud: Cloudflare (Workers, Workflows, D1, R2, KV, Durable Objects), AWS, Azure, GCP, Netlify',
    'CI/CD & DevEx: GitHub Actions (reusable workflows, self-hosted runners), release-please, git-cliff, Conventional Commits',
    'DevSecOps & Supply Chain: gitleaks, SOPS + age, Grype, zizmor, actionlint, CodeQL / Semgrep / Snyk',
    'Languages: TypeScript / JavaScript (Bun, Node), Python (uv, ruff, pytest), Bash, HCL, SQL, Go',
    'Frameworks & Data: Hono, Astro, React, Tailwind, Drizzle ORM, Zod, Postgres, SQLite / D1'
];

export const education = {
    school: 'University of Nebraska at Omaha',
    degree: 'B.S. Computer Science, Minor in Psychology, magna cum laude'
};
