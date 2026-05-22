# PENDIENTES SEO - Astro-Ecommerce PIPOD
## Updated: 2026-05-05

---

## ✅ SDD: seo-10 IMPLEMENTADO

### M1: FAQPage Schema ✅

**Implementado en 3 páginas:**

| Página | Archivo | # FAQs |
|--------|---------|--------|
| `/servicio-tecnico-apple` | `src/pages/servicio-tecnico-apple.astro` | 8 |
| `/plan-retoma-apple` | `src/pages/plan-retoma-apple.astro` | 12 |
| `/contacto-pipod` | `src/pages/contacto-pipod.astro` | 4 |

**Componente creado:** `src/components/SEO/FAQPageSchema.astro`
- Props: `faqData` (array de `{q: string, a: string}`)
- Genera JSON-LD tipo FAQPage

**Preguntas para servicio técnico:**
1. ¿Cuánto tiempo tarda la reparación de un iPhone?
2. ¿Qué garantía ofrecen?
3. ¿Los repuestos son originales?
4. ¿Puedo dejar mi equipo sin cita?
5. ¿Ofrecen servicio a domicilio?
6. ¿Qué dispositivos Apple reparan?
7. ¿Cómo funciona el diagnóstico gratis?
8. ¿Pueden recuperar datos de un iPhone mojado?

**Preguntas para retoma:** (12 preguntas de RetomaFAQ.astro)

**Preguntas para contacto:**
1. ¿Cuánto tiempo tarda una reparación?
2. ¿Qué pasa si mi equipo tiene iCloud bloqueado?
3. ¿Ofrecen servicio a domicilio?
4. ¿Qué métodos de pago aceptan?

---

### IN: IndexNow Protocol ✅

**Archivos creados/modificados:**

| Archivo | Acción |
|---------|--------|
| `src/pages/api/index-now.ts` | CREADO - Endpoint POST/GET |
| `src/pages/api/sync-reviews.ts` | MODIFICADO - Agregado notifyIndexNow() |
| `public/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt` | CREADO - Key file |

**Key:** `6e7e2464-f98a-4108-b71c-a652b9a63a9b`
**URL verificación:** `https://www.pipod.co/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt`

**Funcionalidad:**
- `POST /api/index-now { urls: [...] }` - Notifica URLs específicas
- `GET /api/index-now` - Notifica URLs principales automáticamente
- Integrado en `/api/sync-reviews` (cada 3 días via cron)

**Endpoints notificados:**
- `https://indexnow.org/indexnow`
- `https://www.bing.com/indexnow`

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

## ✅ Deploy a Vercel (COMPLETADO)

- **main branch** deployada a www.pipod.co
- develop y main sincronizados (80c4c6b)
- memoria branch disponible para referencia visual

---

## 📊 SEO SCORE ACTUAL

| Categoría | Score | Cambio |
|-----------|-------|--------|
| Content Quality | 8/10 | - |
| Technical SEO | 9/10 | - |
| Structured Data | 9/10 | +0.2 (FAQPage) |
| Performance | 7/10 | - |
| Local SEO | 8/10 | - |
| Sitemap/Crawl | 8/10 | - |
| **TOTAL** | **~8.2/10** | +0.2 |

**Meta: Llegar a 10/10**

---

## ⏭️ SDD: seo-10 (Para llegar a 10/10)

### 🔴 HIGH IMPACT

| # | Tarea | Impacto | Riesgo | Estado |
|---|-------|---------|--------|--------|
| H1 | **Citations locales** — Directorios Colombia optimizados | +0.5 | BAJO | 🔴 PLAN ACTUALIZADO |
| H2 | **Reviews con fotos** — Mostrar fotos de clientes reales en página | +0.3 | BAJO | PENDIENTE |
| H3 | **Reducir fonts** — 4→2 (Inter + Noto Sans) | +0.2 | MUY BAJO | PENDIENTE |

### 🔴 H1: Citations Locales - COLOMBIA OPTIMIZADO

**Nota:** Yelp y Thomson Local ELIMINADOS (no operan en Colombia).

#### 🔴 CRÍTICA (Google Maps + Apple)
| # | Directorio | URL | Acción |
|---|------------|-----|--------|
| 1 | **Google Business Profile** | business.google.com | Verificar/optimizar perfil existente |
| 2 | **Apple Business Connect** | register.apple.com | CREAR (Apple Maps, Siri, Spotlight) |

#### 🔴 ALTA (Autoridad Bogotá)
| # | Directorio | URL | Acción |
|---|------------|-----|--------|
| 3 | **Cámara de Comercio (Bazzarbog)** | bazzarbog.com | Verificar o registrar |

#### 🟡 MEDIA (Consistencia NAP)
| # | Directorio | URL | Acción |
|---|------------|-----|--------|
| 4 | **Bing Places** | bingplaces.com | Registrar |
| 5 | **Páginas Amarillas** | paginasamarillas.com.co | Registrar |
| 6 | **Cylex Colombia** | cylex.com.co | Registrar |

#### ❌ ELIMINADO
- Yelp (no opera en Colombia)
- Thomson Local (UK only)

