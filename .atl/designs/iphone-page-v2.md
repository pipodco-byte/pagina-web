# SDD Design: iphone.astro v2 — Página Servicio Técnico iPhone

**Change:** iphone-page-v2  
**Date:** 2026-06-01  
**Project:** Astro-Ecommerce (Pipod.co)  
**Status:** Implemented ✅

---

## Concept & Vision

Página de destino para el servicio técnico de iPhone en Bogotá. Diseñada para максимизировать conversión de usuarios con intención de reparación, usando un enfoque "Studio Minimal" con alta densidad semántica y control riguroso de link equity interno. La página debe transmitir autoridad técnica (16 años, 3,600+ equipos) y confianza (garantía 12 meses, Express 2h) sin abrumar.

**Diferenciación clave:** No es un template genérico de dispositivo — es una landing page específica para iPhone con contenido profundo sobre baterías y pantallas (54.3% del negocio) y conexiones explícitas al blog de 73 artículos.

---

## Layout Structure (Orden de Secciones)

```
┌──────────────────────────────────────────┐
│ 1. HERO                                  │
│    - Breadcrumb semántico                │
│    - H1 con keyword local                │
│    - Trust line (16 años · 3,600+ · 12m) │
│    - 2 CTAs (WhatsApp + scroll)         │
│    Altura: 80vh, imagen de fondo         │
├──────────────────────────────────────────┤
│ 2. TRUST BADGES (reusado)                │
│    pipodServicesBanner.astro            │
│    Garantía Repuestos · Domicilio · Expr│
├──────────────────────────────────────────┤
│ 3. SERVICIOS CORE (2 cards grandes)     │
│    Batería (54.3% del negocio)          │
│    Pantalla (incluido en 54.3%)         │
│    Estilo asimétrico, fondo coloreado    │
├──────────────────────────────────────────┤
│ 4. STATS (reusado)                       │
│    pipodStats.astro                      │
│    16 años · 3,600+ · 2,500+           │
│    Ubicación: MITAD de la página        │
├──────────────────────────────────────────┤
│ 5. OTROS SERVICIOS (accordion)           │
│    3 visibles + 4 colapsados            │
│    Expandible via <details>/<summary>   │
├──────────────────────────────────────────┤
│ 6. COMO FUNCIONA (reusado)               │
│    ProtocoloPipod.astro                  │
│    3 pasos: Diagnóstico · Presupuesto ·  │
│    Entrega                               │
├──────────────────────────────────────────┤
│ 7. CTA                                   │
│    Banner oscuro con WhatsApp            │
├──────────────────────────────────────────┤
│ 8. CROSS-SELLING                        │
│    Combo Funda + Protector → tienda      │
├──────────────────────────────────────────┤
│ 9. FAQs (8 preguntas)                    │
│    <details>/<summary> nativas           │
│    Keywords targeting search intent     │
├──────────────────────────────────────────┤
│ 10. ARTÍCULOS BLOG (4 links internos)    │
│     Link equity hacia blog               │
│     Batería · Pantalla · Agua · No enciende│
├──────────────────────────────────────────┤
│ 11. TAMBIEN REPARAMOS (cross-device)    │
│     MacBook · iPad · iMac · Apple Watch  │
├──────────────────────────────────────────┤
│ 12. FOOTER + FloatingContact (reusados)  │
└──────────────────────────────────────────┘
```

---

## Design Decisions

### Componentes Reusados

| Componente | Archivo | Uso |
|------------|---------|-----|
| Trust Badges | `pipodServicesBanner.astro` | Sección completa tal cual |
| Stats | `pipodStats.astro` | Sección completa tal cual |
| Cómo Funciona | `ProtocoloPipod.astro` | 3 pasos tal cual |
| Footer | `pipodFooter.astro` | Global |
| FloatingContact | `layouts/floatingContact` | Global |

### Decisiones de Styling

**Hero:**
- Altura 80vh con imagen de fondo + overlay gradient
- Breadcrumb semántico (`<nav aria-label="Breadcrumb">`)
- Trust line como glass badge (`backdrop-filter: blur`)
- 2 CTAs: primario (WhatsApp azul) + secundario (outline blanco)

**Servicios Core:**
- Grid 2 columnas en desktop, 1 en mobile
- Batería: fondo azul suave `#E6F1FB`, borde azul
- Pantalla: fondo gris `#F4F4F5`, borde gris
- Tags de prioridad + specs como chips
- Link interno al blog debajo de cada card

**Otros Servicios:**
- Grid 3 columnas para los 3 visibles
- Accordion nativo (`<details>/<summary>`) para los 4 restantes
- Cards con hover lift (`translateY(-4px)`)

**FAQs:**
- `<details>/<summary>` nativos (sin JS)
- Chevron animado en summary
- 8 preguntas targeting keywords específicas

**Blog Links:**
- Grid 2x2
- Icono + texto + flecha
- Hover con `translateX(4px)`

**También Reparamos:**
- Fondo negro
- Pills blancos con borde
- 4 dispositivos cross-link

---

## SEO Strategy

### Keywords Objetivo

| Keyword | Posición actual | Target |
|---------|-----------------|--------|
| `servicio tecnico iphone bogota` | 8.29 | Top 3 |
| `cambio bateria iphone` | 10 | Top 5 |
| `cambio pantalla iphone bogota` | ~8-11 | Top 5 |
| `iphone no enciende bogota` | ~8-11 | Top 5 |
| `arreglo iphone bogota` | 20 (CTR 50%) | Top 3 |

### Internal Linking (Link Equity)

4 links al blog distribuyendo autoridad:
- `/blog/cambio-bateria-iphone-chapinero`
- `/blog/cambio-pantalla-iphone-bogota`
- `/blog/iphone-mojado-bogota`
- `/blog/iphone-no-enciende-bogota`

### Schema Markup

- `ServicePageSchema` con URL específica `/servicio-tecnico-apple-bogota/iphone`
- `FAQPageSchema` con 8 preguntas

---

## Data Reutilizada

### Stats (pipodStats.astro)
- 16 años
- 3,600+ equipos
- 2,500+ clientes satisfechos

### Trust Badges (pipodServicesBanner.astro)
- Garantía en Repuestos
- Servicio de Domicilio
- Reparación Express

### Distribución Servicios 2025 (referencia)
- Batería + Pantalla = **54.3%** del negocio
- iPhone total: **57 casos** (28.3% del total)
- MacBook: **47 casos** (convergencia ratio 8:1 → 1.6:1)

---

## Responsive Breakpoints

| Breakpoint | Cambios |
|------------|---------|
| 1024px+ | Desktop completo |
| 768-1024px | Hero 40px padding, core grid 1 col |
| <768px | Mobile: todas las grids 1 col |

---

## Files Modified

| Archivo | Acción |
|---------|--------|
| `src/pages/servicio-tecnico-apple-bogota/iphone.astro` | Rewrite completo |

---

*Design creado: 2026-06-01*
*Implementado por: SDD FF (fast-forward)*
*Commits: ver state file*