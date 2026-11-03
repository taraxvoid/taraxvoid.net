import { describe, expect, it } from 'vitest'
import { FORBIDDEN } from './privacy'

const samples = {
    email: ['write to me@example.com today'],
    phone: [
        'call 555-123-4567 now',
        'call (555) 123-4567 now',
        'call +1 555.123.4567 now',
        'call 5551234567 now',
    ],
    stateZip: ['Springfield, CA 94551', 'Springfield CA 94551-1234'],
} as const

const safe = [
    'Omaha, NE',
    'May 2013 - Mar 2014, McLean, VA',
    'Built in 2026, shipped 20260930 to 12345 users',
    'Version 1.2.3 of the site',
]

describe('privacy patterns', () => {
    for (const [name, pattern] of Object.entries(FORBIDDEN)) {
        it(`${name} matches embedded examples`, () => {
            for (const s of samples[name as keyof typeof samples]) {
                expect(s).toMatch(pattern)
            }
        })
        it(`${name} ignores ordinary text`, () => {
            for (const s of safe) expect(s).not.toMatch(pattern)
        })
    }
})
