# Tasks: Bold API Checkout Integration

## Phase 1: Foundation / Types

- [x] 1.1 Create `src/lib/bold-types.ts` with `BoldLinkRequest`, `BoldLinkResponse`, `BoldWebhookPayload` interfaces
- [x] 1.2 Add `src/lib/hmac.ts` with HMAC-SHA256 verification helper for webhook signature validation

## Phase 2: Core Implementation

- [x] 2.1 Create `src/pages/api/bold/create-link.ts` POST endpoint calling Bold `/v1/links` with `x-api-key` header, returning `{ checkoutUrl: string }`
- [x] 2.2 Implement HMAC verification in `src/pages/api/bold/webhook.ts` — verify `x-bold-signature` header using `BOLD_INTEGRITY_SECRET`

## Phase 3: Integration / Wiring

- [x] 3.1 Update `src/components/checkout/CheckoutForm.tsx` — replace manual `boldUrl` construction with `fetch('/api/bold/create-link', { method: 'POST', body: JSON.stringify(checkoutData) })`, redirect to returned `checkoutUrl`
- [x] 3.2 Add to `.env.local`: `BOLD_SANDBOX_API_KEY`, `BOLD_SANDBOX_ENABLED=true` (sandbox-first pattern)

## PAUSED - Bold Integration

**Status**: Implementación completada, pendiente de prueba con credenciales sandbox válidas

**Bloqueador**: Se requiere verification de:
1. URL correcto del API sandbox de Bold (posiblemente `sandbox.api.bold.co` en vez de `integrations-sandbox.api.bold.co`)
2. Llave de identidad de pruebas separada en dashboard de Bold
3. Keys prod vs sandbox son diferentes

### Archivos creados
- `src/lib/bold-types.ts` — Tipos TypeScript
- `src/lib/hmac.ts` — Helper HMAC-SHA256
- `src/pages/api/bold/create-link.ts` — Endpoint de creación de links
- `src/pages/api/bold/webhook.ts` — Webhook con verificación HMAC
- `src/pages/api/bold-webhook.ts` — Marked deprecated (usa `/api/bold/webhook.ts`)

### Estado actual
El build compila correctamente. El flujo de checkout llama al API endpoint, pero el llamado a Bold API retorna 500.

### Continuar después
1. Verificar en dashboard de Bold las keys de sandbox
2. Confirmar URL del API sandbox
3. Actualizar `.env.local` con las credenciales correctas
4. Probar flujo end-to-end

## Phase 4: Testing

- [ ] 4.1 Test: Place order with sandbox keys — `CheckoutForm` calls API, receives Bold URL, redirects
- [ ] 4.2 Test: Send test webhook to `/api/bold/webhook` — HMAC verification rejects invalid signatures with 401

## Implementation Order

1. **Types first** — other tasks depend on shared interfaces
2. **API endpoint** — the core Bold integration
3. **Webhook HMAC** — completes security layer
4. **CheckoutForm wiring** — connects frontend to API
5. **Env vars** — configuration for sandbox
6. **Testing** — verify end-to-end flow

**Total: 8 tasks across 4 phases**
