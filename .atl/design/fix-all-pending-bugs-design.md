# Design: fix-all-pending-bugs

## Changes

### 1. productOverviewGrid.tsx - Quitar borde
```tsx
// Antes:
<div className="card card-product card-plain">
// Después:
<div style={{ border: 'none' }}>
```

### 2. TermsPage.astro - Sidebar background
```css
.terms-sidebar {
  background: #FFFFFF;
}
.sidebar-title {
  background: #F5F5F7;
  margin: -20px -20px 20px -20px;
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
}
```

### 3. cartStore.ts - Hydration fix
```ts
// Antes (problemático):
const isBrowser = typeof window !== 'undefined';
const initialCart = isBrowser ? JSON.parse(localStorage.getItem('pipod-cart') || '[]') : [];
export const cartItems = atom<CartItem[]>(initialCart);

// Después (correcto):
export const cartItems = atom<CartItem[]>([]); // Siempre vacío inicialmente

// En AppWrapper o componente que usa el store:
useEffect(() => {
  // Solo leer localStorage post-hydration
  const saved = localStorage.getItem('pipod-cart');
  if (saved) cartItems.set(JSON.parse(saved));
}, []);
```

## Testing
- Dev: http://localhost:4321
- Pages: /producto/iphone-15-pro-max, /terminos-condiciones-pipod, /
- Build: npm run build

## Documentación Relacionada
- Ver `.atl/design/fix-visual-issues.md` para historial completo de fixes visuales
- Ver `.atl/design/fix-terms-navbar-product-design.md` para cambios de navbar y terms
- Commit `52a24a1` resume todos los fixes de bugs aplicados