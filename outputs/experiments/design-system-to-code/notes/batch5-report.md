# Batch 5 report: six navigation & disclosure components from the Pen design system

**Date:** 2026-10-02
**Commit:** `012033ef4053c5a1acc88037c1d7b6abc0239418`
**Message:** `feat: port Link, Nav Item, Brand, Breadcrumbs, Sidebar Item, Top Navigation from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only JSON, parsed with Bun/jq).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Six public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All six are slot recipes.

| Component | Pen master (id) | Recipe | Anatomy |
| --- | --- | --- | --- |
| Link | `Link` frame `QWV5n` | slot `link` | root / leadingIcon / label / trailingIcon |
| Nav Item | `Nav Item` frame `l8wwSv` | slot `navItem` | root / icon / label |
| Brand | `Brand` frame `MGoSj` | slot `brand` | root / mark / wordmark |
| Breadcrumbs | `Breadcrumbs` frame `Bvk23` | slot `breadcrumbs` | root / list / item / link / separator / current |
| Sidebar Item | `Sidebar Item` frame `EagLC` | slot `sidebarItem` | root / icon / label |
| Top Navigation | `Top Navigation` frame `KI0Dl` | slot `topNavigation` | root / brand / nav / spacer / actions |

The masters live together in `Components — Navigation & disclosure — Masters`
(frame `mDzms`), so the geometry below was read from the reusable frames rather
than from the specimen instances.

### API shape

- **Link** is an anchor. `tone` (`link | subtle | primary`) selects the
  foreground role; `underline` (`hover | always | none`) controls the underline;
  `leadingIcon` / `trailingIcon` attach glyphs; `external` is sugar for a
  trailing `external-link`; `disabled` mutes it and drops it from the tab order.
- **Nav Item** is an anchor with `label`, optional `icon`, `active` and
  `disabled`. `active` is exposed as `aria-current="page"`.
- **Brand** is a decorative lockup: a solid rounded `mark` plus the wordmark
  (`name`, default `No Launchpad`). The mark is a simple shape, so the lockup
  does not depend on the icon set; wrap it in a `Link` to make it navigate.
- **Breadcrumbs** takes a typed `items` array (`{ label, href? }`) and renders a
  `<nav>` / `<ol>` trail. The final entry is the current crumb
  (`aria-current="page"`) and is never linked; `separatorIcon` defaults to
  `chevron-right`.
- **Sidebar Item** mirrors Nav Item as a vertical entry (`label`, `icon`,
  `active`, `disabled`) that stretches to its rail.
- **Top Navigation** is a layout surface, not a router: `brand`, `nav` and
  `actions` are consumer slots and `surface` (`base | transparent`) selects the
  fill. It owns no navigation behaviour.

Pen models the Link parts as `root · label · leading icon · trailing icon ·
visited state` and the Top Navigation parts as `root · brand block · nav item ·
active indicator · actions slot · mobile menu trigger`; the slots above cover the
parts that carry layout or colour. The overflow control (Breadcrumbs), mobile
menu trigger, search/account variants (Top Navigation), and group labels,
nesting and collapse control (Sidebar Item) are out of scope.

## Pen → code mapping

Pen carries a newer **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`) on top of the numeric matrix the code
foundation ports. Each role alias was resolved to the closest token; the shared
aliases from batches 1–4 carry over.

### Shared role aliases

