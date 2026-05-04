# Tasks: local-seo-cro-v2

## Status: ✅ COMPLETED

## Implementation Tasks

### Phase 1: NAP Fixes ✅

- [x] **1.1** Update `pipodGooglemaps.astro` address from "Cra. 7 #114-21" to "Cra. 13a #79-52"
- [x] **1.2** Update `pipodGooglemaps.astro` coords from (4.7110, -74.0059) to (4.6658, -74.0578)

### Phase 2: DeviceBento Fixes ✅

- [x] **2.1** Fix `/macbook` link in DeviceBento.astro → `/servicio-tecnico-apple#device-selector`
- [x] **2.2** Fix `/iphone` link in DeviceBento.astro → `/servicio-tecnico-apple#device-selector`

### Phase 3: Reviews Update ✅

- [x] **3.1** Update `reviews.json` totalReviews from 63 to 88
- [x] **3.2** Update `LocalBusinessSchema.astro` hardcoded review count from 63 to 88
- [x] **3.3** Document Google Places API env vars in `.env.example`

### Phase 4: Verification ✅

- [x] **4.1** Run `npm run build` - verify no errors
- [x] **4.2** Verify sitemap generates correctly

---

## Verification Checklist

- [x] Build passes with no errors
- [x] No 404 links from DeviceBento
- [x] NAP consistent: Address "Cra. 13a #79-52" in both schema and maps
- [x] Reviews count updated to 88
- [x] `.env.example` contains Google Places API documentation

---

## Files Modified

```
src/components/maps/pipodGooglemaps.astro      ✅ Address + coords fixed
src/components/service/DeviceBento.astro       ✅ 404 links fixed
src/components/SEO/LocalBusinessSchema.astro   ✅ Reviews: 63 → 88
public/data/reviews.json                      ✅ Reviews: 63 → 88
.env.example                                  ✅ Google Places docs added
```

---

## Rollback Command

```bash
git checkout HEAD~1 -- \
  src/components/maps/pipodGooglemaps.astro \
  src/components/service/DeviceBento.astro \
  src/components/SEO/LocalBusinessSchema.astro \
  public/data/reviews.json
```

---

## Future Tasks (Not in Scope)

- [ ] Configure Vercel cron for `/api/sync-reviews`
- [ ] Add Google Places API credentials to `.env.local`
- [ ] Create dedicated iPhone/MacBook pages with service-specific schemas
- [ ] Verify footer contact info matches NAP