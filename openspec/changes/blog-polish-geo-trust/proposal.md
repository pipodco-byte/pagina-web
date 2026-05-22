# Proposal: Blog Polish (GEO + Trust + Conversion)

> **Change**: `blog-polish-geo-trust`
> **Phase**: proposal
> **Status**: draft

## Intent

Optimize Pipod's 73 blog articles to boost Generative Engine Optimization (GEO), Conversion Rate Optimization (CRO), and Trust (E-E-A-T) using "La Fórmula Pipod".

## Scope

### In Scope
- Refactor 73 articles in prioritized batches of 10.
- **Batch 1**: 10 articles focusing on iPhones, screens, and batteries.
- **Conversion Hook**: First paragraph (<100 words) targeting user pain and Pipod's solution.
- **Internal Linking**: Minimum 2 links to `/tienda-pipod` or `/servicio-tecnico-apple`.
- **Trust Nuggets (T&C)**: 12-month component warranty, backup recommendation, 1.5h diagnostic.
- **Pipod Expert Tip**: Unique technical insight block for LLM citation.

### Out of Scope
- Modifying blog listing, layouts, or visual components.
- Sourcing or writing new blog posts.
- Restructuring Astro Content Collections schema.

## Approach

Update the body and structure of `/src/content/blog/*.md` files. Use standard Markdown and styled HTML blocks for the Conversion Hook and Expert Tip to ensure high visibility. Apply changes in batches, prioritizing commercial content first.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/content/blog/*.md` | Modified | Update 73 articles in batches of 10. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Frontmatter schema break | Med | Run `npm run build` validation after every batch. |
| Markdown formatting issues | Low | Peer review and standard markdown syntax enforcement. |

## Rollback Plan

Use Git to discard changes in modified files: `git checkout src/content/blog/`.

## Datos de Search Console Integrados (Feb-May 2026)

**Métricas agregadas del sitio:**
- Clics totales: 114 (49% brand "pipod" = 56 clics, 51% non-brand = 58 clics)
- Impresiones totales: 2,630
- CTR medio: 4.3%
- Posición media: 8.2

**Insight crítico:** El 49% del tráfico viene de búsqueda de marca. El SEO no-brand (58 clics/mes) está subdesarrollado.

### Keywords Frontier (Pos. 6-11) — Quick Wins Prioritarios

| Keyword | Posición | Clics | Impresiones | CTR | Artículo Objetivo | Acción |
|---------|----------|-------|-------------|-----|-------------------|--------|
| `servicio tecnico iphone bogota` | **8.29** | 0 | 7 | 0% | `02-servicio-tecnico-iphone-bogota.md` | On-page + Linking → Top 5 |
| `cambio bateria iphone` | **10** | 0 | 5 | 0% | `01-cambio-bateria-iphone-chapinero.md` | On-page + Linking → Top 5 |
| `cambio pantalla iphone bogota` | ~8-11 | 0 | ? | 0% | `02-cambio-pantalla-iphone-bogota.md` | On-page + Linking → Top 5 |
| `iphone no enciende bogota` | ~8-11 | 0 | ? | 0% | `05-iphone-no-enciende-bogota.md` | On-page + Linking → Top 5 |

### Keyword Estrella (Oportunidad Latente)

| Keyword | Posición | Clics | Impresiones | CTR | Observación |
|---------|----------|-------|-------------|-----|-------------|
| `arreglo iphone bogota` | **20** | 1 | 2 | **50%** | CTR excepcional en posición baja. Subir a top 10 = 5-10x clics. |

### Discrepancias Críticas (Impresiones sin Clics)

| Keyword | Impresiones | Clics | Posición | Diagnóstico |
|---------|-------------|-------|----------|-------------|
| `servicio tecnico apple bogota` | 19 | 0 | 24.11 | 🟢 Oportunidad latente — 19 impresiones en página 3 |
| `apple retoma` | 13 | 0 | 14.77 | 🟢 Oportunidad — 13 impresiones en página 2 |
| `reparacion apple` | 13 | 0 | 42.85 | 🔴 Basura (por ahora) — posición 42, competencia global |
| `servicio tecnico apple` | 11 | 0 | 32.27 | 🟡 Difícil — genérico nacional |
| `reparacion iphone bogota` | 11 | 0 | 42.73 | 🔴 Basura (por ahora) — competencia brutal |

**Hallazgo técnico crítico:** Auditoría confirma **0% internal linking manual** en los 73 artículos. Solo CTAs a WhatsApp. El template de "Related Posts" automáticos es insuficiente.

---

## Batch 1 Real — Priorizado por Datos de Search Console

**No más "Batch 1: 10 artículos de iPhone".** Ahora es **Batch 1: 12 artículos específicos** mapeados a keywords reales con posición 6-24.

### Grupo A: Frontier (Pos. 6-11) — Máximo Impacto, Menor Esfuerzo

| # | Artículo | Keyword Objetivo | Posición SC | Esfuerzo | Impacto |
|---|----------|------------------|-------------|----------|---------|
| 1 | `02-servicio-tecnico-iphone-bogota.md` | `servicio tecnico iphone bogota` | **8.29** | 2h | 🔥🔥🔥 |
| 2 | `01-cambio-bateria-iphone-chapinero.md` | `cambio bateria iphone` | **10** | 1h | 🔥🔥🔥 |
| 3 | `02-cambio-pantalla-iphone-bogota.md` | `cambio pantalla iphone bogota` | ~8-11 | 1h | 🔥🔥🔥 |
| 4 | `05-iphone-no-enciende-bogota.md` | `iphone no enciende bogota` | ~8-11 | 1h | 🔥🔥 |
| 5 | `01-reparacion-iphone-chapinero.md` | `arreglo iphone bogota` | **20** (CTR 50%) | 2h | 🔥🔥🔥 |

### Grupo B: Página 2-3 con Potencial — Esfuerzo Medio, Alto Retorno

| # | Artículo | Keyword Objetivo | Posición SC | Esfuerzo | Impacto |
|---|----------|------------------|-------------|----------|---------|
| 6 | `08-servicio-tecnico-apple-bogota.md` | `servicio tecnico apple bogota` | **24.11** | 2h | 🔥🔥 |
| 7 | `25-donde-reparar-iphone-bogota.md` | `donde reparar iphone bogota` | ~20+ | 1h | 🔥🔥 |
| 8 | `64-recuperacion-datos-iphone-bogota.md` | `recuperacion datos iphone` | ~24+ | 1h | 🔥🔥 |

### Grupo C: Apple Watch Cluster — Cross-linking Urgente

| # | Artículo | Keyword Objetivo | Estado | Esfuerzo | Impacto |
|---|----------|------------------|--------|----------|---------|
| 9 | `40-reparacion-apple-watch-bogota.md` | `reparacion apple watch bogota` | Aislado | 30min | 🔥🔥 |
| 10 | `61-apple-watch-no-enciende-bogota.md` | `apple watch no enciende bogota` | Aislado | 30min | 🔥🔥 |
| 11 | `62-apple-watch-mojado-bogota.md` | `apple watch mojado bogota` | Aislado | 30min | 🔥 |
| 12 | `63-cambio-pila-apple-watch-bogota.md` | `cambio pila apple watch bogota` | Aislado | 30min | 🔥 |

**Nota:** Los 4 artículos de Apple Watch deben interlinkarse entre sí y linkar a los artículos de iPhone para transferir autoridad.

---

## Internal Linking Estratégico — Mapa de Conexiones

**No solo "poner 2 links". Es un mapa de autoridad.**

### Páginas Destino Prioritarias (Reciben links desde todos lados):

1. `/servicio-tecnico-apple-bogota` — Servicio general (más alto valor)
2. `/cambio-pantalla-iphone-bogota` — Servicio específico alto volumen
3. `/cambio-bateria-iphone-chapinero` — Servicio específico alto volumen
4. `/plan-retoma-apple` — Retoma (monetización directa)
5. `/garantia-real-pipod-bogota` — Trust (ideal para artículos de dudas)

### Páginas Origen (Dan links):

- **Todos los artículos del blog** → deben linkar a 2-3 destinos prioritarios
- **Anchor texts variados:** No exact match masivo. Usar:
  - `"nuestro servicio técnico en Bogotá"`
  - `"cambio de pantalla iPhone"`
  - `"garantía de 12 meses"`
  - `"plan retoma"`
  - `"artículo sobre baterías"` (para links internos entre blogs)

### Ejemplo de Estrategia por Artículo:

**Artículo:** `03-iphone-lento-bogota.md`
**Links obligatorios:**
1. A `/cambio-bateria-iphone-chapinero` — "Si tu iPhone está lento por batería degradada..."
2. A `/servicio-tecnico-apple-bogota` — "En nuestro servicio técnico diagnosticamos..."
3. A `01-cambio-bateria-iphone-chapinero.md` — "Lee nuestra guía completa de baterías..."

---

## Apple Watch Cluster — Estrategia Específica

**Problema:** 4 artículos de Apple Watch están completamente aislados. No reciben ni dan links.

**Solución:** Crear un "cluster" interconectado.

### Links Internos del Cluster:

| Desde | Hacia | Anchor Text |
|-------|-------|-------------|
| `40-reparacion-apple-watch-bogota.md` | `61-apple-watch-no-enciende-bogota.md` | "Apple Watch que no enciende" |
| `40-reparacion-apple-watch-bogota.md` | `62-apple-watch-mojado-bogota.md` | "recuperación cuando se moja" |
| `40-reparacion-apple-watch-bogota.md` | `63-cambio-pila-apple-watch-bogota.md` | "cambio de pila" |
| `61-apple-watch-no-enciende-bogota.md` | `40-reparacion-apple-watch-bogota.md` | "servicio completo de reparación" |
| `62-apple-watch-mojado-bogota.md` | `63-cambio-pila-apple-watch-bogota.md` | "cambio de pila si no hay solución" |
| `63-cambio-pila-apple-watch-bogota.md` | `40-reparacion-apple-watch-bogota.md` | "otros problemas de Apple Watch" |

### Links desde iPhone hacia Apple Watch:

| Desde (iPhone) | Hacia (Apple Watch) | Anchor Text |
|----------------|---------------------|-------------|
| `01-cambio-bateria-iphone-chapinero.md` | `63-cambio-pila-apple-watch-bogota.md` | "también cambiamos la pila del Apple Watch" |
| `07-iphone-mojado-bogota.md` | `62-apple-watch-mojado-bogota.md` | "mismo proceso para Apple Watch mojado" |

---

## Regla de Oro de ROI por Tiempo

**No todos los artículos merecen el mismo esfuerzo.**

### Criterio de Priorización por Tráfico Real:

| Tráfico en SC | Esfuerzo Máximo | Qué hacer |
|---------------|-----------------|-----------|
| **≥2 clics/mes** | 2-3 horas | Hook + Trust + Expert Tip + Links + OG |
| **1 clic/mes** | 1-2 horas | Links + OG + Stats footer + Trust básico |
| **0 clics, >5 impresiones** | 30-45 min | Links + OG + Schema |
| **0 clics, <5 impresiones** | 15-30 min | Solo Links + OG (mínimo viable) |

**Ejemplo práctico:**
- `02-servicio-tecnico-iphone-bogota.md` (pos. 8.29) → 2-3 horas (máximo esfuerzo)
- `66-iphone-no-vibra-bogota.md` (0 datos en SC) → 15 min (solo links)

---

## Dependencies

- Variables de entorno: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (para OG dinámico si aplica)
- Imágenes OG: 1200x630px para cada artículo (o sistema de generación OG dinámica)
- Acceso a Search Console: Para monitorear cambios post-optimización

## Success Criteria — Métricas Operacionales

- [ ] All 73 articles updated with the 4-part "Pipod Formula".
- [ ] ≥2 strategic internal links present in each article (verificado con `grep`).
- [ ] Zero build errors during `npm run build` validation.
- [ ] T&C trust signals successfully injected across all optimized articles.

---

## Business KPIs — Métricas de Negocio (30-60-90 días)

### Objetivo Realista (Data-Driven)
**Pasar de 58 clics/mes (non-brand) a ~180 clics/mes en 90 días.**

### KPIs por Fase:

#### 30 días (Batch 1 + Batch 2 completados)
- [ ] **Clics non-brand:** 58 → 90 (+55%)
- [ ] **Keywords en Top 10:** 5 → 12
- [ ] **Keywords Frontier (6-11) en Top 5:** 2 de 5
- [ ] **CTR promedio:** 4.3% → 5.5%

#### 60 días (Batch 3-5 completados)
- [ ] **Clics non-brand:** 90 → 140 (+55% adicional)
- [ ] **Keywords en Top 10:** 12 → 20
- [ ] **Posición media:** 8.2 → 6.5
- [ ] **Clics internos desde blog a servicios:** +50%

#### 90 días (Todos los batches completados)
- [ ] **Clics non-brand:** 140 → 180 (+210% total desde inicio)
- [ ] **Impresiones:** 2,630 → 5,000+
- [ ] **Keywords en Top 3:** 5 → 10
- [ ] **Conversiones WhatsApp desde blog:** 5 → 15/semana

### KPIs de GEO (Generative Engine Optimization)
- [ ] **Aparición en Perplexity** para "servicio técnico iPhone Bogotá"
- [ ] **Aparición en Gemini** para "cambio batería iPhone Chapinero"
- [ ] **Citas de "Pipod Expert Tip"** en respuestas de LLMs

---

## Notas de Implementación

### Prioridad de Ejecución (por ROI de tiempo)
1. **Phase 1 (Día 1-2):** Internal linking en Batch 1 Real (5 artículos Frontier) — 4 min/artículo
2. **Phase 2 (Día 3):** OG images + Schema para Batch 1 — 3 min/artículo
3. **Phase 3 (Día 4-5):** Hooks + Trust + Expert Tip para Batch 1 — 15 min/artículo
4. **Phase 4 (Día 6-7):** Apple Watch Cluster completo — cross-linking prioritario
5. **Phase 5 (Día 8-10):** Batch 2 (artículos 6-12 del grupo B y C)

### Tracking
- Usar Google Search Console para monitorear cambios semanales
- Documentar posiciones pre y post optimización por keyword
- Trackear clics internos mediante UTM tags (opcional)

---

*Última actualización: 2026-05-20*
*Basado en datos reales de Search Console (Feb-May 2026)*
