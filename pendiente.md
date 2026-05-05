# Pendientes - Astro-Ecommerce / Pipod

**Última actualización:** 2026-05-04 (actualizado con fix-cart-hydration)
**Estado SEO:** ✅ COMPLETADO (7.2/10)
**Design System:** Tokens creados, 98 tareas pendientes

---

## ✅ COMPLETADO

### SEO (Score: 8/10)
- Phase 1-5 SEO completamente resuelto
- Layout.astro corregido (canonical, lang=es)
- LocalBusinessSchema.fixedo
- ProductSchema.astro creado
- Meta descriptions añadidas
- robots.txt actualizado
- 3 archivos duplicados eliminados
- Hub Schema (local-seo-cro-v3)
- CLS Fix (PaymentBanner width/height)

### Cart Hydration (Score: ✅ FIXED)
- **Nano Stores** reemplaza React Context para estado global
- **AppWrapper** como single island con Navbar + CartDrawer
- **Error useCart** eliminado
- `CartContext.tsx` y `CartProviderWrapper.tsx` eliminados
- **Commit:** `5c7b665`

---

## ⏳ PENDIENTES

### Frontend / Visual

| # | Tarea | Prioridad | Notas |
|---|-------|-----------|-------|
| 1 | Revisión total de Mobile Responsive | Alta | - |
| 2 | NavBar Tienda: Componente navegación | Media | - |
| 3 | Diseño Blog: Pulir página principal | Media | - |
| 4 | Diseño ProductShop: Mejorar estética | Media | - |
| 5 | Servicio Técnico: Pulir /servicio-tecnico-apple | Media | - |
| 6 | Visual Entradas: Diseño posts individuales | Baja | - |
| 7 | Creación Visual: Piezas gráficas faltantes | Baja | - |
| 8 | Card MacBook: Quitar "añadir a carrito" | Alta | Debe ser igual a iPhone |
| 9 | Orden del Home: Reordenar componentes | Media | - |

### Design System (Tokens Creados - No Integrados)

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| - | Crear `src/styles/_tokens.css` | - | ✅ CREADO |
| - | 98 tareas de implementación | - | ⏳ Pendientes |

**Archivo creado:** `src/styles/_tokens.css`
- 60+ tokens CSS definidos
- Colores, tipografía, espaciado, radios, sombras
- **NO está integrado** - solo archivo de referencia

### Backend / Datos

| # | Tarea | Prioridad |
|---|-------|-----------|
| 10 | API Reviews: Cloudflare / Contentful / Excel | Alta |
| 11 | Integración Excel: Alimente web + chatbot | Alta |
| 12 | Carga Inventario: Subir productos | Alta |
| 13 | Carga Visual: Elementos visuales | Media |
| 14 | Sync Dashboard Pipod + Supabase | Media |

### Contenido

| # | Tarea | Prioridad |
|---|-------|-----------|
| 15 | Plataforma Blog: Sanity vs Ghost | Alta |
| 16 | Scripts Astro: Convertir blog a formato | Media |
| 17 | Revisar categorías Blog en Contentful | Media |
| 18 | Contenido Marcelo: Subir artículos | Baja |

### 🔍 Decisión Pendiente: CMS de Blog

| Opción | Pros | Contras |
|--------|------|---------|
| **Sanity** | Esquemas flexibles, API potente, SDK excelente | Curva de aprendizaje, más caro |
| **Ghost** | Enfocado en publishing, membresías integradas | Menos flexible para e-commerce |

### Payments / Integraciones

| # | Tarea | Prioridad |
|---|-------|-----------|
| 19 | Pasarela Bold para accesorios | Alta |
| 20 | Redirect WhatsApp para resto | Media |
| 21 | API Brevo Newsletter | Media |

### Legales

| # | Tarea | Prioridad |
|---|-------|-----------|
| 22 | Modificar Términos y Condiciones | Media |

---

## 📊 RESUMEN

| Categoría | Total | Completado | Pendiente |
|-----------|-------|------------|-----------|
| SEO | 25+ | 25+ | 0 |
| Frontend/Visual | 9 | 0 | 9 |
| Design System | 98 | 1 (tokens) | 97 |
| Backend/Datos | 5 | 0 | 5 |
| Contenido | 4 | 0 | 4 |
| Payments | 3 | 0 | 3 |
| Legales | 1 | 0 | 1 |

---

## 📁 ARCHIVOS DEL PROYECTO

| Archivo | Propósito |
|---------|-----------|
| `TOTAL.md` | Consolidado de todo el proyecto |
| `ESTADO.md` | Design System (formato Airbnb) |
| `pendiente.md` | Este archivo |
| `SEO_COMPLETE_AUDIT.md` | Auditoría SEO completa |
| `SDD_PROPOSAL.md` | Propuesta SDD SEO (archivada) |
| `src/styles/_tokens.css` | Design tokens CSS |

---

*Última actualización: 2026-05-04*