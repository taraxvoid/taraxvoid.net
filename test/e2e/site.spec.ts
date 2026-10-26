import { expect, test } from '@playwright/test'

for (const path of ['/', '/resume']) {
    test(`${path} loads`, async ({ page }) => {
        const response = await page.goto(path)
        expect(response?.status()).toBe(200)
        await expect(page).toHaveTitle(/.+/)
    })
}

test('homepage never renders the legal name or phone number', async ({
    page,
}) => {
    await page.goto('/')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/REDACTED/i)
    expect(text).not.toMatch(/REDACTED_PHONE/)
})

test('homepage renders the inline contact form', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('form#contact')).toBeVisible()
})

test('the paper frame keeps the same width on every page', async ({ page }) => {
    const widths: number[] = []
    for (const path of ['/', '/resume']) {
        await page.goto(path)
        const box = await page.locator('.sheet').boundingBox()
        widths.push(Math.round(box?.width ?? 0))
    }
    expect(new Set(widths).size).toBe(1)
})

test('the name lockup links home and the theme toggle sits in the header', async ({
    page,
}) => {
    await page.goto('/resume')
    await page.getByRole('link', { name: /home/i }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('header [data-theme-toggle]')).toBeVisible()
})

test('the theme toggle is a circle as tall as Resume', async ({ page }) => {
    await page.goto('/')
    const toggle = await page.locator('[data-theme-toggle]').boundingBox()
    const resume = await page
        .locator('header')
        .getByRole('link', { name: 'Resume' })
        .boundingBox()
    expect(
        Math.abs((toggle?.height ?? 0) - (resume?.height ?? 0)),
    ).toBeLessThan(2)
    expect(Math.abs((toggle?.width ?? 0) - (toggle?.height ?? 0))).toBeLessThan(
        1,
    )
})

test('the old activities page redirects home', async ({ page }) => {
    await page.goto('/activities')
    await expect(page).toHaveURL(/\/$/)
})

test('the header links to GitHub from the lockup', async ({ page }) => {
    await page.goto('/')
    await expect(
        page
            .locator('header')
            .getByRole('link', { name: 'taraxvoid on GitHub' }),
    ).toHaveAttribute('href', 'https://github.com/taraxvoid')
})

test('the resume page offers a pdf download', async ({ page }) => {
    await page.goto('/resume')
    const href = await page
        .getByRole('link', { name: 'Download resume as PDF file (.pdf)' })
        .getAttribute('href')
    const response = await page.request.get(href ?? '')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('pdf')
})

test('the resume page offers a markdown download', async ({ page }) => {
    await page.goto('/resume')
    const href = await page
        .getByRole('link', { name: 'Download resume as Markdown file (.md)' })
        .getAttribute('href')
    const response = await page.request.get(href ?? '')
    expect(response.status()).toBe(200)
})

// iPhone 16 (393), Pixel 9 (412), Pixel 10 (412), plus a small-phone floor
for (const width of [360, 393, 412]) {
    test(`header lockup stays on one row at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 852 })
        await page.goto('/')
        const parts = page.locator('a.masthead-lockup > *')
        const boxes = await parts.evaluateAll((els) =>
            els.map((e) => {
                const r = e.getBoundingClientRect()
                return { top: r.top, bottom: r.bottom, right: r.right }
            }),
        )
        const firstTop = boxes[0].top
        for (const b of boxes)
            expect(Math.abs(b.top - firstTop)).toBeLessThan(40)
        expect(boxes.at(-1)?.right).toBeLessThanOrEqual(width)
        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth,
        )
        expect(overflow).toBe(false)
    })
}
