---
name: DA FØLD
description: Custom software engineering and consulting for mid-sized companies. The site is one folded sheet that opens into clarity.
colors:
  fold-teal: "#137395"
  fold-teal-light: "#34A7AC"
  fold-ink: "#06242F"
  paper: "#F4F2EC"
  paper-shade: "#E9E6DD"
  crease: "#D9D6CC"
  ink-muted: "#4A5A60"
  paper-on-ink: "#F4F2EC"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw + 1rem, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.015em"
  heading:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  panel: "clamp(64px, 10vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.fold-teal}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  button-primary-hover:
    backgroundColor: "{colors.fold-ink}"
    textColor: "{colors.paper}"
  button-on-ink:
    backgroundColor: "{colors.fold-teal-light}"
    textColor: "{colors.fold-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 28px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.fold-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 0"
  panel-face:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.fold-ink}"
    padding: "{spacing.panel}"
  panel-back:
    backgroundColor: "{colors.fold-ink}"
    textColor: "{colors.paper-on-ink}"
    padding: "{spacing.panel}"
---

# Design System: DA FØLD

> **Status: pre-build.** This file records the chosen direction ("The Fold") and the token set decided before the SvelteKit rebuild. Once the first page is built and reviewed, it gets refreshed from the real build. Two inputs are still pending: the **brand manual hex codes**, to check against the logo colors, and the **typography rule**. The fonts below are provisional until that rule arrives.

## Overview

**North star: The Fold.** The site is one sheet of heavy, uncoated paper, like the proposal folder an executive is handed across a table. It is folded accordion-style into panels. As the visitor scrolls, each panel opens flat. Every panel is one fold of the sheet, and the crease between panels is the only divider the site uses.

The idea carries the promise without claiming anything we can't prove yet: operations arrive *folded*, tangled, over-complicated and hidden in the creases, and DA FØLD opens them out until they are flat and legible. The logo already says this. It's a folded shield, with a `#06242F` shade multiplied over the turn of the paper. The site shades its creases in exactly the same way.

Key characteristics:
- One object, seen once, at one scale. A single sheet, never a stack of cards.
- Paper is the ground. Deep teal is the ink. `fold-ink` is the back of the sheet.
- Credibility through craft: tight type, honest copy, no invented proof.

## Colors

All colors come from the logo (`brand/dafold-logo.svg`). The palette is deliberately small.

### Primary
- **Fold Teal** `#137395`: the ink. Used for primary actions, links, panel numbers and key words. It passes WCAG AA as text on paper (about 4.8:1).

### Secondary
- **Fold Teal Light** `#34A7AC`: the lit side of the fold. Use it **only on `fold-ink`** (about 5.6:1) for actions and highlights. Never put it on paper as text, where contrast is only about 2.6:1.

### Neutral
- **Fold Ink** `#06242F`: body text on paper, and the ground of the back panel and footer.
- **Paper** `#F4F2EC`: the sheet. Warm and uncoated. Never pure white.
- **Paper Shade** `#E9E6DD`: the far side of a crease while a panel is still opening.
- **Crease** `#D9D6CC`: fold lines and form underlines.
- **Ink Muted** `#4A5A60`: secondary text on paper (about 6.4:1).

### Named Rules
- **The Logo Rule.** No color enters the site that isn't in the logo or derived from paper. No purple, no gradients across sections, no status rainbow.
- **The Lit-Side Rule.** `fold-teal-light` lives only on `fold-ink`.
- **The Gradient Rule.** The teal gradient from `#34A7AC` to `#137395` belongs to the logo mark alone and is never used as a background.

## Typography

Provisional until the brand typography rule is supplied.

- **Display and headings:** *Instrument Serif*, weight 400. A printed-document voice. Large, tight and calm.
- **Body:** *Instrument Sans*. Plain, readable and modern, and it pairs with the serif by design.
- **Labels, panel numbers and form labels:** *JetBrains Mono* in uppercase, tracked +0.08em. This links the site to the DA FØLD CRM, which already uses it.

### Hierarchy
1. Display: one per panel at most. The panel's single claim.
2. Heading: supporting statements inside a panel.
3. Body: 60 to 70 characters per line at most.
4. Label: panel numbers (`01 / 05`), section names and the call to action.

### Named Rules
- **One Display Rule.** One display line per panel. If a panel needs two, it is two panels.
- **The Ø Rule.** Always write **DA FØLD** with the Ø, including in the page title, meta tags and alt text.

## Layout

- The page is a vertical sequence of **panels**, each at least one viewport tall on desktop. Panel padding uses `spacing.panel`.
- Five panels make the first sheet: **01 Cover** (the problem and the primary action), **02 What we do** (software engineering and consulting), **03 How we work**, **04 Who's behind it** (anonymous, with the founders' engineering background) and **05 Back of the sheet** (the contact form, on `fold-ink`).
- Content sits on a 12-column grid with generous left alignment. Text never centers across the full width.
- A panel number in the label style sits in the top-left corner of every panel, like a page mark on a folded brochure.
- Breakpoints: 640px, 960px and 1280px. Below 960px the fold animation turns off, and panels stack flat, separated by drawn creases.

## Elevation & Depth

There are no card shadows. The only depth is the **crease**: while a panel is still folded, a linear shade of `fold-ink` at 0 to 18% opacity, blended with multiply, runs along the fold line. This is the same treatment the logo uses on its fold. Once a panel is flat, the crease reduces to a 1px `crease` line.

### Named Rules
- **No Floating Rule.** Nothing hovers above the paper. There are no drop shadows, glass blur or floating cards.

## Shapes

Square corners throughout (`rounded.none`). It's paper, and it is cut, not molded. `rounded.hairline` is reserved for focus rings.

## Components

### Buttons
- **Primary:** square, `fold-teal` with paper-colored text, mono uppercase label. On hover it darkens to `fold-ink`, and an arrow nudges 4px.
- **On ink:** on the back panel the primary button becomes `fold-teal-light` with `fold-ink` text.
- Every page has one primary action: **Book a conversation**.

### Inputs / Fields
- Fields look like a form printed on the sheet: no box, a 1px `crease` underline, and a mono label above. On focus the underline turns `fold-teal` at 2px. Errors are written as plain sentences beneath the field, never as a red box.

### Navigation
- A thin top bar on paper: the logo mark, the **DA FØLD** wordmark, panel labels as anchor links, and **Book a conversation** at the far right. On scroll the bar stays put and gains a 1px crease line. There is no transparent hero bar over imagery.

### Fold Panel (signature component)
- Each panel enters folded at about 70–80° on the X axis, hinged at its top crease. It unfolds to flat as it crosses the viewport (scroll-driven), with crease shading that fades as the panel flattens.
- `prefers-reduced-motion`: panels render flat with creases drawn and no rotation.
- Content is fully readable and focusable in every state. The fold is decoration on the container, never on the text.

## Do's and Don'ts

### Do:
- Keep the whole site one continuous sheet. Panels flow from one into the next across creases.
- Write in plain operational language for a mid-sized company's operations lead.
- Leave honest gaps. A short "Who's behind it" panel beats invented credibility.
- Use the logo's crease shading as the single depth effect.

### Don't:
- Don't add client logos, testimonials, statistics, case studies or partner badges until they are real.
- Don't use Inter for everything, purple-to-blue gradients, icon tiles above headings, or rows of equal feature cards.
- Don't add drop shadows, rounded cards, glassmorphism or stock photos of people shaking hands.
- Don't turn the fold into a gimmick: one hinge per panel, no 3D spins, no paper-texture photos.
- Don't put `fold-teal-light` text on paper.
