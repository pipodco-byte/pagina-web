# PENDIENTES SEO - Astro-Ecommerce PIPOD
## Updated: 2026-05-04

---

## ✅ SDD: local-seo-cro-v3 COMPLETADO

### Hub Schema ✅
- `ServicePageSchema.astro`: Schema @graph con 6 entidades
  - LocalBusiness (datos completos)
  - Service: Repair (iPhone, MacBook, iPad, Watch, Microsoldadura)
  - Service: Trade-in (Retoma iPhone, MacBook)
  - OfferCatalog: Equipment (nuevos, seminuevos, refurbished)
  - OfferCatalog: Accessories (cases, cargadores, AirPods)
  - WebPage (con breadcrumb)

### CLS Fix ✅
- `PaymentBanner.astro`: 7 imágenes con width/height

### LCP Fix ✅
- GTM/GA4 ya eran async (verificado)

### WhatsApp CTAs ✅
- Ya eran dispositivo-específicos (iPhone, MacBook, iPad)

---

## ✅ SDD: local-seo-cro-v2 COMPLETADO

### Phase 1: NAP Fixes ✅
- [x] `pipodGooglemaps.astro`: Address fixed "Cra. 13a #79-52" (was "Cra. 7 #114-21")
- [x] `pipodGooglemaps.astro`: Coords fixed (4.6658, -74.0578) (was 4.7110, -74.0059)

### Phase 2: DeviceBento Fixes ✅
- [x] `DeviceBento.astro`: `/macbook` → `/servicio-tecnico-apple#device-selector`
- [x] `DeviceBento.astro`: `/iphone` → `/servicio-tecnico-apple#device-selector`

### Phase 3: Reviews Update ✅
- [x] `reviews.json`: totalReviews 63 → 89
- [x] `LocalBusinessSchema.astro`: hardcoded 63 → 89
- [x] `.env.example`: Added Google Places API documentation

### Phase 4: Build Verification ✅
- [x] Build passes

---

## ✅ COMPLETADO (SDD Anterior - Full Implementation)

### Phase 1: Critical Fixes
- [x] Layout.astro: lang="es", canonical dynamic, preconnect, font-display:swap
- [x] LocalBusinessSchema.astro: static data (removed localhost fetch)
- [x] Delete empty/duplicate files: donate2.astro, pipodBlog.astro, product.astro

### Phase 2: Content Quality
- [x] Meta descriptions added to: index, shopping-cart, contabilidad
- [x] Title fixes: shopping-cart, servicio-tecnico-apple

### Phase 3: Structured Data
- [x] ProductSchema.astro created
- [x] BlogPostingSchema.astro created

### Phase 4: Performance
- [x] Image dimensions: ServiceHero.astro
- [x] Iframe lazy loading: RetomaHero.astro (Vimeo), donate.astro (YouTube x2)

### Phase 5: Sitemap & Cleanup
- [x] robots.txt: Disallow /api/, /contabilidad/
- [x] MetaSocial universal: Integrated in Layout.astro

---

## ✅ SDD: fix-cart-hydration COMPLETADO

### Nano Stores Implementation ✅
- `cartStore.ts`: Enhanced con computed values (itemCount, cartTotal)
- `useCartStore.ts`: Hook de React creado
- `AppWrapper.tsx`: Single island con Navbar + CartDrawer
- `CartDrawer.tsx`: Usa nanostores (isOpen del store)
- `pipodNavbar.tsx`: Usa nanostores (openCart del store)
- `CardProduct.tsx`: Usa addItem directo del store
- `CartContext.tsx`: **ELIMINADO** - Reemplazado por nanostores
- `CartProviderWrapper.tsx`: **ELIMINADO**
- 12 pages: `<PipodNavbar client:load>` removido (Navbar ahora global via AppWrapper)

**Fix:** Error "useCart must be used within a CartProvider" eliminado

**Commit:** `5c7b665` - fix: replace CartContext with Nano Stores for cross-island state

---

## ⏭️ PENDIENTES

### 1. Deploy a Vercel (PENDIENTE)
**Opción A:** Vercel Dashboard → Deploy button
**Opción B:** `vercel --prod` (desde CLI)
**Nota:** El cron de reviews se activa automáticamente tras el primer deploy

---

## 📊 SEO SCORE ACTUAL

| Categoría | Score |
|-----------|-------|
| Content Quality | 8/10 |
| Technical SEO | 9/10 |
| Structured Data | 9/10 |
| Performance | 7/10 |
| Local SEO | 8/10 |
| Sitemap/Crawl | 8/10 |
| **TOTAL** | **~8/10** |

**Meta: Llegar a 10/10**

---

## ⏭️ SDD: seo-10 (Planificado - para llegar a 10/10)

### 🔴 HIGH IMPACT

| # | Tarea | Impacto | Riesgo |
|---|-------|---------|--------|
| H1 | **Citations locales** — Agregar pipod a Yelp, Thomson, directorios Bogotá | +0.5 | BAJO |
| H2 | **Reviews con fotos** — Mostrar fotos de clientes reales en página | +0.3 | BAJO |
| H3 | **Reducir fonts** — 4→2 (Inter + Noto Sans) | +0.2 | MUY BAJO |

### 🟡 MEDIUM IMPACT

| # | Tarea | Impacto | Riesgo |
|---|-------|---------|--------|
| M1 | **FAQPage schema** — Si hay sección FAQ en servicio-tecnico | +0.2 | BAJO |
| M2 | **HowTo schema** — Guías "cómo cuidar tu iPhone" | +0.1 | BAJO |
| M3 | **Imágenes WebP** — Convertir principales a WebP | +0.3 | MEDIO |

### 🟢 LOW IMPACT

| # | Tarea | Impacto | Riesgo |
|---|-------|---------|--------|
| L1 | **Core Web Vitals reales** — Medir post-deploy | +0.1 | NINGUNO |
| L2 | **Internal linking** — Blog → productos/servicios | +0.1 | BAJO |

**SDD Artifacts:** `.atl/proposals/seo-10.md`, `.atl/specs/seo-10.md`, `.atl/design/seo-10.md`, `.atl/tasks/seo-10.md`

---

## ⏭️ PENDIENTES (No solicitados pero documentados)

### 1. heroBentoCarousel image optimization
**Estado:** PENDIENTE (riesgo alto de romper diseño)
**Impacto:** +0.2 performance, +0.1 CLS
**Problema:** El carousel usa `background-image` CSS, no `<img>` tags
**Riesgo:** ALTO - Puede romper responsividad y animaciones del carousel
**Nota:** Los slides del carousel están en el viewport inicial (above the fold), lazy loading podría empeorar LCP

---

## 🚀 PRÓXIMOS PASOS

### Inmediato:
1. **Deploy a Vercel** — Para activar cron de reviews y medir Core Web Vitals

### SDD: seo-10 (para llegar a 10/10):
1. H1: Citations locales (Yelp, Thomson, directorios)
2. H2: Reviews con fotos reales
3. H3: Reducir fonts (4→2)
4. M1-M3: FAQ schema, HowTo schema, WebP
5. L1-L2: Core Web Vitals, internal linking

---

## 📝 NOTAS

- Build verificado: ✅ PASS (solo warnings de Sass)
- sitemap-index.xml genera correctamente
- robots.txt actualizado con Disallow rules
- Meta tags ahora dinámicos en todas las páginas
- SEO Score actual: ~8/10 (meta: 10/10)
- Last commit: `5c7b665` - fix: replace CartContext with Nano Stores for cross-island state