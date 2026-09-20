import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';

describe('projects data', () => {
    it('gives every entry a unique reference tag', () => {
        const refs = projects.map((p) => p.ref);
        expect(new Set(refs).size).toBe(refs.length);
    });

    it('requires an href and link label on every public entry', () => {
        for (const project of projects) {
            if (project.visibility === 'public') {
                expect(project.href, `${project.title} is public but has no href`).toBeTruthy();
                expect(project.linkLabel, `${project.title} is public but has no linkLabel`).toBeTruthy();
            }
        }
    });

    it('never gives a private entry an href', () => {
        for (const project of projects) {
            if (project.visibility === 'private') {
                expect(project.href, `${project.title} is private but has an href`).toBeUndefined();
            }
        }
    });
});
