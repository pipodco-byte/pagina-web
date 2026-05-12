# Bold API Checkout - Estado de Integración

## Resumen

Implementación de pasarela de pagos Bold usando API Integration (creación de links de pago server-side).

## Estado: PAUSADO

La implementación técnica está completa pero pendiente de prueba con credenciales válidas.

## Arquitectura Implementada

```
CheckoutForm → POST /api/bold/create-link → Bold API → payment_link
                   ↓
              localStorage (reference guardada)
                   ↓
Bold → POST /api/bold/webhook → HMAC verify → procesar
```

## Archivos Creados

| Archivo | Propósito |
|---------|-----------|
| `src/lib/bold-types.ts` | Interfaces TypeScript para Bold API |
| `src/lib/hmac.ts` | Helper HMAC-SHA256 para verificación de webhook |
| `src/pages/api/bold/create-link.ts` | Endpoint POST que crea links de pago via Bold API |
| `src/pages/api/bold/webhook.ts` | Webhook con verificación HMAC |
| `src/pages/api/bold-webhook.ts` | Deprecado (legacy, usar `/api/bold/webhook.ts`) |

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/checkout/CheckoutForm.tsx` | Usa `/api/bold/create-link` en vez de URL manual |
| `.env.local` | Agregadas variables `BOLD_SANDBOX_API_KEY`, `BOLD_SANDBOX_ENABLED` |

## Variables de Entorno

```env
# Bold Botón (legacy)
PUBLIC_BOLD_API_KEY=hCQDyApFxLPrCFbBxwmnCsoVYfUbJEgCxb-gB3s_4ZQ
BOLD_INTEGRITY_SECRET=mIiL2XxQ1TUFAsQ0GaFEbA

# Bold API Integration (nuevo)
BOLD_SANDBOX_ENABLED=true
BOLD_SANDBOX_API_KEY=<pendiente verificar en dashboard>
```

## Issues Pendientes

1. **URL Sandbox**: Puede que el URL de sandbox sea `sandbox.api.bold.co` y no `integrations-sandbox.api.bold.co`
2. **Keys Separadas**: Se requieren keys de sandbox separadas en el dashboard de Bold
3. **Prueba E2E**: Necesita test con credenciales válidas

## Próximos Pasos

1. Verificar en dashboard de Bold las "Llaves de pruebas"
2. Confirmar URL correcto del API sandbox
3. Actualizar `.env.local` con credenciales correctas
4. Probar flujo completo checkout → Bold → webhook → email

## Documentación de Bold

- [API Integration](https://developers.bold.co/pagos-en-linea/api-integration)
- [Ambiente de Pruebas](https://developers.bold.co/pagos-en-linea/boton-de-pagos/ambiente-pruebas)
- [API Integration Sandbox](https://developers.bold.co/api-integrations/integration-sandbox)
