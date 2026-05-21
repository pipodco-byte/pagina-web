# AGENTS.md — Astro-Ecommerce (Pipod.co)

Guía de convenciones, arquitectura y contexto histórico para agentes de IA que trabajen en este proyecto.

> 🔗 **Repo oficial:** [pipodco-byte/astroecoomerce](https://github.com/pipodco-byte/astroecoomerce) — Vercel deploya automáticamente desde `main` a www.pipod.co

---

## 1. Stack y Convenciones

| Aspecto | Detalle |
|---------|---------|
| **Framework** | Astro 6.1, modo `server` (SSR), adapter Vercel |
| **Frontend** | React 18, React Bootstrap 2.6 |
| **Lenguaje** | TypeScript strict — `NO` usar `any` |
| **Build** | Vite 5 |
| **Estilos** | SCSS + Bootstrap 5.3 CDN + custom CSS. **NO** Tailwind (fue removido en commit bb7370b) |
| **State** | Nanostores para comunicación cross-island. Persistencia en localStorage |
| **Icons** | Bootstrap Icons (CDN). FontAwesome como fallback |
| **Images** | `<img>` con `onerror` (no Astro `<Image>`) para OG images en `public/` |

### Reglas de Oro
1. **Bootstrap first**: Si existe componente Bootstrap, usarlo antes de custom.
2. **NO usar `any`**: TypeScript strict. Tipar TODO.
3. **NO agregar dependencias sin justificar** en el proposal correspondiente.
4. **"Chapinero FIRST"**: Todo contenido SEO prioriza Chapinero/Bogotá.
5. **Blog**: Fechas en español (`es-CO`), autor por defecto "Equipo Pipod" (`author: 'equipo-pipod'`).
6. **Build obligatorio**: `npm run build` debe pasar sin errores antes de cualquier commit.

---

## 2. Arquitectura de Carpetas

```
src/
├── components/{feature}/     # Organización por feature (NO por tipo de archivo)
│   ├── blog/                 # BlogCard*.astro, BlogFilter.jsx, BlogHeroSection, etc.
│   ├── cart/                 # Cart items, summary, modal
│   ├── checkout/             # CheckoutForm, payment methods
│   ├── products/             # CardProduct, productOverviewGrid, productSizes
│   ├── store/                # StoreWithFilters, category nav
│   ├── service/              # Service cards, device selector
│   ├── promo/                # pipodGoogleReviews, hero promos
│   └── gtm/                  # SectionTracker, useGTM
├── content/blog/             # 70+ artículos markdown con frontmatter Zod
├── layouts/
│   ├── Layout.astro          # Layout global (Navbar, Footer, GTM)
│   ├── BlogPostLayout.astro  # Layout individual de artículo (TOC, Related Posts)
│   └── BlogIndexLayout.astro # Layout de índice de blog
├── pages/
│   ├── api/                  # API routes SSR
│   │   ├── bold/             # create-link.ts, webhook.ts (Bold API Integration)
│   │   ├── products/         # index.ts, [sku].ts (Supabase products)
│   │   ├── sync-reviews.ts   # Sincronización Google Places
│   │   ├── newsletter.ts     # Suscripción Brevo
│   │   └── ...
│   ├── blog/                 # index.astro, [...slug].astro
│   ├── producto/[slug].astro # Página de producto individual
│   ├── tienda-pipod.astro    # Tienda con filtros
│   ├── checkout.astro        # Checkout
│   └── ...
├── lib/
│   ├── supabase/             # client.ts, types.ts, products.ts
│   ├── contentful.ts         # Adapter — ahora proxy a Supabase
│   ├── slug.ts               # slugify(nombre) para URLs
│   ├── bold-types.ts         # Tipos TypeScript Bold
│   └── hmac.ts               # Verificación HMAC webhooks
├── stores/                   # Nanostores (productStore.ts, cartStore.ts)
└── types/                    # Tipos globales
```

### Notas importantes
- **`src/store/`** y **`src/stores/`** ambos existen. Preferir **`src/stores/`** para nuevo código (productStore.ts está ahí).
- **`src/lib/contentful.ts`** ya NO tiene mock data — es un adapter que proxy a Supabase.
- **View `web_productos_complete`** en Supabase es requisito para que productos carguen.

---

## 3. Historial Completo del Blog (5 Iteraciones)

> **Contexto**: El blog ha pasado por 5 rediseños/evoluciones. Esta sección consolida TODO el historial en un solo lugar para que futuros agentes entiendan por qué existen múltiples componentes y estilos.

### Iteración 1: `blog-visual-upgrade` (OpenSpec, legacy)
- **Fecha**: ~Mayo 2026
- **Sistema**: OpenSpec (`openspec/changes/blog-visual-upgrade/`)
- **Enfoque**: Upgrade editorial con tema "Lexington Author"
- **Creaciones**:
  - `src/styles/blog-cards.css` — shared stylesheet para Astro + React
  - `src/components/blog/BlogCard.astro` — standalone Astro card
  - Instaló `reading-time` npm package
- **Conceptos clave**: Editorial typography, tokens `--pipod-*`, card metadata (date + reading time), hover lift+shadow
- **Estado**: DEPRECADO. Conceptualmente reemplazado por iteraciones 2-5. El paquete `reading-time` sobrevive.

### Iteración 2: `blog-editorial-redesign` (.atl/Engram)
- **Fecha**: Mayo 2026
- **Sistema**: Agent Teams Lite (`.atl/`)
- **Enfoque**: Rediseño editorial completo — cards estilo revista
- **Creaciones**:
  - `src/styles/_blog-editorial.scss` — CSS Grid, responsive breakpoints
  - `src/components/blog/BlogAuthor.astro`
  - `src/components/blog/BlogCardEditorial.astro` — card editorial estándar
  - `src/components/blog/BlogCardFeatured.astro` — card hero con overlay
  - `src/components/blog/BlogHeroFeatured.astro` — wrapper artículo destacado
- **Modificaciones**: `pipod-blog.astro`, `BlogFilter.jsx`
- **Técnicas**: CSS Grid (`auto-fill, minmax(300px, 1fr)`), `<img>` con `onerror`, avatar CSS-only con iniciales
- **Estado**: ARCHIVADO ✅ (2026-05-12). Build: 75 páginas, exit 0.

### Iteración 3: `blog-phanatik-enhancements` (.atl/Engram)
- **Fecha**: Mayo 2026
- **Sistema**: Agent Teams Lite (`.atl/`)
- **Enfoque**: 7 componentes nuevos inspirados en el diseño de Phanatik (estructura, no colores exactos)
- **Creaciones**:
  - `src/components/blog/BlogCardList.astro` — card de solo texto
  - `src/components/blog/BlogSidebar.astro` — navegación sidebar
  - `src/components/blog/BlogCardCompact.astro` — card horizontal compacta
  - `src/components/blog/BlogCardOverlay.astro` — overlay con gradiente
  - `src/components/blog/BriefsSection.astro` — wrapper de 3 BlogCardCompact
  - `src/components/blog/TopStoriesSection.astro` — 2 cols: overlay hero + 4 items lista
  - `src/components/blog/CategoriesGrid.astro` — grid responsive de categorías
  - `src/styles/_blog-phanatik.scss` — placeholders SCSS compartidos
- **Layout final de página**:
  ```
  BlogHeroFeatured → TopStoriesSection (overlay + lista)
    → BriefsSection (3 compactas)
    → BlogLayoutGrid (main: BlogFilter + aside: BlogSidebar + CategoriesGrid)
    → BlogCtaSection
  ```
- **Estado**: ARCHIVADO ✅ (2026-05-12). Build: 83+ páginas, exit 0. 457 Sass deprecation warnings (pre-existentes).

### Iteración 4: `blog-phanatik-visual-redesign` (.atl/Engram)
- **Fecha**: Mayo 2026
- **Sistema**: Agent Teams Lite (`.atl/`)
- **Enfoque**: Rediseño visual EXACTO de Phanatik — colores Pipod (azul/negro, no púrpura)
- **Creaciones** (8 componentes nuevos):
  - `BlogCardText.astro`, `BlogCardWrapper.astro`, `BlogSectionDivider.astro`
  - `BlogCardHero.astro`, `BlogCardSplit.astro`, `BlogCardGrid.astro`, `BlogCardMini.astro`
  - `BlogAside.astro`
- **Features añadidas**:
  - Grid 4 columnas
  - **TableOfContents flotante** — auto-genera de H2/H3, highlight on scroll
  - **Related Posts** — 3 cards relacionados por categoría/tags al final del artículo
  - **LoadMoreButton** — paginación (muestra 12, carga 12 más)
  - **Botones pill** — 100px radius, azul (#3A506B) → negro hover
  - **Author fix** — 70 posts con `author: 'equipo-pipod'`
- **Modificaciones**: `BlogPostLayout.astro`, `pipod-blog.astro`
- **Estado**: COMPLETADO ✅ (commit d9b13de + 621ab19). Build PASSED.

### Iteración 5: `separar-contenido-layout` (.atl/Engram)
- **Fecha**: Mayo 2026
- **Sistema**: Agent Teams Lite (`.atl/`)
- **Enfoque**: Migrar 73 artículos markdown a Astro Content Collections
- **Resultado**:
  - Artículos en `src/content/blog/` con schema Zod
  - Layouts en `src/layouts/BlogPostLayout.astro` y `BlogIndexLayout.astro`
  - Rutas: `/blog/{slug}`
- **Issue conocido**: Artículo 41 (`historia-pipod-bogota`) perdió 47 líneas en migración (tabla de hitos, testimonios, stats). Ver `PENDIENTES.md` BM1.
- **Estado**: COMPLETADO ✅

### Resumen Visual del Evolución

```
v1 blog-visual-upgrade (OpenSpec)        → cards editoriales Lexington
    ↓ (reemplazado conceptualmente)
v2 blog-editorial-redesign (.atl)        → CSS Grid, cards revista, hero featured
    ↓ (evolución visual)
v3 blog-phanatik-enhancements (.atl)     → 7 componentes Phanatik (estructura)
    ↓ (colores exactos Phanatik)
v4 blog-phanatik-visual-redesign (.atl)  → 8 componentes, grid 4 cols, TOC, Related, LoadMore
    ↓ (arquitectura de contenido)
v5 separar-contenido-layout (.atl)       → Content Collections, 73 artículos, layouts SEO
```

### Componentes del Blog Actuales (v4/v5)

| Componente | Origen | Uso actual |
|------------|--------|------------|
| `BlogPostLayout.astro` | v5 | Layout de artículo individual (TOC, Related Posts, OG) |
| `BlogIndexLayout.astro` | v5 | Layout de índice de blog |
| `BlogCardEditorial.astro` | v2 | Cards en listados |
| `BlogCardFeatured.astro` | v2 | Artículo destacado en hero |
| `BlogHeroFeatured.astro` | v2 | Wrapper de artículo destacado |
| `BlogCardList.astro` | v3 | Lista compacta de artículos |
| `BlogCardCompact.astro` | v3 | Cards horizontales (Briefs) |
| `BlogCardOverlay.astro` | v3 | Card con gradiente overlay |
| `TopStoriesSection.astro` | v3 | Sección hero + sidebar |
| `BriefsSection.astro` | v3 | Wrapper de 3 compactas |
| `BlogSidebar.astro` | v3 | Navegación sidebar |
| `CategoriesGrid.astro` | v3 | Grid de categorías |
| `BlogCardHero/Split/Grid/Mini.astro` | v4 | Grid 4 columnas Phanatik exacto |
| `BlogAside.astro` | v4 | Aside con categorías y navegación |
| `BlogFilter.jsx` | v1-v5 | Filtro y búsqueda de artículos (React) |
| `BlogHeroSection.astro` | v1-v5 | Hero del blog |
| `BlogCtaSection.astro` | v1-v5 | CTA final del blog |

---

## 4. Sistemas de Documentación

El proyecto usa **DOS sistemas simultáneos**. Ambos contienen información valiosa.

### A) OpenSpec (legacy) — `openspec/changes/`
Cambios técnicos tempranos. Documentación en fases: exploration → proposal → spec → tasks → design.

| Cambio | Estado |
|--------|--------|
| `50-articulos-seo/` | Completado — 70 artículos SEO |
| `blog-visual-upgrade/` | Deprecado — reemplazado por iteraciones 2-5 |
| `bold-api-checkout/` | PAUSADO — implementación completa, falta credenciales Bold |
| `supabase-products-integration/` | Completado ✅ |
| `fix-reviewwall-google-logo/` | Explorado — Tailwind v4 removido, potencialmente resuelto |

### B) Agent Teams Lite — `.atl/`
Cambios recientes con workflow SDD completo. Contiene proposals, specs, designs, tasks, state YAML.

| Cambio | Estado |
|--------|--------|
| `blog-editorial-redesign` | Archivado ✅ |
| `blog-phanatik-enhancements` | Archivado ✅ |
| `blog-phanatik-visual-redesign` | Completado ✅ |
| `separar-contenido-layout` | Completado ✅ |
| `seo2-semantic-hierarchy` | Tasks listos, apply pendiente |

### C) Engram (memoria persistente)
Guarda decisiones, arquitectura, bugfixes. Se sincroniza desde `.atl/` y `openspec/`.

**Para futuros agentes**: Si un cambio no está en Engram, revisa `openspec/changes/` y `.atl/` antes de asumir que no existe.

---

## 5. APIs Externas y Endpoints

### Bold API (Checkout)
- `POST /api/bold/create-link` — Crea link de pago via Bold `/v1/links`
- `POST /api/bold/webhook` — Webhook con verificación HMAC (`x-bold-signature`)
- **Estado**: Implementación completa pero PAUSADA. El llamado a Bold retorna 500. Posible causa: URL sandbox incorrecto o keys mal configuradas.

### Supabase (Productos)
- `GET /api/products/index.ts` — Lista productos Web
- `GET /api/products/[sku].ts` — Producto individual
- View requerida: `web_productos_complete`

### Google Reviews
- `GET /api/sync-reviews` — Sincroniza reseñas de Google Places
- Cron job: cada 3 días a las 6:00 AM (configurado en `vercel.json`)
- Reviews se sirven desde `/public/data/reviews.json` (generado en build, no en runtime)

### Email (Brevo)
- `POST /api/newsletter.ts` — Suscripción newsletter
- `POST /api/send-order-email.ts` — Email de confirmación de orden

### IndexNow (SEO)
- `POST /api/index-now.ts` — Notifica a Bing/Google de nuevas URLs

---

## 6. Build & Deploy

```bash
# Desarrollo
npm run dev

# Build (OBLIGATORIO antes de commit)
npm run build

# Preview
npm run preview
```

### Ramas Git
- `main` → producción (www.pipod.co) — deploy automático a Vercel `paginaweb-ecommerce`
- `develop` → desarrollo activo
- `memoria` → referencia visual (commit 241f9ce)

### CI/CD
- Auto-PR: push a `develop` dispara creación automática de PR (`.github/workflows/auto-pr.yml`)
- Deploy Vercel: `main` → `paginaweb-ecommerce` (www.pipod.co)
- Deploy manual: `vercel deploy --token=$TOKEN --yes --prod`
- Cron: `/api/sync-reviews` cada 3 días

### Warnings conocidos del build
- **457 Sass deprecation warnings** (`@import` → `@use`). Baja prioridad.
- **~40 CSS nesting warnings** (patrones BEM `&__selector`). Pre-existentes, no bloqueantes.

---

## 7. Issues Conocidos y Gotchas

| Issue | Detalle | Workaround |
|-------|---------|------------|
| **Map serialization** | `Map` no es JSON-serializable con `client:load` | Usar objetos planos o Nanostores |
| **Spread operator** | `{...producto}` con `client:load` causa 500 en Vercel | Pasar props explícitas |
| **FS read-only** | Vercel Serverless no permite `fs.writeFileSync` | Escribir en build-time, no runtime |
| **Condición "usado"** | DB tiene `"usado"` pero UI espera `"Seminuevo"` o `"Repotenciado"` | Mapping pendiente en `PENDIENTES.md` P3 |
| **Badge CSS** | No existe `.badge-usado` | Crear mapping a Seminuevo/Repotenciado |
| **Artículo 41** | `historia-pipod-bogota` perdió tabla de hitos + testimonios en migración | Restaurar desde `openspec/changes/50-articulos-seo/` si es necesario |
| **Author antiguo** | Algunos artículos pueden tener `author: "kimi"` en lugar de `"equipo-pipod"` | Corregir frontmatter si se encuentra |

---

## 8. Design System (Resumen)

Ver `Arquitectura.md` para el documento completo.

### Colores
- **Canvas**: Near Black `#1F1F1F`, Pure White `#ffffff`
- **Brand**: Deep Blue `#3A506B`, Tech Blue `#4A90E2`
- **Surface**: Light Surface `#F5F5F7`, Border Gray `#E5E5E7`

### Tipografía
- **Inter** (500–700): headings, UI primario
- **PT Mono** (400–500): labels, technical markers
- **Noto Sans** (400): body text

### Radios
- 8px: buttons, inputs
- 24px: standard cards
- 40px: bento cards
- 50px: pills, tags

### Container
- Max-width: 1440px
- Horizontal padding: 80px (desktop) → 40px (tablet) → 24px (mobile)

---

## 9. SEO Estratégico

### Estrategia Geográfica: Hub-and-Spoke
- **Hub**: Chapinero (Cll 63 #14-45) — ubicación física real
- **3 Spokes**: El Lago, La Soledad, Quinta Camacho
- **Regla**: "Chapinero FIRST" en todos los artículos

### Tags de contenido
- REPARACIONES APPLE BOGOTÁ (35 artículos)
- GUÍAS DE COMPRA (20 artículos)
- CONFIANZA EN TU TÉCNICO (15 artículos)

### Stats clave para copy
- 16 años de trayectoria
- 3,600+ equipos reparados
- 2,000+ baterías reemplazadas
- 98% satisfacción
- 5.0/90+ reviews Google

---

## 10. Plan Maestro: Blog Optimization v2 (Activo)

### Contexto
Los 73 artículos del blog fueron auditados y presentan gaps críticos que deben corregirse antes de cualquier campaña de indexación.

### Metodología: "Fórmula Pipod v2"
1. **Corrección Técnica:** Links internos (≥3), OG images, stats footer, info baterías, precios formato completo
2. **GEO Optimization:** Schema TechArticle/HowTo, author E-E-A-T, Expert Tips para LLMs
3. **Mejora de Escritura:** Recortar relleno técnico, hooks agresivos, tone pragmático
4. **Trust Nuggets (T&C):** Garantía 12 meses, protocolo backup, diagnóstico 1.5h
5. **Conversión:** CTAs mejorados, internal linking estratégico

### Batching
- **Batch 1:** Artículos 1-10 (Fase 1: iPhone, pantallas, baterías) — máximo impacto comercial
- **Batch 2-7:** Resto de fases

### Gaps Críticos
- 🔴 **0% links internos** (plan exige ≥3)
- 🔴 **0% imágenes OG reales**
- 🔴 **8% info real de baterías**
- 🟡 **30% estructura Skyscraper completa**
- 🟡 **47% stats unificados en footer**
- 🟡 **Garantía inconsistente** (12 meses vs 6 meses)
- 🟢 **Palabra "dispositivo"** en 9 artículos (prohibida)

### Reglas de Optimización
- **NO reescribir desde cero** — solo pulir, recortar relleno, agregar bloques
- **Respetar keywords indexadas** — analizar Search Console antes de modificar hooks
- **Mantener tone pragmático** — sin "dispositivo", sin "solamente", sin relleno
- **Chapinero PRIMERO** — mínimo 2 menciones por artículo
- **Stats unificados** — 16 años, 3,600+ equipos, 2,000+ baterías, 98% satisfacción, 5.0/90+ reviews

---

*Última actualización: Mayo 20, 2026*
*Si encuentras información desactualizada, actualiza este archivo y guárdala en Engram.*
