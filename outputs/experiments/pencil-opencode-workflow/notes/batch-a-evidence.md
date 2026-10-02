# Batch A evidence — Foundation, assets, state audit, themed previews

**Date:** 2026-10-03\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Artifact identity:** SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged before/after inspection).\
**Method:** Pencil MCP `get_app_state`, `execute` (`Get` visitor + `GetVariables`, no mutation). Code facts read from `src/shared/**` and the generated `styled-system`.

This ledger records the Batch A rows: `q5xZR3` Theme Switch Preview, `pt3X0` Asset Icon Tile, `M4GSR0` Icon, the Foundation palette/semantic/typography/spacing/shape/icon scale, and the State model. Status semantics follow the spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.

## Source Pen node IDs

| Role | Node | Name |
| --- | --- | --- |
| Theme preview master | `q5xZR3` | Theme Switch Preview |
| Theme preview doc | `YpWB5` → `v78OuT` → `YQ6kU` | 01 Foundation → Foundation — Theme comparison → Preview row (`k0ACg` light, `v7jOB` dark) |
| Asset tile master | `pt3X0` | Asset Icon Tile (glyph box `L462Gt`, glyph frame `WNjtN`, path `jr3C5`) |
| Asset tile docs | `D6GS67` → `BsKMS` / `rIjcY` / `GK9K0` | Assets — Icons → Icon inventory / Usage map / Theme preview |
| Icon master | `M4GSR0` | Icon (glyph `fww2a`) |
| Icon docs | `YpWB5` (Icon size scale), `J9a4S` (Icon), `D6GS67` | 01 Foundation / 09 Components — Content & data |
| Foundation | `YpWB5` | 01 Foundation |
| State model | `YwxEo` | 03 Components — State model |

## Row matrix

### `q5xZR3` Theme Switch Preview — owner `src/shared/components/theme-switch-preview/`

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Nature | A preview block, not a controller; `YQ6kU` renders two instances (`theme: light` / `theme: dark`) | Was a `Switch` controller with controlled/uncontrolled theme + `onThemeChange` (a global preference controller, forbidden by the spec) | FAIL → PASS |
| Anatomy | `q5xZR3` 420w, vertical, `gap 20 / 14`, fill `surface/raised`, radius `lg`, stroke `border/subtle`; Head (moon + "Theme preview" `text/primary` md semibold + `theme` badge), Buttons, Input, Badges, Card, Tabs | Port is a two-panel comparison; the showcase anatomy is composed in the story from shared owner components | PASS |
| Theme axis | `data-theme` only (`theme` node property in Pen) | `data-theme="light"` / `data-theme="dark"` on both panels; recipe has no theme variant | PASS |
| Both themes | Same instances in light and dark | Story `TwoThemes`; computed surface `surface/raised` = `rgb(255,255,255)` / `rgb(15,23,42)` | PASS |
| Evidence | — | `theme-switch-preview.png`, `theme-switch-preview-surfaces.png` | PASS |

Code paths: `theme-switch-preview.tsx`, `preset.ts`, `index.ts`, `ThemeSwitchPreview.stories.tsx`, `ThemeSwitchPreview.composition.test.tsx`. Public API change (`children` required; removed `theme`/`defaultTheme`/`onThemeChange`/`ThemeSwitchValue`) is the documented Pen requirement: `q5xZR3` is a preview, not a theme controller.

### `pt3X0` Asset Icon Tile — owner `src/shared/components/asset-icon-tile/`

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Glyph box | `L462Gt` 40×40, fill `$semantic/surface/sunken`, radius `$radius/sm`, no stroke, centered | `x20` square, `radius sm` | PASS |
| Surface role | `surface/sunken` → light `#F1F5F9`, dark `#020617` | Was `common.100.background` → dark `#0F172A` | FAIL → PASS |
| Boundary | No stroke on the glyph box (the enclosing inventory card owns the stroke) | Was `borderWidth thin` + `common.200.divider` | FAIL → PASS |
| Glyph tone | `text/primary` (neutral.900 / neutral.50) | `text/primary` (was `common.50.text`, same resolved values) | PASS |
| Glyph size | `WNjtN` 22px frame | Shared `Icon size="md"` = 20px (off the documented icon scale) | HUMAN REVIEW |
| Canonical asset | "Real glyph … canonical source SVG … No library substitute" (`D6GS67` usage contract) | Renders the shared `Icon` font manifest | PASS |
| Both themes | — | Story `LightAndDark` asserts `rgb(241,245,249)` / `rgb(2,6,23)`; `asset-icon-tile.png` | PASS |

