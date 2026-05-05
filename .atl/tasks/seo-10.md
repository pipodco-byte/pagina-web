# Tasks: seo-10

## Status: PLANNED

---

## H1: Citations Locales (Manual Process)

- [ ] **H1.1** Crear cuenta en Yelp Colombia
- [ ] **H1.2** Agregar negocio "Pipod - Servicio Técnico Apple"
- [ ] **H1.3** Crear cuenta en Thomson Local
- [ ] **H1.4** Agregar negocio en Páginas Amarillas Colombia
- [ ] **H1.5** Buscar y agregar a 1-2 directorios de servicios técnicos Bogotá

**Business Info para citas:**
```
Nombre: Pipod - Servicio Técnico Apple
Dirección: Cra. 13a #79-52, Chapinero, Bogotá
Teléfono: +57 312 481 3094
Horario: Lun-Sáb 10AM-7PM
Servicios: Reparación iPhone, MacBook, iPad, Watch, Trade-in
```

---

## H2: Reviews con Fotos (No Code Change)

**Decision:** No code changes needed. Component already handles avatar fallback when image is null.

- [ ] **H2.1** Verify current reviews display correctly
- [ ] **H2.2** If photos become available from customers, add to /public/images/
- [ ] **H2.3** Update review data with photo paths if added

**Note:** This task is LOW SEO impact. The reviews are already showing with Google-style avatars. Photo requirement is optional.

---

## M2: HowTo Schema (Code Required)

- [ ] **M2.1** Create `src/components/SEO/HowToSchema.astro` component
- [ ] **M2.2** Add HowTo guide to `servicio-tecnico-apple.astro`:
  - "Cómo cuidar tu iPhone después de una reparación"
- [ ] **M2.3** Validate schema with Google Rich Results Test
- [ ] **M2.4** (Optional) Add second guide for MacBook care

### HowTo Steps Template:
```javascript
const iphoneCareGuide = {
  name: "Cómo cuidar tu iPhone después de una reparación",
  description: "5 pasos para mantener tu iPhone en óptimas condiciones",
  steps: [
    { name: "Evita temperaturas extremas", text: "No expongas tu iPhone a calor superior a 35°C o frío inferior a 0°C." },
    { name: "Usa funda protectora", text: "Una buena funda absorbe impactos y protege contra caídas." },
    { name: "Carga con el cargador original", text: "Usar cargadores no certificados puede dañar la batería." },
    { name: "Actualiza iOS regularmente", text: "Las actualizaciones incluyen mejoras de seguridad y rendimiento." },
    { name: "Evita descargar al 0%", text: "Mantén la batería entre 20% y 80% para maximizar su vida útil." }
  ]
};
```

---

## M3: Imágenes WebP (Code Required)

- [ ] **M3.1** Identify top 10 images without WebP version
- [ ] **M3.2** Convert hero image to WebP (LCP priority)
- [ ] **M3.3** Update ServiceHero with `<picture>` tag
- [ ] **M3.4** Convert and update product images in tienda-pipod
- [ ] **M3.5** Verify fallback works in older browsers

### Images to Prioritize:
| Priority | Image | Reason |
|----------|-------|--------|
| 1 | ServiceHero | LCP candidate |
| 2 | Product thumbnails | Page load |
| 3 | Payment method logos | Already have dimensions, low priority |

### Conversion Command (macOS):
```bash
cd ~/Astro-Ecommerce/public/images
sips -s format webp hero-image.jpg --out hero-image.webp
```

---

## L1: Core Web Vitals (Measurement Only)

- [ ] **L1.1** Deploy to Vercel (vercel --prod)
- [ ] **L1.2** Run PageSpeed Insights on https://www.pipod.co
- [ ] **L1.3** Record LCP, CLS, FID scores
- [ ] **L1.4** If any metric fails threshold, create optimization task

### Thresholds:
| Metric | Good | Needs Improvement |
|--------|------|-------------------|
| LCP | < 2.5s | 2.5s - 4s |
| CLS | < 0.1 | 0.1 - 0.25 |
| FID | < 100ms | 100ms - 300ms |

---

## L2: Internal Linking (Code Required)

- [ ] **L2.1** List existing blog posts in /pipod-blog
- [ ] **L2.2** Identify service/product pages to link
- [ ] **L2.3** Add contextual links to 3 blog posts minimum
- [ ] **L2.4** Verify links use descriptive anchor text

### Blog Posts to Update:
1. Any iPhone repair post → /servicio-tecnico-apple#iphone
2. Any MacBook post → /servicio-tecnico-apple#macbook
3. Trade-in post → /plan-retoma-apple
4. Accessory post → /tienda-pipod

---

## Rollback Commands

```bash
# HowTo schema removal
rm src/components/SEO/HowToSchema.astro

# WebP revert
# (no code changes, just remove WebP files if quality issues)
rm public/images/*.webp

# Internal links
# Revert anchor text changes in blog posts
```

---

## Dependencies

- Deploy a Vercel for L1 measurement
- Blog posts exist for L2 internal linking
- No external dependencies for H2 (uses existing fallback)

---

## Estimated Impact

| Task | Impact | Effort |
|------|--------|--------|
| H1 | +0.5 | MEDIUM |
| H2 | +0.3 | LOW (no code) |
| M2 | +0.1 | LOW |
| M3 | +0.3 | MEDIUM |
| L1 | +0.1 | LOW |
| L2 | +0.1 | LOW |
| **TOTAL** | **+1.4** | - |

**Final Score: 8 + 1.4 = 9.4/10**