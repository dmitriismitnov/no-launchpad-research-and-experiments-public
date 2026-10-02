# Batch 6 report: five navigation & disclosure components from the Pen design system

**Date:** 2026-10-02
**Commit:** `e4227303e0e1833c0b431e0a57881fd5c52fd208`
**Message:** `feat: port Tab, Accordion Item, Menu, Step, Pagination from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `jq`).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Five public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All five are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Tab | `Tab` frame `z2jG4r` (`TabList` row is the master `List`) | slot `tab` | list / root / icon / label / indicator |
| Accordion Item | `Accordion Item` frame `YGgyy` | slot `accordionItem` | root / trigger / title / chevron / panel |
| Menu | `Menu` frame `GLufg` + `Menu Item` frame `CX1vE` | slot `menu` | root / label / item / icon / itemLabel / shortcut / check / submenu / divider |
| Step | `Step` frame `cAzIA` | slot `step` | root / marker / markerContent / text / title / description |
| Pagination | `Pagination` frame `DdvJi` | slot `pagination` | root / item / itemCurrent / ellipsis |

The masters live together in
`Components — Navigation & disclosure — Masters (library)`, so the geometry was
read from the reusable frames. The per-component documentation frames
(`… — Tabs` `CCpkF`, `… — Accordion` `vswcF`, `… — Menu` `C6zTA`,
`… — Steps` `f9QCHG`, `… — Pagination` `yQPcK`) supplied the public-variant and
state specimens, and the `variables` map supplied the resolved role values.

### API shape

- **Tab** is the single controlled trigger the task allows: `Tab` renders a
  `role="tab"` button with `label`, optional `icon`, `active` and `disabled`,
  and exposes `aria-selected`. `TabList` is the `role="tablist"` row and owns
  the shared bottom boundary. The pair is a `tabs`/`tab` API without owning the
  panel or the state machine.
- **Accordion Item** is a disclosure row. It is uncontrolled by default or
  controlled with `open` / `onOpenChange`; `defaultOpen` seeds the uncontrolled
  state (plain React `useState`, no external store). The trigger exposes
  `aria-expanded` and `aria-controls`, the panel is a labelled `region`, and the
  ids come from `useId`.
- **Menu** is a presentational surface: `Menu` (optional `label`, `children`),
  `MenuItem` (`label`, `icon`, `shortcut`, `checked`, `submenu`, `tone`,
  `disabled`) and `MenuDivider`. No positioning, open state or keyboard
  behaviour is owned.
- **Step** is one numbered marker with `label`, optional `description` and a
  `state` of `completed | current | upcoming | error`. The current step is
  exposed with `aria-current="step"`.
- **Pagination** is controlled from `page` / `totalPages` with
  `onPageChange`. It derives a windowed set of page numbers, renders ellipses
  for hidden ranges, keeps previous/next in place but disabled at the bounds,
  and marks the current page with `aria-current="page"` as a non-interactive
  `<span>`.

Pen models extra parts — Tab `panel`, Accordion `separator`, Menu `submenu
indicator`, Step `connector`, Pagination `previous button` / `next button` — the
slots cover the parts that carry layout or colour. The Tab `pill` and scrollable
variants, Accordion multiple-open, Menu inline/popup positioning, Step vertical
and clickable variants, and Pagination first/last and page-size variants are out
of scope.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`, `semantic/feedback/*`) on top of the
numeric matrix the code foundation ports. Each role alias was resolved to the
closest token; the shared aliases from batches 1–5 carry over.

### Shared role aliases

