import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://taraxvoid.net',
    output: 'static',
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            // Missing from the adapter's prebundle list; discovering them late
            // triggers a mid-startup re-optimize that crashes the dev runner.
            include: ['astro/app/manifest', 'astro/logger/json']
        }
    },
    integrations: [sitemap()],
    adapter: cloudflare({
        imageService: 'passthrough'
    })
});
