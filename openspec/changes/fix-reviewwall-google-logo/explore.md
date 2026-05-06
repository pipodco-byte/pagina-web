# SDD Explore: Google Logo Appears Huge in ReviewWall

## Topic
Investigate why the Google logo appears "enormous" in the ReviewWall component (pipodGoogleReviews.jsx) on pages like /servicio-tecnico-apple and /home in develop branch, while it looks correct in main.

## Exploration Date
2026-05-05

## Project
Astro-Ecommerce (pipod.co)

---

## 1. Current State

### Branch Analysis

**main branch:**
- No `src/styles/global.css` file
- Layout.astro does NOT import global.css
- No Tailwind v4 loaded
- Google logo renders at correct size (height=16px)

**develop branch:**
- `src/styles/global.css` exists with `@import "tailwindcss"`
- Layout.astro imports `../styles/global.css`
- Added font-smoothing rules: `html * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`
- Added navbar box-shadow: `box-shadow: 0 4px 6px rgba(0,0,0,0.1);`

### Google Logo Location

File: `src/components/promo/pipodGoogleReviews.jsx` line 95

```jsx
<img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
     height="16" alt="Google" className="align-middle mb-1"/>
```

The SVG itself has explicit dimensions: `viewBox="0 0 272 92" width="272" height="92"`

### Key Difference

The develop branch adds:
1. Tailwind v4 via `@import "tailwindcss"` in global.css
2. Font-smoothing: `html * { -webkit-font-smoothing: antialiased; ... }`
3. Navbar box-shadow

---

## 2. Affected Areas

| File | Change | Impact |
|------|--------|--------|
| `src/layouts/Layout.astro` | +1 import (global.css), +2 CSS rules (html *, navbar shadow) | Global impact |
| `src/styles/global.css` | NEW - @import "tailwindcss" | Tailwind v4 applied globally |
| `src/styles/_pipod-utilities.css` | Typography scale added | Minor visual changes |
| `astro.config.mjs` | Added @tailwindcss/vite plugin | Build pipeline change |
| `package.json` | Added tailwindcss@4.2.4 and @tailwindcss/vite | Runtime dependency |

### Components Using ReviewWall
- `/servicio-tecnico-apple.astro`
- `/index.astro` (home page)

---

## 3. Approaches

### Option A: Remove global.css import (Revert to main)
**Description**: Remove the import of global.css from Layout.astro to match main branch behavior

**Pros**:
- Simple revert
- Matches known-good main behavior

**Cons**:
- Loses Tailwind v4 design tokens
- Loses font-smoothing improvements
- May break other components relying on new styles

**Risk**: Medium - could break other things

---

### Option B: Targeted CSS fix (RECOMMENDED)
**Description**: Add targeted CSS to fix the Google logo specifically

In Layout.astro's `<style is:global>`:
```css
.google-header-bar img[alt="Google"] {
  height: 16px !important;
  width: auto !important;
}
```

**Pros**:
- Surgical fix - only affects Google logo
- Preserves Tailwind v4 integration
- Low risk implementation
- Maintains consistency with develop branch improvements

**Cons**:
- CSS specificity may need adjustment
- Could interfere with explicit width/height on the img tag

**Risk**: Low

---

### Option C: Remove html * font-smoothing selector
**Description**: The `html * { -webkit-font-smoothing... }` may be causing cascading issues with SVG rendering

**Pros**:
- Addresses potential root cause

**Cons**:
- Loses font-smoothing improvements
- May not be the actual issue

**Risk**: Low

---

### Option D: Use CSS max-width on img globally
**Description**: Add to global.css:
```css
img {
  max-width: 100%;
  height: auto;
}
```

**Pros**:
- Mimics Tailwind v3 default behavior
- Global img consistency

**Cons**:
- Could affect other images unexpectedly
- May not fix SVG rendering issue

**Risk**: Medium - broad change

---

## 4. Recommendation

**Option B - Targeted CSS fix** is recommended because:

1. Tailwind v4 integration provides ongoing value (design tokens, utility classes)
2. The fix is surgical and won't affect other elements
3. Low implementation risk
4. Maintains consistency with develop branch improvements (navbar shadow, font smoothing)

---

## 5. Risks

| Fix Option | Risk Level | Description |
|------------|------------|-------------|
| A (Remove global.css) | Medium | May break other components |
| B (Targeted CSS) | Low | Surgical, safe |
| C (Remove html *) | Low | Loses font smoothing |
| D (Global img CSS) | Medium | Broad change |

---

## 6. Next Steps

1. **READY FOR PROPOSAL**: Create `proposal.md` documenting the issue and recommended fix
2. Proceed to `sdd-propose` phase with Option B recommendation
3. If proposal accepted, proceed to `sdd-spec` for implementation details

---

## Verification

To verify the issue and fix:
1. Run `npm run dev` in Astro-Ecommerce
2. Navigate to `/servicio-tecnico-apple` or `/`
3. Inspect the Google logo `<img>` element
4. Verify it renders at ~16px height in the header bar
5. After applying Option B fix, verify no regression in other elements

