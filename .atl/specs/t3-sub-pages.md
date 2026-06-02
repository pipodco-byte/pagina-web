# SDD Spec: t3-sub-pages

**Change:** `t3-sub-pages`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184 (Arquitectura SEO-first)  
**Parent:** seo-url-hierarchy (T3)

---

## 1. Concept & Vision

Crear 5 páginas comprehensivas de servicio técnico, una por dispositivo. Cada página contiene todos los servicios del dispositivo, cross-selling de accesorios, FAQs locales, y CTA WhatsApp.

**Filosofía:** Servicio local = una página con todo. El usuario local quiere resolver rápido, no navegar 30 páginas.

---

## 2. Las 5 páginas

| # | Dispositivo | URL | Servicios |
|---|-------------|-----|-----------|
| 1 | **iPhone** | `/servicio-tecnico-apple-bogota/iphone/` | 10 servicios |
| 2 | **MacBook** | `/servicio-tecnico-apple-bogota/macbook/` | 10 servicios |
| 3 | **iMac** | `/servicio-tecnico-apple-bogota/imac/` | 8 servicios |
| 4 | **Apple Watch** | `/servicio-tecnico-apple-bogota/apple-watch/` | 4 servicios |
| 5 | **Mantenimiento** | `/servicio-tecnico-apple-bogota/mantenimiento/` | 8 servicios |

---

## 3. Estructura común (todas las páginas)

```
┌─────────────────────────────────────────────────────┐
│ HERO                                                 │
│ Título: "Servicio Técnico {Dispositivo} Bogotá"     │
│ Subtítulo: "Chapinero, 16 años, diagnóstico gratis"  │
│ [CTA: WhatsApp] [CTA: Teléfono]                     │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ STATS BAR                                            │
│ 16 años | 3,600+ equipos | Garantía 12 meses        │
│ ⭐ 5.0/90+ Google reviews                            │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ SERVICIOS GRID (3-4 columnas)                        │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│ │Batería │ │Pantalla│ │ Placa  │ │ Agua   │         │
│ │ icon   │ │ icon   │ │ icon   │ │ icon   │         │
│ │ desc   │ │ desc   │ │ desc   │ │ desc   │         │
│ └────────┘ └────────┘ └────────┘ └────────┘         │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ PROCESO (Cómo trabajamos)                            │
│ 1. Diagnóstico → 2. Cotización → 3. Reparación      │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ FAQs (5-7 acordeón)                                  │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ CTA PRINCIPAL (WhatsApp)                            │
│ "Escríbenos por WhatsApp — Respuesta en minutos"    │
│ [Button WhatsApp Grande]                            │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ CROSS-SELLING SUTIL (después del CTA principal)     │
│ ┌─────────────────────────────────────────────────┐ │
│ │ ¿Tu equipo también necesita protección?          │ │
│ │ 🎁 Combo especial: {nombre combo}                 │ │
│ │    {contenido}                                    │ │
│ │    Por solo ${precio} COP                         │ │
│ │ → Ver combo {dispositivo}                        │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────┐
│ FOOTER SEO                                           │
│ Schema Service, BreadcrumbList, FAQPage             │
└─────────────────────────────────────────────────────┘
```

### Cross-selling estratégico (todas las páginas)

| Página | Texto | Link | Razón |
|--------|-------|------|-------|
| **iPhone** | "¿Tu iPhone también necesita protección? 🎁 Combo: Funda + Protector $50.000" | WhatsApp 💬 | Combo requiere explicación + redención en tienda |
| **MacBook** | "¿Tu MacBook también necesita protección? 🎁 Combo: Carcasa + Protector $150.000" | WhatsApp 💬 | Combo requiere explicación + redención en tienda |
| **iMac** | "¿Tu iMac también necesita accesorios? Teclado, mouse, stand..." | Tienda 🛒 | Accesorios estándar, self-service |
| **Apple Watch** | "¿Tu Watch necesita protección? Solo vendemos en tienda — escríbenos" | WhatsApp 💬 | No vendemos correas por web todavía |
| **Mantenimiento** | "¿Quieres agendar mantenimiento preventivo? Contáctanos" | WhatsApp 💬 | Solo hacemos servicio, no vendemos productos |

