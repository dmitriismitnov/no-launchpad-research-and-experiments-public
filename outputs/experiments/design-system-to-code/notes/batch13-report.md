# Batch 13 report: Theme Switch Preview, Asset Icon Tile, Card Plain and Card Compact from the Pen design system

**Date:** 2026-10-02
**Commit:** `feat: port Theme Switch Preview, Asset Icon Tile and Card variants from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `node`).
**Branch:** current worktree (no branch or worktree switch).
**Model:** `deepseek/deepseek-flash` (single model performed implementation and self-audit; no independent cross-model review available).

## Components ported

Two new public React + PandaCSS components plus a new `Card` variant axis. The
two non-Card masters ship a preset, component, barrel, composition test and
Storybook story; `Card Plain` / `Card Compact` extend the existing `Card`
component instead of duplicating it (decision below).

| Component | Pen master (id) | Recipe key | Anatomy |
| --- | --- | --- | --- |
| Theme Switch Preview | `Theme Switch Preview` frame `q5xZR3` | `themeSwitchPreview` (slot) | root / sun / moon |
| Asset Icon Tile | `Asset Icon Tile` frame `pt3X0` (glyph box) | `assetIconTile` (single) | one root element |
| Card `plain` | `Card Plain` frame `vTMbw` | `card` (existing, new `variant` axis) | existing card slots |
| Card `compact` | `Card Compact` frame `XqPjN` | `card` (existing, new `variant` axis) | existing card slots |

The masters live in `01 Foundation — Theme comparison` (`Theme Switch Preview`),
`Assets — Icons — Icon inventory` (`Asset Icon Tile`) and
`09 Components — Content & data — Masters (library)` (`Card Plain`,
`Card Compact`).

## API shape

- **Theme Switch Preview** is a small theme control: a raised pill with a `sun`
  glyph, the shared `Switch`, and a `moon` glyph. `theme` + `onThemeChange` is
  controlled; `defaultTheme` is uncontrolled (default `light`). `label` names
  the underlying switch (default `"Dark theme"`) and `disabled` forwards to it.
  The component only reports the selected theme; the consumer owns the previewed
  surface. The active glyph paints from the brand role, the inactive one from
  `text/tertiary`.
- **Asset Icon Tile** frames one icon: `name` is an `IconName`, `label` promotes
  the glyph to a labelled `role="img"` (omitted means decorative). The tile owns
  the surface; the glyph is the shared `Icon` at `md` size and inherits the
  tile's colour.
- **Card** gains a public `variant` axis: `default` (media card, unchanged),
  `plain` (media-less text card) and `compact` (media-less dense metadata card).
  `plain` and `compact` never render the media slot, even when `media` is
  supplied.

### Card Plain / Card Compact as variants (decision)

The task asked to decide between duplicated components and a variant axis. The
variant axis was chosen: the three Pen masters share the same anatomy (root,
body, header, title, description, footer and action) and differ only in whether
the media surface is present and in body density. A second and third component
would duplicate the whole API, the DOM contract and the accessibility work for
no gain. `Card` therefore keeps one recipe and one component.

`default` stays the base recipe (selecting it emits no variant class), so every
pre-existing `Card` test, story and snapshot is unchanged. `plain` / `compact`
select their variant classes at runtime; `panda.config.ts` `staticCss` emits
them. `Card.test.ts` changed only its "public variants" assertion to describe
the new axis; all behavioural tests still pass untouched.

## Pen → code mapping

The shared role aliases from batches 1–12 carry over unchanged:
`surface/raised` / `surface/overlay` → `common.50.background`,
`surface/sunken` → `common.100.background`, `border/subtle` →
`common.200.divider`, `border/strong` → `common.50.border.strong`,
`text/primary` → `common.50.text`, `text/secondary` →
`common.700.background`, `text/tertiary` → `common.600.background`,
`text/disabled` → `common.400.background`, `text/link` →
`brand.700.background`, `action/primary-bg` → `brand.700.background`.

### Per-master values

- **Asset Icon Tile**: Pen draws a 40px (`x20`) `surface/sunken` box, `sm`
  radius, centred, with a 22px glyph in `text/primary`. The port keeps the 40px
  square, `common.100.background`, `common.200.divider` border (`x20`, `sm`
  radius) and frames the shared `Icon` at `md` (20px). Pen's 22px glyph is off
  the icon scale.
- **Theme Switch Preview**: Pen's master is a 420px preview block (head with an
  18px `moon` glyph in `text/link`, a `md`/semibold `Theme preview` title and a
  `theme` badge, followed by buttons, input, badges, card and tabs). The port
  keeps the control-sized essence — a raised pill (`surface/raised`,
  `border/strong`, `full` radius, `x2`/`x4` padding, `x4` gap) with `sun` /
  `moon` and the shared `Switch`. Pen's preview surface composition belongs to
  the landing, not to the control.
- **Card Plain**: 320px, `surface/raised`, `border/subtle`, `lg` radius
  (foundation has no `lg`, so the shared `md` radius is used), 16px body
  padding, 10px (`x5`) body gap, `md` title, `sm` description and an undivided
  footer. The port reuses the existing card base and overrides `body.gap` and
  the footer divider; the header/footer notes and the action button already
  cover Pen's meta / link row.
- **Card Compact**: 280px, same surface, 16px body padding, 6px (`x3`) body
  gap, `sm` title and `xs` description, no footer. The port overrides
  `body.gap`, `title.fontSize` and `description`.

## Icons

Two new glyphs were added through the icon pipeline, bringing the committed
manifest from 36 to **38**:

- `sun` → `Theme Switch Preview`
- `moon` → `Theme Switch Preview`

`mise run icons:check` is green (`✓ icons up to date (38 icons)`) and the
manifest/font are committed.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (`assetIconTilePreset` and `themeSwitchPreviewPreset` appended after
  `editablePreset`). `assetIconTile` is a `theme.recipes` entry,
  `themeSwitchPreview` a `theme.slotRecipes` entry.
- `src/shared/styles/presets.test.ts`: recipe imports; forward and reversed
  slot-recipe lists (`themeSwitchPreview` appended / prepended); recipe lists
  (`assetIconTile` appended / prepended); the `toBeDefined` and `toEqual`
  assertions.
- `panda.config.ts`: `staticCss.recipes` gains `card` (`variant` `plain`,
  `compact`) and `themeSwitchPreview` (`theme` `light`, `dark`; `disabled`
  `true`) for their runtime variants.
- `knip.jsonc`: both component `index.ts` files added as entry points.
- `src/app/App.tsx`: both components and both new Card variants are composed
  (three Asset Icon Tiles in the status row, a plain and a compact Card, and a
  light + dark Theme Switch Preview next to the forms `Switch`), so Knip sees
  real usage.

## Files

New, per component (`asset-icon-tile`, `theme-switch-preview`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `panda.config.ts`
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`
- `src/shared/components/card/card.tsx`
- `src/shared/components/card/preset.ts`
- `src/shared/components/card/index.ts`
- `src/shared/components/card/Card.test.ts`
- `src/shared/components/card/Card.composition.test.tsx`
- `src/shared/components/card/Card.stories.tsx`
- `src/shared/components/icon/assets/svg/{sun,moon}.svg`
- `src/shared/components/icon/assets/font/icon.woff2`
- `src/shared/components/icon/manifest.generated.ts`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run gen` | ✓ codegen + cssgen (423 files extracted) |
| `mise run fix:format` / `fix:lint` | ✓ clean |
| `mise run check` | ✓ lint, types, format, icons (38), fonts (2), unit (635) + browser (389) |
| `mise run check:deps` | ✓ Knip clean |

The generated CSS contains the new classes (`assetIconTile`,
`themeSwitchPreview__root`, `themeSwitchPreview__sun--theme_light`,
`themeSwitchPreview__root--disabled_true`, `card__body--variant_plain`,
`card__title--variant_compact`, …) and the runtime variant classes emitted
through `staticCss`.

## Accessibility

- **Theme Switch Preview** reuses `Switch`, so the native checkbox with
  `role="switch"` and `aria-checked` owns the interaction and keyboard support.
  `label` becomes the control's `aria-label`; `disabled` disables the input. The
  sun/moon glyphs are decorative (`aria-hidden`).
- **Asset Icon Tile** is a decorative frame by default; passing `label` promotes
  the glyph to `role="img"` with an accessible name. Native span attributes pass
  through.
- **Card** keeps its existing contract: one `<article>` with an `h3`, optional
  header / description / footer, and a `Button`-created action. The `plain` and
  `compact` variants change density only and do not alter the semantics.
- Focus treatment for the theme control comes from the shared `Switch` focus
  ring (`semantic.brand.500.background`), matching `Button` / `Input`.

## Approximations and concerns

- **Theme Switch Preview is the control, not the whole preview block.** Pen's
  `q5xZR3` is a large showcase surface; the port deliberately implements the
  small reusable control the task described and leaves the previewed surface to
  the consumer/landing. The master's `theme` badge and `Theme preview` heading
  are not part of the control.
- **No light/dark glyph colours in Pen.** The master encodes no active/inactive
  icon colours, so the port uses the shared brand role for the active glyph and
  `text/tertiary` (via `common.500.background`) for the inactive one.
- **Asset Icon Tile is the glyph box only.** Pen's tile also carries metadata
  rows (key, source `U+…`, usage count, consumers). Those belong to the icon
  inventory composition; the port exposes the reusable frame and documents the
  omission.
- **Card `lg` radius.** Pen's Card masters use an `lg` radius; the foundation
  only ships `sm` / `md`, so the shared `md` radius is reused (as with the
  File Upload dropzone in batch 12).
- **Card footer divider.** Pen's plain/compact masters have no footer rule; the
  port removes the base `Card` divider for both variants.
- **Card Plain header action.** Pen draws a 16px `ellipsis` glyph as the plain
  card's action. The port reuses the existing header `icon` contract (and the
  `Button` action) instead of introducing a one-off ellipsis glyph; the glyph
  can be added through the icon pipeline if a consumer needs it.
- **Card media on plain/compact.** Supplying `media` with a non-default variant
  is ignored: those masters have no media surface.
- **Mono face.** Pen renders the compact badge and the asset tile source in a
  mono face; the foundation ships only `body`, so the port composes `body` at
  the nearest size.
