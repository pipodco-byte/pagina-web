# Proposal: separar-contenido-layout

## Intent

Separate content from presentation in the Astro-Ecommerce blog by implementing Option B architecture. This change establishes a clean separation of concerns where markdown content exists independently from visual layout components, enabling future design updates without touching content files.

**Key Benefits:**
- Content authors can focus on writing without worrying about styling
- Designers can update layouts without modifying content
- Reusable layouts across multiple content types
- Better maintainability and scalability

---

## Scope

### In Scope

**Content Migration:**
- Move 73 markdown articles from `openspec/changes/50-articulos-seo/` to `src/content/blog/`
  - 17 articles from `articulos-fase-1/`
  - 20 articles from `articulos-fase-2/`
  - 15 articles from `articulos-fase-3/`
  - 15 articles from `articulos-fase-4/`
  - 6 articles from `articulos-reciclados/`
- Standardize frontmatter across all articles
- Configure Astro Content Collections in `src/content/config.ts`

**Layout Creation:**
- Create `src/layouts/BlogPostLayout.astro` for individual blog posts
- Create `src/layouts/BlogIndexLayout.astro` for blog listing pages
- Implement responsive design with existing project styling

**Integration:**
- Update page routes to use Content Collections API
- Ensure all 73 articles render correctly with new layouts

### Out of Scope

- Visual redesign (keeping existing styling)
- Content editing or rewriting
- URL structure changes (maintain existing paths if possible)
- Adding new content beyond migration

---

## Approach

### Architecture: Option B - Astro Content Collections

**Content Layer:** `src/content/blog/`
- All 73 markdown files organized by topic/category
- Standardized frontmatter schema (title, description, pubDate, author, tags, category)
- Content validated by Astro's type-safe collections

**Presentation Layer:** `src/layouts/`
- `BlogPostLayout.astro`: Handles single post rendering
  - Header with title, date, author
  - Content body slot
  - Navigation (prev/next posts)
  - Related posts section
- `BlogIndexLayout.astro`: Handles listing pages
  - Grid/list view of posts
  - Filtering by category/tag
  - Pagination

**Data Flow:**
```
Markdown (.md) → Content Collection → getCollection() → Layout → HTML
```

### Implementation Strategy

1. **Setup Phase**
   - Define content schema in `src/content/config.ts`
   - Create directory structure `src/content/blog/`

2. **Migration Phase**
   - Copy all 73 articles preserving frontmatter
   - Validate and standardize frontmatter fields
   - Maintain SEO metadata (title, description, canonical URLs)

3. **Layout Phase**
   - Build `BlogPostLayout.astro` with TypeScript props
   - Build `BlogIndexLayout.astro` with filtering capabilities
   - Apply existing CSS/styling patterns

4. **Integration Phase**
   - Update `src/pages/blog/[...slug].astro` to use collections
   - Update `src/pages/blog/index.astro` for listing
   - Test all articles render correctly

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Breaking existing URLs** | High | Medium | Map old paths to new slug format; implement redirects if needed |
| **SEO ranking loss** | High | Low | Preserve all meta tags, canonical URLs, structured data; maintain content exactly |
| **Frontmatter inconsistencies** | Medium | High | Create validation script; standardize fields during migration |
| **Layout rendering issues** | Medium | Medium | Test sample articles from each phase before full migration |
| **Build performance** | Low | Low | Astro Content Collections are optimized; monitor build times |

### Success Criteria

1. All 73 articles render without errors
2. Existing URLs remain accessible (no 404s)
3. SEO metadata preserved (title, description, OG tags)
4. Build completes successfully with no warnings
5. Visual appearance matches or improves upon current state

---

## References

- **Project:** Astro-Ecommerce
- **Current Content Location:** `openspec/changes/50-articulos-seo/`
- **Target Content Location:** `src/content/blog/`
- **Framework:** Astro with TypeScript
- **Author Attribution:** All articles by "kimi"

---

*Proposal created for change: separar-contenido-layout*
