# ⏳ Pendientes — Pipod Ecommerce (Astro)

**Última actualización:** Mayo 2026
**Versión:** 1.1
**Proyecto:** Astro-Ecommerce (paginaweb-ecommerce / www.pipod.co)
**Fuente de verdad:** Este archivo

---

## 🔧 Bugs Críticos Corregidos (Mayo 2026)

| Item | Descripción | Status | Commit |
|------|-------------|--------|--------|
| B1 | Spread operator `{...producto}` con `client:load` causaba 500 en Vercel (serialization failure) | ✅ Corregido | f3dceb1 |
| B2 | Map serialization en `productOverviewGrid.tsx` — Map no es JSON-serializable | ✅ Corregido | f3dceb1 |
| B3 | Map serialization en `productSizes.tsx` | ✅ Corregido | f3dceb1 |
| B4 | `price.length` en `productOverviewGrid.tsx:79` — number no tiene .length | ✅ Corregido | f3dceb1 |
| B5 | `fs.writeFileSync` en `sync-reviews.ts` — Vercel Serverless tiene FS read-only | ✅ Corregido | 7c48fe5 |
| B6 | Tailwind v4 packages leftover en package.json (`@tailwindcss/vite`, `tailwindcss`) | ✅ Corregido | bb7370b |
| B7 | Configuración de dominio `www.pipod.co` con redirect 307 (la causa real del 403 Forbidden) | ✅ Corregido | - |
| B8 | CardProduct: `price.toLocaleString()` fallaba cuando price era undefined/null | ✅ Corregido | 5c2510c |
| B9 | CardProduct: image src usaba `BASE_URL` incorrectamente (imágenes externas) | ✅ Corregido | 5c2510c |
| B10 | CardProduct: productos sin imagen mostraban broken image | ✅ Corregido | 5c2510c |

**Lección aprendida:** El endpoint `/api/test` mínimo (sin dependencias) devolvía 500 → problema de infraestructura Vercel, no del código.

---

## ✅ Funcionalidades Completadas (Mayo 2026)

| Item | Descripción | Status | Commit |
|------|-------------|--------|--------|
| F1 | Props explícitas en CardProduct (MacBooks, iPhones, Accesorios) | ✅ | ae72b00 |
| F2 | `tipo` prop diferenciado: `"equipo"` para iPhones/MacBooks, `"accesorio"` para accesorios | ✅ | ae72b00 |
| F3 | ServiceCards sin border-top | ✅ | ae72b00 |
| F4 | Blog section background #F8F9FA | ✅ | ae72b00 |
| F5 | Hero padding-top 150px | ✅ | ece2771 |
| F6 | AppWrapper import case-sensitive (PipodNavbar) | ✅ | - |
| F7 | Cart Hydration fix — Nano Stores reemplaza React Context | ✅ | f3dceb1 |
| F8 | SEO — FAQPage Schema, IndexNow, Hub Schema | ✅ | - |
| F9 | **Supabase products integration** — `lib/supabase/`, view `web_productos_complete` | ✅ | 5c2510c |
| F10 | **Bold checkout improvements** — types, HMAC verification, create-link/webhook endpoints | ✅ | 5c2510c |
| F11 | **Slug generation** — `lib/slug.ts` para URLs de productos | ✅ | 5c2510c |
| F12 | **Product API endpoints** — `/api/products/index.ts` y `/api/products/[sku].ts` | ✅ | 5c2510c |
| F13 | **Nanostores productStore** — estado global para productos | ✅ | 5c2510c |

---

## 📅 Commits de Hoy (Mayo 6, 2026)

| Commit | Descripción |
|--------|-------------|
| `5c2510c` | **feat:** Supabase products integration + Bold checkout improvements |
| `838d63b` | **docs:** create comprehensive PENDIENTES.md (v1.0) |
| `62d5b8b` | **chore:** clean reinstall and build configuration |
| `ef04c3c` | **test:** minimal serverless diagnostic endpoint |
| `bb7370b` | **chore:** remove leftover Tailwind v4 packages |
| `7c48fe5` | **fix:** remove fs.writeFileSync from sync-reviews |
| `f3dceb1` | **fix:** eliminate Map serialization + spread operators |
| `ece2771` | **feat:** safe reintroduction of MacBooks tipo prop, ServiceCards border, blog bg |

---

## 📚 Documentación Relacionada

| Archivo | Descripción |
|---------|-------------|
| `PENDIENTES_SEO.md` | Auditoría SEO completa, FAQPage, IndexNow, Score 8.2/10 |
| `pendiente.md` | Lista original de pendientes (histórico, puede tener items desactualizados) |

---

## ⏳ Pendientes Activos

### 🔴 Alta Prioridad

