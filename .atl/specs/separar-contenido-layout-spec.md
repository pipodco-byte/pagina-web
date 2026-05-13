# Specification: separar-contenido-layout

## Overview

Separate content from presentation in the Astro-Ecommerce blog by implementing Astro Content Collections. This change establishes a clean separation where markdown content exists independently from visual layout components.

---

## 1. Content Migration Requirements

### 1.1 Source Content Location
- **Source:** `openspec/changes/50-articulos-seo/`
  - `articulos-fase-1/` - 17 articles
  - `articulos-fase-2/` - 20 articles
  - `articulos-fase-3/` - 15 articles
  - `articulos-fase-4/` - 15 articles
  - `articulos-reciclados/` - 6 articles
  - **Total:** 73 articles

### 1.2 Target Content Location
- **Destination:** `src/content/blog/`
- All 73 markdown files must be migrated preserving content integrity

### 1.3 File Format
- **Format:** `.md` files with YAML frontmatter
- **Encoding:** UTF-8
- **Line endings:** LF (Unix-style)

### 1.4 Required Frontmatter Schema

All articles must include the following standardized frontmatter fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Article title (50-60 chars for SEO) |
| `description` | string | Yes | Meta description (150-160 chars) |
| `slug` | string | Yes | URL-friendly identifier (kebab-case) |
| `publishDate` | Date | Yes | Publication date (ISO 8601: YYYY-MM-DD) |
| `author` | string | Yes | Fixed value: "kimi" |
| `category` | string | Yes | Primary category (e.g., "Marketing", "Ventas", "Productividad") |
| `tags` | string[] | Yes | Array of related tags (3-8 tags recommended) |
| `canonical` | string | Yes | Canonical URL for SEO |
| `ogImage` | string | Yes | OpenGraph image path (relative or absolute URL) |
| `schemaType` | string | Yes | Schema.org type (e.g., "BlogPosting", "Article") |
| `locale` | string | Yes | Language code (e.g., "es", "es-ES") |

### 1.5 Frontmatter Validation Rules

```yaml
# Example valid frontmatter
---
title: "10 Estrategias de Marketing Digital para 2025"
description: "Descubre las estrategias más efectivas de marketing digital que impulsarán tu negocio en 2025. Guía completa con casos de éxito."
slug: "estrategias-marketing-digital-2025"
publishDate: 2025-01-15
author: "kimi"
category: "Marketing"
tags: ["marketing digital", "estrategias", "2025", "seo", "redes sociales"]
canonical: "https://astrosaas.com/blog/estrategias-marketing-digital-2025"
ogImage: "/images/blog/og-marketing-2025.jpg"
schemaType: "BlogPosting"
locale: "es-ES"
---
```

### 1.6 Migration Rules

1. **Preserve original content** - Do not modify article body text
2. **Standardize existing frontmatter** - Map existing fields to new schema
3. **Generate missing fields** - Create required fields if not present:
   - `slug`: Derive from filename or title (kebab-case)
   - `author`: Set to "kimi" for all articles
   - `canonical`: Build from base URL + slug
   - `ogImage`: Use default or derive from content
   - `schemaType`: Default to "BlogPosting"
   - `locale`: Default to "es-ES"
4. **Validate date formats** - Ensure `publishDate` is valid ISO 8601
5. **Clean up tags** - Remove duplicates, normalize case

---

## 2. Layout Requirements

### 2.1 BlogPostLayout.astro

**Location:** `src/layouts/BlogPostLayout.astro`

#### Props Interface

```typescript
interface Props {
  title: string;
  description: string;
  author: string;
  publishDate: Date;
  tags: string[];
  category: string;
  canonical?: string;
  ogImage?: string;
  schemaType?: string;
  locale?: string;
}
```

#### Render Requirements

The layout must render:

1. **Header Section**
   - Title (H1)
   - Publication date (formatted: "15 de enero de 2025")
   - Author name with avatar/icon
   - Category badge/link

2. **Content Section**
   - Article content slot (`<slot />`)
   - Proper typography hierarchy (H2, H3, H4)
   - Styled lists, blockquotes, code blocks
   - Image handling with captions

3. **Meta Section**
   - Tags list (clickable links)
   - Share buttons (optional)
   - Author bio card (optional)

