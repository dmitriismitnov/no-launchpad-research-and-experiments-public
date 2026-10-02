# Batch 8 report: Tooltip, Popover, Hover Card, Dialog and Alert Dialog from the Pen design system

**Date:** 2026-10-02
**Commit:** `7f77e8f4d7e0722ab6a83d8364637f779f133d52`
**Message:** `feat: port Tooltip, Popover, Hover Card, Dialog, Alert Dialog from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `node`).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Five public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All five are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Tooltip | `Tooltip` frame `eEhwI` | slot `tooltip` | root / trigger / surface / label / shortcut |
| Popover | `Popover` frame `Qwced` | slot `popover` | root / trigger / surface / content / title / description |
| Hover Card | `Hover Card` frame `l7aEf` | slot `hoverCard` | root / trigger / surface / content / user / avatar / initials / meta / name / role / bio / actions |
| Dialog | `Dialog` frame `UJUPb` | slot `dialog` | root / trigger / overlay / surface / header / title / close / body / description / footer |
| Alert Dialog | `Alert Dialog` frame `FiHft` | slot `alertDialog` | root / trigger / overlay / surface / header / icon / title / close / body / description / footer / cancel / confirm |

The reusable masters live in
`07 Components — Overlays — Components — Overlays — Masters (library)`. The
per-component documentation frames (`Components — Overlays — Tooltip` / `Popover`
/ `HoverCard` / `Dialog` / `AlertDialog`) supplied the public variants (Tooltip
`placement`; Popover `placement`, with header; Hover Card `with avatar`,
`with actions`, `placement`; Dialog `size: sm · md · lg`, `with close control`;
Alert Dialog `destructive`, `with icon`, `with close control`). The small
`Tooltip`/`Popover`/… chips in `02 Components — Overview` are navigation map
labels, not the masters.

### API shape

All five follow the established overlay pattern: `open` / `defaultOpen` state with
plain React `useState`, optional `onOpenChange`, no portals and no headless
library. Each surface renders in place, positioned relative to its trigger.

- **Tooltip** wraps its trigger and shows a labelled `role="tooltip"` surface on
  hover or focus (`onMouseOver` / `onMouseOut` / `onFocus` / `onBlur`); `Escape`
  hides it. `placement` (`top` default) anchors the surface; an optional
  `shortcut` renders the trailing hint. The trigger is focusable and carries
  `aria-describedby` while the tooltip is open.
- **Popover** renders its `trigger` as a button (`aria-haspopup="dialog"`,
  `aria-expanded`) and toggles a `role="dialog"` surface with an optional
  `title` / `description` header and arbitrary `children`. It closes on `Escape`,
  on a trigger press and on an outside pointer press (a document `pointerdown`
  listener), and is anchored by `placement` (`bottom` default).
- **Hover Card** behaves like Tooltip but previews a person: `name`, optional
  `role`, `bio`, `initials` (derived from `name` when omitted), an optional
  `actions` node and `placement`. It is shown on hover/focus and hidden on
  blur/leave or `Escape`.
- **Dialog** is a centered `role="dialog"` surface over a scrim with a title,
  optional description and body `children`, an optional close control and
  `actions` in the footer. `size` (`md` default) selects the width; the scrim,
  `Escape` and the close control dismiss it.
- **Alert Dialog** is a centered `role="alertdialog"` with a warning icon
  (overridable), title, description and a built-in cancel/confirm footer. The
  `destructive` variant repaints the confirm action with the danger role, blocks
  scrim/`Escape` dismissal and keeps focus on the safer cancel action.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`, `semantic/tooltip/*`,
`semantic/overlay/*`) on top of the numeric matrix the code foundation ports.
Each role alias was resolved to the closest token; the shared aliases from
batches 1–7 carry over.

### Shared role aliases

