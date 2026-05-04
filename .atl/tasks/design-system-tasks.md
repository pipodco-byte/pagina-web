# Tasks: PIPOD Design System

## Phase 1: CSS Tokens Foundation

### 1.1 Create Token File
- [ ] Create `src/styles/_tokens.css`
- [ ] Define color tokens: `--pipod-color-white`, `--pipod-color-black`, `--pipod-color-near-black`, `--pipod-color-deep-blue`, `--pipod-color-tech-blue`, `--pipod-color-light-surface`, `--pipod-color-border-gray`, `--pipod-color-disabled`
- [ ] Define typography tokens: `--pipod-font-inter`, `--pipod-font-pt-mono`, `--pipod-font-noto-sans`
- [ ] Define font size tokens for each role (display, heading, card-heading, ui-medium, body, label)
- [ ] Define font weight tokens: `--pipod-weight-regular`, `--pipod-weight-medium`, `--pipod-weight-semibold`, `--pipod-weight-bold`
- [ ] Define line height tokens: `--pipod-leading-tight`, `--pipod-leading-normal`, `--pipod-leading-relaxed`
- [ ] Define spacing tokens: `--pipod-space-xs` (8px) through `--pipod-space-3xl` (80px)
- [ ] Define radius tokens: `--pipod-radius-subtle` (8px), `--pipod-radius-standard` (24px), `--pipod-radius-large` (40px), `--pipod-radius-pill` (50px)
- [ ] Define shadow tokens: `--pipod-shadow-flat`, `--pipod-shadow-card`, `--pipod-shadow-elevated`, `--pipod-shadow-stats`
- [ ] Define layout tokens: `--pipod-container-max` (1440px), `--pipod-padding-desktop` (80px), `--pipod-padding-tablet` (40px), `--pipod-padding-mobile` (16px)
- [ ] Define stats bar token: `--pipod-stats-height` (119px)

### 1.2 Integrate Tokens into Layout
- [ ] Import `_tokens.css` in `src/layouts/Layout.astro`
- [ ] Replace existing hardcoded color values in Layout.astro with token references
- [ ] Verify tokens load correctly in browser dev tools

**Verification:** Inspect `:root` in dev tools and confirm all `--pipod-*` tokens are defined.

---

## Phase 2: Global Styles

### 2.1 Create Global CSS
- [ ] Create `src/styles/global.css`
- [ ] Add base resets for box-sizing, margin, padding
- [ ] Set body font-family using `--pipod-font-noto-sans`
- [ ] Set body font-size using `--pipod-size-body`
- [ ] Set body line-height using `--pipod-leading-relaxed`
- [ ] Set body color using `--pipod-color-near-black`
- [ ] Set background-color using `--pipod-color-light-surface`
- [ ] Add Inter font-face with token fallbacks
- [ ] Add PT Mono font-face with token fallbacks
- [ ] Add Noto Sans font-face with token fallbacks
- [ ] Add responsive container utility class

### 2.2 Import Global CSS
- [ ] Import `global.css` in Layout.astro after tokens
- [ ] Verify no style conflicts with Bootstrap

**Verification:** Load index page and confirm no FOUC (flash of unstyled content).

---

## Phase 3: Button System

### 3.1 Create Button Base Styles
- [ ] Create `src/styles/_buttons.css`
- [ ] Implement `.btn-primary` using `--pipod-color-tech-blue` bg, white text, 12px 24px padding, `--pipod-radius-subtle` radius, Inter 500
- [ ] Implement `.btn-primary:hover` with 0.9 opacity
- [ ] Implement `.btn-primary:focus` with `0 0 0 2px var(--pipod-color-tech-blue)` ring
- [ ] Implement `.btn-secondary` using `--pipod-color-near-black` bg, white text, 12px 24px padding, `--pipod-radius-subtle` radius
- [ ] Implement `.btn-secondary:hover` using `--pipod-color-deep-blue` bg
- [ ] Implement `.btn-pill` with transparent bg, `--pipod-color-border-gray` border, `--pipod-radius-pill` radius, 8px 16px padding
- [ ] Implement `.btn-pill` text in PT Mono 12px, `--pipod-color-tech-blue` color

