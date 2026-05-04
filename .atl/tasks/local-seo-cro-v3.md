# Tasks: local-seo-cro-v3

## Status: ⏳ IN PROGRESS

## Implementation Checklist

### Phase 1: PaymentBanner CLS Fix ✅
- [x] **1.1** Add width="48" height="48" to visa.svg
- [x] **1.2** Add width="48" height="48" to mastercard.svg
- [x] **1.3** Add width="48" height="48" to american-express.svg
- [x] **1.4** Add width="48" height="48" to pse.svg
- [x] **1.5** Add width="48" height="48" to nequi.svg
- [x] **1.6** Add width="48" height="48" to daviplata.svg
- [x] **1.7** Add width="48" height="48" to bold.svg

### Phase 2: Layout.astro LCP Fix ✅
- [x] **2.1** Add defer to GTM script
- [x] **2.2** Add defer to GA4 script

### Phase 3: WhatsApp CTA Messages ✅
- [ ] **3.1** Define CTA_MESSAGES constant with device-specific messages
- [ ] **3.2** Create getWhatsAppUrl helper function
- [ ] **3.3** Update DeviceBento to use device-specific CTAs
- [ ] **3.4** Update service sections to use device-specific CTAs

### Phase 4: ServicePageSchema Enhancement ⏳
- [ ] **4.1** Change schema to @graph array format
- [ ] **4.2** Add iPhone Service schema with hasOfferCatalog
- [ ] **4.3** Add MacBook Service schema with hasOfferCatalog
- [ ] **4.4** Link both to LocalBusiness via @id

### Phase 5: servicio-tecnico-apple.astro Reorganization ⏳
- [ ] **5.1** Add anchor navigation tabs (iPhone, MacBook, iPad, Watch)
- [ ] **5.2** Reorder sections: iPhone first, then MacBook
- [ ] **5.3** Add iPhone-specific services section
- [ ] **5.4** Add MacBook-specific services section
- [ ] **5.5** Update CTAs to use device-specific WhatsApp messages

### Phase 6: Verification ✅
- [ ] **6.1** Run npm run build - must pass
- [ ] **6.2** Schema validation via Rich Results Test
- [ ] **6.3** Visual test on mobile viewport
- [ ] **6.4** Commit and push to develop

---

## Quick Wins (Implemented First)

### PaymentBanner.astro
```diff
- <img src="/images/visa.svg" alt="Visa">
+ <img src="/images/visa.svg" alt="Visa" width="48" height="48">
```

### Layout.astro
```diff
- <script src="https://www.googletagmanager.com/gtag/js?id=GA4"></script>
+ <script src="https://www.googletagmanager.com/gtag/js?id=GA4" defer></script>
```

---

## Files to Modify

| File | Priority | Risk |
|------|----------|------|
| `src/components/payment/PaymentBanner.astro` | 1 (SAFEST) | LOW |
| `src/layouts/Layout.astro` | 2 | LOW |
| `src/components/SEO/ServicePageSchema.astro` | 3 | MEDIUM |
| `src/pages/servicio-tecnico-apple.astro` | 4 | MEDIUM |

---

## Rollback Command

```bash
git checkout HEAD~1 -- \
  src/components/SEO/ServicePageSchema.astro \
  src/pages/servicio-tecnico-apple.astro \
  src/components/payment/PaymentBanner.astro \
  src/layouts/Layout.astro
```