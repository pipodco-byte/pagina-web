# SPEC.md — Blog Visual Upgrade

## Change: blog-visual-upgrade

**Author:** SDD Orchestrator  
**Date:** 2026-05-12  
**Status:** SPEC APPROVED  
**Project:** Astro-Ecommerce (pipod.co)

---

## 1. Overview

### What
Refactor the Pipod blog card system into a shared, token-based editorial design. Replace the inline React styles in `BlogFilter.jsx` (dangerouslySetInnerHTML) with a proper `BlogCard.astro` component and a shared `blog-cards.css` stylesheet. Integrate Pipod design tokens (`--pipod-*`) throughout the blog section.

### Why
The blog currently suffers from:
- Fragmented CSS (3 different style methodologies: inline, dangerouslySetInnerHTML, is:global)
- No metadata display (date, reading time)
- No reusable card component
- Hardcoded color values instead of design tokens
- Title weight too heavy (800) for editorial context

### Scope
- Blog listing page (BlogFilter.jsx)
- Blog hero section (BlogHeroSection.astro)
- Article page metadata (historia-pipod-bogota.astro)
- CTA section (BlogCtaSection.astro)

### Out of Scope
- 73 SEO articles (stashed, recovered separately)
- Dark mode support
- Backend/API changes

---

## 2. Visual Style

### Design Direction
Editorial typography using Pipod's **light** design tokens. No dark overlays. Clean white cards on light surface background.

### Color Palette
| Role | Token | Value |
|------|-------|-------|
| Card background | `--pipod-color-white` | `#ffffff` |
| Card border | `--pipod-color-border-gray` | `#E5E5E7` |
| Heading text | `--pipod-color-near-black` | `#1F1F1F` |
| Body text | `#4C4C4C` (near-gray) | — |
| Category label | `--pipod-color-deep-blue` | `#3A506B` |
| CTA link | `--pipod-color-near-black` | `#1F1F1F` |
| Hover border | `--pipod-color-black` | `#000000` |
| Page background | `--pipod-color-light-surface` | `#F5F5F7` |

### Typography
| Element | Token | Size | Weight | Leading | Tracking |
|---------|-------|------|--------|---------|----------|
| Hero h1 | `--pipod-size-h1` | 45px | `--pipod-weight-extrabold` (700) | `--pipod-leading-tight` | `--pipod-tracking-tight` |
| Card title | `--pipod-size-h3` | 24px | `--pipod-weight-bold` (700) | `--pipod-leading-snug` | — |
| Card body | `--pipod-size-body` | 15px | `--pipod-weight-regular` | `--pipod-leading-relaxed` | — |
| Metadata | `--pipod-font-pt-mono` | 12px | `--pipod-weight-regular` | normal | normal |
| Category | `--pipod-size-label` | 12px | `--pipod-weight-extrabold` (800) | normal | `--pipod-tracking-wider` |
| CTA link | `--pipod-size-label` | 12px | `--pipod-weight-bold` (700) | normal | `--pipod-tracking-wide` |

### Spacing System (base: 8px)
| Token | Value |
|-------|-------|
| `--pipod-space-sm` | 8px |
| `--pipod-space-md` | 16px |
| `--pipod-space-lg` | 24px |
| `--pipod-space-xl` | 32px |

### Border Radius
| Element | Token | Value |
|---------|-------|-------|
| Card | `--pipod-radius-standard` | 24px |
| Filter button | pill-style | 20px |
| CTA button | `--pipod-radius-pill` | 50px |

### Shadows
| State | Token | Value |
|-------|-------|-------|
| Default card | `--pipod-shadow-card` | `0 4px 12px rgba(0,0,0,0.06)` |
| Hover card | `--pipod-shadow-elevated` | `0 8px 24px rgba(0,0,0,0.1)` |

---

## 3. Layout & Structure

