# Proposal: Document PIPOD Design System

## Intent

The PIPOD website has accumulated design decisions over time that are currently implicit and inconsistent across pages. An exploration phase has documented the existing state in `ESTADO.md` following the Airbnb DESIGN.md format. This proposal formalizes the design system documentation so future development can reference canonical tokens, patterns, and rules instead of inferring them from code.

## Scope

### In Scope
- ESTADO.md creation (COMPLETED)
- Canonical token definitions (colors, typography, spacing, radius)
- Migration of ESTADO.md to `.atl/proposals/` for SDD lifecycle
- Design system documentation in Spanish following PIPOD conventions

### Out of Scope
- Code changes to fix inconsistencies (documented as warnings)
- New component library creation
- Refactoring existing pages
- Accessibility audit

## Approach

1. **Preserve existing work**: ESTADO.md serves as the foundation — it already captures colors, typography, spacing, and inconsistencies in Airbnb format.

2. **Extend for SDD lifecycle**: Move proposal to `.atl/proposals/` directory with proper metadata.

3. **Create formal tokens reference**: Define CSS custom properties for each token (colors, fonts, spacing) that can be applied to code.

4. **Document inconsistencies as legacy patterns**: Flag inconsistencies with ⚠️ warnings and label them as patterns to address in follow-up changes.

5. **Create agent prompt guide**: ESTADO.md already includes this — maintain and expand as the canonical reference for AI-assisted development.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| ESTADO.md | Updated | Already captures design state — will be referenced by future SDD phases |
| .atl/proposals/document-design-system.md | New | Formal proposal document |
| Future changes | Reference | All component/page work references this design system |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Inconsistencies require code changes to resolve | Medium | Document as "legacy" patterns in ESTADO.md, plan follow-up SDD for standardization |
| ESTADO.md format diverges from Airbnb spec | Low | Already follows Airbnb DESIGN.md structure with sections 1-9 |
| Tokens become outdated as pages are updated | Medium | Establish review process — any page using non-token values triggers update |

## Rollback Plan

This proposal documents existing state — no code changes are made. Rollback means:
1. Do not adopt ESTADO.md as the canonical design system reference
2. Continue inferring design from individual page code
3. Delete proposal file if SDD lifecycle is rejected

For future phases that implement code changes based on this design system, each will have its own rollback plan.

## Dependencies

- Exploration completed: ESTADO.md created with full design audit
- 6 pages analyzed: index, donate, plan-retoma, tienda, servicio-tecnico, donate-fundacion-palafito
- 10+ components documented: navbar, footer, hero, stats, cards, payment, etc.

## Success Criteria

- [x] ESTADO.md exists and follows Airbnb DESIGN.md format (COMPLETED)
- [x] All actual colors documented with hex codes (COMPLETED)
- [x] Typography system documented with font families, sizes, weights (COMPLETED)
- [x] Spacing and layout tokens defined (COMPLETED)
- [x] Border radius scale documented (COMPLETED)
- [x] Inconsistencies flagged with ⚠️ warnings (COMPLETED)
- [x] Agent prompt guide included for AI-assisted development (COMPLETED)
- [ ] Proposal document created in .atl/proposals/ (THIS PROPOSAL)
- [ ] Design system formally adopted as reference for future changes