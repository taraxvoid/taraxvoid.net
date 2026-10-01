import { expect, test } from '@playwright/test';

for (const path of ['/', '/activities', '/resume']) {
    test(`${path} loads`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await expect(page).toHaveTitle(/.+/);
    });
}

test('homepage never renders the legal name or phone number', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/REDACTED/i);
    expect(text).not.toMatch(/REDACTED_PHONE/);
});

test('homepage renders the inline contact form', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('form#contact')).toBeVisible();
});

test('the paper frame keeps the same width on every page', async ({ page }) => {
    const widths: number[] = [];
    for (const path of ['/', '/activities', '/resume']) {
        await page.goto(path);
        const box = await page.locator('.sheet').boundingBox();
        widths.push(Math.round(box?.width ?? 0));
    }
    expect(new Set(widths).size).toBe(1);
});

test('the name lockup links home and the theme toggle sits in the header', async ({ page }) => {
    await page.goto('/resume');
    await page.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('header [data-theme-toggle]')).toBeVisible();
});

test('the resume page offers a pdf download', async ({ page }) => {
    await page.goto('/resume');
    const href = await page.getByRole('link', { name: 'Download .pdf' }).getAttribute('href');
    const response = await page.request.get(href ?? '');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
});
