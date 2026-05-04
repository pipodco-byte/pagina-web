# Design: local-seo-cro-v2

## Overview

Technical design for fixing Local SEO gaps and broken links in pipod.co.

## Problem Analysis

### NAP Inconsistency

Two components had different addresses:
- **LocalBusinessSchema.astro**: "Cra. 13a #79-52" ✅
- **pipodGooglemaps.astro**: "Cra. 7 #114-21" ❌ (wrong)

**Root Cause**: Component developed independently without unified data source.

**Solution**: Standardize on correct address "Cra. 13a #79-52" with coordinates (4.6658, -74.0578) across all components.

### DeviceBento 404 Links

Links pointed to non-existent pages:
```html
<a href="/macbook"> → 404
<a href="/iphone"> → 404
```

**Root Cause**: Copy-paste from design mockups without verifying page existence.

**Solution**: Use existing service page with anchor:
```html
<a href="/servicio-tecnico-apple#device-selector">
```

### Reviews Stale Data

- reviews.json: 63 reviews (outdated)
- LocalBusinessSchema hardcode: 63 reviews
- Actual Google count: 88 reviews

**Root Cause**: No auto-sync configured, manual updates forgotten.

**Solution**:
1. Manual update to 88 (immediate)
2. Document Google Places API config (future auto-sync)

## Architecture

### Data Flow for Reviews

```
Google Places API
       ↓ (via cron/webhook)
/api/sync-reviews (POST)
       ↓
public/data/reviews.json
       ↓ (runtime fetch)
pipodGoogleReviews.jsx ← Uses fetch('/data/reviews.json')
LocalBusinessSchema.astro ← Hardcoded fallback (needs update)
```

### Address Data Flow

```
LocalBusinessSchema.astro (source of truth)
       ↓
pipodGooglemaps.astro (receives via props)
       ↓
Layout/footer components (need verification)
```

## Changes Summary

### 1. pipodGooglemaps.astro

```diff
const {
  title = "PIPOD - Servicio Técnico Apple",
- address = "Cra. 7 #114-21, Bogotá, Colombia",
+ address = "Cra. 13a #79-52, Bogotá, Colombia",
  phone = "+57 312 481 3094",
  hours = "Lun-Sab: 10:00 AM - 6:00 PM",
  image = "/images/fachada_pipod_panoramica.webp",
- lat = 4.7110,
+ lat = 4.6658,
- lng = -74.0059
+ lng = -74.0578
} = Astro.props;
```

### 2. DeviceBento.astro

```diff
- <a href="/macbook" class="btn-pipod-white">Diagnóstico Pro</a>
+ <a href="/servicio-tecnico-apple#device-selector" class="btn-pipod-white">Diagnóstico Pro</a>

- <a href="/iphone" class="btn-pipod-outline">Agendar</a>
+ <a href="/servicio-tecnico-apple#device-selector" class="btn-pipod-outline">Agendar</a>
```

### 3. LocalBusinessSchema.astro

```diff
- const reviewsData = { rating: "5.0", totalReviews: 63 };
+ const reviewsData = { rating: "5.0", totalReviews: 88 };
```

### 4. reviews.json

```diff
{
  "rating": "5.0",
- "totalReviews": 63,
+ "totalReviews": 88,
- "lastUpdated": "2026-03-27T20:53:50.992Z",
+ "lastUpdated": "2026-05-04T00:00:00.000Z",
- "comments": [
-   "Datos sincronizados desde Google Places API",
-   "Archivos que usan este dato:",
-   "- src/components/promo/pipodGoogleReviews.jsx",
-   "- src/components/SEO/LocalBusinessSchema.astro",
-   ...
- ]
+ "source": "manual_update",
+ "comments": [
+   "Actualización manual - Google Places API no configurada",
+   "Para auto-sync: configurar GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID en .env",
+   "Endpoint de sync: POST /api/sync-reviews"
+ ]
}
```

### 5. .env.example

Added:
```
# Google Places API (Reviews Sync)
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
GOOGLE_PLACE_ID=your_google_place_id_here
```

## Testing Strategy

1. **Build verification**: `npm run build` passes
2. **Schema validation**: Use [Rich Results Test](https://search.google.com/test/rich-results)
3. **404 check**: Crawl site for broken links
4. **Manual review**: Verify maps shows correct address

## Future Enhancements

1. **Auto-sync reviews**: Configure Vercel cron for `/api/sync-reviews`
2. **Dynamic address**: Pull from single source of truth (CMS or env var)
3. **Service-specific schemas**: Add schema for each repair type (iPhone, MacBook, iPad)