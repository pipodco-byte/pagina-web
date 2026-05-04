# Spec: Legacy CSS Cleanup

## Overview

This specification defines the CSS replacement required to remove the `assets/scss/astro-ecommerce.scss` dependency while maintaining visual fidelity across all 8 pages.

**Goal:** Pages must look **exactly the same** after SCSS removal.

---

## 1. CSS Replacement Architecture

### Source of Truth
- Design tokens live in `src/styles/_tokens.css`
- Replacement utilities reference existing `--pipod-*` tokens where applicable

### File Structure
```
src/styles/
├── _tokens.css           # Existing design tokens (DO NOT MODIFY)
├── _pipod-utilities.css  # NEW: Replacement utilities (CREATE)
```

### Integration Point
- Import `_pipod-utilities.css` in `src/layouts/Layout.astro`

---

## 2. Design Tokens (from _tokens.css)

### Shadow Tokens (EXISTING - reuse these)
```css
--pipod-shadow-card: 0 4px 12px rgba(0, 0, 0, 0.06);
--pipod-shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.1);
--pipod-shadow-stats: 0 2px 8px rgba(0, 0, 0, 0.08);
--pipod-shadow-hover: 0 10px 30px rgba(0, 0, 0, 0.2);
```

### Gradient Tokens (NEW - add to _tokens.css)
```css
--pipod-gradient-dark: linear-gradient(310deg, #141727 0%, #3a416f 100%);
--pipod-gradient-secondary: linear-gradient(310deg, #627594 0%, #a8b8d8 100%);
--pipod-gradient-text: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
--pipod-gradient-blue: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
```

### Button Colors (from _tokens.css)
```css
--pipod-color-btn-dark: #1a1a1a;
--pipod-color-btn-dark-hover: #000000;
```

---

## 3. Utility Classes to Implement

### Shadow Utilities (Bootstrap-style)
```css
.shadow-sm {
  box-shadow: var(--pipod-shadow-stats, 0 2px 8px rgba(0,0,0,0.08));
}

.shadow-md {
  box-shadow: var(--pipod-shadow-card, 0 4px 12px rgba(0,0,0,0.06));
}

.shadow-lg {
  box-shadow: var(--pipod-shadow-elevated, 0 8px 24px rgba(0,0,0,0.1));
}

.shadow-none {
  box-shadow: none !important;
}
```

### Gradient Classes
```css
.bg-gradient-dark {
  background-image: var(--pipod-gradient-dark);
}

.bg-gradient-secondary {
  background-image: var(--pipod-gradient-secondary);
}

.bg-gradient-blue {
  background-image: var(--pipod-gradient-blue);
}

[class*="bg-gradient-"] {
  color: #fff;
}
```

### Text Gradient
```css
.text-gradient {
  background: var(--pipod-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Z-Index Utility
```css
.z-index-10 {
  z-index: 10 !important;
}
```

---

## 4. Button System

### Base Button (.btn)
```css
.btn {
  margin-bottom: 0;
  box-shadow: none;
  transition: all 0.2s ease;
}

.btn:active,
.btn:active:focus,
.btn:active:hover {
  box-shadow: none;
  opacity: 0.85;
}

.btn:not(.btn-icon-only):hover {
  box-shadow: none;
  opacity: 0.85;
}
```

### Button Dark (.btn-dark)
```css
.btn.btn-dark {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
  color: #fff;
}

.btn.btn-dark:hover {
  background-color: #000;
  border-color: #000;
}
```

### Button White (.btn-white)
```css
.btn.btn-white {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  color: #1f2937;
}

.btn.btn-white:hover {
  background-color: #f9fafb;
}
```

### Button Large (.btn-lg)
```css
.btn.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
```

### Button Round (.btn-round)
```css
.btn.btn-round {
  border-radius: 0.5rem;
}
```

---

## 5. Component-Specific Overrides

### heroBentoCarousel.astro
Uses `shadow-sm` class. With the utility class above, no component changes needed.

### complexNavbar.tsx / complexNavbarDark.tsx
Uses `bg-gradient-dark`, `bg-gradient-secondary`. With gradient classes above, no component changes needed.

### checkoutOrderSummary.tsx
Uses `btn`, `bg-gradient`. With button and gradient classes above, no component changes needed.

### Pagination
```css
.pagination .active .page-link {
  color: #fff;
}
```

---

## 6. Implementation Checklist

### Add to _tokens.css (NEW tokens)
- [ ] `--pipod-gradient-dark`
- [ ] `--pipod-gradient-secondary`
- [ ] `--pipod-gradient-text`
- [ ] `--pipod-gradient-blue`

### Create _pipod-utilities.css with
- [ ] Shadow utilities (.shadow-sm, .shadow-md, .shadow-lg, .shadow-none)
- [ ] Gradient classes (.bg-gradient-dark, .bg-gradient-secondary, .bg-gradient-blue)
- [ ] Text gradient (.text-gradient)
- [ ] Z-index utility (.z-index-10)
- [ ] Button system (.btn, .btn-dark, .btn-white, .btn-lg, .btn-round)
- [ ] Pagination override

### Integrate
- [ ] Import `_pipod-utilities.css` in Layout.astro

### Test Pages (in order of risk)
1. [ ] terminos-condiciones-pipod.astro
2. [ ] shopping-cart.astro
3. [ ] pipod-blog.astro
4. [ ] tienda-pipod.astro
5. [ ] servicio-tecnico-apple.astro
6. [ ] contacto-pipod.astro
7. [ ] producto/[slug].astro
8. [ ] index.astro

---

## 7. Files to Delete After Verification

- `assets/scss/astro-ecommerce.scss`
- `assets/scss/astro-ecommerce/` (entire directory)
- `assets/js/astro-ecommerce.js`
- `LICENSE.MD` (Creative Tim license)

---

## 8. Rollback Procedure

If any page shows visual differences:
1. Uncomment the SCSS import in the affected page
2. Do NOT delete the utilities file
3. Investigate which utility is missing

---

*Spec created: 2026-05-04*
*Change: legacy-css-cleanup*