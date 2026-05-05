# Design: fix-contact-faq-blog

## Changes

| File | Line | Change |
|------|------|--------|
| `ContactFAQ.astro` | 5 | `style="padding: 80px 0;"` → `style="padding: 80px 0; background: #ffffff;"` |
| `BlogHeroSection.astro` | 7 | `font-weight: 700` → `font-weight: 800` |
| `TermsPage.astro` | 117 | Add `font-smoothing` to `.terms-sidebar` and `.terms-widgets` |
| `cardProduct.css` | 191-192 | `width: 24px; height: 24px;` → `width: 23px; height: 23px;` |

## Testing
- Dev server: `http://localhost:4321`
- Pages: `/contacto-pipod`, `/pipod-blog`, `/terminos-condiciones-pipod`
- Build: `npm run build`