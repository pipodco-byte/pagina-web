# Design: seo-10

## Overview

Technical design for all SEO tasks to reach 10/10 score, including new high-precision tasks (FAQPage, IndexNow, VideoObject, Topic Clusters).

---

## NEW: High-Precision Tasks

---

## M1: FAQPage Schema - Design

### Component: FAQPageSchema.astro

```astro
---
import JsonLdSchema from './JsonLdSchema.astro';

interface Props {
  pageUrl: string;
}

const { pageUrl } = Astro.props;

const serviceFAQs = [
  { q: "¿Cuánto tiempo tarda la reparación de un iPhone?", a: "2 horas o menos con servicio Express. Reparaciones complejas: 24-48h." },
  { q: "¿Qué garantía ofrecen?", a: "12 meses en todas las reparaciones." },
  // ... more FAQs
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": serviceFAQs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};
---

<JsonLdSchema schema={faqSchema} type="FAQPage" />
```

### Integration:
Add to `servicio-tecnico-apple.astro`:
```astro
import FAQPageSchema from '../components/SEO/FAQPageSchema.astro';
// In head section
<FAQPageSchema pageUrl="https://www.pipod.co/servicio-tecnico-apple" />
```

### Visual Component:
The FAQ accordion already exists in the page (`PipodFAQ` component). The schema just marks up the same content for search engines.

---

## INDEX-NOW: IndexNow Protocol - Design

### Endpoint: /api/index-now.ts

```typescript
import type { APIRoute } from 'astro';

export const prerender = false;

const INDEXNOW_URLS = [
  'https://indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];

export const POST: APIRoute = async ({ request }) => {
  const { urls } = await request.json();

  const payload = {
    host: 'www.pipod.co',
    key: 'pipod-seo-key',
    keyLocation: 'https://www.pipod.co/pipod-seo-key.txt',
    urlList: urls
  };

  // Notify both engines
  await Promise.allSettled(
    INDEXNOW_URLS.map(url =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    )
  );

  return new Response(JSON.stringify({ success: true }));
};
```

### Verification File: public/pipod-seo-key.txt

Content:
```
pipod-seo-key
```

### Usage Triggers:
- Price update in retoma page
- New blog post published
- Product added to tienda

### Alternative (simpler):
Use cron job at `/api/sync-reviews` to also notify IndexNow if prices changed.

---

## VIDEO: VideoObject Schema - Design

### If Video Exists (YouTube or hosted):

```astro
---
import JsonLdSchema from './JsonLdSchema.astro';

interface Props {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl?: string;
}

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": name,
  "description": description,
  "thumbnailUrl": thumbnailUrl,
  "uploadDate": uploadDate,
  "duration": duration,
  "contentUrl": contentUrl,
  "embedUrl": embedUrl
};
---

<JsonLdSchema schema={videoSchema} type="VideoObject" />
```

### If No Video:
Skip this task. No code changes needed.

### Video Recommendations:
- 15-30 seconds (short, professional)
- Show hands doing microsoldadura or repair
- Good lighting, clean background
- No audio required (can add caption)

---

## CLUSTERS: Semantic Topic Clusters - Design

### No Code Implementation - Content Strategy

This is primarily a content and linking strategy:

1. **Pillar Page** (already exists or create new):
   - `/blog/guia-mantenimiento-macbook-bogota`

2. **Internal Linking** (add to existing posts):
   ```markdown
   Ver también: [Cómo cuidar la batería de tu MacBook](/blog/cuidado-bateria-macbook)
   ```

3. **Schema for Article Relationship:**
   ```json
   {
     "@type": "Article",
     "about": { "@type": "Thing", "name": "MacBook Maintenance" }
   }
   ```

### Implementation Steps:
1. Map existing blog posts to topics
2. Create missing satellite articles
3. Add internal links from satellites to pillar
4. Ensure pillar links to all satellites

### Topic Clusters for Pipod:
```
MacBook Maintenance
├── Cuidado batería MacBook
├── Cambio pasta térmica
└── Falla logic board

iPhone Repair
├── Pantalla iPhone guía
├── Batería iPhone guía
└── Face ID reparación

Trade-in
├── Cómo funciona retoma
├── Evaluar mi equipo
└── Trade-in vs vender
```

