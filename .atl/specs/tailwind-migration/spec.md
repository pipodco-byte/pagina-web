# Spec: tailwind-migration

## Scope

### In Scope
- Install Tailwind CSS with `p-` prefix
- Configure Tailwind using `--pipod-*` CSS tokens
- Migrate Bootstrap grid to Tailwind
- Remove SCSS after successful migration

### Out of Scope
- Rewriting working custom CSS
- Adding new features
- Changing design tokens

---

## ADDED Requirements

### Requirement: Tailwind Configuration

The system MUST have a `tailwind.config.mjs` file that:
- Uses `p-` prefix for all classes
- Maps all `--pipod-*` CSS tokens to Tailwind theme
- Includes Bootstrap-compatible breakpoints (576px, 768px, 992px)

### Requirement: Grid Migration

The system MUST replace all Bootstrap grid classes:
- `.container` → Tailwind container utilities
- `.row` → `p-flex p-flex-wrap`
- `.col-*` → Tailwind width utilities
- `.g-*`, `.gy-*`, `.gx-*` → `p-gap-*`

### Requirement: Visual Fidelity

The system SHALL maintain visual parity with production:
- All colors MUST match `--pipod-color-*` tokens
- All border-radius values MUST match `--pipod-radius-*` tokens
- All shadows MUST match `--pipod-shadow-*` tokens

---

## MODIFIED Requirements

### Requirement: Build Process

(Previously: Build with SCSS imports)

The build process MUST:
- Include Tailwind CSS compilation
- NOT include SCSS imports in any page
- Generate CSS bundle < 50% of current size

---

## REMOVED Requirements

### Requirement: SCSS Imports

(Reason: Replaced by Tailwind)

SCSS imports MUST NOT exist in any page or component:
- `@import "astro-ecommerce/..."` statements
- Reference to `assets/scss/` files

---

## Scenarios

### Scenario: Phase 0 Setup

- GIVEN Developer runs `npx astro add tailwind`
- WHEN Tailwind is installed and configured
- THEN `tailwind.config.mjs` exists with `p-` prefix
- AND All `--pipod-*` tokens are mapped to theme
- AND `npm run build` passes

### Scenario: Grid Migration

- GIVEN Tailwind is installed
- WHEN Developer migrates a component with `.container`, `.row`, `.col-lg-6`
- THEN Classes are replaced with `p-container p-mx-auto p-px-4`, `p-flex p-flex-wrap`, `p-lg:w-1/2`
- AND Visual layout matches Bootstrap grid

### Scenario: Visual Regression Check

- GIVEN Migration is complete
- WHEN QA reviews pages
- THEN Colors match design tokens exactly
- AND Border-radius matches `--pipod-radius-*` values
- AND No visual drift from production