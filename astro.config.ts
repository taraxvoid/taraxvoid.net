import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://taraxvoid.net',
    integrations: [sitemap()],
    output: 'static'
});
