# Design System: PIPOD

## 1. Visual Theme & Atmosphere

PIPOD's website is a premium tech repair service platform that combines professionalism with approachability. The design operates on a foundation of near-black (`#1F1F1F`) and pure white (`#ffffff`) as the primary canvas, with technical blues (`#3A506B`, `#4A90E2`) serving as accent colors that reinforce the tech/repair identity.

The typography uses a three-font system: Inter for primary UI and headings (clean, modern, highly legible), PT Mono for labels and technical markers (reinforces repair/technical context), and Noto Sans for body text (universal readability). This creates a professional yet accessible feel — the kind of service you'd trust with expensive equipment.

What distinguishes PIPOD is its bento-grid layout aesthetic with large border-radius cards (24px–40px), a prominent stats bar (119px height), and consistent 80px horizontal padding within a 1440px container. The interface feels structured, spacious, and premium — designed to instill confidence in a tech repair service.

**Key Characteristics:**
- Near-black (`#1F1F1F`) and white (`#ffffff`) canvas with blue accents (`#3A506B`, `#4A90E2`)
- Three-font system: Inter (primary), PT Mono (labels), Noto Sans (body)
- Bento-grid layout with large radius cards (24px cards, 40px bento, 50px pills)
- 1440px max container with 80px horizontal padding
- 119px stats bar height for key metrics
- Premium tech repair aesthetic — professional, structured, spacious

## 2. Color Palette & Roles

### Primary Canvas
- **Pure White** (`#ffffff`): Page backgrounds, card surfaces, text on dark
- **Near Black** (`#1F1F1F`): Primary dark backgrounds, text on light
- **Pure Black** (`#000000`): Used sparingly — headers, footer, specific accents

### Brand Blues
- **Deep Blue** (`#3A506B`): Secondary accent, hover states, technical context
- **Tech Blue** (`#4A90E2`): Primary interactive accent, CTAs, links, highlights

### Grays
- **Light Surface** (`#F5F5F7`): Section backgrounds, alternating layouts
- **Border Gray** (`#E5E5E7`): Dividers, card borders, subtle separations
- **Disabled** (`rgba(0,0,0,0.24)`): Disabled states

### Interactive States
- **Primary Action**: Tech Blue (`#4A90E2`)
- **Secondary Action**: Deep Blue (`#3A506B`)
- **Hover**: Blue shift with opacity changes
- **Focus**: Blue ring outline

### Inconsistencies Detected
⚠️ **Warning**: Different pages use different background colors:
- `index`: Uses `#F5F5F7` light sections
- `donate`: May have page-specific backgrounds
- `tienda`: Different bg treatment
- `servicio-tecnico`: Varies from standard

⚠️ **Warning**: Blue accents vary across pages:
- Some sections use `#3A506B`, others use `#4A90E2`
- Border treatments differ between pages

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`, fallbacks: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`
- **Labels/Technical**: `PT Mono`, fallbacks: `Monaco, Consolas, monospace`
- **Body**: `Noto Sans`, fallbacks: `system-ui, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display/Stats | Inter | 48px+ | 600–700 | tight | tight | Large stat numbers |
| Section Heading | Inter | 28–32px | 600–700 | 1.2–1.3 | normal | Primary headings |
| Card Heading | Inter | 20–24px | 600 | 1.25 | normal | Feature titles |
| UI Medium | Inter | 16px | 500 | 1.5 | normal | Nav, emphasis |
| Body | Noto Sans | 14–16px | 400 | 1.5–1.6 | normal | Standard body |
| Label/Code | PT Mono | 12–14px | 400–500 | 1.4 | tight | Technical labels |

### Principles
- **Inter dominance**: Primary UI and headings use Inter — modern, clean, professional
- **PT Mono for technical**: Labels and technical markers use monospace to reinforce repair context
- **Noto Sans for body**: Body text uses Noto Sans for universal character support
- **Weight discipline**: 500–700 for headings, 400 for body — clear hierarchy
- **Tight line heights on headings**: 1.2–1.3 creates compact, professional headings

## 4. Component Stylings

### Buttons

**Primary Blue**
- Background: `#4A90E2` (tech blue)
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 8px
- Hover: opacity 0.9 or darken 10%
- Focus: `0 0 0 2px` blue ring

**Secondary Dark**
- Background: `#1F1F1F` (near-black)
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 8px
- Hover: background shifts

**Pill/Tag**
- Background: transparent or light surface
- Border: 1px solid `#E5E5E7`
- Border Radius: 50px (full pill)
- Padding: 8px 16px

### Cards & Containers

**Standard Card**
- Background: `#ffffff`
- Radius: 24px
- Shadow: subtle single-layer (observed)
- Padding: 24–32px internal

**Bento Card**
- Background: `#ffffff`
- Radius: 40px
- Shadow: subtle ambient
- Used for: Feature grids, stat displays

**Stats Card**
- Background: varies (white or light surface)
- Radius: 24px
- Height: 119px (stats bar context)

### Navigation
- White or dark header depending on page
- Inter font for nav items
- Horizontal layout with proper spacing
- Consistent padding: 80px horizontal

