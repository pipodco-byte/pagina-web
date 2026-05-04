# Proposal: local-seo-cro-v2

## Intent

Fix critical Local SEO gaps (NAP inconsistency, broken device links) and implement automatic Google Reviews sync for pipod.co to improve search visibility and trust signals.

## Context

### Previous Audit Results:
- Local SEO score: 6/10
- CRO score: 5/10

### Issues Found:
1. **NAP Inconsistency**: `pipodGooglemaps.astro` has wrong address "Cra. 7 #114-21" + wrong coords (4.7110, -74.0059). Correct: "Cra. 13a #79-52" + (4.6658, -74.0578)
2. **DeviceBento 404**: Links to `/macbook` and `/iphone` pages that DON'T EXIST
3. **Reviews stuck at 63**: Google Places API credentials not configured, no auto-sync

### Quick Wins Available:
| # | Issue | Fix | Risk |
|---|-------|-----|------|
| 1 | Wrong address in maps | Update pipodGooglemaps.astro | LOW |
| 2 | Wrong coords in maps | Update pipodGooglemaps.astro | LOW |
| 3 | DeviceBento /macbook 404 | Change to valid URL | LOW |
| 4 | DeviceBento /iphone 404 | Change to valid URL | LOW |
| 5 | Reviews not syncing | Configure env vars + cron/webhook | MED |

## Scope

### In Scope:
- Unify NAP to "Cra. 13a #79-52" across all components
- Fix DeviceBento links to use existing pages
- Configure Google Places API for automatic review sync
- Add reviews.json update mechanism (cron job or webhook)

### Out of Scope:
- New content pages
- Citation building campaign
- Full redesign
- Apple certification claims

## Approach

### Phase 1: NAP Fixes (Low Risk)
1. Update `pipodGooglemaps.astro` default address to "Cra. 13a #79-52"
2. Update coordinates to (4.6658, -74.0578)
3. Verify all touchpoints: LocalBusinessSchema, footer, contact

### Phase 2: DeviceBento Fixes (Low Risk)
1. Change `/macbook` link → `/servicio-tecnico-apple?device=macbook`
2. Change `/iphone` link → `/servicio-tecnico-apple?device=iphone`
3. Or point to main service page with scroll-to-device selector

### Phase 3: Reviews Sync (Medium Risk)
1. Document required env vars in `.env.example`
2. Add to Vercel cron (if on Vercel) or external cron
3. Provide manual trigger endpoint

## Affected Files

| File | Change |
|------|--------|
| `src/components/maps/pipodGooglemaps.astro` | Address + coords |
| `src/components/service/DeviceBento.astro` | Fix 404 links |
| `.env.example` | Document required vars |
| `vercel.json` or `cron.yaml` | Add sync schedule |

## Rollback Plan

```bash
git checkout HEAD~1 -- src/components/maps/pipodGooglemaps.astro src/components/service/DeviceBento.astro
```

## Success Criteria

- [ ] NAP consistent across all components
- [ ] No 404 links from DeviceBento
- [ ] Reviews sync working (updates within 24h of Google change)
- [ ] Schema validation passes

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Wrong address affects Maps ranking | LOW | Update Google Business Profile simultaneously |
| DeviceBento link change reduces clicks | LOW | Ensure destination works and has device selector |
| Reviews sync fails | MED | Manual fallback + alerts |

## Dependencies

- Google Places API key with Place Details permission
- Vercel Pro for cron jobs (or external cron service)