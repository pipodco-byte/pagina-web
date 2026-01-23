# Guía de Estilo Visual - PIPOD E-commerce

**Proyecto:** Astro Ecommerce - PIPOD  
**Propósito:** Documentación completa del sistema de diseño para mantener consistencia visual  
**Uso:** Referencia para desarrollo con Gemini AI y equipo de desarrollo

---

## 📋 Índice
1. [Stack Tecnológico](#1-stack-tecnológico)
2. [Identidad de Marca](#2-identidad-de-marca)
3. [Paleta de Colores](#3-paleta-de-colores)
4. [Tipografía](#4-tipografía)
5. [Componentes UI](#5-componentes-ui)
6. [Espaciado y Layout](#6-espaciado-y-layout)
7. [Animaciones y Transiciones](#7-animaciones-y-transiciones)
8. [Responsive Design](#8-responsive-design)
9. [Sombras y Elevación](#9-sombras-y-elevación)
10. [Iconografía](#10-iconografía)
11. [Imágenes y Medios](#11-imágenes-y-medios)
12. [Formularios y Inputs](#12-formularios-y-inputs-futuro)
13. [Mensajes y Notificaciones](#13-mensajes-y-notificaciones-futuro)
14. [Accesibilidad](#14-accesibilidad)
15. [Performance](#15-performance)
16. [Convenciones de Nomenclatura](#16-convenciones-de-nomenclatura)
17. [Estado del Proyecto](#17-estado-del-proyecto)
18. [Mejores Prácticas](#18-mejores-prácticas)
19. [Notas para Desarrollo Futuro](#19-notas-para-desarrollo-futuro)
20. [Recursos y Referencias](#20-recursos-y-referencias)

---

## 1. Stack Tecnológico

### Framework Principal
**Astro v5.5.5** - Static Site Generator con arquitectura de islas
- Renderizado estático (SSG) para máximo performance
- Hidratación parcial de componentes interactivos
- Soporte multi-framework (React integrado)

### Frontend
- **React 18.2.0** - Componentes interactivos (`.tsx`)
- **TypeScript** - Tipado estático y mejor DX
- **Sass 1.55.0** - Preprocesador CSS
- **Bootstrap Icons 1.11.1** - Sistema de iconografía

### Integraciones Actuales
- **@astrojs/react 4.2.2** - Integración de React en Astro
- **Contentful 10.15.1** - Headless CMS (configurado, pendiente uso)
- **React Bootstrap 2.6.0** - Componentes UI (uso limitado)

### Integraciones Futuras (Planificadas)
- **Supabase** - Base de datos y autenticación
- **Wompi/Bold** - Pasarela de pagos Colombia
- **Brevo** - Email marketing y transaccional
- **Vercel/Netlify** - Hosting y deployment

### Herramientas de Desarrollo
```json
"scripts": {
  "dev": "astro dev",           // localhost:3000
  "build": "astro build",       // ./dist/
  "preview": "astro preview"    // Preview producción
}
```

### Estructura de Archivos
```
/src
  /components     - Componentes React (.tsx) y Astro (.astro)
  /pages          - Rutas del sitio (.astro)
  /layouts        - Layouts base (.astro)
/public           - Assets estáticos
```

---

## 2. Identidad de Marca

### Nombre
**PIPOD** - Servicio Técnico Apple Especializado en Colombia

### Propuesta de Valor
- Más de 15 años de experiencia
- Especialistas certificados en productos Apple
- Diagnóstico gratuito y transparente
- Garantía real en todas las reparaciones

### Tono de Voz
- Profesional pero cercano
- Técnico sin ser intimidante
- Confiable y transparente
- Premium pero accesible

---

## 3. Paleta de Colores

### Colores Principales

```css
/* Negro Principal - Fondo oscuro, textos principales */
#000000

/* Blanco Puro - Fondos claros, textos sobre oscuro */
#FFFFFF

/* Gris Oscuro - Footer, secciones alternadas */
#1F1F1F

/* Gris Medio - Textos secundarios */
#6E6E6E
#888888
#B0B0B0

/* Gris Claro - Fondos sutiles */
#F5F5F5
#F8F9FA
#F2F2F2
```

### Colores de Acento

```css
/* Azul Pipod - Enlaces, CTAs principales */
#3A506B
#0066cc (hover states)

/* Verde WhatsApp - Botones de contacto */
#25D366

/* Rojo Descuento - Badges de ofertas grandes (>35%) */
#D32F2F

/* Verde Descuento - Badges de ofertas moderadas */
#2E7D32
```

### Colores de Estado

```css
/* Nuevo - Badge de productos nuevos */
#2E7D32 (verde)

/* Seminuevo - Badge de productos seminuevos */
#FF9800 (naranja)

/* Repotenciado - Badge de productos repotenciados */
#0066cc (azul)
```

---

## 4. Tipografía

### Fuentes Principales

```css
/* Fuente Principal - Todo el sitio */
font-family: 'Inter', sans-serif;
/* Pesos: 400 (regular), 500 (medium), 600 (semibold), 800 (extrabold) */

/* Fuente Monoespaciada - Labels técnicos */
font-family: 'PT Mono', monospace;

/* Fuente Secundaria - Descripciones largas */
font-family: 'Noto Sans', sans-serif;
```

### Jerarquía Tipográfica

```css
/* Logo Principal */
font-size: 26px;
font-weight: 800;
letter-spacing: -1.2px;

/* Títulos H1 - Hero sections */
font-size: 2.8rem;
font-weight: 800;
line-height: 1.1;
letter-spacing: -0.02em;

/* Títulos H2 - Secciones principales */
font-size: 2rem;
font-weight: 700;
letter-spacing: -0.02em;
text-transform: uppercase;

/* Títulos H3 - Cards y componentes */
font-size: 32px;
font-weight: 800;
letter-spacing: -1.5px;

/* Navegación */
font-size: 16px;
font-weight: 500;

/* Botones CTA */
font-size: 15px;
font-weight: 600;

/* Texto Body */
font-size: 15px;
font-weight: 400;
line-height: 1.6;

/* Labels Técnicos */
font-size: 0.7rem - 0.75rem;
font-weight: 400;
letter-spacing: 2px - 3px;
text-transform: uppercase;

/* Footer Texto */
font-size: 14px - 15px;
font-weight: 400;
```

---

## 5. Componentes UI

### 4.1. Navbar (Navegación)

**Características:**
- Posición fija en la parte superior
- Fondo blanco con transparencia al hacer scroll
- Logo a la izquierda (26px, bold)
- Menú centrado con 6 items (gap: 40px)
- Botón CTA a la derecha

**Estados:**
- **Normal**: `padding: 35px 0`, fondo blanco sólido
- **Scrolled**: `padding: 18px 0`, fondo con blur (`backdrop-filter: blur(20px)`)

**Estilos de Enlaces:**
```css
color: #444;
font-size: 16px;
font-weight: 500;
/* Línea animada al hover */
border-bottom: 2px solid #0066cc (animado con transform: scaleX)
```

**Botón CTA:**
```css
background: #000;
color: #fff;
padding: 12px 28px;
border-radius: 12px;
/* Hover: background #0066cc, translateY(-2px) */
```

---

### 4.2. Hero Bento Carousel

**Estructura:**
- Grid de 2 columnas: 4 (lateral) + 8 (carousel principal)
- Tarjetas laterales: 240px altura, border-radius 24px
- Carousel principal: 506px altura mínima

**Tarjetas Laterales:**
```css
background-size: cover;
border-radius: 24px;
min-height: 240px;
/* Botones píldora: padding 6px 18px, border-radius 50px */
```

**Carousel Principal:**
- Gradiente superior: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 50%)`
- Botón CTA posicionado abajo-derecha
- Indicadores tipo píldora (8px círculo → 30px píldora al activarse)

**Botón CTA Principal:**
```css
background: #FFF;
color: #000;
border-radius: 50px;
padding: 14px 35px;
font-weight: 700;
box-shadow: 0 10px 30px rgba(0,0,0,0.2);
/* Hover: scale(1.05) translateY(-3px) */
```

---

### 4.3. Stats Section (Estadísticas)

**Características:**
- Fondo negro (#000)
- Altura fija: 119px
- 3 estadísticas distribuidas con `justify-content: space-between`
- Animación de conteo al entrar en viewport

**Estilos:**
```css
/* Números */
font-size: 2.5rem;
font-weight: 800;
color: #ffffff;
letter-spacing: -1px;

/* Sufijos (+, años) */
font-size: 1rem;
font-weight: 500;
color: rgba(255, 255, 255, 0.7);

/* Texto descriptivo */
font-size: 0.85rem;
font-weight: 400;
text-transform: uppercase;
letter-spacing: 1px;
```

---

### 4.4. Service Cards (Tarjetas de Servicio)

**Estructura:**
- Imagen superior con overlay
- Icono + título + descripción
- Botón de acción con flecha

**Estilos:**
```css
border-radius: 24px;
background: dark overlay sobre imagen
/* Icono: color blanco, tamaño grande */
/* Título: font-weight 700, color blanco */
/* Botón: flecha animada al hover */
```

---

### 4.5. Product Cards (Tarjetas de Producto)

**Estructura:**
- Zona de imagen con badges (Nuevo/Seminuevo/Descuento)
- Botones de acción lateral (favorito, certificado, WhatsApp)
- Precio + rating
- Título + descripción
- Especificaciones técnicas (si es usado)
- Selector de colores

**Badges:**
```css
/* Nuevo */
background: #2E7D32;
color: white;

/* Seminuevo */
background: #FF9800;
color: white;

/* Descuento >35% */
background: #D32F2F;
color: white;

/* Descuento <35% */
background: #2E7D32;
color: white;
```

**Precio:**
```css
/* Precio actual */
font-size: 1.5rem;
font-weight: 800;
color: #000;

/* Precio anterior (tachado) */
font-size: 1rem;
font-weight: 400;
color: #999;
text-decoration: line-through;
```

**Rating:**
```css
display: flex;
align-items: center;
gap: 4px;
/* Estrella amarilla + número */
```

---

### 4.6. Footer

**Estructura:**
- Fondo oscuro (#1F1F1F)
- 5 columnas de información
- Barra de ecosistema Apple
- Barra de copyright

**Estilos:**
```css
background-color: #1F1F1F;
color: #FFFFFF;
padding: 80px 0 0 0;

/* Logo Footer */
font-size: 32px;
font-weight: 800;
letter-spacing: -1.5px;

/* Títulos de columna */
font-size: 12px;
font-weight: 800;
letter-spacing: 2px;
color: #888888;
text-transform: uppercase;

/* Enlaces */
font-size: 15px;
color: #FFFFFF;
/* Hover: opacity 0.7 */

/* WhatsApp destacado */
color: #25D366;
font-weight: 700;
```

**Barra de Ecosistema:**
```css
border-top: 1px solid rgba(255, 255, 255, 0.1);
padding: 30px 0;
text-align: center;
/* Dispositivos en negrita, separador azul (#3A506B) */
```

---

## 6. Espaciado y Layout

### Sistema de Espaciado

```css
/* Espaciado entre secciones principales */
padding: 80px 0;

/* Espaciado reducido (móvil) */
padding: 50px 0;

/* Gap entre elementos de grid */
gap: 40px; /* Desktop */
gap: 25px; /* Mobile */

/* Padding interno de cards */
padding: 20px 24px 32px 24px;

/* Margin bottom entre elementos */
margin-bottom: 40px; /* Títulos de sección */
margin-bottom: 20px; /* Elementos internos */
```

### Contenedores

```css
/* Contenedor principal */
max-width: 1440px;
margin: 0 auto;
padding: 0 80px; /* Desktop */
padding: 0 25px; /* Mobile */
```

### Border Radius

```css
/* Cards y componentes principales */
border-radius: 24px;
border-radius: 28px; /* Variante premium */

/* Botones */
border-radius: 12px; /* Botones rectangulares */
border-radius: 50px; /* Botones píldora */

/* Badges */
border-radius: 8px;
border-radius: 50px; /* Badges píldora */
```

---

## 7. Animaciones y Transiciones

### Transiciones Estándar

```css
/* Transición suave general */
transition: all 0.3s ease;

/* Transición premium (botones, cards) */
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

/* Transición de navbar */
transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
```

### Efectos Hover

```css
/* Cards */
transform: translateY(-5px);
box-shadow: 0 12px 35px rgba(0,0,0,0.06);

/* Botones */
transform: translateY(-2px);
box-shadow: 0 10px 25px rgba(0, 102, 204, 0.25);

/* Enlaces con línea */
transform: scaleX(1);
transform-origin: bottom left;

/* Iconos sociales */
transform: translateY(-3px);
opacity: 0.8;
```

### Animaciones Especiales

```css
/* Indicadores de carousel (píldora) */
width: 8px → 30px;
border-radius: 50% → 10px;
transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);

/* Contador de estadísticas */
/* Animación de conteo con IntersectionObserver */
/* Incremento gradual hasta el valor target */
```

---

## 8. Responsive Design

### Breakpoints

```css
/* Desktop Large */
@media (min-width: 1440px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 991px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Mobile Small */
@media (max-width: 576px) { }
```

### Ajustes Responsive

**Navbar:**
- Desktop: Menú completo visible
- Mobile: Ocultar menú y botón CTA (hamburger menu pendiente)

**Hero Carousel:**
- Desktop: Grid 4+8 columnas
- Mobile: Columna única, carousel arriba

**Stats:**
- Desktop: Horizontal con `justify-content: space-between`
- Mobile: Vertical con `gap: 30px`

**Footer:**
- Desktop: 5 columnas
- Mobile: Columna única, elementos apilados

**Tipografía Responsive:**
```css
/* H1 */
font-size: 2.8rem; /* Desktop */
font-size: 2.1rem; /* Mobile */

/* H2 */
font-size: 2rem; /* Desktop */
font-size: 1.5rem; /* Mobile */

/* Padding de secciones */
padding: 80px 0; /* Desktop */
padding: 50px 0; /* Mobile */
```

---

## 9. Sombras y Elevación

### Sistema de Sombras

```css
/* Sombra sutil - Cards en reposo */
box-shadow: 0 10px 30px rgba(0,0,0,0.03);

/* Sombra media - Cards hover */
box-shadow: 0 12px 35px rgba(0,0,0,0.06);

/* Sombra fuerte - Botones CTA */
box-shadow: 0 10px 30px rgba(0,0,0,0.2);

/* Sombra premium - Botones hover */
box-shadow: 0 15px 35px rgba(0,0,0,0.3);

/* Sombra de texto - Sobre imágenes oscuras */
text-shadow: 0 4px 10px rgba(0,0,0,0.3);
text-shadow: 0 2px 4px rgba(0,0,0,0.3);
```

---

## 10. Iconografía

### Librería de Iconos
**Bootstrap Icons v1.11.1**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
```

### Iconos Principales Usados

```html
<!-- Navegación y Acciones -->
<i class="bi bi-whatsapp"></i>
<i class="bi bi-heart"></i>
<i class="bi bi-shield-check"></i>

<!-- Servicios -->
<i class="bi bi-tools"></i>
<i class="bi bi-arrow-repeat"></i>
<i class="bi bi-bag-check"></i>
<i class="bi bi-search"></i>
<i class="bi bi-patch-check"></i>
<i class="bi bi-lightning-charge"></i>
<i class="bi bi-people"></i>

<!-- Información -->
<i class="bi bi-geo-alt"></i>
<i class="bi bi-clock"></i>
<i class="bi bi-star-fill"></i>
<i class="bi bi-battery-full"></i>

<!-- Redes Sociales -->
<i class="bi bi-instagram"></i>
<i class="bi bi-tiktok"></i>
<i class="bi bi-facebook"></i>
```

### Tamaños de Iconos

```css
/* Iconos pequeños (badges, inline) */
font-size: 16px - 18px;

/* Iconos medianos (botones, cards) */
font-size: 22px - 26px;

/* Iconos grandes (servicios, features) */
font-size: 32px - 45px;
```

---

## 11. Imágenes y Medios

### Optimización de Imágenes

```css
/* Imágenes de producto */
object-fit: contain;
max-height: 180px - 200px;

/* Imágenes de fondo (hero, cards) */
background-size: cover;
background-position: center;

/* Imágenes con overlay */
background: linear-gradient(overlay) + background-image
```

### Aspect Ratios

```css
/* Cards de producto */
aspect-ratio: 1 / 1; /* Cuadrado */

/* Hero carousel */
min-height: 506px;

/* Service cards */
min-height: 240px;
```

---

## 12. Formularios y Inputs (Futuro)

### Estilos de Input (Guía para desarrollo futuro)

```css
/* Input estándar */
border: 1px solid #E0E0E0;
border-radius: 12px;
padding: 12px 16px;
font-size: 15px;
transition: border-color 0.3s ease;

/* Input focus */
border-color: #3A506B;
outline: none;
box-shadow: 0 0 0 3px rgba(58, 80, 107, 0.1);

/* Input error */
border-color: #D32F2F;

/* Input success */
border-color: #2E7D32;
```

---

## 13. Mensajes y Notificaciones (Futuro)

### Toast Notifications

```css
/* Success */
background: #2E7D32;
color: white;

/* Error */
background: #D32F2F;
color: white;

/* Info */
background: #3A506B;
color: white;

/* Warning */
background: #FF9800;
color: white;
```

---

## 14. Accesibilidad

### Contraste de Colores
- Todos los textos cumplen WCAG AA (mínimo 4.5:1)
- Textos grandes cumplen WCAG AAA (mínimo 7:1)

### Focus States
```css
/* Focus visible para teclado */
outline: 2px solid #3A506B;
outline-offset: 2px;
```

### Aria Labels
- Todos los botones de iconos tienen `aria-label` o `title`
- Carousel tiene `aria-current` y `aria-label`

---

## 15. Performance

### Optimizaciones Aplicadas

1. **Static Site Generation (SSG)** con Astro
2. **Lazy Loading** de imágenes
3. **Font Display Swap** para fuentes web
4. **Minificación** de CSS y JS
5. **CDN Global** para assets estáticos
6. **Backdrop Filter** con fallback para navegadores antiguos

---

## 16. Convenciones de Nomenclatura

### Clases CSS

```css
/* Componentes principales */
.pipod-[componente] { }
/* Ejemplo: .pipod-card-premium, .pipod-navbar */

/* Elementos internos */
.[componente]-[elemento] { }
/* Ejemplo: .bento-title-dark, .stat-number */

/* Modificadores */
.[componente]--[modificador] { }
/* Ejemplo: .btn-side--dark, .badge--nuevo */

/* Estados */
.[componente].is-[estado] { }
/* Ejemplo: .navbar.is-scrolled, .card.is-active */
```

### Archivos

```
componente.tsx - Componente React
componente.astro - Componente Astro
componente.css - Estilos del componente
```

---

## 17. Estado del Proyecto

### ✅ Componentes Completados
- **pipodNavbar** - Navbar fijo con scroll effect
- **pipodFooter** - Footer completo con 5 columnas + ecosistema
- **heroBentoCarousel** - Hero con bento grid + carousel
- **pipodStats** - Sección de estadísticas animadas
- **pipodGoogleReviews** - Muro de reseñas de Google
- **serviceCard** - Cards de servicios con overlay
- **cardProduct** - Cards de productos con badges y specs
- **Múltiples incentives** - 9 variantes de secciones incentivo

### 📄 Páginas Activas
- `index.astro` - Landing principal (HOME)
- `landing.astro` - Landing alternativa
- `product.astro` - Página de producto individual
- `productos.astro` - Catálogo de productos
- `shopping-cart.astro` - Carrito de compras

### ⚠️ Componentes con Issues Conocidos
- **Navbar móvil** - Falta menú hamburguesa (menú oculto en mobile)
- **Incentives** - 9 componentes similares (candidatos a refactorización)
- **Footer** - `bottom-credit-bar` comentado (decisión pendiente)

### 🔄 Git Workflow
- **Branch develop** - Desarrollo activo
- **Branch main** - Producción
- Merge de develop → main después de testing

---

## 18. Mejores Prácticas

### Desarrollo de Componentes

1. **Prefijo "pipod" para componentes principales**
   ```tsx
   // ✅ Correcto
   pipodNavbar.tsx
   pipodFooter.tsx
   pipodStats.astro
   
   // ❌ Evitar
   navbar.tsx
   footer.tsx
   stats.astro
   ```

2. **Clases CSS únicas por componente**
   ```css
   /* ✅ Correcto - Evita conflictos */
   .pipod-gema-claro-ojo { }
   .pipod-incentives-dark-black { }
   
   /* ❌ Evitar - Puede causar conflictos */
   .container { }
   .card { }
   .button { }
   ```

3. **Componentes Astro (.astro) para contenido estático**
   - Mejor performance (sin JS en cliente)
   - Usar para layouts, secciones sin interactividad

4. **Componentes React (.tsx) para interactividad**
   - Carousels, modales, formularios
   - Agregar `client:load` o `client:visible` en Astro

5. **Minimizar cambios incrementales**
   - Hacer todos los cambios de un archivo en una sola edición
   - Evitar commits de "agregar import" seguido de "agregar función"

### CSS y Estilos

1. **Usar variables CSS para colores recurrentes**
   ```css
   :root {
     --color-primary: #000000;
     --color-accent: #3A506B;
     --color-whatsapp: #25D366;
   }
   ```

2. **Mobile-first approach**
   ```css
   /* Base: Mobile */
   .component { font-size: 14px; }
   
   /* Desktop */
   @media (min-width: 1024px) {
     .component { font-size: 16px; }
   }
   ```

3. **Transiciones consistentes**
   ```css
   /* Premium: cubic-bezier */
   transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
   
   /* Estándar: ease */
   transition: all 0.3s ease;
   ```

### Performance

1. **Lazy loading de imágenes**
   ```html
   <img loading="lazy" src="..." alt="..." />
   ```

2. **Optimizar fuentes**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```

3. **Minimizar componentes React en página**
   - Usar Astro components cuando sea posible
   - React solo para interactividad necesaria

### Accesibilidad

1. **Aria labels en iconos**
   ```tsx
   <button aria-label="Agregar al carrito">
     <i className="bi bi-cart"></i>
   </button>
   ```

2. **Contraste de colores**
   - Texto sobre fondo claro: mínimo #333333
   - Texto sobre fondo oscuro: #FFFFFF o #F2F2F2

3. **Focus states visibles**
   ```css
   button:focus-visible {
     outline: 2px solid #3A506B;
     outline-offset: 2px;
   }
   ```

---

## 19. Notas para Desarrollo Futuro

### Componentes Pendientes
- Menú hamburguesa para móvil
- Sistema de carrito de compras
- Formularios de contacto
- Sistema de filtros de productos
- Paginación de productos
- Modal de producto (quick view)
- Sistema de autenticación

### Integraciones Pendientes
- Supabase para base de datos
- Wompi/Bold para pagos
- Brevo para email marketing
- Google Analytics
- Facebook Pixel

---

## 20. Recursos y Referencias

### Fuentes
- Inter: https://fonts.google.com/specimen/Inter
- PT Mono: https://fonts.google.com/specimen/PT+Mono
- Noto Sans: https://fonts.google.com/specimen/Noto+Sans

### Iconos
- Bootstrap Icons: https://icons.getbootstrap.com/

### Inspiración de Diseño
- Apple.com (minimalismo, espaciado)
- Vercel.com (tipografía, animaciones)
- Stripe.com (componentes, gradientes)

### Documentación Técnica
- Astro Docs: https://docs.astro.build/
- React Docs: https://react.dev/
- TypeScript Docs: https://www.typescriptlang.org/docs/
- Contentful Docs: https://www.contentful.com/developers/docs/

---

## 📝 Notas Finales

Esta guía de estilo debe ser seguida estrictamente para mantener la consistencia visual en todo el sitio web de PIPOD. Cualquier nuevo componente o página debe adherirse a estos principios de diseño.

**Última actualización:** Enero 2025
**Versión:** 1.0
**Mantenedor:** Equipo de Desarrollo PIPOD
