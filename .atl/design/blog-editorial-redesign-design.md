# Design: Blog Editorial Redesign

## Technical Approach

Replace Bootstrap `.row` card grid in `BlogFilter.jsx` with Astro components using CSS Grid and `--pipod-*` tokens. Data pipeline stays unchanged (`getCollection('blog')` → `posts[]` → `window.__BLOG_POSTS__`); only card rendering layer is replaced. Phanatik visual patterns (image-top cards, featured hero, author line) adapted to SCSS/BEM without Tailwind.

## Architecture Decisions

| Decision | Option A | Option B | Choice | Rationale |
|----------|----------|----------|--------|-----------|
| Image component | `<Image>` from `astro:assets` (build-time sharp processing) | `<img>` (runtime only) | **A** | Astro optimizes/sizes at build, lazy loads, handles missing gracefully via `inferSize`; proposal mandates this |
| Grid system | CSS Grid (`.blog-grid`) | Bootstrap `.row` + `col-*` | **A — CSS Grid** | Proposal is explicit: "Use CSS Grid layout (not Bootstrap .row)"; avoids Bootstrap dependency in new components; `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` handles responsive without breakpoint classes |
| CSS methodology | BEM on new components (`.blog-card-editorial__*`) | Utility classes (Tailwind-style atomic) | **A — BEM** | Project already uses BEM (`blog-card__title`, `blog-filter-section`); tokens already drive values; no Tailwind dependency |
| Card composition | Two separate components (Featured + Editorial) | One configurable card with variant prop | **B (target), A (delivery)** | Phanatik has distinct card variants; layout differences (1-col vs 2-col grid, image size, overlay vs inline) are too divergent for a single component. Separate files preferred for readability |
| Author avatar | CSS-only initials circle (32px, `--pipod-color-deep-blue` bg) | External avatar images | **A — initials fallback** | Schema has `author: z.literal('kimi')` — single author, no avatar URL field. CSS-generated initials (`K`) with rounded container is zero-network, always available, matches proposal's mitigation |

## Data Flow

```
pipod-blog.astro
  │ getCollection('blog') → sort by publishDate desc
  │ Map to flat objects + readingTime calc + ogImage path
  │ Inject into <script define:vars={{ posts }}>
  ▼
BlogHeroFeatured.astro                ← receives: posts[0] (featured)
  │  <BlogCardFeatured post={...} />
  │  <BlogAuthor author="kimi" date={...} readingTime={...} />
  ▼
BlogFilter.jsx (modified)             ← reads: window.__BLOG_POSTS__
  │  Filter by searchTerm + selectedCategory
  │  Render grid posts[1..n] using BlogCardEditorial
  │  Each card: image → tags → category → title → BlogAuthor
  ▼
BlogAuthor.astro                      ← shared sub-component
  │  Avatar (initials) | Name | formatted date | reading time
```

**OG image resolution**: Posts store paths like `/images/blog/{slug}/og-{slug}.webp`. Astro `<Image>` resolves from `public/` at build time. If missing on disk, `onerror` or conditional `?img` check triggers gradient placeholder with category label overlay.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/blog/BlogCardEditorial.astro` | **Create** | Standard card: image top → tags → title → author. 300-400px flexible grid cell |
| `src/components/blog/BlogCardFeatured.astro` | **Create** | Hero card: large image with gradient overlay, title, description, author footer |
| `src/components/blog/BlogHeroFeatured.astro` | **Create** | Section wrapper: "Destacado" label + BlogCardFeatured for first post |
| `src/components/blog/BlogAuthor.astro` | **Create** | 32px initials avatar + "Kimi" + date + reading time |
| `src/styles/_blog-editorial.scss` | **Create** | CSS Grid layout, card variants, hover effects, responsive breakpoints |
| `src/components/blog/BlogFilter.jsx` | **Modify** | Replace `<div className="row">` card rendering with Astro-like structural markup; keep search/filter/empty-state logic |
| `src/pages/pipod-blog.astro` | **Modify** | Add `ogImage` and `tags` to data transform; import new components; prepend `BlogHeroFeatured` before `BlogFilter` |
| `src/styles/blog-cards.css` | **Modify** | Add `@import '_blog-editorial.scss'` or merge new styles |
| `src/components/blog/BlogCard.astro` | **Archive** | Replaced by editorial variants; remove from git (keep accessible) |

## Component Interfaces

**BlogCardEditorial.astro** props:
```ts
interface Props {
  slug: string;           // e.g. "cambio-bateria-iphone-chapinero"
  title: string;
  description: string;
  ogImage: string;        // e.g. "/images/blog/{slug}/og-{slug}.webp"
  category: string;       // e.g. "iPhone"
  tags: string[];         // e.g. ["batería", "iPhone", ...]
  publishDate: string;    // ISO: "2026-05-08"
  author: string;         // always "kimi"
  readingTime: string;    // e.g. "5 min de lectura"
}
```

**BlogAuthor.astro** props:
```ts
interface Props {
  author: string;         // display name, e.g. "Kimi" (formatted from "kimi")
  publishDate: string;    // ISO string
  readingTime: string;
}
```

## SCSS Architecture (`_blog-editorial.scss`)

Grid layout using `auto-fill` for intrinsic responsiveness:

```scss
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--pipod-space-xl, 32px);

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}
```

Breakpoints: mobile `<768px` (1 col), tablet `768-1024px` (2 col), desktop `>1024px` (3 col). Card hover: `transform: translateY(-4px)` + `box-shadow` transition using existing `--pipod-transition-normal`. Typography reuses `--pipod-size-h3/h4/body/small` tokens. Image placeholder: `background: var(--pipod-gradient-secondary)` with `aspect-ratio: 16/9`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | All 73 posts render without broken images | Manual review; `blog-cards.css` fallback shows gradient |
| Search/Filter | BlogFilter.jsx filtering unchanged | Same keywords return same results |
| Responsive | Grid collapses at 768px, 1024px | Browser devtools at 320/768/1024/1440 |
| Build | `astro build` succeeds, zero warnings | CI check |
| Lighthouse | No performance regression | Compare before/after scores |

## Migration / Rollout

No migration required. Pure component swap — no data changes, no DB, no URL changes. Rollback: revert `pipod-blog.astro` and `BlogFilter.jsx`, delete 4 new `.astro` files and `_blog-editorial.scss`, restore `BlogCard.astro`. Single deploy.

## Open Questions

- [ ] Should we add `reading-time` npm package as a dependency (like Phanatik), or keep `"5 min de lectura"` hardcoded placeholder? Accuracy vs. new dep.
- [ ] Author display name: format "kimi" → "Kimi" (simple capitalize) or map to "Equipo Pipod"? Full name not in schema.
- [ ] BlogHeroSection.astro has inline search that duplicates BlogFilter — remove or consolidate?
