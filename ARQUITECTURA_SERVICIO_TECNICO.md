# Arquitectura Implementada: `/servicio-tecnico` - PIPOD

**Versión:** 2.0 (Data-Driven Implementation)  
**Fecha:** Enero 2026  
**Estado:** ✅ Implementado  
**Framework:** Astro 5.5.5 + React 18.2.0

---

## 📋 ÍNDICE

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Componentes Implementados](#componentes-implementados)
4. [Código Completo](#código-completo)
5. [Rutas y Navegación](#rutas-y-navegación)
6. [Datos y Métricas](#datos-y-métricas)
7. [Próximos Pasos](#próximos-pasos)

---

## 📊 RESUMEN EJECUTIVO

### Objetivo
Crear una landing page data-driven para el servicio técnico de PIPOD basada en datos reales de 2025:
- **127 servicios** realizados en 2025 (-35.5% vs 2024)
- **Meta 2026:** 165 servicios (+30%)
- **Top servicios:** Baterías (28.3%) + Pantallas (26.0%) = 54.3% del negocio

### Cambios Estratégicos Implementados

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Hero H1** | Genérico | "Baterías, pantallas y MacBook M-series" |
| **Stats** | "3,100+ servicios" | "2,000+ baterías" + "2H EXPRESS" |
| **Device Selector** | 2 cards | 4 cards (iPhone, MacBook promocionado, iPad, Watch) |
| **Catálogos** | No existían | Baterías, Pantallas, Mantenimiento, Otras |
| **FAQ** | Genérico | Categorizado (Competencia, Repuestos, Datos, Tiempo, Costo) |
| **CTAs** | Genéricos | WhatsApp deep linking con contexto específico |

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
/Users/calderonjosue_/Astro-Ecommerce/
│
├── src/
│   ├── pages/
│   │   └── servicio-tecnico.astro ..................... Página principal
│   │
│   ├── components/
│   │   └── service/
│   │       ├── ServiceHero.astro ...................... Hero con banner Q1
│   │       ├── ServiceStats.astro ..................... Stats bar (4 columnas)
│   │       ├── DeviceBento.astro ...................... Selector de dispositivos
│   │       ├── BateriasCatalog.astro .................. Catálogo baterías (28.3%)
│   │       ├── PantallasCatalog.astro ................. Catálogo pantallas (26.0%)
│   │       ├── MantenimientoCatalog.astro ............. Mantenimiento preventivo
│   │       ├── OtrasReparaciones.astro ................ Acordeón otras reparaciones
│   │       ├── ProtocoloPipod.astro ................... 3 pasos del proceso
│   │       ├── TransparencyModule.astro ............... Datos 2025 + FAQ
│   │       ├── GoogleReviews.astro .................... Reseñas Google (4.8/5)
│   │       └── StickyWhatsApp.tsx ..................... Botón flotante WhatsApp
│   │
│   └── layouts/
│       └── Layout.astro ............................... Layout base
│
└── assets/
    └── scss/
        └── astro-ecommerce.scss ....................... Estilos globales
```

---

## 🧩 COMPONENTES IMPLEMENTADOS

### 1. ServiceHero.astro
**Ruta:** `/src/components/service/ServiceHero.astro`

**Funcionalidad:**
- Banner Q1 2026 sticky (campaña MacBook Specialist)
- Hero principal con H1 data-driven
- Badge "Diagnóstico Gratis"
- 2 CTAs (primario + secundario)

**Características:**
- ✅ Responsive mobile
- ✅ WhatsApp deep linking
- ✅ Animaciones hover
- ✅ Tipografía Inter + PT Mono

---

### 2. ServiceStats.astro
**Ruta:** `/src/components/service/ServiceStats.astro`

**Funcionalidad:**
- Barra negra con 4 stats principales
- Datos data-driven de 2025

**Stats mostrados:**
1. **11 AÑOS** - Trayectoria Apple
2. **2,000+** - Baterías Reemplazadas
3. **98%** - Satisfacción Técnica
4. **2H** - Express iPhone

**Características:**
- ✅ Fondo #000000, altura 119px
- ✅ Responsive (stack vertical en mobile)
- ✅ Tipografía PT Mono para labels

---

### 3. DeviceBento.astro
**Ruta:** `/src/components/service/DeviceBento.astro`

**Funcionalidad:**
- Grid 4 dispositivos (iPhone, MacBook, iPad, Watch)
- MacBook promocionado como co-línea 1
- CTAs específicos por dispositivo

**Características:**
- ✅ Grid responsive (4→2→1 columnas)
- ✅ Border radius 28px
- ✅ Hover effects
- ✅ WhatsApp deep linking por dispositivo

---

### 4. BateriasCatalog.astro
**Ruta:** `/src/components/service/BateriasCatalog.astro`

**Funcionalidad:**
- Catálogo completo de baterías (28.3% del negocio)
- 3 opciones: iPhone, MacBook, iPad/Watch
- FAQ mini acordeón

**Precios:**
- iPhone: $19.000 - $32.000
- MacBook: $85.000 - $120.000
- iPad: $45.000 | Watch: $28.000

**Características:**
- ✅ Cards con specs detalladas
- ✅ Checklist de beneficios
- ✅ FAQ colapsible
- ✅ CTAs específicos por dispositivo

---

### 5. PantallasCatalog.astro
**Ruta:** `/src/components/service/PantallasCatalog.astro`

**Funcionalidad:**
- Catálogo completo de pantallas (26.0% del negocio)
- 3 opciones: iPhone, iPad, MacBook
- FAQ mini acordeón

**Precios:**
- iPhone: $46.000 - $120.000
- iPad: $65.000 - $150.000
- MacBook: $380.000 - $650.000

**Características:**
- ✅ Fondo #FAFAFA (diferenciación)
- ✅ Specs técnicas detalladas
- ✅ FAQ específico de pantallas

---

### 6. MantenimientoCatalog.astro
**Ruta:** `/src/components/service/MantenimientoCatalog.astro`

**Funcionalidad:**
- 2 opciones de mantenimiento preventivo
- Simple ($60k) vs Termal Pack ($120k)
- Promoción para profesionales

**Características:**
- ✅ Card premium con gradiente
- ✅ Diferenciación visual clara
- ✅ Target específico (creativos)

---

### 7. OtrasReparaciones.astro
**Ruta:** `/src/components/service/OtrasReparaciones.astro`

**Funcionalidad:**
- Acordeón colapsible con 5 servicios
- Board Repair, Equipo Mojado, Disco/RAM, Software, Revisión

**Características:**
- ✅ Acordeón HTML nativo (details/summary)
- ✅ Specs grid responsive
- ✅ Badges de porcentaje
- ✅ CTAs específicos

---

### 8. ProtocoloPipod.astro
**Ruta:** `/src/components/service/ProtocoloPipod.astro`

**Funcionalidad:**
- 3 pasos del proceso PIPOD
- Diagnóstico → Presupuesto → Entrega

**Características:**
- ✅ Iconografía clara (🔍📄🔧)
- ✅ Step numbers con badge
- ✅ Meta información por paso

---

### 9. TransparencyModule.astro
**Ruta:** `/src/components/service/TransparencyModule.astro`

**Funcionalidad:**
- Datos reales 2025 (127 servicios)
- FAQ categorizado (5 categorías)
- Diagnóstico profesional ($25k)

**Categorías FAQ:**
1. **PIPOD vs. Competencia** (NUEVO)
2. Sobre Repuestos
3. Sobre Datos
4. Sobre Tiempo
5. Sobre Costo

**Características:**
- ✅ Fondo #1F1F1F
- ✅ Transparencia total
- ✅ FAQ con 5 categorías

---

### 10. GoogleReviews.astro
**Ruta:** `/src/components/service/GoogleReviews.astro`

**Funcionalidad:**
- 3 reseñas destacadas
- Rating 4.8/5 (127 reseñas)
- Link a Google My Business

**Características:**
- ✅ Cards con hover effect
- ✅ Rating badge prominente
- ✅ Autor + dispositivo + fecha

---

### 11. StickyWhatsApp.tsx
**Ruta:** `/src/components/service/StickyWhatsApp.tsx`

**Funcionalidad:**
- Botón flotante WhatsApp
- Fixed position (bottom right)
- Responsive mobile

**Características:**
- ✅ Fondo #25D366 (verde WhatsApp)
- ✅ Hover scale(1.1)
- ✅ Z-index 1000
- ✅ Responsive (texto oculto en mobile)

---

## 💻 CÓDIGO COMPLETO

### Página Principal: servicio-tecnico.astro

```astro
---
import Layout from '../layouts/Layout.astro';
import ServiceHero from '../components/service/ServiceHero.astro';
import ServiceStats from '../components/service/ServiceStats.astro';
import DeviceBento from '../components/service/DeviceBento.astro';
import BateriasCatalog from '../components/service/BateriasCatalog.astro';
import PantallasCatalog from '../components/service/PantallasCatalog.astro';
import MantenimientoCatalog from '../components/service/MantenimientoCatalog.astro';
import OtrasReparaciones from '../components/service/OtrasReparaciones.astro';
import ProtocoloPipod from '../components/service/ProtocoloPipod.astro';
import TransparencyModule from '../components/service/TransparencyModule.astro';
import GoogleReviews from '../components/service/GoogleReviews.astro';
import StickyWhatsApp from '../components/service/StickyWhatsApp';
import Footer from '../components/pipodFooter';
import PipodNavbar from '../components/pipodNavbar';
import '../../assets/scss/astro-ecommerce.scss';

// SEO Metas
const title = "Servicio Técnico Apple Bogotá | Baterías y Pantallas | PIPOD";
const description = "Especialistas en baterías y pantallas Apple. 2,000+ baterías reemplazadas. Express 2h para iPhone. Garantía 12 meses. Bogotá.";
---

<Layout title={title}>
  <PipodNavbar client:load />
  
  <main>
    <ServiceHero />
    <ServiceStats />
    <DeviceBento />
    <BateriasCatalog />
    <PantallasCatalog />
    <MantenimientoCatalog />
    <OtrasReparaciones />
    <ProtocoloPipod />
    <TransparencyModule />
    <GoogleReviews />
  </main>

  <StickyWhatsApp client:load />
  <Footer client:load />
</Layout>

<style is:global>
  body {
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  .text-gradient {
    background: linear-gradient(90deg, #3A506B, #000);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mono {
    font-family: 'PT Mono', monospace;
  }

  .bg-light {
    background-color: #F5F5F5 !important;
  }

  .rounded-4 {
    border-radius: 20px;
  }
</style>
```

---

### ServiceHero.astro (Completo)

```astro
---
// Hero: Especialización visible + Data-driven
---

<div class="q1-banner">
  <div class="container d-flex justify-content-center align-items-center gap-3">
    <span class="mono-text">✓ ESTADO: TÉCNICOS DISPONIBLES • 23 BATERÍAS ESTE MES</span>
    <a href="https://wa.me/573124813094" class="btn-pill-light py-1 px-3">Agendar Ahora</a>
  </div>
</div>

<section class="hero-section text-center">
  <div class="container">
    <div class="tech-tag mb-4">[ ESPECIALIZACIÓN APPLE DESDE 2014 ]</div>
    <h1 class="display-2 fw-bold mb-4">Baterías, pantallas y<br/><span class="text-blue">MacBook M-series.</span></h1>
    <p class="lead mb-5 mx-auto" style="max-width: 650px;">
      Soporte técnico especializado con 11 años de trayectoria. Trae tu equipo y recibe diagnóstico experto sin costo. 2 horas express para iPhone. Garantía 12 meses.
    </p>
    <div class="d-flex justify-content-center gap-3">
      <a href="https://wa.me/573124813094?text=Hola%20Pipod%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20gratuito%20para%20mi%20equipo." class="btn-pill-dark">Agendar Diagnóstico Gratis</a>
      <a href="#prices" class="btn-pill-outline">Ver servicios específicos</a>
    </div>
  </div>
</section>

<style>
  .q1-banner { 
    background: #3A506B; 
    color: white; 
    padding: 12px 0; 
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
  
  .hero-section { 
    padding: 100px 0 60px; 
    background: #fff; 
  }
  
  .tech-tag { 
    font-family: 'PT Mono', monospace; 
    font-size: 0.7rem; 
    color: #666; 
    letter-spacing: 2px; 
  }
  
  .text-blue { 
    color: #3A506B; 
  }
  
  .mono-text { 
    font-family: 'PT Mono', monospace; 
  }
  
  .btn-pill-dark { 
    background: #000; 
    color: #fff; 
    padding: 14px 30px; 
    border-radius: 50px; 
    text-decoration: none; 
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
  }
  
  .btn-pill-dark:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  .btn-pill-outline { 
    border: 1.5px solid #000; 
    color: #000; 
    padding: 14px 30px; 
    border-radius: 50px; 
    text-decoration: none; 
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
  }
  
  .btn-pill-outline:hover {
    background: #000;
    color: #fff;
  }
  
  .btn-pill-light { 
    background: #fff; 
    color: #3A506B; 
    border-radius: 50px; 
    text-decoration: none; 
    font-weight: 700; 
    font-size: 0.75rem;
    display: inline-block;
    transition: all 0.3s ease;
  }
  
  .btn-pill-light:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
</style>
```

---

### StickyWhatsApp.tsx (Completo)

```tsx
import React from 'react';

export default function StickyWhatsApp() {
  const handleClick = () => {
    window.open('https://wa.me/573124813094?text=Hola%20Pipod%2C%20necesito%20ayuda%20con%20mi%20equipo%20Apple', '_blank');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="sticky-whatsapp"
        aria-label="Contactar por WhatsApp"
      >
        <span className="whatsapp-icon">💬</span>
        <span className="whatsapp-text">WhatsApp</span>
      </button>

      <style>{`
        .sticky-whatsapp {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #25D366;
          color: #fff;
          border: none;
          padding: 14px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
          transition: all 0.3s ease;
        }

        .sticky-whatsapp:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .whatsapp-text {
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 768px) {
          .sticky-whatsapp {
            bottom: 15px;
            right: 15px;
            padding: 12px 16px;
            font-size: 0.85rem;
          }

          .whatsapp-icon {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-text {
            display: none;
          }

          .sticky-whatsapp {
            width: 56px;
            height: 56px;
            padding: 0;
            justify-content: center;
            border-radius: 50%;
          }

          .whatsapp-icon {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
}
```

---

## 🗺️ RUTAS Y NAVEGACIÓN

### Rutas Implementadas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/servicio-tecnico` | servicio-tecnico.astro | Página principal |
| N/A | ServiceHero | Hero + Banner Q1 |
| N/A | ServiceStats | Stats bar (4 datos) |
| N/A | DeviceBento | Selector dispositivos |
| N/A | BateriasCatalog | Catálogo baterías |
| N/A | PantallasCatalog | Catálogo pantallas |
| N/A | MantenimientoCatalog | Mantenimiento |
| N/A | OtrasReparaciones | Acordeón otras |
| N/A | ProtocoloPipod | 3 pasos |
| N/A | TransparencyModule | Datos + FAQ |
| N/A | GoogleReviews | Reseñas |
| N/A | StickyWhatsApp | Botón flotante |

### Navegación desde Navbar

```tsx
// src/components/pipodNavbar.tsx
<li><a href="/servicio-tecnico" className="nav-item">Servicio Técnico</a></li>
```

### Deep Linking WhatsApp

Todos los CTAs usan WhatsApp deep linking con contexto específico:

```javascript
// Patrón general
https://wa.me/573124813094?text=Hola%20Pipod%2C%20[MENSAJE_ESPECÍFICO]

// Ejemplos implementados:
- "quiero agendar un diagnóstico gratuito para mi equipo"
- "quiero cambiar batería iPhone"
- "quiero cambiar batería MacBook"
- "quiero cambiar pantalla iPhone"
- "quiero mantenimiento simple"
- "equipo mojado necesito ayuda"
```

---

## 📊 DATOS Y MÉTRICAS

### Datos Reales 2025 (Implementados)

```
Total Servicios: 127 (-35.5% vs 2024)

Distribución:
- Baterías: 36 casos (28.3%)
- Pantallas: 33 casos (26.0%)
- Revisión: 19 casos (15.0%)
- Software: 9 casos (7.1%)
- Mantenimiento: 8 casos (6.3%)
- Disco/RAM: 8 casos (6.3%)
- Board: 8 casos (6.3%)
- Mojado: 6 casos (4.7%)

Recuperación Q4 2025:
- Diciembre: +66.7% YoY
- Q4: -11.6% (vs -50% en Q1)

Meta 2026: 165 servicios (+30%)
```

### Precios Implementados

**Baterías:**
- iPhone: $19.000 - $32.000
- MacBook: $85.000 - $120.000
- iPad: $45.000
- Watch: $28.000

**Pantallas:**
- iPhone: $46.000 - $120.000
- iPad: $65.000 - $150.000
- MacBook: $380.000 - $650.000

**Mantenimiento:**
- Simple: $60.000
- Termal Pack: $120.000

**Otras:**
- Board: $130.000 - $250.000
- Mojado: $80.000 - $150.000
- Disco/RAM: $85.000 - $200.000
- Software: $35.000 - $60.000
- Revisión: GRATIS

---

## 🎯 PRÓXIMOS PASOS

### Fase 1: Mejoras Inmediatas (Pendientes)

1. **Banner Campaña Q1 2026** (1h)
   - Sticky banner arriba del navbar
   - "🎯 CAMPAÑA Q1: MACBOOK SPECIALIST"
   - Contador dinámico de clientes

2. **Mensaje "Recuperación 2026"** (30min)
   - Cambiar Stats Bar
   - "127→165 RECUPERACIÓN 2026"

3. **Diagnóstico Profesional Cobrable** (1h)
   - Agregar en OtrasReparaciones
   - $25.000 con reporte escrito
   - Revenue potencial: $475k/año

4. **Mobile Hero Simplificado** (2h)
   - Mostrar solo 2 CTAs en mobile
   - Batería + Pantalla (54.3% del negocio)

5. **Sección "Nuestros Números 2025"** (2h)
   - Transparencia total
   - Gráfico del informe
   - Link a informe completo

### Fase 2: Landing Dedicada (Pendiente)

6. **`/servicio-tecnico/macbook-specialist`** (4h)
   - Campaña Q1 2026
   - Diagnóstico GRATIS + 10% descuento
   - Garantía 18 meses

### Fase 3: Optimizaciones (Pendiente)

7. **Precios por Modelo** (1h)
   - iPhone 11/12/13: $19k
   - iPhone 14/15: $25k
   - iPhone 15 Pro/Max: $32k

8. **Indicador Stock Q1** (30min)
   - "✓ 5 baterías iPhone en stock"
   - Genera urgencia

9. **Animaciones** (2h)
   - Stats counter animado
   - Card hover mejorado
   - Scroll animations

10. **SEO Completo** (2h)
    - Meta tags optimizados
    - Schema markup
    - Sitemap

---

## 📝 NOTAS TÉCNICAS

### Dependencias

```json
{
  "astro": "^5.5.5",
  "@astrojs/react": "^4.2.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Tipografía

- **Títulos:** Inter ExtraBold (800) / Bold (700)
- **Body:** Inter Regular (400) / Medium (500)
- **Datos técnicos:** PT Mono (400)

### Colores

```css
:root {
  --color-primary: #000000;
  --color-accent: #3A506B;
  --color-whatsapp: #25D366;
  --color-battery: #2E7D32;
  --color-gray-dark: #1F1F1F;
  --color-gray-light: #F5F5F5;
}
```

### Responsive Breakpoints

```css
/* Desktop: >991px */
/* Tablet: 768px - 991px */
/* Mobile: <768px */
/* Mobile Small: <576px */
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [x] Página principal `/servicio-tecnico`
- [x] ServiceHero con banner Q1
- [x] ServiceStats (4 datos)
- [x] DeviceBento (4 dispositivos)
- [x] BateriasCatalog (28.3%)
- [x] PantallasCatalog (26.0%)
- [x] MantenimientoCatalog (2 opciones)
- [x] OtrasReparaciones (acordeón)
- [x] ProtocoloPipod (3 pasos)
- [x] TransparencyModule (datos + FAQ)
- [x] GoogleReviews (4.8/5)
- [x] StickyWhatsApp (botón flotante)
- [x] FAQ "PIPOD vs Apple Store"
- [x] WhatsApp deep linking
- [x] Responsive mobile
- [ ] Banner Q1 sticky (pendiente)
- [ ] Mensaje "Recuperación 2026" (pendiente)
- [ ] Diagnóstico cobrable (pendiente)
- [ ] Mobile hero simplificado (pendiente)
- [ ] Landing MacBook Specialist (pendiente)

---

## 📞 CONTACTO Y SOPORTE

**Equipo PIPOD**  
📧 Email: soporte@pipod.co  
📱 WhatsApp: +57 312 481 3094  
🌐 Web: https://pipod.co/servicio-tecnico

---

**Documento generado:** Enero 2026  
**Última actualización:** Enero 26, 2026  
**Versión:** 2.0 (Data-Driven Implementation)