### Blog Page Layout
```
┌─────────────────────────────────────────┐
│  BlogHeroSection (gradient bg)          │
│  - H1: "Blog Pipod"                      │
│  - Subtitle                              │
│  - Search bar (client-side filter)       │
├─────────────────────────────────────────┤
│  BlogFilter (React)                     │
│  - Search input + category buttons       │
│  - Results count                        │
│  - BlogCard grid (row of cols)          │
├─────────────────────────────────────────┤
│  BlogCtaSection (black bg)              │
│  - H2 + CTA WhatsApp button             │
└─────────────────────────────────────────┘
```

### BlogCard Grid
- Desktop: `col-12 col-md-6 col-lg-4` (3 columns)
- Tablet: `col-md-6` (2 columns)
- Mobile: `col-12` (1 column, full width)

### Card Internal Layout
```
┌─────────────────────────────────┐
│  [CATEGORY LABEL]               │
│  (PT Mono 12px, uppercase)      │
│                                 │
│  Title (2 lines max, truncate) │
│  (Inter 24px bold)              │
│                                 │
│  Excerpt (3 lines max)         │
│  (Inter 15px regular)           │
│                                 │
│  ─────────────────────────────  │
│  [DATE] · [READING TIME]        │
│  (PT Mono 12px)                │
│                                 │
│  [LEER ARTÍCULO →]             │
│  (CTA link)                     │
└─────────────────────────────────┘
```

### Hero Section
- Background: gradient `--pipod-color-light-surface` to `--pipod-color-white`
- Padding: `--pipod-padding-desktop` (80px) desktop, `--pipod-padding-mobile` (24px) mobile
- Max-width search bar: 500px centered
- Search input: pill-style border-radius

### CTA Section
- Background: `--pipod-color-black`
- CTA button: white fill, pill border-radius
- No design token changes (already black)

---

## 4. Components

### BlogCard.astro (NEW)
Astro component for rendering a single blog post card.

**Props:**
```typescript
interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  publishedDate: string; // ISO date string, e.g. "2026-05-12"
  readingTime: number;   // minutes
}
```

**Rendering:**
- Category badge (PT Mono, uppercase, letter-spacing)
- Title (2-line clamp with ellipsis)
- Excerpt (3-line clamp with ellipsis)
- Metadata line: formatted date (DD MMM YYYY) + reading time (X min)
- CTA link: "LEER ARTÍCULO →"

**States:**
- Default: white bg, border-gray border, card shadow
- Hover: black border, elevated shadow, translateY(-4px)
- Focus: visible outline for accessibility

### blog-cards.css (NEW)
Shared CSS file containing all blog card styles using Pipod tokens.

```css
/* Blog Card */
.blog-card { ... }
.blog-card:hover { ... }

/* Typography */
.blog-card__category { ... }
.blog-card__title { ... }
.blog-card__excerpt { ... }
.blog-card__meta { ... }
.blog-card__cta { ... }

/* Responsive */
@media (max-width: 768px) { ... }
```

**Usage:**
```astro
<!-- In Astro files -->
<link rel="stylesheet" href="/src/styles/blog-cards.css" />
<!-- Or via import in frontmatter -->
```

### BlogFilter.jsx (MODIFIED)
React component for blog listing. Refactor away from dangerouslySetInnerHTML.

**Changes:**
1. Import styles from `blog-cards.css` instead of inline styles
2. Replace hardcoded class names with BEM-style `.blog-card-*` classes
3. Add `reading-time` package usage for calculating `readingTime` from content

**Before:**
```jsx
<div className="blog-card-white">
  <div className="card-body-white">
    <span className="card-cat">{post.category}</span>
    ...
```

**After:**
```jsx
<div className="blog-card">
  <div className="blog-card__body">
    <span className="blog-card__category">{post.category}</span>
    ...
```

### BlogHeroSection.astro (MODIFIED)
Refactor to use Pipod tokens instead of hardcoded values.

