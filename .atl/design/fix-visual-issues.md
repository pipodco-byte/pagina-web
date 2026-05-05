# Design: fix-visual-issues

## Lecciones Aprendidas

### 1. SCSS elimination dejó gaps críticos
- `font-smoothing: antialiased` era global en SCSS original
- Badge size original: 23px (no 24px como se agregó inicialmente)
- Bootstrap default h1 weight: 500, pero heroes usan 700-800

### 2. CSS faltante crítico - DEBE IR EN Layout.astro
```css
html * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
- Afecta TODA la página
- Debe ser global, no por componente

### 3. Background inheritance
- Section sin background = hereda del body (#F5F5F7)
- Items con `background: #fff` + gap = se ve gris entre ellos
- SOLUCIÓN: Agregar `background: #ffffff` explícito en sections

### 4. Scope: Qué restaurar vs reemplazar
| Tipo | Ubicación | Ejemplo |
|------|-----------|---------|
| GLOBAL | Layout.astro | font-smoothing, typography scale |
| PER-PAGE | Page components | backgrounds explícitos en sections |
| COMPONENT | cardProduct.css | badge sizes exactas |

## Fixes Aplicados (Actualizado 2026-05-05)

### Commit: 646de65 - "fix: restore visual styles lost in SCSS removal"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `Layout.astro` | font-smoothing global | `html * { -webkit-font-smoothing: antialiased }` |
| `_pipod-utilities.css` | btn pill shape | `border-radius: 50px` + `box-shadow` en `.btn.btn-dark` |

### Commit: b52ab38 - "fix: restore visual styles - FAQ bg, blog h1, terms font-smoothing, badge size"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `ContactFAQ.astro` | FAQ section bg grey | `background: #ffffff` en section |
| `BlogHeroSection.astro` | h1 weight 700 | Cambiar a 800 |
| `TermsPage.astro` | font-smoothing | `font-smoothing: antialiased` en sidebar/widgets |
| `cardProduct.css` | badge 24px | Cambiar a 23px (correcto según original) |

### Commit: e65e39b - "fix: restore pending visual styles"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `pipodNavbar.css` | nav-item font-weight | Cambiar de 500 a 600 |
| `productOverviewGrid.tsx` | h2 weight | Cambiar de 700 a 800 |

### Commit: f99d4d9 - "fix: navbar weight, terms shadows, producto background"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `pipodNavbar.css` | font-weight 500→600 | Confirmado 600 |
| `TermsPage.astro` | sidebar box-shadow | Agregar `box-shadow` a `.terms-sidebar` |
| `TermsPage.astro` | widget box-shadow | Agregar `box-shadow` a `.widget` |
| `producto/[slug].astro` | background | `background: #ffffff` |

### Commit: 52a24a1 - "fix: producto border, terms sidebar bg, cartStore hydration error"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `productOverviewGrid.tsx` | border | `border: 'none'` |
| `TermsPage.astro` | sidebar background | `background: #FFFFFF` |
| `cartStore.ts` | hydration error | Initialize empty, sync via useEffect post-hydration |

### Commit: 242e427 - "fix(terms): restore SCSS import for terms page"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `terminos-condiciones-pipod.astro` | Missing SCSS import | Uncomment `import '../../assets/scss/astro-ecommerce.scss'` |

### Commit: 3224c56 - "fix(terms): restore TermsPage styles to match main exactly"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `TermsPage.astro` | Styles different from main | Restored exact main styles |

**Changes reverted to match main:**
- `.terms-sidebar background: #FFFFFF → #F5F5F7`
- `.terms-sidebar` removed added box-shadow
- `.sidebar-title` restored to main version (no negative margin)
- `.widget` removed added box-shadow

### Commit: 79f2c7f - "fix(servicio-tecnico): restore SCSS import for Google Fonts"
| Archivo | Issue | Fix |
|---------|-------|-----|
| `servicio-tecnico-apple.astro` | Google Fonts no cargaban | Uncomment `import '../../assets/scss/astro-ecommerce.scss'` |

**Root cause:** El SCSS de TIM incluye las declaraciones `@import` para Google Fonts (Inter, etc.). Sin el SCSS, las fuentes no se cargaban.

