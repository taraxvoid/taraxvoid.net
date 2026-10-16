import {
    applyPreference,
    type ResolvedTheme,
    readStoredPreference,
    type ThemePreference,
    themeColorFor
} from './theme';

export function safeStorage(): Storage | null {
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

export function syncThemeColor(preference: ThemePreference) {
    for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
        meta.content = themeColorFor(preference, meta.dataset.scheme as ResolvedTheme);
    }
}

// ClientRouter swaps <html> attributes and <head> metas with the incoming
// page's (which know nothing about the stored choice), so re-apply it after
// every swap. Imported once from HeadMeta.astro.
document.addEventListener('astro:after-swap', () => {
    const preference = readStoredPreference(safeStorage());
    applyPreference(document.documentElement, preference);
    syncThemeColor(preference);
});
