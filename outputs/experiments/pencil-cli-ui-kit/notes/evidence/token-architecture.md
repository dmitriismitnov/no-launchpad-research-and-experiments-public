# Token architecture migration evidence

**Status:** PASS mechanically; HUMAN REVIEW visually (2026-10-06)

## Layering model

The Pen document now follows the project’s general Foundation logic:

1. theme-independent primitives: `palette.*`, `opacity.*`, `spacing.*`,
   `sizes.*`, `radii.*`, `borderWidths.*`, `fonts.*`, `fontSizes.*` and
   `fontWeights.*`;
2. theme-aware semantic aliases: `semantic.common.*`, `semantic.brand.*`,
   `semantic.negative.*` and `semantic.focus.*`;
3. component and screen properties that reference semantic colours and scale
   variables, never the primitive colour palette directly.

`GetVariables()` verifies, for example, that
`semantic.common.50.background` aliases `palette.neutral.50` in light mode and
`palette.neutral.950` in dark mode. Brand, negative and focus aliases likewise
project green/red primitives through the theme axis.

## Migration coverage

- Existing reusable master IDs are preserved: Button `z6FBhy`, ButtonIcon
  `ngKcI`, Card `COzjp`.
- Existing refs remain intact, including Card variants and all three Projects
  overview Card instances.
- Final audit reports required variables and no legacy simplified-alias,
  literal visual-token or `ctx.problems` rows.

## Evidence

- RED baseline: `token-architecture-baseline.md`.
- Final audit transcript:
  `.superpowers/sdd/2026-10-06-pencil-token-architecture/token-audit-final.log`.
- Foundation screenshot: `foundation-token-architecture-export.png`.
- Projects overview screenshot: `projects-overview-token-architecture.png`.
- Final target SHA-256:
  `36361508d20acd905b27e1a028c25b4fdf30fb3b042b8d59e4c248f3913494ae`.

## HUMAN REVIEW

Verify the updated Foundation specimen and Projects overview in Pen GUI for
visual hierarchy and the dark-theme aesthetic. Mechanical checks prove the
structure and references, not aesthetic quality.
