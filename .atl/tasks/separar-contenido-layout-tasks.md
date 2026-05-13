# Task Breakdown: separar-contenido-layout

## Overview

Implementation tasks for separating content from presentation in the Astro-Ecommerce blog using Astro Content Collections. 73 articles will be migrated to a type-safe, schema-validated content collection with reusable layout components.

---

## Phase 1: Infrastructure (Setup)

### 1.1 Create Content Collection Configuration
**Task ID:** 1.1  
**Description:** Create `src/content/config.ts` with Zod schema for blog collection validation  
**Estimated Effort:** Small  
**Dependencies:** None  
**Success Criteria:**
- File exists at `src/content/config.ts`
- Schema defines all 11 required fields (title, description, slug, publishDate, author, category, tags, canonical, ogImage, schemaType, locale)
- TypeScript types are properly exported
- Zod validation rules match spec requirements (e.g., title 10-100 chars, description 50-160 chars)
- `astro check` passes without type errors

**Implementation Notes:**
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

export const collections = { blog: blogCollection };
```

---

### 1.2 Migrate Articles to Content Collection
**Task ID:** 1.2  
**Description:** Copy 73 articles from `openspec/changes/50-articulos-seo/` to `src/content/blog/`  
**Estimated Effort:** Medium  
**Dependencies:** 1.1  
**Success Criteria:**
- All 73 markdown files copied to `src/content/blog/`
- File structure preserved from source directories:
  - articulos-fase-1/ (17 articles)
  - articulos-fase-2/ (20 articles)
  - articulos-fase-3/ (15 articles)
  - articulos-fase-4/ (15 articles)
  - articulos-reciclados/ (6 articles)
- All files have UTF-8 encoding with LF line endings
- Original files remain in place (copy, not move)
- No content loss in markdown body

**File Mapping:**
```
openspec/changes/50-articulos-seo/articulos-fase-1/*.md → src/content/blog/*.md
openspec/changes/50-articulos-seo/articulos-fase-2/*.md → src/content/blog/*.md
openspec/changes/50-articulos-seo/articulos-fase-3/*.md → src/content/blog/*.md
openspec/changes/50-articulos-seo/articulos-fase-4/*.md → src/content/blog/*.md
openspec/changes/50-articulos-seo/articulos-reciclados/*.md → src/content/blog/*.md
```

---

### 1.3 Standardize Article Frontmatter
**Task ID:** 1.3  
**Description:** Validate and standardize frontmatter for all 73 articles to match schema requirements  
**Estimated Effort:** Large  
**Dependencies:** 1.2  
**Success Criteria:**
- All articles pass Zod schema validation
- Missing fields are generated with defaults:
  - `author`: set to "kimi"
  - `slug`: derived from filename (kebab-case)
  - `canonical`: built from base URL + slug
  - `ogImage`: set to default or derived path
  - `schemaType`: set to "BlogPosting"
  - `locale`: set to "es-ES"
- Existing fields are mapped/transformed:
  - `titulo` → `title`
  - `descripcion` → `description`
  - `fecha` → `publishDate`
  - `categoria` → `category`
  - `etiquetas` → `tags`
- Date formats normalized to ISO 8601 (YYYY-MM-DD)
- Duplicate tags removed, case normalized
- All slugs are unique and URL-safe
- Build completes without validation errors

**Frontmatter Template:**
```yaml
---
title: "Article Title (10-100 chars)"
description: "Meta description (50-160 chars)"
slug: "url-friendly-slug"
publishDate: 2025-01-15
author: "kimi"
category: "Marketing"
tags: ["tag1", "tag2", "tag3"]
canonical: "https://astrosaas.com/blog/slug"
ogImage: "/images/blog/og-image.jpg"
schemaType: "BlogPosting"
locale: "es-ES"
---
```

---

### 1.4 Verify Content Configuration
**Task ID:** 1.4  
**Description:** Run validation checks to ensure all content is properly configured  
**Estimated Effort:** Small  
**Dependencies:** 1.3  
**Success Criteria:**
- `astro check` passes with no TypeScript errors
- `getCollection('blog')` returns all 73 entries without throwing
- All entries have valid `data` objects matching schema
- All slugs are unique (no duplicates)
- Console shows no validation warnings

**Verification Commands:**
```bash
npm run astro check
npm run build  # Should complete without content errors
```

---

## Phase 2: Layout Implementation

### 2.1 Create BlogPostLayout.astro
**Task ID:** 2.1  
**Description:** Create layout component for single blog posts with full SEO support  
**Estimated Effort:** Medium  
**Dependencies:** 1.4  
**Success Criteria:**
- File exists at `src/layouts/BlogPostLayout.astro`
- Component accepts all 11 frontmatter fields as props
- Props interface properly typed using schema types
- Header section includes:
  - Title (H1)
  - Publication date formatted as "15 de enero de 2025"
  - Author display
  - Category badge
- Content section renders `<slot />` for markdown
- Footer section includes:
  - Tags as clickable links
  - Optional share buttons
- SEO meta tags in `<head>`:
  - `<title>` with site suffix
  - `<meta name="description">`
  - `<link rel="canonical">`
  - `<meta name="author">`
  - Full OpenGraph tags (og:title, og:description, og:type, og:url, og:image, og:locale)
  - Article-specific OG tags (published_time, author, section)
  - Schema.org JSON-LD script tag
- Uses existing project BaseLayout if available
- Responsive styling applied
- Dark/light mode support if project has it

**Props Interface:**
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

---

### 2.2 Create BlogIndexLayout.astro
**Task ID:** 2.2  
**Description:** Create layout component for blog listing/index page  
**Estimated Effort:** Medium  
**Dependencies:** 1.4  
**Success Criteria:**
- File exists at `src/layouts/BlogIndexLayout.astro`
- Component accepts posts array and optional filter params
- Props interface properly typed with CollectionEntry
- Header section includes:
  - Dynamic title based on filters
  - Description/subtitle
- Filter controls:
  - Category dropdown with all unique categories
  - Tag selection interface
  - Clear filters option
- Post grid renders:
  - Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
  - Post cards with thumbnail, title, excerpt, date, category
  - Links to individual posts
- Pagination controls (if needed)
- Empty state when no posts match filters
- SEO meta tags for listing page
- Uses existing project styling patterns

**Props Interface:**
```typescript
import type { CollectionEntry } from 'astro:content';

interface Props {
  title?: string;
  description?: string;
  posts: CollectionEntry<'blog'>[];
  categoryFilter?: string;
  tagFilter?: string;
}
```

---

### 2.3 Add SEO Meta Tags Component
**Task ID:** 2.3  
**Description:** Create reusable SEO component for consistent meta tag handling  
**Estimated Effort:** Small  
**Dependencies:** 2.1  
**Success Criteria:**
- Create `src/components/SEOMeta.astro` or inline in layouts
- Component accepts SEO-related props
- Generates complete set of meta tags:
  - Standard: title, description, canonical, author
  - OpenGraph: all required + article-specific
  - Twitter Cards (optional but recommended)
  - Schema.org JSON-LD
- JSON-LD is valid and properly escaped
- All URLs are absolute (not relative)
- Component is reusable across layouts

**Schema.org JSON-LD Structure:**
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

---

### 2.4 Style Layout Components
**Task ID:** 2.4  
**Description:** Apply responsive styling to layout components  
**Estimated Effort:** Medium  
**Dependencies:** 2.1, 2.2  
**Success Criteria:**
- Typography scale follows spec:
  - H1: 2.5rem (mobile) → 3.5rem (desktop)
  - H2: 1.75rem → 2.25rem
  - Body: 1rem (16px), line-height 1.75
- Responsive breakpoints implemented:
  - < 640px: Single column, full-width images
  - 640px - 1024px: 2-column grid
  - > 1024px: 3-column grid, full layout
- Uses existing Tailwind classes or CSS patterns
- Consistent spacing and margins
- Images are responsive with proper aspect ratios
- Links have hover states
- Category badges styled consistently
- Post cards have consistent styling
- Mobile navigation is touch-friendly

---

## Phase 3: Routing

### 3.1 Create Dynamic Post Route
**Task ID:** 3.1  
**Description:** Create `[...slug].astro` dynamic route for individual blog posts  
**Estimated Effort:** Medium  
**Dependencies:** 2.1, 1.4  
**Success Criteria:**
- File exists at `src/pages/blog/[...slug].astro`
- Implements `getStaticPaths()` that:
  - Calls `getCollection('blog')`
  - Returns paths for all 73 posts
  - Maps slug from post.data.slug
  - Passes post as props
- Component renders:
  - Retrieves post from Astro.props
  - Calls `post.render()` to get Content component
  - Wraps Content in BlogPostLayout
  - Spreads post.data as layout props
- All 73 posts generate static routes at build time
- URLs follow pattern: `/blog/{slug}`
- 404 handling for non-existent slugs

**Implementation:**
```astro
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

---

### 3.2 Create Blog Index Route
**Task ID:** 3.2  
**Description:** Create `index.astro` for blog listing page with filtering  
**Estimated Effort:** Medium  
**Dependencies:** 2.2, 1.4  
**Success Criteria:**
- File exists at `src/pages/blog/index.astro`
- Component retrieves all posts via `getCollection('blog')`
- Posts sorted by publishDate (newest first)
- Query params support:
  - `?category={category}` filters by category
  - `?tag={tag}` filters by tag
  - Case-insensitive matching
- Dynamic page title based on filters
- Pagination logic (12 posts per page) if needed
- Renders BlogIndexLayout with filtered posts
- All posts displayed by default (no filters)

**Implementation:**
```astro
---
import { getCollection } from 'astro:content';
import BlogIndexLayout from '../../layouts/BlogIndexLayout.astro';

const allPosts = await getCollection('blog');
const { category, tag } = Astro.url.searchParams;

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

const title = category 
  ? `Artículos de ${category} | Blog`
  : tag 
    ? `Artículos etiquetados con #${tag} | Blog`
    : 'Blog';
---

<BlogIndexLayout 
  title={title}
  posts={posts}
  categoryFilter={category || undefined}
  tagFilter={tag || undefined}
/>
```

---

### 3.3 Test All Article Routes
**Task ID:** 3.3  
**Description:** Verify all 73 article routes return HTTP 200  
**Estimated Effort:** Medium  
**Dependencies:** 3.1, 1.4  
**Success Criteria:**
- Run `npm run build` successfully
- All 73 static pages generated in `dist/blog/`
- Each article accessible at `/blog/{slug}`
- No 404 errors for valid slugs
- Slug matching is exact (case-sensitive)
- All internal links work correctly
- Build output shows 73+ pages generated

**Verification Method:**
```bash
# Build the project
npm run build

# Count generated pages
find dist/blog -name "*.html" | wc -l  # Should be 74 (73 posts + index)

# Or use curl to test routes
for slug in $(cat slugs.txt); do
  curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/blog/$slug
done
```

---

### 3.4 Implement URL Redirects (Optional)
**Task ID:** 3.4  
**Description:** Add redirects if old article URLs differ from new structure  
**Estimated Effort:** Small  
**Dependencies:** 3.1  
**Success Criteria:**
- Old URLs redirect to new URLs with 301 status
- Redirects configured in `astro.config.mjs`
- No broken links from external sources
- Redirect mapping documented
- Example: `/articulos/old-slug` → `/blog/new-slug`

**Configuration:**
```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/articulos/[...slug]': '/blog/[...slug]',
  },
});
```

---

## Phase 4: Testing & Validation

### 4.1 Build Verification
**Task ID:** 4.1  
**Description:** Run astro build and verify no errors  
**Estimated Effort:** Small  
**Dependencies:** 3.2  
**Success Criteria:**
- `npm run build` completes without errors
- No TypeScript compilation errors
- No content validation errors
- No warnings in build output
- All 73 blog pages + index generated in `dist/`
- Static assets properly copied
- Build time is reasonable (< 2 minutes)

**Build Checklist:**
```bash
# Clean build
rm -rf dist

# Build project
npm run build

# Verify output
echo "Total HTML files:"
find dist -name "*.html" | wc -l

echo "Blog pages:"
find dist/blog -name "*.html" | wc -l

echo "Build size:"
du -sh dist
```

---

### 4.2 Article Rendering Validation
**Task ID:** 4.2  
**Description:** Verify all 73 articles render correctly with proper layout  
**Estimated Effort:** Medium  
**Dependencies:** 4.1  
**Success Criteria:**
- Sample at least 10 articles from different sources
- Each article displays:
  - Correct title in H1
  - Properly formatted date
  - Author shown as "kimi"
  - Category badge visible
  - All tags displayed as links
  - Full content rendered from markdown
  - Proper typography (headings, lists, blockquotes)
- Images load correctly
- Links work within content
- No layout shifts or broken elements
- Consistent styling across all articles

**Test Articles (sample from each phase):**
- 3 articles from articulos-fase-1
- 3 articles from articulos-fase-2
- 2 articles from articulos-fase-3
- 2 articles from articulos-fase-4
- 1 article from articulos-reciclados

---

### 4.3 SEO Meta Tags Validation
**Task ID:** 4.3  
**Description:** Check SEO meta tags are present and valid in HTML output  
**Estimated Effort:** Small  
**Dependencies:** 4.1  
**Success Criteria:**
- View page source for sample articles
- All required meta tags present:
  - `<title>` contains article title + site name
  - `<meta name="description">` matches frontmatter
  - `<link rel="canonical">` is valid URL
  - OpenGraph tags complete (og:title, og:description, og:type, og:url, og:image, og:locale)
  - Article OG tags present (published_time, author, section)
- Schema.org JSON-LD:
  - Script tag present in `<head>`
  - Valid JSON structure
  - Required fields populated
  - @context is "https://schema.org"
  - @type matches schemaType from frontmatter
- Meta tags validate with external tools (optional):
  - Facebook Sharing Debugger
  - Google Rich Results Test

**Validation Command:**
```bash
# Check meta tags in built HTML
grep -E "<title>|<meta|<link rel=\"canonical\"|<script.*json-ld" dist/blog/*/index.html
```

---

### 4.4 Responsive Design Testing
**Task ID:** 4.4  
**Description:** Test responsive design across mobile, tablet, and desktop breakpoints  
**Estimated Effort:** Medium  
**Dependencies:** 2.4  
**Success Criteria:**
- Test on actual devices or browser dev tools
- Mobile (< 640px):
  - Single column layout
  - Readable text size (no zoom needed)
  - Touch-friendly tap targets (min 44px)
  - Images fit screen width
  - Navigation accessible
- Tablet (640px - 1024px):
  - 2-column grid for post listings
  - Balanced spacing
  - No horizontal scroll
- Desktop (> 1024px):
  - 3-column grid for post listings
  - Optimal line length for reading
  - Full layout with all elements visible
- Blog post pages:
  - Content readable at all sizes
  - Proper whitespace and margins
  - Images don't overflow containers
  - Typography scales appropriately

**Testing Checklist:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1440px)
- [ ] Large desktop (1920px)

---

### 4.5 Performance Testing
**Task ID:** 4.5  
**Description:** Verify page load performance meets standards  
**Estimated Effort:** Small  
**Dependencies:** 4.1  
**Success Criteria:**
- Lighthouse score > 90 for Performance
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- No render-blocking resources
- Images optimized (WebP format where supported)
- Minimal JavaScript on blog pages
- CSS is inline or properly cached
- Build output size is reasonable

**Performance Tools:**
- Chrome DevTools Lighthouse
- PageSpeed Insights
- WebPageTest

---

## Phase 5: Go Live

### 5.1 Update Internal Links
**Task ID:** 5.1  
**Description:** Update any hardcoded blog links to new URL structure  
**Estimated Effort:** Small  
**Dependencies:** 3.1, 3.2  
**Success Criteria:**
- Search codebase for hardcoded blog URLs
- Update navigation links to point to `/blog`
- Update footer links if applicable
- Update any CTAs or promotional links
- Verify no 404s from internal navigation
- Search patterns:
  - `href="/articulos/`
  - `href="/blog/` (old patterns)
  - Hardcoded article URLs

