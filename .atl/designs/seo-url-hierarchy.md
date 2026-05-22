# SDD Design: seo-url-hierarchy

**Change:** `seo-url-hierarchy`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** [#184](https://app.engram.ai/astro-ecommerce/observation/184) — Arquitectura SEO-first completa  

---

## 1. Navbar — Sub-menús (pipodNavbar.tsx)

### Desktop
Dropdown menu con hover. Cada dropdown tiene 5-9 items organizados por categoría.

```tsx
const serviceMenu = [
  { label: 'iPhone', href: '/servicio-tecnico-apple-bogota/iphone' },
  { label: 'MacBook', href: '/servicio-tecnico-apple-bogota/macbook' },
  { label: 'iMac', href: '/servicio-tecnico-apple-bogota/imac' },
  { label: 'Apple Watch', href: '/servicio-tecnico-apple-bogota/apple-watch' },
  { label: 'Mantenimiento', href: '/servicio-tecnico-apple-bogota/mantenimiento' },
];

const tiendaMenu = [
  { label: 'iPhone', href: '/tienda-pipod?filter=iphone' },
  { label: 'MacBook', href: '/tienda-pipod?filter=macbook' },
  { label: 'iPad', href: '/tienda-pipod?filter=ipad' },
  { label: 'Apple Watch', href: '/tienda-pipod?filter=apple-watch' },
  { label: 'Cargadores y Cables', href: '/tienda-pipod?filter=cargadores' },
  { label: 'Carga Inalámbrica (MagSafe)', href: '/tienda-pipod?filter=magafe' },
  { label: 'Fundas y Protección', href: '/tienda-pipod?filter=fundas' },
  { label: 'Audio (AirPods)', href: '/tienda-pipod?filter=audio' },
  { label: 'Todos los Accesorios', href: '/tienda-pipod?filter=accesorios' },
];

const blogMenu = [
  { label: 'Reparaciones', href: '/blog/reparaciones' },
  { label: 'Guías de Compra', href: '/blog/guias' },
  { label: 'Confianza', href: '/blog/confianza' },
];
```

### Mobile
Accordion expandible, igual al menu mobile existente.

---

## 2. Servicio Técnico — Páginas

### Pilar: Renombrar archivo
```bash
src/pages/servicio-tecnico-apple.astro → src/pages/servicio-tecnico-apple-bogota.astro
```

### Sub-páginas: Estructura
```bash
src/pages/servicio-tecnico-apple-bogota/
├── iphone.astro
├── macbook.astro
├── imac.astro
├── apple-watch.astro
└── mantenimiento.astro
```

### Contenido de cada sub-página
Template básico (reutilizable):
```astro
---
import Layout from '../../layouts/Layout.astro';
import DeviceBento from '../../components/service/DeviceBento.astro';
// ... otros componentes existentes

const title = "Servicio Técnico iPhone Bogotá | Pipod";
const description = "Especialistas en reparación iPhone en Bogotá...";
---

<Layout title={title} description={description}>
  <main style="padding-top: 120px;">
    <ServiceHero />
    <DeviceBento device="iphone" />
    <!-- Contenido específico del dispositivo -->
    <FAQSection />
    <ContactCTA />
    <Footer />
  </main>
</Layout>
```

---

## 3. Blog — Páginas de Archivo

### Nueva ruta: /blog/{categoria}
```bash
src/pages/blog/
├── [category].astro    ← dinámico: /blog/reparaciones, /blog/guias, /blog/confianza
```

### Tags normalizados en frontmatter
```yaml
---
title: "Cambio de pantalla iPhone 15: Guía completa"
category: "REPARACIONES"      # Una de las 3 categorías
tags:
  - "pantalla"           # Servicio
  - "iphone"            # Dispositivo
  - "bogota"            # Geo
  - "guia"              # Propósito
---
```

---

## 4. Links Internos — Actualizar

### Archivos a modificar (23 matches encontrados)
- `src/components/pipodNavbar.tsx` — links de navbar
- `src/components/service/DeviceBento.astro` — buttons
- `src/components/service/ServiceHero.astro` — hero CTA
- `src/components/home/ServiceCardsSection.astro` — links
- `src/components/SEO/ServicePageSchema.astro` — schema URLs
- `src/pages/api/index-now.ts` — URLs a notificar
- `src/pages/api/sync-reviews.ts` — URLs de referencia
- `src/data/terminos-condiciones.ts` — links legales

### Nuevo Schema (ServicePageSchema.astro)
Actualizar `url` y `item` del breadcrumbList para incluir sub-páginas.

---

## 5. Tech Notes

- Astro 6.1 SSR con adapter Vercel
- React 18 para componentes interactivos (Navbar dropdowns)
- SCSS + Bootstrap 5.3 (sin Tailwind)
- Build: `npm run build` debe pasar sin errores

---

## 6. Prioridades según datos 2025

| Orden | Sub-página | Razón |
|-------|-----------|-------|
| 1️⃣ | **iPhone** | 57 casos, 28.3% baterías — generar tráfico rápido |
| 2️⃣ | **MacBook** | 47 casos, estratégico 2026 (recuperar demanda Mac) |
| 3️⃣ | **Mantenimiento** | 6.3% + estrategia 2026 (baterías recurrentes) |
| 4️⃣ | **iMac** | Soporta mantenimiento (Disco/RAM) |
| 5️⃣ | **Apple Watch** | Menor volumen, hacer al final |

**Key insight:** Baterías + Pantallas = 54.3%. MacBook ahora tan demandante como iPhone (ratio convergencia 8:1 → 1.6:1).

**Meta 2026:** 165 servicios (+30% sobre 2025)