### 3.2 Update pipodNavbar Buttons
- [ ] Update `src/components/pipodNavbar.css` - replace hardcoded button colors with `.btn-primary` and `.btn-secondary` classes
- [ ] Update `src/components/pipodNavbar.astro` - apply new button classes
- [ ] Verify navbar buttons render correctly

### 3.3 Update Hero CTA Buttons
- [ ] Update `src/components/hero/heroBentoCarousel.astro` - replace hardcoded CTA button styles
- [ ] Apply `.btn-primary` class to primary CTAs
- [ ] Verify carousel CTAs match spec

### 3.4 Update Product Card Buttons
- [ ] Update `src/components/products/cardProduct.css` - replace hardcoded button colors
- [ ] Update `src/components/products/cardProduct.astro` - apply `.btn-primary` class
- [ ] Verify product card buttons match spec

### 3.5 Update Palafito Donation Buttons
- [ ] Update `src/components/palafito/PalafitDonationOptions.astro` - replace donation option button styles
- [ ] Apply `.btn-primary` to primary donation CTAs
- [ ] Apply `.btn-secondary` to secondary options
- [ ] Verify palafito buttons match spec

**Verification:** Click each button type and confirm hover/focus states work.

---

## Phase 4: Card System

### 4.1 Create Card Styles
- [ ] Create `src/styles/_cards.css`
- [ ] Implement `.card-standard` with white bg, `--pipod-radius-standard` (24px), `--pipod-shadow-card`, 24-32px padding
- [ ] Implement `.card-bento` with white bg, `--pipod-radius-large` (40px), `--pipod-shadow-card`, 32px padding
- [ ] Implement `.card-stats` with white bg, `--pipod-radius-standard` (24px), `--pipod-shadow-card`, 119px height
- [ ] Implement `.card-stats .stats-number` using Inter 600 at 48px+
- [ ] Implement `.card-stats .stats-label` using PT Mono

### 4.2 Update Stats Component
- [ ] Update `src/components/stats/pipodStats.astro` - apply `.card-stats` class
- [ ] Update `src/components/stats/pipodStats.astro` - replace hardcoded colors with token references
- [ ] Verify stats cards have 119px height and proper typography

### 4.3 Update Service Cards
- [ ] Update `src/components/service/ServiceCard.astro` - apply `.card-standard` class
- [ ] Update `src/components/service/ServiceCard.astro` - replace hardcoded radius and shadow
- [ ] Verify service cards use 24px radius

### 4.4 Update Bento Cards
- [ ] Update `src/components/hero/heroBentoCarousel.astro` - apply `.card-bento` to bento items
- [ ] Update `src/components/home/ServiceCardsSection.astro` - apply `.card-bento`
- [ ] Verify bento cards use 40px radius

**Verification:** Compare card radius and shadow against spec requirements.

---

## Phase 5: Navigation

### 5.1 Standardize Navbar Styles
- [ ] Update `src/components/pipodNavbar.css` - replace hardcoded bg colors with `--pipod-color-white` and `--pipod-color-near-black`
- [ ] Update `src/components/pipodNavbar.css` - replace hardcoded border colors with `--pipod-color-border-gray`
- [ ] Update nav link font to Inter 500 using `--pipod-font-inter`
- [ ] Update nav link sizes using `--pipod-size-ui-medium`

### 5.2 Update Navbar Component
- [ ] Update `src/components/pipodNavbar.astro` - apply token-based classes
- [ ] Verify navbar horizontal padding follows spec (80px desktop)

**Verification:** Check navbar on mobile, tablet, desktop - confirm responsive behavior.

---

## Phase 6: Form Elements

