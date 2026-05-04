# SDD: Legacy CSS Cleanup
## Change: `legacy-css-cleanup`
## Project: Astro-Ecommerce (pipod.co)
## Date: 2026-05-04
## Status: PROPOSED

---

# 1. Resumen Ejecutivo

Sustitución del ecosistema monolítico `assets/scss/astro-ecommerce.scss` (y archivos asociados) por un sistema de utilidades CSS ligero y controlado de ~80 líneas.

| Métrica | Valor |
|---------|-------|
| Archivos con SCSS import | 8 páginas |
| CSS a migrar | ~80 líneas |
| Archivos a eliminar | 2 (`astro-ecommerce.scss`, `astro-ecommerce.js`) |

---

# 2. Arquitectura de Reemplazo

CSS será inyectado en `src/layouts/Layout.astro` o `src/styles/global.css` dedicado.

## A. Core UI: Buttons & Branding

```css
/* Botón primario oscuro */
.btn, .btn-dark {
  background: #1f2937;
  color: #fff;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}
.btn:hover { background: #111827; transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn:focus { outline: 2px solid #3b82f6; outline-offset: 2px; }

/* Botón blanco */
.btn-white {
  background: #fff;
  color: #1f2937;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}
.btn-white:hover { background: #f9fafb; }
```

## B. Utilidades de Capa y Profundidad

```css
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
```

## C. Sistema de Gradientes

```css
.bg-gradient-dark {
  background: linear-gradient(to right, #1f2937, #111827);
}

.text-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-gradient-blue {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
}
```

---

# 3. Archivos Afectados

## Pages con SCSS Import (8)
1. `src/pages/index.astro`
2. `src/pages/producto/[slug].astro`
3. `src/pages/servicio-tecnico-apple.astro`
4. `src/pages/contabilidad.astro`
5. `src/pages/shopping-cart.astro`
6. `src/pages/checkout.astro`
7. `src/pages/success.astro`
8. `src/pages/retoma.astro`

## Components Críticos
| Componente | Dependencia | Riesgo |
|------------|-------------|--------|
| `complexNavbar.tsx` | `bg-gradient-dark`, `shadow-sm` | Medio |
| `complexNavbarDark.tsx` | `bg-gradient-dark`, `shadow-sm` | Medio |
| `checkoutOrderSummary.tsx` | `btn`, `shadow-md` | Bajo |
| `heroBentoCarousel.astro` | `text-gradient` | Alto |

---

# 4. Matriz de Implementación y Riesgos

| Paso | Acción | Archivo(s) | Riesgo | Estrategia de Mitigación |
|------|--------|------------|--------|-------------------------|
| 1 | Crear rama | `feature/pipod-minimal-styles` | Ninguno | Checkout -b |
| 2 | Injectar CSS | `src/layouts/Layout.astro` | Bajo | CSS en `<style is:global>` |
| 3 | Comentar SCSS | 8 archivos | Medio | No eliminar, solo comentar |
| 4 | Auditoría visual | Manual | Alto | screenshots antes/después |
| 5 | Purga | `assets/scss/`, `assets/js/` | Alto | Mantener backup 30 días |

---

# 5. Plan de Acción

## Phase 1: Isolation
```bash
cd /Users/calderonjosue_/Astro-Ecommerce
git checkout -b feature/pipod-minimal-styles
```

## Phase 2: Injection
Agregar ~80 líneas CSS al `src/layouts/Layout.astro` dentro de `<style is:global>`.

## Phase 3: Disconnect
En cada archivo, comentar la línea:
```scss
// @import '../../assets/scss/astro-ecommerce.scss';
```

**8 archivos a modificar:**
- src/pages/index.astro
- src/pages/producto/[slug].astro
- src/pages/servicio-tecnico-apple.astro
- src/pages/contabilidad.astro
- src/pages/shopping-cart.astro
- src/pages/checkout.astro
- src/pages/success.astro
- src/pages/retoma.astro

## Phase 4: Visual Audit
Verificar manualmente:
- [ ] Botones con hover/active states
- [ ] Gradientes en navbar
- [ ] Text gradient en hero
- [ ] Shadows en cards/checkout

## Phase 5: Purge
```bash
# Mantener backup primero
cp -r assets/scss ~/backup_assets_scss_$(date +%Y%m%d)
cp -r assets/js/astro-ecommerce.js ~/backup_assets_js_$(date +%Y%m%d)

# Eliminar después de 30 días de producción limpia
rm -rf assets/scss/astro-ecommerce/
rm assets/js/astro-ecommerce.js
```

---

# 6. Criterios de Éxito

| # | Criterio | Verificación |
|---|----------|--------------|
| 1 | Build completa sin errores | `npm run build` |
| 2 | 0 warnings de SCSS missing | Verificar en build |
| 3 | Botones funcionales (hover/active/focus) | Test manual |
| 4 | Gradientes visibles en navbar | Visual check |
| 5 | Shadows correctos en cards | Visual check |
| 6 | text-gradient visible en hero | Visual check |
| 7 | Responsive en mobile | DevTools test |
| 8 | Lighthouse score no regress | Antes/después |

---

# 7. Rollback Plan

```bash
# 1. Revertir branch
git checkout main
git branch -D feature/pipod-minimal-styles

# 2. Restaurar SCSS imports (descomentar)
# En cada archivo:
# Descomentar: @import '../../assets/scss/astro-ecommerce.scss';

# 3. Si se eliminaron archivos
git checkout HEAD~1 -- assets/scss/ assets/js/astro-ecommerce.js
```

---

# 8. Beneficios de Ingeniería

- **Bundle reduction**: ~15KB SCSS → ~2KB CSS
- **Build speed**: Elimina procesamiento SCSS innecesario
- **Maintainability**: CSS centralizado en Layout
- **Performance**: Menos parse time en browser
- **Dependency removal**: Elimina acoplamiento con Creative Tim template

---

# 9. Timeline Estimado

| Phase | Tiempo | Entregable |
|-------|--------|------------|
| 1 | 5 min | Rama creada |
| 2 | 15 min | CSS inyectado |
| 3 | 10 min | 8 archivos actualizados |
| 4 | 20 min | Auditoría visual completa |
| 5 | 5 min | Commit & merge |

**Total estimado: ~55 minutos**

---

*Propuesta SDD creada: 2026-05-04*
*Cambio: legacy-css-cleanup*