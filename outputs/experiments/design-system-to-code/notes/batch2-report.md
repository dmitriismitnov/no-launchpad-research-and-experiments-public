# Batch 2 report: five feedback components from the Pen design system

**Date:** 2026-10-02
**Commit:** `11774a3080c085a48821f059a0c85c338933760f`
**Message:** `feat: port Alert, Toast, Progress, Progress Ring, Empty State from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only JSON, parsed with Bun).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Five public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Alert | `alert` frame `Q2PWF` | slot `alert` | root / header / icon / title / dismiss / body |
| Toast | `toast` frame `F1P1XX` | slot `toast` | root / icon / content / title / body / action / dismiss |
| Progress | `progress` frame `tTGQi` | slot `progress` | root / track / fill |
| Progress Ring | `progress ring` frame `yz7HH` | slot `progressRing` | root / svg / track / arc |
| Empty State | `empty state` frame `Kj5Nm` | slot `emptyState` | root / icon / title / description / action |

All five are tone/value driven and declarative: icons, actions and dismiss
controls are optional; no state machines and no motion beyond a width
transition on the Progress fill.

## Pen → code mapping

Pen carries a newer **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/feedback/*`, `semantic/action/*`) on top of the
numeric matrix the code foundation ports. Each master role alias was resolved to
the closest token in the matrix.

### Shared role aliases

| Pen role (master) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/sunken` | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact, dark one step (Skeleton/Spinner convention) |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | light exact, dark one step |
| `surface/overlay` | `white` / `neutral.800` | `semantic.common.50.background` | light exact, dark two steps |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary (dark one step) |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `text/link` | `green.700` / `green.400` | `semantic.brand.700.background` | light exact, dark one step brighter |
| `feedback/neutral-bg` | `neutral.50` / `neutral.900` | `semantic.common.50.background` | light exact, dark one step |
| `feedback/neutral-border` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `feedback/neutral-fg` | `neutral.700` / `neutral.200` | `semantic.common.50.icon` | exact |
| `feedback/positive-bg` | `green.50` / `green.950` | `semantic.positive.50.background` | exact |
| `feedback/positive-border` | `green.700` / `green.600` | `semantic.positive.50.border.strong` | light one step, dark same family |
| `feedback/positive-fg` | `green.700` / `green.300` | `semantic.positive.700.background` | exact |
| `feedback/negative-bg` | `red.50` / `red.950` | `semantic.negative.50.background` | exact |
| `feedback/negative-border` | `red.500` / `red.400` | `semantic.negative.50.border.strong` | light exact, dark one step |
| `feedback/negative-fg` | `red.700` / `red.300` | `semantic.negative.700.background` | exact |
| `action/primary-bg` | `green.700` / `green.700` | `semantic.brand.700.background` | light exact, dark `green.300` (brighter on the dark track) |

Tone variants reuse the `.50` feedback surfaces plus a `.50.border.strong`
boundary; the foreground (icon/title) comes from the matching `.700.background`
role. `brand` uses the `brand` matrix group. There is no `info`/`sky` group in
the code matrix, so Alert/Toast deliberately expose only
`neutral | positive | negative | brand`.

### Per-master values

- **Alert**: gap `x5` (10px), padding `x8` (16px), radius `md` (10px) — all
  exact. Optional icon and dismiss (`x` glyph, already in the icon set).
- **Toast**: gap `x6` (12px) exact, padding `x6` (12px vs Pen 14px), radius `md`,
  shadow `0 8px 24px {colors.semantic.shadow.400}` matching Pen shadow/400
  offset y8 blur24. Content gap `x1` (2px vs Pen 3px). Optional icon, action and
  dismiss.
- **Progress**: track height `x3` (6px) exact; track radius `9999px` for
  `radius/pill`; fill width is an inline percentage from `value`.
- **Progress Ring**: SVG `strokeDasharray`/`strokeDashoffset`, svg rotated
  `-90deg`. Defaults `size=40`, `thickness=4` approximate Pen `innerRadius 0.82`
  (≈3.6px for 40px).
- **Empty State**: gap `x6` (12px), padding `x16` (32px) exact; radius `1rem`
  for Pen radius/lg 16px.

## Accessibility

- Alert: `role="alert"`.
- Toast: `role="status"` + `aria-live="polite"`.
- Progress and Progress Ring: `role="progressbar"` with `aria-valuemin`,
  `aria-valuemax` (custom `max` supported) and clamped `aria-valuenow`; optional
  `aria-label` for an accessible name. The ring SVG is `aria-hidden`.
- Dismiss buttons get `aria-label` (`Dismiss <title>` by default, overridable).

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all five are `theme.slotRecipes`).
- `src/shared/styles/presets.test.ts`: updated slot-recipe lists (two places),
  `toBeDefined`/`toEqual` assertions, and the reversed-order guard.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed so Knip sees usage.

## Files

New, per component (`alert`, `toast`, `progress`, `progress-ring`,
`empty-state`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

No icon, font, theme or generated asset was touched; `mise run icons:check` and
`mise run fonts:check` stay green.

## Commands and results

| Command | Result |
| --- | --- |
| `mise run gen` | ✓ codegen + cssgen (147 files extracted) |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (248 unit / 92 browser) |
| `mise run check:deps` | ✓ Knip clean |

`mise run fix:format` reformatted 7 new files before the check; `mise run
check:format` is a no-op on the committed tree.

## Approximations and concerns

- **Role-layer gap (carried from batch 1).** The code foundation has no
  `surface/*`, `text/*`, `border/*`, `feedback/*` or `action/*` semantic groups;
  only the numeric matrix. Foregrounds use `.background` at the matching step
  (the existing Input/Card convention) and boundaries use `.divider` where no
  matrix border role resolves cleanly. A future foundation pass should port the
  Pen role layer rather than extend this approximation.
- **No `info` tone.** Pen defines `feedback/info-*` over the `sky` palette, but
  the code matrix has no `sky`/`info` group, so Alert/Toast expose only
  `neutral | positive | negative | brand`. A true `info` tone needs a new
  semantic group in the foundation.
- **Radius foundation gaps.** `radii` ships only `sm`/`md`. Empty State uses the
  literal `1rem` for Pen radius/lg, and Progress uses `9999px` for
  `radius/pill`. Separately, the pre-existing Badge/Avatar/StatusIndicator use
  `borderRadius: "full"`, which emits the invalid `border-radius: full` because
  there is no `full` token; this batch did not introduce the bug and did not fix
  it (out of scope). Adding `full` (and optionally `lg`) to the radii foundation
  would fix those components and remove both literals.
- **Missing Pen glyphs.** The masters use `info`, `circle-check` and `inbox`,
  none of which are in the icon set. Icon props are optional; stories and
  `App.tsx` demonstrate them with existing glyphs (`check`, `settings`, `x`).
  No icon was hand-added or hand-edited; adding the three glyphs is a separate
  `mise run icons:build` step.
- **Small geometry approximations.** Toast padding 14→12px and content gap
  3→2px; Alert icon 18→20px (`md`); Empty State icon 28→24px (`lg`);
  Progress Ring thickness 3.6→4px.
- **Progress fill dark theme.** Pen's `action/primary-bg` is `green.700` in both
  themes; `brand.700.background` matches light exactly and resolves to
  `green.300` in dark, intentionally brighter against the dark sunken track.
- **Toast width.** The Pen master is a fixed 400px; the component uses
  `width: 100%` + `maxWidth: 25rem` so it adapts to its container.
