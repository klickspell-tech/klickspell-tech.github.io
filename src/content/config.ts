import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Atul Bhatt'),
    tags: z.array(z.string()).default([]),
    canonicalUrl: z.string().optional(),
    coverImage: z.string().optional(),
    devtoUrl: z.string().optional(),
    readingTime: z.string().optional(),
  }),
});

export const collections = { blog };