| Pen role (resolved from `variables`) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/base` | `neutral.50` / `neutral.950` | `semantic.common.50.background` | exact, both themes |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | dark one step |
| `surface/overlay` | `white` / `neutral.800` | `semantic.common.50.background` | dark one step |
| `surface/sunken` | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact, dark one step |
| `surface/hover` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact, dark one step |
| `surface/selected` | `green.50` / `green.950` | `semantic.brand.50.background` | exact, both themes |
| `action/primary-bg` | `green.700` / `green.700` | `semantic.brand.700.background` | light exact, dark one step |
| `action/primary-fg` | `white` / `white` | `semantic.common.50.background` | inverse foreground pair |
| `action/disabled-bg` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact, dark one step |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `text/disabled` | `neutral.400` / `neutral.600` | `semantic.common.400.background` | exact, both themes |
| `text/link` | `green.700` / `green.400` | `semantic.brand.700.background` | light exact, dark one step brighter |
| `feedback/positive-bg` | `green.50` / `green.950` | `semantic.positive.50.background` | exact, both themes |
| `feedback/positive-border` | `green.700` / `green.600` | `semantic.positive.50.border.strong` | light one step, dark exact |
| `feedback/positive-fg` | `green.700` / `green.300` | `semantic.positive.700.background` | exact |
| `feedback/negative-bg` | `red.50` / `red.950` | `semantic.negative.50.background` | exact, both themes |
| `feedback/negative-border` | `red.500` / `red.400` | `semantic.negative.50.border.strong` | light exact, dark one step |
| `feedback/negative-fg` | `red.700` / `red.300` | `semantic.negative.700.background` | exact |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `border/strong` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact, dark one step |
| `focus/ring` | `green.600` / `green.500` | `semantic.brand.500.background` | shared focus convention |
| `shadow/500` | `#0F172A30` / `#0000008F` | `semantic.shadow.500` | exact |

### Per-master values

- **Tab**: label `sm`/`medium`, vertical trigger, gap 8px (`x4`, exact), padding
  8px block / 4px inline (`x4` / `x2`, exact), indicator 2px
  (`{borderWidths.thick}`) in `action/primary-bg` with a pill radius. Active adds
  `surface/selected` and `text/primary`; hover is `surface/hover`; disabled is
  `action/disabled-bg` + `text/disabled`; focus is the shared 2px ring. The list
  boundary is a 1px `border/subtle` bottom rule.
- **Accordion Item**: root is a 1px `border/subtle` bottom rule; trigger gap 12px
  (`x6`, exact), 14px block padding (approximated by `x6`), 4px inline (`x2`,
  exact), `sm`/`semibold` `text/primary` title and a reflecting 16px chevron.
  Trigger hover is `surface/hover`; disabled reads `text/disabled`; the panel is
  `sm`/`regular` `text/secondary` and is unmounted when closed.
- **Menu**: overlay surface (`surface/overlay`), 1px `border/subtle`, `radius/md`,
  6px padding (`x3`) and 2px gap (`x1`); `0 10px 28px` shadow from
  `semantic.shadow.500`. Rows pad 8px block / 10px inline (`x4` / `x5`, exact)
  and gap 10px (`x5`, exact). Hover is `surface/hover`, the checked row is
  `surface/selected`, disabled rows read `text/disabled`, destructive rows read
  `feedback/negative-fg`, and the divider is 1px `common.200.divider`.
- **Step**: gap 10px (`x5`, exact), a 26px marker (literal; the `xN` scale
  cannot express 26px) with a 1px `border/strong` ring and `xs` content. Upcoming
  is `surface/sunken` + `text/secondary`; current is `action/primary-bg` +
  `action/primary-fg` + `text/primary`; completed is
  `feedback/positive-bg/border/fg` + `text/primary` with a check marker; error is
  `feedback/negative-bg/border/fg` + `text/primary` with a `!` marker. The
  connector (2px `border/subtle`) belongs to the composition.
- **Pagination**: 4px gap (`x2`, exact), 36px square controls (literal), `radius/sm`,
  `sm`/`medium` `text/secondary`. Current is `action/primary-bg` +
  `action/primary-fg`; hover is `surface/hover`; disabled reads `text/disabled`
  with `not-allowed`; the ellipsis reads `text/tertiary`. Previous/next use
  16px chevrons (`Icon` `sm`, exact).

## Icons

Two new filled glyphs were imported through the asset pipeline, never
hand-edited:

```sh
mise run icons:build -- --from <raw-dir>   # chevron-down, chevron-left
mise run icons:check                        # ✓ 27 icons up to date
```

- Sources: Material Symbols (outlined) single-path exports in the canonical
  `0 -960 960 960` viewBox, matching the existing chevron.
- Codepoints continue after the existing maximum: `chevron-down` `0xE01A`,
  `chevron-left` `0xE01B`. Every existing key keeps its codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.
- Use: `chevron-down` is the Accordion chevron, `chevron-left` / `chevron-right`
  are the Pagination controls. `check` (`0xE002`) marks completed steps and
  checked menu rows; `chevron-right` marks menu submenus. The master glyphs at
  14px step up to `Icon` `sm` (16px).

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all five are `theme.slotRecipes`; appended after Top Navigation in the order
  `tab`, `accordionItem`, `menu`, `step`, `pagination`). The recipe list
  (`icon`, `dividerRule`, `skeleton`, `spinner`) is unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 29 to 34.
