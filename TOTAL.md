# PIPOD - Estado Total del Proyecto

**Proyecto:** Astro-Ecommerce (pipod.co)
**Última actualización:** 2026-05-04
**Stack:** Astro 6.1 (SSR), React 18, TypeScript, Vite 5

---

## 1. Resumen del Proyecto

### Tech Stack
- **Framework:** Astro 6.1 con SSR (Vercel adapter)
- **Frontend:** React 18, TypeScript
- **Styling:** SCSS, Bootstrap 2.6, Tailwind
- **CMS:** Contentful (configurado)
- **Backend:** Astro API routes (server mode)
- **State:** Nanostores (atom-based)
- **Deploy:** Vercel

### Páginas (~20 rutas)
| Ruta | Página | Estado SEO |
|------|--------|------------|
| `/` | index.astro | ✅ Meta description added |
| `/tienda-pipod` | tienda-pipod.astro | ✅ OK |
| `/producto/[slug]` | producto/[slug].astro | ✅ Product schema added |
| `/checkout` | checkout.astro | ⚠️ Title generic |
| `/checkout-success` | checkout-success.astro | ✅ OK |
| `/shopping-cart` | shopping-cart.astro | ✅ Fixed to Spanish |
| `/plan-retoma-apple` | plan-retoma-apple.astro | ✅ OK |
| `/servicio-tecnico-apple` | servicio-tecnico-apple.astro | ✅ Title shortened |
| `/contacto-pipod` | contacto-pipod.astro | ✅ OK |
| `/pipod-blog` | pipod-blog.astro | ✅ OK |
| `/donar-fundacion-palafito` | donate-fundacion-palafito.astro | ✅ OK |
| `/terminos-condiciones-pipod` | terminos-condiciones-pipod.astro | ✅ OK |
| `/contabilidad` | contabilidad.astro | ✅ Meta description added |

### Archivos Eliminados (Limpieza)
- `donar2.astro` (vacío)
- `pipodBlog.astro` (duplicado de pipod-blog.astro)
- `product.astro` (duplicado legacy de /producto/[slug])

---

## 2. SEO - Estado Actual

**SEO HEALTH SCORE: 7/10** (antes 5.5/10)

### ✅ Completado

| Fase | Tareas | Estado |
|------|--------|--------|
| **Phase 1: Critical** | Layout.astro (canonical, lang=es, preconnect), LocalBusinessSchema fix, delete dead files | ✅ COMPLETADO |
| **Phase 2: Content Quality** | Meta descriptions (index, shopping-cart, contabilidad), title fixes, delete duplicates | ✅ COMPLETADO |
| **Phase 3: Structured Data** | ProductSchema.astro created + integrated | ✅ COMPLETADO |
| **Phase 4: Performance** | Image dimensions (ServiceHero.astro) | ✅ COMPLETADO |
| **Phase 5: Sitemap** | robots.txt enhanced (Disallow /api/, /contabilidad/) | ✅ COMPLETADO |

### ⚠️ Pendiente (Baja Prioridad)

| Item | Prioridad | Notas |
|------|-----------|-------|
| BlogPostingSchema.astro | Baja | Para blog pages |
| YouTube/Vimeo lazy loading | Baja | RetomaHero.astro, donate.astro |
| Reducción de fonts (4→2) | Baja | Inter + Noto Sans |
| heroBentoCarousel image optimization | Baja | Dimensiones + lazy |
| Open Graph en todas las páginas | Baja | Solo donate-fundacion tiene |

---

## 3. Design System - PIPOD

### 3.1 Visual Theme & Atmosphere

PIPOD es una plataforma de servicio técnico premium que combina profesionalismo con accesibilidad. El diseño opera sobre una base de blanco puro (`#ffffff`) y negro claro (`#1F1F1F`), con azules técnicos (`#3A506B`, `#4A90E2`) como acentos.

**Combinación especial detectada en `/donar-fundacion-palafito`:**
- Background: `#F5F5F7` (gris claro cálido)
- Botones: `#000` (negro puro) con radio 50px (pill)
- Hover: `translateY(-2px)` + sombra `rgba(0,0,0,0.2)`
- Esta combinación gris+negro es más minimalista/moderna

**Sistema de fuentes:** Inter (UI), PT Mono (labels técnicos), Noto Sans (body)

**Características clave:**
- Layout bento-grid con cards de radio grande (24px–40px)
- Barra de stats prominente (119px altura)
- Container 1440px con padding 80px horizontal

### 3.2 Paleta de Colores

#### Canvas Primario
| Color | Hex | Uso |
|-------|-----|-----|
| Blanco Puro | `#ffffff` | Backgrounds, cards, texto sobre oscuro |
| Negro Claro | `#1F1F1F` | Dark backgrounds, texto claro |
| Negro Puro | `#000000` | Botones Palafito, badges, acentos |