### `M4GSR0` Icon — owner `src/shared/components/icon/`

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Master | `M4GSR0` 24×24 centered, glyph `fww2a` 24×24, fill `text/primary` | `Icon` recipe `lg` = 24px; colour inherited via `currentColor` | PASS |
| Size scale | `YpWB5` Icon size scale: `icon/sm 16 · md 20 · lg 24 · xl 32`; `J9a4S` public variants `sm · md · lg · xl` | Was `sm/md/lg`; missing `xl` | FAIL → PASS (added `xl` = `x16` = 32px) |
| Colour from context | "never carry their own color variant" | Recipe declares no `color` | PASS |
| Decorative / labelled | `D6GS67` usage contract | `aria-hidden` by default, `role="img"` + label otherwise | PASS |
| Build ownership | manifest/woff2/codepoints from `tools/build.ts` | same | PASS |
| Both themes | `GK9K0` theme preview | `Icon.stories` `LightAndDark`; `icon.png`, `icon-sizes.png` | PASS |

Icon pipeline inputs were **not** changed: `mise run icons:check` reports `38 icons` up to date. Pen's Assets frame documents a 17-key inventory that predates the current 38-key manifest (INFO); the extra manifest keys are existing code assets, not a Pen requirement to add or remove.

### Foundation palette (`YpWB5`)

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Families / steps | 6 families × 11 steps (50–950), base white/black | `paletteValues` identical | PASS |
| Values | neutral/blue/green/red/sky/cyan | Programmatic compare: **66/66 exact match** | PASS |

### Foundation semantic (`YpWB5`)

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Matrix | 6 groups × 11 steps × 6 projections (background/text/icon/border.subtle/border.strong/divider) | `semanticColors` full matrix | PASS |
| Named roles | `surface/*`, `text/*`, `border/*`, `focus/ring`, `action/*`, `shadow/*` | all present, values match the Pen variables | PASS |
| Brand family label | Foundation text labels `semantic/brand → palette/blue` | Pen resolved variables use `$palette/green` (code follows the variables) | INFO |

### Foundation typography (`YpWB5`)

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| `font/body` | Inter | `body: Inter, system-ui, sans-serif` | PASS |
| `font/display` | Inter | same family as `body` | INFO |
| `font/mono` | IBM Plex Mono | No token / no bundled face | HUMAN REVIEW |
| `font-size/*` | 12/14/16/20/24/32/40/56 | exact match | PASS |
| `font-weight/*` | 400/500/600/700 | exact match | PASS |
| `line-height/*` | tight 1.15 · normal 1.4 · relaxed 1.6 | Was tight 1.2 · snug 1.4 · normal 1.5 · relaxed 1.75 | FAIL → PASS |
| `tracking/*` | tight −0.4 · normal 0 · wide 0.6 (resolved absolute values) | `-0.01em` / `0` / `0.02em` (relative projection) | HUMAN REVIEW |

### Foundation spacing & sizing (`YpWB5`)

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Steps | x0…x25, **x32 64, x40 80** | Was missing x32/x40 | FAIL → PASS (added) |
| Extra step x9 | not in the Pen scale | code keeps `x9` = 18px for the ButtonIcon `md` glyph | INFO |

### Foundation shape & effects (`YpWB5`)

| Fact | Pen | Code | Status |
| --- | --- | --- | --- |
| Radii | none 0 · sm 6 · md 10 · lg 16 · pill 999 | sm 6 · md 10 · lg 16 · `full` 9999 (equivalent rendering) | PASS / naming INFO |
| Border widths | none 0 · thin 1 · thick 2 | exact match | PASS |
| Shadow | 100–800, theme-aware | exact match | PASS |

### State model (`YwxEo`)

Transcribed shared vocabulary: **public variants** (tone, size, width, icon placement), **system context** (`theme: light | dark`, never a public variant), **behavior states** (disabled, loading, invalid, selected, open), **interaction conditions** (hover, active, focus-visible). Precedence: theme resolves tokens → hover overrides resting surface → focus-visible ring last → disabled suppresses hover/active. Disabled uses `action/disabled-bg` / `disabled-fg`, identical geometry, never opacity-only. Loading preserves geometry. Focus ring draws outside the control and stays visible in both themes. Component classes and required visual states: pressable (default/hover/active/focus-visible/disabled), async (+loading), form controls (default/filled/hover/focus-visible/disabled/read-only/invalid), selection (selected/checked, unselected, focus-visible, disabled), disclosure triggers (closed/hover/focus-visible/open/disabled), passive status ("never invent hover or active").

