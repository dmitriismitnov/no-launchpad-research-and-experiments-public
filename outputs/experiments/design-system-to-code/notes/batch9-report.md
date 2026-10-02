# Batch 9 report: Drawer, Sheet, Floating Panel and Tour from the Pen design system

**Date:** 2026-10-02
**Commit:** `4e90fdd6bbe91b6741aaa7549eb58abbeb96665d`
**Message:** `feat: port Drawer, Sheet, Floating Panel, Tour from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `node`).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Four public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All four are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Drawer | `Drawer` frame `UbA6r` | slot `drawer` | root / trigger / overlay / panel / header / title / close / body / description / footer |
| Sheet | `Sheet` frame `aOMDf` | slot `sheet` | root / trigger / overlay / panel / handle / header / title / close / body / description / footer |
| Floating Panel | `Floating Panel` frame `J3VmmT` | slot `floatingPanel` | root / trigger / panel / header / icon / title / collapse / close / body |
| Tour | `Tour` frame `AHDih` | slot `tour` | root / trigger / surface / content / step / title / body / footer / dots / dot / back / next / close |

The reusable masters live in
`07 Components — Overlays — Components — Overlays — Masters (library)`. The
per-component documentation frames (`Components — Overlays — Drawer` `P6x6P` /
`Sheet` `kuTcw` / `FloatingPanel` `y3lqjy` / `Tour` `p3wP8`) supplied the public
variants and state specimens; the `variables` map supplied the resolved role
values.

### API shape

All four follow the established overlay pattern: `open` / `defaultOpen` state with
plain React `useState`, optional `onOpenChange`, no portals and no headless
library. Surfaces render in place.

- **Drawer** is an edge-anchored modal panel over a scrim. `side` (`right`
  default) picks the anchored edge; `withScrim` (default `true`) draws and
  dismisses on the scrim. It takes a `title`, optional `description`, body
  `children` and footer `actions` as nodes. `Escape` and the close control
  dismiss it.
- **Sheet** is the touch-oriented sibling of Drawer. `side` accepts `bottom`
  (default), `top`, `left` and `right`; `handle` (default `false`) draws the
  grabber; `withScrim` behaves as in Drawer. Content is `title`, optional
  `description`, `children` and `actions`.
- **Floating Panel** is a static tool or inspector surface pinned to a viewport
  corner (`placement`: `bottom-right` default). It takes a `title`, optional
  `icon` (default `sliders-horizontal`) and `children`. `collapsible` adds a
  collapse control whose state is uncontrolled by default or controlled with
  `collapsed` / `onCollapsedChange`; `Escape` and the close control dismiss it.
- **Tour** is a step bubble with a progress counter and dots, a title, an
  optional body, and Back / Next actions. It takes a typed `steps` array
  (`{ title, body? }`). Open state and step index are uncontrolled by default or
  controlled with `open` / `onOpenChange` and `step` / `onStepChange`; the final
  action calls `onFinish`, and skip / `Escape` call `onSkip`. `placement` anchors
  the bubble (`bottom` default); `skippable` (default `true`) shows the
  skip / dismiss control.

Pen models extra parts — Drawer `resizable`, Sheet `snap heights` / `destructive
item`, Floating Panel `docked` / `resizable` / `dragging`, Tour `target
highlight` — the slots above cover the parts that carry layout or colour. Drag,
resize, snap heights, target highlighting and session persistence are out of
scope.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`, `semantic/shadow/*`, `semantic/overlay/*`)
on top of the numeric matrix the code foundation ports. Each role alias was
resolved to the closest token; the shared aliases from batches 1–8 carry over.

### Shared role aliases

| Pen role (resolved from `variables`) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/overlay` | `white` / `neutral.800` | `semantic.common.50.background` | light near-exact; dark one step |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | light near-exact; dark one step |
| `surface/hover` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact; dark one step |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `border/strong` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact; dark one step |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `text/disabled` | `neutral.400` / `neutral.600` | `semantic.common.400.background` | exact, both themes |
| `action/primary-bg` | `green.700` / `green.700` | `semantic.brand.700.background` | light exact; dark one step |
| `action/primary-fg` | `white` / `white` | `semantic.common.50.background` | inverse foreground pair |
| `action/secondary-border` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact; dark one step |
| `action/secondary-bg-hover` | `neutral.100` / `neutral.700` | `semantic.common.100.background` | light exact; dark one step |
| `shadow/500` | `#0F172A30` / `#0000008F` | `semantic.shadow.500` | exact |

