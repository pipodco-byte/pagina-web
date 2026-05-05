# Design: tailwind-migration

## Technical Approach

Use CSS Tokens Bridge (Approach C) to migrate from Creative Tim SCSS to Tailwind CSS without visual regressions.

## Architecture Decisions

### Decision 1: Prefix Strategy

**Choice**: Use `p-` prefix for all Tailwind classes
**Alternatives considered**: No prefix (risky collision with Bootstrap), `tw-` prefix (less intuitive)
**Rationale**: Avoids conflicts with Bootstrap's `.container`, `.row`, `.col-*` classes while maintaining readability

### Decision 2: Token Mapping Strategy

**Choice**: Map CSS variables to Tailwind theme, not hardcoded values
**Alternatives considered**: Hardcode values in Tailwind config (duplicates tokens), use CSS-first approach
**Rationale**: Single source of truth in `_tokens.css` - changing a token updates both custom CSS and Tailwind

### Decision 3: Grid Migration Order

**Choice**: Migrate layout/grid first (`.container`, `.row`, `.col-*`), then utilities
**Alternatives considered**: Migrate component by component (slower), migrate all at once (higher risk)
**Rationale**: Grid is the foundation - once grid is migrated, component migration becomes trivial

## Tailwind Configuration (v4 with @theme - ACTIVE)

**File:** `src/styles/global.css`

Tailwind v4 uses CSS-based configuration via `@theme` directive:

```css
@import "tailwindcss";

@theme {
  /* Bootstrap breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1400px;

  /* Colors from _tokens.css */
  --color-tech-blue: var(--pipod-color-tech-blue);
  --color-deep-blue: var(--pipod-color-deep-blue);

  /* Border Radius */
  --radius-standard: var(--pipod-radius-standard);  /* 24px */
  --radius-bento: var(--pipod-radius-large);         /* 40px */
  --radius-pill: var(--pipod-radius-pill);            /* 50px */

  /* Shadows */
  --shadow-pipod-card: var(--pipod-shadow-card);
  --shadow-pipod-elevated: var(--pipod-shadow-elevated);
}
```

**Status:** ✅ Configured and verified working with `npm run build`

## Migration Mapping

### Grid System

| Bootstrap | Tailwind v4 | Notes |
|-----------|-------------|-------|
| `.container` | `mx-auto px-4 max-w-7xl` | Or use container class |
| `.row` | `flex flex-wrap` | CSS Grid alternative: `grid grid-cols-12` |
| `.col-12` | `w-full` | |
| `.col-lg-6` | `lg:w-1/2` | |
| `.g-4` | `gap-4` | |
| `.gy-5` | `gap-y-5` | |

**Important:** v4 doesn't use prefix `p-` by default. We can use utility classes directly since Bootstrap CDN is still loaded separately.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `tailwind.config.mjs` | Create | Tailwind configuration with Pipod tokens |
| `src/styles/global.css` | Create | Tailwind directives + custom CSS |
| `src/styles/_tokens.css` | Read-only | Source of truth for design tokens |
| Layout components | Modify | Grid system migration |
| All 8 pages | Modify | Remove SCSS import |

## Rollback Plan

1. **Phase 0-2 rollback**: `npm uninstall tailwindcss` + uncomment SCSS imports
2. **Component rollback**: Each component can be reverted individually
3. **No data migration needed** - pure CSS change

## Testing Strategy

| Phase | What to Test | How |
|-------|-------------|-----|
| Phase 0 | Build passes | `npm run build` |
| Phase A | Grid layout matches | Visual comparison to production |
| Phase B | All components | Lighthouse + visual diff |
| Phase C | Full site | Percy/Chromatic visual regression |

## Open Questions

- [ ] Should we use `@tailwindcss/forms` plugin?
- [ ] Do we need `@tailwindcss/typography` for blog content?
- [ ] How to handle Bootstrap's `push`/`pull` for column reordering?