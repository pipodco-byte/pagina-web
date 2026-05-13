# Blog Phanatik Enhancements Specification

## Project Overview

| Field | Value |
|-------|-------|
| **Change** | `blog-phanatik-enhancements` |
| **Project** | `astro-ecommerce` |
| **Proposal** | `sdd/blog-phanatik-enhancements/proposal` (engram #112) |
| **Spec Author** | orchestrator |
| **Date** | 2026-05-12 |
| **Phase** | spec |
| **Status** | draft |

## Purpose

Enhance the Pipod blog index page with Phanatik-inspired components for improved visual hierarchy, content discovery, and engagement. This spec covers six new Astro components using existing blog collection schema without modifications.

---

## Feature Specifications

### 1. BlogSidebar.astro

Text-only list of featured posts for sidebar placement.

#### Overview
- **Pattern**: Aside1.astro (Phanatik)
- **Style**: Simple vertical list, no images
- **Usage**: Sidebar section in blog index

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `posts` | `Array<{ slug: string; title: string; publishDate: string; category?: string }>` | Yes | — | Array of post objects (max 5) |
| `title` | `string` | No | `"Artículos Destacados"` | Section heading |

#### Behavior

- Renders up to 5 posts as a vertical list
- Each item displays: title (link to post), formatted date
- Category badge shown if `category` field is present
- List uses `<aside>` semantic element
- Empty state: renders section title only, no error

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| SS-01 | `posts` array has 3 items | component renders | list shows 3 items with title links and dates |
| SS-02 | `posts` array is empty | component renders | section title renders, no list items |
| SS-03 | post has `category` field | item renders | category badge displays above title |
| SS-04 | `slug` is undefined | item renders | title renders as plain text, no link |

#### Error Handling

| Error | Handling |
|-------|----------|
| `posts` is `undefined` or not array | renders section title only |
| `slug` is missing | title renders as plain text |
| `publishDate` is invalid | date omitted, no error thrown |

---

### 2. BlogCardList.astro

Simple text-only card for vertical lists without images.

#### Overview
- **Pattern**: BlogCard5.astro (Phanatik)
- **Style**: Text-only, no image, no author
- **Usage**: Top Stories text list, Briefs fallback

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `slug` | `string` | Yes | Article URL path |
| `title` | `string` | Yes | Article title |
| `category` | `string` | Yes | Category badge text |
| `publishDate` | `string` | Yes | ISO date string |

#### Behavior

- Title renders as link to `/blog/{slug}`
- Category badge renders above title
- Date renders below title in Spanish format (e.g., "12 may 2026")
- No image, no author, no excerpt
- Card uses `<article>` element

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| CL-01 | valid slug, title, category, date | component renders | title is link, category badge, formatted date |
| CL-02 | `category` is "Sin categoría" | component renders | badge renders with "Sin categoría" text |
| CL-03 | `publishDate` is `"2026-05-12"` | component renders | date displays as "12 may 2026" |
| CL-04 | `slug` is empty string | component renders | title renders as plain text |

#### Error Handling

| Error | Handling |
|-------|----------|
| `slug` is falsy | title renders as plain text |
| `publishDate` is invalid | date omitted, no error thrown |
| Missing required prop | build error |

---

### 3. BlogCardCompact.astro

Horizontal compact card with optional image.

#### Overview
- **Pattern**: BlogCard1.astro (Phanatik)
- **Style**: Horizontal layout, small/compact, image left (optional)
- **Usage**: Briefs section horizontal cards

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `slug` | `string` | Yes | — | Article URL path |
| `title` | `string` | Yes | — | Article title |
| `category` | `string` | Yes | — | Category badge text |
| `publishDate` | `string` | Yes | — | ISO date string |
| `ogImage` | `string` | No | `undefined` | Optional image path |
| `imageAlt` | `string` | No | `title` | Image alt text |

#### Behavior

- Horizontal layout: image (left) + text content (right)
- Image is optional; if present renders at ~80px width
- Image uses `ogImage` with onerror fallback to gradient
- Text content: category badge, title (link), date
- Card uses `<article>` with `<a>` wrapper
- Responsive: on mobile, image may hide or shrink

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| CC-01 | `ogImage` is valid path | component renders | image displays left of text |
| CC-02 | `ogImage` is `undefined` | component renders | image hidden, text only |
| CC-03 | `ogImage` path invalid (onerror) | image loads | gradient placeholder replaces image |
| CC-04 | viewport is mobile (<640px) | component renders | image shrinks or hides |

#### Error Handling

| Error | Handling |
|-------|----------|
| `ogImage` missing/falsy | no image rendered, text only |
| `ogImage` onerror | gradient placeholder via CSS |
| `slug` is falsy | title as plain text |

---

### 4. BlogCardOverlay.astro

Overlay-style card for top stories hero.

#### Overview
- **Pattern**: BlogCard4.astro (Phanatik)
- **Style**: Full image with text overlay on bottom
- **Usage**: Top Stories hero card

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `slug` | `string` | Yes | Article URL path |
| `title` | `string` | Yes | Article title |
| `category` | `string` | Yes | Category badge text |
| `publishDate` | `string` | Yes | ISO date string |
| `ogImage` | `string` | Yes | Image path |
| `imageAlt` | `string` | No | `title` | Image alt text |

#### Behavior

- Full-width image with gradient overlay on bottom third
- Category badge and title overlay on image
- Date displays below title (outside overlay area)
- Image aspect ratio: 16:9 preferred, minimum 4:3
- onerror: gradient placeholder if image fails

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| CO-01 | valid `ogImage` | component renders | full image with overlay gradient |
| CO-02 | `ogImage` onerror | image loads | gradient placeholder shows |
| CO-03 | long title | component renders | title truncates with ellipsis (2 lines max) |
| CO-04 | viewport mobile | component renders | overlay text remains readable |

#### Error Handling

| Error | Handling |
|-------|----------|
| `ogImage` missing | render gradient placeholder |
| `ogImage` onerror | gradient placeholder |
| `slug` falsy | title renders over image without link |

---

### 5. BriefsSection.astro

Horizontal section displaying 3 recent posts in compact format.

#### Overview
- **Pattern**: Briefs1.astro (Phanatik)
- **Style**: Horizontal scroll or flex row of 3 BlogCardCompact
- **Usage**: "Breves" section below main content

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `posts` | `Array<BlogCardCompactProps>` | Yes | — | Array of 3 post objects |

#### Behavior

- Renders horizontal row of 3 `BlogCardCompact` components
- Section label: `"Breves"` (Spanish)
- Each card displays: image (if available), category, title, date
- Horizontal scroll on mobile if needed
- Empty state: section hidden if posts array empty

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| BS-01 | 3 posts passed | component renders | 3 BlogCardCompact in horizontal row |
| BS-02 | fewer than 3 posts | component renders | renders available posts only |
| BS-03 | empty `posts` array | component renders | section not rendered |
| BS-04 | viewport mobile | component renders | horizontal scroll enabled |

#### Error Handling

| Error | Handling |
|-------|----------|
| `posts` is empty | render nothing |
| post missing `ogImage` | BlogCardCompact renders text-only |

---

### 6. TopStoriesSection.astro

1 overlay hero + 4 text list items.

#### Overview
- **Pattern**: TopStories1.astro (Phanatik)
- **Style**: Hero overlay card + vertical list of 4 BlogCardList
- **Usage**: Primary content section of blog index

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `heroPost` | `Omit<BlogCardOverlayProps, 'imageAlt'>` | Yes | — | Hero post data |
| `listPosts` | `Array<Omit<BlogCardListProps, never>>` | Yes | — | Array of 4 post objects |

#### Behavior

- Left/Top: 1 `BlogCardOverlay` as hero (large)
- Right/Bottom: 4 `BlogCardList` in vertical stack
- Section label: `"Historias Destacadas"` (Spanish)
- List shows 4 most recent posts (excluding hero)
- Responsive: on mobile, hero stacks above list

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| TS-01 | valid hero + 4 list posts | component renders | 1 overlay hero + 4 list items |
| TS-02 | only 2 list posts | component renders | hero + 2 list items |
| TS-03 | `heroPost.ogImage` missing | component renders | gradient placeholder for hero |
| TS-04 | viewport mobile | component renders | hero above, list below |

#### Error Handling

| Error | Handling |
|-------|----------|
| `listPosts` has fewer than 4 | renders available posts |
| `heroPost.ogImage` missing | gradient placeholder |
| Both props invalid | render nothing |

---

### 7. CategoriesGrid.astro

5-column grid of categories with post counts.

#### Overview
- **Pattern**: Categories1.astro (Phanatik)
- **Style**: Grid of category cards, each with name + count
- **Usage**: Category navigation section

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `categories` | `Array<{ name: string; count: number }>` | Yes | — | Category data array |

#### Behavior

- Renders 5-column grid (responsive: 3 on tablet, 2 on mobile)
- Each cell: category name + post count
- Category name is clickable link to `/blog?category={name}`
- Section label: `"Categorías"` (Spanish)
- Empty state: section hidden if no categories

#### Scenarios

| ID | Given | When | Then |
|----|-------|------|------|
| CG-01 | 8 categories | component renders | 5-column grid with 8 cells |
| CG-02 | 2 categories | component renders | 2-column grid (min 2 columns) |
| CG-03 | category count is 0 | cell renders | shows name + "(0)" |
| CG-04 | category name has special chars | link renders | URL-encoded properly |
| CG-05 | viewport mobile | component renders | 2-column grid |

#### Error Handling

| Error | Handling |
|-------|----------|
| `categories` is empty | render nothing |
| `count` is undefined | treat as 0 |

---

## Shared Patterns

### CSS Custom Properties

All components MUST use `--pipod-*` design tokens:

```scss
--pipod-color-primary      // brand primary
--pipod-color-text         // body text
--pipod-color-muted        // secondary text
--pipod-color-border       // borders
--pipod-bg-card            // card background
--pipod-bg-section         // section background
--pipod-gradient-blue      // blue gradient for placeholders
--pipod-radius-sm          // small border radius
--pipod-radius-md          // medium border radius
--pipod-spacing-xs         // extra small spacing
--pipod-spacing-sm         // small spacing
--pipod-spacing-md         // medium spacing
--pipod-spacing-lg         // large spacing
--pipod-font-body          // body font
--pipod-font-heading       // heading font
```

### Date Formatting (Spanish Locale)

| Input | Output |
|-------|--------|
| `"2026-05-12"` | `"12 may 2026"` |
| `"2026-01-01"` | `"1 ene 2026"` |
| `"2026-12-25"` | `"25 dic 2026"` |

Use `Intl.DateTimeFormat` with `locale: 'es-ES'`.

### Image Fallback Chain

| Priority | Condition | Behavior |
|----------|-----------|----------|
| 1 | `ogImage` is valid path | Render `<img>` with Astro optimization |
| 2 | `ogImage` fails (onerror) | Show CSS gradient placeholder |
| 3 | `ogImage` is falsy | No image, text-only layout |

### Spanish Labels

| Component | Label |
|-----------|-------|
| Sidebar title | `"Artículos Destacados"` |
| Briefs section | `"Breves"` |
| Top Stories section | `"Historias Destacadas"` |
| Categories section | `"Categorías"` |
| Featured badge | `"Destacado"` |
| Date-less category | `"Sin categoría"` |

---

## Integration Points

### File Structure (New Components)

```
src/components/blog/
├── BlogSidebar.astro         # NEW
├── BlogCardList.astro         # NEW
├── BlogCardCompact.astro      # NEW
├── BlogCardOverlay.astro      # NEW
├── BriefsSection.astro         # NEW
├── TopStoriesSection.astro     # NEW
├── CategoriesGrid.astro        # NEW
├── BlogHeroFeatured.astro     # EXISTING
├── BlogCardFeatured.astro      # EXISTING
├── BlogCardEditorial.astro     # EXISTING
├── BlogAuthor.astro           # EXISTING
├── BlogCtaSection.astro       # EXISTING
└── BlogHeroSection.astro      # EXISTING
```

### Modified Files

| File | Change |
|------|--------|
| `src/pages/blog/index.astro` | Import and place new sections |

### Page Integration Example

```astro
---
import { getCollection } from 'astro:content';
import BlogHeroFeatured from '@/components/blog/BlogHeroFeatured.astro';
import BlogSidebar from '@/components/blog/BlogSidebar.astro';
import BlogCardList from '@/components/blog/BlogCardList.astro';
import BlogCardCompact from '@/components/blog/BlogCardCompact.astro';
import BlogCardOverlay from '@/components/blog/BlogCardOverlay.astro';
import BriefsSection from '@/components/blog/BriefsSection.astro';
import TopStoriesSection from '@/components/blog/TopStoriesSection.astro';
import CategoriesGrid from '@/components/blog/CategoriesGrid.astro';

const posts = await getCollection('blog');
// ... sort and filter posts
---

<main>
  <BlogHeroFeatured {...heroPost} />
  
  <div class="blog-layout">
    <div class="blog-main">
      <TopStoriesSection heroPost={hero} listPosts={topStories} />
      <BriefsSection posts={recentPosts} />
    </div>
    
    <aside class="blog-sidebar">
      <BlogSidebar posts={featuredPosts} />
    </aside>
  </div>
  
  <CategoriesGrid categories={categoryCounts} />
</main>
```

---

## Build Success Criteria

- [ ] `BlogSidebar.astro` renders up to 5 posts with title links and Spanish dates
- [ ] `BlogCardList.astro` renders text-only cards (no image, no author)
- [ ] `BlogCardCompact.astro` renders horizontal cards with optional image
- [ ] `BlogCardOverlay.astro` renders full image with overlay text
- [ ] `BriefsSection.astro` renders 3 BlogCardCompact in horizontal row
- [ ] `TopStoriesSection.astro` renders 1 overlay hero + 4 list items
- [ ] `CategoriesGrid.astro` renders 5-column responsive grid
- [ ] All styling uses SCSS with `--pipod-*` CSS custom properties only
- [ ] No Tailwind utility classes in any new component
- [ ] All dates formatted in Spanish locale
- [ ] Image fallbacks work correctly (gradient placeholder on error)
- [ ] Existing `BlogCardFeatured` and `BlogCardEditorial` remain unchanged
- [ ] No modifications to blog content collection schema
- [ ] `npm run build` succeeds with zero warnings
- [ ] Components are fully responsive (mobile, tablet, desktop)

---

## Error Handling Summary

| Scenario | Handling |
|----------|----------|
| Empty posts array (Sidebar) | Section title only |
| Empty posts array (BriefsSection) | Section hidden |
| Empty posts array (CategoriesGrid) | Section hidden |
| Missing `ogImage` (Overlay) | Gradient placeholder |
| `ogImage` onerror | Gradient placeholder via CSS |
| Missing `slug` (CardList) | Title as plain text |
| Missing `slug` (CardCompact) | Title as plain text |
| Invalid `publishDate` | Date omitted, no error |
| Unknown category | Badge renders "Sin categoría" |

---

## Dependencies

| Dependency | Source |
|------------|--------|
| Phanatik reference | `/tmp/phanatik-sanity-astro/apps/web/src/` |
| Blog components | `src/components/blog/` |
| Content collection | `src/content.config.ts` |
| Design tokens | `--pipod-*` CSS custom properties |
