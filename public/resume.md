# Tara \X/ Void

Omaha, NE · open to onsite or hybrid

## Summary

Platform engineer working on developer experience and security: CI/CD, supply-chain controls and paved roads for developers and coding agents. 15 years across product security, threat intelligence and production operations at Datadog, Salesforce, Yahoo, Tile and MITRE. Builds voidsuite, an open-source internal developer platform for CI/CD, delivery metrics and coding-agent guardrails.

## Core Skills

- Platform & Infrastructure: Kubernetes, Flux GitOps, Docker/OCI, Terraform / OpenTofu, Ansible, Tailscale
- Cloud: Cloudflare (Workers, Workflows, D1, R2, KV, Durable Objects), AWS, Azure, GCP, Netlify
- CI/CD & DevEx: GitHub Actions (reusable workflows, self-hosted runners), release-please, git-cliff, Conventional Commits
- DevSecOps & Supply Chain: gitleaks, Grype, zizmor, actionlint, CodeQL / Semgrep / Snyk
- Secrets & Identity: HashiCorp Vault, AWS KMS, Azure Key Vault, SOPS + age
- Languages: TypeScript / JavaScript (Bun, Node), Python (uv, ruff, pytest), Ruby, Bash, HCL, SQL, Go
- Frameworks & Data: Hono, Astro, React, Tailwind, Drizzle ORM, Zod, Postgres, SQLite / D1

## Experience

### RavenFlight Industries, LLC

Apr 2026 - present, Omaha, NE
Founder & Principal Engineer (Platform, DevEx, Security)

- Built and open-sourced voidsuite, an internal developer platform: shared CI/CD with security, accessibility and performance gates as code (voidflow), DORA and uptime metrics (voidlight) and a site template (voidsite), running 5 production sites.
- Built RavenFlight, an agent-native conversion platform that tests a business's conversion surface the way customers and their AI agents use it and ranks the highest-leverage fixes, with sandboxed model calls, cost telemetry, cross-model review, human gating and provider fallback.
- Run coding agents in capability tiers with guardrails as code (rookery): read-only agents in an OS sandbox, a safe-git allowlist, per-tier spend limits and dispatch that issue text cannot steer.

### Lindsay Corporation

Jan 2025 - Apr 2026, Omaha, NE
Senior DevOps Engineer

- Platform and DevOps for 7 product teams (about 30 developers) shipping business-critical web, Android and iOS apps; success was measured in developer throughput.
- Ran delivery for C# / .NET services on Azure and Kubernetes from the platform side: Python, Terraform, Kubernetes manifests, GitLab CI and az CLI.
- Cut staging environments from 6 hours of manual toil to 20 minutes for a fresh feature branch and 5 minutes to rebuild (Terraform, Ansible, versioned images that rebuild only changed layers), seeded with sanitized synthetic data.
- Added per-merge-request dev deployments and CI test environments, migrated to each branch's schema.
- GitLab CI/CD on custom containerized runners with deploy gates: a failed rollout or post-deploy smoke test rolls back to the last good release automatically.
- Rolled out agentic development (GitHub Copilot, Claude) to all 7 teams: sandboxed, with scoped permissions, spend controls, local hooks and a test-first loop.

### Datadog, Inc

Jan 2022 - May 2024, San Francisco Bay Area
Senior Security Engineer (Product Security)

- Security design review from the architecture stage for the auth, database, routing middleware and privacy/GRC teams and the Workload Monitoring and Synthetics products (about 150 engineers), embedded as their security point of contact alongside infrastructure and infra-security.
- Built their security paved road: Go shared libraries and reference implementations, CI checks, and self-serve Python scanners and secret detection for local hooks (Go, Python, Bazel, Terraform, Postgres).
- Turned review findings, compliance requirements and security research into paved-road defaults, so fixes shipped once for every team instead of as one-off tickets.

### Salesforce, Inc

Feb 2019 - Jan 2022, San Francisco Bay Area
Senior Security Engineer (Threat Intelligence)

- Built threat intelligence platform on AWS with Python, Kafka, Redis, Celery / RabbitMQ, DynamoDB, Lambda Functions.
- Cross-vertical abuse mitigation and internal security response for product teams (CRM, Heroku, Slack)

### Yahoo / Verizon Media

Jan 2018 - Nov 2018, San Francisco Bay Area
Senior Security Engineer (Advanced Threats)

- Owned and operated full-stack production services on AWS (Python, Django, Redis, Celery / RabbitMQ, Postgres, Hadoop).
- Investigated and mitigated nation-state (APT) and e-crime attacks, platform abuse and account takeover; shared intelligence with vetted trust groups.

### Tile, Inc

Oct 2016 - Jan 2018, San Francisco Bay Area
Director of Security

- Led product security for millions of users across mobile, cloud and embedded hardware: threat modeling, pentesting, bug bounty and threat intelligence.
- Secrets management with HashiCorp Vault.

### MITRE Corporation

Mar 2014 - Jan 2016, McLean, VA
Senior Security Engineer (Threat Intelligence, Counter-Espionage)

- Third-tier escalation and tool-development team (5 engineers) for a security operations shop of about 30 tier-1 contractors and 10 tier-2 analysts: built tools for incident responders and network security teams (Python, Ruby, Docker, MongoDB, Cassandra).
- Helped design and implement STIX, the threat-intelligence sharing format, and wrote mitigations and threat models for MITRE ATT&CK.
- Published security research in IEEE and Springer; developed sensitive and classified research.

### iSIGHT Partners

May 2013 - Mar 2014, Chantilly, VA
Technical Intelligence Analyst (E-crime, Counter-Espionage, APT)

- Investigated e-crime and nation-state cyberattacks and built the investigation and forensics tooling (Python, API integrations, Splunk); published threat intelligence for Fortune 50 and US government customers.

### MITRE Corporation

Dec 2010 - May 2013, McLean, VA
Security Engineer (Security Operations, Counter-Espionage)

- Built enterprise-scale detection and incident-response tools in Python and C/C++; led e-crime, nation-state (APT) and insider-threat investigations.
- Wrote and taught courses on malware analysis, cryptography and reverse engineering; advised senior US government leadership. Held a TS/SCI clearance.

## Open Source

- 18xx.games (tobymao/18xx, Ruby): 321 commits from 2020 to 2023, among the top 15 contributors by commit count. Engine and rules fixes across about 46 game titles, UI changes, and the project PR and issue templates.
- voidflow (MIT): shared CI/CD for my production sites, published to npm and JSR with provenance.
- rookery (MIT): tiered coding-agent personas with guardrails enforced as code.

## Education

University of Nebraska at Omaha - B.S. Computer Science, Minor in Psychology, magna cum laude
