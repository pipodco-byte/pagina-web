# SEO URL Hierarchy — Resumen Completo

**Proyecto:** Pipod.co (Astro-Ecommerce)  
**Fecha:** 2026-05-22  
**Cambio:** `seo-url-hierarchy`  
**Engram IDs clave:** #184 (arquitectura completa), #185 (datos 2025), #186 (prioridades actualizadas)

---

## 1. Arquitectura SEO-first — Resumen

**Engram:** [#184](https://app.engram.ai/astro-ecommerce/observation/184)

### Navbar — Sub-menús

| Dropdown | Items |
|----------|-------|
| **Servicio Técnico ▼** | iPhone, MacBook, iMac, Apple Watch, Mantenimiento |
| **Tienda ▼** | iPhone, MacBook, iPad, Apple Watch, Cargadores y Cables, Carga Inalámbrica (MagSafe), Fundas y Protección, Audio (AirPods), Todos los Accesorios |
| **Blog ▼** | Reparaciones, Guías de Compra, Confianza |

**Nota:** Los 9 items de Tienda usan query params (`/tienda-pipod?filter=iphone`), no nuevas URLs.

### Servicio Técnico — URLs

| Tipo | URL |
|------|-----|
| **Pilar (renombrar)** | `/servicio-tecnico-apple-bogota/` ← actual: `/servicio-tecnico-apple` |
| **Sub-páginas** | `/servicio-tecnico-apple-bogota/{device}/` |

**5 sub-páginas:**
```
iphone/     → contenido específico iPhone (incluye mojados) [Engram #184]
macbook/     → contenido específico MacBook [Engram #184]
imac/        → contenido específico iMac [Engram #184]
apple-watch/ → contenido específico Apple Watch [Engram #184]
mantenimiento/ → contenido específico mantenimiento [Engram #184]
```

### Blog — 3 Categorías

| Categoría | # Artículos | Propósito |
|-----------|-------------|-----------|
| **REPARACIONES** | ~35 | Problema urgente — "mi equipo no funciona" |
| **GUÍAS** | ~25 | Decisión de compra — "cuál equipo me conviene" |
| **CONFIANZA** | ~13 | Cerca de convertir — "cómo saber si el técnico es bueno" |

**Historia Pipod → CONFIANZA:** El artículo `historia-pipod-bogota` es autoridad/marca personal.

### Tags Normalizados

```
# Dispositivos
iphone, macbook, imac, apple-watch, ipad

# Servicios
bateria, pantalla, teclado, carga, placa, software, mantenimiento, recuperacion-agua

# Geográficos
bogota, chapinero

# Propósito
guia, comparativa, confianza
```

**Regla:** 3-5 tags por artículo. No mezclar categorías.

---

## 2. Datos 2025 — Distribución Servicios

**Engram:** [#185](https://app.engram.ai/astro-ecommerce/observation/185)

| Servicio | # | % | Prioridad SEO |
|----------|---|---|--------------|
| Batería/Energía | 36 | **28.3%** | 🔥 Alta |
| Pantalla/Imagen | 33 | **26.0%** | 🔥 Alta |
| Revisión/Otros | 19 | 15.0% | 🟡 Media |
| Software | 9 | 7.1% | 🟡 Media |
| Disco/RAM (Mejora) | 8 | 6.3% | 🟡 Media |
| Mantenimiento General | 8 | 6.3% | 🔥 Alta (subió) |
| Reparación Board/No Prende | 8 | 6.3% | 🟡 Media |
| Equipo Mojado/Humedad | 6 | 4.7% | 🟢 Bajo |

**Key insight:** Baterías + Pantallas = 54.3% del negocio.

---

## 3. Prioridades de Ejecución

**Engram:** [#186](https://app.engram.ai/astro-ecommerce/observation/186)

| Orden | Sub-página | Razón |
|-------|-----------|-------|
| 1️⃣ | **iPhone** | 57 casos, 28.3% baterías — generar tráfico rápido |
| 2️⃣ | **MacBook** | 47 casos, estratégico 2026 (recuperar demanda Mac) |
| 3️⃣ | **Mantenimiento** | 6.3% + estrategia 2026 (baterías recurrentes) |
| 4️⃣ | **iMac** | Soporta mantenimiento (Disco/RAM) |
| 5️⃣ | **Apple Watch** | Menor volumen, hacer al final |

---

## 4. Estrategia 2026

**Engram:** [#185](https://app.engram.ai/astro-ecommerce/observation/185)

1. **Recuperar demanda Mac** con campañas específicas
2. **Acelerar programas de batería recurrente** para iPhone y Mac
3. **Profesionalizar "Revisión/Otros"** (15% del negocio)

**Meta 2026:** 165 servicios (+30% sobre 2025)

---

## 5. Decisiones Clave

| Decisión | Razón | Engram |
|----------|-------|--------|
| MacBook = prioridad máxima | Ratio baterías iPhone:Mac de 8:1 → 1.6:1 (convergencia) | #186 |
| Historia Pipod → CONFIANZA | Autoridad/marca personal | #184 |
| Mojados dentro de iPhone | 4.7% del negocio — tag `recuperacion-agua` | #184 |
| Plan Retoma: no subdividir | Sin demanda validada en search | #184 |
| Tienda: query params | Navbar apunta a `/tienda-pipod?filter=iphone` | #184 |
| URL rename: 301 redirect | Mantener autoridad de la URL actual | #184 |

---

## 6. Tech Stack

- **Framework:** Astro 6.1 SSR con adapter Vercel
- **Frontend:** React 18 para componentes interactivos (Navbar dropdowns)
- **Estilos:** SCSS + Bootstrap 5.3 (sin Tailwind)
- **Build:** `npm run build` debe pasar sin errores

---

## 7. Archivos del SDD

| Artefacto | Ubicación | Engram |
|-----------|-----------|--------|
| Spec | `.atl/specs/seo-url-hierarchy.md` | [#184](https://app.engram.ai/astro-ecommerce/observation/184) |
| Design | `.atl/designs/seo-url-hierarchy.md` | [#184](https://app.engram.ai/astro-ecommerce/observation/184) |
| Tasks | `.atl/tasks/seo-url-hierarchy.md` | [#184](https://app.engram.ai/astro-ecommerce/observation/184) |
| State | `.atl/state/seo-url-hierarchy.yaml` | — |

---

## 8. Tareas (Tasks)

| Phase | Tareas | Status |
|-------|--------|--------|
| **Phase 1: Navbar** | T1.1–T1.6 (dropdowns + mobile) | ⏳ Pending |
| **Phase 2: URL Rename** | T2.1–T2.3 (rename + 301 + 23 links) | ⏳ Pending |
| **Phase 3: Sub-páginas** | T3.1–T3.8 (5 device pages + schema) | ⏳ Pending |
| **Phase 4: Blog categorías** | T4.1–T4.7 (73 artículos re-clasificar) | ⏳ Pending |
| **Phase 5: Blog archive pages** | T5.1–T5.6 (3 páginas de archivo) | ⏳ Pending |
| **Phase 6: Links internos** | T6.1–T6.9 (actualizar todos los links) | ⏳ Pending |
| **Phase 7: Verify** | T7.1–T7.7 (build + deploy + test) | ⏳ Pending |

**Total: 40+ tareas en 7 fases**

---

## 9. Dependencias

```
T2 (rename) antes de T3 (sub-páginas)
T4 (normalizar categorías) puede correr en paralelo
T5 (páginas archivo) después de T4
T1 (navbar) y T6 (links) son independientes pero T6 depende de T3
```

---

## 10. Nota sobre "Mojados"

- **Mojados** = equipo húmedo/mojado
- **Tag:** `recuperacion-agua`
- **Ubicación:** Contenido dentro de iPhone (no página propia)
- **Volumen:** 6 casos (4.7%) — bajo pero puede ser alto margen

---

## 11. Nota sobre Inversión Marketing

**FUERA DEL ALCANCE DE ESTE PROYECTO WEB**

La inversión de ~9,800 USD para marketing digital es una conversación presupuestal separate.

---

## 12. Trazabilidad Completa — Engram IDs del Proyecto

### Arquitectura SEO-first (este cambio)

| Engram | Tema | Ubicación |
|--------|------|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first — Plan completo (navbar, URLs, blog, tags, decisiones) | Este documento passim |
| [#185](https://app.engram.ai/astro-ecommerce/observation/185) | Datos distribución servicios 2025 (127 servicios, -35.5%, estrategia 2026) | Secciones 2, 4 |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades actualizadas con datos 2025 (MacBook = iPhone) | Secciones 3, 5 |

### Blog Optimization v2 (cambio relacionado)

| Engram | Tema | Estado |
|--------|------|--------|
| [#179](https://app.engram.ai/astro-ecommerce/observation/179) | Proposal Blog Optimization v2 Refinado (data-driven) | draft |
| [#175](https://app.engram.ai/astro-ecommerce/observation/175) | Plan Maestro GEO + Trust (73 posts) | activo |
| [#172](https://app.engram.ai/astro-ecommerce/observation/172) | Proposal Blog Polish (GEO + Trust + Conversion) | draft |
| [#141](https://app.engram.ai/astro-ecommerce/observation/141) | Audit H2/H3 generic headers — SEO2 Semantic Hierarchy | completado |
| [#127](https://app.engram.ai/astro-ecommerce/observation/127) | Exploration Blog Phanatik Fixes (70 artículos) | completado |
| [#119](https://app.engram.ai/astro-ecommerce/observation/119) | Proposal Blog Phanatik Visual Redesign | completado |
| [#113](https://app.engram.ai/astro-ecommerce/observation/113) | Design blog-phanatik-enhancements | completado |
| [#107](https://app.engram.ai/astro-ecommerce/observation/107) | Design blog-editorial-redesign | completado |
| [#105](https://app.engram.ai/astro-ecommerce/observation/105) | Proposal Blog Editorial Redesign | completado |
| [#98](https://app.engram.ai/astro-ecommerce/observation/98) | Proposal blog-visual-upgrade (Lexington Author) | completado |
| [#97](https://app.engram.ai/astro-ecommerce/observation/97) | Exploration blog-visual-upgrade | completado |
| [#94](https://app.engram.ai/astro-ecommerce/observation/94) | State sdd/astro-ecommerce — blog-phanatik-enhancements | completado |

### Blog Content (artículos y migración)

| Engram | Tema | Estado |
|--------|------|--------|
| [#147](https://app.engram.ai/astro-ecommerce/observation/147) | Auditoría OPENSPEC vs CONTENT BLOG — Pérdida de contenido (artículo 41) | completado |
| [#118](https://app.engram.ai/astro-ecommerce/observation/118) | Archive Report blog-phanatik-enhancements | archivado |
| [#116](https://app.engram.ai/astro-ecommerce/observation/116) | Apply Progress blog-phanatik-enhancements | completado |

### Otros cambios

| Engram | Tema | Estado |
|--------|------|--------|
| [#158](https://app.engram.ai/astro-ecommerce/observation/158) | Exploration Footer de Términos (reemplazar emails) | completado |
| [#154](https://app.engram.ai/astro-ecommerce/observation/154) | Design actualizar Términos y Condiciones | completado |

### Cómo usar esta traceability

1. **Para investigar un tema específico:** Buscar el Engram ID en Engram → obtener contexto completo
2. **Para entender decisiones:** Los Engram contienen "What/Why/Where/Learned"
3. **Para continuar un cambio:** Revisar el estado del SDD y el apply-progress en Engram
4. **Para recuperar información perdida:** Engram tiene todo el contexto de las conversaciones

---

*Documento generado: 2026-05-22*
*Última actualización: 2026-05-22*