# Design: Legacy CSS Cleanup

## Technical Approach

Replace the monolithic `assets/scss/astro-ecommerce.scss` ecosystem with a lightweight CSS utilities file. The replacement will be a single `src/styles/_pipod-utilities.css` file (~80 lines) containing:

1. **Design tokens** referencing existing `--pipod-*` variables from `_tokens.css`
2. **Utility classes** for buttons, shadows, gradients
3. **Component overrides** for legacy class names

The CSS will be imported globally in `Layout.astro`, and SCSS imports will be commented out page-by-page.

### Why This Approach

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Tailwind config | Requires rewrite, learning curve | Rejected |
| CSS-in-JS | Runtime overhead, no SSR | Rejected |
| Single CSS file | Simple, zero deps, fast | **Selected** |

## Architecture Decisions

### Decision: Token Strategy

**Choice**: Reference existing `--pipod-*` tokens from `_tokens.css`
**Rationale**: Maintains design system consistency; `_tokens.css` already exists with brand colors and spacing

### Decision: File Location

**Choice**: `src/styles/_pipod-utilities.css` (underscore prefix signals partial)
**Rationale**: Colocates with existing `_tokens.css`; signals "not a standalone stylesheet"

## File Structure

```
src/
  styles/
    _tokens.css          (existing - design tokens)
    _pipod-utilities.css (NEW - replacement utilities)
```

## CSS Architecture

```css
/* ===== DESIGN TOKENS (reference only) ===== */
/* Uses var(--pipod-*) from _tokens.css */

/* ===== UTILITY CLASSES ===== */
/* .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl */

/* ===== BUTTON SYSTEM ===== */
/* .btn, .btn-dark, .btn-white + states */

/* ===== GRADIENTS ===== */
/* .bg-gradient-dark, .bg-gradient-blue, .text-gradient */

/* ===== COMPONENT OVERRIDES ===== */
/* Legacy class names (e.g., for navbar, cards) */
```

## Migration Strategy

1. **Create** `src/styles/_pipod-utilities.css`
2. **Add import** to `src/layouts/Layout.astro`:
   ```astro
   import '../styles/_pipod-utilities.css';
   ```
3. **Comment SCSS** in each of 8 pages:
   ```scss
   /* // @import '../../assets/scss/astro-ecommerce.scss'; */
   ```

### Pages to Update (8)
| Page | File |
|------|------|
| Homepage | `src/pages/index.astro` |
| Product | `src/pages/producto/[slug].astro` |
| Service | `src/pages/servicio-tecnico-apple.astro` |
| Accounting | `src/pages/contabilidad.astro` |
| Cart | `src/pages/shopping-cart.astro` |
| Checkout | `src/pages/checkout.astro` |
| Success | `src/pages/success.astro` |
| Retoma | `src/pages/retoma.astro` |

## Rollback Plan

```bash
# 1. Remove CSS import from Layout.astro
# 2. Uncomment SCSS imports in all 8 pages
# 3. If files deleted: git checkout HEAD~1 -- assets/scss/ assets/js/
```

## Testing Strategy

| Check | Method |
|-------|--------|
| Build passes | `npm run build` |
| No SCSS warnings | Inspect build output |
| Buttons functional | Manual hover/click |
| Gradients visible | Visual check navbar, hero |
| Shadows on cards | Visual check checkout, product |
| Mobile responsive | DevTools viewport test |

## Open Questions

- [ ] Does `success.astro` exist at that path? (proposal lists `success.astro`, glob shows `checkout-success.astro`)