**Nota:** Cross-selling aparece DESPUÉS del CTA principal de WhatsApp. Es sutil, no distrae.

---

## 4. Página 1: iPhone

**URL:** `/servicio-tecnico-apple-bogota/iphone/`

### Hero
- **H1:** "Servicio Técnico iPhone Bogotá | Especialistas Certificados"
- **Sub:** "Reparación iPhone en Chapinero. Diagnóstico gratis, garantía 12 meses."

### Servicios (10)

| # | Servicio | Descripción | Keywords |
|---|----------|-------------|----------|
| 1 | **Batería** | Cambio batería iPhone. Diagnóstico gratis, reparación 2-3h. | "cambio bateria iphone bogota", "bateria iphone no dura" |
| 2 | **Pantalla** | Cambio pantalla iPhone (LCD/OLED). Todas las tallas. | "cambio pantalla iphone bogota", "pantalla rota iphone" |
| 3 | **Placa/Microsoldadura** | Reparación de placa (IC carga, Face ID, datos). | "reparacion placa iphone bogota", "microsoldadura iphone" |
| 4 | **Recuperación Agua** | Protocolo especializado. No conectes el equipo. | "iphone mojado bogota", "recuperar iphone mojado" |
| 5 | **Face ID** | Reparación sensor TrueDepth. Sin borrar datos. | "face id no funciona iphone", "reparar face id" |
| 6 | **Cámara** | Reparación OIS, lente, flash. | "camara iphone no funciona", "iphone camara vibra" |
| 7 | **Puerto de Carga** | Reparación Lightning/USB-C. | "iphone no carga", "puerto carga iphone" |
| 8 | **Audio** | Altavoz, micrófono, auricular. | "iphone sin sonido", "microfono iphone" |
| 9 | **No Enciende** | Diagnóstico causas: batería, placa, software. | "iphone no enciende bogota" |
| 10 | **Software** | Reinstalación, recuperación datos, optimización. | "iphone lento bogota", "iphone se calienta" |

### FAQs

1. "¿Cuánto cuesta cambiar la batería de un iPhone?"
2. "¿Mi iPhone mojado se puede reparar?"
3. "¿Face ID se puede reparar sin perder datos?"
4. "¿Cuánto tiempo tarda el cambio de pantalla?"
5. "¿Dan garantía en la reparación?"

### Accesorios cross-selling

- Protector de pantalla iPhone → Tienda
- Funda iPhone → Tienda
- Cable Lightning → Tienda
- Cargador iPhone → Tienda
- AirPods → Tienda

### Schema

- Service schema con location
- FAQPage schema
- BreadcrumbList

---

## 5. Página 2: MacBook

**URL:** `/servicio-tecnico-apple-bogota/macbook/`

### Hero
- **H1:** "Servicio Técnico MacBook Bogotá | Especialistas Mac"
- **Sub:** "Reparación MacBook Air, Pro, Retina. Diagnóstico gratis, garantía 12 meses."

### Servicios (10)

| # | Servicio | Descripción | Keywords |
|---|----------|-------------|----------|
| 1 | **Batería** | Cambio batería MacBook. Inflada/degradada. 2-4h. | "cambio bateria macbook bogota", "bateria macbook no dura" |
| 2 | **Pantalla** | Reemplazo LCD/Retina. Líneas, parpadeo, backlight. | "pantalla macbook rota bogota", "macbook parpadea" |
| 3 | **No Enciende** | Diagnóstico gratis. Batería, placa, pantalla. | "macbook no enciende", "macbook pantalla negra" |
| 4 | **Teclado** | Teclas pegadas, butterfly defectuoso. Cambio completo. | "teclado macbook no funciona", "tecla suelta macbook" |
| 5 | **Mantenimiento** | Limpieza ventiladores, pasta térmica, optimización. | "mantenimiento macbook bogota", "macbook se calienta" |
| 6 | **MacBook Lento** | Diagnóstico: disco lleno, RAM, batería. Optimización. | "macbook lento bogota", "optimizar macbook" |
| 7 | **Placa/Microsoldadura** | Reparación componentes SMC. Alta complejidad. | "reparacion placa macbook bogota", "microsoldadura macbook" |
| 8 | **Upgrade SSD/RAM** | Ampliación almacenamiento y memoria. | "upgrade macbook ssd", "扩充 ram macbook" |
| 9 | **Touch Bar** | Touch Bar no funciona. Reemplazo o reparación. | "touch bar macbook no funciona" |
| 10 | **Cargador/MagSafe** | Pin de carga dañado, cable roto. No reconoce. | "macbook no carga", "magsafe no funciona" |