#### NAP Unificado:
```
NOMBRE: Pipod - Servicio Técnico Apple
DIRECCIÓN: Cra. 13a #79-52, Chapinero, Bogotá
TELÉFONO: +57 312 481 3094
WHATSAPP: +57 312 481 3094
HORARIO: Lun-Sáb 10AM-7PM
WEB: https://www.pipod.co
SERVICIOS: Reparación iPhone, MacBook, iPad, Apple Watch, Microsoldadura, Trade-in
DESCRIPCIÓN: Desde 2007. Garantía 12 meses. Diagnóstico gratis. Express 2h.
```

#### 📝 Mapa de Google Embebido (pendiente código)
- Ubicaciones: Footer + Contacto
- Componentes: `pipodFooter.astro`, `ContactLocation.astro`

### 🟡 MEDIUM IMPACT

| # | Tarea | Impacto | Riesgo | Estado |
|---|-------|---------|--------|--------|
| M1 | **FAQPage schema** | +0.2 | BAJO | ✅ COMPLETADO |
| M2 | **HowTo schema** — Guías "cómo cuidar tu iPhone" | +0.1 | BAJO | PENDIENTE |
| M3 | **Imágenes WebP** — Convertir principales a WebP | +0.3 | MEDIO | PENDIENTE |

### 🟢 LOW IMPACT

| # | Tarea | Impacto | Riesgo | Estado |
|---|-------|---------|--------|--------|
| L1 | **Core Web Vitals reales** — Medir post-deploy | +0.1 | NINGUNO | PENDIENTE |
| L2 | **Internal linking** — Blog → productos/servicios | +0.1 | BAJO | PENDIENTE |

### ⚡ INDEX-NOW

| # | Tarea | Estado |
|---|-------|--------|
| IN | **IndexNow Protocol** | ✅ COMPLETADO |

**SDD Artifacts:** `.atl/proposals/seo-10.md`, `.atl/specs/seo-10.md`, `.atl/design/seo-10.md`, `.atl/tasks/seo-10.md`

---

## 🚀 Nueva Arquitectura SEO-first (Modelo Propuesto)

> ⚠️ **Disclaimer**: Modelo estratégico. Antes de crear cualquier URL nueva debe validarse demanda real (volumen + intención) en Google para Colombia/Bogotá.

### 1. Principios
- 1 URL = 1 intención de búsqueda clara
- Separación estricta: servicios (transaccional) / tienda (producto) / contenidos (informacional)
- URLs simples, descriptivas y escalables
- Geolocalización solo donde aporta intención real

### 2. Estructura Principal (Nivel 1)
```
/servicio-tecnico-apple-bogota/
/reparacion-iphone/
/reparacion-macbook/
/plan-retoma/
/tienda/
/accesorios/
/blog/
/contacto/
```

### 3. Servicio Técnico (Pilar SEO Local)

**3.1 Página Pilar**
- `/servicio-tecnico-apple-bogota/`
- Objetivo: "servicio técnico Apple Bogotá", "reparación Apple Bogotá"

**3.2 Subcategorías por Dispositivo**
- `/servicio-tecnico-apple-bogota/iphone/`
- `/servicio-tecnico-apple-bogota/macbook/`
- `/servicio-tecnico-apple-bogota/ipad/`
- `/servicio-tecnico-apple-bogota/apple-watch/`

**3.3 Servicios Específicos (alto potencial SEO)**
- `/servicio-tecnico-apple-bogota/iphone/cambio-pantalla/`
- `/servicio-tecnico-apple-bogota/iphone/cambio-bateria/`
- `/servicio-tecnico-apple-bogota/iphone/reparacion-placa/`
- `/servicio-tecnico-apple-bogota/iphone/iphone-mojado/`
- `/servicio-tecnico-apple-bogota/macbook/cambio-bateria/`
- `/servicio-tecnico-apple-bogota/macbook/reparacion-teclado/`
- `/servicio-tecnico-apple-bogota/macbook/reparacion-placa/`

⚠️ Crear solo servicios con demanda validada.

### 4. Plan Retoma (Diferenciador SEO)
- `/plan-retoma/`
- Subpáginas si hay demanda: `/plan-retoma/vender-iphone-usado/`, `/plan-retoma/vender-macbook-usado/`

### 5. Tienda (Producto)
**5.1 Categorías**
- `/tienda/iphone/`, `/tienda/macbook/`, `/tienda/ipad/`, `/tienda/apple-watch/`
- Usados: `/tienda/iphone-usado/`, `/tienda/macbook-usado/`

**5.2 Fichas de Producto**
- `/tienda/iphone/iphone-13-128gb/`
- `/tienda/macbook/macbook-air-m1-256gb/`

### 6. Accesorios
- `/accesorios/`, `/accesorios/cargadores/`, `/accesorios/fundas/`, `/accesorios/audifonos/`

### 7. Blog (SEO Informacional)
**7.1 Categorías**
- `/blog/reparacion-iphone/`, `/blog/reparacion-macbook/`, `/blog/consejos-apple/`, `/blog/comparativas/`

