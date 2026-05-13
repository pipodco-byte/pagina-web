# Technical Design: separar-contenido-layout

## Overview

This document provides the technical design for separating content from presentation in the Astro-Ecommerce blog using Astro Content Collections. The design establishes a clear architectural boundary between markdown content files and their visual presentation through reusable layout components.

---

## 1. Architecture Overview

### 1.1 Layer Separation

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│  ┌──────────────────────┐      ┌──────────────────────┐         │
│  │ BlogPostLayout.astro │      │ BlogIndexLayout.astro│         │
│  │  - Header/Title      │      │  - Post Grid         │         │
│  │  - Content Slot      │      │  - Filters           │         │
│  │  - Navigation        │      │  - Pagination        │         │
│  │  - SEO Meta          │      │  - SEO Meta          │         │
│  └──────────────────────┘      └──────────────────────┘         │
├─────────────────────────────────────────────────────────────────┤
│                        DATA LAYER                               │
│  ┌──────────────────────────────────────────────────────┐       │
│  │            Astro Content Collections                 │       │
│  │         (type-safe, schema-validated)                │       │
│  └──────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│                       CONTENT LAYER                             │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  src/content/blog/*.md (73 articles)                 │       │
│  │  - YAML frontmatter                                  │       │
│  │  - Markdown body                                     │       │
│  │  - UTF-8 encoding                                    │       │
│  └──────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 System Boundaries

| Layer | Responsibility | Files |
|-------|---------------|-------|
| **Content** | Store article data | `src/content/blog/*.md` |
| **Schema** | Validate & type content | `src/content/config.ts` |
| **Routing** | Map URLs to content | `src/pages/blog/[...slug].astro` |
| **Layout** | Render visual presentation | `src/layouts/BlogPostLayout.astro` |

---

## 2. Component Structure

### 2.1 Directory Tree

```
src/
├── content/
│   ├── config.ts                    # Collection schema definition
│   └── blog/                        # Blog post collection
│       ├── reparacion-iphone-chapinero.md
│       ├── que-es-marketing-digital.md
│       ├── ventas-online-estrategias.md
│       └── ... (70 more articles)
├── layouts/
│   ├── BlogPostLayout.astro         # Single post layout
│   └── BlogIndexLayout.astro        # Listing page layout
└── pages/
    └── blog/
        ├── [...slug].astro          # Dynamic post route
        └── index.astro              # Blog index/listing
```

### 2.2 File Relationships

```mermaid
graph TD
    A[src/content/blog/*.md] -->|getCollection| B[src/pages/blog/[...slug].astro]
    A -->|getCollection| C[src/pages/blog/index.astro]
    D[src/content/config.ts] -->|validates| A
    B -->|renders with| E[src/layouts/BlogPostLayout.astro]
    C -->|renders with| F[src/layouts/BlogIndexLayout.astro]
    E -->|outputs| G[HTML + SEO Meta]
    F -->|outputs| H[HTML + Post Grid]
```

---

## 3. Data Flow

### 3.1 Single Post Rendering Flow

```
1. Build-time: getStaticPaths()
   └─> getCollection('blog') reads all .md files
   └─> Generates route for each post.data.slug

2. Request-time: [...slug].astro
   └─> Matches slug to post entry
   └─> Calls post.render() → Content component
   └─> Passes post.data as props to BlogPostLayout

3. Layout: BlogPostLayout.astro
   └─> Receives frontmatter via props
   └─> Renders <head> with SEO meta tags
   └─> Renders <slot /> (markdown content)
   └─> Outputs final HTML
```

### 3.2 Index Page Rendering Flow

```
1. Build-time: index.astro
   └─> getCollection('blog') reads all posts
   └─> Sorts by publishDate (descending)
   └─> Filters by query params if present

2. Layout: BlogIndexLayout.astro
   └─> Receives posts array
   └─> Renders header, filters, post grid
   └─> Outputs paginated HTML
```

### 3.3 Data Transformation Pipeline

```typescript
// Step 1: Raw Markdown
// File: src/content/blog/article.md
---
title: "Example Post"
description: "A description"
slug: "example-post"
publishDate: 2025-01-15
---
# Content here

// Step 2: Collection Entry (validated)
const post: CollectionEntry<'blog'> = {
  id: 'article.md',
  slug: 'example-post',
  body: '# Content here',
  collection: 'blog',
  data: {
    title: 'Example Post',
    description: 'A description',
    // ... validated fields
  }
}

// Step 3: Rendered Component
const { Content } = await post.render()
// Content is now an Astro component ready for rendering

// Step 4: Layout Props
interface Props {
  title: string
  description: string
  author: string
  publishDate: Date
  // ... other frontmatter fields
}
```

---

## 4. Schema Definition

### 4.1 Zod Schema (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

/**
 * Blog post collection schema
 * Validates all 11 frontmatter fields for type safety
 */
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core content fields
    title: z.string()
      .min(10, 'Title must be at least 10 characters')
      .max(100, 'Title must be at most 100 characters'),
    
    description: z.string()
      .min(50, 'Description must be at least 50 characters')
      .max(160, 'Description must be at most 160 characters'),
    
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

