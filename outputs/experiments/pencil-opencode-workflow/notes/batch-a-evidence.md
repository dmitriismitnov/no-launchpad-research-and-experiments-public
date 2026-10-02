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
| Nature | A preview block, not a controller; `YQ6kU` renders two instances of the same master (`theme: light` / `theme: dark`) | Was a `Switch` controller with controlled/uncontrolled theme + `onThemeChange`; corrected (cycle 2) to a passive single fixed master with no controller API | FAIL → PASS |
| Anatomy | `q5xZR3` single 420×383 block, vertical, `gap 14`, padding 20, fill `surface/raised`, radius `lg`, stroke `border/subtle`; fixed Head (moon + "Theme preview" md semibold + `theme` badge), Buttons (Primary/Secondary), Input (`team@acme.dev`), Badges (Selected/Passing/Draft), Card (`Card title`), Tabs (Preview/Code) | Single fixed master; the anatomy is owned by the component (`root`/`head`/`title`/`actions`/`badges` slots) and composed from the existing public owner components only | PASS (cycle 2) |
| API | No component API for the theme (`theme` is the context node property, not a prop) | No `theme` / `defaultTheme` / `onThemeChange` / `ThemeSwitchValue`; cycle 2 also removed `children` / `label` / `lightLabel` / `darkLabel`. Deliberate breaking API, documented below | PASS (cycle 2) |
| Theme axis | `data-theme` only (`theme` node property in Pen) | The component sets **no** `data-theme`; the two explicit contexts are composed only in the Storybook `TwoThemes` story | PASS (cycle 2) |
| Both themes | Same master in light and dark | Story `TwoThemes` mounts two instances; computed `surface/raised` = `rgb(255,255,255)` / `rgb(15,23,42)` | PASS (cycle 2) |
| Evidence | — | `theme-switch-preview.png`, `theme-switch-preview-surfaces.png` are the cycle-1 captures of the superseded two-panel port; not regenerated in cycle 2 (see caveat) | INFO (cycle-1 captures) |

Code paths: `theme-switch-preview.tsx`, `preset.ts`, `index.ts`, `ThemeSwitchPreview.stories.tsx`, `ThemeSwitchPreview.composition.test.tsx`. Public API (cycle 2): the component owns a single fixed Pen master and takes only native `div` attributes; `children`, `label`, `lightLabel`, `darkLabel`, `theme`, `defaultTheme`, `onThemeChange` and `ThemeSwitchValue` are all removed. This is the documented Pen requirement — `q5xZR3` is a fixed preview master, not a theme controller — and `YQ6kU`'s two-theme composition lives only in the Storybook `TwoThemes` story. The cycle-1 captures predate this correction.

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

---

## Cycle 1/2 correction ledger

