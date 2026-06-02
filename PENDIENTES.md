# ⏳ Pendientes — Pipod Ecommerce (Astro)

**Última actualización:** Junio 1, 2026
**Versión:** 1.7
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

### Gaps Críticos Identificados (Auditoría)
- 🔴 **0% links internos** (plan exige ≥3)
- 🔴 **0% imágenes OG reales**
- 🔴 **8% info real de baterías** (plan lo exige)
- 🟡 **30% estructura Skyscraper completa**
- 🟡 **47% stats unificados en footer**
- 🟡 **Garantía inconsistente** (12 meses vs 6 meses)
- 🟢 **Palabra "dispositivo"** en 9 artículos (prohibida)

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
| F23 | **Navbar React → Astro Migration** — Eliminó hydration errors, 15-20KB JS removed | ✅ | ae2922a |
| F24 | **Navbar Dropdown Visual Redesign** — Glassmorphism, iconos limpios, centrado, slide animation | ✅ | 10c7418 + bb1b35e |

---

## 📅 Historial de cambios (Junio 1, 2026)

| Tipo | Descripción | Status |
|------|-------------|--------|
| **Navbar** | React → Astro migration + dropdown visual redesign | ✅ Live |
| **Content** | Actualización T&C (Mayo 2026) | ✅ Live |
| **Repo** | Consolidación en `pipodco-byte/astroecoomerce` | ✅ |
| **Security** | Remediación P0 (Limpieza Git + Refactor API) | ✅ |
| **Docs** | Organización de archivos `.md` | ✅ |
| **SEO** | Agregado `about` a Schema TermsPage | ✅ |
| **Reviews** | Google Reviews Automation (Supabase `business_stats`) | ✅ Committed |
| **SEO** | Propuesta Blog Optimization v2 (GEO + Trust + Conversion) | ✅ Propuesta creada |

---

## 🚀 Proyecto Activo: Blog Optimization v2

### Objetivo
Optimizar 73 artículos de blog mediante corrección técnica, GEO optimization, mejora de escritura, integración de Trust Nuggets de T&C y CRO.

### Metodología: "Fórmula Pipod v2"
1. **Corrección Técnica:** Links internos (≥3), OG images, stats footer, info baterías, precios formato completo
2. **GEO Optimization:** Schema TechArticle/HowTo, author E-E-A-T, Expert Tips para LLMs
3. **Mejora de Escritura:** Recortar relleno técnico, hooks agresivos, tone pragmático
4. **Trust Nuggets (T&C):** Garantía 12 meses, protocolo backup, diagnóstico 1.5h
5. **Conversión:** CTAs mejorados, internal linking estratégico

### Batching (7 lotes)
| Batch | Artículos | Focus | Impacto |
|-------|-----------|-------|---------|
| **Batch 1** | 1-10 (Fase 1) | iPhone, pantallas, baterías | 🔥🔥🔥 Máximo |
| **Batch 2** | 11-20 (Fase 1) | iPhone, pantallas, baterías | 🔥🔥 Alto |
| **Batch 3-4** | 21-40 (Fase 2) | Guías y autoridad | 🔥🔥 Alto |
| **Batch 5** | 41-55 (Fase 3) | Confianza y diferenciación | 🔥 Medio |
| **Batch 6-7** | 56-73 (Fase 4) | Nichos específicos | 🔥 Medio |

### 📋 Estrategia de Aplicación (2-Track)

| Track | Artículos | Acciones |
| :--- | :--- | :--- |
| **Track A (Estándar)** | 66 artículos | Hook (Intro), Expert Tip, Trust Nuggets, Internal Linking |
| **Track B (7 Joyas)** | 7 artículos | Expert Tip, Trust Nuggets, Internal Linking (Lecturas Relacionadas) |

> **Regla de oro Track B:** El texto original del autor es **sagrado**. El script solo inyecta bloques técnicos al final del archivo.

### 🎯 7 Joyas (Artículos Protegidos - Protocolo de Cuido)
| Artículo | ¿Por qué es especial? |
|----------|-----------------------|
| `41-historia-pipod-bogota.md` | ADN Pipod - Narrativo |
| `42-protocolo-diagnostico-pipod-bogota.md` | ADN Pipod - Estratégico |
| `43-por-que-elegir-pipod-bogota.md` | ADN Pipod - Estratégico |
| `45-tecnico-apple-confiable-bogota.md` | ADN Pipod - Estratégico |
| `46-experiencia-pipod-16-anos-bogota.md` | ADN Pipod - Estratégico |
| `47-resenas-pipod-bogota.md` | ADN Pipod - Estratégico |
| `53-casos-exito-pipod-bogota.md` | ADN Pipod - Estratégico |


### Datos de Search Console Integrados (Feb-May 2026)
**Análisis realizado:** 2026-05-20

**Métricas agregadas:**
- Clics totales: 114 (49% brand "pipod", 51% non-brand = 58 clics)
- Impresiones: 2,630
- CTR: 4.3%
- Posición media: 8.2