### 6.1 Create Input Styles
- [ ] Create `src/styles/_forms.css`
- [ ] Implement input styles with `--pipod-color-border-gray` border, 1px solid
- [ ] Implement `:focus` state with `--pipod-color-tech-blue` border
- [ ] Implement `:focus` ring with `0 0 0 2px rgba(74,144,226,0.3)`
- [ ] Apply `--pipod-radius-subtle` (8px) radius
- [ ] Apply 12px 16px padding

### 6.2 Update Contact Form
- [ ] Update `src/components/contacto/ContactoForm.astro` - apply input styles
- [ ] Update `src/components/contact/ContactFormSection.astro` - apply input styles
- [ ] Verify form inputs have proper focus states

### 6.3 Update Checkout Form
- [ ] Update `src/components/checkout/CheckoutForm.css` - replace hardcoded form styles
- [ ] Apply `.form-input` class to checkout fields
- [ ] Verify checkout form inputs match spec

**Verification:** Focus each input type and confirm blue focus ring appears.

---

## Phase 7: Page Standardization

### 7.1 Index Page
- [ ] Audit `src/pages/index.astro` for hardcoded colors
- [ ] Replace any non-token color values with `--pipod-color-*` tokens
- [ ] Verify page background uses `--pipod-color-light-surface`
- [ ] Verify hero section uses token-based styling

### 7.2 Donate Page
- [ ] Audit `src/pages/donar.astro` for hardcoded colors
- [ ] Replace hardcoded bg colors with `--pipod-color-light-surface`
- [ ] Apply card-standard class to donation cards
- [ ] Verify donate page matches spec

### 7.3 Plan Retoma Page
- [ ] Audit `src/pages/plan-retoma-apple.astro` for hardcoded colors
- [ ] Update `src/components/retoma/RetomaHero.astro` - apply token-based styling
- [ ] Update `src/components/retoma/RetomaBenefits.astro` - apply card-standard
- [ ] Verify retoma page matches spec

### 7.4 Tienda Page
- [ ] Audit `src/pages/tienda-pipod.astro` for hardcoded colors
- [ ] Update `src/components/store/StoreHero.astro` - apply token-based styling
- [ ] Verify tienda page matches spec

### 7.5 Servicio Tecnico Page
- [ ] Audit `src/pages/servicio-tecnico-apple.astro` for hardcoded colors
- [ ] Update `src/components/service/ServiceHero.astro` - apply token-based styling
- [ ] Verify servicio-tecnico page matches spec

### 7.6 Donate Fundacion Palafito Page
- [ ] Audit `src/pages/donar-fundacion-palafito.astro` for hardcoded colors
- [ ] Update `src/components/palafito/PalafitHero.astro` - apply token-based styling
- [ ] Update `src/components/palafito/PalafitDonation.astro` - apply card styles
- [ ] Verify palafito page matches spec

**Verification:** Compare each page against spec color palette - no unauthorized colors should be present.

---

## Phase 8: Typography Standardization

### 8.1 Update Typography Hierarchy
- [ ] Audit all components for hardcoded font sizes
- [ ] Apply `--pipod-size-display` (48px+) to stats numbers
- [ ] Apply `--pipod-size-section-heading` (28-32px) to section headings
- [ ] Apply `--pipod-size-card-heading` (20-24px) to card titles
- [ ] Apply `--pipod-size-ui-medium` (16px) to navigation
- [ ] Apply `--pipod-size-body` (14-16px) to body text
- [ ] Apply `--pipod-size-label` (12-14px) to labels and PT Mono elements

### 8.2 Update Font Weights
- [ ] Audit all components for hardcoded font weights
- [ ] Apply `--pipod-weight-semibold` (600) to headings
- [ ] Apply `--pipod-weight-medium` (500) to UI elements
- [ ] Apply `--pipod-weight-regular` (400) to body text

### 8.3 Update Line Heights
- [ ] Apply `--pipod-leading-tight` (1.2) to headings
- [ ] Apply `--pipod-leading-normal` (1.5) to UI text
- [ ] Apply `--pipod-leading-relaxed` (1.5-1.6) to body text

**Verification:** Inspect typography hierarchy - should match spec table exactly.