**Cycle timestamp (UTC):** `2026-10-02T23:30:08Z`\
**Pen authority (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (`q5xZR3`, `YQ6kU`, `YpWB5`); snapshot reversal authority `3c8f9a1^`.\
**Process:** each correction is tests-first — the focused test is written and observed RED (nonzero exit) before the code change, then observed GREEN (exit 0) after. All production changes are minimal and confined to the correction scope.

### Correction 1 — `q5xZR3` is a single fixed 420×383 passive master

**Pen authority.** `q5xZR3` re-queried: frame `layout: vertical`, `gap 14`, `padding 20`, `width 420`, rendered bounds `420×383`, fill `#FFFFFF` (`surface/raised`), stroke `#E2E8F0` (`border/subtle`), `strokeWidth 1`, `cornerRadius 16` (`lg`); children Head (`gap 10`; moon + "Theme preview" 16/600 + `theme` badge), Buttons (`gap 10`; Primary/Secondary), Input (`team@acme.dev`), Badges (`gap 8`; Selected/Passing/Draft), Card (`Card title`), Tabs (`gap 20`; Preview/Code). `YQ6kU` places two refs of `q5xZR3` with `theme: light` and `theme: dark`; it is a comparison row, not a component API.

| Field | Value |
| --- | --- |
| UTC | `2026-10-02T23:30:08Z` |
| RED command | `bun test src/shared/components/theme-switch-preview/ThemeSwitchPreview.composition.test.tsx src/shared/styles/foundation/foundation.test.ts` |
| RED exit | `1` |
| RED output (verbatim excerpt) | `error: expect(received).toMatchObject(expected)` … `+ "flexWrap": "wrap", + "gap": "x12",` … `(fail) theme switch preview composition > projects the fixed 420x383 Pen master frame` … `(fail) theme switch preview composition > renders the fixed Pen anatomy with the Pen copy once` … `(fail) theme switch preview composition > is a single passive block: no theme context or controller` … `20 pass / 4 fail` … `EXIT_CODE=1` |
| Files (minimal) | `src/shared/components/theme-switch-preview/theme-switch-preview.tsx`, `preset.ts`, `ThemeSwitchPreview.stories.tsx`, `ThemeSwitchPreview.composition.test.tsx` |
| Change | The component becomes one fixed `420×383` block (`root` slot: vertical, `gap x7`, `padding x10`, `borderRadius lg`, `borderColor semantic.border.subtle`, `backgroundColor semantic.surface.raised`) that owns the Pen Head/Buttons/Input/Badges/Card/Tabs anatomy built only from existing public components (`Icon`, `Badge`, `Button`, `Input`, `Card`, `Tab`/`TabList`); no `children`, no caption panels, no `data-theme`, no controller. `index.ts` unchanged and retains no controller export. Stories reduced to `Playground` (single) and `TwoThemes`, which composes the two light/dark instances. |
| GREEN command | `bun test src/shared/components/theme-switch-preview/ThemeSwitchPreview.composition.test.tsx src/shared/styles/foundation/foundation.test.ts` |
| GREEN exit | `0` |
| GREEN output (verbatim excerpt) | `(pass) theme switch preview composition > projects the fixed 420x383 Pen master frame` … `(pass) theme switch preview composition > is a single passive block: no theme context or controller` … `24 pass / 0 fail` … `EXIT_CODE=0` |

Deliberate breaking API: `theme`, `defaultTheme`, `onThemeChange`, `ThemeSwitchValue`, `children`, `label`, `lightLabel` and `darkLabel` are removed. `ThemeSwitchPreviewProps` is now `Omit<ComponentProps<"div">, "children">`.

### Correction 2 — Foundation keeps Pen `normal: 1.4` and documents `snug: 1.4`

**Pen authority.** `YpWB5` `Foundation — Typography`: `line-height/tight 1.15 · normal 1.4 · relaxed 1.6`. `normal` keeps its Pen value; `snug` is retained as a legacy alias for the pre-migration name of the same `1.4` step.

| Field | Value |
| --- | --- |
| UTC | `2026-10-02T23:30:08Z` |
| RED command | `bun test src/shared/components/theme-switch-preview/ThemeSwitchPreview.composition.test.tsx src/shared/styles/foundation/foundation.test.ts` |
| RED exit | `1` |
| RED output (verbatim excerpt) | `- "snug": { "value": 1.4, }` … `(fail) typography foundation > exposes the Pen line-height scale with the legacy snug alias [9.38ms]` … `20 pass / 4 fail` … `EXIT_CODE=1` |
| Files (minimal) | `src/shared/styles/foundation/typography/line-heights.ts`, `src/shared/styles/foundation/foundation.test.ts` |
| Change | Added `snug: { value: 1.4, }` with a JSDoc note; `normal` stays `1.4`. `Card`'s `normal` usage is **not** reverted (Card was out of this correction's scope). |
| GREEN command | same focused command |
| GREEN exit | `0` |
| GREEN output (verbatim excerpt) | `(pass) typography foundation > exposes the Pen line-height scale with the legacy snug alias` … `24 pass / 0 fail` … `EXIT_CODE=0` |

### Correction 3 — Landing `snug` revert and seven snapshot reversals

**Source authority.** `3c8f9a1` changed only `src/app/Landing.tsx` `codeSurface.lineHeight` from `"snug"` to `"normal"` and refreshed seven `test/visual` baselines. Correction: restore the Landing hunk and the seven binaries to `3c8f9a1^`, and do not run a snapshot update.