4. **Navigation Section**
   - Previous/Next post links
   - Related posts (same category)

#### SEO Requirements

Must include in `<head>`:

1. **Standard Meta Tags**
   ```html
   <title>{title} | AstroSaaS Blog</title>
   <meta name="description" content={description} />
   <link rel="canonical" href={canonical} />
   <meta name="author" content={author} />
   ```

2. **OpenGraph Tags**
   ```html
   <meta property="og:title" content={title} />
   <meta property="og:description" content={description} />
   <meta property="og:type" content="article" />
   <meta property="og:url" content={canonical} />
   <meta property="og:image" content={ogImage} />
   <meta property="og:locale" content={locale} />
   <meta property="article:published_time" content={publishDate.toISOString()} />
   <meta property="article:author" content={author} />
   <meta property="article:section" content={category} />
   ```

3. **Schema.org JSON-LD**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": "{title}",
     "description": "{description}",
     "author": {
       "@type": "Person",
       "name": "{author}"
     },
     "datePublished": "{publishDate.toISOString()}",
     "image": "{ogImage}",
     "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": "{canonical}"
     }
   }
   ```

### 2.2 BlogIndexLayout.astro

**Location:** `src/layouts/BlogIndexLayout.astro`

#### Props Interface

```typescript
interface Props {
  title?: string;
  description?: string;
  posts: CollectionEntry<'blog'>[];
  categoryFilter?: string;
  tagFilter?: string;
}
```

#### Render Requirements

1. **Page Header**
   - Title (default: "Blog")
   - Description/subtitle

2. **Filter Controls**
   - Category dropdown/filter
   - Tag cloud/selection

3. **Post Grid**
   - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
   - Post cards with:
     - Thumbnail image
     - Title (linked)
     - Excerpt/description
     - Date
     - Category badge
     - Read time estimate

4. **Pagination**
   - Previous/Next buttons
   - Page numbers
   - Items per page selector (optional)

#### SEO Requirements

- Dynamic title based on filters
- Canonical URL with pagination params
- OpenGraph tags for blog listing

### 2.3 Responsive Design Requirements

| Breakpoint | Layout Adjustments |
|------------|-------------------|
| < 640px (mobile) | Single column, full-width images, stacked nav |
| 640px - 1024px (tablet) | 2-column grid, sidebar collapses |
| > 1024px (desktop) | 3-column grid, full sidebar, max-width content |

### 2.4 Styling Requirements

- Use existing project CSS patterns (Tailwind classes)
- Maintain visual consistency with current design
- Support dark/light mode if project has it
- Typography scale:
  - H1: 2.5rem (mobile) → 3.5rem (desktop)
  - H2: 1.75rem → 2.25rem
  - Body: 1rem (16px), line-height 1.75

---

## 3. Collection Configuration

### 3.1 Content Config File

**Location:** `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(100),
    description: z.string().min(50).max(160),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    publishDate: z.coerce.date(),
    author: z.literal('kimi'),
    category: z.string().min(2).max(50),
    tags: z.array(z.string()).min(1).max(10),
    canonical: z.string().url(),
    ogImage: z.string(),
    schemaType: z.enum(['BlogPosting', 'Article', 'TechArticle']).default('BlogPosting'),
    locale: z.string().default('es-ES'),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

### 3.2 Schema Validation Rules

| Field | Validation | Error Message |
|-------|------------|---------------|
| title | 10-100 chars | "Title must be between 10 and 100 characters" |
| description | 50-160 chars | "Description must be between 50 and 160 characters" |
| slug | kebab-case | "Slug must be URL-friendly (lowercase, hyphens only)" |
| publishDate | valid date | "Invalid date format. Use YYYY-MM-DD" |
| author | must be "kimi" | "Author must be 'kimi'" |
| tags | 1-10 items | "Must have 1-10 tags" |
| canonical | valid URL | "Canonical must be a valid URL" |

---

## 4. Routing Requirements

### 4.1 Dynamic Route: Single Post

**File:** `src/pages/blog/[...slug].astro`

```typescript
---
import { getCollection } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogPostLayout {...post.data}>
  <Content />
</BlogPostLayout>
```

### 4.2 Blog Index Route

**File:** `src/pages/blog/index.astro`

