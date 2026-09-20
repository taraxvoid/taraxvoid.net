import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://taraxvoid.net',
    output: 'static',
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [sitemap()],
    adapter: cloudflare({
        imageService: 'passthrough'
    })
});
