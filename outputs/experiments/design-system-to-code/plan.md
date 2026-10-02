# Plan: Design system → code port

> Steps are executed with tests and `mise run check` before every commit.

## T1 — Align the semantic boundary model with Pen

- Replace the single `border` projection with `border.subtle` + `border.strong`
  for every group/step/theme in `src/shared/styles/foundation/colors/semantic.ts`.
- `border.strong` keeps the current functional-boundary values (≥3:1); add
  `border.subtle` as a quieter value between `divider` and `border.strong`.
- Update `SEMANTIC_PROJECTIONS` and `foundation.test.ts`:
  - projections become `background, text, icon, border.subtle, border.strong, divider`;
  - contrast: `border.strong` ≥ 3:1; `divider` < `border.subtle` < `border.strong`.

## T2 — Landing screen from tokens/components

- Compose the landing sections (header, hero, value strip, features, workflow,
  CTA, footer) in `src/app` from existing components and `css()` recipes.
- Light + dark themes; desktop/tablet/mobile layout.
- No new behavior, no dashboard.

## T3 — Verification

- `mise run gen`, `mise run check`, `mise run build`.
- Independent review of the diff.
