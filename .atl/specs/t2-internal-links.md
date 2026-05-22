# SDD Spec: t2-internal-links

**Change:** `t2-internal-links`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184 (Arquitectura SEO-first)  
**Parent:** seo-url-hierarchy (T2)

---

## 1. Concept & Vision

Renombrar la página pilar de `/servicio-tecnico-apple` → `/servicio-tecnico-apple-bogota` con redirect 301 para preservar SEO authority. Actualizar todos los ~23 links internos hardcodeados para mantener coherencia.

**Decisión:** Rename + 301 — mejor para SEO local (Bogotá en la URL) y preserva autoridad histórica.

---

## 2. Rename Plan

| Paso | Acción | Detalle |
|------|--------|---------|
| **T2.1** | Renombrar archivo | `servicio-tecnico-apple.astro` → `servicio-tecnico-apple-bogota.astro` |
| **T2.2** | Crear redirect 301 | En `vercel.json` o `_redirects` |
| **T2.3** | Actualizar todos los links | ~23 archivos |
| **T2.4** | Verificar build | `npm run build` pasa |

### Redirect 301

```json
{
  "/servicio-tecnico-apple": {
    "destination": "/servicio-tecnico-apple-bogota",
    "statusCode": 301
  }
}
```

---

## 3. Links a actualizar después del rename

| Archivo | Links | Nueva URL |
|---------|-------|-----------|
| `src/components/pipodNavbar.tsx` | 1 (mobile) + dropdowns | `/servicio-tecnico-apple-bogota` |
| `src/components/service/DeviceBento.astro` | 2 | `/servicio-tecnico-apple-bogota#device-selector` |
| `src/components/service/Baterias2.astro` | 2 | `/servicio-tecnico-apple-bogota` |
| `src/components/home/ServiceCardsSection.astro` | 1 | `/servicio-tecnico-apple-bogota` |
| `src/components/contact/ContactCTA.astro` | 1 | `/servicio-tecnico-apple-bogota` |
| `src/components/SEO/ServicePageSchema.astro` | 3 | `/servicio-tecnico-apple-bogota` |
| `src/components/SEO/ContactPageSchema.astro` | 1 (imagen) | N/A — no cambiar |
| `src/data/terminos-condiciones.ts` | 1 | `/servicio-tecnico-apple-bogota` |
| `src/pages/api/sync-reviews.ts` | 1 | `/servicio-tecnico-apple-bogota` |
| `src/pages/api/index-now.ts` | 1 | `/servicio-tecnico-apple-bogota` |

**Total: ~15 archivos con ~18 links a actualizar**

---

## 5. Scope

### In Scope
- Actualizar todos los links internos hardcodeados
- Mantener coherencia con el navbar (dropdowns)
- Build pasa sin errores

### Out of Scope
- Renombrar archivos o URLs (mantener `/servicio-tecnico-apple`)
- Crear redirects 301
- Modificar el contenido de las páginas

---

## 6. Engram IDs relacionados

| ID | Contenido |
|----|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first completa |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades datos 2025 |

---

*Spec creado: 2026-05-22*
*Para implementar ver: `.atl/tasks/t2-internal-links.md`*