### Per-master values

- **Drawer**: 360px wide, `surface/overlay`, `border/subtle`, radius `lg` and a
  `0 12px 32px` `shadow/500`. The header pads `20 / 20 / 12 / 20` (`x8` gap; `x10`
  inline, `x10` top, `x6` bottom) and its title is `lg` / `semibold`; the 18px
  close glyph steps up to `md` (20px) as in `Dialog`. The body pads inline `x10`
  with a `x8` bottom and a 12px (`x6`) gap. The footer has a top `border/subtle`,
  gaps 12px (`x6`) and pads `16 / 20 / 20 / 20`. Only the inner edge is rounded so
  the outer edge stays flush with the viewport.
- **Sheet**: the Pen specimen is 420px wide with a `[16, 16, 0, 0]` top radius, a
  `border/subtle` border and a `0 -8px 32px` `shadow/500` for the bottom edge.
  The header pads `18 / 20 / 10 / 20` (`18px` is a literal; the `xN` scale cannot
  express it) with a `x8` gap; the body pads inline `x10`; the footer gaps 12px
  and pads `16 / 20 / 20 / 20`. The bottom/top sheets span the viewport width and
  round their inner corners; the left/right sheets are 360px wide and full height.
- **Floating Panel**: 320px wide, `surface/overlay`, `border/subtle`, radius `lg`
  and a `0 12px 32px` `shadow/500`. The content pads 14px (literal) with a 12px
  (`x6`) gap. The head row gaps 8px (`x4`): a 16px `sliders-horizontal` glyph in
  `text/secondary`, a `sm` / `semibold` title in `text/primary` and the collapse
  control in `text/tertiary`. The body stacks `children` with a 12px gap. The
  corner inset is 20px (`x10`).
- **Tour**: 340px wide, `surface/overlay`, `border/subtle`, radius `lg` and a
  `0 12px 32px` `shadow/500`. The content pads 16px (`x8`) with an 8px (`x4`) gap;
  the step counter is `xs` / `regular` in `text/tertiary` with wide tracking, the
  title is `md` / `semibold` in `text/primary` and the body `sm` in
  `text/secondary`. The footer has a top `border/subtle`, gaps 10px (`x5`) and
  pads `12 / 16 / 16 / 16` (`x6` / `x8`). Progress dots sit 6px (`x3`) apart; the
  active dot is a 16px (`x8`) pill in `action/primary-bg`, the rest are 6px
  (`x3`) circles in `border/strong`. Back is the quiet secondary action (disabled
  on the first step) and Next is the primary action; both are 40px (`x20`) with
  16px (`x8`) inline padding.

## Icons

Two new filled glyphs were imported through the asset pipeline, never hand-edited:

```sh
mise run icons:build -- --from <raw-dir>   # minus, plus
mise run icons:check                        # ✓ 32 icons up to date
```

- Sources: Material Symbols (outlined) single-path exports in the canonical
  `0 -960 960 960` viewBox, matching the existing `folder` / `palette` glyphs.
- Codepoints continue after the existing maximum: `minus` `0xE01F`, `plus`
  `0xE020`. Every existing key keeps its codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.
- Use: the Floating Panel collapse control swaps `minus` (expanded) and `plus`
  (collapsed). The remaining glyphs are existing: `sliders-horizontal` (panel
  mark) and `x` (close controls).

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all four are `theme.slotRecipes`, appended after Alert Dialog in the order
  `drawer`, `sheet`, `floatingPanel`, `tour`). The recipe list
  (`icon`, `dividerRule`, `skeleton`, `spinner`) is unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 42 to 46.
- `panda.config.ts`: `staticCss.recipes` gains `drawer` (`side`), `sheet` (`side`),
  `floatingPanel` (`placement`) and `tour` (`placement`, `current`), because the
  extractor cannot resolve the variables passed to the recipe calls. This follows
  the existing `menu`, `treeItem`, `carousel` and overlay declarations.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed in the overlays row (a right Drawer
  with footer actions, a bottom Sheet with a handle, a collapsible Floating Panel
  and a three-step Tour), so Knip sees real usage.

## Files

