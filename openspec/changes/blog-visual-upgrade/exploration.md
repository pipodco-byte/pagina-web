# Exploration: Blog Visual Upgrade (Lexington Author-inspired)

> **Change**: `blog-visual-upgrade`
> **Date**: 2026-05-12
> **Context**: Adapt Lexington "Author" theme's editorial/typography-first visual style to Pipod's blog, without installing the full theme.

---

## 1. Current State

### 1.1 Pipod Design System (from ESTADO.md)

| Layer | Details |
|-------|---------|
| **Canvas** | Light-first: white (`#FFFFFF`) backgrounds, near-black (`#1F1F1F`) text |
| **Accents** | Tech Blue (`#4A90E2`) for CTAs/links, Deep Blue (`#3A506B`) for hover/secondary |
| **Surfaces** | Light Surface (`#F5F5F7`), Border Gray (`#E5E5E7`) |
| **Typography** | Inter (UI/headings, weights 300–700), PT Mono (labels), Noto Sans (body) |
| **Radius** | 8px (subtle), 24px (cards), 40px (bento), 50px (pills) |
| **Layout** | 1440px container, 80px horizontal padding |
| **Tokens** | `_tokens.css` exists with `--pipod-*` variables but is **NOT integrated** into any component |

### 1.2 Blog Architecture

```
pipod-blog.astro (listing page)
├── BlogHeroSection.astro   — centered header, gradient bg, search bar
├── BlogFilter.jsx          — React: search + filter pills + card grid (1 hardcoded post)
└── BlogCtaSection.astro    — dark CTA section

historia-pipod-bogota.astro (article page)
├── Layout.astro            — Bootstrap 5.3, Google Fonts, Google Analytics
├── Article body            — 397 lines, inline + scoped styles
└── BlogPostingSchema.astro — JSON-LD structured data
```

### 1.3 Current Component Analysis

#### BlogFilter.jsx — Card Component
- 367-line React component with `<style dangerouslySetInnerHTML>` (all inline CSS)
- **Card design**: White background (`#FFFFFF`), 1px `#E0E0E0` border, 24px radius, 45px×35px padding
- **No images** — pure text cards
- **Typography**: Category label (PT Mono, 10px, `#3A506B`, 2px letter-spacing, uppercase), Title (Inter 700, 22px), Excerpt (Inter, 15px, `#4C4C4C`), Link (Inter 800, 12px, 1px letter-spacing)
- **Hover**: Border goes black, shadow + translateY(-5px)
- **Filters**: Pill buttons (20px radius), `#3A506B` active state
- **Data**: 1 hardcoded post in array — no dynamic content source yet
- **Missing**: No reading time, no date display on cards, no image support

#### BlogHeroSection.astro — Blog Header
- 75 lines, all inline styles
- **Background**: `linear-gradient(135deg, #F5F5F7, #FFFFFF)`
- **Heading**: Uppercase "BLOG PIPOD" (Inter 800, 3rem)
- **Subtitle**: "Artículos, tips y guías..." (Inter, 1.25rem, `#666`)
- **Search**: Inline text input + black pill button with Bootstrap icon
- **Responsive**: Uses `is:global` style block with attribute selectors (`[style*="background: linear-gradient"]`) — fragile pattern

#### Article Page — historia-pipod-bogota.astro
- 397 lines including scoped `<style>` block (lines 158–397)
- **Header**: Centered, category + date meta line, Inter 800 title (3rem), excerpt
- **Body**: Noto Sans, 1.05rem, sections with h2/h3 headings
- **CTA**: `#F5F5F5` background, 48px padding, two buttons (blue primary, white secondary with black border)
- **Author footer**: Border-top separator, text-only author bio
- **Typography issues**: Title weight 800 (heavy for editorial), no `tracking-tighter` on headings

#### BlogCtaSection.astro
- 35 lines, black background (`#000`), white text
- Simple contact CTA — minimal impact on main upgrade

### 1.4 CSS Architecture (Problematic)

The blog has **three different style methodologies** mixed together:
1. **Scoped `<style>`** — article page (clean, but hardcoded values)
2. **Inline styles** — BlogHeroSection, BlogCtaSection (not maintainable, fragile responsive selectors)
3. **`dangerouslySetInnerHTML` in JSX** — BlogFilter (works but bloats component)