| Pen role (resolved from `variables`) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/overlay` | `white` / `neutral.800` | `semantic.common.50.background` | light near-exact; dark one step |
| `surface/sunken` (nav chips) | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact; dark one step |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `tooltip/bg` | `neutral.900` / `neutral.800` | `semantic.common.900.background` | light exact; dark inverts |
| `tooltip/fg` | `neutral.50` / `neutral.50` | `semantic.common.900.text` | light exact |
| `feedback/negative-fg` | `red.700` / `red.300` | `semantic.negative.700.background` | exact |
| `brand/100/background` | `green.100` / `green.900` | `semantic.brand.100.background` | exact |
| `brand/100/text` | `green.900` / `green.50` | `semantic.brand.100.text` | exact |
| `shadow/500` | `#0F172A30` / `#0000008F` | `semantic.shadow.500` | exact |
| `shadow/600` | `#0F172A3D` / `#000000A3` | `semantic.shadow.600` | exact |
| `action/danger-bg` | `red.600` / `red.600` | `semantic.negative.600.background` | light exact; dark one step |
| `action/danger-fg` | `white` / `white` | `semantic.negative.600.text` | light exact; dark one step |

### Per-master values

- **Tooltip**: the surface is `tooltip/bg` with a 1px radius (`radius/sm`), an 8px
  gap (`x4`) and 6px / 10px padding (`x3` / `x5`); the label is `xs` / `medium` in
  `tooltip/fg` and the optional shortcut is `xs` / `regular` (Pen mono). No arrow.
- **Popover**: 280px wide, `surface/overlay`, `border/subtle`, radius `lg` and a
  `0 12px 32px` `shadow/500`. The content pads 16px (`x8`) with an 8px (`x4`) gap;
  the title is `sm` / `semibold` in `text/primary` and the body `sm` in
  `text/secondary`.
- **Hover Card**: 300px wide, `surface/overlay`, `border/subtle`, radius `lg` and
  a `0 12px 32px` `shadow/500`. The content pads 16px (`x8`) with a 10px (`x5`)
  gap; the user row gaps 10px; the 36px pill avatar reads `brand/100`, its
  initials `sm` / `semibold`; the meta stacks with a 2px (`x1`) gap; the name is
  `sm` / `semibold`, the role `xs` / `text/tertiary` and the bio `sm` /
  `text/secondary`.
- **Dialog**: 440px wide, `surface/overlay`, `border/subtle`, radius `lg` and a
  `0 12px 32px` `shadow/500`. The header pads `20 / 20 / 12 / 20`
  (`x10` inline, `x10` top, `x6` bottom) with a 16px (`x8`) gap; the title is
  `lg` / `semibold`; the 18px close glyph steps up to `md` (20px); the body pads
  inline `x10`; the footer gaps 12px (`x6`) and pads `x10`.
- **Alert Dialog**: 420px wide, radius `lg` and a `0 12px 32px` `shadow/600`.
  The header gaps 12px (`x6`); the 20px warning glyph reads
  `feedback/negative-fg`; the body and title match Dialog. The footer gaps 12px
  and pads `x10`; cancel is the quiet secondary control and confirm is the
  primary/danger control, both 40px tall (`x20`) with 16px inline padding (`x8`).

## Icons

One new filled glyph was imported through the asset pipeline, never hand-edited:

```sh
mise run icons:build -- --from <raw-dir>   # triangle-alert
mise run icons:check                        # ✓ 30 icons up to date
```

- Source: Material Symbols (outlined) single-path export in the canonical
  `0 -960 960 960` viewBox, matching the existing `folder` / `palette` glyphs.
- Codepoint continues after the existing maximum: `triangle-alert` `0xE01E`.
  Every existing key keeps its codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.
- Use: the Alert Dialog header defaults to `triangle-alert`; the close controls
  use the existing `x` glyph.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all five are `theme.slotRecipes`, appended after Context Menu in the order
  `tooltip`, `popover`, `hoverCard`, `dialog`, `alertDialog`). The recipe list
  (`icon`, `dividerRule`, `skeleton`, `spinner`) is unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 37 to 42.
- `panda.config.ts`: `staticCss.recipes` gains `tooltip` / `popover` /
  `hoverCard` (all four `placement` values), `dialog` (`sm` / `md` / `lg`) and
  `alertDialog` (`destructive: true`), because the extractor cannot resolve the
  variables passed to the recipe calls. This follows the existing `menu` and
  `treeItem` declarations.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed (a Tooltip-wrapped button, a Hover
  Card on a link, an open Popover, a Dialog with a trigger and footer actions,
  and a destructive Alert Dialog with a trigger), so Knip sees real usage.

