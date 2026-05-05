# Proposal: fix-pending-visuals

## Intent
Restaurar estilos visuales pendientes después de remover SCSS.

## Scope
1. Font-smoothing global en Layout.astro
2. Button pill shape + shadow en _pipod-utilities.css
3. Navbar font-weight 500→600 en pipodNavbar.css
4. h2 product title weight en productOverviewGrid.tsx

## Approach
CSS-only fixes en 4 archivos.

## Files
| File | Change |
|------|--------|
| `Layout.astro` | Add font-smoothing global |
| `_pipod-utilities.css` | Add .btn.btn-dark pill + shadow |
| `pipodNavbar.css` | Change nav-item font-weight 500→600 |
| `productOverviewGrid.tsx` | Add font-weight 700 to h2 title |

## Risks
Low - cosmetic only.

## Success
- [ ] Font-smoothing en toda la página
- [ ] Botones con shape pill y shadow
- [ ] Navbar nav-items más bold (600)
- [ ] Product title h2 con weight 700