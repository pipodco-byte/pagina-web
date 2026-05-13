# Blog Visual Upgrade — Technical Design

**Change:** `blog-visual-upgrade`
**Phase:** Design
**Project:** Astro-Ecommerce (pipod.co)
**Date:** 2026-05-12

---

## 1. Context & Motivation

The blog section currently uses hardcoded colors, inline styles, and React-internal CSS that cannot be shared with Astro components. This creates maintenance duplication and prevents a cohesive card system as 73 SEO articles are added.

**Goals:**
- Unify blog card styling under a single CSS file consumed by both Astro and React
- Introduce editorial typography using Pipod's design tokens (`--pipod-*`)
- Build a reusable `BlogCard.astro` component for Astro-based article pages
- Add reading time calculation via `reading-time` package

**Constraints:**
- 73 SEO articles out of scope (future work)
- Editorial light theme — no dark overlays
- Existing hover behavior (lift + shadow) to be preserved

---

## 2. Architecture — Hybrid CSS Approach

### 2.1 File Structure

```
src/
├── styles/
│   └── blog-cards.css          ← NEW: shared card stylesheet
└── components/
        blog/
            ├── BlogCard.astro       ← NEW: standalone Astro card
            ├── BlogFilter.jsx       ← UPDATE: use blog-cards.css classes
            ├── BlogHeroSection.astro    ← UPDATE: editorial typography
            └── BlogCtaSection.astro    ← UPDATE: if needed
```

### 2.2 Shared Stylesheet: `blog-cards.css`

All blog cards — whether rendered by React (BlogFilter) or Astro (BlogCard.astro) — consume this single stylesheet. It defines:

- Card anatomy classes (category, title, excerpt, metadata, read-more)
- Hover states (lift + shadow transition)
- Typography via `--pipod-*` tokens
- Responsive breakpoints via Pipod spacing tokens

### 2.3 Import Strategy

`blog-cards.css` is imported once, globally. In Astro layouts, import via:

```astro
---
import '../../styles/blog-cards.css';
---
```

In React (BlogFilter.jsx), import via standard CSS import in the component file.

---

## 3. BlogCard.astro — New Component

### 3.1 Props Interface

```typescript
interface BlogCardProps {
  title: string;           // Article title
  excerpt: string;         // Short description (max 3 lines)
  category: string;        // e.g. "HISTORIA PIPOD"
  link: string;            // URL to article
  date: string;            // Publication date ISO string
  slug?: string;          // For reading time calculation
}
```

### 3.2 Card Anatomy

```
┌─────────────────────────────────────────┐
│  CATEGORY LABEL (uppercase, tracked)    │
│                                         │
│  Title (bold, 2 lines max, 1.3 leading)│
│                                         │
│  Excerpt (3 lines max, relaxed leading)│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ DATE · READING TIME        LEER ►   ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### 3.3 Implementation

```astro
---
import { readingTime } from 'reading-time';

interface Props {
  title: string;
  excerpt: string;
  category: string;
  link: string;
  date: string;
  slug?: string;
  content?: string; // Full article content for reading time
}

const { title, excerpt, category, link, date, slug, content } = Astro.props;

const formattedDate = new Date(date).toLocaleDateString('es-CO', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const readTime = content ? readingTime(content).text : null;
---

<article class="blog-card">
  <div class="blog-card__inner">
    <span class="blog-card__category">{category}</span>
    <h3 class="blog-card__title">{title}</h3>
    <p class="blog-card__excerpt">{excerpt}</p>
    <footer class="blog-card__footer">
      <div class="blog-card__meta">
        <time datetime={date}>{formattedDate}</time>
        {readTime && <span class="blog-card__separator">·</span>}
        {readTime && <span>{readTime}</span>}
      </div>
      <a href={link} class="blog-card__link">
        LEER ARTÍCULO <i class="bi bi-arrow-right-short"></i>
      </a>
    </footer>
  </div>
</article>
```

### 3.4 BlogCard CSS Classes (blog-cards.css)

```css
/* === CARD BASE === */
.blog-card {
  background-color: var(--pipod-color-white);
  border: 1px solid var(--pipod-color-border-gray);
  border-radius: var(--pipod-radius-standard);
  padding: var(--pipod-space-xl) var(--pipod-space-lg);
  height: 100%;
  transition:
    transform var(--pipod-transition-normal),
    box-shadow var(--pipod-transition-normal),
    border-color var(--pipod-transition-normal);
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-5px);
  border-color: var(--pipod-color-near-black);
  box-shadow: var(--pipod-shadow-elevated);
}

