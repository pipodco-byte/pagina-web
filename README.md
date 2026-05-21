# Pipod.co — Astro Ecommerce

[![Astro](https://img.shields.io/badge/Astro-6.1-BC52EE?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)](https://vercel.com)

Sitio web de **Pipod** — servicio técnico Apple especializado en Bogotá con tienda online de equipos y accesorios.

**URL producción:** [https://www.pipod.co](https://www.pipod.co)

### 🔗 Repositorio Oficial

| Dato | Valor |
|------|-------|
| **GitHub** | [pipodco-byte/astroecoomerce](https://github.com/pipodco-byte/astroecoomerce) |
| **Usuario/Org** | `pipodco-byte` |
| **Vercel** | `paginaweb-ecommerce` (team: Pipod's projects) |
| **Rama producción** | `main` → deploy automático a www.pipod.co |
| **Rama desarrollo** | `develop` |

> ⚠️ Este es el **único** repositorio oficial. El repo `pagina-web` es obsoleto y debe ignorarse.

---

## 🚀 Proyectos Activos

| Proyecto | Estado | Prioridad |
|----------|--------|-----------|
| **Blog Optimization v2** | ⏳ Listo para Batch 1 | 🔥🔥🔥 Alta |
| **Google Reviews Automation** | ✅ Diseñado (Supabase `business_stats`) | 🔥🔥 Media |
| **Seguridad P0** | ✅ Remediado | ✅ Completado |

### Blog Optimization v2
Optimización de 73 artículos mediante corrección técnica, GEO optimization, mejora de escritura y Trust Nuggets de T&C. Ver `PENDIENTES.md` para detalles.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 6.1 (SSR, modo `server`) |
| Frontend | React 18 + React Bootstrap 2.6 |
| Lenguaje | TypeScript (strict) |
| Build | Vite 5 |
| Estilos | SCSS + Bootstrap 5.3 CDN + Custom CSS |
| State | Nanostores (cross-island, localStorage persistence) |
| CMS | Contentful (blog) |
| Base de datos | Supabase (productos, variantes) |
| Pagos | Bold API Integration + Wompi (legacy) |
| Email | Brevo API |
| Reviews | Google Places API |
| Deploy | Vercel adapter |

---

## Scripts

```bash
npm run dev       # Servidor de desarrollo (localhost:4321)
npm run build     # Build de producción
npm run preview   # Preview del build
npm run astro     # CLI de Astro
```

---

## Estructura del Proyecto

```
Astro-Ecommerce/
├── src/
│   ├── components/           # 28+ carpetas feature-based
│   │   ├── blog/             # Componentes del blog (cards, hero, filter, aside)
│   │   ├── cart/             # Carrito de compras
│   │   ├── checkout/         # Checkout y formularios
│   │   ├── products/         # Cards, grids, filtros de productos
│   │   ├── promo/            # Reviews, promociones
│   │   └── ...               # home, store, service, retoma, gtm, etc.
│   ├── content/blog/         # 70+ artículos SEO (Astro Content Collections)
│   ├── layouts/              # Layout.astro, BlogPostLayout, BlogIndexLayout
│   ├── pages/
│   │   ├── api/              # API routes SSR
│   │   │   ├── bold/         # create-link.ts, webhook.ts
│   │   │   ├── products/     # index.ts, [sku].ts
│   │   │   ├── sync-reviews.ts
│   │   │   ├── newsletter.ts
│   │   │   └── ...
│   │   ├── blog/             # Índice y artículos individuales
│   │   ├── producto/[slug].astro
│   │   ├── tienda-pipod.astro
│   │   ├── checkout.astro
│   │   └── ...
│   ├── lib/
│   │   ├── supabase/         # client.ts, types.ts, products.ts
│   │   ├── contentful.ts     # Adapter (ahora proxy a Supabase)
│   │   ├── slug.ts           # Generación de slugs
│   │   ├── bold-types.ts     # Tipos Bold API
│   │   └── hmac.ts           # Verificación HMAC webhooks
│   ├── stores/               # Nanostores (productStore.ts, cartStore.ts)
│   └── types/                # Tipos TypeScript globales
├── public/                   # Imágenes, favicon, robots.txt
├── openspec/changes/         # Cambios documentados (OpenSpec legacy)
├── .atl/                     # SDD artifacts (propuestas, specs, tasks, state)
├── PENDIENTES.md             # Fuente de verdad de tareas
├── PENDIENTES_SEO.md         # Plan SEO detallado
└── Arquitectura.md           # Design system Pipod
```

---

## Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
# Supabase
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=

# Bold (legacy botón + nueva API Integration)
PUBLIC_BOLD_API_KEY=
BOLD_INTEGRITY_SECRET=
BOLD_SANDBOX_ENABLED=true
BOLD_SANDBOX_API_KEY=

# Google Reviews
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=

# Email (Brevo)
BREVO_API_KEY=

# Contentful (legacy blog)
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

---

## Documentación

| Archivo | Propósito |
|---------|-----------|
| `PENDIENTES.md` | **Fuente de verdad** — bugs, features, plan SEO, tareas activas |
| `Todo.md` | Resumen ejecutivo de prioridades inmediatas |
| `PENDIENTES_SEO.md` | Auditoría SEO completa, plan 6.5→9+ |
| `Arquitectura.md` | Design system — colores, tipografía, componentes |
| `SETUP.md` | Guía de setup detallada |
| `GTM_INTEGRATION_GUIDE.md` | Integración Google Tag Manager |
| `TESTING_GUIDE.md` | Estrategia de testing |
| `AGENTS.md` | Guía para agentes de IA — convenciones, historial, reglas |

---

## Estado Actual (Mayo 2026)

### ✅ Completado recientemente
- Supabase products integration (productos vivos, no mock data)
- Bold API checkout (implementación completa, pausada por credenciales)
- Blog: 70+ artículos SEO migrados a Content Collections
- Blog: 3 rediseños visuales completados (editorial → Phanatik → visual exacto)
- TableOfContents flotante, Related Posts, LoadMoreButton
- SEO: Jerarquía semántica H1/H2/H3, FAQPage Schema, IndexNow, Hub Schema

### ⏳ Pendientes activos
- Normalización condición productos (`usado` → `Seminuevo`/`Repotenciado`)
- Share buttons en artículos del blog
- Newsletter mejorado
- WebP images + lazy loading
- Meta titles/descriptions dinámicos
- Verificar indexación Google de 73 URLs nuevas

---

## Contribuir

1. Ramas principales: `main` (producción), `develop` (desarrollo activo)
2. Auto-PR: push a `develop` dispara creación automática de PR
3. Build debe pasar (`npm run build`) antes de merge

---

*Última actualización: Mayo 2026*
