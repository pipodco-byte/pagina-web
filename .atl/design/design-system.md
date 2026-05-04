# Design: PIPOD Design System

## Overview

Formalize PIPOD's visual language into a centralized CSS token system. The approach defines `--pipod-*` custom properties, organizes design system files under `src/styles/`, and phases migration from hardcoded values to token-based styling.

## Technical Approach

### CSS Custom Properties (Design Tokens)

```css
/* ===== CANVAS ===== */
--pipod-color-white: #ffffff;
--pipod-color-near-black: #1F1F1F;
--pipod-color-black: #000000;

/* ===== BRAND BLUES ===== */
--pipod-color-tech-blue: #4A90E2;
--pipod-color-deep-blue: #3A506B;

/* ===== SURFACES ===== */
--pipod-color-surface: #F5F5F7;
--pipod-color-border: #E5E5E7;

/* ===== TYPOGRAPHY ===== */
--pipod-font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--pipod-font-mono: 'PT Mono', Monaco, Consolas, monospace;
--pipod-font-body: 'Noto Sans', system-ui, sans-serif;

/* ===== FONT SIZES ===== */
--pipod-text-display: clamp(3rem, 5vw, 4.5rem);
--pipod-text-section: clamp(1.75rem, 3vw, 2rem);
--pipod-text-card: clamp(1.25rem, 2vw, 1.5rem);
--pipod-text-ui: 1rem;
--pipod-text-body: 0.9375rem;
--pipod-text-label: 0.75rem;

/* ===== FONT WEIGHTS ===== */
--pipod-weight-regular: 400;
--pipod-weight-medium: 500;
--pipod-weight-semibold: 600;
--pipod-weight-bold: 700;
--pipod-weight-black: 800;

/* ===== SPACING (8px base) ===== */
--pipod-space-xs: 0.5rem;   /* 8px */
--pipod-space-sm: 1rem;      /* 16px */
--pipod-space-md: 1.5rem;   /* 24px */
--pipod-space-lg: 2rem;     /* 32px */
--pipod-space-xl: 3rem;      /* 48px */
--pipod-space-2xl: 4rem;     /* 64px */
--pipod-space-3xl: 5rem;    /* 80px */

/* ===== BORDER RADIUS ===== */
--pipod-radius-subtle: 8px;
--pipod-radius-standard: 24px;
--pipod-radius-large: 40px;
--pipod-radius-pill: 50px;

/* ===== SHADOWS ===== */
--pipod-shadow-card: 0 2px 8px rgba(0,0,0,0.06);
--pipod-shadow-elevated: 0 4px 16px rgba(0,0,0,0.10);
--pipod-shadow-stats: 0 2px 12px rgba(0,0,0,0.08);

/* ===== LAYOUT ===== */
--pipod-container: 1440px;
--pipod-padding-desktop: 80px;
--pipod-padding-tablet: 40px;
--pipod-padding-mobile: 1rem;
--pipod-stats-height: 119px;

/* ===== BUTTON TOKENS ===== */
--pipod-btn-primary-bg: var(--pipod-color-tech-blue);
--pipod-btn-primary-text: var(--pipod-color-white);
--pipod-btn-secondary-bg: var(--pipod-color-near-black);
--pipod-btn-secondary-text: var(--pipod-color-white);
--pipod-btn-pill-bg: var(--pipod-color-black);
--pipod-btn-pill-text: var(--pipod-color-white);
```

## Component Architecture

### Button System

| Class | Background | Text | Radius | Hover |
|-------|-----------|------|--------|-------|
| `.btn-primary` | `--pipod-color-tech-blue` | white | 8px | opacity 0.9 |
| `.btn-secondary` | `--pipod-color-near-black` | white | 8px | `--pipod-color-deep-blue` bg |
| `.btn-pill` | `--pipod-color-black` | white | 50px | translateY(-2px) + shadow |
| `.btn-pill-outline` | transparent | `--pipod-color-tech-blue` | 50px | 1px solid border |

### Card System

| Class | Background | Radius | Shadow | Padding |
|-------|-----------|--------|--------|---------|
| `.card` | white | 24px | `--pipod-shadow-card` | 24–32px |
| `.card-bento` | white | 40px | `--pipod-shadow-card` | 32px |
| `.card-stats` | white | 24px | `--pipod-shadow-card` | 24px, height 119px |
| `.card-dark` | `#000` | 40px | none | 32px |

### Input System

