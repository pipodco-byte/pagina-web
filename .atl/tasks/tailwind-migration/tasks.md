# Tasks: tailwind-migration

## Phase 1: Setup (Foundation)

- [ ] 1.1 Install Tailwind CSS: `npx astro add tailwind`
- [ ] 1.2 Create `tailwind.config.mjs` with `p-` prefix
- [ ] 1.3 Configure Bootstrap-compatible breakpoints (576px, 768px, 992px, 1200px)
- [ ] 1.4 Map `--pipod-*` CSS tokens to Tailwind theme
- [ ] 1.5 Create `src/styles/global.css` with Tailwind directives
- [ ] 1.6 Verify build passes: `npm run build`

## Phase 2: Grid Migration (Layout)

- [ ] 2.1 Identify all `.container` usages → replace with Tailwind container
- [ ] 2.2 Identify all `.row` usages → replace with `p-flex p-flex-wrap`
- [ ] 2.3 Identify all `.col-*` usages → replace with width utilities
- [ ] 2.4 Identify all `.g-*`, `.gy-*`, `.gx-*` usages → replace with `p-gap-*`
- [ ] 2.5 Test grid layout on: Homepage, Tienda, producto page
- [ ] 2.6 Visual QA: Compare grid with production

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