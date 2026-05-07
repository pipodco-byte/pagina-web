# Exploration: supabase-products-integration

## Current State

### 1. Product Fetching (Mock Data)
- **File**: `src/lib/contentful.ts` (257 lines)
- **Current approach**: Hardcoded mock data array (`mockProductos`) with 10 products
- **Functions**:
  - `getProductos()` — returns all products as `Producto[]`
  - `getProductoPorSlug(slug)` — returns single product by slug
- **Data shape**: Products have fields matching Contentful structure (`sys.id`, `fields.nombre`, etc.) but data is static/empty
- **No actual Contentful API calls** despite `contentful` package in dependencies

### 2. Store/Cart Architecture (Nanostores)
- **File**: `src/store/cartStore.ts` (76 lines)
- **Uses**: `nanostores` (v1.2.0) with `@nanostores/react` adapter
- **State atoms**:
  - `cartItems` — array of `CartItem` objects with `id`, `nombre`, `precio`, `cantidad`, `thumb_src`, `slug`
  - `isCartOpen` — boolean for drawer visibility
- **Computed**: `itemCount`, `cartTotal`
- **Actions**: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `openCart`, `closeCart`, `toggleCart`
- **Persistence**: `localStorage` via `cartItems.listen()`
- **Hook**: `src/hooks/useCartStore.ts` wraps nanostores with `useStore`

### 3. Tienda Pages Rendering
- **Store page**: `src/pages/tienda-pipod.astro` (60 lines)
  - Calls `getProductos()` at build time
  - Passes products to `StoreWithFilters` React component
  - Uses `client:load` directive
- **Product detail**: `src/pages/producto/[slug].astro` (116 lines)
  - `getStaticPaths()` fetches all products and generates paths
  - `getProductoPorSlug()` fetches individual product
- **StoreWithFilters** (`src/components/store/StoreWithFilters.tsx`, 750 lines)
  - Client-side filtering (condition, device, price, useCase)
  - Product categorization by title parsing
  - URL param reading for initial filter state

### 4. Existing API Endpoints
- `src/pages/api/bold-webhook.ts` — Bold payment webhook
- `src/pages/api/bold/create-link.ts` — Bold payment link creation
- `src/pages/api/sync-reviews.ts` — Review sync
- `src/pages/api/newsletter.ts` — Newsletter
- `src/pages/api/send-order-email.ts` — Order email
- `src/pages/api/index-now.ts` — Index/SEO
- `src/pages/api/test.ts` — Test endpoint
- **No existing Supabase API endpoints**

### 5. Project Structure
```
src/
├── lib/
│   ├── contentful.ts        # Mock product data + functions
│   ├── hmac.ts
│   ├── bold-types.ts
│   ├── checkoutValidations.ts
│   └── gtmEvents.ts
├── store/
│   └── cartStore.ts        # Nanostores cart state
├── hooks/
│   └── useCartStore.ts     # React hook for cart
├── pages/
│   ├── tienda-pipod.astro
│   ├── producto/[slug].astro
│   └── api/               # Various API endpoints
└── components/
    ├── products/          # Product display components
    └── store/              # StoreWithFilters, StoreHero, etc.
```

## Affected Areas
- `src/lib/contentful.ts` — Replace mock data with Supabase queries
- `src/pages/tienda-pipod.astro` — May need SSR or client-side fetching
- `src/pages/producto/[slug].astro` — Dynamic routing with Supabase data
- `src/components/store/StoreWithFilters.tsx` — Client-side filtering (may need refactoring)
- `src/store/` — New store for products if needed

## Approaches

### 1. Replace contentful.ts with Supabase client
- **Pros**: Minimal changes, keeps same API surface
- **Cons**: Still static generation unless switching to SSR
- **Effort**: Low

### 2. Create Supabase API endpoints + client-side fetching
- **Pros**: True dynamic data, works with SSR
- **Cons**: More endpoints, needs client-side state management
- **Effort**: Medium

### 3. Full Nanostores product store
- **Pros**: Consistent architecture, easy reactivity
- **Cons**: Additional store to maintain
- **Effort**: Medium

## Recommendation
Start with **Approach 1**: Replace `contentful.ts` mock data with Supabase queries. This keeps the existing API surface and works within the current static generation pattern. Consider switching to SSR if real-time data is needed.

## Risks
- Static generation means products won't update without rebuild
- Need to maintain schema compatibility with existing component expectations
- Price/filter logic in `StoreWithFilters` assumes specific data shape