## Resumen de Fixes por Archivo

| Archivo | Fixs Aplicados |
|---------|----------------|
| `Layout.astro` | font-smoothing global |
| `pipodNavbar.css` | font-weight 600 |
| `_pipod-utilities.css` | btn pill border-radius + shadow |
| `cardProduct.css` | badge size 23px |
| `TermsPage.astro` | sidebar bg white, box-shadow, font-smoothing |
| `ContactFAQ.astro` | FAQ section background white |
| `BlogHeroSection.astro` | h1 weight 800 |
| `productOverviewGrid.tsx` | border none, h2 weight 800 |
| `producto/[slug].astro` | background white |
| `cartStore.ts` | hydration fix (empty init + useEffect sync) |

## Pending Issues - RESUELTOS

| Issue | Estado | Solución |
|-------|--------|-----------|
| FAQ bg white | ✅ RESUELTO | `background: #ffffff` en section |
| Blog h1 weight 800 | ✅ RESUELTO | `font-weight: 800` |
| Terms sidebar/widgets sharp fonts | ✅ RESUELTO | `font-smoothing` + `box-shadow` |
| Badge 23px | ✅ RESUELTO | Size correcto |
| Navbar font weight | ✅ RESUELTO | 600 |
| producto page border | ✅ RESUELTO | `border: 'none'` |
| CartStore hydration | ✅ RESUELTO | Empty init + useEffect |

## Success Criteria
- [x] FAQ bg white
- [x] Blog h1 weight 800
- [x] Terms sidebar/widgets sharp fonts
- [x] Badge 23px
- [x] Navbar font weight 600
- [x] producto page border removed
- [x] CartStore hydration error fixed
- [x] All visual gaps from SCSS removal restored

---

## UPDATE: 2026-05-05 - TIM Migration Discovery

### Discovery: 206 CSS Design Tokens Already Exist
File: `src/styles/_tokens.css` (created 2026-05-04)

These tokens define the complete Pipod design system:
- Colors: `--pipod-color-*` (black, tech-blue, deep-blue, success, error)
- Typography: `--pipod-text-*`, `--pipod-weight-*`
- Spacing: `--pipod-space-*` (8px base system)
- Border Radius: `--pipod-radius-*` (8px, 24px, 40px, 50px)
- Shadows: `--pipod-shadow-*` (card, elevated, stats)
- Layout: `--pipod-container`, `--pipod-padding-*`

### Key Insight
The custom CSS files (`.pipodNavbar.css`, `.cardProduct.css`) are **NOT Bootstrap-dependent** - they already use custom classes and reference Inter font directly.

### DECISION: ABANDON Tailwind v4 Migration

**Date:** 2026-05-05
**Reason:** Tailwind v4 integration via `global.css` was causing MORE visual regressions than it solved:
- Google logo appeared enormous in ReviewWall
- Review cards layout and margins broken
- Navbar shadows and spacing inconsistent
- Each fix broke something else

### Rollback Actions (Commit: 44a3de1)
| File | Action | Reason |
|------|--------|--------|
| `Layout.astro` | Removed `import '../styles/global.css'` | Remove Tailwind v4 entry |
| `src/styles/global.css` | DELETED | Tailwind v4 no longer needed |
| `astro.config.mjs` | Removed `@tailwindcss/vite` plugin | Disable Tailwind v4 |
| `tailwind.config.mjs` | DELETED | Config no longer needed |

### Lessons Learned
- Tailwind v4 CSS cascade behaves differently than expected
- Global CSS imports affect ALL components unexpectedly
- Bootstrap/TIM SCSS was working correctly before migration attempts
- When something breaks repeatedly, the approach is wrong - not the implementation

### Current State
- Back to main branch styling approach (Bootstrap/TIM SCSS + Bootstrap CDN)
- Google Fonts fixed by restoring SCSS import on pages that needed it
- All visual gaps from initial SCSS removal have been addressed individually

### Files Affected by Migration
| File | Action | Reason |
|------|--------|--------|
| `tailwind.config.mjs` | DELETED | Tailwind v4 abandoned |
| `src/styles/global.css` | DELETED | Tailwind v4 no longer needed |
| Layout.astro | Removed global.css import | Disable Tailwind v4 |