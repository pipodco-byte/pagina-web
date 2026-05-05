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
| **Styling** | SCSS, Bootstrap 2.6, Tailwind |
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

## Recent Changes

| Date | Change | Commit |
|------|--------|--------|
| 2026-05-04 | fix-cart-hydration: Nano Stores replace React Context | `5c7b665` |
| 2026-05-04 | local-seo-cro-v3: Hub Schema, CLS Fix | `6c8893a` |
| 2026-05-04 | content: Contact Hero/History copy update | `01c3b38` |

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
