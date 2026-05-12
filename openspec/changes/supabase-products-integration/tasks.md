# Tasks: supabase-products-integration

## COMPLETED ✅

## Phase 1: Setup — Supabase Client, Types, Env Vars

- [x] 1.1 Create `src/lib/supabase/client.ts` ✅
- [x] 1.2 Create `src/lib/supabase/types.ts` ✅
- [x] 1.3 Add SUPABASE credentials to `.env.local` ✅
- [x] 1.4 Build verification ✅ BUILD PASSED

## Phase 2: Queries — Product Queries, Slug Utility

- [x] 2.1 Create `src/lib/slug.ts` ✅
- [x] 2.2 Create `src/lib/supabase/products.ts` ✅
- [x] 2.3-2.6 All query functions implemented ✅

## Phase 3: Store — productStore Nanostores

- [x] 3.1 Create `src/stores/productStore.ts` ✅
- [x] 3.2 Add `$filters` atom ✅

## Phase 4: API — Product Endpoints

- [x] 4.1 Create `src/pages/api/products/index.ts` ✅
- [x] 4.2 Create `src/pages/api/products/[sku].ts` ✅

## Phase 5: Integration — Update Tienda Pages

- [x] 5.1 Update `tienda-pipod.astro` ✅
- [x] 5.2 Update `producto/[slug].astro` ✅

## Phase 6: Cleanup

- [x] 6.1 Keep `contentful.ts` as backwards-compatible adapter ✅

---

## Implementation Complete ✅

### Files Created
| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Supabase singleton |
| `src/lib/supabase/types.ts` | TypeScript interfaces |
| `src/lib/supabase/products.ts` | Product queries |
| `src/lib/slug.ts` | Slug generator |
| `src/stores/productStore.ts` | Nanostores |
| `src/pages/api/products/index.ts` | GET /api/products |
| `src/pages/api/products/[sku].ts` | GET /api/products/[sku] |

### Files Modified
| File | Change |
|------|--------|
| `src/lib/contentful.ts` | Now proxies to Supabase |
| `src/pages/tienda-pipod.astro` | Uses getWebProductos() |
| `src/pages/producto/[slug].astro` | Uses Supabase with adapter |
| `.env.local` | Added Supabase credentials |

### Build Status
✅ **BUILD PASSED**

### Next Steps for User
1. Test the tienda page at `/tienda-pipod`
2. Test product detail at `/producto/iphone-17`
3. Upload images to Supabase Storage
4. Add more products via Dashboard