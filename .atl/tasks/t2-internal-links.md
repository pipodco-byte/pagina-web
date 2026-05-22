# SDD Tasks: t2-internal-links

**Change:** `t2-internal-links`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184  
**Parent:** seo-url-hierarchy (T2)

---

## Phase T2: URL Rename + 301 + Update All Links

### T2.1 — Renombrar archivo de página

- [ ] **T2.1.1** Renombrar `src/pages/servicio-tecnico-apple.astro` → `src/pages/servicio-tecnico-apple-bogota.astro`
- [ ] **T2.1.2** Verificar que el archivo existe con el nuevo nombre

**Archivo:** `src/pages/servicio-tecnico-apple-bogota.astro`

---

### T2.2 — Crear redirect 301

- [ ] **T2.2.1** Verificar si existe `vercel.json` en la raíz
- [ ] **T2.2.2** Si existe: agregar redirect en `vercel.json`
- [ ] **T2.2.3** Si NO existe: crear `_redirects` en `public/` con el redirect
- [ ] **T2.2.4** Verificar configuración correcta

**Redirect:**
```
/servicio-tecnico-apple /servicio-tecnico-apple-bogota 301
```

---

### T2.3 — Actualizar todos los links internos

- [ ] **T2.3.1** Actualizar `src/components/pipodNavbar.tsx` — mobile link
- [ ] **T2.3.2** Actualizar `src/components/service/DeviceBento.astro` — 2 links
- [ ] **T2.3.3** Actualizar `src/components/service/Baterias2.astro` — 2 links
- [ ] **T2.3.4** Actualizar `src/components/home/ServiceCardsSection.astro` — 1 link
- [ ] **T2.3.5** Actualizar `src/components/contact/ContactCTA.astro` — 1 link
- [ ] **T2.3.6** Actualizar `src/components/SEO/ServicePageSchema.astro` — 3 URLs
- [ ] **T2.3.7** Actualizar `src/data/terminos-condiciones.ts` — 1 link
- [ ] **T2.3.8** Actualizar `src/pages/api/sync-reviews.ts` — 1 URL
- [ ] **T2.3.9** Actualizar `src/pages/api/index-now.ts` — 1 URL

**NO cambiar:**
- `src/components/SEO/ContactPageSchema.astro` — solo imagen (no link)
- Imágenes referenciadas (`.webp`, etc.)

---

### T2.4 — Actualizar dropdowns del navbar (T1)

- [ ] **T2.4.1** Verificar que los dropdowns en `pipodNavbar.tsx` usan URLs correctas
- [ ] **T2.4.2** Si los dropdowns ya tienen `/servicio-tecnico-apple-bogota/iphone` etc., está correcto

**Dropdown URLs (deben existir después de T3):**
- `/servicio-tecnico-apple-bogota/iphone`
- `/servicio-tecnico-apple-bogota/macbook`
- `/servicio-tecnico-apple-bogota/imac`
- `/servicio-tecnico-apple-bogota/apple-watch`
- `/servicio-tecnico-apple-bogota/mantenimiento`

---

### T2.5 — Verificación

- [ ] **T2.5.1** `grep -r "/servicio-tecnico-apple" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | grep -v "bogota"` — confirmar que no quedan links sin actualizar
- [ ] **T2.5.2** `npm run build` pasa sin errores
- [ ] **T2.5.3** Verificar redirect en preview (si posible)

---

## Dependencias

| Task | Depende de |
|------|-------------|
| T2.3 (actualizar links) | T2.1 (rename) + T2.2 (redirect) |
| T2.4 (dropdowns) | Ninguno — ya están en T1 |
| T2.5 (verificación) | T2.1 + T2.2 + T2.3 |

---

## Notas importantes

1. **Redirect 301 preserva SEO authority** — la autoridad de `/servicio-tecnico-apple` se transfiere a `/servicio-tecnico-apple-bogota`
2. **Geolocalización en URL** — `/apple-bogota` es mejor para SEO local
3. **Las páginas de sub-dispotivos se crean en T3** — los dropdowns apuntarán a URLs que existen después de T3

---

## Engram IDs relacionados

| ID | Contenido |
|----|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first completa |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades datos 2025 |

---

*Tasks actualizadas: 2026-05-22*
*Status: Ready to implement*