### FAQs

1. "¿MacBook no enciende qué hacer?"
2. "¿Batería inflada es peligrosa?"
3. "¿Cuánto cuesta cambiar pantalla MacBook?"
4. "¿Teclado MacBook no funciona una tecla?"
5. "¿MacBook se calienta mucho normal?"
6. "¿Mantenimiento preventivo cada cuánto?"

### Accesorios cross-selling

- Funda MacBook → Tienda
- Cargador MagSafe → Tienda
- Hub USB-C → Tienda
- Mouse inalámbrico → Tienda
- Teclado externo → Tienda

### Schema

- Service schema con location
- FAQPage schema
- BreadcrumbList

---

## 6. Página 3: iMac

**URL:** `/servicio-tecnico-apple-bogota/imac/`

### Hero
- **H1:** "Servicio Técnico iMac Bogotá | Reparación y Mantenimiento"
- **Sub:** "iMac 21.5\" y 27\". Diagnóstico gratis, garantía 12 meses."

### Servicios (8)

| # | Servicio | Descripción | Keywords |
|---|----------|-------------|----------|
| 1 | **Pantalla iMac** | Reemplazo display completo. Alto margen. | "pantalla imac bogota", "reparacion pantalla imac" |
| 2 | **Placa madre** | Reparación BGA,soldadura. Alta complejidad. | "placa imac bogota", "reparacion placa imac" |
| 3 | **Disco SSD/HDD** | Upgrade a SSD. Mejora rendimiento 3x. | "cambio disco imac bogota", "upgrade ssd imac" |
| 4 | **RAM** | Upgrade memoria (iMac 27\" expandible). | "upgrade ram imac", "扩充 memoria imac" |
| 5 | **Mantenimiento** | Limpieza profunda, pasta térmica, optimización. | "mantenimiento imac bogota", "limpieza imac" |
| 6 | **Fuente de poder** | Reemplazo PSU. iMac no enciende. | "fuente poder imac", "imac no enciende" |
| 7 | **Tarjeta gráfica** | GPU repair/replace. iMac Pro. | "tarjeta grafica imac", "gpu imac" |
| 8 | **Teclado/Mouse** | Accesorios Apple. Magic Keyboard, Magic Mouse. | "teclado imac", "mouse imac" |

### FAQs

1. "¿iMac no enciende qué hacer?"
2. "¿Cuánto cuesta cambiar pantalla iMac?"
3. "¿Se puede hacer upgrade de RAM en iMac?"
4. "¿iMac lento qué hacer?"
5. "¿Mantenimiento preventivo cada cuánto?"
6. "¿Ofrecen servicio a domicilio?"

### Accesorios cross-selling

- Teclado Magic Apple → Tienda
- Mouse Magic → Tienda
- Monitor stand → Tienda
- Hub USB-C → Tienda

### Schema

- Service schema con location
- FAQPage schema
- BreadcrumbList

---

## 7. Página 4: Apple Watch

**URL:** `/servicio-tecnico-apple-bogota/apple-watch/`

### Hero
- **H1:** "Servicio Técnico Apple Watch Bogotá | Reparación Certificada"
- **Sub:** "Cambio batería, pantalla, corona. Diagnóstico gratis."

### Servicios (4)

| # | Servicio | Descripción | Keywords |
|---|----------|-------------|----------|
| 1 | **Pantalla** | Cambio display Apple Watch.Cristal/digitador. | "pantalla apple watch bogota", "cambio pantalla watch" |
| 2 | **Batería** | Cambio pila Apple Watch. Rendimiento recuperado. | "cambio pila apple watch bogota", "bateria watch" |
| 3 | **Corona Digital** | Reemplazo corona/ Digital Crown. | "corona apple watch no funciona", "digital crown" |
| 4 | **Sensor/Salud** | Reparación sensores de frecuencia cardíaca. | "apple watch sensor no funciona", "frecuencia cardiaca watch" |

### FAQs

1. "¿Apple Watch no enciende qué hacer?"
2. "¿Cambio de batería Apple Watch dura?"
3. "¿Pantalla Apple Watch se puede reparar?"
4. "¿Garantía en reparación Apple Watch?"

### Accesorios cross-selling

- Correa Apple Watch → Tienda
- Protector pantalla Watch → Tienda
- Cargador Apple Watch → Tienda
- AirPods → Tienda

### Schema

- Service schema con location
- FAQPage schema
- BreadcrumbList

---

## 8. Página 5: Mantenimiento

**URL:** `/servicio-tecnico-apple-bogota/mantenimiento/`

### Hero
- **H1:** "Mantenimiento Preventivo Mac Bogotá | Limpieza y Optimización"
- **Sub:** "Extiende vida útil de tu equipo. Pasta térmica, limpieza, optimización."

### Servicios (8)

| # | Servicio | Descripción | Keywords |
|---|----------|-------------|----------|
| 1 | **Mantenimiento completo** | Limpieza + pasta térmica + optimización. 2-3h. | "mantenimiento macbook bogota", "mantenimiento imac bogota" |
| 2 | **Limpieza profunda** | Externainterna, ventiladores, keyboard. 45-60min. | "limpieza mac bogota", "limpieza macbook" |
| 3 | **Optimización software** | macOS, espacio, startup apps. Como nuevo. | "optimizar mac bogota", "mac lento que hacer" |
| 4 | **Upgrade SSD/RAM** | Mejora rendimiento equipo existente. | "upgrade macbook ssd", "upgrade imac ram" |
| 5 | **Diagnóstico 60+ puntos** | Evaluación completa estado equipo. Gratis. | "diagnostico mac bogota", "revision mac" |
| 6 | **Instalación macOS** | Reinstall, backup, migrate. Datos seguros. | "instalar macos bogota", "reinstall mac" |
| 7 | **Recuperación datos** | Disco muerto, formateado, cambio. | "recuperacion datos mac bogota", "recuperar archivos mac" |
| 8 | **Servicio express** | Entrega 2-3 horas. +50% costo. | "servicio express mac bogota", "mac urgente" |

### Paquetes

| Paquete | Precio | Incluye |
|---------|--------|---------|
| **Básico** | Consultar | Limpieza + optimización |
| **Completo** | Consultar | Limpieza + pasta térmica + optimización |
| **Premium** | Consultar | Todo + thermal pad premium |
| **Express** | +50% | Entrega same day |

### FAQs

1. "¿Cada cuánto hacer mantenimiento a mi Mac?"
2. "¿El mantenimiento borra mis datos?"
3. "¿Mantenimiento incluye cambio de pasta térmica?"
4. "¿Puedo hacer mantenimiento yo mismo?"
5. "¿Qué señales indican que mi Mac necesita mantenimiento?"
6. "¿Ofrecen servicio a domicilio?"

### Accesorios cross-selling

- Thermal paste → Tienda
- Cleaning kit → Tienda
- Herramientas → Tienda

### Schema

- Service schema con location
- FAQPage schema
- BreadcrumbList

---

## 9. SEO Local Schema

### BreadcrumbList (todas las páginas)

```
Inicio > Servicio Técnico > {Dispositivo}
```

### Service Schema

- name: "Servicio Técnico {Dispositivo} Bogotá"
- provider: Pipod
- areaServed: Bogotá, Chapinero
- priceRange: "$$" (Consultar)

### FAQPage Schema

- Cada página tiene 5-7 FAQs
- Schema.org/FAQPage

---

## 10. Dependencies

- T1 (Navbar): ✅ completed
- T2 (URL rename): ✅ completed
- T3 (Sub-pages): ⏳ in progress
- T4 (Blog): ⏸️ pending
- T5 (Blog archive): ⏸️ pending

---

## 11. Engram IDs relacionados

| ID | Contenido |
|----|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first completa |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades datos 2025 |
| Research: MacBook | wide-beige-antelope |
| Research: iMac + Mantenimiento | exotic-tomato-landfowl |

---

*Spec creado: 2026-05-22*
*Para implementar ver: `.atl/tasks/t3-sub-pages.md`*