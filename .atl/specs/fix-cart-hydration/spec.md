# Spec: fix-cart-hydration

## Purpose

Fix React hydration error "useCart must be used within a CartProvider" by replacing React Context with Nano Stores for cross-island state management in Astro.

---

## ADDED Requirements

### Requirement: Nano Stores Architecture

The system MUST use Nano Stores (`nanostores` + `@nanostores/react`) for cart state management instead of React Context.

### Requirement: Store Atoms

The system MUST provide the following atoms in `src/store/cartStore.ts`:
- `cartItems` (atom<CartItem[]>) - array of cart items
- `isCartOpen` (atom<boolean>) - drawer visibility state

### Requirement: Computed Values

The system MUST provide computed values derived from `cartItems`:
- `itemCount` (computed) - total quantity of items
- `cartTotal` (computed) - total price of items

### Requirement: Cart Operations

The store MUST provide the following operations:
- `addItem(item)` - adds item to cart, increments if exists
- `removeItem(id)` - removes item by ID
- `updateQuantity(id, cantidad)` - updates item quantity
- `clearCart()` - empties the cart
- `openCart()` / `closeCart()` / `toggleCart()` - drawer controls

### Requirement: React Hook

The system MUST provide `useCartStore()` hook in `src/hooks/useCartStore.ts` that exposes:
- `items`, `itemCount`, `total`, `isOpen` (reactive via useStore)
- `addItem`, `removeItem`, `updateQuantity`, `clearCart` (direct function calls)
- `openCart`, `closeCart`, `toggleCart`

### Requirement: SSR Safety

The store MUST guard localStorage access with `typeof window !== 'undefined'` check.

### Requirement: AppWrapper Simplification

The `AppWrapper` component MUST render without `CartProvider` wrapper since Nano Stores don't require it.

---

## MODIFIED Requirements

### Requirement: CartDrawer Component

**Previously:** Used `useCart()` hook from React Context, received `isOpen` and `onClose` as props.

**Now:** Uses `useCartStore()` hook, reads `isOpen` and `closeCart` directly from store.

### Requirement: PipodNavbar Component

**Previously:** Used `useCart()` hook, managed cart drawer state with `useState`.

**Now:** Uses `useCartStore()` hook, calls `openCart()` from store.

### Requirement: CardProduct Component

**Previously:** Used `useCart()` hook for `addItem` function.

**Now:** Imports `addItem` directly from `cartStore` (no hook needed for mutations).

---

## REMOVED Requirements

### Requirement: CartContext

The `src/context/CartContext.tsx` file is REMOVED since Nano Stores replace React Context.

### Requirement: CartProviderWrapper

The `src/components/CartProviderWrapper.tsx` file is REMOVED since it's no longer needed.

---

## Scenarios

### Scenario: Add Item to Cart from Homepage

- GIVEN user is on homepage with iPhone products displayed
- WHEN user clicks "Añadir al carrito" button on a CardProduct
- THEN cart count in Navbar increments
- AND no "useCart must be used within CartProvider" error appears

### Scenario: Cart Drawer Opens

- GIVEN user has items in cart (from previous interaction)
- WHEN user clicks cart icon in Navbar
- THEN CartDrawer opens showing items
- AND drawer reads state from Nano Stores (not props)

### Scenario: Multiple Pages Session Persistence

- GIVEN user adds item to cart on homepage
- WHEN user navigates to tienda page
- THEN cart badge still shows correct count
- AND Nano Stores persists state across page loads

### Scenario: SSR Safe localStorage Access

- GIVEN Astro is building the site (SSR phase)
- WHEN cartStore initializes
- THEN localStorage is NOT accessed (guarded by `isBrowser` check)
- AND no SSR errors occur

---

## Acceptance Criteria

- [x] `cartStore.ts` provides atoms and computed values
- [x] `useCartStore.ts` hook works in React components
- [x] `AppWrapper` renders without CartProvider wrapper
- [x] `CartDrawer` reads state directly from store
- [x] `pipodNavbar` updates cart via store functions
- [x] `CardProduct` adds items via store's addItem
- [x] No `useCart` or `CartContext` imports remain in codebase
- [x] Homepage loads without hydration errors
- [x] Cart functionality works across multiple islands