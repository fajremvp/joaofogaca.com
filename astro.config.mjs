import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joaofogaca.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