- Display all posts sorted by `publishDate` (newest first)
- Support query params: `?category=marketing`, `?tag=seo`
- Pagination: 12 posts per page

### 4.3 URL Structure

| Route Type | Pattern | Example |
|------------|---------|---------|
| Single post | `/blog/{slug}` | `/blog/estrategias-marketing-digital-2025` |
| Blog index | `/blog` | `/blog` |
| Category filter | `/blog?category={category}` | `/blog?category=marketing` |
| Tag filter | `/blog?tag={tag}` | `/blog?tag=seo` |
| Paginated | `/blog?page={n}` | `/blog?page=2` |

### 4.4 Slug Mapping

All 73 article slugs must be preserved. The system must handle:
- Exact slug matching
- Case-insensitive lookup (redirect to canonical)
- Trailing slash normalization

### 4.5 Redirect Requirements

If old URLs exist, implement redirects:
- Old: `/articulos/{old-slug}` → New: `/blog/{new-slug}`
- Use Astro's `redirect` config or middleware

---

## 5. Success Scenarios

### 5.1 Scenario: Content Migration Success

**Given** all 73 articles exist in source directories  
**When** migration script runs  
**Then**:
- All files copied to `src/content/blog/`
- All have valid frontmatter
- No content loss
- Schema validation passes

### 5.2 Scenario: Single Post Rendering

**Given** a valid blog post with slug "test-post"  
**When** user visits `/blog/test-post`  
**Then**:
- Page renders with BlogPostLayout
- All frontmatter fields displayed correctly
- Content renders as HTML
- SEO meta tags present in `<head>`
- Status 200 returned

### 5.3 Scenario: Blog Index Rendering

**Given** multiple blog posts exist  
**When** user visits `/blog`  
**Then**:
- Page renders with BlogIndexLayout
- Posts displayed in reverse chronological order
- Pagination works correctly
- Category/tag filters functional

### 5.4 Scenario: URL Preservation

**Given** existing URLs from old system  
**When** accessing old URLs  
**Then**:
- Either redirect to new URL (301)
- Or serve content at same path (200)
- No 404 errors for valid content

### 5.5 Scenario: SEO Preservation

**Given** migrated articles with SEO metadata  
**When** page renders  
**Then**:
- `<title>` tag contains article title
- `<meta name="description">` present
- OpenGraph tags complete
- Schema.org JSON-LD valid
- Canonical URL correct

### 5.6 Scenario: Build Success

**Given** all content migrated and layouts created  
**When** running `astro build`  
**Then**:
- Build completes without errors
- All 73 pages generated
- No TypeScript errors
- No validation warnings
- Static files output to `dist/`

### 5.7 Scenario: Responsive Design

**Given** article page rendered  
**When** viewed on different devices  
**Then**:
- Mobile: readable, single column, touch-friendly
- Tablet: balanced layout, appropriate spacing
- Desktop: full layout, sidebar visible

---

## 6. Error Handling

### 6.1 Missing Content

**Scenario:** Slug not found  
**Action:** Return 404 page with helpful message and link to blog index

### 6.2 Invalid Frontmatter

**Scenario:** Schema validation fails  
**Action:** Build fails with detailed error message showing file and field

### 6.3 Missing Required Fields

**Scenario:** Required field empty  
**Action:** Build fails with field name and file path

---

## 7. Testing Checklist

- [ ] All 73 articles have valid frontmatter
- [ ] All slugs are unique and URL-safe
- [ ] Each article renders at `/blog/{slug}`
- [ ] Blog index shows all posts
- [ ] Pagination works (if > 12 posts)
- [ ] Category filters work
- [ ] Tag filters work
- [ ] SEO meta tags present on all pages
- [ ] Schema.org JSON-LD valid
- [ ] Responsive on mobile/tablet/desktop
- [ ] Build completes without errors
- [ ] No 404s for existing content
- [ ] Old URLs redirect or work

---

## 8. Migration Script Requirements

A script should be created to:

1. Read all markdown files from source directories
2. Parse and validate existing frontmatter
3. Map/transform to new schema
4. Generate missing fields with defaults
5. Write to `src/content/blog/` with standardized format
6. Log any issues or manual review needed

---

*Specification created for change: separar-contenido-layout*
