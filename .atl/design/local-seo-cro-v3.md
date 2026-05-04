# Design: local-seo-cro-v3

## Overview

Technical design for implementing device-specific Service schema, CRO improvements, and Core Web Vitals fixes for pipod.co.

## Architecture Changes

### 1. ServicePageSchema.astro Enhancement

**Current State:**
```javascript
// Generic ServicePageSchema with basic WebPage + LocalBusiness reference
const schema = {
  "@type": "WebPage",
  "mainEntity": { "@id": "https://www.pipod.co/#business" }
};
```

**Proposed State:**
```javascript
// Device-specific Service schemas linked to LocalBusiness
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // Existing LocalBusiness
    { /* ... existing LocalBusiness schema ... */ },
    // iPhone Service
    {
      "@type": "Service",
      "@id": "https://www.pipod.co/#service-iphone",
      "name": "Reparación de iPhone",
      "serviceType": "Mobile Phone Repair",
      "provider": { "@id": "https://www.pipod.co/#business" },
      "areaServed": { "@type": "City", "name": "Bogotá" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios iPhone Pipod",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Pantalla iPhone", "description": "Pantalla original o compatible" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Batería iPhone", "description": "Batería con garantía" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación Face ID" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diagnóstico Gratis" }}
        ]
      }
    },
    // MacBook Service
    {
      "@type": "Service",
      "@id": "https://www.pipod.co/#service-macbook",
      "name": "Reparación de MacBook",
      "serviceType": "Computer Repair",
      "provider": { "@id": "https://www.pipod.co/#business" },
      "areaServed": { "@type": "City", "name": "Bogotá" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios MacBook Pipod",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Pantalla MacBook", "description": "Pantalla Retina" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Teclado MacBook" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Batería MacBook" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación Logic Board" }}
        ]
      }
    }
  ]
};
```

### 2. servicio-tecnico-apple.astro Reorganization

**Current Order:**
1. Hero with generic "Servicio Técnico Apple"
2. DeviceBento (device selector)
3. iPhone content
4. MacBook content
5. iPad content
6. Watch content

**Proposed Order:**
1. Device Selector (iPhone, MacBook, iPad, Watch tabs)
2. iPhone Section (full services + CTA)
3. MacBook Section (full services + CTA)
4. iPad Section
5. Watch Section

**Navigation:** Anchor-based (`#iphone`, `#macbook`, `#ipad`, `#watch`)

### 3. WhatsApp CTA Messages

```typescript
const CTA_MESSAGES = {
  iphone: "Hola, quiero reparar mi iPhone",
  macbook: "Hola, quiero reparar mi MacBook",
  ipad: "Hola, quiero reparar mi iPad",
  watch: "Hola, quiero reparar mi Apple Watch"
};

// Base WhatsApp URL
const WHATSAPP_BASE = "https://wa.me/573124813094?text=";

function getWhatsAppUrl(device: keyof typeof CTA_MESSAGES): string {
  return WHATSAPP_BASE + encodeURIComponent(CTA_MESSAGES[device]);
}
```

### 4. PaymentBanner Images

**Current:**
```astro
<img src="/images/visa.svg" alt="Visa">
<img src="/images/mastercard.svg" alt="Mastercard">
<!-- ... 5 more without dimensions -->
```

**Proposed:**
```astro
<img src="/images/visa.svg" alt="Visa" width="48" height="48">
<img src="/images/mastercard.svg" alt="Mastercard" width="48" height="48">
<!-- ... all 7 with width="48" height="48" -->
```

### 5. Layout.astro Scripts

**Current:**
```html
<script src="https://www.googletagmanager.com/gtag/js?id=GA4"></script>
<script src="https://www.googletagmanager.com/gtag/js?id=GTM-XXX"></script>
```

**Proposed:**
```html
<script src="https://www.googletagmanager.com/gtag/js?id=GA4" defer></script>
<script src="https://www.googletagmanager.com/gtag/js?id=GTM-XXX" defer></script>
```

## Files to Modify

### 1. src/components/SEO/ServicePageSchema.astro
- Add `@graph` array with device-specific Service schemas
- Include iPhone and MacBook Service types with hasOfferCatalog

### 2. src/pages/servicio-tecnico-apple.astro
- Reorganize sections (iPhone first)
- Add anchor navigation
- Add device-specific CTAs with WhatsApp message
- Reorder: iPhone → MacBook → iPad → Watch

### 3. src/components/payment/PaymentBanner.astro
- Add width="48" height="48" to all 7 payment images

### 4. src/layouts/Layout.astro
- Add `defer` to GTM and GA4 script tags

## Testing Strategy

1. **Schema Validation:** Use Google Rich Results Test
2. **Visual:** Verify device sections in responsive view
3. **CLS:** Lighthouse audit with throttled network
4. **WhatsApp:** Manual test clicking each CTA
5. **Build:** `npm run build` must pass

## Implementation Order

1. PaymentBanner dimensions (safest, lowest risk)
2. Layout.astro defer (low risk, immediate LCP benefit)
3. WhatsApp CTA messages (low risk, CRO benefit)
4. ServicePageSchema enhancement (medium risk, SEO benefit)
5. servicio-tecnico-apple.astro reorganization (higher risk, test carefully)