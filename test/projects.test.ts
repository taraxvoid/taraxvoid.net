import { describe, expect, it } from 'vitest'
import { projects } from '../src/data/projects'

describe('projects data', () => {
    it('gives every entry with an href a link label', () => {
        for (const project of projects) {
            if (project.href) {
                expect(
                    project.linkLabel,
                    `${project.title} has an href but no linkLabel`,
                ).toBeTruthy()
            }
        }
    })

    it('gives every entry a site, a repo, or a closed-source flag', () => {
        for (const project of projects) {
            const reachable =
                project.href || project.repo || project.closedSource
            expect(
                reachable,
                `${project.title} has no href, repo, or closedSource flag`,
            ).toBeTruthy()
        }
    })

    it('never gives a closed-source entry a repo link', () => {
        for (const project of projects) {
            if (project.closedSource) {
                expect(
                    project.repo,
                    `${project.title} is closed source but has a repo`,
                ).toBeUndefined()
            }
        }
    })
})
