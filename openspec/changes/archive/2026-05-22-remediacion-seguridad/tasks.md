# Tasks: Remediación de Seguridad

## Phase 1: Git History Cleanup
- [ ] Create backup of the current repository.
- [ ] Install `git-filter-repo` if not available.
- [ ] Run filter to remove sensitive files:
    ```bash
    git filter-repo --path .env.local --path .vercel/ --path dist/ --invert-paths --force
    ```
- [ ] Verify `git log` no longer contains sensitive files or secrets.
- [ ] Force push changes to remote repository (inform team members).

## Phase 2: API Refactoring
- [ ] Refactor `/src/pages/api/newsletter.ts` to read environment variables via `process.env` inside the handler.
- [ ] Refactor `/src/pages/api/sync-reviews.ts` to read environment variables via `process.env` inside the handler.
- [ ] Refactor `/src/pages/api/send-order-email.ts` to read environment variables via `process.env` inside the handler.
- [ ] Refactor `/src/pages/api/bold/webhook.ts` to read environment variables via `process.env` inside the handler.

## Phase 3: Testing & Validation
- [ ] Update or create unit tests for API handlers to verify runtime environment variable reading.
- [ ] Validate that API handlers function correctly when environment variables are provided during request execution.
- [ ] Run build process to ensure no compilation errors: `npm run build`.

## Phase 4: Finalization
- [ ] Rotate all exposed credentials/secrets in Vercel dashboard.
- [ ] Document the changes and security procedures.
- [ ] Final deployment verification in Vercel.
