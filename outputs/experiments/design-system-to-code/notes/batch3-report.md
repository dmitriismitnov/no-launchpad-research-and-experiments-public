# Batch 3 report: five data-display components from the Pen design system

**Date:** 2026-10-02
**Commit:** `fc77dac82878835f3a0e45983777768303fa3ef2`
**Message:** `feat: port Statistic, List, Timeline, Code Block, Clipboard from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only, inspected through the Pencil MCP `execute`/`Get` API).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Five public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All five are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Statistic | `statistic` frame `CjnzL` | slot `statistic` | root / label / value / delta / deltaIcon / deltaText |
| List | `list` frame `fgxmm` + `list item` `h9Cf2t` | slot `list` | root / item / itemIcon / itemText / itemTitle / itemMeta / itemTrailing |
| Timeline | `timeline` frame `z4hUE9` + `timeline item` `d5pll` | slot `timeline` | root / item / rail / marker / line / text / title / meta |
| Code Block | `code block` frame `th3Nd` | slot `codeBlock` | root / head / dotNegative / dotNeutral / dotPositive / file / copy / code / line / lineNumber / lineCode |
| Clipboard | `clipboard` frame `Jfhu9` | slot `clipboard` | root / value / copy |

`List` and `Timeline` expose a typed `items` array instead of child components:
the rows are plain data and every optional part disappears when empty. Pen models
the rows as reusable masters (`List Item`, `Timeline Item`), but the collection is
closed, so a typed item prop is the simpler, more declarative API and keeps the
two components consistent.

## Pen → code mapping

Pen carries a newer **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/feedback/*`, `semantic/tooltip/*`) on top of the
numeric matrix the code foundation ports. Each master role alias was resolved to
the closest token in the matrix.

### Shared role aliases

| Pen role (master) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | light exact, dark one step (Card/Tag convention) |
| `surface/sunken` | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact, dark one step (Skeleton/Spinner convention) |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `border/strong` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact, dark same family (code resolves neutral.500) |
| `feedback/positive-fg` | `green.700` / `green.300` | `semantic.positive.700.background` | exact |
| `feedback/negative-fg` | `red.700` / `red.300` | `semantic.negative.700.background` | exact |
| `tooltip/bg` | `neutral.900` / `neutral.800` | `semantic.common.900.background` | light exact, inverts in dark |
| `tooltip/fg` | `neutral.50` / `neutral.50` | `semantic.common.900.text` | paired with the surface in both themes |

### Per-master values

- **Statistic**: root gap `x3` (6px), delta gap `x2` (4px), radius none —
  all exact. Value `font-weight/bold`, `line-height/tight`. Delta icon inherits
  the trend colour through `currentColor`.
- **List**: root padding `x6` (12px) exact, gap `x1` (2px) exact, radius `md`
  (10px) exact, raised surface and subtle boundary. Item gap `x6` (12px) exact;
  item radius `md`.
- **Timeline**: root gap `x4` (8px) exact. Marker 14px with a `thick` (2px)
  strong ring on the raised surface; connector `thick` × `x20` (40px) using the
  divider role.
- **Code Block**: radius `md`; window dots `x4` (8px); head padding block `x5`
  (10px); code rows gap `x6`, padding block `x1` (2px); line number column `x8`
  (16px), right aligned. Surfaces from the inverse `common.900` pair; the muted
  line numbers read `common.900.icon`.
- **Clipboard**: `minHeight x20` (40px) exact, inline padding `x6` (12px),
  gap `x2` (8px), radius `md`, sunken surface, subtle boundary.

## Icons

Pen's masters use `trending-up` (Statistic), `file` / `file-json` / `file-code`
(List) and `copy` (Code Block, Clipboard). Three new filled glyphs were imported
through the asset pipeline, never hand-edited:

```sh
mise run icons:build -- --from <raw-dir>   # imported copy, file, trending-up
mise run icons:check                        # ✓ 21 icons up to date
```

- Sources: Material Symbols (400, outlined) single-path filled SVG exports, which
  satisfy the canonical fill-based contract after normalization (the raw
  `width`/`height` are stripped and the `0 -960 960 960` viewBox is kept).
