# Spec: seo-10

## Overview

Technical specification for SEO improvements to reach ~9.5/10 score.

---

## H1: Citations Locales

### Scenario: Adding business to Yelp Colombia

**Given** pipod has valid business data (address, phone, hours)
**When** I create a listing on Yelp Colombia
**Then** The listing should include:
- Business name: "Pipod - Servicio Técnico Apple"
- Address: "Cra. 13a #79-52, Chapinero, Bogotá"
- Phone: "+57 312 481 3094"
- Hours: "Lun-Sáb 10AM-7PM"
- Services: iPhone repair, MacBook repair, iPad repair, Trade-in

### Directories Target:
1. Yelp Colombia
2. Thomson Local
3. Páginas Amarillas
4. Apple specialist directory
5. Servicios técnicos Bogotá

---

## H2: Reviews con Fotos

### Current State:
6 reviews with 3 having photos (david.jpg, mario.jpg, Naya has no photo but uses initials)
3 reviews WITHOUT photos: Wilson, Sergio, Nicolas

### Target:
**Given** User views the reviews section
**When** Review has a real photo available
**Then** Display the photo
**Else** Display avatar with initial and colored background

### Photos Needed:
| Reviewer | Status | Photo File |
|----------|--------|------------|
| Wilson Vega | MISSING | wilson.jpg |
| Sergio Niño Burgos | MISSING | sergio.jpg |
| Nicolas Rocha | MISSING | nicolas.jpg |
| David Gonzalez | ✅ | david.jpg |
| Mario Bonilla | ✅ | mario.jpg |
| Naya Solano | N/A | Uses initial "N" |

### Solution:
If photos unavailable, use enhanced avatar with:
- Colored circle with initial
- Google Local Guide badge if applicable
- Full name display

---

## M2: HowTo Schema

### Guides to Create:

**Guide 1: "Cómo cuidar tu iPhone después de una reparación"**
```
HowTo:
- step 1: Avoid extreme temperatures
- step 2: Use protective case
- step 3: Charge with original charger
- step 4: Update iOS regularly
- step 5: Avoid full discharge
```

**Guide 2: "5 tips para extender la vida de tu MacBook"**
```
HowTo:
- step 1: Avoid keeping plugged in all time
- step 2: Clean vents and fans
- step 3: Use original chargers
- step 4: Keep software updated
- step 5: Handle with clean hands
```

### Schema Structure:
```json
{
  "@type": "HowTo",
  "name": "Guía title",
  "description": "Brief description",
  "step": [
    { "@type": "HowToStep", "name": "Step 1", "text": "Description" },
    ...
  ]
}
```

---

## M3: Imágenes WebP

### Target Images (prioritized):
1. Hero images (above the fold)
2. Product images on /tienda-pipod
3. Service images on /servicio-tecnico-apple

### Approach:
1. Convert PNG/JPG to WebP
2. Use `<picture>` tag with fallback
3. Verify visual quality

### Example:
```astro
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="..." width="1920" height="600">
</picture>
```

---

## L1: Core Web Vitals

### Thresholds:
- LCP: < 2.5s (good), < 4s (needs improvement)
- CLS: < 0.1 (good), < 0.25 (needs improvement)
- FID: < 100ms (good), < 300ms (needs improvement)

### Measurement:
Post-deploy, use PageSpeed Insights to measure.

### Optimization Path:
```
If LCP > 2.5s:
  1. Check if hero image is optimized
  2. Verify font loading strategy
  3. Check server response time

If CLS > 0.1:
  1. Ensure all images have dimensions
  2. Check ad/banner dynamic content
  3. Verify font fallback

If FID > 100ms:
  1. Defer non-critical JS
  2. Use client:visible for below-fold components
```

---

## L2: Internal Linking

### Blog Posts to Link:
1. Posts about iPhone repair → /servicio-tecnico-apple#iphone
2. Posts about MacBook repair → /servicio-tecnico-apple#macbook
3. Posts about trade-in → /plan-retoma-apple
4. Posts about accessories → /tienda-pipod?category=accesorios

### Anchor Text Strategy:
- Use descriptive anchor text
- Avoid "click here" or "read more"
- Include target keyword when natural