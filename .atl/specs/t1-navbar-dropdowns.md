# SDD Spec: t1-navbar-dropdowns

**Change:** `t1-navbar-dropdowns`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184 (Arquitectura SEO-first)  
**Parent:** seo-url-hierarchy (T1)

---

## 1. Concept & Vision

Navbar con 3 dropdowns (Servicio Técnico, Tienda, Blog) con estética **Linear/Vercel** adaptada a Pipod.

**Desktop (≥1024px):** Grid horizontal con imágenes de dispositivos. Cada dropdown es full-width, aparece debajo del nav al hacer hover.

**Mobile (<1024px):** Accordion simple sin imágenes — tap para expandir/colapsar.

---

## 2. Dropdown Structure

### Servicio Técnico ▼ (5 items en grid)

```
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│   [img]   │ │   [img]   │ │   [img]   │ │   [img]   │ │   [img]   │
│           │ │           │ │           │ │           │ │           │
│  iPhone   │ │  MacBook  │ │   iMac    │ │Apple Watch│ │ Mantenim. │
│  Batería  │ │  Batería  │ │ Mantenim. │ │ Pantalla  │ │ Limpieza  │
│  Pantalla │ │ Pantalla  │ │  Disco    │ │  Carga    │ │ Optimiza  │
└───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘
```

| Dispositivo | Servicios |
|-------------|-----------|
| **iPhone** | Batería, Pantalla, Carga, Placa, Recuperación agua |
| **MacBook** | Batería, Pantalla, Teclado, Software |
| **iMac** | Mantenimiento, Disco/RAM, Revisión |
| **Apple Watch** | Pantalla, Carga, Batería |
| **Mantenimiento** | Limpieza, Optimización, Instalación |

**URLs:**
- `/servicio-tecnico-apple-bogota/iphone/`
- `/servicio-tecnico-apple-bogota/macbook/`
- `/servicio-tecnico-apple-bogota/imac/`
- `/servicio-tecnico-apple-bogota/apple-watch/`
- `/servicio-tecnico-apple-bogota/mantenimiento/`

### Tienda ▼ (9 items en grid 3x3)

```
┌───────────┐ ┌───────────┐ ┌───────────┐
│   iPhone  │ │  MacBook  │ │    iPad   │
├───────────┤ ├───────────┤ ├───────────┤
│Apple Watch│ │ Cargadores│ │  MagSafe  │
├───────────┤ ├───────────┤ ├───────────┤
│  Fundas   │ │  Audio    │ │ Accesorios│
└───────────┘ └───────────┘ └───────────┘
```

**URLs:** `/tienda-pipod?filter={type}`

### Blog ▼ (3 items simples)

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Reparaciones│ │ Guías Compra │ │  Confianza  │
└─────────────┘ └─────────────┘ └─────────────┘
```

**URLs:**
- `/blog/reparaciones/`
- `/blog/guias/`
- `/blog/confianza/`

---

## 3. Desktop Design (≥1024px)

### Estética — Linear/Vercel adaptado a Pipod

| Elemento | Especificación |
|----------|---------------|
| **Font** | Inter (400, 500, 600) |
| **Fondo dropdown** | #ffffff |
| **Borde** | 0.5px #E5E5E7 |
| **Shadow** | 0 10px 40px rgba(0,0,0,0.06) |
| **Border-radius** | 12px |
| **Padding** | 20px 24px |
| **Hover item** | #F5F5F7, border-radius 8px |
| **Transición** | 0.2s ease |
| **Gap columnas** | 24px |

### Grid Layout

- **Servicio Técnico:** `grid-template-columns: repeat(5, 1fr)`
- **Tienda:** `grid-template-columns: repeat(3, 1fr)`
- **Blog:** `grid-template-columns: repeat(3, 1fr)`

---

## 4. Mobile Design (<1024px)

### Accordion Simple — Sin imágenes

```
┌─────────────────────────────┐
│ Servicio Técnico         ▶ │
│ ─────────────────────────  │
│  ├─ iPhone                 │
│  ├─ MacBook                │
│  ├─ iMac                   │
│  ├─ Apple Watch            │
│  └─ Mantenimiento          │
│                             │
│ Tienda                   ▶ │
│ Blog                    ▶ │
└─────────────────────────────┘
```

**Características:**
- Tap para expandir/colapsar
- Flecha ▶ rota 90° al expandir
- Sin imágenes en mobile
- Transición: max-height 0→auto con ease

---

## 5. Interacciones

### Desktop Hover
1. Usuario hace hover en "Servicio Técnico"
2. Aparece dropdown con fade-in 0.2s
3. Hover en item: fondo #F5F5F7, scale imagen 1.02
4. Mouse leave: dropdown se cierra con fade-out 0.15s

### Mobile Tap
1. Tap en "Servicio Técnico" → expande
2. Tap otra vez → collapsa
3. Solo un accordion abierto a la vez

---

## 6. Technical Notes

- **Framework:** React para el componente navbar (ya existe pipodNavbar.tsx)
- **Estilos:** SCSS (ya existe pipodNavbar.css)
- **Imágenes:** Usar las mismas de DeviceBento.astro
- **Z-index:** Dropdown debe estar encima del contenido (z-index: 1001)
- **Position:** Absolute para el dropdown relative al nav-item

---

## 7. Scope

### In Scope
- Agregar hover dropdowns desktop a pipodNavbar.tsx
- Agregar accordion mobile a pipodNavbar.tsx
- Actualizar CSS (pipodNavbar.css)
- Usar imágenes existentes del proyecto

### Out of Scope
- Cambiar estructura del navbar principal (logo, links, CTA)
- Modificar carrito o botón cotizar
- Agregar nuevas páginas

---

## 8. Dependencies

- T2 (URL rename) debe completar primero para que links sean correctos
- Imágenes de dispositivos ya existen en src/assets/ o DeviceBento

---

## 9. Engram IDs relacionados

| ID | Contenido |
|----|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first completa |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades datos 2025 |

---

*Spec creado: 2026-05-22*
*Para implementar ver: `.atl/tasks/t1-navbar-dropdowns.md`*