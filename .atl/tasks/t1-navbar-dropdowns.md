# SDD Tasks: t1-navbar-dropdowns

**Change:** `t1-navbar-dropdowns`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184  
**Parent:** seo-url-hierarchy (T1)

---

## Phase T1: Navbar Dropdowns Implementation

### T1.1 — Analizar imágenes existentes

- [ ] **T1.1.1** Buscar imágenes de dispositivos en `public/images/` o `src/assets/`
- [ ] **T1.1.2** Verificar DeviceBento.astro para paths de imágenes
- [ ] **T1.1.3** Crear fallback con Bootstrap Icons si faltan imágenes

**Archivos a revisar:**
- `src/components/service/DeviceBento.astro`
- `public/images/`
- `src/assets/`

---

### T1.2 — Actualizar pipodNavbar.tsx (Estado)

- [ ] **T1.2.1** Crear arrays de datos para cada dropdown (serviceMenuItems, tiendaMenuItems, blogMenuItems)
- [ ] **T1.2.2** Agregar estado `activeDropdown` con useState
- [ ] **T1.2.3** Crear handler functions (handleMouseEnter, handleMouseLeave)
- [ ] **T1.2.4** Crear componente ServicioDropdown
- [ ] **T1.2.5** Crear componente TiendaDropdown
- [ ] **T1.2.6** Crear componente BlogDropdown
- [ ] **T1.2.7** Crear componente MobileAccordion
- [ ] **T1.2.8** Actualizar estructura JSX del navbar

**Archivo:** `src/components/pipodNavbar.tsx`

**Estructura esperada:**
```tsx
// Nav item con dropdown
<li 
  className="nav-item-dropdown"
  onMouseEnter={() => handleMouseEnter('servicio')}
  onMouseLeave={handleMouseLeave}
>
  <span className="nav-item">Servicio Técnico ▾</span>
  {activeDropdown === 'servicio' && <ServicioDropdown />}
</li>
```

---

### T1.3 — Actualizar pipodNavbar.css (Estilos)

- [ ] **T1.3.1** Agregar estilos `.nav-item-dropdown` (position relative)
- [ ] **T1.3.2** Agregar estilos `.dropdown-service`, `.dropdown-tienda`, `.dropdown-blog`
- [ ] **T1.3.3** Agregar estilos grid para desktop (5 cols, 3 cols)
- [ ] **T1.3.4** Agregar estilos `.dropdown-item` y hover states
- [ ] **T1.3.5** Agregar estilos para imágenes (80x80, border-radius 12px, scale hover)
- [ ] **T1.3.6** Agregar estilos accordion mobile
- [ ] **T1.3.7** Agregar transiciones suaves (0.2s ease)
- [ ] **T1.3.8** Testear z-index (debe estar encima del contenido)

**Archivo:** `src/components/pipodNavbar.css`

---

### T1.4 — Implementar Mobile Accordion

- [ ] **T1.4.1** Integrar MobileAccordion en el menú mobile existente
- [ ] **T1.4.2** Agregar estado `isOpen` para cada accordion
- [ ] **T1.4.3** Solo un accordion abierto a la vez
- [ ] **T1.4.4** Verificar que hamburger menu siga funcionando
- [ ] **T1.4.5** Testear en diferentes tamaños mobile

**Archivo:** `src/components/pipodNavbar.tsx` (mobile section)

---

### T1.5 — Responsive Testing

- [ ] **T1.5.1** Test desktop ≥1024px: hover dropdowns funcionando
- [ ] **T1.5.2** Test tablet 768-1023px: hamburger visible, accordion
- [ ] **T1.5.3** Test mobile <768px: hamburger + accordion
- [ ] **T1.5.4** Verificar que el navbar principal NO cambie (logo, links, CTA, carrito)
- [ ] **T1.5.5** Verificar scroll animation sigue funcionando

---

### T1.6 — Build y Verificación

- [ ] **T1.6.1** `npm run build` pasa sin errores
- [ ] **T1.6.2** Deploy preview a Vercel
- [ ] **T1.6.3** Verificar dropdowns en desktop real
- [ ] **T1.6.4** Verificar accordion en mobile real
- [ ] **T1.6.5** Test de smoke: todas las URLs de los dropdowns responden 200

---

## Dependencies

| Task | Depende de |
|------|-------------|
| T1.2 (actualizar tsx) | T1.1 (imágenes) |
| T1.3 (actualizar css) | — (independiente) |
| T1.4 (mobile accordion) | T1.2 (tsx actualizado) |
| T1.5 (testing) | T1.2 + T1.3 + T1.4 |
| T1.6 (build) | T1.5 |

---

## Notas importantes

1. **Navbar principal NO cambia** — solo se agregan dropdowns a los items existentes
2. **Imágenes:** Usar las mismas de DeviceBento. Si no existen, usar Bootstrap Icons como fallback
3. **Mobile:** El accordion reemplaza el dropdown en <1024px, no el menú hamburger completo
4. **Z-index:** Dropdown debe tener z-index 1001 para estar encima del contenido
5. **URLs:** Usar `/servicio-tecnico-apple-bogota/iphone/` (T2 cambia la URL base)

---

## Archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/components/pipodNavbar.tsx` | Agregar dropdowns, estado, handlers |
| `src/components/pipodNavbar.css` | Agregar estilos dropdown |

---

## Engram IDs relacionados

| ID | Contenido |
|----|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first completa |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades datos 2025 |

---

*Tasks creadas: 2026-05-22*
*Status: Listo para aplicar cuando seo-url-hierarchy T2 (URL rename) esté completo*