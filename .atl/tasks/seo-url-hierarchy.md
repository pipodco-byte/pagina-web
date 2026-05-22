# SDD Tasks: seo-url-hierarchy

**Change:** `seo-url-hierarchy`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** [#184](https://app.engram.ai/astro-ecommerce/observation/184) — Arquitectura SEO-first completa  

---

## Phase 1: Navbar (sub-menús)

- [ ] **T1.1** Actualizar `pipodNavbar.tsx` — agregar dropdown "Servicio Técnico ▼" con 5 items
- [ ] **T1.2** Actualizar `pipodNavbar.tsx` — agregar dropdown "Tienda ▼" con 9 items
- [ ] **T1.3** Actualizar `pipodNavbar.tsx` — agregar dropdown "Blog ▼" con 3 items
- [ ] **T1.4** Implementar hover dropdowns en desktop (CSS)
- [ ] **T1.5** Implementar accordion en mobile
- [ ] **T1.6** Test: verificar dropdowns en desktop y mobile

---

## Phase 2: Servicio Técnico — URL Rename

- [ ] **T2.1** Renombrar `src/pages/servicio-tecnico-apple.astro` → `servicio-tecnico-apple-bogota.astro`
- [ ] **T2.2** Crear redirect 301 en `vercel.json` o `_redirects`: `/servicio-tecnico-apple` → `/servicio-tecnico-apple-bogota`
- [ ] **T2.3** Actualizar todos los links hardcodeados (23 archivos encontrados)

---

## Phase 3: Servicio Técnico — Sub-páginas

- [ ] **T3.1** Crear directorio `src/pages/servicio-tecnico-apple-bogota/`
- [ ] **T3.2** Crear `iphone.astro` — contenido específico iPhone
- [ ] **T3.3** Crear `macbook.astro` — contenido específico MacBook
- [ ] **T3.4** Crear `imac.astro` — contenido específico iMac (incluye mantenimiento)
- [ ] **T3.5** Crear `apple-watch.astro` — contenido específico Apple Watch
- [ ] **T3.6** Crear `mantenimiento.astro` — contenido específico mantenimiento (MacBook + iMac)
- [ ] **T3.7** Actualizar schema en `ServicePageSchema.astro` con breadcrumb para sub-páginas
- [ ] **T3.8** Notificar nuevas URLs via IndexNow

---

## Phase 4: Blog — Normalizar Categorías

- [ ] **T4.1** Auditar los 73 artículos — identificar `category` actual y `tags`
- [ ] **T4.2** Reclasificar artículos iPhone (~15) → REPARACIONES o GUÍAS según contenido
- [ ] **T4.3** Reclasificar artículos MacBook (~5) → REPARACIONES o GUÍAS según contenido
- [ ] **T4.4** Reclasificar artículos iPad (~1) → REPARACIONES
- [ ] **T4.5** Reclasificar artículos Apple (~1) → GUÍAS
- [ ] **T4.6** Reclasificar artículos "Servicio Técnico" (~1) → CONFIANZA
- [ ] **T4.7** Normalizar tags en todos los artículos (3-5 tags por artículo)

---

## Phase 5: Blog — Páginas de Archivo

- [ ] **T5.1** Crear `src/pages/blog/[category].astro` — ruta dinámica
- [ ] **T5.2** Implementar filtrado por `category` en la página
- [ ] **T5.3** Crear `/blog/reparaciones/` — muestra artículos REPARACIONES
- [ ] **T5.4** Crear `/blog/guias/` — muestra artículos GUÍAS
- [ ] **T5.5** Crear `/blog/confianza/` — muestra artículos CONFIANZA
- [ ] **T5.6** Actualizar navbar Blog dropdown links

---

## Phase 6: Links Internos

- [ ] **T6.1** Actualizar links en `pipodNavbar.tsx`
- [ ] **T6.2** Actualizar links en `DeviceBento.astro`
- [ ] **T6.3** Actualizar links en `ServiceHero.astro`
- [ ] **T6.4** Actualizar links en `ServiceCardsSection.astro`
- [ ] **T6.5** Actualizar URL en `ServicePageSchema.astro`
- [ ] **T6.6** Actualizar URLs en `index-now.ts`
- [ ] **T6.7** Actualizar URLs en `sync-reviews.ts`
- [ ] **T6.8** Actualizar links en `terminos-condiciones.ts`
- [ ] **T6.9** Actualizar cualquier otro link hardcodeado

---

## Phase 7: Verify

- [ ] **T7.1** `npm run build` pasa sin errores
- [ ] **T7.2** Deploy a preview (Vercel)
- [ ] **T7.3** Verificar redirect 301 funcionando
- [ ] **T7.4** Verificar dropdowns en desktop y mobile
- [ ] **T7.5** Verificar 3 páginas de blog cargando correctamente
- [ ] **T7.6** Verificar sub-páginas servicio con contenido
- [ ] **T7.7** Test de smoke: todas las URLs principales responden 200

---

## Dependencias [Engram #184]

- T2 (rename) antes de T3 (sub-páginas)
- T4 (normalizar categorías) puede correr en paralelo
- T5 (páginas archivo) después de T4
- T1 (navbar) y T6 (links) son independientes pero T6 depende de T3

---

## Nota: Mojados [Engram #184]

- **Mojados** = equipo húmedo/mojado (4.7% del negocio)
- **Tag:** `recuperacion-agua`
- **Ubicación:** Contenido DENTRO de iPhone, NO página propia
- **Regla:** 6 casos/mojado → contenido incluido en iPhone. No crear sub-página独立的 para mojados.

---

## Notas

- Tienda: los filtros de producto ya usan query params (`?filter=iphone`) — el navbar apunta directamente a `/tienda-pipod?filter=iphone`, no a URLs nuevas
- No crear nuevos artículos — solo re-etiquetar existentes
- 73 slugs de blog NO se mueven — stays `/blog/{slug}`

---

## Prioridades de ejecución (datos 2025)

| Orden | Fase | Razón |
|-------|------|-------|
| 1️⃣ | T3.2 iPhone | 57 casos, 28.3% baterías — generar tráfico rápido |
| 2️⃣ | T3.3 MacBook | 47 casos, estratégico 2026 (recuperar demanda Mac) |
| 3️⃣ | T3.6 Mantenimiento | 6.3% + estrategia 2026 (baterías recurrentes) |
| 4️⃣ | T3.4 iMac | Soporta mantenimiento (Disco/RAM) |
| 5️⃣ | T3.5 Apple Watch | Menor volumen, hacer al final |

**Total servicios 2025:** 127. Baterías + Pantallas = 54.3%.
**Meta 2026:** 165 servicios (+30%)