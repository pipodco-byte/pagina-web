# Design: fix-vercel-500-crash

## Overview

**Change:** Fix Vercel serverless crash by restoring missing Supabase support files  
**Approach:** Cherry-pick commit `5c2510c`  
**Root Cause:** Missing files were excluded during a previous cherry-pick or merge operation

---

## Architecture Decisions

### AD-1: File Restoration via Cherry-Pick
- **Decision:** Use `git cherry-pick 5c2510c` to restore the missing files
- **Rationale:** Ensures exact restoration of files as they existed in the source commit, maintaining consistency
- **Risk:** Low — rollback is simply reverting the cherry-pick commit

### AD-2: Target Directory: `src/lib/supabase/`
- **Decision:** Files are restored to `src/lib/supabase/` and `src/lib/`
- **Rationale:** Matches the existing import paths in `diag-supabase.ts` and `products.ts`

---

## File Structure After Fix

```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts       ← NEW (restored via cherry-pick)
│   │   ├── types.ts        ← NEW (restored via cherry-pick)
│   │   └── products.ts     ← EXISTING
│   ├── slug.ts              ← NEW (restored via cherry-pick)
│   └── mockProductos.ts     ← EXISTING
└── pages/
    └── api/
        └── diag-supabase.ts ← EXISTING (was crashing)
```

---

## Import Relationships

### 1. `diag-supabase.ts`
```typescript
import { supabase } from '../../lib/supabase/client';
```
**Dependencies:** `client.ts`

### 2. `products.ts` (existing)
```typescript
import { supabase } from './client';           // client.ts
import type { WebProduct, ... } from './types'; // types.ts
import { slugify } from '../slug';             // slug.ts
import { getMockProductos } from '../mockProductos';
```
**Dependencies:** `client.ts`, `types.ts`, `slug.ts`

### 3. `mockProductos.ts` (existing)
```typescript
import type { WebProductWithVariants } from './supabase/types';
```
**Dependencies:** `types.ts`

---

## Missing Files to Restore

| File | Purpose | Export |
|------|---------|--------|
| `src/lib/supabase/client.ts` | Supabase client singleton | `supabase` |
| `src/lib/supabase/types.ts` | TypeScript types for Supabase entities | `WebProduct`, `WebProductVariante`, `WebProductWithVariants` |
| `src/lib/slug.ts` | Slug utility function | `slugify` |

---

## Dependency Graph

```
diag-supabase.ts
       │
       └──► supabase/client.ts

products.ts
       │
       ├──► supabase/client.ts
       ├──► supabase/types.ts
       ├──► lib/slug.ts (../slug)
       └──► lib/mockProductos.ts

mockProductos.ts
       │
       └──► supabase/types.ts
```

---

## Implementation

### Step 1: Cherry-Pick
```bash
git cherry-pick 5c2510c
```

### Step 2: Verify Files Restored
- [ ] `src/lib/supabase/client.ts` exists
- [ ] `src/lib/supabase/types.ts` exists
- [ ] `src/lib/slug.ts` exists

### Step 3: Verify Imports Resolve
- [ ] `npm run build` completes without import errors
- [ ] No `MODULE_NOT_FOUND` errors for `../../lib/supabase/client`

### Step 4: Test Endpoint
- [ ] `GET /api/diag-supabase` returns 200 (credentials configured) or appropriate diagnostic response

---

## Rollback Plan

1. `git revert <cherry-pick-commit>` to undo the restoration
2. Alternative: manually restore files if commit history is unavailable

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cherry-pick conflict | Low | Low | Manual merge if conflict occurs |
| Files still missing after cherry-pick | Low | High | Verify file contents match expected imports |
| Breaking existing imports | Low | High | Run full test suite after fix |

---

## Dependencies

- Commit `5c2510c` must contain valid implementations of:
  - `client.ts` — exports `supabase` client
  - `types.ts` — exports `WebProduct*` types
  - `slug.ts` — exports `slugify` function
