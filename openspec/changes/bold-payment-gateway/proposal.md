# Proposal: Bold Payment Gateway Activation

> **Change**: `bold-payment-gateway`
> **Phase**: proposal
> **Status**: draft

## Intent

Activate the Bold payment gateway integration by fixing sandbox credentials and cleaning up legacy/dead code. The entire integration is coded and compiles, but Bold API returns 500 due to missing sandbox keys and wrong API URL.

## Scope

### In Scope
- Fix Bold sandbox credentials (API key + URL)
- Update `.env.example` from Wompi to Bold keys
- Remove 7 orphaned legacy checkout components
- Delete deprecated `/api/bold-webhook.ts`
- Deduplicate PaymentBanner.astro (keep CLS-fixed version)
- Move Bold SDK from Layout.astro → checkout.astro only

### Out of Scope
- Adding new payment providers (Wompi, Mercado Pago)
- Order persistence in Supabase
- Bold production go-live
- Checkout UI redesign

## Approach

1. Verify `BOLD_SANDBOX_API_KEY` in Bold dashboard, correct API URL
2. Test `/api/bold/create-link` returns valid checkout URL
3. Clean up dead code (10 files removed)
4. Scope Bold SDK to checkout page only
5. End-to-end test: cart → checkout → Bold → webhook → email
6. Production readiness: toggle sandbox off, confirm prod keys in Vercel

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/api/bold/create-link.ts` | Modified | Fix sandbox URL |
| `.env.example` | Modified | Wompi → Bold keys |
| `src/pages/api/bold-webhook.ts` | Removed | Deprecated shim |
| `src/components/checkout/*` | Removed | 7 legacy components |
| `src/components/service/PaymentBanner.astro` | Removed | Duplicate |
| `src/layouts/Layout.astro` | Modified | Remove Bold SDK |
| `src/pages/checkout.astro` | Modified | Add Bold SDK |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Bold sandbox key rejected | Med | Contact Bold support, verify dashboard |
| SDK move breaks checkout | Low | Test locally before commit |
| Import path break on PaymentBanner dedup | Low | Grep all imports, update all references |

## Rollback Plan

`git revert` the commit. Bold SDK can be re-added to Layout.astro if checkout-only loading breaks.

## Dependencies

- Access to Bold merchant dashboard (sandbox keys)
- Vercel env vars for `BOLD_SANDBOX_API_KEY`

## Success Criteria

- [ ] `/api/bold/create-link` returns valid `checkoutUrl` (not 500)
- [ ] Full checkout flow works end-to-end in sandbox
- [ ] Build passes after 10 file deletions
- [ ] Bold SDK absent from non-checkout pages
