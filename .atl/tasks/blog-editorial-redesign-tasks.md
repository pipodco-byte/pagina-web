# Tasks: Blog Editorial Redesign

## Phase 1: Setup

- [x] 1.1 Create `src/styles/_blog-editorial.scss` with CSS Grid layout (`.blog-grid`), editorial card styles (`.blog-card-editorial`, `.blog-card-featured`), hero section styles, author component styles, and responsive breakpoints at 768px/1024px. Use `--pipod-*` tokens and `auto-fill, minmax(300px, 1fr)` grid. Include gradient image placeholder and card hover (`translateY(-4px)`).
- [x] 1.2 Import `_blog-editorial.scss` into `src/styles/blog-cards.css` via `@import '_blog-editorial.scss';` (or into the main SCSS entry point if one exists). → Imported directly in `pipod-blog.astro` via frontmatter `import '../styles/_blog-editorial.scss';` since `blog-cards.css` is plain CSS (cannot SCSS @import).

## Phase 2: Components

- [x] 2.1 Create `src/components/blog/BlogAuthor.astro` — accepts `author`, `publishDate`, `readingTime`. Renders 32px initials circle (`--pipod-color-deep-blue` bg), capitalized author name, formatted date (`toLocaleDateString('es-CO')`), and reading time. Default author: "Pipod Team".
- [x] 2.2 Create `src/components/blog/BlogCardEditorial.astro` — accepts `slug`, `title`, `description`, `ogImage`, `category`, `tags`, `publishDate`, `author`, `readingTime`. Structure: image top (or gradient fallback) → tags row → category badge → title (link) → `BlogAuthor`. Uses `<img>` with `onerror` fallback (instead of `<Image>` from `astro:assets`) because OG images reside in `public/` directory. Fall back to gradient via conditional rendering when `ogImage` is missing.
- [x] 2.3 Create `src/components/blog/BlogCardFeatured.astro` — accepts same props as editorial card. Structure: large image with gradient overlay → category badge → title → excerpt → `BlogAuthor`. Image fills card with `aspect-ratio: 16/9`; overlay uses `--pipod-gradient-blue`.
- [x] 2.4 Create `src/components/blog/BlogHeroFeatured.astro` — accepts `post` prop (featured article data). Renders "Destacado" label + `BlogCardFeatured` for the first post. Full-width section wrapper.

## Phase 3: Integration

- [x] 3.1 Modify `src/pages/pipod-blog.astro` — add `ogImage` from frontmatter (`post.data.ogImage`) to the data transform. Import `BlogHeroFeatured` and render it before `BlogFilter`, passing `posts[0]` as the featured article. BlogFilter receives all posts and skips first internally.
- [x] 3.2 Modify `src/components/blog/BlogFilter.jsx` — replace `<div className="row">` card rendering with `.blog-grid` container rendering editorial card DOM structure for each post (positions 2+). Preserve search input, category select, results count, empty state ("No encontramos artículos"), and "Limpiar filtros" button logic. Skip first post (rendered in hero via `filteredPosts.slice(1)`).
- [x] 3.3 Remove `src/components/blog/BlogCard.astro` from the project tree (archive/delete old card component).

## Phase 4: Testing & Build Verification

- [x] 4.1 Run `npm run build` — confirm exit code 0. All 75 pages generated (73 blog posts + blog index + /blog/ redirect). Warnings are only pre-existing SCSS deprecations from Creative Tim Bootstrap theme — zero new warnings from editorial redesign code.
- [ ] 4.2 Test responsive grid at 320px (1-col), 768px (2-col), 1024px (3-col), 1440px (3-col). Verify hero is full-width at all breakpoints. → Requires browser testing
- [ ] 4.3 Test search/filter: type "iPhone" → results filter; select category → results filter; clear filters → all 73 return. Verify empty state renders correctly. → Requires browser testing
- [ ] 4.4 Verify image fallback: confirm posts without valid OG image render gradient placeholder (no broken image tags). Confirm author initials circle renders when no avatar. → Requires browser testing

(End of file - total 32 lines)