| # | Tarea | Descripción | Notas |
|---|-------|-------------|-------|
| P1 | Reviews Google default | `/data/reviews.json` no se genera en serverless — muestra hardcoded | Revisar pipodGoogleReviews.jsx |
| P2 | Vercel KV para reviews | Persistir datos de reviews en Redis | Requiere cuenta Vercel KV |
| P3 | **Normalización condicion** | DB tiene `"usado"` pero filtros UI esperan `"Seminuevo"` o `"Repotenciado"` — iPhone 16 usados → Repotenciado, otros usados → Seminuevo | SDD: `condicion-normalization` |
| P4 | Badge CSS `badge-usado` | No existe la clase CSS — productos "usado" muestran sin badge correcto | Crear mapping a Seminuevo/Repotenciado |

### 🟡 Media Prioridad

| # | Tarea | Descripción | Notas |
|---|-------|-------------|-------|
| M1 | Mobile Responsive | Revisión total | 9 items en pendiente.md original |
| M2 | NavBar Tienda | Componente navegación | - |
| M3 | Diseño Blog | Pulir página principal | - |
| M4 | Diseño ProductShop | Mejorar estética | - |
| M5 | Servicio Técnico | Pulir /servicio-tecnico-apple | - |
| M6 | Card MacBook | Quitar "añadir a carrito" — debe ser igual iPhone | - |
| M7 | API Reviews Cloudflare/Contentful/Excel | - | Alta prioridad en pendiente.md original |
| M8 | Integración Excel | Alimente web + chatbot | - |
| M9 | Carga Inventario | Subir productos | - |
| M10 | **web_productos_complete view** | Debe existir en Supabase para que productos carguen | SQL view pendiente |

### 🟢 Baja Prioridad

| # | Tarea | Descripción |
|---|-------|-------------|
| B1 | Visual Entradas | Diseño posts individuales |
| B2 | Creación Visual | Piezas gráficas faltantes |
| B3 | Internal Linking | Blog → productos/servicios |
| B4 | HowTo Schema | Guías "cómo cuidar tu iPhone" |
| B5 | WebP Images | Convertir principales a WebP |

---

## 📋 SDD Changes (Spec-Driven Development)

| Change | Status | Artefactos |
|--------|--------|------------|
| `supabase-products-integration` | ✅ Completado | `openspec/changes/supabase-products-integration/` |
| `bold-api-checkout` | ✅ Completado | `openspec/changes/bold-api-checkout/` |
| `condicion-normalization` | ⏳ Pendiente | Mapping DB → UI para Nuevo/Seminuevo/Repotenciado |

---

## 📊 SEO (Ver detalle en `PENDIENTES_SEO.md`)

**Score actual:** ~8.2/10
**Meta:** 10/10

### Pendientes SEO:
- H1: Citations locales (directorios Colombia)
- H2: Reviews con fotos reales
- H3: Reducir fonts (4→2)
- M1: HowTo schema
- M2: WebP images
- L1: Core Web Vitals reales

---

## 🔑 Variables de Entorno (Vercel)

| Variable | Status |
|----------|--------|
| BREVO_API_KEY | ✅ Config |
| BOLD_INTEGRITY_SECRET | ✅ Config |
| PUBLIC_BOLD_API_KEY | ✅ Config |
| GOOGLE_PLACES_API_KEY | ✅ Config |
| GOOGLE_PLACE_ID | ✅ Config |

---

## 🌐 URLs del Proyecto

| URL | Status |
|-----|--------|
| https://www.pipod.co | ✅ Production (200 OK) |
| https://paginaweb-ecommerce-5ilb60uu2-pipods-projects.vercel.app | ✅ Preview |

---

## 📁 Estructura del Proyecto

```
Astro-Ecommerce/
├── src/
│   ├── components/
│   │   ├── home/          # ProductsMacbooks, ProductsIphones, Accesorios
│   │   ├── products/      # CardProduct, productOverviewGrid, productSizes
│   │   ├── promo/         # pipodGoogleReviews
│   │   ├── reviews/       # BlogSection
│   │   └── gtm/           # SectionTracker, useGTM
│   ├── layouts/            # Layout.astro
│   ├── pages/
│   │   ├── api/           # bold-webhook, sync-reviews, send-order-email
│   │   │   ├── bold/      # create-link.ts, webhook.ts
│   │   │   └── products/ # index.ts, [sku].ts
│   │   └── *.astro
│   ├── lib/
│   │   ├── contentful.ts  # Adapter que proxy a Supabase
│   │   ├── supabase/      # client.ts, products.ts, types.ts
│   │   ├── slug.ts        # URL generation
│   │   ├── bold-types.ts  # TypeScript types
│   │   └── hmac.ts        # Webhook verification
│   ├── stores/
│   │   └── productStore.ts # Nanostores
│   └── hooks/
│       └── useHydrated.ts  # Client-side hydration
├── .atl/                  # SDD artifacts (engram + openspec)
├── openspec/
│   └── changes/
│       ├── supabase-products-integration/
│       └── bold-api-checkout/
├── PENDIENTES.md          # Este archivo
└── PENDIENTES_SEO.md      # SEO detallado
```

---

## 📋 Regla

Cuando preguntes "qué hay pendiente", **solo lee este archivo**.

Para detalle SEO completo, consulta `PENDIENTES_SEO.md`.

---

_Ultima actualizacion: Mayo 6, 2026 (v1.1 - Supabase integration + Bold checkout)_
