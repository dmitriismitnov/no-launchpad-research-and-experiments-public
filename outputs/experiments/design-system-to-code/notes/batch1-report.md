# Batch 1 report: six components from the Pen design system

**Date:** 2026-10-02
**Commit:** `b5c3ff4f30c5d727b98951c5cfb1520ea4706f9e`
**Message:** `feat: port Divider, Skeleton, Spinner, Avatar, Tag, Status Indicator from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only JSON, parsed with Bun).

## Components ported

Six public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story:

| Component | Pen master (id) | Anatomy |
| --- | --- | --- |
| Divider | `divider` rectangle `vZUUG` | single recipe; orientation horizontal/vertical |
| Skeleton | `skeleton` rectangle `qfUOu` | single recipe; muted block |
| Spinner | `spinner` frame `lpijt` | single recipe; rotating `loader` glyph |
| Avatar | `avatar` frame `q9qgrL` | slots root/image/fallback/initials/presence |
| Tag | `tag` frame `UyMqu` | slots root/label/close |
| Status Indicator | `status indicator` frame `a4r4Y` | slots root/dot/label |

## Pen → code mapping

Pen carries two semantic layers. The code foundation ports the numeric matrix
(`semantic/<group>/<step>/<projection>`); the component masters reference a newer
**role** layer (`semantic/surface/*`, `semantic/text/*`, `semantic/border/*`,
`semantic/feedback/*`). Each role alias was resolved to its palette value per
theme and mapped to the closest existing matrix token.

| Master value | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| Divider `common/200/divider` | `#CBD5E1` / `#334155` | `semantic.common.200.divider` | exact |
| Skeleton `surface/sunken` | `#F1F5F9` / `#020617` | `semantic.common.100.background` | light exact, dark one step (`neutral.900` vs `neutral.950`) |
| Spinner `text/secondary` | `#334155` / `#CBD5E1` | `semantic.common.700.background` | exact |
| Avatar `brand/100/background` | `#DCFCE7` / `#14532D` | `semantic.brand.100.background` | exact |
| Avatar `brand/100/text` | `#14532D` / `#F0FDF4` | `semantic.brand.100.text` | exact |
| Avatar presence `feedback/positive-fg` | `#15803D` / `#86EFAC` | `semantic.positive.600.background` | Badge dot convention, one step brighter |
| Avatar/tag `surface/raised` | `#FFFFFF` / `#0F172A` | `semantic.common.50.background` | code has no pure-white raised token; follows Card/Input surface convention |
| Tag `border/strong` | `#64748B` / `#94A3B8` | `semantic.common.50.border.strong` | functional boundary role; dark one step |
| Tag `text/secondary` | `#334155` / `#CBD5E1` | `semantic.common.700.background` | exact |
| Tag close `text/tertiary` | `#475569` / `#94A3B8` | `semantic.common.600.background` | exact |
| Status dot `feedback/positive-fg` | green | `semantic.positive.600.background` | Badge tone convention |
| Status label `text/secondary` | grey | `semantic.common.700.background` | exact |

Geometry, typography and shape:

- Divider: 1px via `{borderWidths.thin}`; `role="separator"` + `aria-orientation`.
- Skeleton: radius `sm`, default `width: 100%` / `height: x6` (12px); size is
  driven by the consumer through native props / `style`.
- Spinner: 24px (`x12`), `Icon` size `lg`, rotation from a component-owned
  `theme.keyframes.spin`; `prefers-reduced-motion: reduce` stops it.
- Avatar: `x16`/`x20`/`x24` (32/40/48px, Pen `control/sm|md|lg`), pill radius,
  `sm` semibold initials, `x5` presence dot with a 2px `common.50.background` ring.
- Tag: gap `x3`, `paddingInline x5`, radius `sm`, `paddingBlock x2` (Pen 5px).
- Status Indicator: `x4` dot, gap `x3`, `xs` label; tones
  `neutral | positive | negative | brand` reuse the Badge dot roles.

## Foundation and asset changes

- **Layout scale:** added `20` and `24` to the shared `xN` scale
  (`sizes.ts` + `spacing.ts`). Pen defines `size/x20 = 40` and control `lg = 48`;
  the code scale previously jumped `16 → 25`, so Avatar could not match its 40px
  master. The scale stays regular (`xN = N * 0.125rem`).
- **Icon set:** added a `loader` glyph to the icon font. Lucide's `loader` is
  stroke-based and the canonical contract accepts only filled geometry, so a
  fill-based 3/4 ring was authored and imported with
  `mise run icons:build -- --from <dir>`. Codepoint `0xE012`; `icons:check` green.
- **Spinner keyframes:** the component preset owns `theme.keyframes.spin`. The
  collection point (`src/shared/styles/index.ts`) was extended to gather
  `theme.keyframes` alongside `recipes`/`slotRecipes`, otherwise Panda's shallow
  preset merge would drop it.

## Registration

- `src/shared/styles/index.ts`: imports, exports, `componentPresetSources`,
  keyframe collection.
- `src/shared/styles/presets.test.ts`: updated slot/recipe lists, equality
  checks, keyframe assertion and reversed-order guard.
- `knip.jsonc`: each component `index.ts` is an entry point.
- `src/app/App.tsx`: every component is composed so Knip sees usage.

## Files

New, per component (`avatar`, `divider`, `skeleton`, `spinner`,
`status-indicator`, `tag`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `src/shared/components/icon/assets/svg/loader.svg` (new canonical source)
- `src/shared/components/icon/assets/font/icon.woff2` (rebuilt)
- `src/shared/components/icon/manifest.generated.ts` (rebuilt)
- `src/shared/styles/foundation/layout/sizes.ts`
- `src/shared/styles/foundation/layout/spacing.ts`
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run icons:build -- --from <raw>` | imported `loader`; 18 icons |
| `mise run icons:check` | ✓ 18 icons up to date |
| `mise run gen` | ✓ codegen + cssgen, no warnings |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (215 unit / 65 browser) |
| `mise run check:deps` | ✓ Knip clean |

## Approximations and concerns

- **Role layer gap.** The code matrix has no dedicated secondary/tertiary
  foreground or raised-surface token. Muted foregrounds are expressed as
  `.background` at the matching step (the existing Input/Card convention), and
  raised surfaces as `common.50.background`. A future foundation pass should port
  the Pen role layer rather than extend this approximation.
- **Dark-theme one-step differences.** Skeleton, Tag border and the presence dot
  resolve to adjacent steps in dark mode; all other roles are exact.
- **Tag `paddingBlock`.** Pen's 5px has no `xN` token; `x2` (4px) is used.
- **Avatar presence.** Pen shows a single positive dot; the component generalizes
  to `online | away | busy | offline` using Badge tone roles. `away` maps to the
  `occasional` group, which is currently a neutral placeholder.
- **Spinner glyph.** The authored 3/4 ring has square ends (lucide uses rounded
  stroke caps); it is a fill geometry that satisfies the icon-font contract.
- **Divider naming.** The recipe key/class is `dividerRule` because Panda already
  ships a `divider` pattern; the public component is still `Divider`.
