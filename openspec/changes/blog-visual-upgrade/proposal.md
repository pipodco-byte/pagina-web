# Proposal: Blog Visual Upgrade

> **Change**: `blog-visual-upgrade`
> **Date**: 2026-05-12
> **Phase**: proposal
> **Status**: draft

---

## 1. Intent

Upgrade Pipod's blog from basic white cards with one hardcoded post to a refined editorial design inspired by the Lexington "Author" theme — adapted to Pipod's light design system. The change introduces typography-first hierarchy, a metadata display system (date + reading time), CSS token integration, and a reusable `BlogCard.astro` component that future articles can consume directly.

**What this delivers:**

- **Editorial typography**: Lightened heading weights (800→700), `tracking-tighter` letter-spacing, three-font hierarchy preserved (Inter for headings, PT Mono for labels/metadata, Noto Sans for body)
- **Metadata on every card**: Date + reading time line in Apple-style small gray text, matching the Author theme's pattern
- **Clean CSS architecture**: Extract blog styles from React's `dangerouslySetInnerHTML` into shared stylesheets that both Astro and React components consume — ending the three-style-methodology fragmentation
- **CSS token integration**: Blog becomes the first area to use `var(--pipod-*)` variables, proving the token system works end-to-end
- **Reusable card component**: `BlogCard.astro` usable by any future blog page (listing, related posts, homepage featured)
- **Image support**: `aspect-[3/4]` image slot in cards, hidden gracefully when no image exists, ready for future articles with cover images

---

## 2. Scope

### In Scope

| Item | Rationale |
|------|-----------|
| New `BlogCard.astro` component | Shared card with image slot, metadata line, editorial typography |
| New `src/styles/blog-cards.css` | Shared CSS for card design, consumed by both Astro + React |
| Refactor `BlogFilter.jsx` card rendering | Replace inline card markup with shared CSS classes; add date + reading-time metadata |
| Add `reading-time` npm dependency | Industry standard, used by Author theme |
| Refine `BlogHeroSection.astro` | Inline styles → scoped `<style>`, token integration |
| Refine article page typography | Weight reduction (800→700 h1, 600 h2), tracking control |
| Align `BlogCtaSection.astro` | Token integration, typography consistency |
| Validate `_tokens.css` variables | First real consumer — verify all referenced tokens exist and work |
| Responsive verification | Test all blog components at 768px breakpoint |

### Out of Scope

| Item | Why excluded |
|------|-------------|
| Dark overlays / dark-themed cards | Contradicts Pipod's light-first design system |
| Full Lexington Author theme installation | We're adapting patterns, not adopting a dependency |
| Removing React from blog listing | BlogFilter.jsx search + filter state stays React for now (1 post = low overhead, revisit when content grows) |
| New blog articles or content | Visual upgrade only — content strategy is separate |
| Homepage or store page changes | Blog-specific change, other pages unaffected |
| Image pipeline / CDN setup | Card supports images but sourcing strategy is separate work |
| Global SCSS refactor | Card styles extracted to new file; existing `astro-ecommerce.scss` untouched |

---

## 3. Approach — Editorial Visual Upgrade

### Architecture Decision: Hybrid Card System

The exploration's open question: how do Astro and React components share card rendering?

**Decision**: Extract card CSS to a shared stylesheet. Both `BlogCard.astro` and `BlogFilter.jsx` render cards using the same CSS classes. No component nesting across runtime boundaries.

**Why not embed `BlogCard.astro` inside React?**
Astro components can't render inside React `client:load` islands without double-wrapping (`client:load` inside `client:load`), which introduces hydration complexity for a single-post grid. A shared-CSS approach is simpler and delivers identical visual output.

**Why not remove React entirely?**
BlogFilter's search + filter UI currently requires React state. With 1 post, it's lightweight. When Pipod has 10+ articles and Astro's View Transitions or `@nanostores` could replace React, revisit. For now, the CSS extraction eliminates the `dangerouslySetInnerHTML` pattern without an unnecessary React migration.

### Component Architecture (Target State)

