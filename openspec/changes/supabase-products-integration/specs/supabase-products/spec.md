# Supabase Products Integration Specification

## Purpose

Replace hardcoded mock data in `contentful.ts` with Supabase as the live product data source. Products from `inv_productos` + `inv_producto_variantes` tables are filtered by `tipo_venta = 'Web'`.

## Requirements

### Requirement: Product Types

The system MUST define TypeScript interfaces matching the database schema:

```typescript
interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  condicion?: 'Nuevo' | 'Seminuevo' | 'Repotenciado';
  useCase?: 'Diseñadores' | 'Profesionales' | 'Estudiantes' | 'Viajeros' | 'Deportistas';
  sku: string;
  tipo: 'equipo' | 'accesorio';
  imagenes: string[];
  categoria?: string;
  cantidad: number;
}

interface ProductoVariante {
  id: string;
  producto_id: string;
  color?: string;
  capacidad?: string;
  precio: number;
}
```

#### Scenario: Fetch product with variants

- GIVEN a product exists in `inv_productos` with `tipo_venta = 'Web'`
- WHEN `getProductoPorSlug(slug)` is called
- THEN return the product with its variants joined from `inv_producto_variantes`
- AND variants are empty array if none exist

### Requirement: Supabase Client Setup

The system MUST provide a singleton Supabase client in `src/lib/supabase.ts`.

The client MUST read `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` from environment variables.

#### Scenario: Client initialization

- GIVEN valid Supabase credentials in environment
- WHEN `createClient()` is called
- THEN return a Supabase client instance configured for server-side use

### Requirement: Product Queries

The system MUST provide query functions in `src/lib/products.ts`:

| Function | Description |
|----------|-------------|
| `getProductos()` | Returns all products with `tipo_venta = 'Web'` |
| `getProductoPorSlug(slug)` | Returns single product by slug with variants |
| `getProductosPorCategoria(categoria)` | Returns products filtered by category |
| `getProductosPorTipo(tipo)` | Returns products filtered by `tipo` ('equipo' or 'accesorio') |

All queries MUST filter by `tipo_venta = 'Web'`.

#### Scenario: List all products

- GIVEN products exist with `tipo_venta = 'Web'`
- WHEN `getProductos()` is called
- THEN return all matching products as `Producto[]`
- AND transform database field `img_url` to `imagenes[]`

#### Scenario: Filter by tipo

- GIVEN products exist with `tipo_venta = 'Web'` and `tipo = 'accesorio'`
- WHEN `getProductosPorTipo('accesorio')` is called
- THEN return only accessory products

### Requirement: Slug Generation

The system MUST generate URL-friendly slugs from the `nombre` field using a `slugify` function.

The format MUST be lowercase with hyphens replacing spaces and special characters removed.

#### Scenario: Generate slug from product name

- GIVEN a product with `nombre = "iPhone 15 Pro Max"`
- WHEN `slugify("iPhone 15 Pro Max")` is called
- THEN return `"iphone-15-pro-max"`

#### Scenario: Generate slug with special characters

- GIVEN a product with `nombre = "MacBook Pro 14\" M3"`
- WHEN `slugify()` is applied
- THEN return `"macbook-pro-14-m3"` (quotes and backslash removed)

### Requirement: Product Store (Nanostores)

The system MUST provide a client-side `productStore` atom in `src/store/productStore.ts`.

The store MUST hold the full product list for client-side filtering without re-fetching.

```typescript
export const productStore = atom<Producto[]>([]);
export const filteredProducts = computed(productStore, (products) => products);
```

#### Scenario: Initialize store from server data

- GIVEN products are fetched server-side in `tienda-pipod.astro`
- WHEN StoreWithFilters receives products as props
- THEN component SHOULD also populate `productStore` for cross-component access

### Requirement: Placeholder Image Strategy

When a product has no images (`imagenes` is empty or null), the system MUST use Apple's official store images as fallback.

The fallback URL pattern MUST be: `https://store.store.apple.com/{model}-...` derived from the product name.

#### Scenario: Product without images

- GIVEN a product with `nombre = "iPhone 15 Pro"` and no `imagenes`
- WHEN the product is rendered
- THEN display `https://store.store.apple.com/iphone-15-pro...` as fallback image
- AND log a warning for debugging

### Requirement: Stock Display Logic

The system MUST display stock status based on `cantidad` field:

| cantidad | Display | Badge |
|----------|---------|-------|
| `> 0` | "En Stock" / "Disponible" | Default |
| `= 0` | "Pre-order available" | Warning/amber badge |

Products with `cantidad = 0` MUST NOT show "Out of stock" — they are pre-orderable.

#### Scenario: Product in stock

- GIVEN a product with `cantidad = 5`
- WHEN rendered in product list or detail
- THEN show "En Stock" badge

#### Scenario: Product with zero quantity

- GIVEN a product with `cantidad = 0`
- WHEN rendered in product list or detail
- THEN show "Pre-order available" badge in amber/warning style

## Coverage

- Happy paths: All primary query functions covered
- Edge cases: Empty variants, missing images, zero stock covered
- Error states: Query error handling with fallback to empty array

## Next Step

Ready for design (sdd-design).