**Changes:**
- Replace inline `style` attributes with CSS classes
- Use `--pipod-size-*` tokens for font sizes
- Use `--pipod-weight-*` tokens for font weights
- Keep existing search functionality (client-side filtering via `.blog-card-white` selector → update to `.blog-card`)

### BlogCtaSection.astro (MINIMAL CHANGES)
Already uses black background. Only add responsive refinements if needed.

### historia-pipod-bogota.astro (ARTICLE PAGE - MODIFIED)
Add article metadata header below the article title.

**Layout:**
```
┌─────────────────────────────────────────┐
│  HISTORIA PIPOD                         │
│  Article Title                          │
│                                         │
│  DD MMM YYYY · X min read               │
└─────────────────────────────────────────┘
```

**Styling:**
- Category: PT Mono 12px uppercase, deep-blue color
- Title: Inter 45px bold tight tracking
- Metadata: PT Mono 12px, gray color

---

## 5. Functionality

### Reading Time Calculation
Install `reading-time` npm package:
```bash
npm install reading-time
```

**Usage:**
```javascript
import readingTime from 'reading-time';

const stats = readingTime(articleContent);
// stats.text === "5 min read"
// stats.time === 300000 (ms)
```

### Client-Side Search (BlogHeroSection)
The existing `filterBlogPosts()` function searches card content by:
1. Title (`.blog-card__title`)
2. Excerpt (`.blog-card__excerpt`)
3. Category (`.blog-card__category`)

**Update required:** Change class selectors from `.card-t`, `.card-p`, `.card-cat` to `.blog-card__title`, `.blog-card__excerpt`, `.blog-card__category`.

### Empty State
When search yields no results, display:
```
┌─────────────────────────────────┐
│         🔍 (bi-search icon)     │
│                                 │
│  No encontramos artículos       │
│  que coincidan con tu búsqueda. │
│                                 │
│  [ Limpiar filtros ]           │
└─────────────────────────────────┘
```

Styling via `.blog-empty-state` class in `blog-cards.css`.

---

## 6. Edge Cases

### Long Titles
- **Behavior:** Clamp at 2 lines using `line-clamp` (CSS or JS fallback)
- **CSS:** `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;`
- **No JS truncation required** — pure CSS solution

### Missing Images
- **Current state:** No images in blog cards (text-only editorial)
- **Future:** If images added later, use `object-fit: cover` and aspect-ratio container
- **For this change:** Not applicable (cards are text-only)

### Missing Published Date
- **Behavior:** Display "Fecha no disponible" in metadata line
- **Styling:** PT Mono 12px, italic

### Missing Reading Time
- **Behavior:** Calculate from word count via `reading-time` package
- **Fallback:** If content empty, display "1 min read"

### Empty Excerpt
- **Behavior:** Hide excerpt line, card height adjusts naturally
- **CSS:** `.blog-card__excerpt:empty { display: none; }`

### Category with Special Characters
- **Behavior:** Render as-is (no sanitization needed for display)
- **Uppercase transform:** CSS `text-transform: uppercase` handles display

---

## 7. Responsive Behavior

### Breakpoints
| Breakpoint | Width | Card Columns | Hero Padding | Card Padding |
|------------|-------|--------------|--------------|--------------|
| Mobile | < 768px | 1 (full width) | 24px | 24px 20px |
| Tablet | 768px - 1024px | 2 | 40px | 32px 28px |
| Desktop | > 1024px | 3 | 80px | 45px 35px |

### Mobile-Specific Adjustments
- Hero h1: 3rem → 1.8rem
- Card title: 24px → 18px (1.1rem)
- Card excerpt: 15px → 14px (0.9rem)
- Filter buttons: smaller padding (6px 12px)
- Search input: full width, stacked with button

---

## 8. File Inventory

### New Files
| File | Purpose |
|------|---------|
| `src/components/blog/BlogCard.astro` | Reusable blog card Astro component |
| `src/styles/blog-cards.css` | Shared blog card styles |

