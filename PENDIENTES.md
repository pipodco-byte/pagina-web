# ⏳ Pendientes — Pipod Ecommerce (Astro)

**Última actualización:** Mayo 2026
**Versión:** 1.0
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

**Lección aprendida:** El endpoint `/api/test` mínimo (sin dependencias) devolvía 500 → problema de infraestructura Vercel, no del código.

---

## ✅ Funcionalidades Completadas (Mayo 2026)

| Item | Descripción | Status |
|------|-------------|--------|
| F1 | Props explícitas en CardProduct (MacBooks, iPhones, Accesorios) | ✅ |
| F2 | `tipo` prop diferenciado: `"equipo"` para iPhones/MacBooks, `"accesorio"` para accesorios | ✅ |
| F3 | ServiceCards sin border-top | ✅ |
| F4 | Blog section background #F8F9FA | ✅ |
| F5 | Hero padding-top 150px | ✅ |
| F6 | AppWrapper import case-sensitive (PipodNavbar) | ✅ |
| F7 | Cart Hydration fix — Nano Stores reemplaza React Context | ✅ |
| F8 | SEO — FAQPage Schema, IndexNow, Hub Schema | ✅ |

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
| P3 | Bold webhook real | Implementar verificación de firma HMAC | BOLD_INTEGRITY_SECRET ya configurado |

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

### 🟢 Baja Prioridad

| # | Tarea | Descripción |
|---|-------|-------------|
| B1 | Visual Entradas | Diseño posts individuales |
| B2 | Creación Visual | Piezas gráficas faltantes |
| B3 | Internal Linking | Blog → productos/servicios |
| B4 | HowTo Schema | Guías "cómo cuidar tu iPhone" |
| B5 | WebP Images | Convertir principales a WebP |

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
│   │   └── *.astro
│   └── lib/               # contentful.ts (mock data)
├── .atl/                  # SDD artifacts (vacío — usar engram)
├── PENDIENTES.md          # Este archivo
└── PENDIENTES_SEO.md      # SEO detallado
```

---

## 📋 Regla

Cuando preguntes "qué hay pendiente", **solo lee este archivo**.

Para detalle SEO completo, consulta `PENDIENTES_SEO.md`.

---

_Ultima actualizacion: Mayo 2026 (v1.0 - Post Vercel 500 crisis)_