| Pen role (master) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/base` | `neutral.50` / `neutral.950` | `semantic.common.50.background` | exact, both themes |
| `surface/selected` | `green.50` / `green.950` | `semantic.brand.50.background` | exact, both themes |
| `surface/hover` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact, dark one step |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `text/link` | `green.700` / `green.400` | `semantic.brand.700.background` | light exact, dark one step brighter |
| `text/disabled` | `neutral.400` / `neutral.600` | `semantic.common.400.background` | exact, both themes |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `action/primary-bg` | `green.700` / `green.700` | `semantic.brand.700.background` | light exact, dark one step |
| `focus/ring` | `green.600` / `green.500` | `semantic.brand.500.background` | shared focus convention |

### Per-master values

- **Link**: gap 4px (`x2`, exact), font `sm`/`medium` (`font-size/sm`,
  `font-weight/medium`, exact), trailing glyph 14px. `_focusVisible` uses the
  shared 2px brand outline.
- **Nav Item**: fill transparent, radius `sm` (exact), gap 8px (`x4`, exact),
  padding 8px block / 12px inline (`x4` / `x6`, exact). Hover is
  `surface/hover`; current (`surface/selected` + `text/link`) overrides hover on
  the same rule; disabled reads `text/disabled`.
- **Brand**: gap 8px (`x4`, exact), mark 24px (`x12`, exact) with `radius/sm`
  (exact), wordmark `md`/semibold/`tracking/tight` and `text/primary` (exact).
- **Breadcrumbs**: gaps 8px (`x4`, exact) on both the list and each item, crumb
  text `sm`/regular, links `text/secondary`, separators `text/tertiary` and the
  current crumb `text/primary`.
- **Sidebar Item**: fill transparent, radius `sm`, gap 10px (`x5`, exact),
  padding 8px block / 10px inline (`x4` / `x5`, exact), icon 16px (`x8`, exact),
  label stretches (`flex: 1`). States match Nav Item.
- **Top Navigation**: height 64px (literal, see gaps), side padding 16px (`x8`,
  exact), major-group gap 24px (`x12`, exact), nav-entry gap 4px (`x2`, exact),
  `surface/base` fill and a 1px `border/subtle` boundary on all four edges,
  matching the master. `transparent` keeps the boundary and drops the fill,
  matching the landing screen's `fill: "none"` override.

## Icons

Three new filled glyphs were imported through the asset pipeline, never
hand-edited:

```sh
mise run icons:build -- --from <raw-dir>   # chevron-right, external-link, layout-grid
mise run icons:check                        # ✓ 25 icons up to date
```

- Sources: Material Symbols (400, outlined) single-path exports, normalized to
  the canonical fill-based contract.
- Codepoints continue after the existing maximum: `chevron-right` `0xE017`,
  `external-link` `0xE018`, `layout-grid` `0xE019`. Every existing key keeps its
  codepoint.
- `manifest.generated.ts` and `assets/font/icon.woff2` are produced by the tool.
- Use: `chevron-right` is the Breadcrumbs separator, `external-link` the Link
  external glyph and `layout-grid` the Sidebar Item glyph in the story/App
  examples. The Brand mark is a shape, so it needs no glyph.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all six are `theme.slotRecipes`; appended after QR Code in the order `link`,
  `navItem`, `brand`, `breadcrumbs`, `sidebarItem`, `topNavigation`).
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 23 to 29; the recipe list (`icon`, `dividerRule`,
  `skeleton`, `spinner`) is unchanged.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed (two Top Navigation surfaces, a
  Link row with a Breadcrumbs trail, and a Sidebar Item rail), so Knip sees real
  usage.

## Files

New, per component (`link`, `nav-item`, `brand`, `breadcrumbs`, `sidebar-item`,
`top-navigation`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/chevron-right.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/external-link.svg` (new canonical source)
- `src/shared/components/icon/assets/svg/layout-grid.svg` (new canonical source)
- `src/shared/components/icon/assets/font/icon.woff2` (rebuilt)
- `src/shared/components/icon/manifest.generated.ts` (rebuilt)
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run icons:build -- --from <raw>` | imported `chevron-right`, `external-link`, `layout-grid`; 25 icons |
| `mise run icons:check` | ✓ 25 icons up to date |
| `mise run gen` | ✓ codegen + cssgen (227 files extracted) |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (329 unit / 143 browser) |
| `mise run check:deps` | ✓ Knip clean |

`mise run fix:all` applied the only reformatting before the checks;
`mise run check:format` is a no-op on the committed tree. The generated CSS
contains the new classes (`link__root`, `navItem__root`, `brand__root`,
`breadcrumbs__root`, `sidebarItem__root`, `topNavigation__root`) and the
manifest diff is additive only.

## Accessibility

- Link, Nav Item and Sidebar Item render real `<a>` elements; `active` maps to
  `aria-current="page"` and `disabled` maps to `aria-disabled` plus removal from
  the tab order. Focus uses the shared visible outline.
- Breadcrumbs render `<nav aria-label>` around a semantic `<ol>` / `<li>` list;
  the final crumb carries `aria-current="page"` and is a `<span>`, so it is not
  announced as a link. Separators are decorative `Icon`s (`aria-hidden`).
- Brand's mark is decorative; the wordmark carries the name.
- Top Navigation is a labelled-by-consumer `<header>` that lays out a `<nav>` and
  two generic regions; it adds no interaction or routing.

## Approximations and concerns

- **New navigation token gap.** Pen's role layer still has no `link`,
  `surface/hover` or `surface/selected` token in the code matrix. `text/link`
  reuses `brand.700.background` (the batch 3/4 Toast/Statistic convention) and
  `surface/hover` reuses `common.100.background` (light exact, dark one step).
  `surface/selected` maps exactly to `brand.50.background`. A future foundation
  pass could add the roles explicitly.
- **`border/subtle` boundary.** As in batches 3–4, the nearest structural token
  is `common.200.divider` (`neutral.300`/`neutral.700`) rather than Pen's
  `neutral.200`/`neutral.800`; this keeps every component consistent.
- **Bar height.** Pen's 64px top bar has no `xN` step (`x25` = 50px), so `64px`
  is a literal, consistent with Data Table's 44px/52px literals.
- **Glyph sizing.** Pen draws Link/Nav Item/Sidebar Item glyphs at 14–16px; the
  `Icon` scale's `sm` is 16px, so a 14px glyph steps up. Breadcrumb/Nav gaps and
  padding are otherwise exact.
- **Scope cuts.** The visited Link state, Link focus padding box, Breadcrumbs
  overflow control and `compact` variant, Top Navigation mobile trigger and
  search/account variants, and Sidebar Item group labels/nesting/collapse are not
  modelled: they describe behaviour or chrome the task leaves out.
- **Mono font gap (carried from batches 1–4).** Pen's `font/mono` still has no
  code token; none of these six components need mono, so the gap is untouched.
