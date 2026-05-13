# Design: blog-phanatik-enhancements

## Technical Approach

Enhance the Pipod blog index (`pipod-blog.astro`) with 6 new Astro components inspired by Phanatik patterns. Components are placed in `src/components/blog/`, styled with scoped SCSS using existing `--pipod-*` CSS custom properties. All data accessed via `getCollection('blog')`, filtered and sorted in frontmatter. Spanish locale for dates.

## Architecture Decisions

### Decision: Component Placement

**Choice**: New components go in `src/components/blog/`, not a subdirectory
**Alternatives considered**: Subdirectory `src/components/blog/phanatik/`
**Rationale**: Aligns with existing blog component structure; simpler imports

### Decision: Styling Approach

**Choice**: Scoped `<style>` blocks in each `.astro` component, CSS custom properties from `_tokens.css`
**Alternatives considered**: Extending `_blog-editorial.scss` partial
**Rationale**: Scoped styles prevent conflicts; each component is self-contained; `is:global` only where needed for shared patterns

### Decision: Sidebar Component as Text-Only List

**Choice**: `BlogSidebar.astro` renders `<nav><ul><li>` with title links only, no images
**Alternatives considered**: Horizontal compact with 80x80 thumbnail (BlogCard1 pattern)
**Rationale**: Sidebar space is narrow; text-only reduces visual noise; matches BlogCard5 pattern

### Decision: Briefs Section Uses BlogCardCompact Internally

**Choice**: `BriefsSection.astro` wraps 3 `BlogCardCompact` instances
**Alternatives considered**: Inline brief cards without separate component
**Rationale**: Reusable `BlogCardCompact` for other contexts (related posts, footer); separation of concerns

### Decision: TopStoriesSection Combines Overlay + List

**Choice**: Single section component with hero overlay + text list layout
**Alternatives considered**: Two separate components (TopStoriesHero, TopStoriesList)
**Rationale**: These items are semantically related (top stories); keeps layout logic in one place

### Decision: CategoriesGrid Derives Counts from Posts

**Choice**: Count posts per category at build time from `getCollection('blog')`
**Alternatives considered**: Hardcoded categories, or separate categories collection
**Rationale**: No schema changes; categories already exist on posts; counts always accurate

## Data Flow

```
pipod-blog.astro (frontmatter)
    │
    ├── getCollection('blog') ──→ allPosts[]
    │
    ├── posts (sorted, mapped) ──→ BlogHeroFeatured, BlogFilter
    │
    ├── topStories (5 posts) ──→ TopStoriesSection
    │       ├── hero (post[1]) ──→ BlogCardOverlay
    │       └── list (post[2-5]) ──→ BlogCardList × 4
    │
    ├── briefs (3 posts) ──→ BriefsSection
    │       └── BlogCardCompact × 3
    │
    ├── sidebarPosts (5 posts) ──→ BlogSidebar
    │
    └── categories (derived) ──→ CategoriesGrid
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/blog/BlogSidebar.astro` | Create | Text-only nav list, 5 posts max, Spanish dates |
| `src/components/blog/BlogCardList.astro` | Create | Text-only article card with title, category, date |
| `src/components/blog/BlogCardCompact.astro` | Create | Horizontal flex (optional image + text), compact style |
| `src/components/blog/BlogCardOverlay.astro` | Create | Image with gradient overlay + title on top |
| `src/components/blog/BriefsSection.astro` | Create | Wraps 3 BlogCardCompact with "Breves" label |
| `src/components/blog/TopStoriesSection.astro` | Create | 2-col layout: overlay hero + text list |
| `src/components/blog/CategoriesGrid.astro` | Create | Grid of category pills with post counts |
| `src/styles/_blog-phanatik.scss` | Create | Shared styles for new components |
| `src/pages/pipod-blog.astro` | Modify | Import and position new sections |

## Component Interfaces

```typescript
// BlogSidebar
interface Props {
  posts: Array<{ slug: string; title: string; category: string; publishDate: string }>;
  limit?: number; // default 5
}

// BlogCardList
interface Props {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
}

// BlogCardCompact
interface Props {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  ogImage?: string;
}

// BlogCardOverlay
interface Props {
  slug: string;
  title: string;
  category: string;
  ogImage?: string;
  publishDate: string;
}

// BriefsSection
interface Props {
  posts: Array<{ slug: string; title: string; category: string; publishDate: string; ogImage?: string }>;
}

// TopStoriesSection
interface Props {
  posts: Array<{ slug: string; title: string; category: string; ogImage?: string; publishDate: string }>;
}

// CategoriesGrid
interface Props {
  posts: Array<{ category: string }>;
}
```

## Image Handling

All components with `ogImage` use the same pattern as existing BlogCardEditorial:

```astro
{ogImage ? (
  <img src={ogImage} alt={title} loading="lazy" onerror="this.style.display='none'" />
) : (
  <div class="placeholder" style="background: var(--pipod-gradient-blue)" />
)}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Props validation, date formatting | Static build check |
| Integration | Components render in `pipod-blog.astro` | Visual review in verify phase |
| E2E | None required | Not applicable for static components |

## Migration / Rollback

No migration required — pure additive changes. Rollback via:
1. Remove imports from `pipod-blog.astro`
2. Delete new component files
3. Revert `pipod-blog.astro` via git

## Open Questions

- [ ] Does `CategoriesGrid` need links to filtered blog pages? (Not in current scope)
- [ ] Should new sections be gated behind a feature flag? (Not needed per proposal)