#### Azules de Marca
| Color | Hex | Uso |
|-------|-----|-----|
| Azul Profundo | `#3A506B` | Acento secundario, hover states, contexto técnico |
| Azul Tech | `#4A90E2` | CTA primarios, links, highlights |

#### Grises
| Color | Hex | Uso |
|-------|-----|-----|
| Super Light | `#F5F5F7` | Backgrounds de sección (Palafito usa este) |
| Border | `#E5E5E7` | Bordes de cards, separadores |

#### Estados Interactivos
| Estado | Color |
|--------|-------|
| Primary Action | `#4A90E2` |
| Secondary Action | `#3A506B` |
| Hover | Blue shift con opacity |
| Focus | Blue ring outline |

### 3.3 Tipografía

| Rol | Font | Size | Weight |
|-----|------|------|--------|
| Display/Stats | Inter | 48px+ | 600–700 |
| Section Heading | Inter | 28–32px | 600–700 |
| Card Heading | Inter | 20–24px | 600 |
| UI Medium | Inter | 16px | 500 |
| Body | Noto Sans | 14–16px | 400 |
| Label/Code | PT Mono | 12–14px | 400–500 |

### 3.4 Sistema de Espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| Container max | 1440px | Page wrapper |
| Padding horizontal | 80px desktop | Márgenes desktop |
| Section gap | 80px desktop, 50px mobile | Ritmo vertical |
| Stats bar height | 119px | Bars de stats, payment, incentive |
| Card padding | 16–24px | Spacing interno |

### 3.5 Escala de Border Radius

| Nivel | Valor | Uso |
|-------|-------|-----|
| Subtle | 8px | Botones, inputs |
| Standard | 24px | Cards estándar |
| Large | 40px | Bento cards |
| Pill | 50px | Tags, pills (Palafito) |

### 3.6 Sombras

| Nivel | Treatment | Uso |
|-------|-----------|-----|
| Flat | Sin sombra | Page background |
| Card | Subtle ambient | Cards, containers |
| Elevated | Más sombra | Hover states |

**Nota:** PIPOD usa sombras más sutiles que otros sistemas. Énfasis en el radio grande sobre sombras pesadas.

### 3.7 Inconsistencias Detectadas

| Área | Problema | Resolución Propuesta |
|------|----------|---------------------|
| Background colors | `index` usa `#F5F5F7`, `tienda` usa `#FFFFFF` | Estandarizar `#F5F5F7` para secciones claras |
| Blue accents | `#3A506B` vs `#4A90E2` varía | `#4A90E2` para CTAs, `#3A506B` para secundarios |
| Border treatments | `border: 0.85px solid #000` vs `border: 1px solid #E5E5E7` | Usar `#E5E5E7` siempre |
| Card radius | 24px vs 40px vs inconsistente | 24px estándar, 40px bento |
| Navbar style | Blanco vs oscuro según página | Mantener ambos según contexto |

---

## 4. Pendientes - 22 Tareas

### Frontend / Visual (9 tareas)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 1 | Revisión total de Mobile Responsive | Alta | ⏳ Pendiente |
| 2 | NavBar Tienda: Componente navegación | Media | ⏳ Pendiente |
| 3 | Diseño Blog: Pulir página principal | Media | ⏳ Pendiente |
| 4 | Diseño ProductShop: Mejorar estética | Media | ⏳ Pendiente |
| 5 | Servicio Técnico: Pulir /servicio-tecnico-apple | Media | ⏳ Pendiente |
| 6 | Visual Entradas: Diseño posts individuales | Baja | ⏳ Pendiente |
| 7 | Creación Visual: Piezas gráficas faltantes | Baja | ⏳ Pendiente |
| 8 | Card MacBook: Quitar "añadir a carrito" | Alta | ⏳ Pendiente |
| 9 | Orden del Home: Reordenar componentes | Media | ⏳ Pendiente |

### Backend / Datos (5 tareas)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 10 | API Reviews: Cloudflare / Contentful / Excel | Alta | ⏳ Pendiente |
| 11 | Integración Excel: Alimente web + chatbot | Alta | ⏳ Pendiente |
| 12 | Carga Inventario: Subir productos | Alta | ⏳ Pendiente |
| 13 | Carga Visual: Elementos visuales | Media | ⏳ Pendiente |
| 14 | Sync Dashboard Pipod + Supabase | Media | ⏳ Pendiente |

