# Spec: local-seo-cro-v2

## Overview

Fix critical Local SEO gaps and broken internal links identified during audit of pipod.co. This change addresses NAP inconsistency, 404 errors, and outdated review counts.

## Context

### Issue 1: NAP Inconsistency

**Problem**: `pipodGooglemaps.astro` had incorrect address and coordinates:
- Address: "Cra. 7 #114-21" (WRONG)
- Coords: lat 4.7110, lng -74.0059 (WRONG)

**Correct values** (aligned with LocalBusinessSchema):
- Address: "Cra. 13a #79-52"
- Coords: lat 4.6658, lng -74.0578

**Impact**: NAP inconsistency confuses Google about actual location, potentially hurting local SEO ranking.

### Issue 2: DeviceBento 404 Links

**Problem**: `DeviceBento.astro` linked to `/macbook` and `/iphone` pages that don't exist:
- `/macbook` → 404
- `/iphone` → 404

**Fix**: Point to existing service page with anchor:
- `/macbook` → `/servicio-tecnico-apple#device-selector`
- `/iphone` → `/servicio-tecnico-apple#device-selector`

**Impact**: Broken links cause crawl errors and hurt SEO.

### Issue 3: Reviews Count Outdated

**Problem**: reviews.json showed 63 reviews but actual count is 88.

**Fix**:
1. Updated reviews.json to 88
2. Updated hardcoded `reviewsData` in LocalBusinessSchema.astro to 88
3. Documented Google Places API env vars for future auto-sync

## Files Modified

| File | Change |
|------|--------|
| `src/components/maps/pipodGooglemaps.astro` | Address + coords corrected |
| `src/components/service/DeviceBento.astro` | Fixed 404 links |
| `src/components/SEO/LocalBusinessSchema.astro` | Updated review count to 88 |
| `public/data/reviews.json` | Updated to 88 reviews |
| `.env.example` | Added Google Places API docs |

## Verification Scenarios

### Scenario 1: Address Consistency
**Given** I search for "Pipod servicio técnico Apple Bogotá" on Google
**When** Google displays the local business panel
**Then** the address shown matches "Cra. 13a #79-52, Chapinero, Bogotá"

### Scenario 2: No 404 Errors
**Given** I crawl the site with Screaming Frog
**When** I check for 404 errors
**Then** no links to `/macbook` or `/iphone` return 404

### Scenario 3: Reviews Count
**Given** I view the LocalBusinessSchema in page source
**When** I check aggregateRating.reviewCount
**Then** it shows "88" (not 63)

### Scenario 4: DeviceBento Links
**Given** I click "Diagnóstico Pro" on MacBook card
**When** the page loads
**Then** I am on `/servicio-tecnico-apple#device-selector`

## Rollback

```bash
git checkout HEAD~1 -- \
  src/components/maps/pipodGooglemaps.astro \
  src/components/service/DeviceBento.astro \
  src/components/SEO/LocalBusinessSchema.astro \
  public/data/reviews.json
```

## Dependencies

- Google Places API key (for future auto-sync)
- Vercel cron or external scheduler (for auto-sync)

## Status

✅ Implemented and verified (build passing)