## Files

New, per component (`tooltip`, `popover`, `hover-card`, `dialog`,
`alert-dialog`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/triangle-alert.svg` (new canonical source)
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
| `mise run icons:build -- --from <raw>` | imported `triangle-alert`; 30 icons, 1 new |
| `mise run icons:check` | ✓ icons up to date (30 icons) |
| `mise run gen` | ✓ codegen + cssgen (292 files extracted) |
| `mise run fix:all` | ✓ lint clean, 2 files reformatted |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (413 unit / 204 browser) |
| `mise run check:deps` | ✓ Knip clean |

The generated CSS contains the new classes (`tooltip__surface`,
`popover__surface`, `hoverCard__avatar`, `dialog__overlay`, `alertDialog__confirm`,
…) and the runtime variant classes (`tooltip__surface--placement_right`,
`dialog__surface--size_lg`, `alertDialog__confirm--destructive_true`, …). The
manifest and font diffs are additive only.

## Accessibility

- Tooltip and Hover Card are non-focusable `role="tooltip"` surfaces described by
  their focusable trigger (`aria-describedby` while open); they open on focus and
  on hover and dismiss with `Escape`, matching "reachable by focus as well as
  hover".
- Popover's trigger exposes `aria-expanded` / `aria-haspopup="dialog"`; the
  surface is a named `role="dialog"` and closes on `Escape` or an outside press.
- Dialog is a modal `role="dialog"` with an accessible name (`aria-labelledby`)
  and optional description (`aria-describedby`); the close control receives
  `autoFocus`.
- Alert Dialog is a `role="alertdialog"` and starts focus on the cancel action
  ("the safer default"); the destructive confirm is the danger control.
- Behaviour gaps are deliberate: no focus trap, no focus return and no scroll
  lock (see below).

## Approximations and concerns

- **No theme-invariant dark surface (Tooltip).** The code foundation has no
  "inverse surface" role, so `common.900.background` / `common.900.text` gives a
  light-exact tooltip (neutral.900 fill, neutral.50 text) but inverts to a light
  surface in the dark theme. A future foundation pass could add a dedicated
  tooltip/inverse role.
- **No scrim token (Dialog, Alert Dialog).** `semantic/overlay/scrim` has no code
  equivalent, so the overlay is the fixed literal `rgba(15, 23, 42, 0.72)`. It
  matches Pen's light value (`#0F172AB8`) and stays dark in the dark theme
  (Pen dark is pure black `0.80`). Adding a semantic scrim token is the clean
  follow-up.
- **No danger tone on `Button` (Alert Dialog).** `Button` ships only
  `primary` / `secondary` / `ghost`, so the Alert Dialog owns its cancel/confirm
  buttons and reproduces the Pen `Action` geometry (40px tall, 16px inline
  padding) on the `xN` scale. Pen's `action/danger-bg` is `red.600` in both
  themes; the nearest theme-safe filled pair is `negative.600` (red.600 light,
  red.400 dark). Adding a `danger` tone to `Button` would let this converge.
- **Fixed positioning instead of portals.** Both dialogs are viewport-fixed
  (`position: fixed` scrim + centered surface) and render in place. There is no
  focus trap, focus return or scroll lock; only the Dialog close control and the
  Alert Dialog cancel action take `autoFocus`. This is the documented
  simplification.
- **Mono font gap (carried from batches 1–7).** Pen's Tooltip shortcut uses
  `font/mono`, which has no code token; it reads the body family.
- **`radius/lg` and fixed sizes.** The code radii stop at `md`, so every Pen
  `radius/lg` maps to `md`. The Popover's 280px, Hover Card's 300px, Dialog's
  440px and Alert Dialog's 420px widths are literals; the 36px Hover Card avatar
  is likewise a literal (the `xN` scale cannot express them).
- **Runtime variants.** `placement`, `size` and `destructive` are passed as
  runtime variables, so `panda.config.ts` declares them in `staticCss`; without
  that the extractor emits only the base slots. The existing `menu` /
  `treeItem` variants share the same limitation.
- **Popover outside-click.** A small document `pointerdown` listener closes the
  popover (no headless library). It re-subscribes on each render while open; a
  `useCallback`/ref refinement is possible if it ever matters.
