# Spec: Bold Payment Gateway Activation

> **Change**: `bold-payment-gateway`
> **Domain**: Payment Gateway
> **Type**: Full spec (new domain)

---

## Requirement 1: Sandbox Credential Configuration

The system MUST use valid Bold sandbox credentials to create payment links.

### Scenario: Sandbox API returns checkout URL
- **Given** `BOLD_SANDBOX_API_KEY` is configured in `.env.local`
- **And** `BOLD_SANDBOX_ENABLED=true`
- **When** `POST /api/bold/create-link` is called with valid checkout data
- **Then** Bold sandbox API returns a 200 with a valid `checkoutUrl`
- **And** the response body contains `{ "checkoutUrl": "https://checkout-sandbox.bold.co/..." }`

---

## Requirement 2: End-to-End Checkout Flow

Users MUST be able to complete a purchase from cart to Bold payment redirect.

### Scenario: Successful checkout link creation
- **Given** a user has items in their cart
- **When** they submit the checkout form with valid shipping data
- **Then** `POST /api/bold/create-link` is called
- **And** Bold returns a valid `checkoutUrl`
- **And** the user is redirected to the Bold checkout page

### Scenario: Bold API error handling
- **Given** Bold API is unreachable or returns 500
- **When** `POST /api/bold/create-link` is called
- **Then** the API returns a 502 with `{ "error": "Payment gateway error" }`
- **And** checkout form shows "Pasarela de pagos no disponible"

### Scenario: Post-payment redirect (approved)
- **Given** the user completed payment on Bold
- **When** Bold redirects to `/checkout-success?reference=XYZ&status=APPROVED`
- **Then** the success page shows green confirmation UI
- **And** `/api/send-order-email` is triggered

### Scenario: Post-payment redirect (declined)
- **Given** the user's payment was declined on Bold
- **When** Bold redirects to `/checkout-success?reference=XYZ&status=DECLINED`
- **Then** the success page shows red failure UI with retry option

---

## Requirement 3: Webhook Signature Verification

The system MUST verify Bold webhook HMAC signatures before processing events.

### Scenario: Valid webhook accepted
- **Given** Bold sends a webhook with a valid `x-bold-signature` header
- **And** the timestamp is within 5 minutes of server time
- **When** `POST /api/bold/webhook` receives the request
- **Then** the webhook returns 200 OK
- **And** the payment event is logged

### Scenario: Invalid/expired webhook rejected
- **Given** a webhook arrives with an invalid HMAC signature
- **Or** the timestamp is more than 5 minutes old
- **When** `POST /api/bold/webhook` receives the request
- **Then** the webhook returns 401 Unauthorized

---

## Requirement 4: Order Email Confirmation

Completed orders MUST trigger an HTML confirmation email to `ventas@pipod.co`.

### Scenario: Email sent on approved payment
- **Given** a payment is approved and checkout-success page loads
- **When** `/api/send-order-email` is called with order details
- **Then** an HTML email is sent via Brevo API
- **And** the email contains order items, total, and shipping info

---

## Requirement 5: Legacy Component Removal

The codebase MUST NOT contain dead checkout code or deprecated endpoints.

### Scenario: Build passes after cleanup
- **Given** 7 legacy checkout components are deleted
- **And** deprecated `/api/bold-webhook.ts` is removed
- **And** duplicate `PaymentBanner.astro` is removed
- **When** `npm run build` is executed
- **Then** the build completes with exit code 0
- **And** no import errors reference deleted files

---

## Requirement 6: SDK Scoped Loading

The Bold `checkout.js` SDK MUST only load on the checkout page.

### Scenario: SDK present on checkout page
- **Given** the checkout page loads
- **When** the browser renders the page
- **Then** `https://checkout.bold.co/checkout.js` script is loaded

### Scenario: SDK absent on other pages
- **Given** any page other than checkout loads
- **When** the browser renders the page
- **Then** `https://checkout.bold.co/checkout.js` script is NOT loaded

---

## Requirement 7: Environment Configuration

`.env.example` MUST document Bold-specific environment variables.

### Scenario: .env.example reflects Bold
- **Given** `.env.example` is read by developers
- **When** they look for payment gateway variables
- **Then** they find: `PUBLIC_BOLD_API_KEY`, `BOLD_INTEGRITY_SECRET`, `BOLD_SANDBOX_API_KEY`, `BOLD_SANDBOX_ENABLED`
- **And** no Wompi keys (`WOMPI_PUBLIC_KEY`, `WOMPI_SECRET_KEY`) remain
