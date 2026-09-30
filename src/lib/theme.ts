/**
 * Light / dark / system theme handling, no library.
 *
 * "system" means no `data-theme` attribute and nothing stored, so the CSS
 * follows `prefers-color-scheme` on its own (and keeps doing so with JS off).
 * An explicit choice sets `data-theme` on <html> and is kept in localStorage.
 *
 * The blocking script in HeadMeta.astro repeats the read/apply steps inline
 * so the theme is set before first paint. Keep the two in sync; e2e tests
 * cover the inline copy.
 */

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem' | 'removeItem'>;
type ThemeRoot = {
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
};

export function parsePreference(value: unknown): ThemePreference {
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
}

// Storage can be missing or throw (private windows, blocked site data).
export function readStoredPreference(storage: ReadableStorage | null | undefined): ThemePreference {
    try {
        return parsePreference(storage?.getItem(THEME_STORAGE_KEY));
    } catch {
        return 'system';
    }
}

export function writeStoredPreference(storage: WritableStorage | null | undefined, preference: ThemePreference): void {
    try {
        if (preference === 'system') storage?.removeItem(THEME_STORAGE_KEY);
        else storage?.setItem(THEME_STORAGE_KEY, preference);
    } catch {
        // Nothing to do: the choice still applies for this page view.
    }
}

export function applyPreference(root: ThemeRoot, preference: ThemePreference): void {
    if (preference === 'system') root.removeAttribute(THEME_ATTRIBUTE);
    else root.setAttribute(THEME_ATTRIBUTE, preference);
}

export function resolveTheme(preference: ThemePreference, prefersDark: boolean): ResolvedTheme {
    if (preference === 'system') return prefersDark ? 'dark' : 'light';
    return preference;
}

// Browser chrome colors. Keep in sync with --color-desk (the body background) in src/styles/global.css.
export const THEME_COLORS: Record<ResolvedTheme, string> = {
    light: '#dcdad4',
    dark: '#100f14'
};

// Each <meta name="theme-color"> is tagged with the scheme it serves via a
// media query; an explicit choice overrides both of them.
export function themeColorFor(preference: ThemePreference, metaScheme: ResolvedTheme): string {
    return THEME_COLORS[preference === 'system' ? metaScheme : preference];
}