.blog-card__inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* === CATEGORY LABEL === */
.blog-card__category {
  color: var(--pipod-color-deep-blue);
  font-size: var(--pipod-size-label);
  font-weight: var(--pipod-weight-extrabold);
  letter-spacing: var(--pipod-tracking-wider);
  text-transform: uppercase;
  display: block;
  margin-bottom: var(--pipod-space-md);
}

/* === TITLE === */
.blog-card__title {
  font-family: var(--pipod-font-noto-sans);
  font-size: var(--pipod-size-h3);
  font-weight: var(--pipod-weight-bold);
  line-height: var(--pipod-leading-snug);
  color: var(--pipod-color-black);
  margin: 0 0 var(--pipod-space-sm) 0;

  /* Line clamp: 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* === EXCERPT === */
.blog-card__excerpt {
  font-family: var(--pipod-font-noto-sans);
  font-size: var(--pipod-size-body);
  font-weight: var(--pipod-weight-regular);
  line-height: var(--pipod-leading-relaxed);
  color: var(--pipod-color-near-black);
  margin: 0 0 var(--pipod-space-lg) 0;
  flex-grow: 1;

  /* Line clamp: 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* === FOOTER === */
.blog-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: var(--pipod-space-md);
  border-top: 1px solid var(--pipod-color-border-gray);
  gap: var(--pipod-space-md);
}

.blog-card__meta {
  font-size: var(--pipod-size-small);
  color: var(--pipod-color-disabled);
  display: flex;
  align-items: center;
  gap: var(--pipod-space-xs);
}

.blog-card__separator {
  color: var(--pipod-color-disabled);
}

.blog-card__link {
  color: var(--pipod-color-black);
  text-decoration: none;
  font-size: var(--pipod-size-micro);
  font-weight: var(--pipod-weight-extrabold);
  letter-spacing: var(--pipod-tracking-wide);
  display: inline-flex;
  align-items: center;
  gap: var(--pipod-space-2xs);
  transition: gap var(--pipod-transition-normal);
  white-space: nowrap;
}

.blog-card__link:hover {
  gap: var(--pipod-space-sm);
  color: var(--pipod-color-black);
}

.blog-card__link i {
  font-size: var(--pipod-size-h3);
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .blog-card {
    padding: var(--pipod-space-lg) var(--pipod-space-md);
  }

  .blog-card__title {
    font-size: var(--pipod-size-ui-medium);
  }

  .blog-card__excerpt {
    font-size: var(--pipod-size-small);
    -webkit-line-clamp: 3;
  }

  .blog-card__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--pipod-space-sm);
  }

  .blog-card__link {
    align-self: flex-end;
  }
}
```

---

## 4. BlogFilter.jsx — Update Plan

### 4.1 Remove Inline `<style>`

Extract the `dangerouslySetInnerHTML` styles block and replace with:

```jsx
import React, { useState, useMemo } from 'react';
import '../../styles/blog-cards.css';  // NEW import

