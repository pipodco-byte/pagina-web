# Proposal: Blog Phanatik Visual Redesign

## Intent

User is disappointed because blog components use Phanatik structure but NOT Phanatik visual design. Article pages (/blog/[slug]) have poor content layout. This change makes ALL blog components look EXACTLY like Phanatik by copying Tailwind-based visual styles (fonts, colors, spacing, shadows, borders) into our SCSS system while preserving Pipod brand colors.

## Scope

### In Scope
- **Visual Redesign**: Update ALL blog components to match Phanatik visual style exactly
  - `BlogCardEditorial.astro` → Copy BlogCard3 visual patterns (image ratio, typography, spacing)
  - `BlogCardFeatured.astro` → Copy BlogCard2 overlay style (gradient, text placement)
  - `BlogHeroFeatured.astro` → Hero wrapper styling
  - `BlogCardList.astro` → Copy BlogCard5 text-only pattern
  - `BlogCardCompact.astro` → Copy BlogCard1 horizontal pattern
  - `BlogCardOverlay.astro` → Copy BlogCard4 overlay pattern
  - `TopStoriesSection.astro` & `BriefsSection.astro` → Section styling
- **Article Page Fix**: Redesign `BlogPostLayout.astro` for single articles
  - Content typography (font sizes, line-height, margins)
  - Image handling (aspect ratios, borders)
  - Author display with avatar
  - Related posts section at bottom
- **SCSS Updates**: Modify `_blog-editorial.scss` and `_blog-phanatik.scss`
  - Map Phanatik Tailwind patterns to SCSS (e.g., `text-base-900` → `--pipod-color-near-black`)
  - Add decorative line elements (`before`/`after` pseudo-elements)
  - Match spacing scale (gap-4, mt-2, pt-4, etc.)
- **Preserve**: Existing data pipeline (Content Collections), Pipod brand colors

### Out of Scope
- Content/structure changes (already matches Phanatik patterns)
- New features (search, pagination, filters)
- Backend/CMS changes
- URL/routing changes

## Approach

### Phase 1: Visual Token Mapping
Map Phanatik Tailwind classes to Pipod SCSS tokens:
| Phanatik | Pipod Equivalent |
|----------|-----------------|
| `text-base-900` | `--pipod-color-near-black` |
| `text-base-600` | `--pipod-color-dark-gray` |
| `font-display` | `--pipod-font-noto-sans` |
| `rounded-xl` | `--pipod-radius-standard` (24px) |
| `aspect-12/8` | Custom ratio for images |
| Decorative lines | `before`/`after` pseudo-elements with bg colors |

### Phase 2: Component Style Updates
- Replace border-radius values (24px → match Phanatik)
- Update typography (font sizes, weights, line-heights)
- Add hover states (`group-hover:underline` pattern)
- Implement decorative top-border lines on cards

### Phase 3: Article Page Redesign
- New layout structure: tags → decorative line → title → author → image → content → sidebar → related posts
- Author component with avatar image
- Share buttons integration
- Related posts grid (3 cards)

### Phase 4: SCSS Consolidation
- Merge redundant styles into `_blog-phanatik.scss`
- Create shared mixins for repeated patterns
- Clean up `_blog-editorial.scss`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/blog/BlogCardEditorial.astro` | Modify | Update to match BlogCard3 visuals |
| `src/components/blog/BlogCardFeatured.astro` | Modify | Update overlay gradient, text placement |
| `src/components/blog/BlogHeroFeatured.astro` | Modify | Update hero wrapper styling |
| `src/components/blog/BlogCardList.astro` | Modify | Update text-only card styling |
| `src/components/blog/BlogCardCompact.astro` | Modify | Update horizontal layout |
| `src/components/blog/BlogCardOverlay.astro` | Modify | Update overlay gradient |
| `src/components/blog/TopStoriesSection.astro` | Modify | Update section wrapper |
| `src/components/blog/BriefsSection.astro` | Modify | Update section wrapper |
| `src/layouts/BlogPostLayout.astro` | Modify | Full redesign for single article pages |
| `src/styles/_blog-editorial.scss` | Modify | Update card styles, add decorative elements |
| `src/styles/_blog-phanatik.scss` | Modify | Add shared patterns, clean up |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Visual regression on existing pages | Medium | Test all blog pages, maintain backup styles |
| Pipod brand colors lost | Low | Explicitly map Phanatik patterns to Pipod tokens |
| Responsive issues | Medium | Test mobile breakpoints, follow Phanatik responsive patterns |
| Content readability degraded | Low | Follow Phanatik's proven typography patterns |

## Rollback Plan

1. Keep git commit history - revert to previous commit
2. SCSS files are versioned - restore from git
3. Component files can be restored individually
4. Fallback: temporarily switch to plain Layout.astro if BlogPostLayout fails

## Dependencies

- Phanatik reference files at `/tmp/phanatik-sanity-astro/apps/web/src/`
- Existing Pipod token system (`_tokens.css`)

## Success Criteria

- [ ] All blog cards visually match Phanatik patterns (rounded corners, typography, spacing)
- [ ] Article pages have Phanatik-style layout (decorative lines, author section, sidebar)
- [ ] Mobile responsive matches Phanatik behavior
- [ ] Pipod brand colors preserved in key elements
- [ ] No visual regression on other site sections
- [ ] Content readability improved (larger fonts, better line-height)
