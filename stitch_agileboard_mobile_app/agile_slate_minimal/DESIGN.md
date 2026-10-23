---
name: Agile Slate Minimal
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#46566c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
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
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system embodies a modern, focused, and utilitarian engineering aesthetic tailored for high-velocity software development teams. The interface emphasizes functional minimalism, precision, and cognitive ergonomics, striping away unnecessary ornamentation in favor of immediate visual hierarchy and legible metadata.

The emotional goal is clarity and control: developers, product managers, and scrum leads should experience zero friction when tracking sprint progress, grooming backlogs, or shifting work items across stages. The aesthetic pairs a crisp white canvas with slate structural tiers and vivid, deliberate status accents that communicate task urgency at a glance.

## Colors

The palette is engineered around clean slate tonality to support prolonged focus without visual fatigue.

- **Primary (`#2563EB`)**: Applied deliberately to key interactive triggers, selected filter states, column indicators, and primary sprint actions.
- **Secondary (`#0F172A`) & Neutral Text (`#334155`)**: High-contrast, sharp dark neutrals for headlines, task titles, and primary reading paths.
- **Tertiary & Muted (`#64748B`, `#94A3B8`)**: Mid-tier grays for ticket metadata, timestamps, story point counters, and subtle divider strokes.
- **Surfaces (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`)**: Layered base surfaces; pure white (`#FFFFFF`) isolates cards and floating sheets, while slate shades establish the outer canvas and column backgrounds.
- **Semantic Priority Accents**:
  - Critical/High: `#EF4444` on `#FEE2E2` tint.
  - Medium: `#F59E0B` on `#FEF3C7` tint.
  - Low: `#10B981` on `#D1FAE5` tint.

## Typography

Inter serves as the sole typographic engine, providing programmatic legibility and uniform vertical alignment across small mobile viewports.

- Use `headline-lg` and `headline-md` for board titles, sprint headers, and modal headings.
- Use `headline-sm` for card titles inside detail views.
- Use `body-md` for standard kanban card summaries and checklist items.
- Use `label-md` and `label-sm` for metadata badges, assignee details, and column item counts.
- Reserve `code-badge` (all-caps tracking) exclusively for agile ticket identifiers (e.g., `ENG-1042`, `PROD-89`).

## Layout & Spacing

The layout is built for fluid touch interaction on mobile devices, transitioning into a multi-column view on larger screens.

- **Mobile (< 768px)**: Horizontal snap-scrolling viewport. Kanban columns occupy 85% of the viewport width (`w-[85vw]`), exposing the edge of the adjacent column to visually afford swiping. Outer canvas margin is `1rem`. Inter-card vertical spacing is `space-md` (`0.75rem`).
- **Tablet (768px - 1024px)**: Dual or triple-column layout with smooth panning, using `1.5rem` margins and `0.75rem` gutters.
- **Desktop (≥ 1024px)**: Multi-column fluid flex grid expanding to fit available horizontal viewport space with `1rem` column gutters.

## Elevation & Depth

Visual hierarchy uses a hybrid of tonal background layering and diffused ambient shadows:

- **Surface Tier 0 (App Shell)**: `#F8FAFC` base foundation.
- **Surface Tier 1 (Columns & Group Containers)**: `#F1F5F9` rounded columns with no box-shadow to maintain lightweight architecture.
- **Surface Tier 2 (Kanban Cards & Controls)**: Pure `#FFFFFF` resting cards elevated with a subtle ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Surface Tier 3 (Dragged/Active Cards & Menus)**: Lifted state using elevated shadow: `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)` with a 1.02x scale transformation.
- **Hairlines**: Use 1px border with `#E2E8F0` on cards and popovers to preserve separation in bright ambient environments.

## Shapes

The interface balances soft modern curves with structural density. Primary interactive elements utilize rounded corners (`0.5rem` / `8px`).

- **Task Cards**: `rounded-xl` (`12px` to `16px`) for tactile ease on touch targets.
- **Column Containers**: `rounded-2xl` (`16px`) to encase work stages gracefully.
- **Badges, Tags & Priority Indicators**: Fully pill-shaped (`rounded-full` / `9999px`) to contrast against rectangular card boundaries.
- **Avatar Circles**: Perfect circles (`rounded-full`) with centralized initials or imagery.

## Components

### Kanban Cards
- **Container**: White (`#FFFFFF`) surface, `rounded-xl`, 1px border in `#E2E8F0`, padded with `space-lg`.
- **Header Row**: Left-aligned agile ticket ID (`code-badge`, `#64748B`), right-aligned Priority Pill Badge.
- **Body**: Headline (`headline-sm`, `#0F172A`, 2-line clamp max) with optional brief (`body-sm`, `#334155`).
- **Footer Row**: Flex layout with story point badge (pill, slate background), subtask progress counter (`label-sm`), and right-anchored assignee avatar circle.

### Priority Badges
- Compact pill-shaped labels (`label-sm`, padding: `2px 8px`).
- **High/Critical**: Text `#EF4444`, background `#FEE2E2`.
- **Medium**: Text `#D97706`, background `#FEF3C7`.
- **Low**: Text `#059669`, background `#D1FAE5`.

### Column Containers
- Background `#F1F5F9`, `rounded-2xl`, vertical layout with internal scroll if tasks exceed height.
- **Header**: Includes stage status indicator (colored dot matching stage), column title (`headline-sm`, `#0F172A`), and task count chip (`label-sm`, background `#E2E8F0`, `#334155`).
- **Quick Add**: Ghost button at the column base with a `+` icon and `label-md` for frictionless task entry.

### Buttons
- **Primary**: Background `#2563EB`, text `#FFFFFF`, `rounded-lg`, hover/active `#1D4ED8`, padding `8px 16px`.
- **Secondary / Slate**: Background `#E2E8F0`, text `#0F172A`, `rounded-lg`, hover `#CBD5E1`.
- **Ghost / Action**: Background transparent, text `#64748B`, active `#F1F5F9`.

### Avatars
- Circle container (`28px` on cards, `36px` on profile headers), background `#E2E8F0`, border `1.5px solid #FFFFFF`.
- Initials rendered in `label-sm` with color `#334155`. Overlapping avatar stacks overlap by `-8px`.

### Inputs & Search
- Background `#FFFFFF`, 1px `#CBD5E1` border, `rounded-lg`, padding `8px 12px`. Focus state shifts border to `#2563EB` with an ambient glow (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`).