# Guía de Estilo - El Palafito de Don Gu
## https://www.pipod.co/donar-fundacion-palafito

---

## 1. PALETA DE COLORES

### Colores Primarios
- **Negro**: `#000000` - Texto principal, bordes, fondos oscuros
- **Blanco**: `#FFFFFF` - Fondos claros, texto sobre oscuro
- **Gris Claro**: `#F5F5F7` - Fondo de secciones alternas
- **Gris Oscuro**: `#1a1a1a` - Fondo Ensemble LATAM

### Colores de Acento
- **Azul Pipod**: `#4A90E2` - Títulos secundarios, badges, botones destacados
- **Azul Acento**: `#3A506B` - Hover states, iconos interactivos
- **Gris Texto**: `#444` - Texto secundario
- **Gris Claro Texto**: `#888` - Labels, texto terciario
- **Gris Muy Claro**: `#bbb` - Disclaimer, texto mínimo

---

## 2. TIPOGRAFÍA

### Fuentes Utilizadas
- **Inter** (sans-serif) - Títulos, cuerpo principal
- **PT Mono** (monospace) - Labels, disclaimers, información técnica
- **Noto Sans** (sans-serif) - Cuerpo de texto alternativo

### Jerarquía Tipográfica

#### Títulos Principales
- **Tamaño**: 3rem (48px)
- **Peso**: 800 (bold)
- **Familia**: Inter
- **Espaciado**: -0.05em
- **Color**: #000
- **Ejemplo**: "Palafito conexiones", "¿Cómo puedes ayudar?"

#### Subtítulos
- **Tamaño**: 2.8rem (44px) 
- **Peso**: 800
- **Familia**: Inter
- **Color**: #000

#### Cuerpo de Texto
- **Tamaño**: 1rem (16px)
- **Peso**: 400-500
- **Familia**: Inter / Noto Sans
- **Línea**: 1.7
- **Color**: #444

#### Labels
- **Tamaño**: 0.7rem (11px)
- **Peso**: 600-700
- **Familia**: PT Mono
- **Espaciado**: 2px letter-spacing
- **Color**: #888
- **Transformación**: uppercase

#### Disclaimer
- **Tamaño**: 0.7rem (11px)
- **Peso**: 400
- **Familia**: PT Mono
- **Color**: #bbb
- **Espaciado**: 1px letter-spacing

---

## 3. COMPONENTES

