# Proposal: fix-contact-faq-blog

## Intent
Restaurar estilos visuales residuales en 3 páginas después de remover SCSS.

## Scope
- FAQ section background en contacto
- Blog hero h1 weight
- Terms sidebar/widgets font-smoothing
- Badge size fix (24px → 23px)

## Approach
CSS-only fixes en 4 archivos.

## Files
| File | Change |
|------|--------|
| `ContactFAQ.astro` | Add background:#fff to section |
| `BlogHeroSection.astro` | h1 weight 700→800 |
| `TermsPage.astro` | Add font-smoothing |
| `cardProduct.css` | 24px→23px |

## Risks
None - cosmetic only.

## Success
- [ ] FAQ bg white
- [ ] Blog h1 weight 800
- [ ] Terms sidebar/widgets sharp fonts
- [ ] Badge 23px