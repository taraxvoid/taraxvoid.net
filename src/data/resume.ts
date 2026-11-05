// Vendored from taraxvoid/resumes, the single source for every resume:
// src/data/resume.json, public/resume.md and public/resume.pdf are copies of
// its public/omaha/ output. Never edit them here; change taraxvoid/resumes,
// run `bun run build` there and push: .github/workflows/vendor-resume.yml
// opens the PR that updates these three files.
// That output is already redacted: no legal name, phone or street address.
import { type ExperienceEntry, parseResume } from '../lib/resume-parse'
import data from './resume.json'

export type { ExperienceEntry }

export const resume = parseResume(data)

export const {
    name,
    summary,
    highlights = [],
    location,
    experience,
    coreSkills,
    openSource,
    education,
} = resume
