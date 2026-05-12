# Design: supabase-products-integration

## Technical Approach

Replace mock data in `contentful.ts` with Supabase as the live product source. Products are fetched server-side via `getStaticPaths` using ISR (60s revalidate). Client-side filtering uses Nanostores atom. Slugs are generated at query time using `slugify(nombre)`.

## Architecture Decisions

### Decision: Supabase Client Singleton

**Choice**: `src/lib/supabase/client.ts` exports `createClient()` that instantiates a single `SupabaseClient` using env vars `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.

**Alternatives considered**: Create client per-query (connection overhead); use Astro's `entrypoint` pattern (over-engineered).

**Rationale**: Singleton avoids connection overhead while keeping the API simple. Env vars via `PUBLIC_` prefix ensures Vercel adapter compatibility.

### Decision: Type Mapping

**Choice**: Map Supabase `inv_productos` and `inv_producto_variantes` to flat `WebProduct` interface, with variants nested under `variantes[]`.

**Alternatives considered**: Preserve normalized tables (requires join logic in components); create separate `ProductVariant` type alongside `Product` (duplicates variant access patterns).

**Rationale**: Flat mapping with nested variants matches existing `contentful.ts` shape, minimizing changes to `StoreWithFilters.tsx` and `CardProduct`.

### Decision: Slug Generation at Query Time

**Choice**: `src/lib/slug.ts` exports `slugify(name: string): string` — lowercase, replace spaces/hyphens with hyphens, strip accents.

**Alternatives considered**: Store slugs in Supabase (extra column); compute slugs during build only (bakes data).

**Rationale**: Query-time generation keeps slugs always in sync with product names. No database schema changes needed.

### Decision: Nanostores Product Store

**Choice**: `src/stores/productStore.ts` exports `$products` atom holding `WebProduct[]`, plus `$filters` atom for filter state.

**Alternatives considered**: Use `$cartItems` pattern with computed stores (filters don't derive from products alone); pass props through component tree (complexity at scale).

**Rationale**: Follows existing `cartStore.ts` patterns. `$products` atom decouples data fetching from filtering, allowing `StoreWithFilters` to manage its own filter state while reading products from store.

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Astro Page (SSR/ISR)                      │
│  tienda-pipod.astro ─── getProductos() ─── Supabase          │
│         │                                                    │
│         └── props ──→ StoreWithFilters (client:load)        │
│                              │                               │
│                     Nanostores $products                     │
│                              │                               │
│                     Filter logic → $filters                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 producto/[slug].astro                         │
│  getStaticPaths() ── getProductoPorSlug() ── Supabase        │
│         │                                                    │
│         └── props ──→ ProductOverviewGrid (client:load)     │
└─────────────────────────────────────────────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/lib/supabase/client.ts` | Create | Supabase client singleton with env var config |
| `src/lib/supabase/types.ts` | Create | `WebProduct`, `WebProductVariante` interfaces |
| `src/lib/supabase/products.ts` | Create | `getWebProductos()`, `getWebProductoPorSlug()` |
| `src/lib/slug.ts` | Create | `slugify()` utility |
| `src/stores/productStore.ts` | Create | `$products` and `$filters` atoms |
| `src/pages/api/products/index.ts` | Create | GET /api/products — list all web products |
| `src/pages/api/products/[sku].ts` | Create | GET /api/products/[sku] — single product |
| `src/pages/tienda-pipod.astro` | Modify | Import from `lib/supabase/products.ts` instead of `contentful.ts` |
| `src/pages/producto/[slug].astro` | Modify | Import from `lib/supabase/products.ts` instead of `contentful.ts` |
| `src/lib/contentful.ts` | Delete | Mock data (removed after full migration) |

## Interfaces / Contracts

```typescript
// src/lib/supabase/types.ts
export interface WebProductVariante {
  id: string;
  sku: string;
  color?: string;
  capacidad?: string;
  precio: number;
  cantidad: number;
  imagenes?: string[];
}

export interface WebProduct {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  condicion: 'Nuevo' | 'Seminuevo' | 'Repotenciado';
  useCase?: 'Diseñadores' | 'Profesionales' | 'Estudiantes' | 'Viajeros' | 'Deportistas';
  sku: string;
  tipo: 'equipo' | 'accesorio';
  thumb_src?: string;
  thumb_alt?: string;
  enStock: boolean;
  variantes: WebProductVariante[];
}
```

```typescript
// src/lib/slug.ts
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `slugify()` edge cases | Jest-style assertions: empty string, accents, special chars |
| Unit | Type mapping logic | Validate transformed fields match schema |
| Integration | API endpoints | Call endpoints with mock Supabase client |
| Integration | Store page | Astro dev server + Playwright smoke test |

## Migration / Rollout

1. Create `src/lib/supabase/client.ts`, `types.ts`, `products.ts`, `slug.ts`
2. Create `src/stores/productStore.ts`
3. Create API routes
4. Update `tienda-pipod.astro` to use new functions
5. Update `producto/[slug].astro` to use new functions
6. Delete `src/lib/contentful.ts` only after both pages verified working
7. **Rollback**: Restore imports from `contentful.ts` — no data migration needed

No migration required — mock data is replaced with live Supabase data transparently.

## Open Questions

- [ ] Should API routes use ISR caching (`export const revalidate = 60`) or SSR?
- [ ] Do we need to handle authentication for admin-only products (future)?
- [ ] Should we add `stale-while-revalidate` headers for the API responses?
