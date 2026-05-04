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
| **State Management** | Nanostores (atom-based) |
| **Styling** | SCSS, Bootstrap 2.6, Tailwind |
| **CMS** | Contentful (production) |
| **Backend** | Astro API routes (server mode) |
| **Deployment** | Vercel adapter |
| **CI/CD** | GitHub Actions (deploy, sync-reviews) |
| **Testing** | None detected |
| **Linting** | None detected |

## Architecture Patterns

- **Component Organization**: Feature-based directories under `src/components/`
- **Store Pattern**: Centralized stores in `src/store/` with localStorage persistence
- **Context Pattern**: React Context for cart management
- **API Routes**: Astro SSR endpoints in `src/pages/api/`
- **Data Layer**: Contentful client in `src/lib/contentful.ts`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
