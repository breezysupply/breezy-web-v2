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
    mode: 'standalone',
    host: '0.0.0.0'
  }),
  build: {
    client: './dist/client',
    server: './dist/server'
  }
});