---

## Phase 9: Shadow & Elevation Standardization

### 9.1 Audit Shadow Usage
- [ ] Search codebase for `box-shadow` declarations
- [ ] Replace `box-shadow: 0 2px 8px rgba(0,0,0,0.06)` with `--pipod-shadow-card`
- [ ] Replace `box-shadow: 0 4px 16px rgba(0,0,0,0.10)` with `--pipod-shadow-elevated`
- [ ] Replace any variant shadow values

### 9.2 Update Component Shadows
- [ ] Update card components to use `--pipod-shadow-card` only
- [ ] Update hover/floating elements to use `--pipod-shadow-elevated`
- [ ] Ensure no `box-shadow: none` is used except for flat elements

**Verification:** Compare shadow appearance against spec shadow definitions.

---

## Phase 10: Final Compliance Check

### 10.1 Color Compliance
- [ ] Run grep for hex colors: `#3A506B` and `#4A90E2` should only appear in token definitions
- [ ] Verify no hardcoded color values exist outside token files
- [ ] Confirm all blues are either `--pipod-color-tech-blue` or `--pipod-color-deep-blue`

### 10.2 Radius Compliance
- [ ] Run grep for `border-radius` values - only 8px, 24px, 40px, 50px should exist
- [ ] Verify no card has radius below 24px (except buttons/inputs at 8px)

### 10.3 Font Compliance
- [ ] Verify Inter is used for: headings, navigation, UI elements
- [ ] Verify PT Mono is used for: labels, tags, technical markers
- [ ] Verify Noto Sans is used for: body text

### 10.4 Spacing Compliance
- [ ] Verify 1440px container max-width
- [ ] Verify 80px horizontal padding on desktop
- [ ] Verify 119px height on stats bars

### 10.5 Build Verification
- [ ] Run `npm run build` or equivalent
- [ ] Verify no CSS errors during build
- [ ] Verify no unknown token references in build output

---

## Task Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| 1. CSS Tokens Foundation | 12 | Not Started |
| 2. Global Styles | 5 | Not Started |
| 3. Button System | 13 | Not Started |
| 4. Card System | 11 | Not Started |
| 5. Navigation | 4 | Not Started |
| 6. Form Elements | 8 | Not Started |
| 7. Page Standardization | 18 | Not Started |
| 8. Typography | 8 | Not Started |
| 9. Shadow Standardization | 5 | Not Started |
| 10. Final Compliance | 14 | Not Started |

**Total: 98 tasks**

---

## File Reference

### New Files to Create
- `src/styles/_tokens.css`
- `src/styles/global.css`
- `src/styles/_buttons.css`
- `src/styles/_cards.css`
- `src/styles/_forms.css`

### Files to Modify
- `src/layouts/Layout.astro`
- `src/components/pipodNavbar.astro`
- `src/components/pipodNavbar.css`
- `src/components/hero/heroBentoCarousel.astro`
- `src/components/products/cardProduct.astro`
- `src/components/products/cardProduct.css`
- `src/components/palafito/PalafitDonationOptions.astro`
- `src/components/stats/pipodStats.astro`
- `src/components/service/ServiceCard.astro`
- `src/components/home/ServiceCardsSection.astro`
- `src/components/contacto/ContactoForm.astro`
- `src/components/contact/ContactFormSection.astro`
- `src/components/checkout/CheckoutForm.css`
- `src/pages/index.astro`
- `src/pages/donar.astro`
- `src/pages/plan-retoma-apple.astro`
- `src/pages/tienda-pipod.astro`
- `src/pages/servicio-tecnico-apple.astro`
- `src/pages/donar-fundacion-palafito.astro`
- `src/components/retoma/RetomaHero.astro`
- `src/components/retoma/RetomaBenefits.astro`
- `src/components/store/StoreHero.astro`
- `src/components/service/ServiceHero.astro`
- `src/components/palafito/PalafitHero.astro`
- `src/components/palafito/PalafitDonation.astro`