- Codepoints continue after the existing maximum: `copy` `0xE013`, `file`
  `0xE014`, `trending-up` `0xE015`. Every existing key keeps its codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.

`file-json` / `file-code` were not added: the List story and `App.tsx` use `file`
for every row. `circle-alert` (Clipboard's hidden error state) is not added.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all five are `theme.slotRecipes`, appended after Empty State).
- `src/shared/styles/presets.test.ts`: recipe imports; both slot-recipe lists; the
  `toBeDefined` / `toEqual` assertions; the reversed-order guard.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed so Knip sees real usage.

## Files

New, per component (`statistic`, `list`, `timeline`, `code-block`, `clipboard`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/copy.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/file.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/trending-up.svg` (new canonical source)
- `src/shared/components/icon/assets/font/icon.woff2` (rebuilt)
- `src/shared/components/icon/manifest.generated.ts` (rebuilt)
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run icons:build -- --from <raw>` | imported `copy`, `file`, `trending-up`; 21 icons |
| `mise run icons:check` | ✓ 21 icons up to date |
| `mise run gen` | ✓ codegen + cssgen (172 files extracted) |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (272 unit / 108 browser) |
| `mise run check:deps` | ✓ Knip clean |

`mise run fix:format` reformatted 9 files before the check; `mise run check:format`
is a no-op on the committed tree. The new components were also rendered in a
Chromium screenshot to confirm the three new glyphs paint correctly.

## Accessibility

- Statistic, List, Timeline and Code Block render semantic `<ol>` / `<ul>` /
  `<li>` or labelled structure; the Timeline rail (marker + connector) is
  `aria-hidden`.
- Copy controls on Code Block and Clipboard are real `<button type="button">`
  elements with an `aria-label` (`Copy code` / `Copy`, overridable through
  `copyLabel`) and a visible focus outline.
- Clipboard renders a readonly value display; copy is a consumer `onCopy`
  callback and the component never touches the system clipboard.

## Approximations and concerns

- **Mono font gap (carried from batches 1–2).** Pen's `font/mono` is IBM Plex
  Mono; the code foundation ships only the `body` family, so Code Block,
  Clipboard and the List trailing value use `body`. A future typography pass
  should add a mono token rather than keep this fallback.
- **Code Block surface.** Pen's `semantic/tooltip/bg` is a permanently dark
  surface. The matrix has no such role, so the block uses the inverse
  `common.900` pair: dark with light copy in the light theme (exact), light with
  dark copy in the dark theme. This invert keeps contrast in both themes but
  differs from Pen's always-dark tooltip.
- **Code Block line highlight omitted.** Pen highlights the active line with
  `palette/blue/950` + `palette/blue/300`. The code matrix has no `info`/blue
  semantic group, so highlighting is out of scope rather than reaching into the
  raw palette.
- **Statistic value size.** Pen uses `font-size/2xl` (32px); the foundation size
  scale tops out at `xl` (24px), so the value steps down one size. Pen
  `tracking/wide` (0.6px at 12px) is approximated by the relative `wide` token.
- **Padding/gap approximations.** Pen pads List rows and Code Block/chrome 14px
  inline and spaces Timeline rows 14px; the `xN` scale has no `x7`, so `x6`
  (12px) is used consistently.
- **Timeline last connector.** Pen's `Timeline Item` always renders its 40px
  line; the component drops the connector on the final row so the rail ends
  cleanly. This is an intentional, documented deviation.
- **Clipboard is a display field, not an `<input>`.** Pen renders a text value in
  a sunken frame; the component renders a non-editable `<span>` value rather than
  a readonly input, keeping the anatomy and semantics minimal.
- **Icon set coverage.** `file-json` / `file-code` / `circle-alert` from the Pen
  masters are not in the set; the List uses `file` for every row and Clipboard's
  error state is not modelled. Adding them is a separate `mise run icons:build`
  step.
- **Radius foundation gaps (carried from batch 2).** `radii` still ships only
  `sm`/`md`; Timeline markers use the literal `9999px` for `radius/pill`, as
  Progress did. Adding `full` (and optionally `lg`) would remove the literal.