New, per component (`drawer`, `sheet`, `floating-panel`, `tour`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/minus.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/plus.svg` (new canonical source)
- `src/shared/components/icon/assets/font/icon.woff2` (rebuilt)
- `src/shared/components/icon/manifest.generated.ts` (rebuilt)
- `panda.config.ts`
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run icons:build -- --from <raw>` | imported `minus`, `plus`; 32 icons, 2 new |
| `mise run icons:check` | ✓ icons up to date (32 icons) |
| `mise run gen` | ✓ codegen + cssgen (312 files extracted) |
| `mise run fix:all` | ✓ lint clean, 6 files reformatted |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (450 unit / 226 browser) |
| `mise run check:deps` | ✓ Knip clean |

The generated CSS contains the new classes (`drawer__panel`, `sheet__handle`,
`floatingPanel__collapse`, `tour__dot`, …) and the runtime variant classes
(`drawer__panel--side_left`, `sheet__panel--side_right`,
`floatingPanel__panel--placement_top-left`, `tour__surface--placement_right`,
`tour__dot--current_true`, …). The manifest and font diffs are additive only.

## Accessibility

- Drawer and Sheet are modal `role="dialog"` surfaces with an accessible name
  (`aria-labelledby`) and optional description (`aria-describedby`); they expose
  `aria-modal` only while a scrim is shown, and the close control receives
  `autoFocus`. The scrim dismisses them and `Escape` closes them.
- Floating Panel is a named landmark (`role="region"` + `aria-label`); the
  collapse control exposes `aria-expanded`, and both collapse and close controls
  have accessible names. `Escape` closes the panel, and focus is never stolen on
  mount (matching Pen's content rule).
- Tour is a named `role="dialog"` bubble; the visible "Step n of m" counter and
  the dots (decoratively `aria-hidden`) report progress. The Back action is
  disabled on the first step, the final action reads Finish, and the skip control
  has an accessible name. `Escape` skips.
- Behaviour gaps are deliberate: no focus trap, no focus return and no scroll
  lock (see below).

## Approximations and concerns

- **No scrim token (Drawer, Sheet).** `semantic/overlay/scrim` has no code
  equivalent, so the overlay is the fixed literal `rgba(15, 23, 42, 0.72)`, as in
  `Dialog` / `Alert Dialog`. It matches Pen's light value (`#0F172AB8`) and stays
  dark in the dark theme (Pen dark is pure black `0.80`). Adding a semantic scrim
  token is the clean follow-up.
- **Radius `lg` and edge rounding.** The code radii stop at `md`, so every Pen
  `radius/lg` maps to `md`. The Pen Drawer master is a free-floating specimen with
  uniform corners; because the code Drawer is edge-anchored, only its inner
  corners are rounded and the outer edge stays flush. Sheet keeps Pen's
  bottom-anchored `[top, top, 0, 0]` radius for bottom/top and mirrors it for
  left/right.
- **Sheet width and off-scale literals.** Pen's Sheet specimen is 420px wide; the
  real component spans the viewport width for bottom/top (matching the documented
  "keeps the same width as the viewport") and is 360px wide for left/right. The
  Sheet header's 18px top padding and the Floating Panel's 14px padding and 320px
  width are literals because the `xN` scale cannot express them.
- **Floating Panel is static.** Pen allows dragging, resizing and session
  persistence; the port pins the panel to a viewport corner and keeps it static.
  The `dragging` state is presentational only in Pen and is out of scope.
- **Tour target highlight.** Pen names a `target highlight`, but the master is
  only the 340px bubble and highlighting requires target geometry the component
  does not own, so it is out of scope. The bubble is anchored to its positioning
  root by `placement`.
- **Normalised Tour actions.** Pen's `Back` is the 40px Action master and `Next`
  overrides to 32px; both are normalised to the repo's 40px (`x20`) action height.
  Pen uses a mono family for the step counter; the code foundation ships no mono
  token, so it reads the body family (carried from batches 1–8).
- **Runtime variants.** `side`, `placement` and `current` are passed as runtime
  variables, so `panda.config.ts` declares them in `staticCss`; without that the
  extractor emits only the base slots.
- **Fixed positioning instead of portals.** Every surface is viewport-fixed and
  rendered in place, with no focus trap, focus return or scroll lock; only the
  Drawer / Sheet close control takes `autoFocus`. This is the documented
  simplification shared with `Dialog` / `Alert Dialog`.