**CSS tokens (`_tokens.css`)** are imported in Layout.astro but **zero components reference the variables**.

---

## 2. Author Theme Patterns to Adapt

### What the Author Theme Does (dark-first)

| Pattern | Author Implementation | Pipod Adaptation |
|---------|----------------------|-----------------|
| Card overlays | `bg-black/90`, `group-hover:bg-accent-700/90` | **Skip** — contradicts light system |
| Reading time | `reading-time` npm package | **Adopt** — add metadata to cards |
| Metadata line | Date + Reading time in small text | **Adopt** — PT Mono, small, accent color |
| Card titles | Uppercase, `tracking-tighter` | **Adopt selectively** — uppercase for category labels only, tighter tracking for headings |
| Card images | `aspect-9/12` (blog), `aspect-square` (author) | **Adopt** — add image support for future, keep text-only cards for now |
| Typography | Light font-weight headings, uppercase, editorial proportions | **Adapt** — reduce heading weight (800→700, 700→600), add tracking control |
| Dark color system | Base-900, Base-400/300, Accent-700 | **Translate** — Pipod's `#1F1F1F` ≈ Base-900, `#3A506B` ≈ Accent-700 |

### Key Design Principle
> **Adapt editorial feel, don't copy dark theme.** Author's typography-first philosophy works on light backgrounds too. The goal is cleaner hierarchy, better metadata display, and typographic refinement — not dark overlays.

---

## 3. Affected Areas

| File | Why Affected | Change Type |
|------|-------------|-------------|
| `src/components/blog/BlogFilter.jsx` | Card design overhaul, metadata line, reading time | Major refactor |
| `src/components/blog/BlogHeroSection.astro` | Editorial header redesign, token integration | Moderate refactor |
| `src/pages/blog/historia-pipod-bogota.astro` | Typography refinement (weights, tracking) | Minor refinement |
| `src/pages/pipod-blog.astro` | Import new components, pass data | Minor wiring |
| `src/components/blog/BlogCtaSection.astro` | Token integration, typography alignment | Minor alignment |
| `src/styles/_tokens.css` | Token variables validated against blog usage | Reference check |
| `package.json` | Add `reading-time` dependency | New dependency |

**New files to create:**
- `src/components/blog/BlogCard.astro` — shared card component (text + future image support)
- Potentially `src/components/blog/BlogMetaLine.astro` — reusable metadata display (date + reading time)

**Not affected:**
- `src/layouts/Layout.astro` — blog pages use it as-is
- `src/components/SEO/BlogPostingSchema.astro` — no visual changes
- Other pages (home, tienda, contacto) — blog-specific change

---

## 4. Approaches

### Approach A: Minimal Typography Tune-Up
**Description**: Only adjust font weights, letter-spacing, and add reading-time metadata to existing card. No structural refactor.

| Pros | Cons |
|------|------|
| Very fast (1–2 hours) | Doesn't deliver editorial "feel" — just tweaks |
| Low risk | BlogFilter.jsx still a monolithic React component |
| No new components | Card data still hardcoded in React state |
| Easy to revert | Inline styles stay messy |

- **Effort**: **Low**

---

### Approach B: Editorial Visual Upgrade (RECOMMENDED)
**Description**: Extract card into Astro component, add metadata system, refine typography across all blog components, integrate CSS tokens.

| Pros | Cons |
|------|------|
| True editorial feel achieved | More files to change (5–7 files) |
| Clean component separation (BlogCard.astro) | New npm dependency (`reading-time`) |
| CSS token integration starts here | Need to convert React card logic to Astro component pattern |
| Image support built for future articles | ~Medium effort |
| Responsive styles cleaned up | |

- **Effort**: **Medium**

**Implementation outline:**
1. Create `BlogCard.astro` with:
   - Optional image slot (hidden when no image, `aspect-[3/4]` when present)
   - Category label (PT Mono, 10px, `#3A506B`, uppercase, 2px letter-spacing)
   - Title (Inter 700, 22px, `tracking-tighter`, `#1F1F1F`)
   - Metadata line: Date + Reading time (PT Mono, 12px, `#86868B`)
   - Excerpt (Noto Sans/Inter, 15px, `#4C4C4C`)
   - Read link ("LEER ARTÍCULO →")
   - White card, 24px radius, 1px `#E5E5E7` border, hover border `#1F1F1F` + subtle shadow + translateY(-4px)
