# Batch 4 report: five layout & data components from the Pen design system

**Date:** 2026-10-02
**Commit:** `3018e8b0856f39b65a8b432a7d5e491a319cce4b`
**Message:** `feat: port Data Table, Scroll Area, Splitter, Media Placeholder, QR Code from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only, inspected through the Pencil MCP `execute`/`Get` API).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Five public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All five are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Data Table | `Data Table` frame `FZPkF` + `Table Row` `M2LZ59` | slot `dataTable` | root / head / headCell / row / cell / cellLead / cellEnd |
| Scroll Area | `Scroll Area` frame `pHjwJ` | slot `scrollArea` | root / viewport |
| Splitter | `Splitter` frame `U4KfQj` | slot `splitter` | root / pane / paneStart / paneEnd / handle / grip |
| Media Placeholder | `Media Placeholder` frame `SX6Gf` | slot `mediaPlaceholder` | root / icon / label |
| QR Code | `QR Code` frame `kQTMg` | slot `qrCode` | root / grid / cell / cellFilled |

### API shape

- **Data Table** maps typed `columns` + `rows` onto a real `<table>` (`thead` /
  `tbody` / `th[scope=col]` / `td`). This mirrors the declarative `items` array of
  `List` / `Timeline` from batch 3 and keeps the anatomy closed. Pen models the
  body as the reusable `Table Row` master, but a `rows` array is the simpler,
  more consistent API. No sorting, selection or pagination behaviour.
- **Scroll Area** takes children. It is a layout primitive, so children are the
  natural API; the `label` prop turns the viewport into a named `region`.
- **Splitter** takes `start` / `end` ReactNode slots and `orientation`.
- **Media Placeholder** takes an optional `icon` and `label`.
- **QR Code** takes only an accessible `label`; the pattern is fixed.

## Pen → code mapping

Pen carries a newer **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/feedback/*`) on top of the numeric matrix the code
foundation ports. Each master role alias was resolved to the closest token in the
matrix; the shared aliases from batch 3 carry over.

### Shared role aliases

| Pen role (master) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | light exact, dark one step |
| `surface/sunken` | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact, dark one step |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `border/strong` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact, dark same family |

### Per-master values

- **Data Table**: root raised surface + subtle boundary, `radius/lg` -> literal
  `1rem`; header `surface/sunken`, 44px, inline padding `x8` (16px, exact);
  body rows 52px, inline padding `x8`, bottom rule `common.200.divider`
  (`semantic/common/200/divider` in the master). The header ends and the final
  row ends are rounded explicitly so the surface closes as one card even though
  tables do not reliably clip to `overflow: hidden`.
- **Table Row** (folded into `row` / `cell`): 52px, gap 16px, inline padding
  16px, `align-items: center`, bottom rule. The leading select icon and trailing
  action icon are out of scope (no selection/action behaviour); the master's
  disabled `Check` icon is `enabled: false` anyway.
- **Scroll Area**: root raised surface + subtle boundary, `radius/md`. The
  content viewport scrolls with native `overflow-y` and restyles the platform
  scrollbar: a 10px webkit track (`x5`) with a 4px thumb produced by a 3px
  transparent border and `background-clip: padding-box`, plus the standard
  `scrollbar-width: thin` / `scrollbar-color` pair for Firefox. The thumb paints
  `common.50.border.strong` (`border/strong`), matching the Pen `Thumb`.
- **Splitter**: root raised surface + subtle boundary, `radius/md`; start pane
  `surface/sunken`, end pane `surface/raised`; the 10px handle (`x5`) carries a
  2px grip (`x1` x `x20`) in `common.50.border.strong` (`border/strong`). The
  divider is a static `role="separator"`; `aria-orientation` flips with the axis.
- **Media Placeholder**: `surface/sunken` + subtle boundary, `radius/md`,
  `aspect-ratio: 16 / 9`, gap `x4` (8px, exact), centred glyph and caption in
  `common.600.background` (`text/tertiary`).
- **QR Code**: raised surface + subtle boundary, `radius/md`, 7x7 module grid,
  8px padding (`x4`, exact). Filled modules paint `common.50.text`
  (`text/primary`), exactly as the Pen `M` rectangles.

## QR Code pattern

The Pen master is a fixed 7x7 module matrix (`R0`–`R6`, each 7 modules), with
eight transparent modules. The component stores that bitmap verbatim:

```txt
1110111
1111111
1111111
0110110
1111101
1111011
1110110
```

**Decision:** render a deterministic CSS grid, not a real encoder. The Pen master
is decorative and data-free, so adding a QR encoding dependency would add weight
with no benefit. A scannable code is explicitly out of scope; a consumer that
needs one should use a dedicated QR library. The placeholder is exposed with
`role="img"` and a default `aria-label` (`QR code placeholder`), and the grid is
`aria-hidden`.

