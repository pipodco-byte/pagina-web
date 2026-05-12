# Proposal: Bold API Checkout Integration

## Intent

Replace the manual URL redirect checkout with Bold API Integration to create payment links server-side with HMAC authentication. Currently checkout fails because the manual URL construction is missing the required signature parameter.

## Scope

### In Scope
- Create `/api/create-bold-link.ts` — POST endpoint to Bold API with `x-api-key` auth header
- Modify `CheckoutForm.tsx` to call the API endpoint instead of building URL manually
- Implement HMAC verification in `/api/bold-webhook.ts`
- Configure sandbox environment with Bold API keys

### Out of Scope
- Supabase persistence for order records (future)
- Customer confirmation email on payment success (future)

## Approach

1. **Create link API**: New Astro API endpoint accepts order data, POSTs to Bold `/v1/links` with API key auth, returns `checkout.bold.co/LNK_XXX` URL
2. **Update CheckoutForm**: Replace manual URL building with fetch to `/api/create-bold-link`, redirect to returned Bold URL on success
3. **Webhook handler**: Verify HMAC signature from Bold's `x-bold-signature` header before processing payment events
4. **Sandbox first**: Use Bold sandbox credentials until integration verified

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/api/create-bold-link.ts` | New | Server-side Bold API integration |
| `src/pages/api/bold-webhook.ts` | New | HMAC-verified webhook receiver |
| `src/components/CheckoutForm.tsx` | Modified | Call API instead of manual URL |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Sandbox vs production keys confusion | Medium | Explicit env var naming: `BOLD_SANDBOX_API_KEY`, `BOLD_PROD_API_KEY` |
| Bold API rate limits during testing | Low | Add request debouncing, retry with backoff |

## Rollback Plan

1. Revert `CheckoutForm.tsx` to previous manual URL construction
2. Remove API route files
3. Set `BOLD_ENABLED=false` env flag (gate all Bold calls)

## Dependencies

- Bold API credentials (sandbox: `x-api-key` header)
- HMAC secret from Bold dashboard for webhook verification

## Success Criteria

- [ ] CheckoutForm calls `/api/create-bold-link` and redirects to Bold URL
- [ ] Bold webhook receives and verifies `x-bold-signature` HMAC
- [ ] Sandbox integration end-to-end successful
- [ ] Production key swap documented