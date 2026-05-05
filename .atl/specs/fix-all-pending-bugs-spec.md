# Spec: fix-all-pending-bugs

## UI/Producto
### Requirement: Card border
`productOverviewGrid` NO debe tener borde de Bootstrap `.card`

## UI/Terms
### Requirement: Sidebar background
`.terms-sidebar` background #FFFFFF con `.sidebar-title` en #F5F5F7

## Behavior/CartStore
### Requirement: Consistent hydration
`cartItems` debe inicializar con `[]` tanto en server como client initially. localStorage sync debe ocurrir post-hydration usando useEffect.