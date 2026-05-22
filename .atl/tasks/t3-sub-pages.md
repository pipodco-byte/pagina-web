# SDD Tasks: t3-sub-pages

**Change:** `t3-sub-pages`  
**Status:** Active  
**Project:** Pipod.co (Astro-Ecommerce)  
**Date:** 2026-05-22  
**Engram:** #184  
**Parent:** seo-url-hierarchy (T3)

---

## Phase T3: Create 5 Device Service Pages

### T3.1 — Crear página iPhone

- [ ] **T3.1.1** Crear directorio `src/pages/servicio-tecnico-apple-bogota/`
- [ ] **T3.1.2** Crear archivo `iphone.astro` basado en `servicio-tecnico-apple-bogota.astro`
- [ ] **T3.1.3** Actualizar Hero: H1 + meta description (SEO)
- [ ] **T3.1.4** Agregar 10 servicios en grid (batería, pantalla, placa, agua, face id, cámara, carga, audio, no enciende, software)
- [ ] **T3.1.5** Agregar sección accesorios cross-selling (5 items)
- [ ] **T3.1.6** Agregar 5 FAQs con acordeón
- [ ] **T3.1.7** Agregar Schema: Service + FAQPage + BreadcrumbList
- [ ] **T3.1.8** Actualizar navbar links (dropdown ya apunta aquí)

**Archivo:** `src/pages/servicio-tecnico-apple-bogota/iphone.astro`

---

### T3.2 — Crear página MacBook

- [ ] **T3.2.1** Crear archivo `macbook.astro`
- [ ] **T3.2.2** Actualizar Hero: H1 + meta description (SEO)
- [ ] **T3.2.3** Agregar 10 servicios en grid (batería, pantalla, no enciende, teclado, mantenimiento, lento, placa, upgrade, touch bar, magsafe)
- [ ] **T3.2.4** Agregar sección accesorios cross-selling (5 items)
- [ ] **T3.2.5** Agregar 6 FAQs con acordeón
- [ ] **T3.2.6** Agregar Schema: Service + FAQPage + BreadcrumbList

**Archivo:** `src/pages/servicio-tecnico-apple-bogota/macbook.astro`

---

### T3.3 — Crear página iMac

- [ ] **T3.3.1** Crear archivo `imac.astro`
- [ ] **T3.3.2** Actualizar Hero: H1 + meta description (SEO)
- [ ] **T3.3.3** Agregar 8 servicios en grid (pantalla, placa, disco, ram, mantenimiento, fuente, gpu, teclado/mouse)
- [ ] **T3.3.4** Agregar sección accesorios cross-selling (4 items)
- [ ] **T3.3.5** Agregar 6 FAQs con acordeón
- [ ] **T3.3.6** Agregar Schema: Service + FAQPage + BreadcrumbList

**Archivo:** `src/pages/servicio-tecnico-apple-bogota/imac.astro`

---

### T3.4 — Crear página Apple Watch

- [ ] **T3.4.1** Crear archivo `apple-watch.astro`
- [ ] **T3.4.2** Actualizar Hero: H1 + meta description (SEO)
- [ ] **T3.4.3** Agregar 4 servicios en grid (pantalla, batería, corona, sensor)
- [ ] **T3.4.4** Agregar sección accesorios cross-selling (4 items)
- [ ] **T3.4.5** Agregar 4 FAQs con acordeón
- [ ] **T3.4.6** Agregar Schema: Service + FAQPage + BreadcrumbList

**Archivo:** `src/pages/servicio-tecnico-apple-bogota/apple-watch.astro`

---

### T3.5 — Crear página Mantenimiento

- [ ] **T3.5.1** Crear archivo `mantenimiento.astro`
- [ ] **T3.5.2** Actualizar Hero: H1 + meta description (SEO)
- [ ] **T3.5.3** Agregar 8 servicios en grid (mantenimiento, limpieza, optimización, upgrade, diagnóstico, instalación os, recuperación, express)
- [ ] **T3.5.4** Agregar paquetes (básico, completo, premium, express) con precios "Consultar"
- [ ] **T3.5.5** Agregar sección accesorios cross-selling (3 items)
- [ ] **T3.5.6** Agregar 6 FAQs con acordeón
- [ ] **T3.5.7** Agregar Schema: Service + FAQPage + BreadcrumbList

**Archivo:** `src/pages/servicio-tecnico-apple-bogota/mantenimiento.astro`

---

### T3.6 — Actualizar servicios relacionados

- [ ] **T3.6.1** Actualizar `ServicePageSchema.astro` para incluir las 5 nuevas URLs
- [ ] **T3.6.2** Actualizar `index-now.ts` para notificar nuevas URLs a buscadores
- [ ] **T3.6.3** Verificar que el navbar dropdown links apuntan correctamente

---

### T3.7 — Verificación

- [ ] **T3.7.1** `npm run build` pasa sin errores
- [ ] **T3.7.2** Verificar las 5 páginas cargan correctamente (200 status)
- [ ] **T3.7.3** Verificar Schema en cada página (Google Rich Results Test)
- [ ] **T3.7.4** Verificar que los links de accesorios apuntan a `/tienda-pipod`
- [ ] **T3.7.5** Test mobile responsive en cada página

---

## Dependencies

| Task | Depende de |
|------|-------------|
| T3.1 (iPhone) | T2 (URL rename) ✅ |
| T3.2 (MacBook) | T2 ✅ |
| T3.3 (iMac) | T2 ✅ |
| T3.4 (Apple Watch) | T2 ✅ |
| T3.5 (Mantenimiento) | T2 ✅ |
| T3.6 (Update schemas) | T3.1-3.5 |
| T3.7 (Verification) | T3.6 |

---

## Order de implementación (por prioridad)

1. **T3.1 iPhone** — 57 casos, 28.3% baterías 🔥🔥🔥
2. **T3.2 MacBook** — 47 casos, estratégico 2026 🔥🔥🔥
3. **T3.3 iMac** — Alto margen 🔥🔥
4. **T3.4 Apple Watch** — Marca 🔥🔥
5. **T3.5 Mantenimiento** — Recurrente 🔥

---

## Cross-selling estratégico (cada página)

| Página | Texto | Link |
|--------|-------|------|
| **iPhone** | "¿Tu iPhone también necesita protección? 🎁 Combo: Funda + Protector $50.000" | WhatsApp 💬 |
| **MacBook** | "¿Tu MacBook también necesita protección? 🎁 Combo: Carcasa + Protector $150.000" | WhatsApp 💬 |
| **iMac** | "¿Tu iMac también necesita accesorios? Teclado, mouse, stand..." | Tienda 🛒 |
| **Apple Watch** | "¿Tu Watch necesita protección? Solo vendemos en tienda — escríbenos" | WhatsApp 💬 |
| **Mantenimiento** | "¿Quieres agendar mantenimiento preventivo? Contáctanos" | WhatsApp 💬 |

**Nota:** Cross-selling aparece DESPUÉS del CTA principal de WhatsApp. Es sutil, no distrae.

---

## Nota: Template base

Usar `src/pages/servicio-tecnico-apple-bogota.astro` como template base para las 5 páginas. Cada página hereda la estructura pero con contenido específico por dispositivo.

---

## Engram IDs relacionados

| ID | Contenido |
|----|-----------|
| [#184](https://app.engram.ai/astro-ecommerce/observation/184) | Arquitectura SEO-first completa |
| [#186](https://app.engram.ai/astro-ecommerce/observation/186) | Prioridades datos 2025 |

---

*Tasks creadas: 2026-05-22*
*Status: Ready to implement (en orden de prioridad)*