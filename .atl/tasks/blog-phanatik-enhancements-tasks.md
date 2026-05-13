# Tasks: blog-phanatik-enhancements

## Phase 1: Simple Components

- [ ] 1.1 Create `src/components/blog/BlogCardList.astro` — text-only article card (BlogCard5 pattern), props: slug, title, category, publishDate, Spanish date formatting
- [ ] 1.2 Create `src/components/blog/BlogSidebar.astro` — text-only nav list (Aside1 pattern), renders up to 5 posts with title links and Spanish dates, empty state shows title only
- [ ] 1.3 Add shared Spanish date formatter utility (Intl.DateTimeFormat locale es-ES) — used by Phase 1 and Phase 2 components

## Phase 2: Compact Components

- [ ] 2.1 Create `src/components/blog/BlogCardCompact.astro` — horizontal flex card (BlogCard1 pattern), optional 80px image left + text right, onerror gradient fallback
- [ ] 2.2 Create `src/components/blog/CategoriesGrid.astro` — 5-column responsive grid (Categories1 pattern), category name + post count, link to `/blog?category={name}`, empty state hides section

## Phase 3: Overlay Components

- [ ] 3.1 Create `src/components/blog/BlogCardOverlay.astro` — full image with gradient overlay bottom third (BlogCard4 pattern), 16:9 aspect, title truncates 2 lines max, onerror gradient fallback
- [ ] 3.2 Create `src/components/blog/BriefsSection.astro` — wraps 3 BlogCardCompact in horizontal row (Briefs1 pattern), section label "Breves", horizontal scroll on mobile, empty state hides section
- [ ] 3.3 Create `src/components/blog/TopStoriesSection.astro` — 2-col layout: 1 BlogCardOverlay hero + 4 BlogCardList vertical stack (TopStories1 pattern), section label "Historias Destacadas", responsive stack on mobile

## Phase 4: Shared Styles

- [ ] 4.1 Create `src/styles/_blog-phanatik.scss` — shared SCSS partial with `--pipod-*` CSS custom properties for new components (gradient placeholders, card styles, grid utilities)

## Phase 5: Integration

- [ ] 5.1 Modify `src/pages/pipod-blog.astro` — import and place TopStoriesSection (below hero), BriefsSection, BlogSidebar (in aside), CategoriesGrid (at bottom)
- [ ] 5.2 Wire data in frontmatter: derive topStories (5 posts), briefs (3 posts), sidebarPosts (5 posts), categories with counts from `getCollection('blog')`
- [ ] 5.3 Verify all existing blog components (BlogCardFeatured, BlogCardEditorial) remain unchanged

## Phase 6: Testing

- [ ] 6.1 Run `npm run build` — verify zero errors and zero warnings
- [ ] 6.2 Visual check: verify TopStoriesSection (1 overlay + 4 list items), BriefsSection (3 compact cards), BlogSidebar (5 text items), CategoriesGrid (5-column grid) all render correctly
- [ ] 6.3 Responsive check: verify mobile layout (CategoriesGrid → 2-col, TopStories → stack, Briefs → scroll)
- [ ] 6.4 Spanish locale check: verify dates render as "12 may 2026" format, labels in Spanish
- [ ] 6.5 Image fallback check: verify onerror gradient displays when ogImage is invalid

## Implementation Order
Phase 1 → Phase 2 → Phase 3 (components built in isolation) → Phase 4 (shared styles, depends on all components) → Phase 5 (integration page, depends on all components) → Phase 6 (build + visual verification)
