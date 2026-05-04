# Tasks: Legacy CSS Cleanup

## Overview
24 tasks across 6 phases. Goal: Remove `assets/scss/astro-ecommerce.scss` dependency without visual changes.

---

## Phase 1: Create Replacement CSS

### 1.1 Add New Tokens to _tokens.css
- [ ] Add `--pipod-gradient-dark: linear-gradient(310deg, #141727 0%, #3a416f 100%);`
- [ ] Add `--pipod-gradient-secondary: linear-gradient(310deg, #627594 0%, #a8b8d8 100%);`
- [ ] Add `--pipod-gradient-text: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);`
- [ ] Add `--pipod-gradient-blue: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);`

### 1.2 Create _pipod-utilities.css
- [ ] Create `src/styles/_pipod-utilities.css`
- [ ] Add shadow utilities (.shadow-sm, .shadow-md, .shadow-lg, .shadow-none)
- [ ] Add gradient classes (.bg-gradient-dark, .bg-gradient-secondary, .bg-gradient-blue)
- [ ] Add text gradient (.text-gradient)
- [ ] Add z-index utility (.z-index-10)
- [ ] Add button system (.btn, .btn-dark, .btn-white, .btn-lg, .btn-round)
- [ ] Add pagination override

**Verification:** File created at `src/styles/_pipod-utilities.css` with ~80 lines

---

## Phase 2: Integrate into Layout

### 2.1 Import in Layout.astro
- [ ] Add `import '../styles/_pipod-utilities.css';` to Layout.astro
- [ ] Run `npm run dev`
- [ ] Verify page loads without errors

**Verification:** Home page loads correctly with new CSS applied

---

## Phase 3: Test Low-Risk Pages

### 3.1 terminos-condiciones-pipod.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/terminos-condiciones-pipod
- [ ] Verify: NO visual changes
- [ ] If OK: commit change

### 3.2 shopping-cart.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/shopping-cart
- [ ] Verify: NO visual changes
- [ ] If OK: commit change

### 3.3 pipod-blog.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/pipod-blog
- [ ] Verify: NO visual changes
- [ ] If OK: commit change

---

## Phase 4: Test Medium-Risk Pages

### 4.1 tienda-pipod.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/tienda-pipod
- [ ] Verify: NO visual changes (check grid, cards, filters)
- [ ] If OK: commit change

### 4.2 servicio-tecnico-apple.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/servicio-tecnico-apple
- [ ] Verify: NO visual changes (check gradients, buttons, shadows)
- [ ] If OK: commit change

---

## Phase 5: Test High-Risk Pages

### 5.1 contacto-pipod.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/contacto-pipod
- [ ] Verify: NO visual changes (check navbar gradients, form styles)
- [ ] If OK: commit change

### 5.2 producto/[slug].astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/producto/iphone-15-pro
- [ ] Verify: NO visual changes (check product cards, buttons)
- [ ] If OK: commit change

### 5.3 index.astro
- [ ] Comment out: `// import '../../assets/scss/astro-ecommerce.scss';`
- [ ] Visit page: http://localhost:4321/
- [ ] Verify: NO visual changes (check hero, bento carousel, all sections)
- [ ] If OK: commit change

---

## Phase 6: Cleanup

### 6.1 Verify All Imports Removed
- [ ] Run grep to confirm 0 remaining imports of `astro-ecommerce.scss`

### 6.2 Delete Dead Files
- [ ] Delete `assets/scss/astro-ecommerce.scss`
- [ ] Delete `assets/scss/astro-ecommerce/` (entire directory)
- [ ] Delete `assets/js/astro-ecommerce.js`
- [ ] Update or delete `LICENSE.MD` (replace with MIT PIPOD)

### 6.3 Final Verification
- [ ] Run `npm run build`
- [ ] Verify build completes without errors
- [ ] Deploy to preview

### 6.4 Commit and Push
- [ ] Commit all changes
- [ ] Push to origin
- [ ] Create PR if needed

---

## Risk Matrix

| Page | Risk | Notes |
|------|------|-------|
| terminos-condiciones-pipod.astro | LOW | Minimal template usage |
| shopping-cart.astro | LOW | Standard Bootstrap classes |
| pipod-blog.astro | LOW | Custom components |
| tienda-pipod.astro | MEDIUM | StoreWithFilters complex |
| servicio-tecnico-apple.astro | MEDIUM | Custom button styles |
| contacto-pipod.astro | HIGH | Complex navbar, multiple components |
| producto/[slug].astro | HIGH | Product card styles |
| index.astro | HIGH | Most complex, all components |

---

## Rollback Commands

```bash
# If any page breaks, uncomment the import:
# Remove // from: // import '../../assets/scss/astro-ecommerce.scss';

# To restore deleted files (if needed):
git checkout HEAD~1 -- assets/scss/ assets/js/astro-ecommerce.js
```

---

*Tasks created: 2026-05-04*
*Change: legacy-css-cleanup*