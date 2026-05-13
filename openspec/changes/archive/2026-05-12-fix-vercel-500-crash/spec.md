# Spec: fix-vercel-500-crash

## Overview

**Change Name:** fix-vercel-500-crash  
**Type:** Bug Fix  
**Intent:** Fix `FUNCTION_INVOCATION_FAILED` errors on Vercel by restoring missing Supabase support files that were not included in a previous merge.  
**Approach:** Cherry-pick commit `5c2510c` to add the missing files.

---

## Problem Statement

The `/api/diag-supabase` endpoint crashes at runtime because required Supabase support files are missing from the codebase. The missing files were part of commit `5c2510c` but were inadvertently excluded during a previous cherry-pick or merge operation.

**Error:** `FUNCTION_INVOCATION_FAILED` (Vercel serverless function error)

---

## Missing Files (to be restored via cherry-pick)

| File | Purpose |
|------|---------|
| `client.ts` | Supabase client initialization |
| `types.ts` | TypeScript type definitions for Supabase entities |
| `slug.ts` | Slug utility functions |

These files are located in the Supabase-related directory structure and are required by the `/api/diag-supabase` endpoint.

---

## Expected Behavior After Fix

1. **Runtime Stability:** The `/api/diag-supabase` endpoint no longer throws `FUNCTION_INVOCATION_FAILED`
2. **Successful Build:** Vercel deployment completes without errors
3. **Endpoint Accessible:** The diagnostic endpoint responds normally (200 OK or appropriate response)

---

## Test Scenarios

### Scenario 1: Endpoint Availability
- **Given** the fix has been deployed
- **When** a request is made to `/api/diag-supabase`
- **Then** the endpoint responds with a 200 status (or expected diagnostic response)
- **And** no `FUNCTION_INVOCATION_FAILED` error is thrown

### Scenario 2: Local Development
- **Given** the developer has pulled the fix
- **When** running `npm run dev` or `astro dev`
- **Then** the `/api/diag-supabase` endpoint loads without import errors
- **And** no missing file warnings appear in the console

### Scenario 3: Vercel Deployment
- **Given** the fix has been pushed to the connected branch
- **When** Vercel runs the build
- **Then** the build completes successfully
- **And** the serverless function deploys without errors

---

## Rollback Plan

If the cherry-pick introduces regressions:
1. Revert to the previous commit
2. Identify an alternative approach to restore the missing files
3. Re-test `/api/diag-supabase` endpoint

---

## Dependencies

- Commit `5c2510c` must be valid and contain the correct implementations of `client.ts`, `types.ts`, and `slug.ts`
- No breaking changes to existing API contracts
