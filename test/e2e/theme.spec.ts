import { type Page, expect, test } from '@playwright/test';

// Relative luminance of the body background, 0 (black) to 1 (white).
async function bodyLuminance(page: Page) {
    return page.evaluate(() => {
        const bg = getComputedStyle(document.body).backgroundColor;
        const [r, g, b] = (bg.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    });
}

const dataTheme = (page: Page) => page.evaluate(() => document.documentElement.getAttribute('data-theme'));

const storedTheme = (page: Page) => page.evaluate(() => localStorage.getItem('theme'));

const radio = (page: Page, name: string) => page.getByRole('radio', { name, exact: true });

test.describe('system is the default', () => {
    test.describe('browser prefers light', () => {
        test.use({ colorScheme: 'light' });

        test('renders light with no data-theme', async ({ page }) => {
            await page.goto('/');
            expect(await dataTheme(page)).toBeNull();
            expect(await bodyLuminance(page)).toBeGreaterThan(0.8);
            await expect(radio(page, 'System')).toBeChecked();
        });
    });

    test.describe('browser prefers dark', () => {
        test.use({ colorScheme: 'dark' });

        test('renders dark with no data-theme', async ({ page }) => {
            await page.goto('/');
            expect(await dataTheme(page)).toBeNull();
            expect(await bodyLuminance(page)).toBeLessThan(0.2);
        });
    });
});

test.describe('explicit choice', () => {
    test.use({ colorScheme: 'light' });

    test('dark overrides a light browser and persists across reloads', async ({ page }) => {
        await page.goto('/');
        await radio(page, 'Dark').check();

        expect(await dataTheme(page)).toBe('dark');
        expect(await storedTheme(page)).toBe('dark');
        expect(await bodyLuminance(page)).toBeLessThan(0.2);

        await page.reload();
        expect(await dataTheme(page)).toBe('dark');
        await expect(radio(page, 'Dark')).toBeChecked();
    });

    test('choosing system again clears the attribute and the stored key', async ({ page }) => {
        await page.goto('/');
        await radio(page, 'Dark').check();
        await radio(page, 'System').check();

        expect(await dataTheme(page)).toBeNull();
        expect(await storedTheme(page)).toBeNull();
        expect(await bodyLuminance(page)).toBeGreaterThan(0.8);
    });

    test('the toggle works from the keyboard', async ({ page }) => {
        await page.goto('/');
        await radio(page, 'System').focus();
        await page.keyboard.press('ArrowRight');

        await expect(radio(page, 'Light')).toBeChecked();
        expect(await dataTheme(page)).toBe('light');
    });

    test('browser chrome color follows the explicit choice', async ({ page }) => {
        await page.goto('/');
        await radio(page, 'Dark').check();
        const colors = await page
            .locator('meta[name="theme-color"]')
            .evaluateAll((els) => els.map((e) => e.getAttribute('content')));
        expect(colors).toEqual(['#100f14', '#100f14']);

        await radio(page, 'System').check();
        const restored = await page
            .locator('meta[name="theme-color"]')
            .evaluateAll((els) => els.map((e) => e.getAttribute('content')));
        expect(restored).toEqual(['#dcdad4', '#100f14']);
    });
});

test.describe('no flash', () => {
    test('the inline script alone applies a stored theme, before any bundle', async ({ page }) => {
        await page.route('**/_astro/**', (route) => route.abort());
        await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
        await page.goto('/');
        expect(await dataTheme(page)).toBe('dark');
    });
});

test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false, colorScheme: 'dark' });

    test('hides the dead control and still follows the browser', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('group', { name: 'Color theme' })).toBeHidden();
        expect(await bodyLuminance(page)).toBeLessThan(0.2);
    });
});

test('an explicit choice survives client-side navigation', async ({ page }) => {
    await page.goto('/');
    await radio(page, 'Dark').check();
    await page.getByRole('link', { name: 'Resume' }).click();
    await expect(page).toHaveURL(/\/resume$/);
    expect(await dataTheme(page)).toBe('dark');
    await expect(radio(page, 'Dark')).toBeChecked();
});