### Modified Files
| File | Changes |
|------|---------|
| `src/components/blog/BlogFilter.jsx` | Remove dangerouslySetInnerHTML, import blog-cards.css |
| `src/components/blog/BlogHeroSection.astro` | Refactor to CSS classes, use tokens |
| `src/components/blog/BlogCtaSection.astro` | Minimal (already functional) |
| `src/pages/blog/historia-pipod-bogota.astro` | Add article metadata header |

### Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `reading-time` | latest | Calculate reading time from content |

---

## 9. Acceptance Criteria

### AC1: Card Display
- [ ] BlogCard renders with white background, border-gray border, 24px radius
- [ ] Category label shows in PT Mono uppercase with deep-blue color
- [ ] Title clamps at 2 lines with ellipsis
- [ ] Excerpt clamps at 3 lines with ellipsis
- [ ] Metadata shows date + reading time in PT Mono 12px

### AC2: Typography Tokens
- [ ] Card title uses `--pipod-size-h3` (24px) and `--pipod-weight-bold` (700)
- [ ] Card body uses `--pipod-size-body` (15px) and `--pipod-weight-regular`
- [ ] Metadata uses `--pipod-font-pt-mono` at 12px
- [ ] Category uses `--pipod-tracking-wider` for letter-spacing

### AC3: Token Integration
- [ ] All colors reference `--pipod-color-*` tokens
- [ ] All spacing references `--pipod-space-*` tokens
- [ ] No hardcoded color values in blog-cards.css

### AC4: Hover States
- [ ] Card border changes from border-gray to black on hover
- [ ] Card shadow elevates from card to elevated on hover
- [ ] Card translates up 4px on hover
- [ ] CTA link arrow gap animates from 5px to 12px

### AC5: CSS Extraction
- [ ] BlogFilter.jsx no longer uses dangerouslySetInnerHTML
- [ ] blog-cards.css is imported/linked in BlogFilter.jsx
- [ ] Styles defined in blog-cards.css are consumed by both BlogCard.astro and BlogFilter.jsx

### AC6: Mobile Responsive
- [ ] Single column layout on mobile (< 768px)
- [ ] Hero h1 scales from 45px to 1.8rem
- [ ] Card padding reduces from 45px 35px to 24px 20px
- [ ] Filter buttons smaller on mobile

### AC7: No Regressions
- [ ] Blog listing page renders without console errors
- [ ] Search functionality filters cards correctly
- [ ] Category filter buttons toggle active state
- [ ] Empty state displays when no results match

### AC8: Build Success
- [ ] `npm run build` completes without errors
- [ ] All Astro components compile without warnings
- [ ] Reading-time package integrates correctly

### AC9: Article Page Metadata
- [ ] historia-pipod-bogota.astro displays category, title, and metadata line
- [ ] Metadata shows formatted date (DD MMM YYYY) + reading time

### AC10: Accessibility
- [ ] CTA link has visible focus state
- [ ] Filter buttons have adequate touch targets (min 44px)
- [ ] Color contrast meets WCAG AA for all text

---

## 10. Dependencies & Risks

### Dependencies
- `reading-time` npm package (install before coding)

### Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Bootstrap `.card` class collision | Medium | High | Use unique class names `.blog-card-*` (BEM naming) |
| CSS cascade from astro-ecommerce.scss | Medium | Medium | Use scoped classes; verify specificity |
| _tokens.css not imported in all contexts | Medium | Medium | Hardcode fallbacks matching token values as backup |
| React dangerouslySetInnerHTML removal breaks layout | Low | High | Test incrementally; keep original styles until new styles verified |

---

## 11. Out of Scope (Recovery Later)

- 73 SEO articles (stashed, recovered separately after this change)
- Dark mode support
- Backend/API changes
- Image support in cards (future enhancement)