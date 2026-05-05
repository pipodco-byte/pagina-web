# Tasks: tailwind-migration

## ⚠️ STATUS: ABANDONED - 2026-05-05

**Decision:** Tailwind v4 migration has been abandoned. All Tailwind v4 files have been removed.

See: `.atl/design/fix-visual-issues.md` for details.

---

## Phase 1: Setup (Foundation) - ✅ COMPLETE (BUT REVERTED)

- [x] 1.1 Install Tailwind CSS: `npx astro add tailwind` ✅ v4.2.4
- [x] 1.2 Import global.css in Layout.astro ✅ Added
- [x] 1.3 Configure `@theme` in global.css ✅ Bootstrap breakpoints + Pipod tokens
- [x] 1.4 Verify build passes ✅ Build successful

### Configuration Summary (global.css @theme)

```css
@theme {
  /* Bootstrap breakpoints: 576px, 768px, 992px, 1200px, 1400px */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1400px;

  /* Colors mapped to --pipod-color-* */
  --color-tech-blue: var(--pipod-color-tech-blue);
  --color-deep-blue: var(--pipod-color-deep-blue);
  /* ... all brand colors */

  /* Border Radius */
  --radius-standard: var(--pipod-radius-standard);  /* 24px */
  --radius-bento: var(--pipod-radius-large);         /* 40px */
  --radius-pill: var(--pipod-radius-pill);            /* 50px */

  /* Shadows */
  --shadow-pipod-card: var(--pipod-shadow-card);
  --shadow-pipod-elevated: var(--pipod-shadow-elevated);
}
```

## Phase 2: Grid Migration (Layout) - NOT STARTED (CANCELLED)

### Status: Navbar ALREADY CUSTOM - Footer needs migration

**Navbar (`pipodNavbar.css`):** ✅ Custom CSS - NO Bootstrap grid
- Uses custom `.container` class (styled with flexbox)
- All styles are pure custom CSS
- NO Bootstrap grid dependencies

**Footer (`pipodFooter.tsx`):** ⚠️ Uses Bootstrap grid classes

| Bootstrap Class | Usage in Footer |
|-----------------|-----------------|
| `.container` | Main footer wrapper (2x) |
| `.row` | Grid rows (2x) |
| `.col-lg-3` | Brand column, visit column |
| `.col-lg-2` | Nav columns (3x) |
| `.col-md-12`, `.col-md-4` | Nav columns |
| `.col-6`, `.col-12` | Mobile columns |
| `.mb-4`, `.gy-5` | Spacing utilities |
| `.mt-2`, `.mt-lg-0` | Margin utilities |
| `.text-center`, `.text-lg-start/end` | Text alignment |

### Step 2.1: Migrate Footer grid to CSS Grid/Tailwind

- [ ] Replace `.container` → `container mx-auto px-4`
- [ ] Replace `.row` → `flex flex-wrap gap-y-5` (or `grid`)
- [ ] Replace `.col-lg-3` → `lg:w-1/4`
- [ ] Replace `.col-lg-2` → `lg:w-1/6`
- [ ] Replace `.col-md-4` → `md:w-1/3`
- [ ] Replace `.col-6` → `w-1/2`
- [ ] Replace `.col-12` → `w-full`
- [ ] Remove Bootstrap grid classes

## Phase 3: UI Components (Migration)

- [ ] 3.1 Migrate Navbar: `.navbar` → custom CSS (already has `pipodNavbar.css`)
- [ ] 3.2 Migrate Footer: `.footer` → custom CSS (already has `pipodFooter.css`)
- [ ] 3.3 Migrate Cards: `.card` → custom CSS (already has `cardProduct.css`)
- [ ] 3.4 Migrate Buttons: `.btn` → Tailwind `p-btn-*` utilities
- [ ] 3.5 Migrate Badges: `.badge` → Tailwind `p-badge-*` utilities
- [ ] 3.6 Migrate Forms: `.form-control` → Tailwind form utilities
- [ ] 3.7 Test all interactive elements: forms, buttons, dropdowns

## Phase 4: Utility Classes (Cleanup)

- [ ] 4.1 Replace `.d-flex` → `p-flex`
- [ ] 4.2 Replace `.d-none` → `p-hidden`
- [ ] 4.3 Replace `.text-center` → `p-text-center`
- [ ] 4.4 Replace `.mt-*`, `.mb-*`, `.pt-*`, `.pb-*` → `p-mt-*`, etc.
- [ ] 4.5 Replace `.bg-*`, `.text-*` → Tailwind equivalents
- [ ] 4.6 Run full site visual QA

## Phase 5: Final Cleanup

- [ ] 5.1 Comment out SCSS imports in all 8 pages
- [ ] 5.2 Verify no SCSS references remain
- [ ] 5.3 Delete SCSS files (keep `_tokens.css`)
- [ ] 5.4 Measure CSS bundle size reduction
- [ ] 5.5 Run Lighthouse audit
- [ ] 5.6 Final visual regression test
- [ ] 5.7 Commit migration changes

## Implementation Order

1. **Phase 1 (Setup)** must complete before any migration
2. **Phase 2 (Grid)** is foundation - do next
3. **Phase 3 (Components)** - Can parallelize: Navbar, Footer, Cards can be migrated independently
4. **Phase 4 (Utilities)** - Batch replace remaining classes
5. **Phase 5 (Cleanup)** - Only after Phases 2-4 are verified