2. Refactor `BlogFilter.jsx` to import and render `BlogCard.astro` (via Astro's slot pattern or as a JSX-compatible import)
3. Add `reading-time` package, compute reading time from article markdown
4. Refine `BlogHeroSection.astro`: convert inline styles to scoped `<style>`, use tokens, add editorial subtitle styling
5. Refine article page: reduce h1 weight to 700, reduce h2 weight to 600, add `tracking-tighter`
6. Align `BlogCtaSection.astro` with token variables
7. Verify responsive behavior at 768px breakpoint

---

### Approach C: Dark Card Overlay System
**Description**: Implement Author-style dark overlays on blog cards, ignoring Pipod's light design system.

| Pros | Cons |
|------|------|
| Closest visual match to Author theme | **Directly contradicts Pipod's design system** (light-first) |
| Dramatic visual impact | Creates jarring inconsistency with rest of site |
| | Cards would look out of place next to white bento grids on other pages |
| | High effort for 1 article |
| | No design system precedent for dark overlays |

- **Effort**: **High**

---

## 5. Recommendation

### ✅ Approach B: Editorial Visual Upgrade

**Why B over A**: Approach A adds metadata but doesn't solve the fundamental issues — monolithic React component, no reusable card, fragmented CSS, no editorial feel. It's a half-measure.

**Why B over C**: Approach C fights the design system. Pipod is a light-themed site. Dark overlays would be visually jarring. The editorial feel comes from typography, hierarchy, and metadata — not from dark backgrounds.

### Specific Design Decisions

| Decision | Rationale |
|----------|-----------|
| Card: white background, `#E5E5E7` border | Respects Pipod's light system |
| Card: `#1F1F1F` border on hover | Editorial emphasis without dark overlay |
| Metadata line: PT Mono, 12px, `#86868B` | Repurposes Author's "reading time" pattern in Pipod's font system |
| Category label: PT Mono, 10px, `#3A506B` | Already exists in current design — keep |
| Title: Inter 700, `tracking-tighter` | Lighter than current 800, tighter letter-spacing for editorial feel |
| Image: `aspect-[3/4]`, hidden when absent | Author uses 9/12 (≈3/4), future-proofs cards |
| `reading-time` package | Industry standard, used by Author theme |
| CSS tokens: `var(--pipod-*)` | Starts token integration, consistent with system |

---

## 6. Risks

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **React→Astro component conversion complexity** | Medium | BlogFilter renders cards dynamically — Astro components don't hydrate in React without `client:load`. Consider keeping card rendering in React but extracting card STYLES to shared CSS. Alternative: use `astro:jsx` or render card as Astro island with `client:visible`. |
| **`_tokens.css` not yet validated** | Medium | Tokens are labeled "Reference file only — NOT yet integrated". Blog components would be first to use them. Test each `var()` fallback. Tokens appear complete and correct — low risk of missing variables. |
| **SCSS conflict with new styles** | Low | `astro-ecommerce.scss` is imported on blog page. Verify no `.card` or `.blog-card-*` rules conflict. The SCSS file likely contains Bootstrap overrides — test for cascade issues. |
| **Bootstrap interference** | Low | Layout.astro loads Bootstrap 5.3. Bootstrap `.card` class may style blog cards unexpectedly. Use unique class names (e.g., `.blog-card-editorial`). |
| **Single article makes card layout sparse** | Low | Only 1 card in the grid currently. Design for future density but accept current sparseness. Card grid handles 1 column gracefully. |
| **Font weight load** | Low | Layout.astro loads Inter weights: 300, 400, 600, 700. No weight 500. Using 600 for "medium" headings is acceptable. 700 and 600 are sufficient for all blog needs. |
| **`reading-time` expects markdown/HTML string** | Low | Need to pass article content to the package. For BlogFilter's hardcoded post, compute from excerpt. For future dynamic posts, compute from full markdown content. |

---

## 7. Draft Component Signature: BlogCard.astro

```astro
---
// src/components/blog/BlogCard.astro
export interface Props {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;  // e.g. "4 min de lectura"
  href: string;
  imageSrc?: string;     // Optional, for future
  imageAlt?: string;
}
const { title, excerpt, category, date, readingTime, href, imageSrc, imageAlt } = Astro.props;
---

<article class="blog-card-editorial">
  {imageSrc && (
    <div class="card-image">
      <img src={imageSrc} alt={imageAlt || title} loading="lazy" />
    </div>
  )}
  <div class="card-body">
    <span class="card-category">{category}</span>
    <h3 class="card-title"><a href={href}>{title}</a></h3>
    <div class="card-meta">
      <time datetime={date}>{date}</time>
      <span class="meta-separator">·</span>
      <span>{readingTime}</span>
    </div>
    <p class="card-excerpt">{excerpt}</p>
    <a href={href} class="card-link">LEER ARTÍCULO →</a>
  </div>
</article>

<style>
  .blog-card-editorial {
    background: var(--pipod-color-white, #FFFFFF);
    border: 1px solid var(--pipod-color-border-gray, #E5E5E7);
    border-radius: var(--pipod-radius-standard, 24px);
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }
  .blog-card-editorial:hover {
    border-color: var(--pipod-color-near-black, #1F1F1F);
    box-shadow: var(--pipod-shadow-elevated, 0 8px 24px rgba(0,0,0,0.1));
    transform: translateY(-4px);
  }
  .card-image {
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-body {
    padding: 28px 24px;
  }
  .card-category {
    font-family: var(--pipod-font-pt-mono, 'PT Mono', monospace);
    font-size: var(--pipod-size-label, 0.7rem);
    color: var(--pipod-color-deep-blue, #3A506B);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    display: block;
    margin-bottom: 12px;
  }
  .card-title {
    font-family: var(--pipod-font-inter, 'Inter', sans-serif);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: var(--pipod-tracking-tight, -0.02em);
    line-height: var(--pipod-leading-snug, 1.25);
    margin: 0 0 10px 0;
  }
  .card-title a {
    color: var(--pipod-color-near-black, #1F1F1F);
    text-decoration: none;
  }
  .card-meta {
    font-family: var(--pipod-font-pt-mono, 'PT Mono', monospace);
    font-size: 0.75rem;
    color: #86868B;
    margin-bottom: 16px;
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .meta-separator {
    color: #C0C0C0;
  }
  .card-excerpt {
    font-family: var(--pipod-font-inter, 'Inter'), sans-serif;
    font-size: 0.9rem;
    color: #4C4C4C;
    line-height: 1.6;
    margin: 0 0 20px 0;
  }
  .card-link {
    font-family: var(--pipod-font-inter, 'Inter'), sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--pipod-color-near-black, #1F1F1F);
    text-decoration: none;
    transition: letter-spacing 0.3s ease;
  }
  .card-link:hover {
    letter-spacing: 2px;
  }
</style>
```

---

## 8. Open Questions for sdd-propose

1. **React→Astro component handoff**: Should BlogCard be an Astro component rendered inside BlogFilter.jsx (requiring `client:load` wrapper), or should we extract card rendering OUT of React into a pure Astro layout?
2. **Article image sourcing**: For future article images — local `/public` files, or external CDN? This affects `imageSrc` prop design.
3. **Reading time computation**: Should reading time be pre-computed at build time (in frontmatter) or computed dynamically? For a static site, build-time is better.
4. **BlogFilter architecture**: With only 1 post, BlogFilter's search/filter React overhead may not justify itself. Consider simplifying to pure Astro until content volume grows.

---

## 9. Summary

| Field | Value |
|-------|-------|
| **Current blog design** | Basic white cards, centered layout, no metadata beyond category |
| **Target editorial feel** | Typography-first, metadata-rich (date + reading time), refined heading hierarchy, token-integrated CSS |
| **Recommended approach** | Editorial Visual Upgrade (Approach B) — new BlogCard component, typography refinement, CSS token integration |
| **Primary risk** | React/Astro component boundary complexity for card rendering |
| **Effort** | Medium (5–7 files, 1 new component, 1 new npm dependency) |
| **Ready for proposal** | Yes |
