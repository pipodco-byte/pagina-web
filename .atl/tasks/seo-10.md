# Tasks: seo-10

## Status: PLANNED (Updated with new high-precision tasks)

---

## 🔴 HIGH IMPACT TASKS (Target: 10/10)

---

## M1: FAQPage Schema (NEW - High Priority)

### Why
Google muestra FAQs directamente en SERPs, dando más "real estate" visual y desplazando a la competencia.

### Tasks
- [ ] **M1.1** Create `FAQPageSchema.astro` component
- [ ] **M1.2** Add FAQ questions relevant to service page:
  - "¿Cuánto tiempo tarda la reparación?"
  - "¿Qué garantía ofrecen?"
  - "¿Los repuestos son originales?"
  - "¿Puedo dejar mi equipo sin cita?"
  - "¿Ofrecen servicio a domicilio?"
- [ ] **M1.3** Integrate in `servicio-tecnico-apple.astro`
- [ ] **M1.4** Validate with Google Rich Results Test

### FAQ Questions Template:
```javascript
const serviceFAQs = [
  { q: "¿Cuánto tiempo tarda la reparación de un iPhone?", a: "2 horas o menos con servicio Express. Reparaciones complejas: 24-48h." },
  { q: "¿Qué garantía ofrecen?", a: "12 meses en todas las reparaciones." },
  { q: "¿Los repuestos son originales?", a: "Repuestos de alta calidad certificados." },
  { q: "¿Puedo dejar mi equipo sin cita?", a: "Sí, diagnóstico gratis 30-60 min." },
  { q: "¿Ofrecen servicio a domicilio?", a: "Sí, en toda Bogotá." }
];
```

---

## INDEX-NOW: IndexNow Protocol (NEW - High Priority)

### Why
Notifica instantáneamente a Bing/Yandex cuando actualizas precios o posts. Reduce tiempo de descubrimiento de días a segundos.

### Tasks
- [ ] **IN1.1** Create `src/pages/api/index-now.ts` endpoint
- [ ] **IN1.2** Add `INDEXNOW_KEY` to `.env.example`
- [ ] **IN1.3** Create `pipod-seo-key.txt` verification file in `public/`
- [ ] **IN1.4** Configure automatic triggers (not just manual):
  - **Webhook trigger:** POST to `/api/index-now` on sitemap update
  - **Deploy hook:** Vercel cron or GitHub webhook triggers IndexNow on deploy
  - **Manual fallback:** `POST /api/index-now { urls: [...] }` still available

### Automatic Trigger Options:

**Option A: Vercel Cron + sitemap check**
- Cron runs daily, checks if sitemap changed since last run
- If changed, automatically notifies IndexNow

**Option B: Build hook**
- On every deploy, automatically notify IndexNow with changed URLs
- Extract changed URLs from git diff or sitemap

**Option C: CMS Webhook**
- If using CMS (Contentful, Sanity), webhook triggers on content publish
- Sends updated URLs to `/api/index-now`

### Implementation (Option A - Cron):
```typescript
// GET /api/index-now (cron trigger)
// Or integrate into existing /api/sync-reviews cron
```

### Verification File Content (public/pipod-seo-key.txt):
```
pipod-seo-key
```

---

## VIDEO: VideoObject Schema (NEW - Medium Priority)

### Why
Video en SERPs demuestra profesionalismo y separa de reparación genérica.

### Tasks
- [ ] **V1.1** Create `VideoObjectSchema.astro` component
- [ ] **V1.2** If video exists (YouTube or hosted):
  - Add thumbnail, duration, upload date
  - Add to servicio-tecnico-apple page
- [ ] **V1.3** Validar con Rich Results Test

### Video Content Options:
1. Microsoldadura proceso (15-30s)
2. Unboxing equipo seminuevo
3. Diagnóstico en acción

### Schema Template:
```json
{
  "@type": "VideoObject",
  "name": "Reparación iPhone en Pipod",
  "description": "Servicio técnico Apple profesional en Bogotá",
  "thumbnailUrl": "https://www.pipod.co/images/video-thumb.jpg",
  "uploadDate": "2026-05-04",
  "duration": "PT30S",
  "contentUrl": "https://www.youtube.com/watch?v=XXXX"
}
```

---

## CLUSTERS: Semantic Topic Clusters (NEW - Medium Priority)

### Why
Google indexa entidades y conceptos, no solo palabras clave. Ser "Authority del Tópico" mejora ranking.

