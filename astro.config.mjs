import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.pipod.co',
  integrations: [react(), sitemap(), mermaid()],
  output: 'server',
  adapter: vercel(),
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
  },
});

