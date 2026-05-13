# Blog Editorial Redesign Specification

## Purpose

Replace the text-only blog index with a Phanatik-inspired editorial magazine layout using new Astro components, SCSS grid, and OG image integration. Search/filter and Content Collections remain untouched.

## Component Requirements

### BlogHeroFeatured.astro (Featured Article Section)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Article title |
| `excerpt` | `string` | Yes | Article description |
| `slug` | `string` | Yes | Article URL path |
| `category` | `string` | Yes | Category badge text |
| `tags` | `string[]` | No | Tag labels |
| `ogImage` | `string` | No | OG image path (e.g. `/images/blog/{slug}/og-{slug}.webp`) |
| `publishDate` | `string` | Yes | ISO date string |
| `author` | `string` | No | Author name |
| `readingTime` | `string` | No | e.g. "5 min de lectura" |

### BlogCardEditorial.astro (Standard Grid Card)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Article title |
| `slug` | `string` | Yes | Article URL path |
| `category` | `string` | Yes | Category badge |
| `tags` | `string[]` | No | Tag labels |
| `ogImage` | `string` | No | OG image path for card thumbnail |
| `publishDate` | `string` | Yes | ISO date string |

### BlogAuthor.astro (Author Metadata Inline)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `author` | `string` | No | Author name (defaults to "Pipod Team") |
| `publishDate` | `string` | Yes | ISO date for formatting |
| `readingTime` | `string` | No | e.g. "5 min de lectura" |
| `avatarSrc` | `string` | No | Avatar image path |

### BlogFilter.jsx (Modified)
The component MUST render `BlogCardEditorial` for articles 2+ instead of `BlogCard.astro`. First article MUST NOT repeat in the grid (already shown in `BlogHeroFeatured`). Search, category filter, results count, and empty state SHALL remain unchanged.

## Image Fallback

| Priority | Condition | Behavior |
|----------|-----------|----------|
| 1 | OG image exists on disk | Render with Astro `<Image>` (sharp optimization) |
| 2 | OG image missing or `ogImage` is falsy | Render CSS gradient placeholder using `var(--pipod-gradient-blue)` |
| 3 | `ogImage` is falsy | Card renders without `<img>` tag — gradient-only visual |

The system MUST NOT render broken `<img>` tags. Missing images SHALL fall back silently to gradients.

## Layout (CSS Grid, `_blog-editorial.scss`)

| Breakpoint | Columns | Behavior |
|------------|---------|----------|
| Mobile (< 640px) | 1 | Full-width hero + stacked cards |
| Tablet (640px–1024px) | 2 | Side-by-side editorial cards |
| Desktop (> 1024px) | 3 | Three-column editorial grid |

The hero section SHALL always be full-width. Grid cards MUST use `display: grid` with `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`. All styles MUST use `--pipod-*` CSS custom properties from `_tokens.css`.

## Scenarios

### SC-01: Featured article with valid image
- **GIVEN** the first blog post has `ogImage: "/images/blog/iphone-repair/og-iphone.webp"` AND the file exists on disk
- **WHEN** the blog index page loads
- **THEN** `BlogHeroFeatured` renders the image full-width with title overlay and author metadata
- **AND** the image is optimized by Astro's `<Image>` component

### SC-02: Featured article with missing image
- **GIVEN** the first blog post has `ogImage: "/images/blog/foo/og-foo.webp"` but the file does NOT exist
- **WHEN** the blog index page builds
- **THEN** `BlogHeroFeatured` renders the gradient placeholder (`var(--pipod-gradient-blue)`)
- **AND** no `<img>` tag is emitted

### SC-03: Grid without OG images
- **GIVEN** a blog post's `ogImage` is `undefined` or an empty string
- **WHEN** the post renders in the editorial grid
- **THEN** `BlogCardEditorial` renders with gradient placeholder
- **AND** the card still displays category, tags, title, and date correctly

### SC-04: Responsive grid
- **GIVEN** 10 blog posts are loaded
- **WHEN** viewport is 375px wide (mobile)
- **THEN** cards stack in a single column, hero is full-width
- **WHEN** viewport is 768px wide (tablet)
- **THEN** cards render in 2 columns
- **WHEN** viewport is 1280px (desktop)
- **THEN** cards render in 3 columns

### SC-05: Search/filter preserved
- **GIVEN** the editorial grid is displayed with 73 articles
- **WHEN** user types "iPhone" in the search box
- **THEN** only articles matching "iPhone" appear
- **WHEN** user selects category "MacBook"
- **THEN** only MacBook articles appear
- **WHEN** user clears all filters
- **THEN** all 73 articles return

### SC-06: Empty filter results
- **GIVEN** the editorial grid is displayed
- **WHEN** the filtered result set is empty
- **THEN** the empty state message "No encontramos artículos" renders
- **AND** the "Limpiar filtros" reset button is available

### SC-07: Author component fallback
- **GIVEN** a post has `author: "kimi"` but no avatar image exists
- **WHEN** `BlogAuthor` renders
- **THEN** an initials-based SVG placeholder displays (32px circle with "KI")
- **AND** author name, formatted date, and reading time still appear

## Error Handling

| Error | Handling |
|-------|----------|
| All 73 articles fail to load | Page renders `BlogHeroSection` title/subtitle only, grid shows empty state |
| `ogImage` path is malformed (`null`, `undefined`, non-string) | Treated as missing — gradient fallback |
| `slug` is undefined | Card renders without link, title displayed as plain text |
| `publishDate` is invalid | Date omitted from card, no error thrown |
| Content Collection schema mismatch | Build fails with clear error — `getCollection('blog')` validates schema |

## Build Success Criteria

- [ ] `npm run build` exits with code 0 and zero warnings
- [ ] All 73 articles render with image OR gradient (no broken images)
- [ ] `BlogFilter.jsx` renders new editorial cards in place of `BlogCard.astro`
- [ ] Responsive grid validates at 320px, 768px, 1024px, 1440px
- [ ] `_blog-editorial.scss` is imported via `@import` in `blog-cards.css` or `astro-ecommerce.scss`
- [ ] No Tailwind utility classes present in any new `.astro` files
- [ ] `BlogCard.astro` file removed from the project tree
- [ ] Lighthouse Performance score ≥ current baseline (no regression)
