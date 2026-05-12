# Tasks: blog-visual-upgrade

> **Change**: `blog-visual-upgrade`
> **Phase**: tasks
> **Generated**: 2026-05-12

---

## Task Checklist

### Task 1: Install `reading-time` npm package
- [x] Run `npm install reading-time` in `/Users/calderonjosue_/Astro-Ecommerce`
- [x] Verify `reading-time` appears in `package.json` dependencies
- [x] Verify no peer dependency conflicts

**Verification**: `npm list reading-time` shows version; `npm run build` succeeds.

---

### Task 2: Create `src/styles/blog-cards.css` with shared card styles using Pipod tokens
- [x] Create file `/Users/calderonjosue_/Astro-Ecommerce/src/styles/blog-cards.css`
- [x] Define `.blog-card-editorial` — white background, `1px solid var(--pipod-color-border-gray)` border, `var(--pipod-radius-standard)` (24px) radius, `var(--pipod-shadow-card)` shadow
- [x] Define `.blog-card-editorial:hover` — border changes to `var(--pipod-color-near-black)`, `var(--pipod-shadow-hover)`, `translateY(-4px)`
- [x] Define `.card-body` — `padding: 28px 24px`, `display: flex`, `flex-direction: column`, `height: 100%`
- [x] Define `.card-category` — `var(--pipod-font-pt-mono)`, `var(--pipod-size-label)` (10px), `var(--pipod-color-deep-blue)`, `uppercase`, `var(--pipod-tracking-wider)` (2px), `var(--pipod-weight-bold)` (700), `letter-spacing: 2px`
- [x] Define `.card-title` — `var(--pipod-font-inter)`, `var(--pipod-weight-bold)` (700), `var(--pipod-size-h3)` (1.25rem), `var(--pipod-leading-snug)` (1.25), `var(--pipod-tracking-tight)` (-0.02em), `var(--pipod-color-black)`
- [x] Define `.card-meta` — `var(--pipod-font-pt-mono)`, `12px`, `var(--pipod-color-disabled)` (#86868B), `margin: 12px 0`
- [x] Define `.card-excerpt` — `var(--pipod-font-inter)`, `var(--pipod-size-body)` (0.9rem), `var(--pipod-leading-relaxed)` (1.6), `var(--pipod-color-near-black)`
- [x] Define `.card-link` — `var(--pipod-weight-bold)` (700), `12px`, `var(--pipod-color-black)`, `uppercase`, `letter-spacing: 1px`, `display: inline-flex`, `align-items: center`, `gap: 5px`, `margin-top: auto`
- [x] Define `.card-link:hover` — `gap: 12px` (arrow moves right)
- [x] Add responsive styles for mobile (`max-width: 768px`): reduce padding to `24px 20px`, title to `1.1rem`, excerpt to `0.9rem`
- [x] Ensure all `var()` references include hardcoded fallbacks (for robustness)

**Verification**: File exists at `src/styles/blog-cards.css`; build succeeds; cards render with correct styles.

---

### Task 3: Create `src/components/blog/BlogCard.astro` — standalone Astro card component
- [x] Create file `/Users/calderonjosue_/Astro-Ecommerce/src/components/blog/BlogCard.astro`
- [x] Define props interface: `title`, `excerpt`, `category`, `date` (formatted string), `readingTime` (e.g., "4 min de lectura"), `href`, `imageSrc?`, `imageAlt?`
- [x] Import `../styles/blog-cards.css` via `<style>` (scoped to component)
- [x] Implement card markup with `.blog-card-editorial` wrapper
- [x] Implement conditional image slot: render `<img>` only when `imageSrc` is truthy; use `aspect-ratio: 3/4`; hide gracefully when absent
- [x] Implement metadata line: `{date} · {readingTime}` in `.card-meta`
- [x] Implement hover animation via CSS (no JavaScript needed)
- [x] Use `var(--pipod-*)` tokens throughout with hardcoded fallbacks

**Verification**: Component renders standalone in dev mode; all prop variations work (with/without image).

---

### Task 4: Update `src/components/blog/BlogFilter.jsx` to use blog-cards.css classes
- [x] Add `date` and `readingTime` fields to the hardcoded `posts` array in `BlogFilter.jsx`
  - [x] `date`: format as `DD MMM YYYY` in Spanish (e.g., "12 Mayo 2026")
  - [x] `readingTime`: compute using `reading-time` package from Spanish body text (≈200 words → "~2 min de lectura")
- [x] Remove `dangerouslySetInnerHTML` `<style>` block
- [x] Import blog card styles: add `<link>` tag or inject styles via Astro's CSS integration — since this is a React component, use a plain `<style>` tag injected via `dangerouslySetInnerHTML` that points to `blog-cards.css` classes, OR add the card classes to `blog-cards.css` itself and ensure the stylesheet loads globally
- [x] Update card JSX: replace `.blog-card-white` → `.blog-card-editorial`, `.card-body-white` → `.card-body`, `.card-cat` → `.card-category`, `.card-t` → `.card-title`, `.card-p` → `.card-excerpt`, `.card-link-premium` → `.card-link`
- [x] Add metadata line markup: `<span className="card-meta">{post.date} · {post.readingTime}</span>` between title and excerpt
- [x] Verify search and category filter still work after refactor

**Verification**: Blog listing shows date + reading time metadata on cards; search and filter function correctly.

---

### Task 5: Update `src/components/blog/BlogHeroSection.astro` with editorial typography
- [x] Replace inline `style` attributes on `<section>` with scoped `<style>` block
- [x] Convert background gradient to `var(--pipod-gradient-secondary)` or token-based values
- [x] Update hero `<h1>`: weight `800` → `700` using `var(--pipod-weight-bold)`, add `var(--pipod-tracking-tight)` (-0.02em)
- [x] Update hero `<p>`: use `var(--pipod-size-body)` and `var(--pipod-leading-relaxed)`
- [x] Update search input and button inline styles to use tokens (padding, border-radius, font)
- [x] Keep `is:global` `<style>` for responsive overrides at `768px`
- [x] Update `filterBlogPosts` selector if card class names changed from `.blog-card-white`

**Verification**: Hero renders with editorial typography; responsive styles work at 768px.

---

### Task 6: Update `src/components/blog/BlogCtaSection.astro` if needed
- [x] Review `BlogCtaSection.astro` for inline styles
- [x] Convert `background: #000000` → `var(--pipod-color-black)` or token equivalent
- [x] Convert text colors to token values where applicable
- [x] Use `var(--pipod-weight-semibold)` (600) for h2, matching typography hierarchy
- [x] Keep `is:global` `<style>` for responsive overrides
- [x] If no changes needed, mark as verified and unchanged

**Verification**: CTA section renders correctly; no visual regressions.

---

### Task 7: Import `blog-cards.css` in Layout.astro (if not auto-loaded)
- [x] Check if `pipod-blog.astro` page already imports `blog-cards.css` via a child Layout
- [x] If not already imported, add `import '../styles/blog-cards.css'` to `Layout.astro`
- [x] Verify `_tokens.css` is imported (Layout.astro line 11 confirms it is)

**Verification**: `npm run build` succeeds; no missing CSS warnings; blog cards render correctly.

---

### Task 8: Test on Vercel deployment
- [ ] Run `npm run build` locally and verify no errors
- [ ] Deploy to Vercel (via `vercel --prod` or Git push trigger)
- [ ] Open blog page (`/pipod-blog`) and verify:
  - [ ] Hero section renders with editorial typography
  - [ ] Blog cards show date + reading time metadata line
  - [ ] Cards have correct styling (white background, border, hover effects)
  - [ ] Category label in PT Mono uppercase
  - [ ] Search and filter work
  - [ ] CTA section renders correctly
- [ ] Test responsive at mobile (<480px) and tablet (768px)
- [ ] Verify no Bootstrap `.card` class interference

**Verification**: All checks pass on live Vercel URL; no console errors.

---

## Dependencies

| Task | Depends On |
|------|-----------|
| Task 2 | — |
| Task 3 | Task 2 |
| Task 4 | Task 1, Task 2 |
| Task 5 | — |
| Task 6 | — |
| Task 7 | Task 2 |
| Task 8 | Tasks 1–7 |

---

## Risk Mitigation Notes

- **CSS cascade**: `.blog-card-editorial` wrapper avoids Bootstrap `.card` collision
- **Token fallbacks**: All `var()` calls include hardcoded fallbacks
- **React HMR**: CSS extraction doesn't affect React rendering logic
- **reading-time**: Computed from actual body text, not just excerpt

---

## Success Criteria Coverage

| Criterion | Tasks |
|-----------|-------|
| Card metadata (date + reading time) | Task 3, Task 4 |
| Editorial typography (tracking, weights) | Task 2, Task 5 |
| CSS token integration (80%+) | Task 2, Task 5, Task 6 |
| No dangerouslySetInnerHTML styles in BlogFilter | Task 4 |
| Responsive parity | Task 2 (media queries), Task 5, Task 8 |
| No Bootstrap interference | Task 2 (unique class names), Task 8 |
| BlogCard.astro standalone | Task 3 |
| No visual regressions | Task 5, Task 6, Task 8 |
| Build succeeds | Task 1, Task 8 |
