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