## Icons

The Media Placeholder glyph is the only new icon. Pen uses lucide `image`; the
canonical icon pipeline is fill-based, so a Material Symbols (outlined) `image`
single-path export was imported through the asset pipeline (never hand-edited):

```sh
mise run icons:build -- --from <raw-dir>   # imported image
mise run icons:check                        # ✓ 22 icons up to date
```

- Codepoints continue after the existing maximum: `image` `0xE016`. Every
  existing key keeps its codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.
- Pen's `square`, `ellipsis` and `sort` glyphs (Data Table) and its lucide
  `image` shape are not added as-is: the selection/action columns are out of
  scope and the image glyph is mapped to the closest canonical glyph.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all five are `theme.slotRecipes`; appended after Clipboard in the order
  `dataTable`, `scrollArea`, `splitter`, `mediaPlaceholder`, `qrCode`).
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed so Knip sees real usage.

## Files

New, per component (`data-table`, `scroll-area`, `splitter`,
`media-placeholder`, `qr-code`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/image.svg` (new canonical source)
- `src/shared/components/icon/assets/font/icon.woff2` (rebuilt)
- `src/shared/components/icon/manifest.generated.ts` (rebuilt)
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run icons:build -- --from <raw>` | imported `image`; 22 icons |
| `mise run icons:check` | ✓ 22 icons up to date |
| `mise run gen` | ✓ codegen + cssgen (197 files extracted) |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (298 unit / 122 browser) |
| `mise run check:deps` | ✓ Knip clean |

`mise run fix:format` reformatted 7 files before the checks; `mise run
check:format` is a no-op on the committed tree. The generated CSS confirms the
scrollbar theme reference resolves to
`var(--colors-semantic-common-50-border-strong)`.

## Accessibility

- Data Table renders real table semantics: `<table>` / `<thead>` / `<tbody>`,
  `<th scope="col">` header cells and `<td>` body cells, so screen readers keep
  the row/column relationship. `aria-label` is forwarded to the table.
- Scroll Area's viewport is focusable (`tabIndex={0}`) so a keyboard user can
  scroll it; passing `label` also gives it `role="region"` and an accessible
  name. No scrollbar is simulated, so wheel, touch, keyboard and scroll
  anchoring keep working.
- Splitter's divider is `role="separator"` with the correct `aria-orientation`;
  the grip is `aria-hidden`. There is no drag affordance to announce.
- Media Placeholder is purely decorative unless a label is supplied; the `Icon`
  stays decorative (`aria-hidden`) and inherits the muted text role.
- QR Code is a labelled `role="img"`; its decorative grid is `aria-hidden`.

## Approximations and concerns

- **Data Table scope.** Pen's toolbar (title, search, add), footer ("3 of 64
  components", pager) and the leading selection column are omitted: the task
  calls for a presentational table with no sorting or pagination. The status
  column's per-row colour (positive / link / tertiary) is not modelled; all
  non-leading cells read `text/secondary` and the first column can be marked
  `emphasis: "primary"`. Per-cell tones are a possible future extension.
- **Data Table radius.** Pen's `radius/lg` (16px) has no foundation token, so
  `1rem` is the literal equivalent (the EmptyState convention). Header/row end
  radii are set explicitly because `overflow: hidden` on a table is not reliably
  honoured.
- **Scroll Area sizing.** Pen fixes the surface at 260x170. The component is a
  reusable primitive instead: the consumer sizes it, with a `maxHeight` default
  of `10rem`. The content padding is `x6` (12px) because the scale has no `x7`
  (Pen's 14px).
- **Scrollbar fidelity.** The webkit scrollbar reproduces Pen's 10px track and
  4px inset thumb closely; Firefox falls back to the standard thin scrollbar
  themed with `scrollbar-color`, which cannot match the inset thumb exactly.
- **Splitter pane surfaces.** The start pane is sunken and the end pane raised,
  matching the master's "Editor" / "Preview" example. The panes are consumer
  content; only the surface and base text role are owned by the recipe.
- **Splitter is static.** There is no drag handle: Pen's master is a static
  two-pane specimen and the task requests static panes only.
- **Media Placeholder glyph size.** Pen draws a 28px glyph; `Icon` sizes top out
  at `lg` (24px), so the glyph steps down one size.
- **QR Code module gap.** Pen spaces modules 3px; the `xN` scale has no 1.5 step,
  so the grid gap is `x1` (2px). The surface is a fixed 84x84 square so the
  placeholder has a stable footprint.
- **Mono font gap (carried from batches 1–3).** Pen's `font/mono` still has no
  code token; none of these five components need mono, so the gap is untouched.
