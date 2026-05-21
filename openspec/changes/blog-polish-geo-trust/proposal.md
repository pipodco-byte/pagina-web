# Proposal: Blog Polish (GEO + Trust + Conversion)

> **Change**: `blog-polish-geo-trust`
> **Phase**: proposal
> **Status**: draft

## Intent

Optimize Pipod's 73 blog articles to boost Generative Engine Optimization (GEO), Conversion Rate Optimization (CRO), and Trust (E-E-A-T) using "La Fórmula Pipod".

## Scope

### In Scope
- Refactor 73 articles in prioritized batches of 10.
- **Batch 1**: 10 articles focusing on iPhones, screens, and batteries.
- **Conversion Hook**: First paragraph (<100 words) targeting user pain and Pipod's solution.
- **Internal Linking**: Minimum 2 links to `/tienda-pipod` or `/servicio-tecnico-apple`.
- **Trust Nuggets (T&C)**: 12-month component warranty, backup recommendation, 1.5h diagnostic.
- **Pipod Expert Tip**: Unique technical insight block for LLM citation.

### Out of Scope
- Modifying blog listing, layouts, or visual components.
- Sourcing or writing new blog posts.
- Restructuring Astro Content Collections schema.

## Approach

Update the body and structure of `/src/content/blog/*.md` files. Use standard Markdown and styled HTML blocks for the Conversion Hook and Expert Tip to ensure high visibility. Apply changes in batches, prioritizing commercial content first.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/content/blog/*.md` | Modified | Update 73 articles in batches of 10. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Frontmatter schema break | Med | Run `npm run build` validation after every batch. |
| Markdown formatting issues | Low | Peer review and standard markdown syntax enforcement. |

## Rollback Plan

Use Git to discard changes in modified files: `git checkout src/content/blog/`.

## Dependencies

- None.

## Success Criteria

- [ ] All 73 articles updated with the 4-part "Pipod Formula".
- [ ] ≥2 strategic internal links present in each article.
- [ ] Zero build errors during `npm run build` validation.
- [ ] T&C trust signals successfully injected across all optimized articles.
