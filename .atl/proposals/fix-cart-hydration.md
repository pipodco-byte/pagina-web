# Proposal: Fix CartContext Hydration Error

## Change: `fix-cart-hydration`
## Project: Astro-Ecommerce (pipod.co)
## Date: 2026-05-04
## Status: COMPLETED

---

# 1. Resumen Ejecutivo

**Problema:** Error "useCart must be used within a CartProvider" causado por islands React aisladas en Astro. `RootProvider` y `PipodNavbar` eran islands separadas que no compartían el contexto de `CartProvider`.

**Solución:** Implementar Nano Stores como estado global framework-agnostic que permite comunicación entre islands React en Astro.

---

# 2. Análisis del Problema

## Estructura Anterior (Problemática)

```
Layout.astro
├── <RootProvider client:load>  ← ISLA 1 (CartProvider)
│   <slot /> (HTML estático)
</RootProvider>
└── <PipodNavbar client:load />  ← ISLA 2 (aislada, sin CartProvider!)
```

## Por Qué Ocurría

1. `RootProvider` tenía `client:load` → isla React con CartProvider
2. `PipodNavbar` tenía `client:load` → isla React SEPARADA
3. PipodNavbar llamaba `useCart()` pero NO estaba dentro de CartProvider
4. Error: "useCart must be used within a CartProvider"

---

# 3. Solución Implementada

## Nano Stores (Framework-Agnostic)

Usamos Nano Stores como puente de comunicación entre islands. El store es puro JavaScript/TypeScript y no depende de React.

### Arquitectura Final

```
┌─────────────────────────────────────────────────────┐
│              NANO STORES (Framework-agnostic)        │
│  cartItems (atom)         isCartOpen (atom)         │
│  itemCount (computed)     cartTotal (computed)       │
└─────────────────────────────────────────────────────┘
         ↑ reads/writes          ↑ reads
┌──────────────────┐     ┌──────────────────────────┐
│   AppWrapper     │     │    CardProduct           │
│   (React)        │     │    (React island)        │
│   - Navbar       │     │    - addItem()          │
│   - CartDrawer   │     │    - showToast()        │
└──────────────────┘     └──────────────────────────┘
```

---

# 4. Archivos Creados/Modificados

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/store/cartStore.ts` | Modificado | Enhanced con computed values e isCartOpen |
| `src/hooks/useCartStore.ts` | Crear | Hook React para usar el store |
| `src/components/AppWrapper.tsx` | Modificado | Removido CartProvider, usa nanostores |
| `src/components/cart/CartDrawer.tsx` | Modificado | Usa useCartStore hook |
| `src/components/pipodNavbar.tsx` | Modificado | Usa useCartStore hook |
| `src/components/products/cardProduct.tsx` | Modificado | Usa addItem directo del store |
| `src/context/CartContext.tsx` | Eliminado | Reemplazado por nanostores |
| `src/components/CartProviderWrapper.tsx` | Eliminado | Ya no necesario |

---

# 5. Verificación

| Paso | Acción | Resultado |
|------|--------|----------|
| 1 | Homepage carga sin errores useCart | ✅ PASS |
| 2 | Navbar renderiza con icono de carrito | ✅ PASS |
| 3 | Cart state es reactivo via nanostores | ✅ PASS |
| 4 | Tienda carga sin errores | ✅ PASS |
| 5 | Servicio técnico carga sin errores | ✅ PASS |
| 6 | Contacto carga sin errores | ✅ PASS |

---

# 6. Riesgos

| Riesgo | Likelihood | Mitigation |
|--------|------------|------------|
| SSR hydration issues | LOW | `isBrowser` guard ya existía en store |
| Breaking changes en producción | LOW | Build exitoso, todos los pages 200 OK |

---

# 7. Rollback

```bash
git checkout HEAD -- \
  src/store/cartStore.ts \
  src/hooks/useCartStore.ts \
  src/components/AppWrapper.tsx \
  src/components/cart/CartDrawer.tsx \
  src/components/pipodNavbar.tsx \
  src/components/products/cardProduct.tsx
```

---

*Proposal completed: 2026-05-04*