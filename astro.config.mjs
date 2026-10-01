import { execSync } from 'node:child_process';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Resolved here (plain Node) because page frontmatter runs in the workerd
// runner, which has no child_process.
let gitRev = 'unknown';
try {
    gitRev = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString()
        .trim();
} catch {
    // no git context at build time (e.g. a source tarball); keep the fallback
}

export default defineConfig({
    site: 'https://taraxvoid.net',
    output: 'static',
    prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
    vite: {
        define: { __GIT_REV__: JSON.stringify(gitRev) },
        plugins: [tailwindcss()],
        optimizeDeps: {
            // Missing from the adapter's prebundle list; discovering them late
            // triggers a mid-startup re-optimize that crashes the dev runner.
            include: ['astro/app/manifest', 'astro/logger/json']
        }
    },
    redirects: { '/contact': '/#contact' },
    integrations: [sitemap()],
    adapter: cloudflare({
        imageService: 'passthrough'
    })
});
