import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://ipaulogermano.github.io';

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap({
      customPages: [new URL('/rss.xml', site).href]
    })
  ],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid']
    },
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
