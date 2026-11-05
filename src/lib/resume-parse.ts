// Shape of taraxvoid/resumes' public/<region>/resume.json (version 1). No
// imports, so it loads anywhere.
export interface ExperienceEntry {
    org: string
    role: string
    dates: string
    location: string
    highlights: string[]
}

export interface Resume {
    version: 1
    name: string
    summary: string
    /** Optional: added to version 1 by taraxvoid/resumes; older output lacks it. */
    highlights?: string[]
    location: string
    experience: ExperienceEntry[]
    coreSkills: string[]
    openSource: string[]
    education: { school: string; degree: string }
}

const isString = (v: unknown): v is string =>
    typeof v === 'string' && v.trim() !== ''
const isStrings = (v: unknown): v is string[] =>
    Array.isArray(v) && v.every(isString)
const isEntry = (e: Partial<ExperienceEntry> | undefined): boolean =>
    isString(e?.org) &&
    isString(e?.role) &&
    isString(e?.dates) &&
    isString(e?.location) &&
    isStrings(e?.highlights)

/** Throws unless `value` has the shape taraxvoid/resumes publishes. */
export function parseResume(value: unknown): Resume {
    const r = value as Partial<Resume> | null
    const ok =
        r !== null &&
        typeof r === 'object' &&
        r.version === 1 &&
        isString(r.name) &&
        isString(r.summary) &&
        (r.highlights === undefined || isStrings(r.highlights)) &&
        isString(r.location) &&
        Array.isArray(r.experience) &&
        r.experience.length > 0 &&
        r.experience.every(isEntry) &&
        isStrings(r.coreSkills) &&
        isStrings(r.openSource) &&
        isString(r.education?.school) &&
        isString(r.education?.degree)
    if (!ok) throw new Error('resume.json does not match the expected shape')
    return r as Resume
}
