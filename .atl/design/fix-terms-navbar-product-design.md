# Design: fix-terms-navbar-product

## Changes

| File | Line | Change |
|------|------|--------|
| `pipodNavbar.css` | 60 | `font-weight: 600` → `font-weight: 500` |
| `TermsPage.astro` | 128 | Add `box-shadow` to `.terms-sidebar` |
| `TermsPage.astro` | 302 | Add `box-shadow` to `.widget` |
| `producto/[slug].astro` | 52 | Add `background: #ffffff` to main style |
| `productOverviewGrid.tsx` | 126 | Replace hardcoded text with `{full_description}` |

## Testing
- Dev: http://localhost:4321
- Pages: /terminos-condiciones-pipod, /producto/iphone-15-pro-max
- Build: npm run build