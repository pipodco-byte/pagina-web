# Spec: PIPOD Design System

## Overview

PIPOD is a premium tech repair service platform. This specification defines the canonical design system for all components, tokens, and patterns. All implementations MUST comply with this document.

---

## Design Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Pure White | `#ffffff` | Page backgrounds, card surfaces, text on dark |
| Near Black | `#1F1F1F` | Primary dark backgrounds, text on light |
| Pure Black | `#000000` | Headers, footer, specific accents (sparingly) |
| Deep Blue | `#3A506B` | Secondary accent, hover states, technical context |
| Tech Blue | `#4A90E2` | Primary interactive accent, CTAs, links, highlights |
| Light Surface | `#F5F5F7` | Section backgrounds, alternating layouts |
| Border Gray | `#E5E5E7` | Dividers, card borders, subtle separations |
| Disabled | `rgba(0,0,0,0.24)` | Disabled states |

**Resolution**: The system SHALL use ONLY the colors defined above. No page-specific background colors SHALL be introduced.

### Typography

| Role | Font | Size | Weight | Line Height |
|------|------|------|--------|-------------|
| Display/Stats | Inter | 48px+ | 600–700 | tight (1.2) |
| Section Heading | Inter | 28–32px | 600–700 | 1.2–1.3 |
| Card Heading | Inter | 20–24px | 600 | 1.25 |
| UI Medium | Inter | 16px | 500 | 1.5 |
| Body | Noto Sans | 14–16px | 400 | 1.5–1.6 |
| Label/Code | PT Mono | 12–14px | 400–500 | 1.4 |

**Font Stacks:**
- Inter: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`
- PT Mono: `Monaco, Consolas, monospace`
- Noto Sans: `system-ui, sans-serif`

### Spacing

Base unit: **8px**

| Token | Value |
|-------|-------|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 32px |
| xl | 48px |
| 2xl | 64px |
| 3xl | 80px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| subtle | 8px | Buttons, inputs, small elements |
| standard | 24px | Cards, containers |
| large | 40px | Bento cards, feature grids |
| pill | 50px | Tags, pills, full-rounders |

### Shadows

| Level | Definition | Usage |
|-------|------------|-------|
| Flat | None | Page background, text blocks |
| Card | `0 2px 8px rgba(0,0,0,0.06)` | Standard cards |
| Elevated | `0 4px 16px rgba(0,0,0,0.10)` | Hover states, floating elements |
| Stats Bar | `0 2px 12px rgba(0,0,0,0.08)` | Stats bar elevation |

---

## Component Specifications

### Button

**Primary Button**
- Background: `#4A90E2`
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 8px
- Font: Inter 500
- Hover: opacity 0.9
- Focus: `0 0 0 2px #4A90E2`

**Secondary Button**
- Background: `#1F1F1F`
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 8px
- Hover: background `#3A506B`

**Pill/Tag**
- Background: transparent
- Border: 1px solid `#E5E5E7`
- Radius: 50px
- Padding: 8px 16px
- Font: PT Mono 12px
- Text: Tech Blue

### Card

**Standard Card**
- Background: `#ffffff`
- Radius: 24px
- Shadow: Card level
- Padding: 24–32px

**Bento Card**
- Background: `#ffffff`
- Radius: 40px
- Shadow: Card level
- Padding: 32px

**Stats Card**
- Background: `#ffffff`
- Radius: 24px
- Height: 119px
- Shadow: Card level

### Navigation

- Background: `#ffffff` or `#1F1F1F` (context-dependent)
- Font: Inter 500
- Padding: 80px horizontal (desktop)
- Layout: Horizontal with proper spacing

### Input

- Border: 1px solid `#E5E5E7`
- Focus border: `#4A90E2`
- Focus ring: `0 0 0 2px rgba(74,144,226,0.3)`
- Radius: 8px
- Padding: 12px 16px

---

## Inconsistency Resolutions

| Issue | Resolution |
|-------|------------|
| Different background colors across pages | All pages SHALL use `#F5F5F7` for light sections. No page-specific backgrounds allowed. |
| Blue accent variation | Components MUST use Tech Blue (`#4A90E2`) for primary actions, Deep Blue (`#3A506B`) for secondary. |
| Shadow inconsistency | All shadows MUST follow the Shadow Level table above. No stronger or weaker variants. |
| Border treatments differ | All borders SHALL use Border Gray (`#E5E5E7`). No page-specific border colors. |

---

## Scenarios

### Scenario: Rendering Primary Button

- GIVEN a user needs to trigger a primary action
- WHEN the button is rendered
- THEN it SHALL use Tech Blue (`#4A90E2`) background
- AND it SHALL have 8px radius
- AND it SHALL use Inter 500
- AND it SHALL have 12px 24px padding

### Scenario: Using Standard Card

- GIVEN a content container is needed
- WHEN the card is rendered
- THEN it SHALL use white background
- AND it SHALL have 24px radius
- AND it SHALL use Card level shadow
- AND it SHALL have 24–32px internal padding

### Scenario: Creating Bento Layout

- GIVEN a feature grid is required
- WHEN bento cards are rendered
- THEN each card SHALL have 40px radius
- AND cards SHALL use white background
- AND shadow SHALL be Card level
- AND padding SHALL be 32px

### Scenario: Displaying Stats

- GIVEN a key metric needs prominence
- WHEN stats card is rendered
- THEN it SHALL have 119px height
- AND it SHALL have 24px radius
- AND the number SHALL use Inter 600 at 48px+
- AND the label SHALL use PT Mono

### Scenario: Form Input Focus

- GIVEN a user focuses an input field
- WHEN the focus state is active
- THEN the border SHALL become Tech Blue
- AND a subtle blue ring SHALL appear

### Scenario: Responsive Navigation

- GIVEN the viewport is mobile
- WHEN navigation is rendered
- THEN horizontal layout SHALL collapse to simplified menu
- AND padding SHALL reduce to 16px
- AND touch targets SHALL be minimum 44px

---

## Compliance Checklist

### MUST
- [ ] Use Inter (500–700) for headings and primary UI
- [ ] Use PT Mono for technical labels
- [ ] Use Tech Blue (`#4A90E2`) for primary CTAs
- [ ] Use Deep Blue (`#3A506B`) for secondary accents
- [ ] Apply 24px radius for cards, 40px for bento, 50px for pills
- [ ] Maintain 1440px container with 80px horizontal padding
- [ ] Use 119px height for stats bars
- [ ] Use white/near-black as primary canvas

### MUST NOT
- [ ] Mix random blue shades outside `#3A506B` and `#4A90E2`
- [ ] Use varying border treatments
- [ ] Apply inconsistent background colors across pages
- [ ] Use Pure Black for large surfaces (use `#1F1F1F` instead)
- [ ] Use small radius below 24px for cards
- [ ] Introduce brand colors beyond the established blue system
- [ ] Override the font system roles

---

## Layout Constants

| Constant | Value |
|----------|-------|
| Container max-width | 1440px |
| Desktop horizontal padding | 80px |
| Tablet horizontal padding | 40px |
| Mobile horizontal padding | 16–24px |
| Stats bar height | 119px |

## Responsive Breakpoints

| Name | Width |
|------|-------|
| Mobile Small | <480px |
| Mobile | 480–768px |
| Tablet | 768–1024px |
| Desktop | 1024–1440px |
| Large Desktop | >1440px |
