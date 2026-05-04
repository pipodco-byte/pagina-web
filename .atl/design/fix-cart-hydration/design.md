# Design: fix-cart-hydration

## Technical Approach

Replace React Context (which doesn't work across Astro islands) with Nano Stores for framework-agnostic state management that works across React islands.

---

## Architecture Decisions

### Decision: Nano Stores over React Context

**Choice**: Nano Stores (`nanostores` + `@nanostores/react`)
**Alternatives considered**:
- React Context with single island (defeats Astro's partial hydration)
- Zustand (larger bundle, more React-centric)
- URL params/localStorage only (no reactivity)

**Rationale**: Nano Stores are framework-agnostic (~1KB), work across Astro islands, and integrate well with React via `@nanostores/react`.

### Decision: Computed Values for itemCount and cartTotal

**Choice**: Use `computed()` from nanostores
**Rationale**: Reactive derivation - components only re-render when derived values actually change.

### Decision: Keep Store Functions as Direct Calls

**Choice**: Mutations (`addItem`, `removeItem`, etc.) are direct function calls, not wrapped in atoms
**Rationale**: Only atoms trigger re-renders. Calling `addItem()` updates `cartItems` atom, which triggers computed updates automatically.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/store/cartStore.ts` | Modify | Added `isCartOpen` atom, `computed` values, drawer controls |
| `src/hooks/useCartStore.ts` | Create | React hook wrapping store atoms |
| `src/components/AppWrapper.tsx` | Modify | Remove `CartProvider`, use nanostores |
| `src/components/cart/CartDrawer.tsx` | Modify | Use `useCartStore` hook |
| `src/components/pipodNavbar.tsx` | Modify | Use `useCartStore` hook |
| `src/components/products/cardProduct.tsx` | Modify | Use `addItem` directly from store |
| `src/context/CartContext.tsx` | Delete | Replaced by nanostores |
| `src/components/CartProviderWrapper.tsx` | Delete | No longer needed |

---

## Data Flow

```
┌─────────────────────────────────────────────────────┐
│              NANO STORES                             │
│  cartItems (atom) ←── addItem(), removeItem()       │
│       ↓                                              │
│  itemCount (computed) → Navbar badge                 │
│  cartTotal (computed) → CartDrawer total             │
│  isCartOpen (atom) ←── openCart(), closeCart()      │
└─────────────────────────────────────────────────────┘
         ↓ reads          ↓ writes
┌──────────────────┐     ┌──────────────────────────┐
│   AppWrapper     │     │    CardProduct           │
│   - PipodNavbar │     │    - calls addItem()    │
│   - CartDrawer   │     └──────────────────────────┘
└──────────────────┘
```

---

## Implementation Details

### cartStore.ts

```typescript
import { atom, computed } from 'nanostores';

export type CartItem = {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  thumb_src: string;
  slug: string;
};

const isBrowser = typeof window !== 'undefined';
const initialCart = isBrowser ? JSON.parse(localStorage.getItem('pipod-cart') || '[]') : [];

export const cartItems = atom<CartItem[]>(initialCart);
export const isCartOpen = atom(false);

cartItems.listen((items) => {
  if (isBrowser) {
    localStorage.setItem('pipod-cart', JSON.stringify(items));
  }
});

export const itemCount = computed(cartItems, (items) =>
  items.reduce((acc, item) => acc + item.cantidad, 0)
);

export const cartTotal = computed(cartItems, (items) =>
  items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
);

export function addItem(item: Omit<CartItem, 'cantidad'>) { ... }
export function removeItem(id: string) { ... }
export function updateQuantity(id: string, cantidad: number) { ... }
export function clearCart() { ... }
export function openCart() { isCartOpen.set(true); }
export function closeCart() { isCartOpen.set(false); }
export function toggleCart() { isCartOpen.set(!isCartOpen.get()); }
```

### useCartStore.ts (Hook)

```typescript
import { useStore } from '@nanostores/react';
import { cartItems, itemCount, cartTotal, isCartOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart } from '../store/cartStore';

export function useCartStore() {
  return {
    items: useStore(cartItems),
    itemCount: useStore(itemCount),
    total: useStore(cartTotal),
    isOpen: useStore(isCartOpen),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };
}
```

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Store functions | Manual - add/remove items |
| Integration | Navbar updates when cart changes | Browser test |
| Integration | Drawer opens/closes | Browser test |
| E2E | Full cart flow across pages | Browser navigation test |

---

## Open Questions

- [ ] None - implementation complete

---

## Rollback Plan

```bash
git checkout HEAD -- \
  src/store/cartStore.ts \
  src/hooks/useCartStore.ts \
  src/components/AppWrapper.tsx \
  src/components/cart/CartDrawer.tsx \
  src/components/pipodNavbar.tsx \
  src/components/products/cardProduct.tsx
```