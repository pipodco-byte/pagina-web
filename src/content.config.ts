import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog post collection schema
 * Validates all 11 frontmatter fields for type safety
 */
const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
  }),
  schema: z.object({
    // Core content fields
    title: z.string()
      .min(10, 'Title must be at least 10 characters')
      .max(100, 'Title must be at most 100 characters'),
    
    description: z.string()
      .min(50, 'Description must be at least 50 characters')
      .max(170, 'Description must be at most 170 characters'),
    
    // URL and routing
    slug: z.string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be URL-friendly (lowercase, hyphens only)'
      ),
    
    // Metadata
    publishDate: z.coerce.date(),
    
    author: z.literal('kimi', {
      invalid_type_error: 'Author must be "kimi"'
    }),
    
    category: z.string()
      .min(2, 'Category must be at least 2 characters')
      .max(50, 'Category must be at most 50 characters'),
    
    tags: z.array(z.string())
      .min(1, 'Must have at least 1 tag')
      .max(10, 'Must have at most 10 tags'),
    
    // SEO fields
    canonical: z.string().url('Canonical must be a valid URL'),
    
    ogImage: z.string(),
    
    schemaType: z.enum(['BlogPosting', 'Article', 'TechArticle'])
      .default('BlogPosting'),
    
    locale: z.string()
      .default('es-ES'),
  }),
});

export const collections = {
  blog: blogCollection,
};