```css
.pipod-input {
  border: 1px solid var(--pipod-color-border);
  border-radius: var(--pipod-radius-subtle);
  padding: 12px 16px;
  font-family: var(--pipod-font-body);
}

.pipod-input:focus {
  border-color: var(--pipod-color-tech-blue);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
  outline: none;
}
```

## File Organization

```
src/styles/
├── _tokens.css          # All --pipod-* custom properties
├── _typography.css      # Font imports, text utilities
├── _buttons.css         # Button component styles
├── _cards.css           # Card component styles
├── _inputs.css          # Form input styles
├── _layout.css          # Container, spacing utilities
└── _shadows.css         # Shadow utilities

src/components/
├── pipodNavbar.tsx      # Uses tokens via CSS class
├── pipodNavbar.css      # Imports _tokens.css
├── serviceCard.tsx
├── serviceCard.css
└── ...

src/layouts/
└── Layout.astro         # Imports all _*.css files
```

**Import chain:**
```astro
<!-- In Layout.astro head -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=PT+Mono&family=Noto+Sans:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/src/styles/_tokens.css">
<link rel="stylesheet" href="/src/styles/_typography.css">
<link rel="stylesheet" href="/src/styles/_buttons.css">
<!-- etc -->
```

## Migration Path

### Phase 1: Token Foundation
1. Create `src/styles/_tokens.css` with all `--pipod-*` variables
2. Update `Layout.astro` to import `_tokens.css`
3. Verify no regressions

### Phase 2: Buttons
1. Create `src/styles/_buttons.css` with `.btn-primary`, `.btn-secondary`, `.btn-pill`
2. Update `pipodNavbar.css` to use `--pipod-btn-*` tokens
3. Update any page-specific button CSS
4. **Target files:** `pipodNavbar.css`

### Phase 3: Cards
1. Create `src/styles/_cards.css` with `.card`, `.card-bento`, `.card-stats`
2. Update `serviceCard.css` to use `.card-bento` class
3. Update `cardProduct.css` to use `.card` class
4. **Target files:** `serviceCard.css`, `cardProduct.css`

### Phase 4: Typography
1. Create `src/styles/_typography.css` with font-face and text utilities
2. Remove inline `@import url(https://fonts.googleapis.com...)` from component CSS
3. Replace hardcoded `font-family: 'Inter'` with `--pipod-font-display`

### Phase 5: Inputs & Forms
1. Create `src/styles/_inputs.css` with `.pipod-input`
2. Update checkout and cart components

## Priority Order

| Priority | Task | Rationale |
|----------|------|-----------|
| 1 | Colors (`#F5F5F7` vs `#ffffff` backgrounds) | Visual inconsistency across pages |
| 2 | Button styles (`#000` vs `#1F1F1F` vs `#0066cc`) | High-visibility inconsistency |
| 3 | Border radius (8px vs 24px vs 40px) | Bento aesthetic depends on radius |
| 4 | Font imports (remove duplicates) | Performance impact |
| 5 | Shadow values | Subtle but affects depth perception |

## Implementation Notes

### Hardcoded Colors to Replace

| Current | Replace With |
|---------|--------------|
| `#0066cc` | `--pipod-color-tech-blue` |
| `#000000` (buttons) | `--pipod-btn-pill-bg` or `--pipod-color-black` |
| `#1B1B1B` | `--pipod-color-near-black` |
| `#666666` | `--pipod-text-secondary` (define in tokens) |
| `#E8E8E8` | `--pipod-color-border` |

### Palafito Special Case

The `/donar-fundacion-palafito` page uses `#F5F5F7` background + `#000` pill buttons. This combination is intentional for the Palafito brand and should be preserved as a variant, not changed.

```css
/* Palafito variant - preserved */
.page-palafito {
  --pipod-page-bg: var(--pipod-color-surface);
  --pipod-btn-pill-bg: var(--pipod-color-black);
}
```

### Responsive Breakpoints

| Breakpoint | Width | Padding |
|------------|-------|---------|
| Mobile | <480px | 16px |
| Tablet | 480–768px | 24px |
| Desktop | 768–1024px | 40px |
| Wide | 1024–1440px | 80px |
| Max | >1440px | 80px centered |

## Open Questions

- [ ] Should Bootstrap utilities be replaced or layered with token system?
- [ ] Any components that CANNOT be migrated to token classes (e.g., carousel)?
- [ ] Timeline for removing old CSS files after migration complete?
