# 📋 Todo.md — Pipod Ecommerce

**Última actualización:** Junio 1, 2026
**Versión:** 1.3
**Referencia:** PENDIENTES.md (fuente de verdad)
**Repo:** [pipodco-byte/astroecoomerce](https://github.com/pipodco-byte/astroecoomerce)

---

## 🎯 Prioridad Inmediata (Esta semana)

### 🔴 Alta Prioridad — Blog Optimization v2

| # | Tarea | Estimado | Estado |
|---|-------|----------|--------|
| **B1** | **Batch 1: Artículos 1-10** (iPhone, pantallas, baterías) — Corrección técnica + GEO + Trust + Conversión | 8h | ⏳ |
| **B2** | **Auditoría Search Console** antes de modificar hooks (mitigar riesgo keywords) | 1h | ⏳ |
| **B3** | **Crear template CSS** para Expert Tip y Trust Blocks (consistencia visual) | 2h | ⏳ |
| **B4** | **Generar imágenes OG** Batch 1 (1200x630) o sistema OG dinámico | 3h | ⏳ |

### 🔴 Alta Prioridad — SEO Quick Wins

| # | Tarea | Estimado | Estado |
|---|-------|----------|--------|
| **1** | **Schema LocalBusiness** (JSON-LD en Layout.astro) | 2h | ✅ |
| **2** | **Jerarquía Semántica H1/H2/H3** (verificar/ajustar headers) | 4h | ✅ |
| **3** | **Share buttons blog** (izquierda, estilo Phanatik) | 2h | ⏳ |
| **4** | **Términos y Condiciones** (actualización Mayo 2026) | 1h | ✅ |
| **5** | **BN2 Newsletter mejorado** (diseño + spec) | 4h | ⏳ |

### 🟡 Media Prioridad — Blog

| # | Tarea | Estimado | Estado |
|---|-------|----------|--------|
| **5** | **Open Graph dinámico** por artículo | 4h | ⏳ |
| **6** | **OG article tags** (article:published_time, author, section) | 2h | ⏳ |
| **7** | **HowTo Schema** para blog guides | 2h | ⏳ |

---

## 📅 Plan SEO (6.5 → 9+)

### Fase 1: Quick Wins (Esta semana)

| # | Tarea | Estado |
|---|-------|--------|
| SEO1 | **Schema LocalBusiness** (JSON-LD) | ✅ |
| SEO2 | **Jerarquía Semántica** (H1/H2/H3) | ✅ |
| SEO3 | **WPO: Imágenes WebP** | ⏳ |
| SEO4 | **Lazy loading** | ⏳ |

### Fase 2: Optimización (Próxima semana)

| # | Tarea | Estado |
|---|-------|--------|
| SEO5 | **Meta titles dinámicos** | ⏳ |
| SEO6 | **Meta descriptions únicas** | ⏳ |
| SEO7 | **HowTo Schema** | ⏳ |
| SEO8 | **Product Schema + AggregateRating** | ⏳ |

### Fase 3: Arquitectura (Largo plazo)

| # | Tarea | Estado |
|---|-------|--------|
| SEO9 | Arquitectura Silo (landings) | 📋 |
| SEO10 | Blog → Servicio links | ⏳ |
| SEO11 | Citations locales | 📋 |
| SEO12 | Reviews con fotos | 📋 |

---

## 🏗️ Productos / Inventario

| # | Tarea | Estado |
|---|-------|--------|
| P3 | **Normalización condición** (usado → Seminuevo/Repotenciado) | ⏳ |
| P4 | Badge CSS `badge-usado` | ⏳ |
| M10 | **web_productos_complete view** en Supabase | ⏳ |
| M9 | Carga Inventario | ⏳ |

---

## 🎨 Diseño / UI

| # | Tarea | Estado |
|---|-------|--------|
| M1 | Mobile Responsive (revisión total) | ⏳ |
| M3 | Diseño Blog (pulir) | ⏳ |
| M4 | Diseño ProductShop | ⏳ |
| M5 | Servicio Técnico (/servicio-tecnico-apple) | ⏳ |
| M6 | Card MacBook (quitar "añadir a carrito") | ⏳ |

---

## 📊 Métricas

| Métrica | Actual | Meta |
|---------|--------|------|
| SEO Score | ~6.5/10 | 9+ |

---

## 📁 Archivos de Referencia

| Archivo | Descripción |
|---------|-------------|
| `PENDIENTES.md` | Fuente de verdad completa |
| `PENDIENTES_SEO.md` | Auditoría SEO detallada |

---

## ✅ Completado Recientemente

> ⚠️ **Regla**: Los detalles viven en engram. `.md` solo tiene referencias.

### Historial Reciente (engram)

| Fecha | Tema | Observation ID |
|-------|------|---------------|
| Jun 1, 2026 | iPhone page redesign + reviews fix | `obs-dc79c9b3ab403e83` |
| Jun 1, 2026 | PR workflow + origin warning | `obs-0d47e5c2424e75db` |
| Jun 1, 2026 | Reviews JSON primary source | `obs-0353bb3f1cb4ae43` |
| Jun 1, 2026 | Session June 1 completa | `obs-d0ba34c28a4966ce` |
| Mayo 22 | Navbar React → Astro + dropdown redesign | ver `sdd/migrate-navbar-react-to-astro/*` |
| Mayo 22 | iPhone page created | `src/pages/servicio-tecnico-apple-bogota/iphone.astro` |

### Completado esta sesión (Junio 1, 2026)
- ✅ iPhone: image ON TOP cards, FAQ 2-column, asymmetric grid, H2s naturales
- ✅ Reviews: JSON as primary source (98 reviews)
- ✅ PR #1 + PR #2 merged
- ✅ Navbar: iPad added, Accesorios removed

### ⚠️ Pendiente Crítico (Post-Hoy)
- **Rotación de Claves**: Generar nuevas claves (Brevo, Google, Bold, Supabase) y configurarlas en **Vercel Dashboard**. 
- **Nuevo Clon**: Hacer un `git clone` limpio del repo oficial.
- **Remediación**: Finalizar limpieza de secretos pendientes (si alguno persiste).

---

_Last updated: Junio 1, 2026 (v1.3)_