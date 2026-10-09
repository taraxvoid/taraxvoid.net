// Curated/redacted for the public site. Source of truth for the full
// (private) resume is input/taraxvoid_resume_post_ai_slop_edits.md,
// which is gitignored and never read at build time. No legal name,
// phone number, or street-level address appears here or anywhere else
// in this repo's public output - city-level location is fine to keep.

export const name = 'Tara \\X/ Void';

export const summary =
    'Platform engineer working on developer experience and security: CI/CD, supply-chain controls and paved roads for developers and coding agents. 15 years across product security, threat intelligence and production operations at Datadog, Salesforce, Yahoo, Tile and MITRE. Founder of RavenFlight, an AI-assisted conversion-audit product.';

export const location = 'Omaha, NE (remote-friendly)';

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
        location: 'Omaha,NE',
        highlights: [
            'Open-sourced my personal Internal Developer Platform: reusable CI/CD workflows with shift-left Security, Accessibility and Performance defined in code.',
            'Built RavenFlight: agent-native CRO product. Sandboxed model calls with cost telemetry, cross-review, human gating and provider fallback.',
            'Guardrails-by-default to enable secure and cost-contained agentic development.',
            'Extensive experience security-first development on Azure, AWS, Terraform, Ansible, agent-native development and CI/CD in hyperscale environments'
        ]
    },
    {
        org: 'Lindsay Corporation',
        role: 'Senior DevOps Engineer',
        dates: 'Jan 2025 - Apr 2026',
        location: 'Omaha, NE',
        highlights: [
            'Platform Engineering and DevOps for business-critical product teams - web and mobile apps',
            'Used GitLab CI/CD on Azure with internal runners and containers / k8s infrastructure with deploy gates and rollback',
            'Took Staging rebuilds from 6 hours of toil to 5 minutes for a working environment seeded with synthetic data',
            'Brought in agentic development flows (GitHub Copilot, Claude) sandboxed with scoped permissions, spend controls, local hooks and test-driven development.',
            'Implemented QA automation release gates and clean rollback.'
        ]
    },
    {
        org: 'Datadog, Inc',
        role: 'Senior Security Engineer (Product Security)',
        dates: 'Jan 2022 - May 2024',
        location: 'San Francisco Bay Area',
        highlights: [
            'First-class security review and shift-left design for business-critical products.',
            'Reviewed designs and code in Go, Python, Kafka, Redis, NoSQL and Postgres with product, database and infrastructure teams.',
            'Built developer-first security (DevSecOps, shift-left) across product, database, infrastructure and engineering teams: self-serve security review programs, code security and secrets scanning built into local dev and CI, and paved-road secure defaults.'
        ]
    },
    {
        org: 'Salesforce, Inc',
        role: 'Senior Security Engineer (Threat Intelligence)',
        dates: 'Feb 2019 - Jan 2022',
        location: 'San Francisco Bay Area',
        highlights: [
            "Built and ran the threat-intelligence team's data pipeline in production on AWS: Python, Kafka, Redis, Celery / RabbitMQ, DynamoDB, Lambda.",
            'Encryption key management with AWS KMS.'
        ]
    },
    {
        org: 'Yahoo / Verizon Media',
        role: 'Senior Security Engineer (Advanced Threats)',
        dates: 'Jan 2018 - Nov 2018',
        location: 'San Francisco Bay Area',
        highlights: [
            'Owned and operated full-stack production services on AWS (Python, Django, Redis, Celery / RabbitMQ, Postgres, Hadoop).',
            'Investigated and mitigated nation-state (APT) and e-crime attacks, platform abuse and account takeover; shared intelligence with vetted trust groups.'
        ]
    },
    {
        org: 'Tile, Inc',
        role: 'Director of Security',
        dates: 'Oct 2016 - Jan 2018',
        location: 'San Francisco Bay Area',
        highlights: [
            'Led product security for millions of users across mobile, cloud and embedded hardware: threat modeling, pentesting, bug bounty and threat intelligence.',
            'Secrets management with HashiCorp Vault.'
        ]
    },
    {
        org: 'MITRE Corporation',
        role: 'Senior Security Engineer (Threat Intelligence, Counter-Espionage)',
        dates: 'Mar 2014 - Jan 2016',
        location: 'McLean, VA',
        highlights: [
            'Third-tier escalation and tool-development team (5 engineers) for a security operations shop of about 30 tier-1 contractors and 10 tier-2 analysts: built tools for incident responders and network security teams (Python, Ruby, Docker, MongoDB, Cassandra).',
            'Helped design and implement STIX, the threat-intelligence sharing format, and wrote mitigations and threat models for MITRE ATT&CK.',
            'Published security research in IEEE and Springer; developed sensitive and classified research.'
        ]
    },
    {
        org: 'iSIGHT Partners',
        role: 'Technical Intelligence Analyst (E-crime, Counter-Espionage, APT)',
        dates: 'May 2013 - Mar 2014',
        location: 'Chantilly, VA',
        highlights: [
            'Investigated e-crime and nation-state cyberattacks and built the investigation and forensics tooling (Python, API integrations, Splunk); published threat intelligence for Fortune 50 and US government customers.'
        ]
    },
    {
        org: 'MITRE Corporation',
        role: 'Security Engineer (Security Operations, Counter-Espionage)',
        dates: 'Dec 2010 - May 2013',
        location: 'McLean, VA',
        highlights: [
            'Built enterprise-scale detection and incident-response tools in Python and C/C++; led e-crime, nation-state (APT) and insider-threat investigations.',
            'Wrote and taught courses on malware analysis, cryptography and reverse engineering; advised senior US government leadership. Held a TS/SCI clearance.'
        ]
    }
];

export const coreSkills = [
    'Platform & Infrastructure: Kubernetes, Flux GitOps, Docker/OCI, Terraform / OpenTofu, Ansible, Tailscale',
    'Cloud: Cloudflare (Workers, Workflows, D1, R2, KV, Durable Objects), AWS, Azure, GCP, Netlify',
    'CI/CD & DevEx: GitHub Actions (reusable workflows, self-hosted runners), release-please, git-cliff, Conventional Commits',
    'DevSecOps & Supply Chain: gitleaks, Grype, zizmor, actionlint, CodeQL / Semgrep / Snyk',
    'Secrets & Identity: HashiCorp Vault, AWS KMS, Azure Key Vault, SOPS + age',
    'Languages: TypeScript / JavaScript (Bun, Node), Python (uv, ruff, pytest), Ruby, Bash, HCL, SQL, Go',
    'Frameworks & Data: Hono, Astro, React, Tailwind, Drizzle ORM, Zod, Postgres, SQLite / D1'
];

export const openSource = [
    '18xx.games (tobymao/18xx, Ruby): 321 commits from 2020 to 2023, among the top 15 contributors by commit count. Engine and rules fixes across about 46 game titles, UI changes, and the project PR and issue templates.',
    'voidflow (MIT): shared CI/CD for my production sites, published to npm and JSR with provenance.'
];

export const education = {
    school: 'University of Nebraska at Omaha',
    degree: 'B.S. Computer Science, Minor in Psychology, magna cum laude'
};
