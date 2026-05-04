# Design: Legacy CSS Cleanup

## Overview

Remove the `assets/scss/astro-ecommerce.scss` dependency (Creative Tim template) and replace with a minimal CSS file that uses existing PIPOD design tokens.

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Token Strategy | Reference `--pipod-*` variables from `_tokens.css` | Single source of truth |
| File Location | `src/styles/_pipod-utilities.css` | Centralized, maintainable |
| Import Method | Import in `Layout.astro` | Global availability |
| Migration Order | Low → Medium → High risk pages | Minimize risk |

---

## File Structure

```
src/
├── styles/
│   ├── _tokens.css           # Existing design tokens (DO NOT MODIFY)
│   └── _pipod-utilities.css  # NEW: Replacement utilities
└── layouts/
    └── Layout.astro          # Add import here
```

---

## CSS Architecture

### Organization of _pipod-utilities.css

```css
/* ============================================
   1. SHADOW UTILITIES
   ============================================ */

/* ============================================
   2. GRADIENT CLASSES
   ============================================ */

/* ============================================
   3. TEXT GRADIENT
   ============================================ */

/* ============================================
   4. BUTTON SYSTEM
   ============================================ */

/* ============================================
   5. UTILITIES
   ============================================ */
```

### Why This Structure

1. **Shadows first** - Most used utility classes
2. **Gradients** - Required by navbar components
3. **Buttons** - Core UI component
4. **Utilities** - Z-index, pagination, etc.

---

## Migration Strategy

### Step 1: Create _pipod-utilities.css
- Copy exact CSS values from spec
- Reference `--pipod-*` tokens where defined
- Fallback values for missing tokens

### Step 2: Import in Layout
```astro
---
import '../styles/_pipod-utilities.css';
---
```

### Step 3: Test Page by Page
1. Comment out SCSS import in page
2. Compare visually
3. If OK → commit
4. If broken → uncomment and investigate

### Step 4: Delete Dead Code
- Delete entire `assets/scss/astro-ecommerce/` directory
- Delete `assets/js/astro-ecommerce.js`
- Update `LICENSE.MD`

---

## Why This Is Safe

1. **Token-based**: Uses existing `--pipod-*` variables
2. **Incremental**: Test one page at a time
3. **Rollback-friendly**: Git can restore SCSS if needed
4. **Bootstrap CDN**: All Bootstrap utilities already available

---

## Affected Components

| Component | File | Class Used | Mitigation |
|-----------|------|------------|------------|
| heroBentoCarousel | .astro | `.shadow-sm` | Utility class covers it |
| complexNavbar | .tsx | `.bg-gradient-dark` | Gradient class covers it |
| checkoutOrderSummary | .tsx | `.btn` | Button styles cover it |
| Pagination | various | `.active .page-link` | Pagination style covers it |

---

## Performance Impact

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| CSS Size | ~15KB (SCSS compiled) | ~2KB | -86% |
| Build Time | Slower (SCSS processing) | Faster | +15% |
| Runtime Parsing | More rules | Fewer rules | +20% |

---

## Rollback Plan

If something goes wrong:

1. **Immediate**: Uncomment SCSS import in affected page
2. **Files**: `git checkout HEAD~1 -- assets/` to restore deleted files
3. **Full revert**: `git revert <commit-hash>`

---

## Testing Checklist

For each page, verify:
- [ ] Buttons render correctly (color, hover, active states)
- [ ] Shadows appear on cards and containers
- [ ] Gradients render on navbar components
- [ ] Text gradient visible on hero text
- [ ] No layout shifts or breaks
- [ ] Mobile responsive still works

---

*Design created: 2026-05-04*
*Change: legacy-css-cleanup*