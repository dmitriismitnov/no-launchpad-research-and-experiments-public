# Batch 7 report: Tree Item, Carousel and Context Menu from the Pen design system

**Date:** 2026-10-02
**Commit:** `30f4f4effc4d44142a512d6841d068e091fb93c6`
**Message:** `feat: port Tree Item, Carousel, Context Menu from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `jq`).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Three public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All three are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Tree Item | `Tree Item` frame `RFehj` | slot `treeItem` | root / row / expander / expanderIcon / expanderSpacer / content / icon / label / group |
| Carousel | `Carousel` frame `rm4a0` (controls are the `Icon Button` master `L72UAx`) | slot `carousel` | root / viewport / control / slide / slideGlyph / dots / dot |
| Context Menu | `Context Menu` frame `rokhq` (reuses the `Menu` master `GLufg`) | slot `contextMenu` | root / trigger / surface |

The masters live together in
`Components — Navigation & disclosure — Masters (library)`. The per-component
documentation frames (`… — TreeView` `f4wq6`, `… — Carousel` `hvrFF`,
`… — ContextMenu` `w7EbR`) supplied the public variants and state specimens, and
the `variables` map supplied the resolved role values.

### API shape

- **Tree Item** is one node. It owns its expand/collapse state (uncontrolled by
  default, or controlled with `expanded` / `onExpandedChange`) with plain React
  `useState`. `children` are nested `TreeItem`s: their presence makes the node
  expandable, and they are rendered in a `role="group"` while open. The expander
  is a separate hit area from the selectable row (an `onSelect` callback), as
  Pen requires. `icon`, `selected` and `disabled` are presentational. Nesting is
  carried by structure: a React context feeds `aria-level` and the group applies
  a fixed indent per level, so depth is never skipped.
- **Carousel** is a static, non-autoplaying carousel. It takes a typed
  `slides` array (`{ label, icon?, content? }`) and shows one slide at a time
  between previous/next controls, with a dot per slide. The current index is
  uncontrolled by default, or controlled with `current` / `onCurrentChange`;
  controls are disabled at the bounds, and the active dot is exposed with
  `aria-current="true"`.
- **Context Menu** is the existing `Menu` surface positioned over a trigger
  area. It reuses `Menu` / `MenuItem` / `MenuDivider` for the rows. Open state is
  uncontrolled by default or controlled with `open` / `onOpenChange`; the
  surface opens at the pointer, or at fixed `x` / `y` offsets when given, and
  `Escape` closes it.

Pen models extra parts — Tree View `indent guide` / `root` / `leaf item`,
Carousel `slide label` / `viewport` clipping, Context Menu `group label` /
`check` / `shortcut` / `submenu` (the latter four come from `Menu`) — the slots
above cover the parts that carry layout or colour. Tree View expand-all and
arrow-key navigation, Carousel autoplay / scrollable variants, and Context Menu
nested-submenu flyout and keyboard model are out of scope.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`) on top of the numeric matrix the code
foundation ports. Each role alias was resolved to the closest token; the shared
aliases from batches 1–6 carry over.

### Shared role aliases

| Pen role (resolved from `variables`) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | light near-exact; dark one step |
| `surface/sunken` | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact; dark one step |
| `surface/hover` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact; dark one step |
| `surface/selected` | `green.50` / `green.950` | `semantic.brand.50.background` | exact, both themes |
| `action/secondary-bg` | `white` / `neutral.800` | `semantic.common.50.background` | light near-exact; dark one step |
| `action/secondary-bg-hover` | `neutral.100` / `neutral.700` | `semantic.common.100.background` | light exact; dark one step |
| `action/secondary-border` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact; dark one step |
| `action/secondary-fg` | `neutral.800` / `neutral.100` | `semantic.common.50.icon` | one step |
| `action/primary-bg` | `green.700` / `green.700` | `semantic.brand.700.background` | light exact; dark one step |
| `action/disabled-bg` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact; dark one step |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `text/disabled` | `neutral.400` / `neutral.600` | `semantic.common.400.background` | exact, both themes |
| `text/link` | `green.700` / `green.400` | `semantic.brand.700.background` | light exact; dark one step brighter |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `border/strong` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact; dark one step |
| `focus/ring` | `green.600` / `green.500` | `semantic.brand.500.background` | shared focus convention |

### Per-master values

- **Tree Item**: the row is a transparent `radius/sm` surface with gap 8px
  (`x4`, exact) and padding 6px block / 10px inline (`x3` / `x5`, exact). The
  expander is a 14px chevron in `text/tertiary` that rotates 90° when expanded;
  leaves render a hidden spacer. The optional glyph is 16px in `text/secondary`
  and the label is `sm`/`regular` in `text/primary`. Hover is `surface/hover`,
  the selected node is `surface/selected` with its glyph and label in
  `text/link`, disabled reads `text/disabled`, and focus paints the shared 2px
  `focus/ring` around the row. Nested levels indent 18px.
- **Carousel**: root stacks the media row and the dots with a 12px gap (`x6`,
  exact). The media row is `flex` with a 12px gap. Each control is a 40px square
  (`x20`) in `surface/raised` with a 1px `action/secondary-border`, radius `md`
  and a `chevron` in `action/secondary-fg`; hover is `surface/hover`, disabled is
  `action/disabled-bg` plus `text/disabled`. The slide is `surface/sunken` with a
  1px `border/subtle`, radius `md` and a 200px height. Dots sit 6px apart (`x3`);
  the active dot is a 20px pill (`x10`) in `action/primary-bg`, the rest are 8px
  circles (`x4`) in `border/strong`. Disabled paints the root with
  `action/disabled-bg`.
