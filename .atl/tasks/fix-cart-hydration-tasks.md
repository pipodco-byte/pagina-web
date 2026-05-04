# Tasks: fix-cart-hydration

## Phase 1: Enhanced cartStore.ts

- [x] 1.1 Add `isCartOpen` atom to cartStore
- [x] 1.2 Add `computed` values for `itemCount` and `cartTotal`
- [x] 1.3 Add `openCart`, `closeCart`, `toggleCart` functions

## Phase 2: Create useCartStore hook

- [x] 2.1 Create `src/hooks/useCartStore.ts` with React hook

## Phase 3: Update AppWrapper

- [x] 3.1 Remove `CartProvider` wrapper (no longer needed with nanostores)
- [x] 3.2 AppWrapper renders Navbar + slot + CartDrawer

## Phase 4: Update CartDrawer

- [x] 4.1 Replace `useCart()` with `useCartStore()` hook
- [x] 4.2 Remove props for `isOpen` and `onClose` (reads from store)
- [x] 4.3 Update internal `onClose` and `onClick` handlers

## Phase 5: Update pipodNavbar

- [x] 5.1 Replace `useCart()` with `useCartStore()` hook
- [x] 5.2 Replace `setIsCartOpen` with `openCart()` from store
- [x] 5.3 Remove CartDrawer import and render (now in AppWrapper)

## Phase 6: Update CardProduct

- [x] 6.1 Remove `useCart` import
- [x] 6.2 Use `addItem` directly from `cartStore`

## Phase 7: Restore Islands

- [x] 7.1 Restore `client:load` on SectionTracker in ProductsIphoneSection
- [x] 7.2 Restore `client:load` on SectionTracker in ProductsMacbooksSection

## Phase 8: Cleanup

- [x] 8.1 Delete `src/context/CartContext.tsx`
- [x] 8.2 Delete `src/components/CartProviderWrapper.tsx`
- [x] 8.3 Verify no remaining CartContext references

## Verification

- [x] 9.1 Homepage loads without useCart errors (200 OK)
- [x] 9.2 Navbar renders with cart icon
- [x] 9.3 Cart state is reactive via nanostores
- [x] 9.4 Multiple pages load without errors (tienda, servicio, contacto)

---

## Final Summary

| Metric | Value |
|--------|-------|
| Tasks Total | 18 |
| Tasks Complete | 18 |
| Pages Verified | 4 |
| Files Created | 1 (useCartStore.ts) |
| Files Modified | 5 |
| Files Deleted | 2 (CartContext.tsx, CartProviderWrapper.tsx) |

**Status**: ✅ COMPLETE