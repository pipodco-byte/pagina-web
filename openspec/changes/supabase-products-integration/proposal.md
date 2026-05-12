# Proposal: supabase-products-integration

## Intent

Replace the hardcoded mock data in `contentful.ts` with Supabase as the live product data source. The `inv_productos` + `inv_producto_variantes` tables provide real-time product data filtered by `tipo_venta = 'Web'`. This eliminates static mock data and enables dynamic product updates without code changes.

## Scope

### In Scope
- Setup Supabase client in `src/lib/supabase.ts`
- Create TypeScript types for `Producto` and `ProductoVariante`
- Replace `getProductos()` with Supabase query (filter: `tipo_venta = 'Web'`)
- Replace `getProductoPorSlug()` with Supabase query (join variantes)
- Generate slugs dynamically from `nombre` field
- Configure ISR (Incremental Static Regeneration) for product pages
- Add client-side Nanostores product store for filtering state
- Migrate `tienda-pipod.astro` to use new product functions
- Migrate `producto/[slug].astro` to use new product functions
- Update `StoreWithFilters.tsx` to work with new data shape

### Out of Scope
- Contentful migration or data export (mock data is discarded)
- Admin interface for products
- Real-time subscription to product changes (SSR upgrade)

## Approach

**Server-side fetching with ISR**: Product pages use Astro's server-side rendering with ISR for near-real-time data without sacrificing performance. `getStaticPaths` is replaced with `getServerSideProps` equivalent patterns.

**Client-side Nanostores**: A `productStore.ts` atom holds the product list for client-side filtering. Store components read from this atom instead of passing props through the component tree.

**Slug generation**: Use `slugify(nombre)` to create URL-friendly slugs at query time. No stored slugs needed.

**Image placeholders**: Apple's official images (`store.store.apple.com/{model}-...`) as fallback when no image URL exists.

**Stock logic**: `cantidad = 0` renders "Pre-order available" badge instead of "Out of stock".

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/lib/supabase.ts` | New | Supabase client singleton |
| `src/lib/products.ts` | New | Product query functions (replaces `contentful.ts`) |
| `src/lib/contentful.ts` | Removed | Mock data (to be deleted after migration) |
| `src/store/productStore.ts` | New | Nanostores atom for product list |
| `src/types/products.ts` | New | `Producto`, `ProductoVariante` types |
| `src/pages/tienda-pipod.astro` | Modified | Use new product functions |
| `src/pages/producto/[slug].astro` | Modified | Dynamic routing with Supabase data |
| `src/components/store/StoreWithFilters.tsx` | Modified | Read from productStore atom |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Schema mismatch with existing components | Low | Define types first; validate before building pages |
| ISR cache invalidation timing | Medium | Set `revalidate` to 60s; monitor product updates |
| Missing variants for some products | Low | Fallback to empty variantes array; log warning |

## Rollback Plan

1. Revert `src/lib/products.ts` → restore `contentful.ts` with mock data
2. Revert `src/pages/tienda-pipod.astro` and `producto/[slug].astro` to use old functions
3. Delete `src/lib/supabase.ts`, `src/store/productStore.ts`, `src/types/products.ts`
4. `npm run build` to verify rollback

Rollback is **low risk** — all changes are file-level; no database migrations.

## Dependencies

- `@supabase/supabase-js` package (add to `package.json`)
- `slugify` package (add to `package.json`) or implement inline
- Supabase project URL + anon key in `.env`

## Success Criteria

- [ ] Products load from Supabase (not mock data) on `tienda-pipod.astro`
- [ ] Product detail pages render correct data for `producto/[slug]` routes
- [ ] Filtering by condition/device/price/useCase works on store page
- [ ] Slugs are generated from `nombre` (e.g., "iPhone 15 Pro" → "iphone-15-pro")
- [ ] Products with `cantidad=0` show "Pre-order available" badge
- [ ] Products without images show Apple placeholder images
- [ ] Build completes without errors (`npm run build`)
- [ ] Rollback verified (mock data restored, Supabase code removed)
