// Patterns for personal contact details that must never appear in the
// public site or the vendored resume. Unanchored so they match inside
// larger blocks of text.
export const FORBIDDEN = {
    email: /[^\s@]+@[^\s@]+\.[^\s@]+/,
    phone: /(?<!\d)(?:\+\d{1,2}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}(?!\d)/,
    // US state code followed by a ZIP, e.g. "CA 94551" or "CA, 94551-1234"
    stateZip: /\b[A-Z]{2},?\s+\d{5}(?:-\d{4})?\b/,
} as const