**7.2 Artículos**
- `/blog/reparacion-iphone/como-saber-si-cambiar-bateria-iphone/`
- `/blog/reparacion-macbook/macbook-no-prende-que-hacer/`
- `/blog/comparativas/reparar-iphone-o-comprar-uno-nuevo/`

👉 Todos deben enlazar a servicios, plan retoma y tienda según intención.

### 8. SEO Local (Refuerzo)
- `/contacto/` (página optimizada)
- `/servicio-tecnico-apple-chapinero/` (solo si hay búsqueda real y sin duplicación)

### 9. Estructura de Enlazado Interno
- Home → páginas pilar
- Páginas pilar → servicios específicos
- Blog → servicios y plan retoma
- Productos → servicio técnico (mantenimiento / reparación)

### 10. Conclusión Estratégica
- Atacar keywords locales de alta intención
- Escalar sin romper la arquitectura
- Separar claramente cada tipo de intención SEO
- Facilitar enlazado interno y autoridad temática

🎯 **Idea clave**: Pipod no debe intentar posicionar "todo desde la home", sino convertir cada servicio y producto importante en un activo SEO propio.


### SDD: seo-url-hierarchy

| Artefacto | Ubicación | Engram |
|-----------|-----------|--------|
| Spec | `.atl/specs/seo-url-hierarchy.md` | [#184](https://app.engram.ai/astro-ecommerce/observation/184) |
| Design | `.atl/designs/seo-url-hierarchy.md` | [#184](https://app.engram.ai/astro-ecommerce/observation/184) |
| Tasks | `.atl/tasks/seo-url-hierarchy.md` | [#184](https://app.engram.ai/astro-ecommerce/observation/184) |
| State | `.atl/state/seo-url-hierarchy.yaml` | — |

📄 **Resumen completo:** `SEO-URL-HIERARCHY-RESUMEN.md` [Engram #184](#184)

### Distribución Servicios 2025 (Datos Reales)

**Engram:** [#185](https://app.engram.ai/astro-ecommerce/observation/185) — Datos completos de distribución
**Engram:** [#186](https://app.engram.ai/astro-ecommerce/observation/186) — Prioridades actualizadas con estrategia 2026

| Servicio | # | % | Prioridad SEO |
|----------|---|---|--------------|
| Batería/Energía | 36 | **28.3%** | 🔥 Alta |
| Pantalla/Imagen | 33 | **26.0%** | 🔥 Alta |
| Revisión/Otros | 19 | 15.0% | 🟡 Media |
| Software | 9 | 7.1% | 🟡 Media |
| Disco/RAM (Mejora) | 8 | 6.3% | 🟡 Media |
| Mantenimiento General | 8 | 6.3% | 🔥 Alta (subió) |
| Reparación Board/No Prende | 8 | 6.3% | 🟡 Media |
| Equipo Mojado/Humedad | 6 | 4.7% | 🟢 Baja |

**Key insight:** Baterías + Pantallas = 54.3%. MacBook ahora tan demandante como iPhone (ratio convergencia 8:1 → 1.6:1).

**Estrategia 2026:**
1. Recuperar demanda Mac con campañas específicas
2. Acelerar programas de batería recurrente para iPhone y Mac
3. Profesionalizar categorías "Revisión/Otros" (15% del negocio)

**Meta 2026:** 165 servicios (+30% sobre 2025)

### Prioridades ajustadas según datos 2025

| Sub-página | Prioridad | Basado en |
|-----------|-----------|-----------|
| **iPhone** | 🔥🔥 Alta | 57 casos, Batería 28.3% |
| **MacBook** | 🔥🔥 Alta | 47 casos, ahora tan demandante como iPhone |
| **Mantenimiento** | 🔥 Alta | 6.3% + estrategia 2026 |
| **iMac** | 🟡 Media | Mantenimiento + Disco/RAM |
| **Apple Watch** | 🟡 Media | Bajo volumen |


---

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
4. M2: HowTo schema
5. M3: WebP images
6. L1-L2: Core Web Vitals, internal linking

---

## 📝 NOTAS

- Build verificado: ✅ PASS (solo warnings de Sass)
- sitemap-index.xml genera correctamente
- robots.txt actualizado con Disallow rules
- Meta tags ahora dinámicos en todas las páginas
- SEO Score actual: ~8.2/10 (meta: 10/10)
- FAQPage Schema implementado en 3 páginas
- IndexNow Protocol configurado con key: `6e7e2464-...`
- Last deploy pendiente para activar cron

---

## 📁 ARCHIVOS MODIFICADOS (seo-10)

### Nuevos archivos:
- `src/components/SEO/FAQPageSchema.astro`
- `src/pages/api/index-now.ts`
- `public/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt`

### Archivos modificados:
- `src/pages/servicio-tecnico-apple.astro` (FAQPage + serviceFAQs)
- `src/pages/plan-retoma-apple.astro` (FAQPage + retomaFAQs)
- `src/pages/contacto-pipod.astro` (FAQPage + contactFAQs)
- `src/pages/api/sync-reviews.ts` (IndexNow integration)

---

**Última actualización:** 2026-05-05
**Estado:** M1 + IN completados, esperando deploy