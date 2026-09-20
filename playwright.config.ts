import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.CI ? 8787 : 4321;
const localBaseURL = `http://localhost:${PORT}`;

export default defineConfig({
    testDir: './test/e2e',
    timeout: 60_000,
    fullyParallel: true,
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL ?? localBaseURL,
        serviceWorkers: 'block'
    },
    webServer: process.env.PLAYWRIGHT_BASE_URL
        ? undefined
        : {
              command: `wrangler dev --config dist/client/wrangler.json --port ${PORT}`,
              url: localBaseURL,
              reuseExistingServer: !process.env.CI,
              timeout: 60_000
          },
    projects: [
        {
            name: 'mobile-chrome',
            use: devices['Pixel 7'],
            testIgnore: /a11y\.spec\.ts/
        },
        {
            name: 'desktop-chrome',
            use: devices['Desktop Chrome'],
            testIgnore: /a11y\.spec\.ts/
        },
        {
            name: 'a11y',
            use: devices['Pixel 7'],
            testMatch: /a11y\.spec\.ts/
        }
    ]
});
