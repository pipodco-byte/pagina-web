# Tasks: Bold Payment Gateway Activation

**Total**: 19 tasks across 6 phases

---

## Phase 1: Unblock Bold (Credentials + URL)

- [ ] 1.1 Verify `BOLD_SANDBOX_API_KEY` in Bold merchant dashboard
- [ ] 1.2 Confirm correct sandbox API URL (`sandbox.api.bold.co` or `integrations-sandbox.api.bold.co`)
- [ ] 1.3 Update `.env.local` with correct sandbox credentials
- [ ] 1.4 Test: `POST /api/bold/create-link` returns `checkoutUrl` (not 500)

## Phase 2: Environment Configuration

- [ ] 2.1 Update `.env.example`: replace Wompi keys with Bold keys (`PUBLIC_BOLD_API_KEY`, `BOLD_INTEGRITY_SECRET`, `BOLD_SANDBOX_API_KEY`, `BOLD_SANDBOX_ENABLED`)

## Phase 3: Code Cleanup

- [ ] 3.1 Delete deprecated `src/pages/api/bold-webhook.ts` (returns 410 Gone)
- [ ] 3.2 Delete 7 orphaned legacy checkout components:
  - `src/components/checkout/checkoutMultiStep.tsx`
  - `src/components/checkout/checkoutOrderSummary.tsx`
  - `src/components/checkout/checkoutSingleItem.tsx`
  - `src/components/checkout/checkoutSingleItemDark.tsx`
  - `src/components/checkout/paymentDetails.tsx`
  - `src/components/checkout/shippingInfo.tsx`
  - `src/components/checkout/billingInfo.tsx`
- [ ] 3.3 Delete duplicate `src/components/service/PaymentBanner.astro`
- [ ] 3.4 Update all imports referencing deleted PaymentBanner to point to `src/components/payment/PaymentBanner.astro`
- [ ] 3.5 Build verification: `npm run build` passes with exit 0

## Phase 4: Bold SDK Optimization

- [ ] 4.1 Move Bold `checkout.js` `<script>` from `src/layouts/Layout.astro` to `src/pages/checkout.astro`
- [ ] 4.2 Verify checkout page still loads Bold SDK correctly
- [ ] 4.3 Build verification: `npm run build` passes with exit 0

## Phase 5: End-to-End Testing

- [ ] 5.1 Test full checkout flow: cart → checkout form → Bold link → redirect → success page
- [ ] 5.2 Test webhook: send valid test webhook → HMAC verification → 200 OK
- [ ] 5.3 Test invalid webhook: send webhook with wrong signature → 401 Unauthorized
- [ ] 5.4 Test email: approved payment → email sent to `ventas@pipod.co`

## Phase 6: Production Readiness

- [ ] 6.1 Confirm production Bold API key in Vercel env vars
- [ ] 6.2 Set `BOLD_SANDBOX_ENABLED=false` for production
- [ ] 6.3 Smoke test checkout in staging/production

---

## Implementation Order

Phases are strictly sequential:
1. **Credentials first** — nothing works without valid Bold API access
2. **Env cleanup** — low risk, can run in parallel with Phase 1
3. **Code cleanup** — depends on Phase 1 verifying which files are still used
4. **SDK scoping** — requires Phase 3 cleanup to be complete
5. **Testing** — requires Phases 1-4 complete
6. **Production** — final gate, requires all phases complete