- `panda.config.ts`: `staticCss.recipes.menu` declares the runtime
  `tone` / `checked` / `disabled` values. `menu` is also an HTML element name, so
  the static extractor does not resolve the `menu({ … })` shorthand call; the
  declaration is the same mechanism already used for `button`, `buttonIcon` and
  `icon`.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed (a Tab row, two Accordion Items, a
  Step sequence, a Menu with divider and a Pagination), so Knip sees real usage.

## Files

New, per component (`tab`, `accordion-item`, `menu`, `step`, `pagination`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/chevron-down.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/chevron-left.svg` (new canonical source)
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
| `mise run icons:build -- --from <raw>` | imported `chevron-down`, `chevron-left`; 27 icons, 2 new |
| `mise run icons:check` | ✓ 27 icons up to date |
| `mise run gen` | ✓ codegen + cssgen (252 files extracted) |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (358 unit / 167 browser) |
| `mise run check:deps` | ✓ Knip clean |

`mise run fix:all` applied the only reformatting before the checks;
`mise run check:format` is a no-op on the committed tree. The generated CSS
contains the new classes (`tab__root`, `accordionItem__root`, `menu__root`,
`step__marker`, `pagination__item`) and the `menu` variant classes
(`menu__item--checked_true`, `menu__itemLabel--tone_danger`, …). The manifest
diff is additive only.

## Accessibility

- Tab renders a `role="tablist"` row of `role="tab"` buttons; selection is
  exposed with `aria-selected` and disabled triggers use the native `disabled`
  attribute. Focus uses the shared visible outline.
- Accordion Item's trigger exposes `aria-expanded` and `aria-controls`, and the
  panel is a `region` labelled by the trigger; both ids are stable via `useId`.
- Menu renders `role="menu"` / `role="menuitem"` / `role="separator"`; disabled
  rows use the native `disabled` attribute. Keyboard navigation and open state
  are the consumer's responsibility.
- Step's current marker is exposed with `aria-current="step"`; the completed and
  error states add a check or `!` marker next to the label so state is never
  conveyed by colour alone.
- Pagination is a labelled `<nav>`; every numbered control has an accessible
  name, the current page is a non-interactive `<span aria-current="page">`, and
  previous/next are disabled at the bounds rather than removed.

## Approximations and concerns

- **New role-token gap (carried).** Pen's role layer has no direct token in the
  code matrix. `action/primary-fg` is mapped to `common.50.background`, the
  neutral inverse of `action/primary-bg` in both themes; `surface/overlay`
  reuses the Toast convention (`common.50.background`); and `surface/raised`
  keeps the `common.50.background` mapping from batch 5 (dark one step). A future
  foundation pass could add the roles explicitly.
- **`border/subtle` boundary.** As in batches 3–5 the nearest structural token
  is `common.200.divider` (`neutral.300`/`neutral.700`) rather than Pen's
  `neutral.200`/`neutral.800`.
- **Minor `xN` gaps.** Pen's 14px accordion trigger padding and 28px tab gap have
  no scale step, so they use `x6` (12px) and `x12` (24px). The Step 26px marker
  and Pagination 36px control are literals, consistent with Data Table and Top
  Navigation literals.
- **Current-step discrepancy.** Pen's state contract paints the current step
  onto `surface/selected`, while its public specimens paint the current marker
  with `action/primary-bg`; the specimens win here.
- **Menu extraction quirk.** `menu` collides with an HTML element name, so the
  static extractor does not resolve the runtime call. The declared
  `staticCss.recipes.menu` guarantees the `tone` / `checked` / `disabled` classes
  are emitted; the default tone is named `neutral` (not `default`) to match
  Badge / Alert / Toast.
- **Mono font gap (carried from batches 1–5).** Pen's group label, menu shortcut
  and step marker use `font/mono`, which has no code token; they read the body
  family.
- **Scope cuts.** Tab `pill` / scrollable / badge variants; Accordion
  multiple-open, with-icon and clickable headers; Menu inline/popup positioning,
  submenu flyout and keyboard model; Step vertical layout, connector and
  clickable steps; Pagination first/last, page-size and compact variants. These
  describe behaviour or chrome the task leaves out.