**Keywords Frontier (Pos. 6-11) — Quick Wins inmediatos:**
| Keyword | Posición | Clics | Impresiones | CTR | Artículo objetivo |
|---------|----------|-------|-------------|-----|-------------------|
| `servicio tecnico iphone bogota` | 8.29 | 0 | 7 | 0% | `02-servicio-tecnico-iphone-bogota.md` |
| `cambio bateria iphone` | 10 | 0 | 5 | 0% | `01-cambio-bateria-iphone-chapinero.md` |
| `servicio tecnico apple bogota` | 24.11 | 0 | 19 | 0% | `08-servicio-tecnico-apple-bogota.md` |
| `arreglo iphone bogota` | 20 | 1 | 2 | **50%** | `01-reparacion-iphone-chapinero.md` |

**Discrepancias críticas (impresiones sin clics):**
- `apple retoma` — 13 impresiones, 0 clics, pos. 14.77
- `reparacion apple` — 13 impresiones, 0 clics, pos. 42.85
- `servicio tecnico apple` — 11 impresiones, 0 clics, pos. 32.27

**Hallazgo técnico crítico:** 0% internal linking manual verificado en los 73 artículos. El template de Related Posts automáticos es insuficiente. Los artículos están aislados sin conectividad semántica.

**Artículos priorizados por datos reales (Batch 1 Real):**
1. `02-servicio-tecnico-iphone-bogota.md` → `servicio tecnico iphone bogota` (8.29)
2. `01-cambio-bateria-iphone-chapinero.md` → `cambio bateria iphone` (10)
3. `01-reparacion-iphone-chapinero.md` → `arreglo iphone bogota` (20, CTR 50%)
4. `02-cambio-pantalla-iphone-bogota.md` → `cambio pantalla iphone bogota`
5. `05-iphone-no-enciende-bogota.md` → `iphone no enciende bogota`
6. `08-servicio-tecnico-apple-bogota.md` → `servicio tecnico apple bogota` (24.11)
7. `25-donde-reparar-iphone-bogota.md` → `donde reparar iphone bogota`
8. `64-recuperacion-datos-iphone-bogota.md` → `recuperacion datos iphone`
9. `40-reparacion-apple-watch-bogota.md` → Apple Watch cluster
10. `61-apple-watch-no-enciende-bogota.md` → Apple Watch cluster

### Estado
⏳ **Listo para `sdd-spec` del Batch 1** (priorizado por datos de Search Console)

## 📅 Commits de Hoy (Junio 1, 2026)

| Commit | Descripción |
|--------|-------------|
| `ae2922a` | **feat:** migrate navbar from React to Astro |
| `10c7418` | **feat:** dropdown visual redesign — glassmorphism, clean icons, hover lift |
| `fe914fc` | **fix:** dropdown icons — 22px font-size, centered, vertical-align reset |
| `75764e7` | **fix:** display inline-flex on .item-icon so it centers with text-align |
| `44034e3` | **fix:** increase selector specificity .pipod-dropdown-menu .dropdown-item to beat Bootstrap CSS |
| `bb1b35e` | **fix:** Servicio Técnico dropdown — centered + 10vw right shift so all 5 items visible |
| `d77fd7a` | **feat:** Servicio Técnico dropdown centered on viewport + slide-down animation |
| `984441d` | **revert:** SVG icons commit (user preferred Bootstrap Icons) |

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
| P10 | **Implementación Arquitectura SEO-first** | Navbar con sub-menus, URLs servicio con sub-páginas, blog 3 categorías, tags normalizados | SDD: seo-url-hierarchy [Engram #184](#184) |
| P10.1 | Navbar: Servicio Técnico ▼ + Tienda ▼ + Blog ▼ | Sub-menús con 9 items Tienda, 5 items Servicio, 3 Blog | SDD: seo-url-hierarchy |
| P10.2 | Renombrar /servicio-tecnico-apple → /servicio-tecnico-apple-bogota | URL pilar con geolocalización | SDD: seo-url-hierarchy |
| P10.3 | Crear 5 sub-páginas servicio (prioridad alta: iPhone + MacBook primero) | URLs: /servicio-tecnico-apple-bogota/{device}/ | SDD: seo-url-hierarchy |
| P10.4 | Normalizar categorías blog: REPARACIONES (~35), GUÍAS (~25), CONFIANZA (~13) | Los 73 artículos reclasificados por tipo de contenido | SDD: seo-url-hierarchy |
| P10.5 | Normalizar tags: dispositivos + servicios + geo + propósito | 3-5 tags por artículo, sin mezclar | SDD: seo-url-hierarchy |
| P10.6 | Crear páginas de archivo blog por categoría | /blog/reparaciones/, /blog/guias/, /blog/confianza/ | SDD: seo-url-hierarchy |

**Prioridades basadas en datos 2025:**
- 🔥🔥 iPhone + MacBook: prioridad máxima (57+47 casos, 54.3% del negocio)
- 🔥 Mantenimiento: prioridad alta (6.3% + estrategia 2026)
- 🟡 iMac, Apple Watch: media

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

_Ultima actualizacion: Junio 1, 2026 (v1.7 - Navbar React→Astro + dropdown redesign completo)_