---

### 5.2 Deploy to Production
**Task ID:** 5.2  
**Description:** Deploy new blog system to production environment  
**Estimated Effort:** Small  
**Dependencies:** 4.1, 4.2, 4.3, 5.1  
**Success Criteria:**
- Deploy built files to production host
- All 73 article URLs return 200
- Blog index page loads correctly
- Filtering works on production
- SEO meta tags present in production
- No console errors in production
- Analytics tracking works (if applicable)
- Sitemap updated with new URLs
- Search engines notified (optional)

**Deployment Checklist:**
- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] Deploy to staging first
- [ ] Verify staging deployment
- [ ] Deploy to production
- [ ] Smoke test critical paths
- [ ] Monitor error logs for 24 hours

---

### 5.3 Monitor Post-Deployment
**Task ID:** 5.3  
**Description:** Monitor production for issues after deployment  
**Estimated Effort:** Small  
**Dependencies:** 5.2  
**Success Criteria:**
- No 404 errors reported
- No error spikes in monitoring
- Page load times stable
- User feedback positive
- Search engine indexing normal
- Analytics showing page views

**Monitoring (24-48 hours):**
- [ ] Check server logs for 404s
- [ ] Review error tracking (Sentry, etc.)
- [ ] Monitor Core Web Vitals
- [ ] Check Google Search Console for crawl errors
- [ ] Verify analytics events firing

