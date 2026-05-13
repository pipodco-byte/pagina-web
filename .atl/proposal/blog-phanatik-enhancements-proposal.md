# Proposal: blog-phanatik-enhancements

## Intent

Enhance the Pipod blog index page with Phanatik-inspired features to improve visual hierarchy, content discovery, and engagement. Implement selective components that add value without recreating the entire Phanatik theme.

## Scope

### In Scope
- **Sidebar with Featured Posts** — Text-only list for sidebar placement
- **BlogCardList (text-only)** — Simple text card for lists (BlogCard5 pattern)
- **Briefs Section** — Horizontal compact cards (BlogCard1 pattern)
- **Top Stories Section** — Overlay-style cards with list (BlogCard4 pattern)
- **Categories Grid** — 5-column category display with article counts

### Out of Scope
- Blog post detail page changes
- Hero carousel (BlogCard6/ KeenSlider)
- Boolean schema flags (`isFeatured`, `isBreaking`, etc.)
- Author pages, share buttons, related posts
- Breaking news ticker

## Approach

Use existing `category` field instead of adding boolean flags. Query posts by category and date for each section. All components in Astro (`.astro`), SCSS-only styling using `--pipod-*` CSS custom properties. Spanish locale for labels and dates.

### Feature Implementation Order

| # | Feature | Effort | Files to Create/Modify |
|---|---------|--------|------------------------|
| 1 | Sidebar with Featured Posts | Small | `src/components/blog/BlogSidebar.astro`, modify `src/pages/blog/index.astro` |
| 2 | BlogCardList (text-only) | Small | `src/components/blog/BlogCardList.astro` |
| 3 | Briefs Section | Small | `src/components/blog/BlogCardCompact.astro`, `src/components/blog/BriefsSection.astro` |
| 4 | Top Stories with Overlay | Medium | `src/components/blog/BlogCardOverlay.astro`, `src/components/blog/TopStoriesSection.astro` |
| 5 | Categories Grid | Medium | `src/components/blog/CategoriesGrid.astro` |

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/blog/` | New | 6 new Astro components |
| `src/pages/blog/index.astro` | Modified | Integrate new sections |
| `src/styles/` | Modified | Add SCSS partials if needed |
| `src/content/config.ts` | None | No changes (use existing `category`) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| CSS conflicts with existing components | Low | New components use scoped styles; review during verify |
| Category naming inconsistency | Medium | Use existing categories from Pipod; fallback to "Sin categoría" |
| Performance with multiple queries | Low | Limit queries to 3-5 posts per section |

## Rollback Plan

1. Remove new component imports from `src/pages/blog/index.astro`
2. Delete new component files from `src/components/blog/`
3. Revert index.astro to previous state via git

## Dependencies

- Phanatik reference: `/tmp/phanatik-sanity-astro/apps/web/src/`
- Pipod blog components: `/Users/calderonjosue_/Astro-Ecommerce/src/components/blog/`

## Success Criteria

- [ ] Sidebar displays 5 most recent featured posts with title + date
- [ ] BlogCardList renders text-only cards with title, category label, date
- [ ] Briefs section shows 3 horizontal compact cards
- [ ] Top Stories section displays 1 overlay hero + 4 text list items
- [ ] Categories grid shows 5 categories with post counts
- [ ] Existing BlogCardFeatured and BlogCardEditorial remain unchanged
- [ ] All styling uses SCSS with `--pipod-*` CSS custom properties
- [ ] All labels and dates in Spanish locale
- [ ] No schema changes required