```
pipod-blog.astro
├── BlogHeroSection.astro        → scoped styles + tokens
├── BlogFilter.jsx (client:load)
│   ├── Search + filter UI       → React state (unchanged)
│   └── Card grid                → shared CSS classes from blog-cards.css
└── BlogCtaSection.astro         → scoped styles + tokens

BlogCard.astro                   → standalone, uses same blog-cards.css
                                   (not used on listing page yet;
                                    available for future pages)
```

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| Card: white background, `#E5E5E7` border | Respects Pipod's light system |
| Card: `#1F1F1F` border on hover | Editorial emphasis without dark overlay |
| Metadata line: PT Mono 12px, `#86868B` | Author's "reading time" pattern in Pipod's font system |
| Category label: PT Mono 10px, `#3A506B`, uppercase, 2px tracking | Already proven in current design — keep |
| Title: Inter 700, `tracking-tighter` (`-0.02em`) | Lighter than current 800; tighter tracking = editorial feel |
| Image: `aspect-ratio: 3/4`, hidden when absent | Author uses 9/12 (≈3/4), future-proofs cards |
| `reading-time` package | Industry standard, same pattern as Author theme |
| CSS tokens: `var(--pipod-*)` with hardcoded fallbacks | Starts token integration; fallbacks prevent breakage if token file isn't imported |
| Card body padding: 28px 24px | Slightly more generous than current 45×35 (written as 45+35), improves readability |
| Hover: border→near-black + shadow + translateY(-4px) | Subtle elevation matching the editorial feel |

### Typography Hierarchy (Refined)

| Element | Current | Proposed | Token Used |
|---------|---------|----------|------------|
| Hero title | Inter 800, 3rem | Inter 700, 3rem | `--pipod-weight-bold` |
| Card title | Inter 700, 22px | Inter 700, 20px (1.25rem) | `--pipod-weight-bold` |
| Card excerpt | Inter, 15px | Inter, 14.4px (0.9rem) | — |
| Article h1 | Inter 800, 3rem | Inter 700, 2.5rem | `--pipod-weight-bold` |
| Article h2 | (varies by section) | Inter 600, 1.75rem, `tracking-tighter` | `--pipod-weight-semibold` |
| Metadata line | **New** | PT Mono, 12px, `#86868B` | `--pipod-font-pt-mono` |
| Category label | PT Mono, 10px | PT Mono, 10px (unchanged) | `--pipod-size-label` |
| Read link | Inter 800, 12px | Inter 700, 12px (lightened) | `--pipod-weight-bold` |

---

## 4. Affected Areas / Files

### Modified Files

| File | Change | Impact |
|------|--------|--------|
| `src/components/blog/BlogFilter.jsx` | Replace `dangerouslySetInnerHTML` card styles with shared CSS import; add metadata line (date + reading time) to card markup; add reading-time computation | **Major** (card rendering refactor) |
| `src/components/blog/BlogHeroSection.astro` | Convert inline styles to scoped `<style>`; integrate CSS tokens; refine heading typography | **Moderate** |
| `src/pages/blog/historia-pipod-bogota.astro` | Reduce heading weights; add `tracking-tighter`; align typography scale with proposal | **Minor** |
| `src/pages/pipod-blog.astro` | Import `blog-cards.css` (if not auto-loaded via Layout); verify Bootstrap cascade | **Minor** |
| `src/components/blog/BlogCtaSection.astro` | Convert inline styles; integrate tokens; match typography scale | **Minor** |
| `src/styles/_tokens.css` | Validate all `var()` references; no changes needed (tokens already complete) | **Reference check** |
| `package.json` | Add `reading-time` dependency | **New dependency** |

### New Files

| File | Purpose |
|------|---------|
| `src/components/blog/BlogCard.astro` | Standalone card component (optional image, metadata line, editorial styles) |
| `src/styles/blog-cards.css` | Shared card CSS — imported by BlogCard.astro (scoped) and BlogFilter.jsx (global within blog section) |

### Not Affected

- `src/layouts/Layout.astro` — unchanged (already imports `_tokens.css`)
- `src/assets/scss/astro-ecommerce.scss` — untouched (blog cards use new file, not global SCSS)
- `src/components/SEO/BlogPostingSchema.astro` — no visual changes
- All non-blog pages (home, tienda, contacto, servicio-tecnico, donate) — blog-specific scope
- `src/components/pipodFooter` — unchanged
- `src/layouts/floatingContact` — unchanged

---

## 5. Risks

| Risk | Likelihood | Severity | Mitigation |
|------|-----------|----------|------------|
| **Bootstrap `.card` class collision** | Low | Medium | Use unique class names (`blog-card-editorial`, never `.card`). BlogFilter already avoids Bootstrap card classes. Verify no cascade interference in `astro-ecommerce.scss`. |
| **CSS cascade from `astro-ecommerce.scss`** | Low | Low | New `blog-cards.css` classes are scoped to `.blog-card-editorial` wrapper. If conflicts arise, increase specificity or use `@layer blog {}`. |
| **BlogFilter JSX loses React HMR** | Low | Low | Extracting CSS doesn't affect React rendering logic. Search/filter state unchanged. |
| **`_tokens.css` not imported in all contexts** | Low | Medium | All `var()` calls include hardcoded fallbacks. Layout.astro already imports `_tokens.css`. BlogCtaSection and BlogHeroSection render within Layout, so tokens are available. |
| **Font weight 500 missing from Google Fonts** | Low | Low | Layout.astro loads Inter 300, 400, 600, 700. No weight 500 in proposal. 600 for semibold headings is sufficient. |
| **`reading-time` expects raw markdown** | Low | Low | BlogFilter's hardcoded post has body text (excerpt). Compute reading time from post content, not frontmatter excerpt alone. For future dynamic posts, compute from full markdown at build time. |
| **Single article makes grid sparse** | Low | Low | 1-card grid occupies full column (col-12). Design handles 1→N cards gracefully. No layout shift when more articles are added. |
| **React component still renders cards** | Low | Low | This is by design for this phase. BlogCard.astro exists as the canonical component for future Astro pages. BlogFilter uses shared CSS to produce identical cards. |

