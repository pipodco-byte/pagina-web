# ⏳ Pendientes — Pipod Ecommerce (Astro)

**Última actualización:** Mayo 20, 2026
**Versión:** 1.6
**Proyecto:** Astro-Ecommerce (paginaweb-ecommerce / www.pipod.co)
**Repo oficial:** [pipodco-byte/astroecoomerce](https://github.com/pipodco-byte/astroecoomerce)
**Fuente de verdad:** Este archivo + Todo.md

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
| B11 | Content schema `author: z.literal('kimi')` no permitía 'equipo-pipod' | ✅ Corregido | 621ab19 |
| B12 | TableOfContents `headings` undefined en BlogPostLayout | ✅ Corregido | 621ab19 |

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
| F14 | **Blog Content Collections** — 73 artículos migrados a `src/content/blog/`, layouts SEO, rutas `/blog/{slug}` | ✅ | Mayo 2026 |
| F15 | **Blog Phanatik Visual Redesign** — 8 nuevos componentes (Text, Wrapper, SectionDivider, BlogCardHero/Split/Grid/Mini, BlogAside), grid 4 columnas, adaptadores Pipod (colores azul/negro, no púrpura) | ✅ | d9b13de |
| F16 | **TableOfContents flotante** — TOC a la izquierda del artículo, auto-genera de H2/H3, highlight on scroll | ✅ | 621ab19 |
| F17 | **Related Posts** — Sección al final del artículo con 3 cards relacionados por categoría/tags | ✅ | 621ab19 |
| F18 | **Author fix** — Todos los 70 posts con `author: 'equipo-pipod'`, schema actualizado | ✅ | 621ab19 |
| F19 | **Botones pill blog** — 100px radius, azul (#3A506B) → negro (#000) hover, solo blog | ✅ | 621ab19 |
| F20 | **Blog Pipod header removed** — Eliminado sección "Blog Pipod" de pipod-blog.astro | ✅ | 621ab19 |
| F21 | **LoadMoreButton** — Paginación para 70+ artículos (muestra 12, carga 12 más) | ✅ | 621ab19 |
| F22 | Agregar propiedad 'about' al schema TermsPageSchema.astro | ✅ | - |

---

## 📅 Historial de cambios (Mayo 20, 2026)

| Tipo | Descripción | Status |
|------|-------------|--------|
| **Content** | Actualización T&C (Mayo 2026) | ✅ Live |
| **Repo** | Consolidación en `pipodco-byte/astroecoomerce` | ✅ |
| **Security** | Remediación P0 (Limpieza Git + Refactor API) | ✅ |
| **Docs** | Organización de archivos `.md` | ✅ |
| **SEO** | Agregado `about` a Schema TermsPage | ✅ |

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
| P0 | **Remediación de seguridad** | `.env.local` con 8 credenciales expuestas, `dist/` y `.vercel/` con secrets incrustados, `GOOGLE_PLACES_API_KEY` y `INDEXNOW_KEY` hardcodeados en `sync-reviews.ts` | Propuesta en engram: `sdd/seguridad-remediacion-secretos/proposal` |
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
| B6 | **Footer Términos — Info SIC** | Agregar teléfono SIC (01-8000-910-165) y enlace sic.gov.co en footer de términos cuando se tenga el registro |

### 🔧 Mantenimiento Blog (Post-separar-contenido-layout)

| # | Tarea | Prioridad | Notas |
|---|-------|-----------|-------|
| BM1 | OG article tags | Baja | Agregar `article:published_time`, `article:author`, `article:section` en BlogPostLayout |
| BM2 | Sass `@import` → `@use` | Baja | 457 warnings deprecated — migrar en futuro |
| BM3 | Monitoring SEO | Media | Verificar Google indexing de las 73 nuevas URLs |

---

## 🔵 Nuevas Tareas Blog (Mayo 13, 2026)

| # | Tarea | Prioridad | Status | Notas |
|---|-------|-----------|--------|-------|
| BN1 | **Share buttons** | Media | ⏳ Pendiente | A la izquierda del artículo (estilo Phanatik): WhatsApp, Facebook, LinkedIn, copiar link |
| BN2 | **Newsletter mejorado** | Media | ⏳ Pendiente | Explicar mejor al usuario — necesita diseño/spec |
| BN3 | **Schema markup extra** | SEO | 📋 Pendientes | BreadcrumbList, FAQPage para artículos con Q&A |
| BN4 | **Open Graph dinámico** | SEO | 📋 Pendientes | Imagen OG personalizada por artículo |
| BN5 | Progress bar | - | ❌ No | Usuario dijo NO |
| BN6 | Dark mode blog | Baja | 📋 Pendientes | Futuro |

### 📋 Indexación Google (Post-Deploy)

| # | Tarea | Prioridad | Status | Notas |
|---|-------|-----------|--------|-------|
| INDEX1 | **Verificar indexación en Search Console** | 🟡 Media | ⏳ Pendiente | 73 artículos deployados — esperar 24-72h o usar "Inspeccionar URL" |
| INDEX2 | **Resubmit sitemap** en Search Console | 🟡 Media | ⏳ Pendiente | Para acelerar crawl |
| INDEX3 | **Medir tráfico orgánico blog** | 🟡 Media | ⏳ 1 semana | Ver consultas de keywords Bogotá/Chapinero en Search Console |

---

## 📋 SDD Changes (Spec-Driven Development)

| Change | Status | Artefactos |
|--------|--------|------------|
| `supabase-products-integration` | ✅ Completado | `openspec/changes/supabase-products-integration/` |
| `bold-api-checkout` | ✅ Completado | `openspec/changes/bold-api-checkout/` |
| `separar-contenido-layout` | ✅ Completado | 73 artículos migrados a Content Collections con rutas /blog |
| `blog-editorial-redesign` | ✅ Completado | Cards editoriales (BlogCardEditorial, BlogCardFeatured), hero destacado, SCSS editorial |
| `blog-phanatik-enhancements` | ✅ Completado | TopStoriesSection, BriefsSection, BlogSidebar, CategoriesGrid, BlogCardList, BlogCardCompact, BlogCardOverlay |
| `blog-phanatik-visual-redesign` | ✅ Completado | 8 componentes nuevos, grid 4 columnas, colores Pipod (azul/negro), TableOfContents, Related Posts, LoadMoreButton, author fix, buttons pill |
| `condicion-normalization` | ⏳ Pendiente | Mapping DB → UI para Nuevo/Seminuevo/Repotenciado |

---

## 🚀 Plan SEO Técnico (Llevar de 6.5 a 9+)

### Fase 1: Quick Wins (Esta semana)

| # | Tarea | Prioridad | Estado | Impacto |
|---|-------|-----------|--------|---------|
| SEO1 | **Schema LocalBusiness** (JSON-LD en Layout.astro) | 🔴 Alta | ✅ Existente | Alto - Local SEO |
| SEO2 | **Jerarquía Semántica H1/H2/H3** (verificar h1 único, h2 con keywords) | 🔴 Alta | ✅ Done (c00853f) | Alto - Google entiende |
| SEO3 | **WPO: Imágenes WebP** (convertir catálogo) | 🔴 Alta | ⏳ | Medio - Core Web Vitals |
| SEO4 | **Lazy loading** (imágenes below the fold) | 🔴 Alta | ⏳ | Medio - LCP |

### Fase 2: Optimización Media

| # | Tarea | Prioridad | Estado | Impacto |
|---|-------|-----------|--------|---------|
| SEO5 | **Meta titles dinámicos** (Producto + Estado + Ubicación) | 🟡 Media | ⏳ | Alto - CTR |
| SEO6 | **Meta descriptions únicas** (por categoría) | 🟡 Media | ⏳ | Medio - CTR |
| SEO7 | **HowTo Schema** (blog guides) | 🟡 Media | ⏳ | Medio - Rich snippets |
| SEO8 | **Product Schema + AggregateRating** | 🟡 Media | ⏳ | Medio - Stars in SERP |

### Fase 3: Arquitectura (Largo plazo)

| # | Tarea | Prioridad | Estado | Impacto |
|---|-------|-----------|--------|---------|
| SEO9 | **Arquitectura Silo** (páginas de landing por servicio) | 🟢 Baja | 📋 | Alto - Keyword focus |
| SEO10 | **Blog → Servicio links** (internal linking) | 🟢 Baja | ⏳ | Medio - Link equity |
| SEO11 | **Citations locales** (directorios Colombia) | 🟢 Baja | 📋 | Medio - Local trust |
| SEO12 | **Reviews con fotos** (usar fotos reales) | 🟢 Baja | 📋 | Alto - Trust signals |

### Detalles Técnicos

**1. Schema LocalBusiness (SEO1):** Agregar JSON-LD en Layout.astro
**2. Jerarquía Semántica (SEO2):** H1 único con "Servicio Técnico Apple Bogotá"
**3. Meta Titles Dinámicos (SEO5):** `Producto + Estado + Ubicación + Pipod`

---

## 📊 SEO (Ver detalle en `PENDIENTES_SEO.md`)

**Score actual:** ~6.5/10 | **Meta:** 9+ (sólido)

### Pendientes SEO (Legacy):
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

_Ultima actualizacion: Mayo 20, 2026 (v1.6 - Términos actualizados, repo oficial documentado, CI/CD Vercel, seguridad pendiente)_
