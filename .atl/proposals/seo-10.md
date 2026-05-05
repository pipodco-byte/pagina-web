# Proposal: seo-10

## Intent

Improve SEO from 8/10 to 10/10 by implementing high-precision tasks that combine semantic schema, technical authority, and CRO optimization. All tasks are non-disruptive and focused on "Engineering Boutique" quality.

## Context

### Current State: 8/10
| Category | Score |
|----------|-------|
| Content Quality | 8/10 |
| Technical SEO | 9/10 |
| Structured Data | 9/10 |
| Performance | 7/10 |
| Local SEO | 8/10 |
| Sitemap/Crawl | 8/10 |

### Target: 10/10

---

## Scope (Updated)

### NEW: High-Precision Tasks

| # | Task | Impact | Priority |
|---|------|--------|----------|
| M1 | **FAQPage Schema** — FAQ accordion in service page | +0.2 | 🔴 HIGH |
| IN | **IndexNow** — Instant search engine notification | +0.1 | 🔴 HIGH |
| V | **VideoObject** — Professional video in SERPs | +0.2 | 🟡 MEDIUM |
| C | **Topic Clusters** — Semantic authority structure | +0.3 | 🟡 MEDIUM |
| L | **Hyper-Local Pages** — Neighborhood-specific pages | +0.1 | 🟢 LOW |

### ORIGINAL: Core Tasks

| # | Task | Impact | Priority |
|---|------|--------|----------|
| H1 | Citations locals (Yelp, Thomson, etc.) | +0.5 | 🔴 HIGH |
| H2 | Reviews con fotos | +0.3 | 🟢 LOW (no code) |
| M2 | HowTo schema | +0.1 | 🟡 MEDIUM |
| M3 | Imágenes WebP | +0.3 | 🟡 MEDIUM |
| L1 | Core Web Vitals | +0.1 | 🟢 LOW |
| L2 | Internal linking | +0.1 | 🟢 LOW |

---

## Success Criteria

- [ ] Score SEO: 10/10
- [ ] FAQPage schema visible in SERPs
- [ ] IndexNow configured and working
- [ ] Video schema (if video available)
- [ ] Topic cluster structure defined
- [ ] Minimum 3 directory citations
- [ ] Core Web Vitals: LCP<2.5s, CLS<0.1
- [ ] Internal links from blog to products

---

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| FAQ schema too generic | LOW | Use pipod-specific questions |
| Video quality issues | MEDIUM | Use hosted video, not embedded |
| Cluster content creation effort | HIGH | Start with existing content |

---

## Dependencies

- Deploy a Vercel for L1 measurement
- Video content for V task (optional)
- Blog posts for C and L2 tasks