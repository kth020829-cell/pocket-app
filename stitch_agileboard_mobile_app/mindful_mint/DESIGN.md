---
name: Mindful Mint
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#006c4e'
  on-secondary: '#ffffff'
  secondary-container: '#80f9c8'
  on-secondary-container: '#007353'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c39f17'
  on-tertiary-container: '#473700'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#80f9c8'
  secondary-fixed-dim: '#62dcad'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#00513a'
  tertiary-fixed: '#ffe086'
  tertiary-fixed-dim: '#eac33e'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#574500'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is tailored for young adults navigating independent living and personal finances for the first time. The visual language conveys emotional reassurance, calmness, and quiet competence, directly countering the anxiety and friction commonly associated with budgeting. 

The aesthetic fuses **Modern Minimalism** with **Warm Tactility**. Interface surfaces favor soft off-white canvases over sterile clinical grays, grounded by deep slate navy typography for effortless legibility. Fresh mint greens provide encouraging positive reinforcement without feeling transactional or aggressive. Rounded geometry, generous tap targets, and ambient, pillowy elevations impart a tactile, approachable product experience that feels like a supportive pocket companion rather than a rigid ledger.

## Colors

The color palette centers on soft lightness and biological freshness:

- **Base Canvas & Surfaces:** The default app background is set to warm ecru (`#FBFBF9`), paired with pure card white (`#FFFFFF`) to delineate structural modules softly against the canvas. A subtle secondary container tone (`#F3F4EE`) serves as background for inset groups and secondary states.
- **Primary Mint (`#10B981`):** Represents positive balances, intentional savings goals, and primary calls-to-action. It radiates vitality and optimism. A lighter pastel variant (`#D1FAE5`) is utilized for soft status pills and active row highlights.
- **Secondary Sage (`#6EE7B7`):** Acts as a supporting pastel bridge for charts, progress bar fills, and non-blocking notification highlights.
- **Tertiary Sunshine (`#FCD34D`):** Delivers a cheerful, non-alarming accent for variable expenses, pending transitions, and contextual tips. Complemented by a soft peach (`#FCA5A5`) used reservedly for over-budget states, avoiding alarming deep reds.
- **Dark Navy Slate (`#0F172A`):** Anchors all textual elements with high contrast and clarity. Secondary text steps down to `#475569`, ensuring readability without harsh starkness.

## Typography

Inter serves as the unified typographic engine across all hierarchy levels. Its tall x-height, clear geometry, and tabular numeral support offer optimal readability for dynamic numeric data, transaction lists, and financial summaries.

- **Numerics & Figures:** For all financial amounts, balance headers, and expense ledgers, apply font-variant-numeric: `tabular-nums` to ensure stable vertical alignment across list rows.
- **Rhythm & Weight:** Restrict font weights to Regular (400) for narrative and micro-copy, Medium (500) for supporting metadata, and Semi-Bold/Bold (600/700) for titles, active tags, and financial totals.

## Layout & Spacing

This design system uses an adaptable, human-scale layout framework rooted in an 8pt base grid:

- **Mobile Viewports (< 640px):** Single-column fluid stack with `1rem` (16px) outer margins. Cards occupy 100% of the interior width. Inset gutters between adjacent elements remain `0.75rem` to `1rem` to preserve screen real estate while feeling airy.
- **Tablet / Desktop Viewports (≥ 640px):** Transitions to a centered fluid grid container capped at `720px` max-width for focused budgeting dashboards, or a 12-column layout with `1.5rem` gutters on broader management screens. 
- **Internal Component Spacing:** Strict adherence to `space-sm` (8px) for tightly coupled text and icons, `space-md` (16px) for card body padding and item lists, and `space-lg` (24px) for section demarcations.

## Elevation & Depth

Visual separation relies on light-reflecting tonal layers combined with warm ambient drop shadows, rejecting stark borders:

- **Surface Levels:** 
  - Level 0 (Canvas): Warm ecru (`#FBFBF9`).
  - Level 1 (Cards, Modals): Crisp White (`#FFFFFF`).
  - Level 2 (Floating Action Triggers, Sheets): Pure White with enhanced ambient shadow.
- **Shadow Profiles:**
  - *Subtle Card Shadow:* `0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 8px 16px -4px rgba(15, 23, 42, 0.03)` creates an organic lift without sharp edges.
  - *Floating Interactive Shadow:* `0 10px 25px -5px rgba(16, 185, 129, 0.25)` applied beneath primary action buttons to project a soft, reassuring glow.
- **Outlines:** Where explicit structural bounds are required (such as input forms), use ultra-soft low-contrast borders: `1px solid rgba(15, 23, 42, 0.06)`.

## Shapes

The shape philosophy is organic, soft, and friendly. Structural cards and modal containers consistently use `rounded-2xl` (16px / 1rem radius) to eradicate aggressive corners and project an informal, welcoming presence. 

Interactive controls such as action buttons, filter tags, and numeric chips adopt fully rounded pill profiles (`rounded-full` / 9999px radius). Secondary elements like text inputs and category icon backgrounds leverage a cohesive `rounded-xl` (12px radius).

## Components

- **Buttons:**
  - *Primary:* Emerald mint background (`#10B981`), pure white text, full pill radius (`rounded-full`), `space-md` horizontal padding, paired with a soft mint ambient glow shadow on hover/focus.
  - *Secondary / Ghost:* Warm off-white surface (`#F3F4EE`) or transparent background with deep navy text (`#0F172A`) and zero border for effortless dismissals.
- **Cards:**
  - Base cards use solid `#FFFFFF`, corner radius `1rem` (rounded-2xl), subtle card elevation shadow, and internal padding of `space-md` (16px) to `space-lg` (24px). No harsh border outlines.
- **Chips & Budget Tags:**
  - Pill-shaped badges using soft pastel tints (e.g., `#D1FAE5` for Groceries, `#FEF3C7` for Utilities, `#E0E7FF` for Leisure) with deep navy or darkened tint typography. Compact vertical padding (`space-xs`) and medium horizontal padding (`space-sm`).
- **Input Fields & Numeric Steppers:**
  - Background filled with `#F8FAF8` or `#FFFFFF` enclosed by a 1px `rgba(15, 23, 42, 0.08)` border. On focus, illuminate with a 2px mint ring (`#10B981`) and faint green outer bloom. Amount inputs feature oversized `display-lg` tabular numerals.
- **Lists & Transaction Rows:**
  - Borderless list items separated by `space-sm` gaps or faint hairline dividers (`#F1F5F9`). Left-aligned circular category icons (pastel background + vector glyph), middle title and relative timestamp, right-aligned amount in bold tabular digits.
- **Budget Meter / Progress Bars:**
  - Rounded bar track (`rounded-full`) in `#E2E8F0` with a smooth fill indicator in `#10B981`. When spending exceeds 85%, morph the fill tone dynamically to pastel amber (`#FCD34D`), shifting to soft peach (`#FCA5A5`) only when exceeded.