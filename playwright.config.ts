import { createServer } from 'node:net';
import { defineConfig, devices } from '@playwright/test';

// Multiple worktrees of this repo (or an unrelated process) can already
// hold Astro's default port, so ask the OS for a free one outside CI
// instead of hardcoding one (mirrors ravenflight.io's playwright.config.ts).
async function getFreePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        const srv = createServer();
        srv.unref();
        srv.on('error', reject);
        srv.listen(0, () => {
            const address = srv.address();
            if (address === null || typeof address === 'string') {
                reject(new Error('failed to determine free port'));
                return;
            }
            srv.close(() => resolve(address.port));
        });
    });
}

if (!process.env.CI && !process.env.PLAYWRIGHT_BASE_URL && !process.env.PLAYWRIGHT_TEST_PORT) {
    process.env.PLAYWRIGHT_TEST_PORT = String(await getFreePort());
}
const PORT = process.env.CI ? 8787 : process.env.PLAYWRIGHT_TEST_PORT;
const localBaseURL = `http://localhost:${PORT}`;

export default defineConfig({
    testDir: './test/e2e',
    timeout: 60_000,
    fullyParallel: true,
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL ?? localBaseURL,
        serviceWorkers: 'block'
    },
    // `serve` (not `astro preview` or `wrangler dev`) on purpose: Astro 7's
    // `preview` spawns a background daemon and returns immediately, which
    // Playwright reads as the process exiting early; `wrangler dev` needs
    // Cloudflare auth this repo's CI doesn't have configured yet, and
    // there are no Workers-specific routes (no /api/*, no bindings read at
    // runtime) to need it for. Revisit once /api/contact or
    // /api/github-stats land.
    webServer: process.env.PLAYWRIGHT_BASE_URL
        ? undefined
        : {
              command: `bunx serve dist/client -p ${PORT}`,
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