export default function BlogFilter() {
  // ... existing code ...

  return (
    <section className="blog-filter-section">
      <div className="container">
        {/* filter-container unchanged */}
        {/* ... */}

        {/* Grid — use blog-card class instead of blog-card-white */}
        {filteredPosts.map(post => (
          <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <a href={post.link} className="blog-card">
              <div className="blog-card__inner">
                <span className="blog-card__category">{post.category}</span>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <footer className="blog-card__footer">
                  <div className="blog-card__meta">
                    <span>{post.date}</span>
                    {post.readingTime && (
                      <>
                        <span className="blog-card__separator">·</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                  </div>
                  <span className="blog-card__link">
                    LEER ARTÍCULO <i className="bi bi-arrow-right-short"></i>
                  </span>
                </footer>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### 4.2 BlogFilter Filter Styles (separate)

The filter/search styles (`blog-filter-section`, `search-box`, `filter-btn`, etc.) are **not** part of the shared blog-card system. Keep them as inline `<style>` in BlogFilter.jsx or extract to `blog-filters.css` if they grow.

### 4.3 Post Data Shape (to match BlogCard.astro)

```typescript
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  link: string;
  date: string;        // e.g. "2026-03-15"
  readingTime?: string; // e.g. "5 min de lectura"
}
```

---

## 5. BlogHeroSection.astro — Editorial Typography Update

### 5.1 Replace Inline Styles with Token-Based CSS

```astro
---
---
<section class="blog-hero">
  <div class="container">
    <div class="blog-hero__content">
      <h1 class="blog-hero__title">Blog Pipod</h1>
      <p class="blog-hero__subtitle">
        Artículos, tips y guías sobre reparación, mantenimiento y optimización de equipos Apple
      </p>

      <div class="blog-hero__search">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar artículos..."
            class="search-input"
            onkeyup="filterBlogPosts(this.value)"
          />
        </div>
        <button
          class="search-btn"
          onclick="filterBlogPosts(document.getElementById('searchInput').value)"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .blog-hero {
    background: linear-gradient(
      135deg,
      var(--pipod-color-light-surface) 0%,
      var(--pipod-color-white) 100%
    );
    padding: var(--pipod-space-3xl) 0;
    margin-top: var(--pipod-space-xl);
  }

  .blog-hero__content {
    text-align: center;
  }

  .blog-hero__title {
    font-family: var(--pipod-font-noto-sans);
    font-size: var(--pipod-size-h1);
    font-weight: var(--pipod-weight-black);
    color: var(--pipod-color-black);
    letter-spacing: var(--pipod-tracking-tight);
    text-transform: uppercase;
    margin: 0;
  }

  .blog-hero__subtitle {
    font-family: var(--pipod-font-noto-sans);
    font-size: var(--pipod-size-h2);
    font-weight: var(--pipod-weight-regular);
    color: var(--pipod-color-near-black);
    margin-top: var(--pipod-space-md);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .blog-hero__search {
    margin-top: var(--pipod-space-xl);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    gap: var(--pipod-space-sm);
  }

  .search-box {
    position: relative;
    flex: 1;
  }

  .search-box i {
    position: absolute;
    left: var(--pipod-space-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--pipod-color-disabled);
    font-size: var(--pipod-size-ui-medium);
  }

  .search-input {
    width: 100%;
    padding: var(--pipod-space-md) var(--pipod-space-md) var(--pipod-space-md)
      calc(var(--pipod-space-md) * 2 + 18px);
    border: 2px solid var(--pipod-color-border-gray);
    border-radius: var(--pipod-radius-pill);
    font-size: var(--pipod-size-ui-medium);
    font-family: var(--pipod-font-noto-sans);
    transition:
      border-color var(--pipod-transition-fast),
      box-shadow var(--pipod-transition-fast);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--pipod-color-deep-blue);
    box-shadow: 0 0 0 3px rgba(58, 80, 107, 0.1);
  }

  .search-btn {
    padding: var(--pipod-space-md) var(--pipod-space-lg);
    background: var(--pipod-color-black);
    color: var(--pipod-color-white);
    border: none;
    border-radius: var(--pipod-radius-pill);
    font-weight: var(--pipod-weight-semibold);
    cursor: pointer;
    transition:
      background var(--pipod-transition-fast),
      transform var(--pipod-transition-fast);
  }

  .search-btn:hover {
    background: var(--pipod-color-near-black);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .blog-hero {
      padding: var(--pipod-space-2xl) 0;
    }

    .blog-hero__title {
      font-size: var(--pipod-size-h2);
    }

    .blog-hero__subtitle {
      font-size: var(--pipod-size-ui-medium);
    }

    .blog-hero__search {
      flex-direction: column;
      gap: var(--pipod-space-sm);
    }

    .search-btn {
      width: 100%;
    }
  }
</style>
```

---

## 6. BlogCtaSection.astro — Minimal Update

The CTA section uses inline styles that reference brand colors already available as Pipod tokens. Update for consistency:

```astro
---
---
<section class="blog-cta">
  <div class="container">
    <h2 class="blog-cta__title">¿Tienes una pregunta?</h2>
    <p class="blog-cta__subtitle">
      Contáctanos y nuestros expertos te ayudarán
    </p>
    <a
      href="https://wa.me/573124813094"
      target="_blank"
      class="blog-cta__btn"
    >
      Contactar por WhatsApp
    </a>
  </div>
</section>

<style>
  .blog-cta {
    background: var(--pipod-color-black);
    color: var(--pipod-color-white);
    padding: var(--pipod-space-3xl) 0;
    text-align: center;
  }

  .blog-cta__title {
    font-family: var(--pipod-font-noto-sans);
    font-size: var(--pipod-size-h2);
    font-weight: var(--pipod-weight-bold);
    color: var(--pipod-color-white);
    margin: 0 0 var(--pipod-space-md) 0;
  }

  .blog-cta__subtitle {
    font-family: var(--pipod-font-noto-sans);
    font-size: var(--pipod-size-ui-medium);
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 var(--pipod-space-xl) 0;
  }

  .blog-cta__btn {
    background: var(--pipod-color-white);
    color: var(--pipod-color-black);
    padding: var(--pipod-space-md) var(--pipod-space-xl);
    border-radius: var(--pipod-radius-pill);
    text-decoration: none;
    font-family: var(--pipod-font-noto-sans);
    font-size: var(--pipod-size-body);
    font-weight: var(--pipod-weight-semibold);
    display: inline-block;
    transition:
      transform var(--pipod-transition-fast),
      box-shadow var(--pipod-transition-fast);
  }

  .blog-cta__btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--pipod-shadow-elevated);
  }

  @media (max-width: 768px) {
    .blog-cta {
      padding: var(--pipod-space-2xl) 0;
    }

    .blog-cta__title {
      font-size: var(--pipod-size-h3);
    }

    .blog-cta__btn {
      width: 100%;
      padding: var(--pipod-space-md) var(--pipod-space-lg);
    }
  }
</style>
```

---

## 7. Package Installation

```bash
npm install reading-time
```

**Usage in Astro:**

```astro
---
import { readingTime } from 'reading-time';

const content = Astro.props.content || '';
const readTime = readingTime(content);
---
<span>{readTime.text}</span>  <!-- "5 min de lectura" -->
```

---

## 8. Token Mapping Summary

| Purpose | Hardcoded Value | Pipod Token |
|---------|----------------|-------------|
| Card background | `#FFFFFF` | `var(--pipod-color-white)` |
| Card border | `#E0E0E0` | `var(--pipod-color-border-gray)` |
| Card radius | `24px` | `var(--pipod-radius-standard)` |
| Card padding | `45px 35px` | `var(--pipod-space-xl) var(--pipod-space-lg)` |
| Card hover border | `#000000` | `var(--pipod-color-near-black)` |
| Card hover shadow | `0 15px 40px rgba(0,0,0,0.05)` | `var(--pipod-shadow-elevated)` |
| Category color | `#3A506B` | `var(--pipod-color-deep-blue)` |
| Category size | `10px` | `var(--pipod-size-label)` |
| Category weight | `800` | `var(--pipod-weight-extrabold)` |
| Title size | `22px` | `var(--pipod-size-h3)` |
| Title weight | `700` | `var(--pipod-weight-bold)` |
| Excerpt color | `#4C4C4C` | `var(--pipod-color-near-black)` |
| Link weight | `800` | `var(--pipod-weight-extrabold)` |
| Hero bg gradient | `linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 100%)` | Uses `var(--pipod-color-light-surface)` |
| CTA bg | `#000000` | `var(--pipod-color-black)` |

---

## 9. Migration Checklist

- [ ] `npm install reading-time`
- [ ] Create `src/styles/blog-cards.css`
- [ ] Create `src/components/blog/BlogCard.astro`
- [ ] Update `BlogFilter.jsx` to import `blog-cards.css` and use CSS classes
- [ ] Update `BlogHeroSection.astro` to use token-based CSS classes
- [ ] Update `BlogCtaSection.astro` to use token-based CSS classes
- [ ] Verify hover states match existing behavior
- [ ] Test responsive layout at 768px breakpoint

---

## 10. Open Questions / Risks

| Item | Risk | Mitigation |
|------|------|------------|
| `reading-time` on React side | BlogFilter is client-side; content may not be available | Calculate reading time at build time for static data; skip for dynamic |
| 73 SEO articles loading | Future scope | BlogCard.astro designed to accept pre-calculated `readingTime` prop |
| Existing hardcoded hover values | Subtle visual change | Use existing values from `_tokens.css` that match current behavior |
| BlogFilter uses Bootstrap grid | `.col-*` classes are Bootstrap-specific | These remain; only card styles are unified |

---

## 11. Dependencies

| Phase | Artifact | Status |
|-------|----------|--------|
| Proposal | `sdd/blog-visual-upgrade/proposal` | ✓ Existing |
| Spec | `openspec/changes/blog-visual-upgrade/spec.md` | Pending spec phase |
| Design | `openspec/changes/blog-visual-upgrade/design.md` | ← This document |
| Tasks | `openspec/changes/blog-visual-upgrade/tasks.md` | Pending tasks phase |
| Apply | — | Pending |
| Verify | — | Pending |

---

## 12. Related Decisions

- **ADR-001**: CSS token integration strategy — components import `_tokens.css` once at layout level
- **ADR-002**: Hybrid Astro/React styling — shared CSS files, component-scoped `<style>` for page-specific rules
- **ADR-003**: reading-time usage — calculate at build time; Astro components only; React passes pre-calculated value