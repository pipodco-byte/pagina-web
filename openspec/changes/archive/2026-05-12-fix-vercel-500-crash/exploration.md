# Exploration: fix-vercel-500-crash

## Topic
Fix Vercel serverless function crash on `/api/diag-supabase` caused by missing Supabase support files in `main` branch after partial cherry-pick.

## Current State

### The Problem
After cherry-picking commits `ab46f1e` (diag-supabase.ts) and `de1114f` (mock fallback) to `main`, the endpoint crashes with `FUNCTION_INVOCATION_FAILED`.

**Root cause**: The cherry-pick was incomplete. `de1114f` modified `products.ts` which imports from files that don't exist in `main`:
- `../../lib/supabase/client` — **MISSING**
- `../slug` — **MISSING**

### Files Already in main (after cherry-pick)
| File | Status |
|------|--------|
| `src/lib/mockProductos.ts` | ✅ Present |
| `src/lib/supabase/products.ts` | ✅ Present |
| `src/pages/api/diag-supabase.ts` | ✅ Present |

### Files Missing in main
| File | Origin Commit | Status |
|------|--------------|--------|
| `src/lib/supabase/client.ts` | `5c2510c` | ❌ MISSING |
| `src/lib/supabase/types.ts` | `5c2510c` | ❌ MISSING |
| `src/lib/slug.ts` | `5c2510c` | ❌ MISSING |

### Commit Dependency Chain
```
5c2510c (base) ──→ client.ts, types.ts, slug.ts, products.ts
de1114f (dep) ──→ mockProductos.ts, updated products.ts with imports
ab46f1e ────────→ diag-supabase.ts (imports client.ts)
```

## Affected Areas
- `src/lib/supabase/products.ts` — references non-existent imports
- `src/pages/api/diag-supabase.ts` — imports `../../lib/supabase/client`
- `src/lib/mockProductos.ts` — imports `../supabase/types`

## Approaches

### Option A: Cherry-pick full commit `5c2510c` (RECOMMENDED)
Cherry-pick the base commit that added all Supabase support files.

**Commands:**
```bash
git cherry-pick 5c2510c
```

**Pros:**
- Clean, atomic solution
- All files from same commit context
- No manual file editing

**Cons:**
- Includes Bold checkout changes (not related to fix)

**Effort:** Low

### Option B: Cherry-pick only the specific files needed
Cherry-pick individual files from `5c2510c`:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/types.ts`
- `src/lib/slug.ts`

**Commands:**
```bash
git cherry-pick 5c2510c --no-commit
git checkout -- src/lib/supabase/client.ts src/lib/supabase/types.ts src/lib/slug.ts
git commit
```

**Pros:**
- Surgical, only needed files

**Cons:**
- More complex git operations
- Risk of partial commits

**Effort:** Medium

### Option C: Copy files manually
Copy the three missing files from `develop` branch to working directory and commit.

**Commands:**
```bash
git checkout develop -- src/lib/supabase/client.ts src/lib/supabase/types.ts src/lib/slug.ts
git commit
```

**Pros:**
- Simple, direct

**Cons:**
- No commit history context
- Manual intervention

**Effort:** Low

## Recommendation

**Option A — Cherry-pick `5c2510c`**

The simplest fix. The commit `5c2510c` ("feat: Supabase products integration + Bold checkout improvements") already added all the missing files.

Cherry-picking it will add:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/types.ts`
- `src/lib/slug.ts`
- `src/lib/bold-types.ts` (bonus, no harm)
- `src/lib/hmac.ts` (bonus, no harm)

## Risks
- None identified — adding files that should have been there
- No code conflicts expected since files don't exist in main

## Ready for Proposal
Yes. The fix is straightforward:
1. Cherry-pick `5c2510c` to main
2. Push to origin/main
3. Verify on Vercel