---

### 5.4 Cleanup Old Article Copies
**Task ID:** 5.4  
**Description:** Remove old article copies from openspec after 30-day stability period  
**Estimated Effort:** Small  
**Dependencies:** 5.3  
**Success Criteria:**
- Wait minimum 30 days after successful deployment
- Verify no references to old paths
- Backup old articles (if not already backed up)
- Remove `openspec/changes/50-articulos-seo/` directory
- Document cleanup in changelog
- Update any documentation referencing old paths

**Safety Checklist:**
- [ ] 30+ days since deployment
- [ ] No reported issues with new system
- [ ] All stakeholders approve removal
- [ ] Backup exists
- [ ] Rollback plan documented

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Tasks | 18 |
| Phase 1 Tasks | 4 |
| Phase 2 Tasks | 4 |
| Phase 3 Tasks | 4 |
| Phase 4 Tasks | 5 |
| Phase 5 Tasks | 4 |
| Total Articles | 73 |
| Estimated Effort | Medium-Large |

---

## Critical Path

The following tasks form the critical path for MVP:

1. **1.1** → Create Content Collection Configuration
2. **1.2** → Migrate Articles to Content Collection
3. **1.3** → Standardize Article Frontmatter
4. **2.1** → Create BlogPostLayout.astro
5. **3.1** → Create Dynamic Post Route
6. **4.1** → Build Verification
7. **5.2** → Deploy to Production

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Frontmatter validation fails | Run validation script before build; fix issues incrementally |
| Missing images | Use default OG image; verify paths before deployment |
| URL changes break SEO | Implement 301 redirects; update sitemap |
| Build performance issues | Optimize images; use partial hydration |
| Content loss | Copy (don't move) files; maintain backups |

---

*Task breakdown created for change: separar-contenido-layout*
