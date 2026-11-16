import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.md',
  }),
});

export const collections = { pages };
