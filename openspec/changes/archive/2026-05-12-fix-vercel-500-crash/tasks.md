# Tasks: fix-vercel-500-crash

## Implementation Tasks

### Phase 1: Restore Missing Files (Cherry-pick)
- [x] Cherry-pick commit `5c2510c` to restore `client.ts`
- [x] Cherry-pick commit `5c2510c` to restore `types.ts`
- [x] Cherry-pick commit `5c2510c` to restore `slug.ts`
- [x] Verify files are in correct location relative to `/api/diag-supabase` endpoint

### Phase 2: Root Cause Fix (`.vercel` tracked in git)
- [x] Remove `.vercel` directory from git tracking: `git rm -r --cached .vercel`
- [x] Add `.vercel/` to `.gitignore`
- [x] Delete test/debug endpoints: `src/pages/api/test-minimal.ts`, `src/pages/api/test-simple.ts`

### Phase 3: Missing Dependency (`@supabase/supabase-js`)
- [x] Add `@supabase/supabase-js: ^2.105.3` to `package.json` dependencies
- [x] Commit and push

### Phase 4: Conflicting Standalone Function
- [x] Identify `api/test-standalone.ts` as Vercel-style function conflicting with Astro adapter
- [x] Delete `api/test-standalone.ts` from git

### Phase 5: Verification
- [x] Test `/api/diag-supabase` endpoint responds with HTTP 200
- [x] Verify main page (`/`) returns HTTP 200
- [x] Verify production domain (`www.pipod.co`) returns HTTP 200
- [x] Confirm endpoint returns Supabase diagnostics (view exists, products count = 10)

## Commits Made
1. `fca2ea6` — fix: remove .vercel from git tracking, add to .gitignore
2. `cd2d844` — fix: add missing @supabase/supabase-js dependency to package.json
3. `ca75287` — fix: remove api/test-standalone.ts (conflicting with Astro adapter)

## Root Causes Discovered
1. `.vercel` output directory was tracked in git, causing stale function chunks
2. `@supabase/supabase-js` was installed locally but missing from `package.json`
3. `api/test-standalone.ts` (Vercel-style standalone function) conflicted with `@astrojs/vercel` adapter output, causing `ERR_MODULE_NOT_FOUND: dist/server/entry.mjs`
