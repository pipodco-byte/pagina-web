# Spec: seo-10

## Overview

Technical specifications for all SEO tasks to reach 10/10 score.

---

## NEW: High-Precision Tasks

---

## M1: FAQPage Schema

### Scenario: FAQPage appears in Google SERPs

**Given** User searches "servicio técnico apple bogotá"
**When** Google displays pipod.co
**Then** Show FAQ accordion with common questions and answers
**And** User can expand questions directly in search results

### FAQ Questions (for servicio-tecnico-apple page):
1. "¿Cuánto tiempo tarda la reparación de un iPhone?"
2. "¿Qué garantía ofrecen?"
3. "¿Los repuestos son originales?"
4. "¿Puedo dejar mi equipo sin cita previa?"
5. "¿Ofrecen servicio a domicilio?"
6. "¿Qué dispositivos Apple reparan?"
7. "¿Cómo funciona el diagnóstico gratis?"
8. "¿Pueden recuperar datos de un iPhone mojado?"

### Schema Structure:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pregunta",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Respuesta"
      }
    }
  ]
}
```

---

## INDEX-NOW: IndexNow Protocol

### ⚠️ Estado: EN EVALUACIÓN — Sanity CMS (80% probabilidad)

**No se ha confirmado implementación de Sanity CMS. Las siguientes opciones están sujetas a decisión.**

### Scenario: Price update triggers instant crawler notification

**Given** Admin updates retoma prices in pipod.co
**When** The change is published OR (if Sanity confirmed) webhook triggers
**Then** IndexNow notifies Bing/Yandex within seconds
**And** Search engines index the new prices within minutes (not days)

### ⚠️ Opción Preferida: Sanity CMS Webhook (PENDIENTE CONFIRMACIÓN)

**Given** Sanity CMS is confirmed and configured (80% probability)
**When** Content is published/updated in Sanity Studio
**Then** Sanity webhook POSTs to /api/index-now with updated URLs
**And** Bing/Yandex are notified within seconds

**CRON VERCEL SIEMPRE ACTIVO:**
- Vercel cron runs every 3 days (backup)
- Acts as backup even if Sanity is confirmed
- Ensures indexation even if webhook fails
- Interval can be decreased to daily if needed

⚠️ **ADVERTENCIA:** Solo implementar Option C (Sanity) SI se confirma decisión.
Cron Vercel NUNCA se desactiva — es backup permanente.

### Endpoint: POST /api/index-now
```json
{
  "urls": [
    "https://www.pipod.co/plan-retoma-apple",
    "https://www.pipod.co/tienda-pipod"
  ]
}
```

### Alternative: Vercel Cron (Fallback if no Sanity)

**Scenario:** Sitemap changes but no human triggers IndexNow (no Sanity)

**Given** Vercel cron runs every 3 days
**When** Sitemap has changed since last check (Supabase hash comparison)
**Then** Automatically POST to IndexNow with updated URLs

### Alternative: Git Hook on Deploy
**Given** Developer pushes to main/develop
**When** Build completes
**Then** GitHub webhook triggers IndexNow with all changed URLs

### Notification Targets:
- indexnow.org
- bing.com

### Verification:
1. Create file `public/pipod-seo-key.txt` containing the key
2. Key location: `https://www.pipod.co/pipod-seo-key.txt`

---

## VIDEO: VideoObject Schema

### Scenario: Professional video appears in Google Video tab

**Given** Pipod has a video of microsoldadura process (15-30s)
**When** User searches "reparación iphone bogotá"
**Then** Pipod appears in Video tab with professional thumbnail

### Video Options:
1. Microsoldadura proceso (most professional)
2. Unboxing equipo seminuevo
3. Diagnostic in action

### Schema Structure:
```json
{
  "@type": "VideoObject",
  "name": "Reparación iPhone Express en Pipod",
  "description": "Servicio técnico Apple profesional en Bogotá. Reparación Express en 2 horas.",
  "thumbnailUrl": "https://www.pipod.co/images/video-thumb.webp",
  "uploadDate": "2026-05-04",
  "duration": "PT25S",
  "contentUrl": "https://www.youtube.com/watch?v=XXXX",
  "embedUrl": "https://www.youtube.com/embed/XXXX"
}
```