### PalafitHero
**Ubicación**: Sección superior
**Altura**: 90vh (desktop), 75vh (mobile)
**Fondo**: Video YouTube con overlay oscuro
**Características**:
- Video con fade-in animation (0.5s delay)
- Botón de sonido (esquina superior derecha)
- Título con span azul (#4A90E2)
- Dos botones glass-morphism
- Glass tag "IMPACTO SOCIAL PIPOD"

### PalafitHistory
**Fondo**: #FFFFFF
**Padding**: 80px 0
**Layout**: 2 columnas (desktop), 1 columna (mobile)
**Separador**: Línea 0.85px entre columnas

### PalafitNeed
**Fondo**: #F5F5F7
**Padding**: 80px 0
**Layout**: 1.2fr / 0.8fr grid
**Meta Box**:
- Fondo: #FFFFFF
- Borde: 0.85px solid #000
- Border-radius: 24px
- Padding: 40px

### PalafitEnsemble
**Fondo**: #1a1a1a
**Padding**: 80px 0
**Texto**: Blanco (#FFFFFF)
**Layout**: 2 columnas con video LinkedIn

### PalafitDonationOptions
**Fondo**: #FFFFFF
**Padding**: 80px 0
**Layout**: 3 columnas (desktop), 1 columna (mobile)
**Cards**:
- Borde: 0.85px solid #000
- Border-radius: 24px
- Padding: 45px
- Badges: Azul #4A90E2
- Botón "IR A VAKI": Fondo azul con hover más oscuro

### PalafitSocial
**Fondo**: #F5F5F7
**Padding**: 80px 0
**Layout**: 4 iconos en fila (desktop), 2x2 grid (tablet), 1 columna (mobile)
**Disclaimer**: Alineado a la izquierda, sin puntos laterales

---

## 4. ESPACIADO

### Padding Secciones
- **Desktop**: 80px 0
- **Tablet**: 60px 0
- **Mobile**: 50px 0

### Padding Contenedor
- **Desktop**: 0 80px
- **Mobile**: 0 25px

### Gaps
- **Grid**: 40-100px
- **Flex**: 16-40px

### Márgenes
- **Entre elementos**: 20-40px
- **Títulos**: margin-bottom 40px

---

## 5. BORDES Y RADIOS

### Bordes
- **Estándar**: 0.85px solid #000
- **Claro**: 0.85px solid #f0f0f0
- **Transparente**: 0.85px solid rgba(255,255,255,0.25)

### Border Radius
- **Cards**: 24px
- **Botones**: 50px (pill)
- **Botones secundarios**: 12-20px

---

## 6. EFECTOS Y ANIMACIONES

### Glass Morphism
- **Backdrop Filter**: blur(14px)
- **Background**: rgba(255,255,255,0.08-0.2)
- **Borde**: 0.85px solid rgba(255,255,255,0.25)

### Transiciones
- **Hover**: 0.3s cubic-bezier(0.16, 1, 0.3, 1)
- **Fade-in Video**: 0.8s ease-in-out 0.5s forwards
- **Transform**: translateY(-4px) scale(1.02)

### Hover States
- **Botones**: Opacidad +0.1, transform translateY(-4px)
- **Iconos**: Color #3A506B, scale(1.1)
- **Cards**: translateY(-8px), box-shadow aumentada

---

## 7. RESPONSIVE BREAKPOINTS

### Desktop
- **Ancho máximo**: 1440px
- **Padding**: 80px

### Tablet (max-width: 1100px)
- **Grid**: 1 columna
- **Padding**: 60px

### Mobile (max-width: 768px)
- **Padding**: 25px
- **Font sizes**: Reducidas 20-30%
- **Gaps**: Reducidos 30-40%

---

## 8. IMÁGENES

### Formatos
- **Principal**: WebP (optimizado)
- **Fallback**: JPG
- **Social**: JPG 1200x630px

### Rutas
- `/public/images/palafito-don-gu.jpg` - Social share
- `/public/images/palafito-don-gu.webp` - Alternativa

---

## 9. METADATOS SEO

### Open Graph
```
og:title: El Palafito de Don Gu | Donar - PIPOD
og:description: Apoya al Palafito de Don Gu en Ciudad Bolívar...
og:image: https://www.pipod.co/images/palafito-don-gu.jpg
og:url: https://www.pipod.co/donar-fundacion-palafito
```

### Twitter Card
```
twitter:card: summary_large_image
twitter:title: El Palafito de Don Gu | Donar - PIPOD
twitter:description: Apoya al Palafito de Don Gu...
twitter:image: https://www.pipod.co/images/palafito-don-gu.jpg
```

### JSON-LD Schema
- **Type**: WebPage + DonateAction
- **Organization**: El Palafito de Don Gu (NGO)
- **ContactPoint**: +57-312-481-3094

---

## 10. ACCESIBILIDAD

### Contraste
- Mínimo WCAG AA (4.5:1 para texto)
- Negro sobre blanco: ✅ Cumple
- Azul sobre blanco: ✅ Cumple

### Interactividad
- Todos los botones: `cursor: pointer`
- Transiciones suaves: 0.3s mínimo
- Focus states: Visible en todos los elementos

### Semántica
- Estructura HTML5 correcta
- Atributos `aria-label` en botones
- Jerarquía de headings: h1 → h2 → h3

---

## 11. COMPONENTES REUTILIZABLES

### Botones
```
.btn-pill-dark: Negro, 50px border-radius, 14px padding
.btn-pipod-glass-primary: Glass, rgba(255,255,255,0.2)
.btn-pipod-glass-secondary: Glass, rgba(255,255,255,0.08)
```

### Cards
```
.pipod-impact-card: 0.85px border, 24px radius, 45px padding
.pipod-meta-box: Blanco, 24px radius, 40px padding
```

### Grillas
```
Desktop: 1440px max-width, 80px padding
Tablet: 1 columna, 60px padding
Mobile: 1 columna, 25px padding
```

---

## 12. NOTAS DE IMPLEMENTACIÓN

- Usar `loading="lazy"` en iframes para optimización
- Animaciones con `@keyframes` para mejor rendimiento
- CSS Grid para layouts complejos
- Flexbox para alineación simple
- Variables CSS para colores reutilizables
- Media queries mobile-first

---

**Última actualización**: 2024
**Versión**: 1.0
**Responsable**: Pipod Design System
