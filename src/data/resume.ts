// Curated/redacted for the public site. Source of truth for the full
// (private) resume is input/taraxvoid_resume_post_ai_slop_edits.md,
// which is gitignored and never read at build time. No legal name,
// phone number, or street-level address appears here or anywhere else
// in this repo's public output - city-level location is fine to keep.

export const name = 'Tara \\X/ Void';

export const summary =
    'Platform engineer working on developer experience and security: CI/CD, supply-chain controls and paved roads for developers and coding agents. 15 years across product security, threat intelligence and production operations at Datadog, Salesforce, Yahoo, Tile and MITRE. Founder of RavenFlight, an AI-assisted conversion-audit product.';

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
            'Maintain voidflow, open-source shared CI/CD for my production sites: reusable workflows and composite actions with SHA-pinned dependencies, zizmor, actionlint and gitleaks gates, accessibility and performance budgets, license policy, release channels, and branch rulesets as code.',
            'Built an AI-assisted conversion-audit product on Cloudflare Workers, D1, Workflows and Containers (Hono, Astro, Zod, Drizzle). All LLM calls go through one boundary that tags customer, feature and request for cost telemetry and provider fallback.',
            'Staging deploys rehearse rollback and roll-forward and verify the served build SHA.',
            'Wrote agent guidance (CLAUDE.md, REVIEW.md) for each repo; agent-written changes go through the same hooks and CI gates as human ones.'
        ]
    },
    {
        org: 'Lindsay Corporation',
        role: 'Senior DevOps Engineer',
        dates: 'Jan 2025 - Apr 2026',
        location: 'Omaha, NE',
        highlights: [
            'Platform and DevOps for 7 product teams (about 30 developers) shipping web, Android and iOS apps: hosting and CI/CD on Azure and GitLab, across Windows and Linux. Success was measured in developer productivity.',
            'Cut staging environment creation from 6 hours of manual work to 20 minutes cold and 5 minutes warm in CI. Environments are built from Terraform, Ansible, Azure resources and Kubernetes, with versioned images that rebuild only changed layers.',
            "Added per-merge-request dev deployments and CI test environments, seeded with sanitized synthetic data and migrated to the branch's schema.",
            'Introduced agentic development (GitHub Copilot, Claude) and set up local dev for it: containerized sandboxes with scoped permissions, spend controls, local hooks and a test-first loop.',
            'Added CI release gates and automatic rollbacks for business-critical systems.',
            'Built RSpec (Ruby) QA automation for the web app across dev, staging and post-deploy production, run as GitLab CI release gates.'
        ]
    },
    {
        org: 'Datadog, Inc',
        role: 'Senior Security Engineer (Product Security)',
        dates: 'Jan 2022 - May 2024',
        location: 'San Francisco Bay Area',
        highlights: [
            'Security review and secure design for product services carrying billions in revenue.',
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