### If No Video:
Skip this task. Impact is medium (+0.2) but requires video production.

---

## CLUSTERS: Semantic Topic Clusters

### Scenario: Pipod becomes "Authority del Tópico" for MacBook maintenance

**Given** User searches "mantenimiento macbook bogotá"
**When** Google indexes pipod content
**Then** Shows pipod as top authority for MacBook service in Colombia

### Pillar Page: "Guía Definitiva Mantenimiento MacBook Bogotá"
- `/blog/guia-mantenimiento-macbook-bogota`

### Satellite Articles:
1. `/blog/cuidado-bateria-macbook` → links to pillar
2. `/blog/cambio-pasta-termica-macbook` → links to pillar
3. `/blog/falla-logic-board-macbook` → links to pillar

### Internal Linking Structure:
```
PILLAR (Guía MacBook)
  ├── "Aprende a cuidar la batería de tu MacBook" → /blog/cuidado-bateria
  └── "Cuándo cambiar la pasta térmica" → /blog/cambio-pasta-termica
```

---

## LOCAL: Hyper-Local Landing Pages

### Scenario: User searches "servicio técnico apple en Chapinero"

**Given** User is near Chapinero and searches
**When** They find pipod
**Then** Page has specific content for that neighborhood

### Routes:
- `/servicio-tecnico-apple/chapinero` → Section for Chapinero
- `/servicio-tecnico-apple/usaquen` → Section for Usaquén

### Alternative (simpler):
Add anchor sections to existing page:
- `#chapinero` - "Servicio en Chapinero"
- `#usaquen` - "Servicio en Usaquén"

---

## ORIGINAL: Core Tasks (Preserved)

---

## H1: Citations Locales

### Directories:
1. Yelp Colombia
2. Thomson Local
3. Páginas Amarillas
4. Apple specialist directory
5. Servicios técnicos Bogotá

### Business Info:
```
Nombre: Pipod - Servicio Técnico Apple
Dirección: Cra. 13a #79-52, Chapinero, Bogotá
Teléfono: +57 312 481 3094
Horario: Lun-Sáb 10AM-7PM
```

---

## H2: Reviews con Fotos

**Decision:** No code changes. Existing avatar fallback is sufficient.
Low SEO impact (+0.3) for effort.

---

## M2: HowTo Schema

### Guide: "Cómo cuidar tu iPhone después de una reparación"

```json
{
  "@type": "HowTo",
  "name": "Cómo cuidar tu iPhone después de una reparación",
  "description": "5 pasos para mantener tu iPhone en óptimas condiciones",
  "step": [
    { "@type": "HowToStep", "name": "Evita temperaturas extremas", "text": "..." },
    { "@type": "HowToStep", "name": "Usa funda protectora", "text": "..." },
    { "@type": "HowToStep", "name": "Carga con cargador original", "text": "..." },
    { "@type": "HowToStep", "name": "Actualiza iOS", "text": "..." },
    { "@type": "HowToStep", "name": "Evita descargar al 0%", "text": "..." }
  ]
}
```

---

## M3: Imágenes WebP

### Priority:
1. ServiceHero (LCP candidate)
2. Product images in tienda-pipod
3. Payment method logos

### Example:
```astro
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="..." width="1920" height="600" loading="eager">
</picture>
```

---

## L1: Core Web Vitals

### Measurement:
1. Deploy to Vercel
2. PageSpeed Insights on https://www.pipod.co

### Thresholds:
| Metric | Good | Needs Work |
|--------|------|------------|
| LCP | < 2.5s | 2.5s - 4s |
| CLS | < 0.1 | 0.1 - 0.25 |
| FID | < 100ms | 100ms - 300ms |

---

## L2: Internal Linking

### Blog Posts to Update:
- iPhone repair post → /servicio-tecnico-apple#iphone
- MacBook post → /servicio-tecnico-apple#macbook
- Trade-in post → /plan-retoma-apple

### Anchor Text:
Use descriptive anchors, not "click here".