// Type inference for TypeScript
type BlogPost = z.infer<typeof blogCollection.schema>;
export type { BlogPost };
```

### 4.2 Schema Field Summary

| Field | Zod Type | Constraints | Default |
|-------|----------|-------------|---------|
| title | string | min: 10, max: 100 | required |
| description | string | min: 50, max: 160 | required |
| slug | string | kebab-case regex | required |
| publishDate | date | valid date | required |
| author | literal | must be "kimi" | required |
| category | string | min: 2, max: 50 | required |
| tags | string[] | 1-10 items | required |
| canonical | string | valid URL | required |
| ogImage | string | any string | required |
| schemaType | enum | BlogPosting/Article/TechArticle | "BlogPosting" |
| locale | string | any string | "es-ES" |

### 4.3 TypeScript Type Generation

```typescript
// Auto-generated types from schema
import type { CollectionEntry } from 'astro:content';

// Single blog post entry type
type BlogPostEntry = CollectionEntry<'blog'>;

// Blog post data type (frontmatter only)
type BlogPostData = BlogPostEntry['data'];

// Usage in layouts
interface Props extends BlogPostData {
  // Additional layout-specific props if needed
}
```

---

## 5. Layout Implementation

### 5.1 BlogPostLayout.astro

```astro
---
// src/layouts/BlogPostLayout.astro
import type { BlogPost } from '../content/config';
import BaseLayout from './BaseLayout.astro';

interface Props extends BlogPost {
  // Layout can extend or override specific fields
}

const {
  title,
  description,
  author,
  publishDate,
  tags,
  category,
  canonical,
  ogImage,
  schemaType,
  locale,
} = Astro.props;

// Format date for display
const formattedDate = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(publishDate);

// Schema.org JSON-LD
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': schemaType,
  headline: title,
  description: description,
  author: {
    '@type': 'Person',
    name: author,
  },
  datePublished: publishDate.toISOString(),
  image: ogImage,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': canonical,
  },
};
---

<BaseLayout title={title} description={description}>
  <!-- SEO Meta Tags -->
  <link rel="canonical" href={canonical} slot="head" />
  <meta name="author" content={author} slot="head" />
  
  <!-- OpenGraph -->
  <meta property="og:title" content={title} slot="head" />
  <meta property="og:description" content={description} slot="head" />
  <meta property="og:type" content="article" slot="head" />
  <meta property="og:url" content={canonical} slot="head" />
  <meta property="og:image" content={ogImage} slot="head" />
  <meta property="og:locale" content={locale} slot="head" />
  <meta property="article:published_time" content={publishDate.toISOString()} slot="head" />
  <meta property="article:author" content={author} slot="head" />
  <meta property="article:section" content={category} slot="head" />
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json" set:html={JSON.stringify(schemaOrg)} slot="head" />

  <!-- Article Header -->
  <header class="blog-post-header">
    <span class="category-badge">{category}</span>
    <h1>{title}</h1>
    <div class="meta">
      <time datetime={publishDate.toISOString()}>{formattedDate}</time>
      <span class="author">por {author}</span>
    </div>
  </header>

  <!-- Article Content -->
  <article class="blog-post-content">
    <slot />
  </article>

  <!-- Article Footer -->
  <footer class="blog-post-footer">
    <div class="tags">
      {tags.map(tag => (
        <a href={`/blog?tag=${encodeURIComponent(tag)}`} class="tag">
          #{tag}
        </a>
      ))}
    </div>
  </footer>