| Field | Value |
| --- | --- |
| UTC | `2026-10-02T23:30:08Z` |
| RED command | `bun test /private/var/folders/nc/rn4yx8j16ll1gn5nqmfnc1wh0000gn/T/opencode/batch-a-landing-snug.test.ts` (temporary, uncommitted) |
| RED exit | `1` |
| RED output (verbatim excerpt) | `Expected to contain: "lineHeight: \\"snug\\""` … `Received: "const codeSurface = {\n    borderRadius: \"md\",\n    backgroundColor: \"semantic.surface.sunken\",\n    padding: \"x6\",\n    fontSize: \"xs\",\n    lineHeight: \"normal\",\n ..."` … `(fail) Landing code surface keeps the legacy snug alias [3.05ms]` … `0 pass / 1 fail` … `EXIT_CODE=1` |
| Files (minimal) | `src/app/Landing.tsx` (`codeSurface.lineHeight: "normal"` → `"snug"`); seven `test/visual` snapshot binaries restored with `git checkout 3c8f9a1^ -- <paths>` (`landing-desktop-{dark,light}`, `landing-mobile-{dark,light}`, `landing-tablet-{dark,light}`, `landing-chromium-darwin.png`) |
| GREEN command | `bun test /private/var/folders/nc/rn4yx8j16ll1gn5nqmfnc1wh0000gn/T/opencode/batch-a-landing-snug.test.ts` |
| GREEN exit | `0` |
| GREEN output (verbatim excerpt) | `(pass) Landing code surface keeps the legacy snug alias [4.13ms]` … `1 pass / 0 fail` … `EXIT_CODE=0` |

The temporary test file was deleted after the GREEN run; no snapshot update (`mise run test:visual:update`) was run.

### Verification commands (cycle 2)

| Command | Exit | Output (verbatim excerpt) |
| --- | --- | --- |
| `mise run gen` | `0` | `Successfully extracted css from 424 file(s)`; codegen emitted `css`, `tokens`, `patterns`, `recipes`, `jsx` |
| `mise run check` | `0` | lint + types + format + `icons:check` + `fonts:check`; unit `654 pass / 0 fail` (`88` files); browser/storybook `73 passed (73)` files, `392 passed (392)` tests |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-Dp9jx_uS.css 210.79 kB` |

### Cycle 2 caveats

- The `theme-switch-preview.png` / `theme-switch-preview-surfaces.png` captures predate the single-master port; they still show the superseded two-panel layout. Regenerating them was outside the correction's command set, so they are recorded as `INFO (cycle-1 captures)`. The corrected component's geometry and content are instead proven by the focused composition test and the `TwoThemes` story.
- The component's `height: 383px` reproduces Pen's rendered master height (`q5xZR3` uses `fit_content`, measured at 383). If the approximated internal components ever grow past that, content would overflow rather than expand; no Pen `clip` is set.
- The seven restored `test/visual` baselines reflect `3c8f9a1^`. Because the Pen line-height scale still moves Landing's `tight`/`relaxed` consumers, `mise run test:visual` is expected to be re-captured by Batch E as the final Landing regression; no snapshot update was performed here.
- Deliberate breaking API for `ThemeSwitchPreview` is documented above (removed controller, `children` and caption props).

---

## Cycle 3 correction ledger

**Cycle timestamp (UTC):** `2026-10-02T23:50:31Z`\
**Authority (read-only):** Pen `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (`q5xZR3`, `DsHK8`, `XiPDu`, `T4klu9`, `YpWB5`); snapshot baseline authority `3c8f9a1^`; historical ref `3c8f9a1`.\
**Process:** each correction is tests-first; every focused test is observed RED (nonzero exit) before the production change and GREEN (exit 0) after. `Landing.tsx` was not modified.

### Correction 1 — `q5xZR3` is one named inert static image

**Pen authority.** `q5xZR3` remains the fixed 420×383 passive master (unchanged anatomy/geometry/copy). It is a preview, not a controller; the apparent Buttons, read-only Input and Tabs are decorative.

