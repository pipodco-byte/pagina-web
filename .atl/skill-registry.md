# Skill Registry - Astro-Ecommerce

**Project**: Astro-Ecommerce  
**Last Updated**: 2026-03-28

## Project Skills

No custom skills detected in project.

## User/Global Skills

Loaded from: `~/.config/opencode/skills/`

| Skill | Purpose |
|-------|---------|
| `sdd-init` | Initialize SDD context in a project |
| `sdd-explore` | Investigate ideas before committing to a change |
| `sdd-propose` | Create change proposals |
| `sdd-spec` | Write specifications with scenarios |
| `sdd-design` | Create technical design documents |
| `sdd-tasks` | Break down changes into implementation tasks |
| `sdd-apply` | Implement tasks following specs |
| `sdd-verify` | Validate implementation against specs |
| `sdd-archive` | Sync specs and archive completed changes |
| `branch-pr` | PR creation workflow |
| `issue-creation` | Issue creation workflow |
| `skill-registry` | Create/update skill registry |

## Project Conventions

| Convention | Details |
|------------|---------|
| **Tech Stack** | Astro 6.1 (SSR), React 18, TypeScript (strict), Vite 5 |
| **State Management** | Nanostores (atom-based, cross-island) |
| **Styling** | SCSS, Bootstrap 5.3, Bootstrap Icons |
| **CMS** | Contentful (production) |
| **Backend** | Astro API routes (server mode) |
| **Deployment** | Vercel adapter |
| **CI/CD** | GitHub Actions (deploy, sync-reviews) |
| **Testing** | None detected |
| **Linting** | None detected |

## Architecture Patterns

- **Component Organization**: Feature-based directories under `src/components/`
- **Store Pattern**: Centralized stores in `src/store/` (cartStore.ts) with localStorage persistence
- **Cross-Island State**: Nano Stores for React islands communication (solves Astro hydration issue)
- **API Routes**: Astro SSR endpoints in `src/pages/api/`
- **Data Layer**: Contentful client in `src/lib/contentful.ts`

## Active SDD Changes (Mayo 2026)

| Change | Phase | Status | Priority |
|--------|-------|--------|----------|
| `t1-navbar-dropdowns` | COMPLETED ✅ | Navbar React→Astro + glassmorphism + centered dropdowns |
| `t3-sub-pages` | TASKS | Ready to apply | 🔴 HIGH |
| `local-seo-cro-v3` | PARTIAL | 2/6 phases done | 🟡 MEDIUM |
| `seo-10` | PARTIAL | 2/11 modules done | 🟡 MEDIUM |
| `fix-all-pending-bugs` | TASKS | Pending | 🟡 MEDIUM |
| `legacy-css-cleanup` | TASKS | Pending | 🟢 LOW |
| `tailwind-migration` | TASKS | Pending | 🟢 LOW |

## New Proposals (Mayo 2026 — SEO Local Strategy) — DOCUMENTADOS, NO EJECUTADOS

| Proposal | File | Priority | Status |
|----------|------|----------|--------|
| `gbp-y-directorios-locales` | `.atl/proposals/gbp-y-directorios-locales.md` | 🔴 HIGH | DOCUMENTED |
| `hiperlocal-barrios` | `.atl/proposals/hiperlocal-barrios.md` | 🟡 MEDIUM | DOCUMENTED |
| `autoridad-tecnica-eeat` | `.atl/proposals/autoridad-tecnica-eeat.md` | 🟡 MEDIUM | DOCUMENTED |
| `seo-url-hierarchy-complete` | (existe en specs) | 🔴 HIGH | NEEDS PROPOSAL |

> ⚠️ **Nota:** Estos proposals fueron documentados a partir de recomendaciones SEO pero NO fueron ejecutados. State file: `seo-local-nuevos-state.yaml`

## Recent Changes

| Date | Change | Commit |
|------|--------|--------|
| 2026-05-22 | t2-internal-links: URL rename + 301 redirect | `8f8625f` |
| 2026-05-20 | remediacion-seguridad: Git history cleanup | — |
| 2026-05-20 | SEO schema + terminos updates | — |
| 2026-05-13 | sdd-init pipeline T1,T2,T3 defined | — |
| 2026-05-12 | blog-editorial-redesign + blog-phanatik-enhancements archived | — |
| 2026-05-05 | restore-scss-5-pages: SCSS restored in all pages | `80c4c6b` |
| 2026-05-05 | fix: remove Tailwind v4 (abandoned migration) | `44a3de1` |
| 2026-05-04 | fix-cart-hydration: Nano Stores replace React Context | `5c7b665` |
| 2026-05-04 | local-seo-cro-v3: Hub Schema, CLS Fix | `6c8893a` |

## Branches

| Branch | Status | Purpose |
|--------|--------|---------|
| `main` | Production (www.pipod.co) | Live site |
| `develop` | Synced with main | Active development |
| `memoria` | 241f9ce | Visual reference (before fixes) |

## Tech Stack Notes

- **Tailwind**: REMOVED (v4 migration abandoned)
- **Styling**: SCSS + Bootstrap 5.3 CDN + custom CSS files
- **Build**: Vercel adapter, Node 24 runtime

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
