import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ipaulogermano.github.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
