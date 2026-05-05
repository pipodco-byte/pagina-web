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

## Tailwind Configuration

```javascript
// tailwind.config.mjs
export default {
  prefix: 'p-',
  theme: {
    extend: {
      colors: {
        'tech-blue': 'var(--pipod-color-tech-blue)',
        'deep-blue': 'var(--pipod-color-deep-blue)',
        'pipod-black': 'var(--pipod-color-black)',
        'pipod-white': 'var(--pipod-color-white)',
        'surface': 'var(--pipod-color-surface)',
        'border': 'var(--pipod-color-border)',
        'success': 'var(--pipod-color-success)',
        'error': 'var(--pipod-color-error)',
      },
      fontFamily: {
        'inter': 'var(--pipod-font-inter)',
      },
      borderRadius: {
        'standard': 'var(--pipod-radius-standard)',
        'bento': 'var(--pipod-radius-large)',
        'pill': 'var(--pipod-radius-pill)',
      },
      boxShadow: {
        'pipod-card': 'var(--pipod-shadow-card)',
        'pipod-elevated': 'var(--pipod-shadow-elevated)',
      },
      screens: {
        'sm': '576px',   // Bootstrap sm
        'md': '768px',   // Bootstrap md
        'lg': '992px',   // Bootstrap lg
        'xl': '1200px',  // Bootstrap xl
      },
    },
  },
  plugins: [],
}
```

## Migration Mapping

### Grid System

| Bootstrap | Tailwind | Notes |
|-----------|----------|-------|
| `.container` | `p-container p-mx-auto p-px-4` | Or use `@tailwindcss/typography` |
| `.row` | `p-flex p-flex-wrap` | CSS Grid alternative: `p-grid p-grid-cols-12` |
| `.col-12` | `p-w-full` | |
| `.col-lg-6` | `p-lg:w-1/2` | |
| `.g-4` | `p-gap-4` | |
| `.gy-5` | `p-gap-y-5` | |

### Utility Classes

| Bootstrap | Tailwind | Notes |
|-----------|----------|-------|
| `.d-flex` | `p-flex` | |
| `.d-none` | `p-hidden` | |
| `.d-md-none` | `p-hidden p-md:p-block` | |
| `.text-center` | `p-text-center` | |
| `.mt-4` | `p-mt-4` | |
| `.mb-4` | `p-mb-4` | |
| `.p-4` | `p-p-4` | |

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