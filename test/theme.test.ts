import { describe, expect, it } from 'vitest';
import {
    applyPreference,
    parsePreference,
    readStoredPreference,
    resolveTheme,
    THEME_COLORS,
    THEME_STORAGE_KEY,
    themeColorFor,
    writeStoredPreference
} from '../src/lib/theme';

function fakeStorage(initial: Record<string, string> = {}) {
    const data = new Map(Object.entries(initial));
    return {
        data,
        getItem: (k: string) => data.get(k) ?? null,
        setItem: (k: string, v: string) => void data.set(k, v),
        removeItem: (k: string) => void data.delete(k)
    };
}

const throwingStorage = {
    getItem: () => {
        throw new Error('blocked');
    },
    setItem: () => {
        throw new Error('blocked');
    },
    removeItem: () => {
        throw new Error('blocked');
    }
};

function fakeRoot() {
    const attrs = new Map<string, string>();
    return {
        attrs,
        setAttribute: (k: string, v: string) => void attrs.set(k, v),
        removeAttribute: (k: string) => void attrs.delete(k)
    };
}

describe('parsePreference', () => {
    it.each(['system', 'light', 'dark'])('accepts %s', (value) => {
        expect(parsePreference(value)).toBe(value);
    });

    it.each([null, undefined, '', 'auto', 'DARK', 42, {}])('falls back to system for %j', (value) => {
        expect(parsePreference(value)).toBe('system');
    });
});

describe('readStoredPreference', () => {
    it('returns the stored preference', () => {
        const s = fakeStorage({ [THEME_STORAGE_KEY]: 'dark' });
        expect(readStoredPreference(s)).toBe('dark');
    });

    it('defaults to system when nothing is stored', () => {
        expect(readStoredPreference(fakeStorage())).toBe('system');
    });

    it('ignores invalid stored values', () => {
        const s = fakeStorage({ [THEME_STORAGE_KEY]: 'purple' });
        expect(readStoredPreference(s)).toBe('system');
    });

    it('defaults to system when storage throws or is missing', () => {
        expect(readStoredPreference(throwingStorage)).toBe('system');
        expect(readStoredPreference(null)).toBe('system');
    });
});

describe('writeStoredPreference', () => {
    it.each(['light', 'dark'] as const)('stores %s', (pref) => {
        const s = fakeStorage();
        writeStoredPreference(s, pref);
        expect(s.data.get(THEME_STORAGE_KEY)).toBe(pref);
    });

    it('removes the key for system, so there is nothing to track', () => {
        const s = fakeStorage({ [THEME_STORAGE_KEY]: 'dark' });
        writeStoredPreference(s, 'system');
        expect(s.data.has(THEME_STORAGE_KEY)).toBe(false);
    });

    it('never throws when storage is blocked', () => {
        expect(() => writeStoredPreference(throwingStorage, 'dark')).not.toThrow();
        expect(() => writeStoredPreference(null, 'dark')).not.toThrow();
    });
});

describe('applyPreference', () => {
    it.each(['light', 'dark'] as const)('sets data-theme=%s', (pref) => {
        const root = fakeRoot();
        applyPreference(root, pref);
        expect(root.attrs.get('data-theme')).toBe(pref);
    });

    it('removes data-theme for system so CSS follows the browser', () => {
        const root = fakeRoot();
        root.attrs.set('data-theme', 'dark');
        applyPreference(root, 'system');
        expect(root.attrs.has('data-theme')).toBe(false);
    });
});

describe('resolveTheme', () => {
    it('follows the browser for system', () => {
        expect(resolveTheme('system', true)).toBe('dark');
        expect(resolveTheme('system', false)).toBe('light');
    });

    it('lets an explicit choice win over the browser', () => {
        expect(resolveTheme('light', true)).toBe('light');
        expect(resolveTheme('dark', false)).toBe('dark');
    });
});

describe('themeColorFor', () => {
    it('uses the meta tag scheme for system', () => {
        expect(themeColorFor('system', 'light')).toBe(THEME_COLORS.light);
        expect(themeColorFor('system', 'dark')).toBe(THEME_COLORS.dark);
    });

    it('uses the explicit choice regardless of the meta tag scheme', () => {
        expect(themeColorFor('dark', 'light')).toBe(THEME_COLORS.dark);
        expect(themeColorFor('light', 'dark')).toBe(THEME_COLORS.light);
    });
});