### Input Fields
- Border: 1px solid `#E5E5E7`
- Focus: blue (`#4A90E2`) border ring
- Radius: 8px
- Padding: 12px 16px

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Container: 1440px max-width
- Horizontal padding: 80px (desktop)
- Stats bar height: 119px
- Card radius scale: 8px, 24px, 40px, 50px

### Grid & Container
- Full-width sections with centered 1440px container
- Bento-grid layout for feature sections
- 80px horizontal padding maintains breathing room
- Stats/info bars with fixed 119px height

### Whitespace Philosophy
- **Professional spacing**: Generous padding creates premium feel — 80px horizontal is substantial
- **Bento aesthetic**: Large rounded cards (40px radius) create modern grid layout
- **Stat bar prominence**: 119px height ensures key metrics get visual weight
- **Consistent rhythm**: Most sections follow the same padding/margin scale

### Border Radius Scale
- Subtle (8px): Buttons, inputs, small elements
- Standard (24px): Cards, containers
- Large (40px): Bento cards, feature grids
- Pill (50px): Tags, pills, full-rounders

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page background, text blocks |
| Card (Level 1) | Subtle ambient shadow | Standard cards, containers |
| Elevated (Level 2) | Increased shadow | Hover states, floating elements |
| Stats Bar (Level 3) | Distinct elevation | Stats bar with prominent height |

**Shadow Philosophy**: PIPOD uses subtler shadows than Airbnb's three-layer system. Single-layer ambient shadows with low opacity create depth without drama. The focus is on the large border-radius (24px–40px) to create visual separation rather than heavy shadow.

⚠️ **Inconsistency Note**: Shadow treatments vary across pages — some use stronger shadows, others rely more on radius and background contrast.

## 7. Do's and Don'ts

### Do
- Use Inter (500–700) for headings and primary UI — the font hierarchy is intentional
- Use PT Mono for technical labels — reinforces repair/service context
- Apply Tech Blue (`#4A90E2`) for primary CTAs and interactive elements
- Use Deep Blue (`#3A506B`) for secondary accents and hover states
- Apply large border-radius: 24px for cards, 40px for bento, 50px for pills
- Maintain 1440px container with 80px horizontal padding
- Use 119px height for stats bars
- Keep white/near-black as primary canvas colors

### Don't
- Don't mix random blue shades — stick to `#3A506B` or `#4A90E2`
- Don't use varying border treatments — standardize card borders
- Don't apply inconsistent background colors across pages
- Don't use pure black for large surfaces (use `#1F1F1F` instead)
- Don't use small radius (stick to 24px minimum for cards)
- Don't introduce brand colors beyond the established blue system
- Don't override the font system — Inter, PT Mono, Noto Sans have specific roles

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <480px | Single column, reduced padding (16–24px) |
| Mobile | 480–768px | Compact layout, adjusted card sizes |
| Tablet | 768–1024px | 2-column grids, 40px padding |
| Desktop | 1024–1440px | Full layout, 80px padding |
| Large Desktop | >1440px | Max-width container centering |

### Touch Targets
- Buttons: minimum 44px height for touch
- Cards: adequate padding for interaction
- Navigation: touch-friendly sizing

### Collapsing Strategy
- Bento grid: 4 → 2 → 1 columns
- Stats bars: stack or adjust height
- Padding: 80px → 40px → 24px → 16px
- Navigation: horizontal → simplified mobile menu

### Image Behavior
- Responsive sizing with aspect ratio maintained
- Card images fill container appropriately
- Proper sizing for different viewport widths

## 9. Agent Prompt Guide

### Quick Color Reference
- Background (light): Pure White (`#ffffff`)
- Background (dark): Near Black (`#1F1F1F`)
- Primary accent: Tech Blue (`#4A90E2`)
- Secondary accent: Deep Blue (`#3A506B`)
- Surface gray: `#F5F5F7`
- Border gray: `#E5E5E7`
- Text (light): Near Black (`#1F1F1F`)
- Text (on dark): Pure White (`#ffffff`)

### Example Component Prompts
- "Create a stats card: white background, 24px radius, 119px height, subtle shadow. Large Inter 600 number (48px), label in PT Mono below."
- "Design a bento card: white background, 40px radius, subtle ambient shadow. 80px internal padding, Inter heading (24px 600), Noto Sans body (16px 400)."
- "Build a CTA button: Tech Blue background (#4A90E2), white text, 8px radius, Inter 500 label. Hover: slight opacity change."
- "Create a pill tag: transparent bg, 1px border (#E5E5E7), 50px radius, PT Mono label (12px). Tech blue text."
- "Design a section container: 1440px max-width, 80px horizontal padding, centered. Light surface background (#F5F5F7) with white cards."

### Iteration Guide
1. Start with white/near-black — the foundation colors
2. Tech Blue (`#4A90E2`) for primary CTAs and interactive elements
3. Deep Blue (`#3A506B`) for secondary accents
4. Large radius (24px–40px) creates the bento aesthetic — avoid small radius
5. Inter for UI, PT Mono for labels, Noto Sans for body
6. 80px padding maintains the premium spacious feel
7. Stats bar at 119px height for key metric prominence

(End of file - total 246 lines)
