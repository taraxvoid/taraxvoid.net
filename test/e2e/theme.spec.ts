import { expect, type Page, test } from '@playwright/test'

// Relative luminance of the body background, 0 (black) to 1 (white).
async function bodyLuminance(page: Page) {
    return page.evaluate(() => {
        const bg = getComputedStyle(document.body).backgroundColor
        const [r, g, b] = (bg.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number)
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    })
}

const dataTheme = (page: Page) =>
    page.evaluate(() => document.documentElement.getAttribute('data-theme'))

const storedTheme = (page: Page) =>
    page.evaluate(() => localStorage.getItem('theme'))

const toggle = (page: Page) =>
    page.getByRole('button', { name: /switch to (light|dark) theme/i })

test.describe('system is the default', () => {
    test.describe('browser prefers light', () => {
        test.use({ colorScheme: 'light' })

        test('renders light with no data-theme', async ({ page }) => {
            await page.goto('/')
            expect(await dataTheme(page)).toBeNull()
            expect(await bodyLuminance(page)).toBeGreaterThan(0.8)
            await expect(toggle(page)).toHaveAccessibleName(
                'Switch to dark theme',
            )
        })
    })

    test.describe('browser prefers dark', () => {
        test.use({ colorScheme: 'dark' })

        test('renders dark with no data-theme', async ({ page }) => {
            await page.goto('/')
            expect(await dataTheme(page)).toBeNull()
            expect(await bodyLuminance(page)).toBeLessThan(0.2)
        })
    })
})

test.describe('explicit choice', () => {
    test.use({ colorScheme: 'light' })

    test('dark overrides a light browser and persists across reloads', async ({
        page,
    }) => {
        await page.goto('/')
        await toggle(page).click()

        expect(await dataTheme(page)).toBe('dark')
        expect(await storedTheme(page)).toBe('dark')
        expect(await bodyLuminance(page)).toBeLessThan(0.2)

        await page.reload()
        expect(await dataTheme(page)).toBe('dark')
        await expect(toggle(page)).toHaveAccessibleName('Switch to light theme')
    })

    test('toggling back to the browser preference clears the attribute and the stored key', async ({
        page,
    }) => {
        await page.goto('/')
        await toggle(page).click()
        await toggle(page).click()

        expect(await dataTheme(page)).toBeNull()
        expect(await storedTheme(page)).toBeNull()
        expect(await bodyLuminance(page)).toBeGreaterThan(0.8)
    })

    test('the toggle works from the keyboard', async ({ page }) => {
        await page.goto('/')
        await toggle(page).focus()
        await page.keyboard.press('Enter')

        expect(await dataTheme(page)).toBe('dark')
    })

    test('browser chrome color follows the explicit choice', async ({
        page,
    }) => {
        await page.goto('/')
        await toggle(page).click()
        const colors = await page
            .locator('meta[name="theme-color"]')
            .evaluateAll((els) => els.map((e) => e.getAttribute('content')))
        expect(colors).toEqual(['#2b2935', '#2b2935'])

        await toggle(page).click()
        const restored = await page
            .locator('meta[name="theme-color"]')
            .evaluateAll((els) => els.map((e) => e.getAttribute('content')))
        expect(restored).toEqual(['#dcdad4', '#2b2935'])
    })
})

test.describe('no flash', () => {
    test('the inline script alone applies a stored theme, before any bundle', async ({
        page,
    }) => {
        await page.route('**/_astro/**', (route) => route.abort())
        await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
        await page.goto('/')
        expect(await dataTheme(page)).toBe('dark')
    })
})

test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false, colorScheme: 'dark' })

    test('hides the dead control and still follows the browser', async ({
        page,
    }) => {
        await page.goto('/')
        await expect(page.locator('[data-theme-toggle]')).toBeHidden()
        expect(await bodyLuminance(page)).toBeLessThan(0.2)
    })
})

test('an explicit choice survives client-side navigation', async ({ page }) => {
    await page.goto('/')
    await toggle(page).click()
    await page.getByRole('link', { name: 'Resume' }).click()
    await expect(page).toHaveURL(/\/resume\/?$/)
    expect(await dataTheme(page)).toBe('dark')
    await expect(toggle(page)).toHaveAccessibleName('Switch to light theme')
})
