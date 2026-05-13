# Phanatik Blog Reference — Feature Documentation

Project: "copia de web2" (Phanatik Sanity Astro)
Reference path: `/private/tmp/phanatik-sanity-astro/`

---

## 1. Related Posts (Posts Relacionados)

### Location & Structure
- **File**: `apps/web/src/layouts/BlogLayout.astro`
- **Placement**: BOTTOM of article page (after content)
- **Layout**: Full-width section with `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (4-column grid on large screens)
- **Max posts shown**: `slice(0, 3)` — 3 posts max
- **Logic**: Filters all posts by matching tags with current post's tags

### Component Used
- **`BlogCard3.astro`** — `/apps/web/src/components/blog/BlogCard3.astro`
- Card displays: image (12/8 aspect), tags, date, reading time, title
- Image: rounded-xl, eager loading
- Title: `font-display`, hover underline effect
- Tags: uppercase, `text-blue-500`

### Visual Structure
```
┌─────────────────────────────────────────────┐
│ Related posts                               │
│ [BlogCard3] [BlogCard3] [BlogCard3]         │
│   (3 max)                                   │
└─────────────────────────────────────────────┘
```

### Related Posts Code (BlogLayout.astro lines 205-223)
```astro
{
  relatedPosts.length > 0 && (
    <section>
      <Wrapper variant="standard" class="py-8">
        <Text tag="h2" variant="textSM" class="text-base-900 uppercase font-medium">
          Related posts
        </Text>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ...">
          {relatedPosts.slice(0, 3).map((post) => (
            <BlogCard3 post={post} />
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
```

---

## 2. Table of Contents (TOC)

**Status**: NOT IMPLEMENTED in Phanatik

- No `TableOfContents` component found
- No TOC generation in `portableText.ts`
- No sticky TOC in sidebar
- The BlogLayout uses `BlogAside` for sidebar (featured posts), NOT TOC

### Portable Text Headings
From `portableText.ts`, headings h2/h3/h4 are rendered but NOT extracted for TOC:
```typescript
block: {
  h1: ({ children }) => `<h1>${children}</h1>`,
  h2: ({ children }) => `<h2>${children}</h2>`,
  h3: ({ children }) => `<h3>${children}</h3>`,
  h4: ({ children }) => `<h4>${children}</h4>`,
  ...
}
```

---

## 3. Share Buttons / Social Sharing

### Component
- **File**: `apps/web/src/components/fundations/elements/ShareButtons.astro`
- **Position**: LEFT of content (vertical stack on lg screens, horizontal on mobile)
- **Styling**: `flex flex-row lg:flex-col gap-2 mb-4 lg:sticky lg:top-10 lg:z-50`
- **Layout**: Sticky positioned on left sidebar at `top-10`

### Networks Included
| Network | Icon | Button Class |
|---------|------|--------------|
| Twitter/X | `<Twitter />` | `bg-base-100 hover:bg-base-50 size-8` |
| Facebook | `<Facebook />` | same |
| LinkedIn | `<Linkedin />` | same |
| Copy Link | `<Link />` | same |

### Button Styling
```css
rounded-lg bg-base-100 p-1 text-base-600 shadow-xs 
hover:bg-base-50 
focus-visible:outline-2 focus-visible:outline-offset-2 
focus:outline-base-400 cursor-pointer 
focus:outline-2 focus:outline-inset 
size-8 justify-center text-center items-center
```

### JavaScript Behavior
- Twitter: Opens `https://twitter.com/intent/tweet?text=...&url=...`
- Facebook: Opens `https://www.facebook.com/sharer/sharer.php?u=...`
- LinkedIn: Opens `https://www.linkedin.com/sharing/share-offsite/?url=...`
- Copy Link: Uses `navigator.clipboard.writeText()`, shows "Link Copied!" for 2s then reverts

### Visual Structure
```
┌─────┐
│  X  │  (sticky left sidebar)
│  fb │
│  in │
│  🔗 │
└─────┘
```

---

## 4. Newsletter Section

### Component
- **File**: `apps/web/src/components/cta/Subscribe.astro`
- **Placement**: NOT in article page directly — referenced as standalone component
- Found used in: Footer (`Footer.astro`) and membership/advertise pages

### Design Details

#### Structure
```astro
<div class="flex flex-col bg-base-100 p-8 mt-12 rounded-xl">
  <!-- Heading -->
  <Text tag="h1" variant="displaySM" class="text-base-900 text-balance font-display">
    Subscribe to our newsletter...
  </Text>
  
  <!-- Form -->
  <form class="mt-4 flex gap-2 flex-col xl:flex-row xl:items-end">
    <!-- Email field -->
    <div class="flex flex-col w-full">
      <label for="email" class="text-xs text-base-600">Email address</label>
      <input type="email" ... class="block w-full h-9 px-4 py-2 ..." />
    </div>
    <!-- Submit button -->
    <Button size="xs" variant="accent" type="submit">Subscribe</Button>
  </form>
  
  <!-- Disclaimer -->
  <Text tag="p" variant="textXS" class="mt-1 text-base-600">
    We won't spam you on weekdays, only on weekends.
  </Text>
</div>
```

#### Input Styling
```css
block w-full h-9 px-4 py-2 text-sm text-accent-700 
border border-transparent rounded-lg appearance-none 
duration-300 bg-white placeholder-base-400 
focus:bg-transparent focus:outline-none 
focus:ring-accent-500 focus:ring-offset-2 focus:ring-2 focus:ring-offset-base-200
```

#### Button Variant
- `variant="accent"` — uses accent color (brand-specific)
- `size="xs"`

### NOT in Article Pages
Newsletter Subscribe component is NOT embedded in `BlogLayout.astro`. It's a standalone component that can be added to any page. Article pages rely on the sticky sidebar (`BlogAside` + `AdvertAside`) instead.

---

## 5. Article Page Layout (Full Structure)

### File: `apps/web/src/layouts/BlogLayout.astro`

### Grid Structure
- Uses `grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0`
- **3 columns** (main content) + **1 column** (sidebar)
- Sidebar has `lg:pl-8` with vertical divider line (`before:h-6 before:w-px`)

### Section Breakdown

#### A. Tags Bar (Top)
```astro
<div class="flex gap-2">
  {frontmatter.tags.map((tag) => (
    <Text tag="a" variant="textXS" class="text-blue-500 uppercase font-medium" href={`/blog/tags/${tag}`}>
      {tag}
    </Text>
  ))}
</div>
```
- Horizontal list of tag links
- Blue (`text-blue-500`), uppercase, medium weight

#### B. Title Block (with decorative lines)
```astro
<div class="mt-2 relative before:absolute after:absolute 
            before:bg-base-950 after:bg-base-950/10 
            before:top-0 before:left-0 before:h-px before:w-6 
            after:top-0 after:right-0 after:left-8 after:h-px pt-4">
  <Text tag="h1" variant="displaySM" class="text-base-900 font-medium font-display text-balance">
    {frontmatter.title}
  </Text>
</div>
```
- Decorative accent lines before/after title
- `font-display` for headings
- `text-balance` for better text wrapping

#### C. Author Block
```astro
<a href={`/authors/${author.slug}`} class="flex items-center gap-3 hover:opacity-80 transition">
  {author?.data?.image?.url && (
    <Image width={800} height={800} src={author.data.image.url} 
           class="inline-block size-10 object-cover rounded-lg" />
  )}
  <Text tag="p" variant="textXS" class="text-base-600">
    Written in <time>{date}</time> by <span class="italic font-medium">{author.data.name}</span>
    <span class="block">{author.data.role} · {readingTime}</span>
  </Text>
</a>
```
- Author avatar (40x40, rounded-lg)
- Inline meta: "Written in [date] by [author name]"
- Second line: role · reading time

#### D. Featured Image
```astro
<Image width={1000} height={800} src={frontmatter.image.url} 
       alt={frontmatter.image.alt} 
       class="w-full aspect-12/6 object-cover col-span-full rounded-xl" />
```
- Aspect ratio: 12/6 (2:1)
- Full width, rounded corners

#### E. Content + Share Layout
```astro
<div class="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-4">
  <!-- Share buttons (LEFT) -->
  <div>
    <ShareButtons contentType="blog" description={frontmatter.description} />
  </div>
  
  <!-- Article content (RIGHT) -->
  <div class="lg:col-span-3">
    <Text tag="h3" variant="textSM" class="text-base-600">
      {frontmatter.description}
    </Text>
    
    <!-- Locked content or prose wrapper -->
    {frontmatter.isLocked ? (
      <div class="mt-10">
        <div class="bg-base-50 p-8 rounded-xl text-center py-20">
          <!-- Paywall message + CTA buttons -->
        </div>
      </div>
    ) : (
      <Wrapper variant="prose" class="relative before:absolute ...">
        <slot />
      </Wrapper>
    )}
  </div>
</div>
```

#### F. Sidebar (RIGHT)
```astro
<div class="lg:pl-8 lg:relative lg:before:absolute lg:after:absolute 
            lg:before:bg-base-950 lg:after:bg-base-950/10 
            lg:before:top-0 lg:before:left-0 lg:before:h-6 lg:before:w-px 
            lg:after:top-8 lg:after:bottom-0 lg:after:left-0 after:w-px">
  <div class="lg:sticky lg:top-10 lg:z-40">
    <BlogAside />
    <AdvertAside />
  </div>
</div>
```
- Sticky positioning (`top-10`)
- Contains: `BlogAside` (featured posts) + `AdvertAside` (advertising)
- Vertical divider line on left edge

#### G. Related Posts (BOTTOM)
- 4-column grid (shows up to 3)
- Uses `BlogCard3` component
- Appears only if `relatedPosts.length > 0`

---

### Layout Diagram

```
┌────────────────────────────────────────────────────────────────┐
│ [Tag1] [Tag2] [Tag3]                                           │
│                                                                │
│ ════════════════════════════════════════════                   │  (decorative line)
│ ARTICLE TITLE                                                   │
│                                                                │
│ ┌────┐  Written in Jan 15, 2025 by Author Name                  │
│ │ AV │  Role · 5 min read                                      │
│ └────┘                                                         │
│                                                                │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │                     HERO IMAGE (12/6)                      │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌───┐ ┌────────────────────────────────────────────────────┐   │
│ │   │ │ Description (lead paragraph)                        │   │
│ │ S │ │                                                     │   │
│ │ H │ │ ═══════════════════════════════════════════════    │   │
│ │ A │ │                                                     │   │
│ │ R │ │ ARTICLE CONTENT (prose)                            │   │
│ │ E │ │                                                     │   │
│ │   │ │ H2 Heading                                          │   │
│ │ B │ │ Paragraph...                                        │   │
│ │ T │ │                                                     │   │
│ │ N │ │ H3 Heading                                          │   │
│ │ S │ │ Paragraph...                                        │   │
│ │   │ │                                                     │   │
│ └───┘ └────────────────────────────────────────────────────┘   │
│                                                                │
│         ┌──────────────────┐  ┌──────────────────────┐          │
│         │ BlogAside        │  │ AdvertAside          │          │
│         │ (Featured posts)  │  │ (Ads)                 │          │
│         │ sticky top-10    │  │                       │          │
│         └──────────────────┘  └──────────────────────┘          │
│                                                                │
│ Related posts                                                  │
│ ════════════════════════════════════════════                   │
│ ┌────────┐ ┌────────┐ ┌────────┐                              │
│ │Card3   │ │Card3   │ │Card3   │                              │
│ └────────┘ └────────┘ └────────┘                              │
└────────────────────────────────────────────────────────────────┘
```

---

### Key Styling Patterns

1. **Color System**: Uses `base-*` ( neutrals) and `accent-*` (brand) from Tailwind
2. **Font Display**: `font-display` class for headings (likely serif or display font)
3. **Decorative Lines**: `before:absolute before:bg-base-950 before:h-px before:w-6` pattern for accent lines
4. **Sticky Sidebar**: `lg:sticky lg:top-10 lg:z-40`
5. **Prose Wrapper**: `Wrapper variant="prose"` applies article typography styles
6. **Image Aspect Ratios**: `aspect-12/6` for hero, `aspect-12/8` for cards
7. **Rounded Corners**: `rounded-xl` for cards, `rounded-lg` for buttons/inputs

---

### Key Files Summary

| Purpose | File Path |
|---------|-----------|
| Article Layout | `/apps/web/src/layouts/BlogLayout.astro` |
| Article Page | `/apps/web/src/pages/blog/posts/[...slug].astro` |
| Share Buttons | `/apps/web/src/components/fundations/elements/ShareButtons.astro` |
| Related Card | `/apps/web/src/components/blog/BlogCard3.astro` |
| Sidebar | `/apps/web/src/components/blog/BlogAside.astro` |
| Newsletter | `/apps/web/src/components/cta/Subscribe.astro` |
| Text Element | `/apps/web/src/components/fundations/elements/Text.astro` |
| Button Element | `/apps/web/src/components/fundations/elements/Button.astro` |
| Wrapper Container | `/apps/web/src/components/fundations/containers/Wrapper.astro` |
| Portable Text Renderer | `/apps/web/src/lib/sanity/portableText.ts` |

---

## Observations for Pipod Implementation

1. **Related Posts**: Well-implemented, filter by tags. Use `BlogCard3` pattern.
2. **No TOC**: Phanatik doesn't have a TOC component — this is an opportunity for Pipod.
3. **Share Buttons**: Sticky left sidebar pattern works well. Mobile shows horizontal.
4. **No Article Newsletter**: Subscribe component exists but not embedded in articles.
5. **Paywall Support**: Has locked content pattern with blur/overlay.
6. **Sidebar**: Contains featured posts + ads, not TOC. `BlogAside` shows `BlogCard5` items.