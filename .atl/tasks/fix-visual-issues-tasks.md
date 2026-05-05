# Tasks: fix-visual-issues

## Phase 1: CSS Fixes (Low Risk)

- [ ] 1.1 Add `.badge.filter:hover` and `.badge.filter.active` states to `src/components/products/cardProduct.css` (lines 189-196 already have base styles)
- [ ] 1.2 Add `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` to `.navbar.fixed-top` in `src/layouts/Layout.astro`
- [ ] 1.3 Add typography scale (h1-h6) to `src/styles/_pipod-utilities.css`

## Phase 2: Verification Pages

- [ ] 2.1 Test `/home` - color swatches hover/active states
- [ ] 2.2 Test `/tienda-pipod` - color swatches and h1 typography
- [ ] 2.3 Test `/servicio-tecnico-apple` - navbar shadow, hero typography
- [ ] 2.4 Test `/contacto-pipod` - FAQ section background
- [ ] 2.5 Test `/pipod-blog` - hero typography

## Phase 3: Vercel Deploy & Visual QA

- [ ] 3.1 Commit changes to `develop`
- [ ] 3.2 Verify Vercel preview loads correctly
- [ ] 3.3 Visual QA: compare each page against original

## Phase 4: Cleanup (if needed)

- [ ] 4.1 If visual issues remain, restore SCSS import on problematic pages only
- [ ] 4.2 Document any remaining visual deltas

## Implementation Order

1. CSS fixes first (1.1-1.3) - no risk, additive
2. Dev server test - verify pages still load 200
3. Commit and push to develop
4. Vercel preview - full visual QA
5. If issues found, selective SCSS restore

## Risks

- **Low**: CSS-only changes, no logic modified
- **Medium**: Typography changes may cascade unexpectedly - test all hero sections