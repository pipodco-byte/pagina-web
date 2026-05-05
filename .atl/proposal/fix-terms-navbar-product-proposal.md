# Proposal: fix-terms-navbar-product

## Intent
Restaurar estilos visuales pendientes - navbar, terms sidebar/widgets, producto background.

## Scope
1. Navbar: font-weight 600→500
2. Terms sidebar: box-shadow
3. Terms widgets: box-shadow
4. Producto: background white + usar full_description

## Out of Scope
- /tienda (pendiente feedback usuario)

## Approach
CSS-only fixes.

## Files
| File | Change |
|------|--------|
| `pipodNavbar.css` | nav-item weight 600→500 |
| `TermsPage.astro` | sidebar/widgets box-shadow |
| `producto/[slug].astro` | main background white |
| `productOverviewGrid.tsx` | usar full_description |

## Success
- [ ] Navbar fuente menos bold
- [ ] Terms sidebar/widgets con shadow
- [ ] Producto fondo blanco