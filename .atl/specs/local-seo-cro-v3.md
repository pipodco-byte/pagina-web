# Spec: local-seo-cro-v3

## Overview

Improve Local SEO with device-specific schema, CRO with organized device sections and targeted CTAs, and fix Core Web Vitals (CLS from images, LCP from blocking scripts).

## Problem Statements

### Problem 1: No Device-Specific Schema

**Given** Googlebot indexes the service page
**When** User searches "iPhone repair Bogotá"
**Then** The page shows generic "Computer Repair" without specific iPhone services
**And** Rich results do not include device-specific offerings

**Solution:** Add `Service` schema types for iPhone and MacBook with detailed `hasOfferCatalog`.

### Problem 2: Content Not Organized by Device

**Given** User lands on service page looking for iPhone repair
**When** Page loads
**Then** User sees MacBook/iPad content first (not iPhone)
**And** User may leave before finding iPhone services

**Solution:** Reorganize `servicio-tecnico-apple.astro` to show device selector first, then device-specific sections.

### Problem 3: Generic WhatsApp CTA

**Given** User clicks WhatsApp CTA for iPhone repair
**When** WhatsApp opens
**Then** Message is generic "Hola, quiero información"
**And** User must manually type device and service

**Solution:** Pre-fill WhatsApp message with device-specific text.

### Problem 4: PaymentBanner CLS

**Given** Page loads with slow connection
**When** PaymentBanner images load
**Then** Content below shifts position (CLS)
**And** User experience is disrupted

**Solution:** Add explicit width/height to all payment method images.

### Problem 5: Analytics Blocking LCP

**Given** User visits service page
**When** Head scripts load synchronously
**Then** Page content is delayed until GTM/GA4 finish loading
**And** LCP metric suffers

**Solution:** Add `defer` attribute to non-critical scripts.

## Schema Design

### Service Schema Structure

```json
{
  "@type": "Service",
  "@id": "https://www.pipod.co/#service-iphone",
  "name": "Reparación de iPhone",
  "serviceType": "Mobile Phone Repair",
  "description": "Servicio especializado de reparación iPhone: pantalla, batería, Face ID, diagnóstico gratis.",
  "provider": { "@id": "https://www.pipod.co/#business" },
  "areaServed": {
    "@type": "City",
    "name": "Bogotá"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios iPhone",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Pantalla iPhone" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cambio de Batería iPhone" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparación Face ID" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diagnóstico Gratis" }}
    ]
  }
}
```

## Content Structure

### Device Section Order (servicio-tecnico-apple.astro)

1. **iPhone** (most common)
2. **MacBook** (second most)
3. **iPad** (third)
4. **Watch** (fourth)

Each section includes:
- Device hero image
- Service list with prices (from)
- Device-specific WhatsApp CTA

## CTA Messages

| Device | WhatsApp Message |
|--------|-----------------|
| iPhone | "Hola, quiero reparar mi iPhone" |
| MacBook | "Hola, quiero reparar mi MacBook" |
| iPad | "Hola, quiero reparar mi iPad" |
| Watch | "Hola, quiero reparar mi Apple Watch" |

## Image Dimensions

### PaymentBanner Images

| Image | Current Size | Add |
|-------|-------------|-----|
| visa.svg | 48x48 |
| mastercard.svg | 48x48 |
| american-express.svg | 48x48 |
| pse.svg | 48x48 |
| nequi.svg | 48x48 |
| daviplata.svg | 48x48 |
| bold.svg | 48x48 |

## Scripts Modification

### Before
```html
<script src="GTM-XXX.js"></script>
<script src="GA4-XXX.js"></script>
```

### After
```html
<script src="GTM-XXX.js" defer></script>
<script src="GA4-XXX.js" defer></script>
```

## Verification Scenarios

### Scenario 1: Schema Validation
**Given** Page is deployed
**When** Tested at https://search.google.com/test/rich-results
**Then** Service schema for iPhone and MacBook is valid
**And** hasOfferCatalog entries are recognized

### Scenario 2: Device Sections
**Given** User visits /servicio-tecnico-apple
**When** Page loads
**Then** iPhone section is visible without scroll
**And** MacBook section is below iPhone
**And** Anchor navigation works

### Scenario 3: WhatsApp CTA
**Given** User clicks iPhone CTA
**When** WhatsApp opens
**Then** Message contains "reparar mi iPhone"

### Scenario 4: CLS Test
**Given** PageSpeed Insights runs
**When** CLS is measured
**Then** CLS < 0.1 (ideally 0)

### Scenario 5: LCP Test
**Given** PageSpeed Insights runs
**When** LCP is measured
**Then** LCP < 2.5s

## Rollback

```bash
git checkout HEAD~1 -- \
  src/components/SEO/ServicePageSchema.astro \
  src/pages/servicio-tecnico-apple.astro \
  src/components/payment/PaymentBanner.astro \
  src/layouts/Layout.astro
```

## Status

⏳ In Progress - Implementation pending