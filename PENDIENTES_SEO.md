# PENDIENTES SEO - Astro-Ecommerce PIPOD
## Updated: 2026-05-04

---

## ✅ COMPLETADO (SDD Full Implementation)

### Phase 1: Critical Fixes
- [x] Layout.astro: lang="es", canonical dynamic, preconnect, font-display:swap
- [x] LocalBusinessSchema.astro: static data (removed localhost fetch)
- [x] Delete empty/duplicate files: donate2.astro, pipodBlog.astro, product.astro

### Phase 2: Content Quality
- [x] Meta descriptions added to: index, shopping-cart, contabilidad
- [x] Title fixes: shopping-cart, servicio-tecnico-apple

### Phase 3: Structured Data
- [x] ProductSchema.astro created
- [x] BlogPostingSchema.astro created

### Phase 4: Performance
- [x] Image dimensions: ServiceHero.astro
- [x] Iframe lazy loading: RetomaHero.astro (Vimeo), donate.astro (YouTube x2)

### Phase 5: Sitemap & Cleanup
- [x] robots.txt: Disallow /api/, /contabilidad/
- [x] MetaSocial universal: Integrated in Layout.astro

---

## ⏭️ PENDIENTES (No solicitados pero documentados)

### 1. Reducir font families (4→2)
**Estado:** NO SOLICITADO por el usuario
**Impacto:** +0.2 performance
**Cambio propuesto:**
```diff
# Layout.astro Google Fonts URL
- Inter:300,400,600,700|Open+Sans:...|Noto+Sans:...|PT+Mono:...
+ Inter:300,400,600,700|Noto+Sans:...
```
**Riesgo:** BAJO - Solo cambiar URL de Google Fonts
**Fonts actualmente en uso:**
- `Inter` - UI principal (MANTENER)
- `Open Sans` - ¿En uso? (verificar)
- `Noto Sans` - ¿En uso? (verificar)
- `PT Mono` - Labels/tags (verificar)

---

### 2. heroBentoCarousel image optimization
**Estado:** PENDIENTE (riesgo alto de romper diseño)
**Impacto:** +0.2 performance, +0.1 CLS
**Problema:** El carousel usa `background-image` CSS, no `<img>` tags
**Cambio propuesto:**
```diff
# Opción A: Convertir a <img> tags (RIESGO ALTO)
- <div style="background-image: url('/images/...')">
+ <img src="/images/..." loading="lazy" width="1920" height="600" />
```
**Riesgo:** ALTO - Puede romper responsividad y animaciones del carousel
**Nota:** Los slides del carousel están en el viewport inicial (above the fold), lazy loading podría empeorar LCP

---

### 3. Verificar uso de fuentes
**Fonts declaradas en Layout.astro:**
```
Inter: 300,400,600,700
Open Sans: 300,400,600,700
Noto Sans: 300,400,500,600,700,800
PT Mono: 300,400,500,600,700
```
**Acción sugerida:**
```bash
# Buscar uso de cada fuente en CSS
grep -r "font-family.*Open Sans" src/
grep -r "font-family.*Noto Sans" src/
grep -r "font-family.*PT Mono" src/
```

---

### 4. MetaSocial universal (COMPLETADO ✅)
**Estado:** IMPLEMENTADO
**Cambio realizado:**
- MetaSocial.astro actualizado para uso universal
- Integrado en Layout.astro (todas las páginas ahora tienen OG tags)
- Default image: `/images/logo-pipod.jpg`

---

### 5. BlogPostingSchema (COMPLETADO ✅)
**Estado:** IMPLEMENTADO
**Cambio realizado:**
- `src/components/SEO/BlogPostingSchema.astro` creado
- Integrado en `src/pages/pipod-blog.astro`

---

## 📊 SCORE FINAL

| Categoría | Score |
|-----------|-------|
| Content Quality | 7/10 |
| Performance | 6/10 |
| Technical SEO | 8/10 |
| Structured Data | 8/10 |
| Sitemap & Crawling | 7/10 |
| **TOTAL** | **~7.2/10** |

**Anterior:** 5.5/10
**Actual:** ~7.2/10
**Mejora:** +1.7 puntos (+31%)

---

## 🚀 PRÓXIMOS PASOS (Si se decide continuar)

1. **Verificar uso de fuentes** - 确定 cu\u00e1les de las 4 fonts se usan realmente
2. **Reducir fonts** - Eliminar 2 familias si no se usan
3. **heroBentoCarousel** - Solo si se quiere riesgo de redise\u00f1o

---

## 📝 NOTAS

- Build verificado: ✅ PASS (solo warnings de Sass)
- sitemap-index.xml genera correctamente
- robots.txt actualizado con Disallow rules
- Meta tags ahora din\u00e1micos en todas las p\u00e1ginas