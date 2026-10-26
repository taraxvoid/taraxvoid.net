import {
    type ResolvedTheme,
    type ThemePreference,
    themeColorFor,
} from './theme'

export function safeStorage(): Storage | null {
    try {
        return window.localStorage
    } catch {
        return null
    }
}

export function syncThemeColor(preference: ThemePreference) {
    for (const meta of document.querySelectorAll<HTMLMetaElement>(
        'meta[name="theme-color"]',
    )) {
        meta.content = themeColorFor(
            preference,
            meta.dataset.scheme as ResolvedTheme,
        )
    }
}
