# 📋 Todo.md — Pipod Ecommerce

**Última actualización:** Mayo 20, 2026
**Versión:** 1.1
**Referencia:** PENDIENTES.md (fuente de verdad)
**Repo:** [pipodco-byte/astroecoomerce](https://github.com/pipodco-byte/astroecoomerce)

---

## 🎯 Prioridad Inmediata (Esta semana)

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

## ✅ Completado hoy (Mayo 20, 2026)

- **Términos y Condiciones** Mayo 2026 (Live)
- **Consolidación repositorio** `pipodco-byte/astroecoomerce` (oficial)
- **Remediación Seguridad (P0)**: Limpieza Git, Refactor API (process.env), validación build
- **Organización Documentación**: 63 archivos históricos movidos a `_revisar_para_eliminar/`
- **SEO/Geo**: `taxID` en schema, títulos H2 optimizados, `about` en TermsPageSchema
- **CI/CD**: Workflow Vercel configurado

### ⚠️ Pendiente Crítico (Post-Hoy)
- **Rotación de Claves**: Generar nuevas claves (Brevo, Google, Bold, Supabase) y configurarlas en **Vercel Dashboard**. 
- **Nuevo Clon**: Hacer un `git clone` limpio del repo oficial.
- **Remediación**: Finalizar limpieza de secretos pendientes (si alguno persiste).

---

_Last updated: Mayo 20, 2026 (v1.1)_