### Contenido (4 tareas)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 15 | Plataforma Blog: Sanity vs Ghost | Alta | 🔍 Decisión pendiente |
| 16 | Scripts Astro: Convertir blog a formato | Media | ⏳ Pendiente |
| 17 | Revisar categorías Blog en Contentful | Media | ⏳ Pendiente |
| 18 | Contenido Marcelo: Subir artículos | Baja | ⏳ Pendiente |

### Payments / Integraciones (3 tareas)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 19 | Pasarela Bold para accesorios | Alta | ⏳ Pendiente |
| 20 | Redirect WhatsApp para resto | Media | ⏳ Pendiente |
| 21 | API Brevo Newsletter | Media | ⏳ Pendiente |

### Legales (1 tarea)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 22 | Modificar Términos y Condiciones | Media | ⏳ Pendiente |

---

## 5. Component Inventory

### Componentes Principales

| Componente | Archivo | Estilos Clave |
|------------|---------|---------------|
| pipodNavbar | `pipodNavbar.tsx` | Logo 45px/800, nav 15px/500, gap 32px, backdrop-blur on scroll |
| pipodFooter | `pipodFooter.tsx` | `#1F1F1F` bg, brand 32px/800, social icons 24px |
| heroBentoCarousel | `heroBentoCarousel.astro` | Bento cards 24px radius, 240px min-height, pill buttons 50px |
| pipodStats | `pipodStats.astro` | Black bar `#000`, 119px height, numbers 2.5rem/800 |
| cardProduct | `cardProduct.tsx` | 24px radius, border `#E5E5E7`, badges 10px/800 |
| serviceCard | `serviceCard.tsx` | 40px radius (!), `#000` image zone, hover translateY(-8px) |
| PaymentBanner | `PaymentBanner.astro` | Black bar, 119px height, logos 38px |
| StoreHero | `StoreHero.astro` | 361px height, gradient overlay, title clamp(2rem,5vw,3.5rem) |
| RetomaHero | `RetomaHero.astro` | 90vh video bg, glass tag 50px radius, title clamp(2.5rem,8vw,5.5rem) |
| PalafitHero | `PalafitHero.astro` | `#F5F5F7` bg, `#000` pill buttons, hover translateY(-2px) |

### Componentes SEO

| Componente | Propósito | Estado |
|-----------|-----------|--------|
| LocalBusinessSchema.astro | JSON-LD LocalBusiness | ✅ Fixed |
| ProductSchema.astro | JSON-LD Product | ✅ Creado |
| RetomaPageSchema.astro | WebPage para Retoma | ✅ OK |
| ServicePageSchema.astro | WebPage para Service | ✅ OK |
| ContactPageSchema.astro | ContactPage | ✅ OK |
| DonationSchema.astro | DonateAction | ✅ OK |
| MetaSocial.astro | Open Graph | ✅ OK |

---

## 6. Agent Prompt Guide

### Quick Color Reference
```
Background (light):  #ffffff
Background (surface): #F5F5F7
Background (dark):   #1F1F1F
Primary accent:      #4A90E2 (Tech Blue)
Secondary accent:   #3A506B (Deep Blue)
Border gray:        #E5E5E7
Text (light):       #1F1F1F
Text (on dark):     #ffffff
Black pure:         #000000 (Palafito buttons)
```

### Example Component Prompts
- "Create a stats card: white background, 24px radius, 119px height. Large Inter 600 number (48px), label in PT Mono."
- "Design a bento card: white background, 40px radius. 80px internal padding, Inter heading (24px 600)."
- "Build a CTA button: Tech Blue (#4A90E2), white text, 8px radius, Inter 500."
- "Create a pill button (Palafito style): #000 background, 50px radius, white text, hover translateY(-2px) with shadow."
- "Design section container: 1440px max-width, 80px horizontal padding, #F5F5F7 background."

### Iteration Guide
1. Start with white/near-black foundation
2. Tech Blue (#4A90E2) for primary CTAs
3. Deep Blue (#3A506B) for secondary accents
4. Large radius (24px–40px) for bento aesthetic
5. Inter for UI, PT Mono for labels, Noto Sans for body
6. 80px padding for premium spacious feel
7. 119px height for stats bars

---

## 7. Decisiones Pendientes

### CMS de Blog: Sanity vs Ghost

| Opción | Pros | Contras |
|--------|------|---------|
| **Sanity** | Esquemas flexibles, API potente, SDK excelente | Curva de aprendizaje, más caro |
| **Ghost** | Enfocado en publishing, membresías integradas | Menos flexible para e-commerce |

### Card MacBook
- Cambiar comportamiento para que NO añada a carrito
- Debe ser igual a Card iPhone (solo mostrar info, no comprar)

---

*Documento generado: 2026-05-04*
*Basado en: ESTADO.md, SEO_COMPLETE_AUDIT.md, SDD_PROPOSAL.md, pendiente.md*