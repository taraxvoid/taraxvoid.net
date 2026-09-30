import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`${colorScheme} scheme`, () => {
        test.use({ colorScheme });

        for (const path of ['/', '/activities', '/resume']) {
            test(`${path} has no axe violations`, async ({ page }) => {
                await page.goto(path);
                const results = await new AxeBuilder({ page }).analyze();
                expect(results.violations).toEqual([]);
            });
        }
    });
}
