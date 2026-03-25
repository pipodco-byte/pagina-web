import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://www.pipod.co',
  integrations: [react(), sitemap(), mermaid()],
  output: 'static'
});