- **Context Menu**: the positioning root is `position: relative`. The optional
  trigger area is a `surface/raised` surface with a 1px `border/subtle`, radius
  `md`, a 96px minimum height, `context-menu` cursor and an `xs` `text/tertiary`
  caption. The surface is the existing `Menu` card (overlay fill, radius `md`,
  6px padding and shadow) pinned at the pointer or the given offsets, 240px
  minimum width.

## Icons

Two new filled glyphs were imported through the asset pipeline, never
hand-edited:

```sh
mise run icons:build -- --from <raw-dir>   # folder, palette
mise run icons:check                        # ✓ 29 icons up to date
```

- Sources: Material Symbols (outlined) single-path exports in the canonical
  `0 -960 960 960` viewBox, matching the existing chevrons and content glyphs.
- Codepoints continue after the existing maximum: `folder` `0xE01C`, `palette`
  `0xE01D`. Every existing key keeps its codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.
- Use: `folder` and `palette` are the Tree Item glyphs in the story/App examples.
  The Carousel slide glyph is the existing `image`; the controls use the existing
  `chevron-left` / `chevron-right`.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all three are `theme.slotRecipes`; appended after Pagination in the order
  `treeItem`, `carousel`, `contextMenu`). The recipe list (`icon`, `dividerRule`,
  `skeleton`, `spinner`) is unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 34 to 37.
- `panda.config.ts`: `staticCss.recipes.treeItem` and `…carousel` declare their
  runtime variant values (`expanded` / `selected` / `disabled`,
  `current` / `disabled`), because the extractor cannot resolve the variables
  passed to `treeItem({ … })` and `carousel({ … })`. `contextMenu` has no
  variants. This follows the existing `menu` declaration.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed (a Tree Item tree with a selected
  leaf and a disabled leaf, a three-slide Carousel, and a Context Menu over its
  trigger area), so Knip sees real usage.

## Files

New, per component (`tree-item`, `carousel`, `context-menu`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/folder.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/palette.svg` (new canonical source)
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
| `mise run icons:build -- --from <raw>` | imported `folder`, `palette`; 29 icons, 2 new |
| `mise run icons:check` | ✓ 29 icons up to date |
| `mise run gen` | ✓ codegen + cssgen (267 files extracted) |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (377 unit / 178 browser) |
| `mise run check:deps` | ✓ Knip clean |

`mise run fix:all` applied the only reformatting before the checks;
`mise run check:format` is a no-op on the committed tree. The generated CSS
contains the new classes (`treeItem__row`, `carousel__control`,
`contextMenu__surface`, …) and the variant classes
(`treeItem__row--selected_true`, `treeItem__icon--expanded_true`,
`carousel__dot--current_true`, `carousel__root--disabled_true`, …). The manifest
diff is additive only.

## Accessibility

- Tree Item renders `role="treeitem"` with `aria-level`, `aria-selected`,
  `aria-expanded` on parents and `aria-disabled` when disabled. The expander is
  a labelled button (`Expand <label>` / `Collapse <label>`) that controls the
  `role="group"` with `aria-controls`; the selectable row is a separate button.
- Carousel is a named `<section aria-roledescription="carousel">`; the visible
  slide is a `role="group"` whose `aria-label` carries its position
  (`n of total: label`). Controls have accessible names and are disabled at the
  bounds; every dot is a labelled button and the active one is marked with
  `aria-current="true"`.
- Context Menu reuses the `Menu` roles (`menu` / `menuitem` / `separator`); the
  surface carries the consumer-provided `aria-label`, and `Escape` closes it.
  Keyboard navigation and focus management remain the consumer's responsibility.

## Approximations and concerns

- **Icon style (new).** Pen's Tree Item and Carousel glyphs are Lucide
  (`chevron-right`, `folder`, `palette`, `image`, `arrow-left/right`); the code
  set already mixes Lucide-flattened and Material Symbols glyphs, so the two new
  icons are Material Symbols (outlined) and the carousel controls use the
  existing `chevron-left` / `chevron-right` rather than `arrow-left` /
  `arrow-right`.
- **Glyph sizing.** Pen draws the Carousel slide glyph at 32px; the `Icon` scale
  tops out at `lg` (24px). The Tree Item 14px expander steps up to the `x8`
  (16px) expander box.
- **Off-scale literals.** The Tree Item group indent is 18px (the `xN` scale has
  no step); the Carousel slide is 200px tall; the Context Menu trigger is 96px
  tall and its surface 240px wide. These are structure/fixed sizes, consistent
  with other component literals; the 40px control (`x20`), 20px active dot
  (`x10`), 8px dot (`x4`) and all gaps/padding are on-scale and exact.
- **`border/subtle` boundary.** As in batches 3–6 the nearest structural token
  is `common.200.divider` (`neutral.300`/`neutral.700`) rather than Pen's
  `neutral.200`/`neutral.800`.
- **Secondary action roles (new).** Pen's `action/secondary-*` still has no code
  token; the surface maps to `common.50.background`, the border to
  `common.50.border.strong` and the foreground to `common.50.icon`. A future
  foundation pass could add the roles explicitly.
- **Mono font gap (carried from batches 1–6).** Pen's Context Menu trigger
  caption uses `font/mono`, which has no code token; it reads the body family.
- **Tree semantics.** `Tree Item` renders a `div role="treeitem"` (with
  structure-derived `aria-level`), so a consumer wraps a collection in
  `role="tree"`; the row and expander are real buttons, which keeps the two hit
  areas Pen requires while leaving roving-tabindex/arrow-key navigation to a
  consumer.
- **Runtime variants.** The `expanded` / `selected` / `disabled` and `current` /
  `disabled` classes are passed as runtime variables, so `panda.config.ts`
  declares them in `staticCss`; without that the extractor emits only the base
  slots (the existing `accordionItem` `open` variant is affected by the same
  limitation).
