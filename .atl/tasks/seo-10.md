# Tasks: seo-10

## Status: PLANNED (Updated with new high-precision tasks)

---

## 🔴 HIGH IMPACT TASKS (Target: 10/10)

---

## M1: FAQPage Schema (COMPLETADO ✅)

### Why
Google muestra FAQs directamente en SERPs, dando más "real estate" visual y desplazando a la competencia.

### Implementation
- [x] **M1.1** Create `FAQPageSchema.astro` component
- [x] **M1.2** Add FAQ questions to 3 pages:
  - [x] `/servicio-tecnico-apple` - 8 preguntas
  - [x] `/plan-retoma-apple` - 12 preguntas
  - [x] `/contacto-pipod` - 4 preguntas
- [x] **M1.3** Integrate in all 3 pages
- [ ] **M1.4** Validate with Google Rich Results Test (post-deploy)

### FAQ Questions:
```javascript
// Servicio Técnico (8)
const serviceFAQs = [
  { q: '¿Cuánto tiempo tarda la reparación de un iPhone?', a: '...' },
  { q: '¿Qué garantía ofrecen?', a: '...' },
  // ... 8 total
];

// Retoma (12) - de RetomaFAQ.astro
// Contacto (4) - de ContactFAQ.astro
```

### Status: ✅ COMPLETADO (2026-05-05)
- Component created: `src/components/SEO/FAQPageSchema.astro`
- Integrated in 3 pages
- Build verified: PASS

---

## INDEX-NOW: IndexNow Protocol (COMPLETADO ✅)

### Why
Notifica instantáneamente a Bing/Yandex cuando actualizas precios o posts. Reduce tiempo de descubrimiento de días a segundos.

### Implementation
- [x] **IN1.1** Create `src/pages/api/index-now.ts` endpoint
- [x] **IN1.2** Add key file `public/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt`
- [x] **IN1.3** Configure automatic trigger via sync-reviews cron
- [x] **IN1.4** Integrated with Vercel cron (every 3 days)

### Key Details
- **Key:** `6e7e2464-f98a-4108-b71c-a652b9a63a9b`
- **KeyLocation:** `https://www.pipod.co/6e7e2464-f98a-4108-b71c-a652b9a63a9b.txt`
- **Endpoints:** `indexnow.org`, `bing.com/indexnow`

### Automatic Trigger (ALWAYS ACTIVE)
- Cron runs every 3 days via `/api/sync-reviews`
- Sends main URLs to IndexNow after reviews sync
- Runs regardless of Sanity CMS

### Endpoints:
- `POST /api/index-now { urls: [...] }` - Manual notification
- `GET /api/index-now` - Auto notification of main URLs

### Status: ✅ COMPLETADO (2026-05-05)
- Endpoint created: `src/pages/api/index-now.ts`
- Key file created in `public/`
- Integrated with sync-reviews cron
- Build verified: PASS

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

## H1: Citations Locales (Manual Process) - COLOMBIA OPTIMIZADO

**Nota:** Yelp y Thomson Local ELIMINADOS (no operan en Colombia).

### 🔴 CRÍTICA (Google Maps + Apple)
- [ ] **H1.1** Google Business Profile - Verificar/optimizar perfil existente
- [ ] **H1.2** Apple Business Connect - CREAR (Apple Maps, Siri, Spotlight)

### 🔴 ALTA (Autoridad Bogotá)
- [ ] **H1.3** Cámara de Comercio (Bazzarbog) - Verificar o registrar

### 🟡 MEDIA (Consistencia NAP)
- [ ] **H1.4** Bing Places - Registrar
- [ ] **H1.5** Páginas Amarillas Colombia - Registrar
- [ ] **H1.6** Cylex Colombia - Registrar

### 📝 Mapa de Google Embebido (pendiente código)
- [ ] **H1.7** Agregar embed mapa a `pipodFooter.astro` y `ContactLocation.astro`

**Business Info para citas (NAP Unificado):**
```
Nombre: Pipod - Servicio Técnico Apple
Dirección: Cra. 13a #79-52, Chapinero, Bogotá
Teléfono: +57 312 481 3094
WhatsApp: +57 312 481 3094
Horario: Lun-Sáb 10AM-7PM
Web: https://www.pipod.co
Servicios: Reparación iPhone, MacBook, iPad, Watch, Trade-in, Microsoldadura
Descripción: Desde 2007. Garantía 12 meses. Diagnóstico gratis. Express 2h.
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