### Tasks
- [ ] **C1.1** Define "Página Pilar" for MacBook maintenance
- [ ] **C1.2** Create satellite articles:
  - "Cómo cuidar la batería MacBook"
  - "Cuándo cambiar pasta térmica"
  - "Signos de falla en logic board"
- [ ] **C1.3** Link pillar → satellites with descriptive anchor text
- [ ] **C1.4** Add schema markup for article relationship

### Pillar Page Structure:
```
/blog/guia-mantenimiento-macbook-bogota (PILLAR)
  ├── /blog/cuidado-bateria-macbook (satellite)
  ├── /blog/cambio-pasta-termica-macbook (satellite)
  └── /blog/falla-logic-board-macbook (satellite)
```

---

## LOCAL: Hyper-Local Landing Pages (NEW - Low Priority)

### Why
Captura "long tail" de búsquedas locales ultra-específicas ("Servicio técnico Apple en Chapinero").

### Tasks
- [ ] **L1.1** Create route `/servicio-tecnico-apple/chapinero`
- [ ] **L1.2** Create route `/servicio-tecnico-apple/usaquen`
- [ ] **L1.3** Add neighborhood-specific content + local schema
- [ ] **L1.4** Add to sitemap

### Alternative (simpler):
Add sections to existing page with anchor links (#chapinero, #usaquen)

---

## ORIGINAL TASKS (Kept)

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

**Decision:** No code changes needed. Component already handles avatar fallback.

- [ ] **H2.1** Verify current reviews display correctly
- [ ] **H2.2** If photos become available, add to /public/images/

---

## M2: HowTo Schema

- [ ] **M2.1** Create `src/components/SEO/HowToSchema.astro` component
- [ ] **M2.2** Add HowTo guide to `servicio-tecnico-apple.astro`:
  - "Cómo cuidar tu iPhone después de una reparación"
- [ ] **M2.3** Validate schema with Google Rich Results Test

---

## M3: Imágenes WebP

- [ ] **M3.1** Identify top images without WebP version
- [ ] **M3.2** Convert hero image to WebP (LCP priority)
- [ ] **M3.3** Update ServiceHero with `<picture>` tag
- [ ] **M3.4** Convert product images in tienda-pipod

### Conversion Command (macOS):
```bash
cd ~/Astro-Ecommerce/public/images
sips -s format webp hero-image.jpg --out hero-image.webp
```

---

## L1: Core Web Vitals (Measurement Only)

- [ ] **L1.1** Deploy to Vercel
- [ ] **L1.2** Run PageSpeed Insights
- [ ] **L1.3** Record LCP, CLS, FID scores
- [ ] **L1.4** Optimize if thresholds fail

### Thresholds:
| Metric | Good | Needs Work |
|--------|------|------------|
| LCP | < 2.5s | 2.5s - 4s |
| CLS | < 0.1 | 0.1 - 0.25 |
| FID | < 100ms | 100ms - 300ms |

---

## L2: Internal Linking

- [ ] **L2.1** List existing blog posts in /pipod-blog
- [ ] **L2.2** Add contextual links to 3 blog posts minimum
- [ ] **L2.3** Verify descriptive anchor text

---

## Rollback Commands

```bash
# FAQPage removal
rm src/components/SEO/FAQPageSchema.astro

# IndexNow removal
rm src/pages/api/index-now.ts
rm public/pipod-seo-key.txt

# HowTo schema removal
rm src/components/SEO/HowToSchema.astro

# WebP revert
rm public/images/*.webp

# Internal links
# Revert anchor text changes in blog posts
```

---

## Dependencies

- Deploy a Vercel for L1 measurement
- Blog posts exist for L2 and Clusters
- Video content needed for VIDEO task (optional)

---

## Estimated Impact (Updated)

| Task | Impact | Priority |
|------|--------|----------|
| M1: FAQPage | +0.2 | 🔴 HIGH |
| INDEX-NOW | +0.1 | 🔴 HIGH |
| VIDEO | +0.2 | 🟡 MEDIUM |
| CLUSTERS | +0.3 | 🟡 MEDIUM |
| LOCAL | +0.1 | 🟢 LOW |
| H1 | +0.5 | 🔴 HIGH |
| H2 | +0.3 | 🟢 LOW (no code) |
| M2 | +0.1 | 🟡 MEDIUM |
| M3 | +0.3 | 🟡 MEDIUM |
| L1 | +0.1 | 🟢 LOW |
| L2 | +0.1 | 🟢 LOW |
| **TOTAL** | **+2.2** | - |

**Final Score: 8 + 2.2 = 10.2/10** (capped to 10/10)