</BaseLayout>
```

### 5.2 BlogIndexLayout.astro

```astro
---
// src/layouts/BlogIndexLayout.astro
import type { CollectionEntry } from 'astro:content';
import BaseLayout from './BaseLayout.astro';

interface Props {
  title?: string;
  description?: string;
  posts: CollectionEntry<'blog'>[];
  categoryFilter?: string;
  tagFilter?: string;
}

const {
  title = 'Blog',
  description = 'Artículos sobre marketing, ventas y productividad',
  posts,
  categoryFilter,
  tagFilter,
} = Astro.props;

// Extract unique categories and tags
const categories = [...new Set(posts.map(p => p.data.category))];
const allTags = [...new Set(posts.flatMap(p => p.data.tags))];
---

<BaseLayout title={title} description={description}>
  <div class="blog-index">
    <!-- Header -->
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>

    <!-- Filters -->
    <aside class="filters">
      {categories.length > 0 && (
        <div class="category-filter">
          <label for="category">Categoría:</label>
          <select id="category" onchange="window.location.href=this.value">
            <option value="/blog">Todas</option>
            {categories.map(cat => (
              <option 
                value={`/blog?category=${encodeURIComponent(cat)}`}
                selected={cat === categoryFilter}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
    </aside>

    <!-- Post Grid -->
    <div class="post-grid">
      {posts.map(post => (
        <article class="post-card">
          <a href={`/blog/${post.data.slug}`}>
            <h2>{post.data.title}</h2>
            <p>{post.data.description}</p>
            <footer>
              <time datetime={post.data.publishDate.toISOString()}>
                {new Date(post.data.publishDate).toLocaleDateString('es-ES')}
              </time>
              <span class="category">{post.data.category}</span>
            </footer>
          </a>
        </article>
      ))}
    </div>

    <!-- Empty State -->
    {posts.length === 0 && (
      <div class="empty-state">
        <p>No hay artículos disponibles.</p>
      </div>
    )}
  </div>
</BaseLayout>
```

### 5.3 [...slug].astro (Dynamic Route)

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

// Generate static paths at build time
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  
  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

// Get the post from props
const { post } = Astro.props;

// Render the markdown content
const { Content } = await post.render();
---

<!-- Pass frontmatter as props to layout -->
<BlogPostLayout {...post.data}>
  <Content />
</BlogPostLayout>
```

### 5.4 index.astro (Blog Index)

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BlogIndexLayout from '../../layouts/BlogIndexLayout.astro';

// Get all blog posts
const allPosts = await getCollection('blog');

// Get query params
const { category, tag } = Astro.url.searchParams;

// Filter posts if needed
let posts = allPosts.sort(
  (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);

if (category) {
  posts = posts.filter(p => 
    p.data.category.toLowerCase() === category.toLowerCase()
  );
}

if (tag) {
  posts = posts.filter(p => 
    p.data.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Page metadata
const title = category 
  ? `Artículos de ${category} | Blog`
  : tag 
    ? `Artículos etiquetados con #${tag} | Blog`
    : 'Blog';

const description = category
  ? `Descubre todos nuestros artículos sobre ${category}`
  : 'Artículos sobre marketing, ventas y productividad para tu negocio';
---

<BlogIndexLayout 
  title={title}
  description={description}
  posts={posts}
  categoryFilter={category || undefined}
  tagFilter={tag || undefined}
/>
```

---

## 6. Migration Strategy

### 6.1 Phased Migration Approach

```
Phase 1: Setup (Safe - No Production Impact)
├── Create src/content/config.ts with schema
├── Create src/content/blog/ directory
└── Copy (not move) all 73 articles to new location

Phase 2: Layout Development (Safe - No Production Impact)
├── Create BlogPostLayout.astro
├── Create BlogIndexLayout.astro
├── Create [...slug].astro dynamic route
└── Test with sample articles locally

Phase 3: Integration Testing (Staging)
├── Verify all 73 articles render correctly
├── Check all URLs respond 200
├── Validate SEO meta tags
├── Test responsive design
└── Performance check

Phase 4: Go Live
├── Deploy new routes to production
├── Monitor for 404s
├── Verify search engine indexing
└── (Optional) Remove old article locations
```

### 6.2 File Migration Mapping

| Source Path | Destination Path | Status |
|-------------|------------------|--------|
| `openspec/changes/50-articulos-seo/articulos-fase-1/*.md` | `src/content/blog/*.md` | Copy |
| `openspec/changes/50-articulos-seo/articulos-fase-2/*.md` | `src/content/blog/*.md` | Copy |
| `openspec/changes/50-articulos-seo/articulos-fase-3/*.md` | `src/content/blog/*.md` | Copy |
| `openspec/changes/50-articulos-seo/articulos-fase-4/*.md` | `src/content/blog/*.md` | Copy |
| `openspec/changes/50-articulos-seo/articulos-reciclados/*.md` | `src/content/blog/*.md` | Copy |

### 6.3 Frontmatter Migration Mapping

```typescript
// Migration mapping from old to new schema
const frontmatterMapping = {
  // Core fields (may need renaming)
  'titulo': 'title',
  'descripcion': 'description',
  'fecha': 'publishDate',
  'categoria': 'category',
  'etiquetas': 'tags',
  
  // Fields to generate if missing
  'slug': (fileName: string) => fileName.replace('.md', ''),
  'author': () => 'kimi',
  'canonical': (slug: string) => `https://astrosaas.com/blog/${slug}`,
  'ogImage': () => '/images/blog/default-og.jpg',
  'schemaType': () => 'BlogPosting',
  'locale': () => 'es-ES',
};
```

### 6.4 Validation Checklist

- [ ] All 73 files copied to `src/content/blog/`
- [ ] All files have valid frontmatter (pass schema validation)
- [ ] All slugs are unique and URL-safe
- [ ] All publishDate values are valid dates
- [ ] All canonical URLs are valid
- [ ] All ogImage paths exist or have defaults
- [ ] No duplicate tags in any article
- [ ] All categories are standardized

### 6.5 Rollback Plan

If issues occur in production:

1. **Immediate:** Old articles remain in original location (copied, not moved)
2. **Quick fix:** Revert to old routing if needed
3. **Recovery:** Fix issues and redeploy
4. **Cleanup:** Only remove old locations after 30 days of stability

---

## 7. SEO Preservation Strategy

### 7.1 Critical SEO Elements

| Element | Implementation | Verification |
|---------|---------------|--------------|
| `<title>` | `${title} \| AstroSaaS Blog` | View page source |
| `<meta name="description">` | From frontmatter | SEO audit tool |
| `<link rel="canonical">` | From frontmatter.canonical | View page source |
| OpenGraph tags | Full set in layout | Facebook Debugger |
| Schema.org JSON-LD | In `<head>` | Google Rich Results |
| URL structure | `/blog/{slug}` | Consistent |
| Redirects | If old URLs differ | 301 redirects |

### 7.2 URL Preservation

```typescript
// If old URLs were different, implement redirects
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/articulos/[...slug]': '/blog/[...slug]',
  },
});
```

---

## 8. Performance Considerations

### 8.1 Build-time Optimizations

- All 73 pages are statically generated at build time
- No server-side rendering needed for blog posts
- Content is validated once at build, not at runtime

### 8.2 Runtime Optimizations

- No database queries (static HTML)
- Minimal JavaScript (progressive enhancement)
- Image optimization via Astro's built-in features

### 8.3 Bundle Size

- Layout components are shared across all posts
- Common CSS is extracted and cached
- Per-page JavaScript is minimal

---

## 9. Error Handling

### 9.1 Build-time Errors

```typescript
// Schema validation failures will fail the build
try {
  const posts = await getCollection('blog');
} catch (error) {
  // Build will fail with detailed error message
  // Including file path and field name
  console.error('Content validation failed:', error);
}
```

### 9.2 Runtime Errors

```astro
// 404 handling for missing slugs
// Astro automatically returns 404 for unmatched routes

// Custom 404 page
// src/pages/404.astro
---
<h1>Artículo no encontrado</h1>
<a href="/blog">Ver todos los artículos</a>
---
```

---

## 10. Testing Strategy

### 10.1 Unit Tests

- Schema validation tests
- Frontmatter parsing tests
- Component rendering tests

### 10.2 Integration Tests

- All 73 routes return 200
- SEO meta tags present
- Responsive design across breakpoints
- Filter functionality works

### 10.3 Build Tests

```bash
# Verify build completes
npm run build

# Verify no 404s in output
find dist -name "*.html" | wc -l  # Should be 74+ (73 posts + index)

# Verify TypeScript
npx astro check
```

---

## 11. Key Design Decisions

### Decision 1: Copy vs Move Migration
**Decision:** Copy articles initially, don't move them.

**Rationale:**
- Allows parallel testing of old and new systems
- Provides instant rollback capability
- No risk of data loss
- Can verify all 73 articles work before removing originals

### Decision 2: Zod Schema Validation
**Decision:** Use Zod for strict frontmatter validation.

**Rationale:**
- Type safety at build time
- Clear error messages for invalid content
- TypeScript integration
- Astro native support

### Decision 3: Separate Layout Components
**Decision:** Create dedicated BlogPostLayout and BlogIndexLayout.

**Rationale:**
- Clear separation of concerns
- Reusable across multiple page types
- Easier to maintain and update
- Follows Astro best practices

### Decision 4: Static Generation
**Decision:** Use `getStaticPaths()` for all blog posts.

**Rationale:**
- Better performance (pre-rendered HTML)
- No runtime database dependencies
- SEO-friendly (no client-side rendering needed)
- Lower hosting costs

### Decision 5: Query-based Filtering
**Decision:** Use URL query params for filters (`?category=marketing`).

**Rationale:**
- Simple to implement
- No complex routing needed
- SEO-friendly (single URL for listing)
- Easy to bookmark and share filtered views

---

## 12. Implementation Checklist

### Phase 1: Content Setup
- [ ] Create `src/content/config.ts` with Zod schema
- [ ] Create `src/content/blog/` directory
- [ ] Copy all 73 articles from source directories
- [ ] Validate all frontmatter
- [ ] Generate missing fields (slug, canonical, etc.)

### Phase 2: Layout Creation
- [ ] Create `src/layouts/BlogPostLayout.astro`
- [ ] Create `src/layouts/BlogIndexLayout.astro`
- [ ] Implement SEO meta tags in layouts
- [ ] Add responsive styling
- [ ] Test with sample articles

### Phase 3: Routing
- [ ] Create `src/pages/blog/[...slug].astro`
- [ ] Create `src/pages/blog/index.astro`
- [ ] Implement getStaticPaths()
- [ ] Add filtering logic
- [ ] Test all routes

### Phase 4: Testing
- [ ] Build completes without errors
- [ ] All 73 articles render correctly
- [ ] All URLs return 200
- [ ] SEO meta tags validated
- [ ] Responsive design tested
- [ ] Performance acceptable

### Phase 5: Deployment
- [ ] Deploy to staging
- [ ] Verify in staging environment
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] (Optional) Remove old article locations after 30 days

---

*Technical Design created for change: separar-contenido-layout*
