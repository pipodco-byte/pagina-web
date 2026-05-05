# Design: seo-10

## Overview

Technical design for SEO improvements (HowTo schema, WebP images, Core Web Vitals, internal linking).

---

## H1: Citations Locales - Design

### Manual Process (no code changes)
Create accounts on each directory and fill in business information:

**Yelp Colombia:**
1. Go to yelp.com.co
2. Click "Claim Your Business"
3. Search for "Pipod Servicio Técnico Apple"
4. Fill: Cra. 13a #79-52, Chapinero, Bogotá
5. Add phone: +57 312 481 3094
6. Categories: "Electronics Repair", "Mobile Phone Repair"
7. Hours: Mon-Sat 10AM-7PM

**Thomson Local:**
1. thomsonlocal.com
2. Free listing submission
3. Same business details

**Páginas Amarillas:**
1. paginasamarillas.com.co
2. Free business listing
3. Same details

### No code changes required.

---

## H2: Reviews con Fotos - Design

### Current Implementation
```jsx
const reviews = [
  {
    name: "Wilson Vega",
    image: "/images/wilson.jpg",  // FILE MISSING
    initial: "W",
    bg: "#E8F0FE",
    isLocalGuide: false
  },
  // ...
];
```

### Problem
`wilson.jpg`, `sergio.jpg`, `nicolas.jpg` files do not exist in `/public/images/`.

### Solution A: Get Real Photos
Obtain photos from:
1. Google Reviews (where originals exist)
2. Customer consent to use
3. Add to /public/images/

### Solution B: Enhanced Avatar Fallback
If photos unavailable, use:
```jsx
{
  name: "Wilson Vega",
  image: null,  // No photo
  initial: "W",
  bg: "#E8F0FE",  // Consistent with Google avatar colors
  isLocalGuide: true  // If user is a Local Guide
}
```

The component already handles `image: null` by showing avatar with initial.

### Recommendation
Use Solution B (enhanced avatars) for now since:
- Component already supports it
- Low SEO impact (avatars don't affect rankings)
- Can add photos later if customers provide them

---

## M2: HowTo Schema - Design

### New Component: HowToSchema.astro

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

### Usage in Pages:
```astro
---
import HowToSchema from '../components/SEO/HowToSchema.astro';
---

<HowToSchema
  name="Cómo cuidar tu iPhone después de una reparación"
  description="Sigue estos 5 pasos para mantener tu iPhone en óptimas condiciones."
  steps={[
    { name: "Evita temperaturas extremas", text: "No expongas tu iPhone a calor o frío excesivo." },
    { name: "Usa funda protectora", text: "Una buena funda evita daños por caídas." },
    // ...
  ]}
/>
```

### Where to Add:
1. `/src/pages/servicio-tecnico-apple.astro` - Below iPhone service section
2. Or create `/src/pages/blog/cuidado-iphone-guide.astro`

---

## M3: Imágenes WebP - Design

### Conversion Strategy

**Step 1:** Identify images without WebP version
```bash
find public/images -name "*.jpg" -o -name "*.png" | head -20
```

**Step 2:** Convert using standard tools
- macOS: `sips -s format webp image.jpg --out image.webp`
- Online: CloudConvert, Squoosh
- CLI: `cwebp input.jpg -o output.webp`

**Step 3:** Update components with `<picture>` tag

### Example: Hero Image
```astro
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <img
    src="/images/hero.jpg"
    alt="Servicio Técnico Apple Bogotá"
    width="1920"
    height="600"
    loading="eager"
  >
</picture>
```

### Images to Prioritize:
1. hero-image.webp (LCP candidate)
2. Product images in tienda-pipod
3. Service section images

### Fallback Strategy
Keep original JPG/PNG as fallback for browsers that don't support WebP.

---

## L1: Core Web Vitals - Design

### Measurement Steps

1. Deploy to Vercel: `vercel --prod`
2. Run PageSpeed Insights: https://pagespeed.web.dev/?url=https://www.pipod.co

3. Check Metrics:
   - LCP: Should be < 2.5s
   - CLS: Should be < 0.1
   - FID: Should be < 100ms

### Optimization Triggers

**If LCP > 2.5s:**
- Optimize hero image (WebP, correct size)
- Preload critical fonts
- Add cache headers
- Enable Vercel Edge Network

**If CLS > 0.1:**
- Add width/height to all images (DONE in local-seo-cro-v3)
- Avoid dynamic content injection
- Use font-display: swap (DONE)

**If FID > 100ms:**
- Defer non-critical JS
- Use client:visible for below-fold components (not implemented - user choice)

---

## L2: Internal Linking - Design

### Blog Structure
Blog posts at `/pipod-blog` can link to:
- Product pages
- Service pages
- Trade-in page

### Link Placement Strategy

Within blog post content, add contextual links:

```markdown
<!-- Example blog post: "5 señales de que necesitas cambiar la batería de tu iPhone" -->

...después de explicar cada señal...

**¿Necesitas un diagnóstico?** [Agenda tu revisión gratuita en Pipod](/servicio-tecnico-apple#device-selector)

...al final del artículo...

**También te puede interesar:**
- [Trade-in: Canjea tu iPhone por uno nuevo](/plan-retoma-apple)
- [Ver casos de reparación exitosos](/pipod-blog/casos-exito)
```

### Implementation
Edit blog post `.astro` or `.mdx` files to add anchor links.

---

## Summary of Code Changes

| Task | File | Change |
|------|------|--------|
| H2 (Photos) | None | No change - use existing avatar fallback |
| M2 (HowTo) | `src/components/SEO/HowToSchema.astro` | NEW component |
| M2 (HowTo) | `src/pages/servicio-tecnico-apple.astro` | Add 1-2 guides |
| M3 (WebP) | Various image components | Add `<picture>` tags |
| L1 (CWV) | None | Measurement only, no code |
| L2 (Links) | Blog post `.astro` files | Add anchor links |

No existing components need modification for H1 (external) or H2 (existing code handles fallback).