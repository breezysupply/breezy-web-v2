// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    client: './client',
    server: './server',
    serverEntry: 'entry.mjs'
  },
  site: 'https://your-site-url.com', // Add your site URL here
});