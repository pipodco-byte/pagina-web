# Proposal: fix-all-pending-bugs

## Intent
Resolver 4 bugs visuales pendientes del SCSS removal y hydration error.

## Scope
1. producto/[slug] - borde del card
2. Terms sidebar - background incorrecto
3. cartStore - hydration error por localStorage
4. /tienda - pendiente (sin details)

## Approach
CSS fixes + cartStore initialization fix.

## Files
| File | Change |
|------|--------|
| `productOverviewGrid.tsx` | Quitar .card class o agregar border:none |
| `TermsPage.astro` | Sidebar background blanco |
| `cartStore.ts` | Inicializar cart igual en server y client |

## Risks
- cartStore fix debe mantener localStorage sync
- /tienda pendiente feedback

## Success
- [ ] Producto sin borde
- [ ] Terms sidebar con bg correcto
- [ ] Sin hydration errors en stats