---

## LOCAL: Hyper-Local Landing Pages - Design

### Option A: Full Pages (More SEO Impact)
Create routes:
- `/servicio-tecnico-apple/chapinero`
- `/servicio-tecnico-apple/usaquen`

Each page has neighborhood-specific content and schema.

### Option B: Anchor Sections (Simpler, Less Effort)
Add to existing `servicio-tecnico-apple.astro`:
```html
<section id="chapinero">
  <h2>Servicio Técnico Apple en Chapinero</h2>
  <p>Estamos ubicados en Cra. 13a #79-52, Chapinero...</p>
</section>

<section id="usaquen">
  <h2>Servicio Técnico Apple en Usaquén</h2>
  <p>También servimos la zona norte de Bogotá incluyendo Usaquén...</p>
</section>
```

### Schema for Local Pages:
```json
{
  "@type": "LocalBusiness",
  "areaServed": { "@type": "Neighborhood", "name": "Chapinero" }
}
```

---

## ORIGINAL: Core Tasks (Preserved)

---

## H1: Citations Locales - No Code

Manual process: Create accounts on Yelp, Thomson, etc.

---

## H2: Reviews con Fotos - No Code

Existing avatar fallback is sufficient. No code changes.

---

## M2: HowTo Schema - Component Design

```astro
---
interface Step {
  name: string;
  text: string;
}

interface Props {
  name: string;
  description: string;
  steps: Step[];
}

const { name, description, steps } = Astro.props;

const schema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": description,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

## M3: Imágenes WebP - Design

### Conversion Process:

```bash
# Find images
find public/images -name "*.jpg" -o -name "*.png" | head -20

# Convert single image (macOS)
sips -s format webp image.jpg --out image.webp

# Batch convert (all jpg in folder)
for f in *.jpg; do sips -s format webp "$f" --out "${f%.jpg}.webp"; done
```

### Component Update Example:

```astro
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="..." width="1920" height="600" loading="eager">
</picture>
```

### Priority:
1. ServiceHero.astro (LCP candidate)
2. Product cards in tienda-pipod
3. Payment method logos (lower priority)

---

## L1: Core Web Vitals - Measurement

Steps:
1. Deploy: `vercel --prod`
2. Measure: https://pagespeed.web.dev/?url=https://www.pipod.co
3. If LCP > 2.5s: optimize hero image
4. If CLS > 0.1: check image dimensions
5. If FID > 100ms: defer non-critical JS

---

## L2: Internal Linking - Content Update

Edit blog posts to add contextual links:

```markdown
<!-- In existing blog post about iPhone repair -->

Para un diagnóstico profesional, visita nuestro [servicio técnico iPhone en Pipod](/servicio-tecnico-apple#iphone).

También te puede interesar: [Trade-in: Canjea tu iPhone por uno nuevo](/plan-retoma-apple).
```

---

## Summary: Code Changes Required

| Task | Files | Complexity |
|------|-------|------------|
| M1: FAQPage | `FAQPageSchema.astro`, `servicio-tecnico-apple.astro` | LOW |
| INDEX-NOW | `api/index-now.ts`, `public/pipod-seo-key.txt` | LOW |
| VIDEO | `VideoSchema.astro` (if video exists) | LOW |
| CLUSTERS | Content/linking strategy only | LOW |
| LOCAL | New sections or pages | MEDIUM |
| M2: HowTo | `HowToSchema.astro` | LOW |
| M3: WebP | Image files + component updates | MEDIUM |
| L1: CWV | No code, measurement only | NONE |
| L2: Links | Blog post edits | LOW |

---

## Rollback Commands

```bash
# FAQPage
rm src/components/SEO/FAQPageSchema.astro

# IndexNow
rm src/pages/api/index-now.ts
rm public/pipod-seo-key.txt

# VideoObject
rm src/components/SEO/VideoSchema.astro

# HowTo
rm src/components/SEO/HowToSchema.astro

# WebP
# Remove .webp files, revert component to original <img>

# Internal links
# Revert blog post changes
```