# Proposal: seo-10

## Intent

Improve SEO from 8/10 to ~9.5/10 by implementing HowTo schema, image WebP optimization, Core Web Vitals measurement, and internal linking. All tasks are non-disruptive and low-risk.

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

### Target: ~9.5/10

## Scope

### In Scope:
- **H1:** Citations locals (Yelp, Thomson, directorios Bogotá) — +0.5
- **H2:** Reviews con fotos — +0.3 (already partially done, 3 photos missing)
- **M2:** HowTo schema (guías "cómo cuidar tu iPhone") — +0.1
- **M3:** Imágenes WebP — +0.3
- **L1:** Core Web Vitals (medir post-deploy) — +0.1
- **L2:** Internal linking blog → productos/servicios — +0.1

### Out of Scope:
- H3: Reducir fonts (4→2) — user decision to ignore
- heroBentoCarousel — alto riesgo
- Nueva arquitectura de contenido

## Approach

### H1: Citations Locales
Create business listings on:
1. Yelp Colombia (yelp.com.co)
2. Thomson Local
3. Apple specialist directories
4. Servicios técnicos Bogotá directories
5. Páginas Amarillas Colombia

### H2: Reviews con Fotos
- 6 reviews reales ya existen en código
- 3 fotos faltan (wilson.jpg, sergio.jpg, nicolas.jpg)
- Necesario obtener fotos de estos clientes reales
- Alternativa: usar iniciales si fotos no disponibles

### M2: HowTo Schema
Create guides like:
- "Cómo cuidar tu iPhone después de una reparación"
- "5 tips para extender la vida de tu batería MacBook"
Add HowTo schema markup.

### M3: Imágenes WebP
- Identificar imágenes PNG/JPG sin WebP
- Convertir a WebP manteniendo fallback
- Priorizar imágenes above-the-fold

### L1: Core Web Vitals
- Deploy a Vercel
- Medir con PageSpeed Insights
- Optimizar según resultados

### L2: Internal Linking
- Mapear blog posts en /pipod-blog
- Añadir links contextuales a productos/servicios

## Success Criteria

- [ ] Score SEO: ~9.5/10
- [ ] Minimum 3 directory citations added
- [ ] HowTo schema validated
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1
- [ ] Internal links from blog to products

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Citations rejected by directories | LOW | Try multiple directories |
| WebP quality issues | MEDIUM | Keep original as fallback |
| Core Web Vitals fail thresholds | MEDIUM | Investigate specific issues |

## Dependencies

- Deploy a Vercel para medir Core Web Vitals
- Fotos de clientes (Wilson, Sergio, Nicolas) — obtener o usar iniciales
- Blog posts existentes para internal linking

## Rollback

All changes are additive/non-destructive:
- Citations: manually remove if needed
- HowTo schema: remove component
- WebP: revert to original images
- Internal links: remove anchor tags