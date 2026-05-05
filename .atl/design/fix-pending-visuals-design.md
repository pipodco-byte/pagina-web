# Design: fix-pending-visuals

## Changes

| File | Line | Change |
|------|------|--------|
| `Layout.astro` | 86-88 | Add `html * { font-smoothing }` in `<style is:global>` |
| `_pipod-utilities.css` | 88-92 | Add `border-radius: 50px` and shadow to `.btn.btn-dark` |
| `pipodNavbar.css` | 60 | Change `font-weight: 500` to `font-weight: 600` |
| `productOverviewGrid.tsx` | 72 | Add `font-weight: 700` to h2 className |

## Testing
- Dev: http://localhost:4321
- Pages: /producto/airpods-pro, /terminos-condiciones-pipod
- Build: npm run build