Code status: the state vocabulary is enforced by the foundation semantic tokens and the owner presets; the one Batch A component that violated the "never invent an interaction/global policy" boundary (`ThemeSwitchPreview` as a theme controller) is corrected. Status: PASS / reference.

## RED / GREEN proof

| Change | RED (focused) | GREEN (focused) |
| --- | --- | --- |
| line-height scale | `bun test …/foundation.test.ts` → `1 fail` (`normal 1.4 vs 1.5`, `snug` present) | `bun test foundation.test.ts Card.test.ts` → `31 pass / 0 fail` |
| spacing x32/x40 | `foundation.test.ts` → `1 fail` (`spacing.x32` undefined) | `foundation.test.ts` → `19 pass / 0 fail` |
| icon `xl` | `bun test …/Icon.test.ts` → `2 fail` | `Icon.test.ts` → `10 pass / 0 fail` |
| asset tile tokens | `bun test …/AssetIconTile.composition.test.tsx` → `1 fail` | `4 pass / 0 fail` |
| theme preview rewrite | `bun test …/ThemeSwitchPreview.composition.test.tsx` → `3 fail / 2 pass` | `5 pass / 0 fail` |

## Command results

| Command | Result |
| --- | --- |
| `mise run gen` | success (codegen + cssgen, 424 files) |
| `mise run check` | **exit 0** — lint, types, format, `icons:check` (38 icons), `fonts:check`, unit (654 pass) + browser/storybook (393 pass) |
| `mise run icons:check` | exit 0 — `✓ icons up to date (38 icons)` |
| `mise run check:deps` | exit 0 (Knip, no output) |
| `mise run build` | success — `✓ 141 modules transformed`, `dist/assets/index-*.css 210.62 kB` |
| `mise run test:visual` | exit 0 (7 passed) after refreshing the Landing regression baselines |

### Landing regression caused by the Foundation line-height correction

The Pen line-height scale moves `tight 1.2 → 1.15`, `normal 1.5 → 1.4` and
`relaxed 1.75 → 1.6`. Landing consumes `tight` and `relaxed`, so all 7
`test/visual` screenshot baselines changed. This was verified as caused by the
Foundation change, not pre-existing: with a clean `src` and regenerated baseline
CSS, `landing.spec.ts` + `landing-responsive.spec.ts` pass `7/7`; with the Batch A
foundation correction they fail `7/7`. Because the Pen requirement is documented
(`YpWB5` line-height 1.15/1.4/1.6; `landing-parity-evidence.md` already records
Pen lh `1.15` / `1.6`), the Landing regression baselines were refreshed
(`mise run test:visual:update`) and re-verified `7/7` passing. No Landing source
changed except the forced, visually-neutral `snug → normal` token rename (both
resolve to 1.4). Batch E must re-run the Landing captures as final regression.

## Both-theme captures

`outputs/experiments/pencil-opencode-workflow/artifacts/batch-a/`

- `theme-switch-preview.png` — One component, two explicit theme panels (light/default on `surface/raised` white; dark on neutral.900).
- `theme-switch-preview-surfaces.png` — computed surface role in both themes.
- `asset-icon-tile.png` — `surface/sunken` tile: light `#F1F5F9`, dark `#020617`, no stroke.
- `icon.png`, `icon-sizes.png` — glyph inheritance and `sm/md/lg/xl` = 16/20/24/32.

## Unresolved concerns

- **`HUMAN REVIEW` — `font/mono`:** Pen defines IBM Plex Mono for technical/code UI; the code bundles only Inter. Adding the family requires the web-font pipeline (`src/shared/fonts/**`), which is outside Batch A's file families. Existing `code-block/` and `clipboard/` presets already document the same approximation.
- **`HUMAN REVIEW` — tracking units:** Pen resolves `tracking/tight −0.4`, `wide 0.6` as absolute numbers; the code expresses them relative (`-0.01em`, `0.02em`), so small sizes diverge. A unit decision (absolute px vs relative em) is a Foundation design call.
- **`HUMAN REVIEW` — Asset Icon Tile glyph size:** Pen's glyph frame is 22px, between the documented `icon/md` 20 and `icon/lg` 24 steps. The port keeps `md` rather than inventing a one-off size.
- **`INFO` — `spacing/sizes x9`:** not in the Pen scale; retained because ButtonIcon's `md` glyph depends on it.
- **`INFO` — Pen Foundation brand label:** the prose says `palette/blue`, the resolved variables are `palette/green`; the code follows the resolved variables.
- **`INFO` — Pen Assets icon inventory:** the usage map documents 17 keys from an earlier code snapshot; the current manifest has 38. No Pen requirement to remove existing keys.

No unresolved `FAIL` or `BLOCKED` remains for Batch A.