---

## 6. Success Criteria

1. **Card metadata**: Every blog card shows date (formatted `DD MMM YYYY` in Spanish) + reading time (e.g., "4 min de lectura") in a PT Mono metadata line below the title
2. **Typography refinement**: All headings use `tracking-tighter` where appropriate; weights reduced from 800→700 (titles) and 700→600 (subheadings); hierarchy matches the table in Section 3
3. **CSS token integration**: At least 80% of hardcoded color/font/spacing values in blog components reference `var(--pipod-*)` with hardcoded fallbacks
4. **No `dangerouslySetInnerHTML` styles in BlogFilter**: All blog card CSS lives in `blog-cards.css`, imported via standard `<style>` or Astro scoped styles
5. **Responsive parity**: Cards render correctly at mobile (<480px), tablet (768px), and desktop (1024px+) — single column mobile, multi-column desktop
6. **No Bootstrap interference**: No unintended Bootstrap `.card` styling applied to blog cards (verified via browser inspection)
7. **BlogCard.astro renders standalone**: Opening `/blog-card-demo` (or dev-only route) shows the component in isolation with all prop variations (with/without image)
8. **No visual regressions**: BlogHeroSection, BlogCtaSection, and article page look the same or better — no broken layouts, no missing content
9. **Reading time accurate**: Hardcoded post's reading time is correct (±10s) based on Spanish text content length
10. **Build succeeds**: `npm run build` completes without errors; no missing imports, no broken `var()` references

---

## 7. Implementation Phases

### Phase 1: Shared CSS Foundation
1. Create `src/styles/blog-cards.css` with all card, metadata, and editorial typography classes
2. Verify CSS tokens referenced by the new stylesheet exist in `_tokens.css`
3. Test in browser that raw HTML with these classes renders correctly

### Phase 2: BlogCard.astro Component
1. Create `BlogCard.astro` consuming `blog-cards.css` via scoped `<style>`
2. Implement all props: `title`, `excerpt`, `category`, `date`, `readingTime`, `href`, `imageSrc?`, `imageAlt?`
3. Conditional image slot — hidden when `imageSrc` is undefined
4. Metadata line with date · reading time separator
5. Hover animation (border + shadow + translateY)

### Phase 3: BlogFilter.jsx Refactor
1. Add `reading-time` to `package.json` and `npm install`
2. Replace `dangerouslySetInnerHTML` card styles with `import './blog-cards.css'` (or equivalent in Astro's React integration)
3. Refactor card JSX to use shared CSS classes (`.blog-card-editorial`, `.card-body`, `.card-category`, `.card-title`, `.card-meta`, `.card-excerpt`, `.card-link`)
4. Add `date` + `readingTime` to hardcoded post object
5. Add metadata line markup
6. Verify search/filter still works

### Phase 4: Hero + CTA + Article Refinement
1. BlogHeroSection: inline styles → scoped `<style>`, token integration, heading weight
2. BlogCtaSection: inline styles → scoped `<style>`, token integration
3. Article page: heading weights, tracking, consistent with BlogCard typography

### Phase 5: Responsive Verification
1. Test all blog components at 480px, 768px, 1024px, 1440px
2. Verify Bootstrap grid (`col-12 col-md-6 col-lg-4`) works with new card styles
3. Verify hover states degrade gracefully on touch devices

---

## 8. Dependencies

- **None**: This change has no upstream or downstream dependencies. All files exist in the repo; `reading-time` is the only external addition.

---

## 9. Summary

| Field | Value |
|-------|-------|
| **Approach** | Editorial Visual Upgrade (Approach B from exploration) |
| **Files changed** | 5 modified, 2 new |
| **New dependency** | `reading-time` (npm) |
| **Risk level** | Medium — architectural CSS extraction, but low blast radius (blog only) |
| **Effort** | Medium (~4–6 hours) |
| **Breaks existing?** | No — all class names are new; existing inline styles replaced, not overridden |
| **Ready for specs?** | Yes |
