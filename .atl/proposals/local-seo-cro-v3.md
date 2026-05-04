# Proposal: local-seo-cro-v3

## Intent

Improve Local SEO, CRO, and Core Web Vitals for pipod.co by adding device-specific service schema, organizing content by device, optimizing WhatsApp CTAs, and fixing CLS issues.

## Context

### Previous SDD Completed:
- local-seo-cro-v2: NAP fixes, DeviceBento 404, reviews sync ✅

### Issues Identified in Exploration:

| # | Issue | Category | Severity |
|---|-------|----------|----------|
| 1 | No device-specific `Service` schema | Local SEO | MEDIUM |
| 2 | Generic service page content, no device sections | CRO | MEDIUM |
| 3 | Generic WhatsApp CTA messages | CRO | LOW |
| 4 | 7 payment images missing width/height | CLS | MEDIUM |
| 5 | GTM/GA4 scripts blocking render | LCP | HIGH |

**NOT IN SCOPE:** Hydration optimization (client:visible)

## Scope

### In Scope:
1. **Service Schema Enhancement**
   - Add `Service` type schema for iPhone repair
   - Add `Service` type schema for MacBook repair
   - Include `hasOfferCatalog` with device-specific services

2. **Device-Specific Content Sections**
   - Reorganize `servicio-tecnico-apple.astro` to show device sections first
   - Add iPhone-specific services (screen, battery, Face ID, water damage)
   - Add MacBook-specific services (battery, screen, keyboard, logic board)
   - Use anchor navigation (iPhone, MacBook, iPad, Watch)

3. **Device-Specific WhatsApp CTAs**
   - CTA for iPhone: "Hola, quiero reparar mi iPhone"
   - CTA for MacBook: "Hola, quiero reparar mi MacBook"
   - Pre-filled WhatsApp message per device

4. **CLS Fix - PaymentBanner**
   - Add width/height attributes to 7 payment method images

5. **LCP Fix - Analytics Scripts**
   - Add `defer` attribute to GTM/GA4 scripts

### Out of Scope:
- Hydration optimization (client:load → client:visible)
- New pages (/iphone, /macbook)
- Font optimization
- heroBentoCarousel changes

## Approach

### Phase 1: Schema Enhancement
1. Create enhanced `ServicePageSchema.astro` with device-specific `Service` types
2. Use schema.org `Service` with `hasOfferCatalog` per device
3. Link to main LocalBusiness via `@id`

### Phase 2: Content Reorganization
1. Modify `servicio-tecnico-apple.astro` to show device selector first
2. Add device-specific content sections with detailed services
3. Use anchor links for navigation within page

### Phase 3: CTA Optimization
1. Create device-specific WhatsApp message templates
2. Update DeviceBento and service sections to use device-specific CTAs

### Phase 4: Performance Fixes
1. Add dimensions to PaymentBanner images
2. Add defer to GTM/GA4 scripts in Layout.astro

## Affected Files

| File | Change |
|------|--------|
| `src/components/SEO/ServicePageSchema.astro` | Device-specific Service schema |
| `src/pages/servicio-tecnico-apple.astro` | Reorganize content + CTAs |
| `src/components/payment/PaymentBanner.astro` | Add width/height to images |
| `src/layouts/Layout.astro` | Add defer to analytics scripts |

## Rollback Plan

```bash
git checkout HEAD~1 -- \
  src/components/SEO/ServicePageSchema.astro \
  src/pages/servicio-tecnico-apple.astro \
  src/components/payment/PaymentBanner.astro \
  src/layouts/Layout.astro
```

## Success Criteria

- [ ] Service schema with device-specific `hasOfferCatalog`
- [ ] Device sections visible on service page without scroll
- [ ] WhatsApp CTAs have device-specific pre-filled messages
- [ ] PaymentBanner images have explicit width/height
- [ ] GTM/GA4 scripts use defer attribute
- [ ] Build passes

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Schema duplication | LOW | Use `@id` reference to LocalBusiness |
| Content reorganization breaks layout | MEDIUM | Test on mobile viewport |
| WhatsApp messages need translation | LOW | Spanish messages already exist in codebase |

## Dependencies

- None - all changes are local to existing files