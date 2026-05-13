# Proposal: Blog Editorial Redesign

## Intent

Replace the current text-only blog cards with a Phanatik-inspired magazine layout. The existing cards (title + category + date) lack visual hierarchy, images, and author presence — undermining SEO engagement and brand credibility for Pipod's 73-article blog.

## Scope

### In Scope
- New editorial card components: `BlogCardEditorial.astro`, `BlogCardFeatured.astro`
- Featured article hero section (`BlogHeroFeatured.astro`) — 1st post highlighted
- Author component with avatar + name + role (`BlogAuthor.astro`)
- Responsive magazine grid: 1-col mobile, 2-col tablet, 3-col desktop
- OG image integration with graceful fallback for missing images
- Replace card rendering in `BlogFilter.jsx` while preserving search/filter logic
- New SCSS partial `_blog-editorial.scss` using existing `--pipod-*` tokens

### Out of Scope
- Tailwind CSS (keep SCSS/Bootstrap)
- Frontmatter schema changes (no new fields needed)
- Content rewriting or new articles
- Blog post detail page redesign (only index page)
- URL structure changes

## Approach

**Option C — Hybrid**: Keep `pipod-blog.astro` as the page shell but replace all card rendering with new Astro components. Leverage existing Content Collections (`getCollection('blog')`), data pipeline, and filter UI — only the visual layer changes.

## Architecture

```
pipod-blog.astro (data fetch + layout)
├── BlogHeroFeatured.astro    ← NEW: featured article with large image
├── BlogFilter.jsx            ← MODIFIED: uses new card components
│   ├── BlogCardEditorial.astro  ← NEW: standard editorial card
│   └── BlogCardFeatured.astro   ← NEW: hero variant (1st position)
├── BlogAuthor.astro          ← NEW: avatar + name + role + date
├── BlogCtaSection.astro      ← UNCHANGED
└── FloatingContact            ← UNCHANGED
```

## Card Variants

| Variant | Description | Used For |
|---------|-------------|----------|
| `BlogCardFeatured` | Large image, title overlay, author footer | Hero / 1st position |
| `BlogCardEditorial` | Image top → tags → title → date | Grid cards (positions 2+) |
| `BlogAuthor` | 32px avatar + name + role + date | Inline below titles |

## Image Handling

OG images use paths like `/images/blog/{slug}/og-{slug}.webp` but **do not exist on disk**. Strategy:
1. Try `<Image>` with `inferSize` — Astro processes via sharp at build time
2. If not found: CSS gradient placeholder (`var(--pipod-color-light-surface)`)
3. Fallback: show card without image (no broken img tag)

## Files

| File | Action | Notes |
|------|--------|-------|
| `src/components/blog/BlogCardEditorial.astro` | Create | Standard editorial card |
| `src/components/blog/BlogCardFeatured.astro` | Create | Hero variant for 1st post |
| `src/components/blog/BlogHeroFeatured.astro` | Create | Featured article section |
| `src/components/blog/BlogAuthor.astro` | Create | Author avatar component |
| `src/styles/_blog-editorial.scss` | Create | Editorial card styles |
| `src/components/blog/BlogFilter.jsx` | Modify | Use new card components |
| `src/pages/pipod-blog.astro` | Modify | Add `ogImage` to data pipeline |
| `src/styles/blog-cards.css` | Modify | Add editorial styles or `@import` |
| `src/components/blog/BlogCard.astro` | Archive | Replaced by editorial variants |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| OG images missing on disk break cards | High | CSS gradient fallback + conditional rendering |
| React/Bootstrap grid conflicts with new CSS Grid | Med | Use separate `.blog-grid` class, not `.row` |
| Reading time estimates inaccurate | Low | Calculate from word count in render phase |
| Author avatar not available | High | Use initials-based SVG fallback |
| Performance regression with many images | Med | Use `<Image>` with `loading="lazy"` and `densities` |

## Rollback Plan

1. Revert `pipod-blog.astro` and `BlogFilter.jsx` to current versions
2. Delete new `.astro` components and `_blog-editorial.scss`
3. Restore `BlogCard.astro` from git history
4. No DB migrations, no content changes — pure file rollback

## Success Criteria

- [ ] All 73 articles render with OG image or gradient fallback
- [ ] Search/filter functionality unchanged
- [ ] Responsive grid works at 320px, 768px, 1024px, 1440px
- [ ] No Tailwind classes used (SCSS only)
- [ ] Author info visible on every card and hero section
- [ ] Lighthouse score ≥ current baseline (no regression)
- [ ] Build succeeds with zero warnings
