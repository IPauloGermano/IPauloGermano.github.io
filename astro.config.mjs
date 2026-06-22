import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ipaulogermano.github.io',
  output: 'static',
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