| Field | Value |
| --- | --- |
| UTC | `2026-10-02T23:50:31Z` |
| RED command (composition) | `bun test src/shared/components/theme-switch-preview/ThemeSwitchPreview.composition.test.tsx` |
| RED command (browser) | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/theme-switch-preview/ThemeSwitchPreview.stories.tsx` |
| RED exit | `1` composition / `1` browser |
| RED result (concise) | composition `5 pass / 3 fail` — `is one named static image`, `forcibly owns role=img and aria-label after consumer props`, `puts every apparent button, input and tab control inside an inert subtree`; browser `Playground` `AssertionError: expected null to be 'img'` |
| Files (minimal) | `theme-switch-preview.tsx`, `ThemeSwitchPreview.composition.test.tsx`, `ThemeSwitchPreview.stories.tsx` |
| Change | Root sets `role="img"` + `aria-label="Theme preview"` **after** `{...props}` so a consumer cannot override them. The `.actions` group, the read-only `Input` and the `TabList` carry the native boolean `inert`; no `aria-hidden`, no disabled styling, no callback/state/theme context, no public API change (`ThemeSwitchPreviewProps` unchanged). |
| GREEN command | same two focused commands |
| GREEN exit | `0` composition / `0` browser |
| GREEN result (concise) | composition `8 pass / 0 fail`; browser `Playground` + `TwoThemes` `2 passed`; Pen copy (`Primary`/`Secondary`/`team@acme.dev`/`Selected`/`Passing`/`Draft`/`Card title`/`Preview`/`Code`) and the 420×383 recipe frame unchanged |

### Correction 2 — reproducible Landing `snug` / foundation proof

| Field | Value |
| --- | --- |
| UTC | `2026-10-02T23:50:31Z` |
| Checker path | `scripts/assert-landing-snug.ts` |
| RED command | `bun run scripts/assert-landing-snug.ts --ref 3c8f9a1` |
| RED ref/path | `3c8f9a1:src/app/Landing.tsx` |
| RED exit / result (concise) | `1` — `FAIL Landing codeSurface.lineHeight === "snug" value="normal"`; `foundation snug/normal === 1.4` PASS; `2/3 passed` |
| GREEN command | `bun run scripts/assert-landing-snug.ts` |
| GREEN ref/path | worktree `src/app/Landing.tsx`, `src/shared/styles/foundation/typography/line-heights.ts` |
| GREEN exit / result (concise) | `0` — all three assertions PASS; `3/3 passed` |
| Contract test | `src/app/Landing.contract.test.ts` — `Landing codeSurface keeps the legacy snug alias` + `foundation keeps snug and normal at the Pen 1.4 step`; `2 pass / 0 fail` |
| Foundation test | `src/shared/styles/foundation/foundation.test.ts` `exposes the Pen line-height scale with the legacy snug alias` (`tight 1.15 · snug 1.4 · normal 1.4 · relaxed 1.6`) |
| Dependencies | none added; the checker uses only `node:child_process`, `node:fs`, `node:path` and `git show` |

### Correction 3 — Pen re-read and the snapshots hard stop

**Pen authority (read-only re-query + re-export).** The three single-theme landing frames carry no `theme` property:

| Frame | ID | Width | Rendered bounds | Sections (top to bottom) |
| --- | --- | --- | --- | --- |
| 10 Landing — desktop | `DsHK8` | 1440 | 1440×4256 | Header, Hero, Value strip, Section Header, 3 Features, Workflow, Theme preview, CTA, Footer |
| 11 Landing — tablet | `XiPDu` | 768 | 768×4380 | Header, Hero, Value strip, 3 Features (no Section Header), Workflow, Theme preview, CTA, Footer |
| 12 Landing — mobile | `T4klu9` | 390 | 390×4768 | Header, Mobile menu, Hero, Value strip, 3 Features, Workflow, Theme preview, CTA, Footer |

**Dark Pen landing frames are absent, honestly.** The only themed nodes in the document are `k0ACg` (Preview light), `v7jOB` (Preview dark), `CIU7d` / `r4N3b` / `Tg1TN` (Dark preview), all inside the theme-comparison/library frames at depth 3. No landing frame is themed; the only top-level `… Dark` root is `rWD94` "Create Project — Form — Desktop Dark", unrelated to the landing screen. Dark landing parity can only be exercised in code through `data-theme`.

**Re-export reproducibility.** `Export(DsHK8/XiPDu/T4klu9, png, scale 1)` re-created the three `artifacts/landing-parity/pen/*.png` byte-for-byte identical to the committed exports (`cmp` clean for all three), at the same 1440×4256 / 768×4380 / 390×4768 dimensions.

**Attribution experiment (control → fresh).**

| Field | Value |
| --- | --- |
| UTC | `2026-10-02T23:50:31Z` |
| Control state | current worktree with the Landing-rendering closure reverted to `3c8f9a1^` (`foundation/typography/line-heights.ts`, `card/preset.ts`, `icon/icon.tsx`, `icon/preset.ts`, `layout/sizes.ts`, `layout/spacing.ts`) + `mise run gen` |
| Control command | `mise run test:visual` |
| Control exit / result | `0` — `7 passed`; the committed (`3c8f9a1^`) baselines are reproduced exactly, so the environment (Chromium/fonts) is stable and the committed snapshots correspond to the baseline code |
| Fresh state | current worktree (restored) + `mise run gen` |
| Fresh command | `mise run test:visual` |
| Fresh exit / result (concise) | `1` — `7 failed`, all at the screenshot step after every geometry assertion passed. Widths identical; heights reduced: desktop 3762→3662, tablet 3888→3796, mobile 5037→4903, full-page 7667→7459 (pixel ratios 0.06–0.12) |
| Delta attribution | `git diff 3c8f9a1^..worktree` over the Landing-rendering closure changes only the foundation line-heights (`tight 1.2→1.15`, `normal 1.5→1.4`, `relaxed 1.75→1.6`, retained `snug 1.4`) plus the value-neutral Card token rename (`snug`→`normal`, both 1.4) and the unused `x32/x40`/icon `xl` additions. Control reproduced `3c8f9a1^` exactly, and the refreshed snapshots were byte-identical to `3c8f9a1` before being reverted. |
| Hard-stop measurement (current code vs Pen, CDP computed styles) | `landing-feature-tokens`: desktop `paddingBlock 32` vs Pen `64`, `gap 32` vs `72`, `visual height 273` vs `380`; tablet `paddingBlock 24` vs `48`, `gap 24` vs `32`, `visual 204` vs `300`; mobile `paddingBlock 24` vs `36`, `gap 24` vs `16`, `visual 204` vs `260`; hero primary `height 40` (desktop/tablet) vs Pen `48`. These are measured Pen-code geometry mismatches that **cannot be attributed solely to the Foundation line-height correction**. |
| Decision | **HARD STOP** — the seven `test/visual` snapshots were **not** updated (the refreshed files, although byte-identical to `3c8f9a1`, were reverted to the committed `3c8f9a1^` baselines with `git checkout HEAD -- test/visual/__snapshots__`). `mise run test:visual` therefore stays failing `7/7` by design. Batch A classified **BLOCKED** on this subtask. |

### Cycle 3 command results

| Command | Exit | Concise result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen success (425 files) |
| focused composition | `0` | `8 pass / 0 fail` |
| focused browser story | `0` | `2 passed` (`Playground`, `TwoThemes`) |
| `bun run scripts/assert-landing-snug.ts --ref 3c8f9a1` | `1` | `2/3 passed` (Landing value `"normal"`) |
| `bun run scripts/assert-landing-snug.ts` | `0` | `3/3 passed` |
| `bun test …contract.test.ts …foundation.test.ts` | `0` | contract `2 pass / 0 fail`; all focused `29 pass / 0 fail` |
| `mise run test:unit` | `0` | `659 pass / 0 fail` (`89` files) |
| `mise run test:browser` | `0` | `73` files, `392 passed` |
| `mise run test:visual` | `1` | `7 failed` (intentionally failing under the hard stop; see above) |
| `mise run check` | `0` | lint + types + format + `icons:check` + `fonts:check`; unit `659 pass`, browser `392 pass` |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-Dp9jx_uS.css 210.79 kB` |

### Cycle 3 status

- Correction 1 (`q5xZR3` inert named image): **PASS**.
- Correction 2 (reproducible `snug` proof): **PASS**.
- Correction 3 (Landing snapshot refresh): **BLOCKED** — measured Pen-code geometry mismatches cannot be attributed solely to the Foundation line-height correction, so the seven visual baselines stay at `3c8f9a1^` and `mise run test:visual` remains failing `7/7`.
