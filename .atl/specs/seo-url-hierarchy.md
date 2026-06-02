# SDD Spec: seo-url-hierarchy

**Change:** `seo-url-hierarchy`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** [#184](https://app.engram.ai/astro-ecommerce/observation/184) — Arquitectura SEO-first completa  

---

## 1. Concept & Vision

Migrar Pipod.co a una arquitectura SEO-first donde cada servicio y categoría de contenido tiene su propia URL con contenido rico y optimizado. El sitio actual tiene arquitectura plana (todo desde home) que limita el SEO. Esta arquitectura crea activos SEO propios para cada dispositivo y tipo de contenido.

**Outcome esperado:** Mayor autoridad de dominio, más páginas indexadas con intención clara, mejor experiencia de usuario con navegación predictiva.

---

## 2. Navbar — Sub-menús

### Servicio Técnico ▼
```
├─ iPhone
├─ MacBook
├─ iMac
├─ Apple Watch
└─ Mantenimiento
```

### Tienda ▼
```
├─ iPhone
├─ MacBook
├─ iPad
├─ Apple Watch
├─ Cargadores y Cables
├─ Carga Inalámbrica (MagSafe)
├─ Fundas y Protección
├─ Audio (AirPods)
└─ Todos los Accesorios
```

### Blog ▼
```
├─ Reparaciones
├─ Guías de Compra
└─ Confianza
```

---

## 3. Servicio Técnico — URLs

**Pilar (renombrar):**
- `/servicio-tecnico-apple-bogota/` ← actual: `/servicio-tecnico-apple`

**Sub-páginas (5 páginas nuevas):**
- `/servicio-tecnico-apple-bogota/iphone/`
- `/servicio-tecnico-apple-bogota/macbook/`
- `/servicio-tecnico-apple-bogota/imac/`
- `/servicio-tecnico-apple-bogota/apple-watch/`
- `/servicio-tecnico-apple-bogota/mantenimiento/`

---

## 4. Blog — 3 Categorías

| Categoría | # Artículos | Propósito |
|-----------|-------------|-----------|
| **REPARACIONES** | ~35 | Problema urgente — "mi equipo no funciona" |
| **GUÍAS** | ~25 | Decisión de compra — "cuál equipo me conviene" |
| **CONFIANZA** | ~13 | Cerca de convertir — "cómo saber si el técnico es bueno" |

**Historia Pipod → CONFIANZA:** El artículo `historia-pipod-bogota` es autoridad/marca personal.

**Tags normalizados (3-5 por artículo):**
```
# Dispositivos
iphone, macbook, imac, apple-watch, ipad

# Servicios
bateria, pantalla, teclado, carga, placa, software, mantenimiento, recuperacion-agua

# Geográficos
bogota, chapinero

# Propósito
guia, comparativa, confianza
```

---

## 5. Tienda — Navbar sub-menú

```
Tienda ▼
  ├─ iPhone
  ├─ MacBook
  ├─ iPad
  ├─ Apple Watch
  ├─ Cargadores y Cables
  ├─ Carga Inalámbrica (MagSafe)
  ├─ Fundas y Protección
  ├─ Audio (AirPods)
  └─ Todos los Accesorios
```

---

## 6. Enlazado Interno

- Home → páginas pilar servicio
- Páginas pilar → sub-páginas por dispositivo
- Blog → servicios y plan retoma
- Productos → servicio técnico (mantenimiento)

---

## 7. Scope

### In Scope
- Navbar: actualizar `pipodNavbar.tsx` con sub-menús
- Servicio Técnico: rename + 5 sub-páginas
- Blog: normalizar categorías + tags + páginas de archivo
- Links internos: actualizar en todos los componentes

### Out of Scope
- Tienda: restructure de productos (P10 postergado)
- Plan Retoma: crear sub-páginas (sin demanda validada)
- Nuevos artículos: no crear ahora, solo re-etiquetar existentes

---

## 8. Prioridades según datos 2025

| Sub-página | Prioridad | Datos reales |
|------------|-----------|--------------|
| **iPhone** | 🔥🔥 Alta | 57 casos, 28.3% baterías |
| **MacBook** | 🔥🔥 Alta | 47 casos (ahora tan demandante como iPhone) |
| **Mantenimiento** | 🔥 Alta | 6.3% + estrategia 2026 |
| **iMac** | 🟡 Media | Mantenimiento + Disco/RAM |
| **Apple Watch** | 🟡 Media | Bajo volumen |

**Key insight del documento 2025:**
- Baterías + Pantallas = 54.3% del negocio
- Ratio baterías iPhone:Mac de 8:1 (2014) a 1.6:1 (2025) → MacBook ahora crítico
- Q4 2025: -11.6% vs 2024 (recuperación casi completa)
- Meta 2026: 165 servicios (+30%)

**Estrategia 2026:**
1. Recuperar demanda Mac con campañas específicas
2. Acelerar programas de batería recurrente para iPhone y Mac
3. Profesionalizar "Revisión/Otros" (15% del negocio)