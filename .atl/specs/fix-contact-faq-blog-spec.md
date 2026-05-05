# Spec: fix-contact-faq-blog

## CSS/Badges
### Requirement: Badge size
`.badge.filter` MUST be 23x23px (previously 24x24px)
- Scenario: Color swatch renders at correct size

## Layout/FAQ
### Requirement: FAQ section background
`ContactFAQ` section MUST have `background: #ffffff`
- Scenario: FAQ items on white, not grey

## Typography/Blog
### Requirement: Blog h1 weight
`BlogHeroSection h1` SHOULD be `font-weight: 800`
- Scenario: Consistent with other hero sections

## Typography/Terms
### Requirement: Font smoothing
Terms sidebar/widgets MUST have `-webkit-font-smoothing: antialiased`
- Scenario: Fonts render crisp and sharp