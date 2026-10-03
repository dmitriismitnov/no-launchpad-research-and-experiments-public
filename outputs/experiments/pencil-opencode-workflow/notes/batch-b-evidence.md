# Batch B evidence — Actions and Forms & selection

**Date:** 2026-10-03\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Pen identity:** SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (read-only; unchanged after inspection).\
**Base commit:** `6e3b0001e775690d0eb5e4d212dcdc9dfe195223` (`docs: plan Pen migration Batch B`).\
**Method:** Pencil MCP `execute` (`Get` visitor; no document mutation) plus code reads and in-browser computed-style assertions. Statuses follow the migration spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.

## B0 — Button / Icon Button API decision (approved), cycle 1/2

**Approval:** the user explicitly approved the two Pen-documented public APIs — Button `width: "hug" | "full"`, and `loading: boolean` on both Button and ButtonIcon with a geometry-preserving decorative spinner. This supersedes only the two `BLOCKED` rows in `batch-b0-evidence.md`; all other B0 rows (including the `alert-dialog` `INFO`) stand.

### Pen source identity (re-queried read-only)

| Role | Node | Name |
| --- | --- | --- |
| Button master | `IcuBw` | Button (children `u38lw` Prefix, `VpW5X` Label, `i2ROq` Suffix) |
| Button documentation frame | `OaO6i` → `vW8MG` | Components — Actions — Button |
| Button public variants | `Z8OMS4` (`q1hwK0` label, `RrQJW` specimens, `zn9wJ` variant names) | Public variants |
| Button state contract | `xw0yy` (`h5QMsN` matrices, `sxGsG` Contract cap, `Ei6Q9` Themes `aE4P3` light / `et9ni` dark, `pzvnT` Button states with `utSXT` spec) | State contract |
| Full-width refs | `MboG8` Full primary, `GW4Jy` Full secondary | inside 280px `K4pyRx` "Full width column" |
| Destructive loading refs | `chU7Q` light, `bv3v1` dark | fill `$semantic/action/danger-bg`, loader + label |
| Icon Button master | `L72UAx` | Icon Button (child `Or7zW` Glyph) |
| Icon Button documentation frame | `OaO6i` → `L2cyL` | Components — Actions — Icon Button |
| Icon Button public variants / state | `nBBmj` (`QQ4iI`, `V1BleN`), `nqoVi` (`upZl4`, `TVJu8`) | Public variants / State contract |
| Icon Button loading ref | `R3LwyT` | `ib-Loading` (`Or7zW` → `loader-2`, 18×18) |

Verbatim Pen facts used:

- `utSXT` — `Button · anatomy: root / prefix / label / suffix / spinner · public: tone, size, width, icon placement`.
- `zn9wJ` — `tone: primary · secondary · ghost · destructive        size: sm · md        width: hug · full        icon: none · prefix · suffix`.
- `N3n07C` (`Qur3j`) — "loading keeps the label width and swaps in the indicator so layout never shifts".
- `sxGsG` (`xw0yy`) — "Loading and focus-visible never change the control geometry".
- `chU7Q` / `bv3v1` — destructive loading stays `$semantic/action/danger-bg` + `danger-fg` in both themes (never the muted disabled role).
- `TVJu8` — `Icon Button · public: tone, size · always needs an accessible label / tooltip` (no width axis).
- `R3LwyT` — the loading square swaps the glyph to the loader at the same 18px slot.
- `BAqGc` — "Accessible name is mandatory; the icon itself is decorative".

### Enumeration and disposition

| Owner | Axis | Pen values | Disposition |
| --- | --- | --- | --- |
| Button | tone | `primary · secondary · ghost · destructive` | **PASS** (B0) |
| Button | size | `sm · md` | **PASS** (B0) |
| Button | width | `hug · full` | **PASS** — public `width`; `hug` default `fit-content`, `full` `100%` (fill container) |
| Button | icon | `none · prefix · suffix` | **PASS** (B0) |
| Button | state | `default · hover · active · focus-visible · disabled` | **PASS** (B0) |
| Button | state | `loading` | **PASS** — public `loading`; disabled from interaction, geometry-preserving decorative spinner |
| Button | theme | light · dark via `data-theme` | **PASS** |
| ButtonIcon | tone / size | `primary · secondary · ghost · destructive` / `sm · md` | **PASS** (B0) |
| ButtonIcon | width | none documented | **PASS** — deliberately no width prop |
| ButtonIcon | state | `default · hover · active · focus-visible · disabled` | **PASS** (B0) |
| ButtonIcon | state | `loading` (`R3LwyT`) | **PASS** — public `loading`; loader swapped in the same square, label kept |
| ButtonIcon | accessible label | mandatory, glyph decorative (`BAqGc`) | **PASS** (B0) |

### Approved public surface and behavior

- `Button` gains `width?: "hug" | "full"` (default `hug`) and `loading?: boolean` (default `false`); `ButtonWidth` is exported. `ButtonIcon` gains `loading?: boolean` only.
- Loading sets the native `disabled` attribute, emits `data-loading="true"`, and preserves the Pen tone fill: the shared disabled paint is scoped `:not([data-loading])`, so destructive loading stays `danger.background` (red.600) instead of the muted disabled role.
- Geometry is preserved: the label/icon slots keep their layout box with `opacity: 0`, and the `spinner` part is an absolute, pointer-inert overlay (`position: absolute; inset: 0`, flex-centred loader). Only the glyph rotates; reduced motion stops it.
- The spinner is decorative (`aria-hidden`); the Button keeps its accessible name from the retained label text, and ButtonIcon keeps its required `aria-label`.
- No async behavior, callbacks, retries or persistence were added.

Changed paths: `src/shared/components/button/{button.tsx,preset.ts,index.ts,Button.test.ts,Button.composition.test.tsx,Button.stories.tsx}`, `src/shared/components/button-icon/{button-icon.tsx,preset.ts,ButtonIcon.test.ts,ButtonIcon.composition.test.tsx,ButtonIcon.stories.tsx}`, `panda.config.ts` (static emission of the runtime `width` / `loading` variants).

### Tests-first proof (RED → GREEN)

Focused unit + composition (Bun):

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/button/Button.test.ts src/shared/components/button/Button.composition.test.tsx src/shared/components/button-icon/ButtonIcon.test.ts src/shared/components/button-icon/ButtonIcon.composition.test.tsx` |
| RED exit | `1` |
| RED result | `21 tests failed` / `38 pass` (59 total across 4 files) |
| RED failures | Button recipe: `declares the anatomy`, `declares public variants only`, `declares default variants`, `maps width hug...`, `preserves geometry and exposes the spinner while loading`, all four tone contracts, `paints the loading spinner from the tone foreground`; Button composition: `maps the Pen width axis...`, `renders a decorative spinner and disables the button while loading`, `does not leak the width or loading props...`; ButtonIcon recipe: `declares public variants only`, `declares default variants`, `rotates the glyph while loading...`, all four tone contracts; ButtonIcon composition: `keeps the label and swaps in a decorative loader while loading` |
| GREEN exit | `0` |
| GREEN result | `59 pass` / `0 fail` (209 expect calls) |

Focused browser stories (Vitest + Playwright Chromium):

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/button/Button.stories.tsx src/shared/components/button-icon/ButtonIcon.stories.tsx` |
| RED exit | `1` |
| RED result | `8 failed \| 23 passed (31)`; the eight new stories: `Width Hug And Full`, `Dark Width Hug And Full`, `Loading Geometry`, `Dark Loading Geometry`, `Destructive Loading`, `Dark Destructive Loading`, `Loading Contract`, `Dark Loading Contract` |
| GREEN exit | `0` |
| GREEN result | `31 passed (31)` |

### Both-theme captures (computed style, in-browser)

| Story (theme) | Assertion | Observed |
| --- | --- | --- |
| `WidthHugAndFull` / `DarkWidthHugAndFull` | full Button fills its 280px column; hug stays intrinsic | full `280px`, hug `< 280px` and `> 0`, both themes |
| `LoadingGeometry` / `DarkLoadingGeometry` | loading root width/height equal the idle control; label box width preserved; label opacity `0`; spinner `aria-hidden`; native `disabled` | width/height delta `0`, label width delta `0`, `opacity: 0`, `aria-hidden="true"`, `disabled` |
| `DestructiveLoading` / `DarkDestructiveLoading` | `danger.background` fill + `danger.foreground` spinner while loading | fill `rgb(220, 38, 38)`, spinner `rgb(255, 255, 255)`, both themes |
| `LoadingContract` / `DarkLoadingContract` (ButtonIcon) | square 40×40, `disabled`, `aria-label` kept, loader glyph decorative | `40×40`, `disabled`, name `Save settings`, glyph char `loader` + `aria-hidden="true"` |

No code-side raster PNG was produced for this slice (**INFO**): the computed-style story assertions above are the code-side proof, consistent with the B0 raster `INFO`. Pen destructive reference PNGs remain in `artifacts/batch-b0/pen/` (`chU7Q`/`bv3v1`).

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 425 file(s)` |
| focused unit RED | `1` | `21 fail` / `38 pass` |
| focused unit GREEN | `0` | `59 pass` / `0 fail` |
| focused browser RED | `1` | `8 failed \| 23 passed (31)` |
| focused browser GREEN | `0` | `31 passed (31)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `671 pass / 0 fail` (89 files); browser `404 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-B8q62dIt.css 214.06 kB` |

Counts moved from the Batch B0 baseline (`6e3b000`): unit `663 → 671` (`+8`), browser `396 → 404` (`+8`).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| B0 Button `width: hug · full` | **PASS** |
| B0 Button / ButtonIcon `loading` + spinner | **PASS** |
| B0 destructive tone (Button / ButtonIcon) | **PASS** (retained) |
| B0 `alert-dialog` danger confirm duplication | **INFO** (retained, untouched) |
| B0 code-side raster | **INFO** (retained: computed-style proof) |
| **B0 final status** | **PASS** — the documented decision-only `BLOCKED` rows are resolved and implemented; no unresolved `FAIL` / `BLOCKED` / Critical / Important finding in this slice |

### Remaining concerns

- **INFO — indicator interpretation.** A Pen `ref` cannot add a child, so `chU7Q`/`bv3v1` show the loader through the only available slot (Prefix) with the label still present. The approved requirement is a geometry-preserving indicator; the implementation keeps the label box and centres a decorative overlay instead of injecting a prefix, which is the only form that also preserves width when the Button has no prefix. This is recorded as the chosen interpretation, not a deviation from a public axis.
- **INFO — code-side raster.** See above; Batch E can add PNG side-by-side if the reviewer requires it.
- **INFO — `alert-dialog`.** Unchanged; its `negative.600` role still diverges from Pen `action/danger` in dark theme.
- Disabled contrast is unchanged from B0 and remains `DISABLED / REVIEW`; loading is not a disabled-contrast state (it keeps the tone fill).

## B0 correction — disabled foreground scoping and destructive static emission (cycle 2/2)

**Base commit:** `b81a080f859d50e41ea38aad2774ab3956ffb58f` (`feat(shared): add Button width and loading states`).\
**Correction plan:** the reviewer's cycle-1 findings on the B0 destructive/disabled slice: (1) the child `_disabled` foreground never applied because the child slots are never the disabled element, and (2) the destructive tone was only reaching the stylesheet through source extraction, not through `staticCss`.\
**Status:** **PASS** (with one recorded `INFO`, below).

### Fixes implemented

| # | Finding | Fix |
| --- | --- | --- |
| 1 | `_disabled` on `label` / `prefixIcon` / `suffixIcon` (Button) and `icon` (ButtonIcon) compiles to `child:disabled`, which never matches a disabled native root. | Moved the shared disabled foreground onto the native root as a descendant rule per tone: `<root>:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]):not([data-loading]) .<slot>` → `semantic.action.disabled.foreground`. Child slots now carry only their tone `base` (and `_enabled` hover/active for ghost). |
| 2 | `staticCss.recipes.button[0].tone` and `buttonIcon[0].tone` omitted `destructive`, so the tone survived only because stories happen to spell `tone="destructive"`. | Added `"destructive"` to both static recipe declarations in `panda.config.ts`. |
| 3 | Unit recipe assertions asserted the (dead) child `_disabled` condition. | Assertions now target the root-to-descendant selector and assert the child slots no longer carry `_disabled`. |

The `:not([data-loading])` guard is shared with the root background rule, so loading keeps the tone fill and tone foreground: the destructive loading root stays `danger.background` (red.600) and its spinner/label/prefix stay `danger.foreground` (white) rather than the muted disabled role.

### INFO — resolved disabled-foreground hex differs from the plan text

The correction plan named disabled foreground light `rgb(168,176,187)` / dark `rgb(102,102,102)`. Those are the **pre-migration Pen palette** values (`neutral.400` `#A8B0BB` / `neutral.500` `#666666`, see `outputs/shared/pen-design-system-integration/tools/migrate-pen.ts`). The repository's `semantic.action.disabled.foreground` resolves to the migrated palette: light `palette.neutral.400` `#94A3B8` = `rgb(148,163,184)`, dark `palette.neutral.500` `#64748B` = `rgb(100,116,139)`. This matches the B0 evidence token mapping (`action/disabled-fg` `#94A3B8` / `#64748B`) and the generated `--colors-semantic-action-disabled-foreground`. Tokens are explicitly out of scope for this correction, so the browser assertions use the repository's resolved values; changing the palette would be a separate Foundation change. Recorded as **INFO**.

### Tests-first proof (RED → GREEN)

Unit recipe (Bun):

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/button/Button.test.ts src/shared/components/button-icon/ButtonIcon.test.ts` |
| RED exit | `1` |
| RED result | `4 fail` / `36 pass` (40 total); `scopes disabled foregrounds…`, `keeps the disabled condition off the child slots…`, `scopes the disabled foreground… (ButtonIcon)`, `keeps the disabled condition off the glyph slot…` |
| GREEN exit | `0` |
| GREEN result | `40 pass` / `0 fail` (168 expect calls) |

Static CSS generation (Bun, real `panda.config.ts` compiled with `include: []` and a temporary `outfile`):

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/styles/panda-static-css.test.ts` |
| RED exit | `1` |
| RED result | `0 pass` / `3 fail`; no `.button__root--tone_destructive` / `.buttonIcon__root--tone_destructive` and no descendant disabled rule in the static-only sheet |
| GREEN exit | `0` |
| GREEN result | `3 pass` / `0 fail` (10 expect calls); `Successfully extracted css from 0 file(s)` proves emission without source extraction |

Focused browser stories (Vitest + Playwright Chromium):

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/button/Button.stories.tsx src/shared/components/button-icon/ButtonIcon.stories.tsx` |
| RED exit | `1` |
| RED result | `4 failed \| 31 passed (35)`; `Disabled Slot Foregrounds`, `Dark Disabled Slot Foregrounds`, `Disabled Glyph Foregrounds`, `Dark Disabled Glyph Foregrounds` (children rendered white instead of the disabled role) |
| GREEN exit | `0` |
| GREEN result | `35 passed (35)` |

### Both-theme computed-style captures (in-browser)

| Story (theme) | Assertion | Observed |
| --- | --- | --- |
| `DisabledSlotForegrounds` / `DarkDisabledSlotForegrounds` | disabled Button `label`, `prefixIcon`, `suffixIcon` and both glyphs | light `rgb(148, 163, 184)`, dark `rgb(100, 116, 139)` |
| `DisabledGlyphForegrounds` / `DarkDisabledGlyphForegrounds` | disabled ButtonIcon `.buttonIcon__icon` and glyph | light `rgb(148, 163, 184)`, dark `rgb(100, 116, 139)` |
| `DestructiveLoading` / `DarkDestructiveLoading` | root fill + spinner foreground + child foreground while loading | fill `rgb(220, 38, 38)`, spinner/label/prefix `rgb(255, 255, 255)`, both themes (the `:not([data-loading])` exclusion keeps the danger role) |
| `DestructiveStates` / `DarkDestructiveStates` | disabled destructive root fill | light `rgb(241, 245, 249)`, dark `rgb(30, 41, 59)` (unchanged) |

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused unit RED | `1` | `4 fail` / `36 pass` |
| focused unit GREEN | `0` | `40 pass` / `0 fail` |
| static RED | `1` | `0 pass` / `3 fail` |
| static GREEN | `0` | `3 pass` / `0 fail`; extracted from `0 file(s)` |
| focused browser RED | `1` | `4 failed \| 31 passed (35)` |
| focused browser GREEN | `0` | `35 passed (35)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `676 pass / 0 fail` (90 files); browser `408 passed` (73 files) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-CO3QQwv2.css 213.68 kB` |

Counts moved from the Batch B0 shipped baseline (`b81a080`): unit `671 → 676` (`+5`), browser `404 → 408` (`+4`).

### Changed paths

`panda.config.ts`, `src/shared/components/button/{preset.ts,Button.test.ts,Button.stories.tsx}`, `src/shared/components/button-icon/{preset.ts,ButtonIcon.test.ts,ButtonIcon.stories.tsx}`, new `src/shared/styles/panda-static-css.test.ts`, this evidence. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Disposition

| Row | Disposition |
| --- | --- |
| Disabled foreground scoping (Button child slots + ButtonIcon glyph) | **PASS** |
| Destructive static emission without source extraction | **PASS** |
| Destructive loading regression (fill + white spinner/children) | **PASS** |
| Plan hex vs repository palette | **INFO** (documented above; tokens out of scope) |
| Disabled contrast | `DISABLED / REVIEW` (unchanged from B0) |

## B1 — Toggle and ToggleGroup / Segmented Control projection (cycle 1/2)

**Date:** 2026-10-03\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` — SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged; re-verified after the read-only queries).\
**Base commit:** `53c9aa76b2ac2f09256ae2cd130bddb750d9f7fb` (`fix(shared): scope Button disabled foreground and static destructive tone`).\
**Method:** Pencil MCP `execute` read-only `Get`/`Print` (`get_app_state` confirmed `ex_2.pen` as the active editor; no mutation), focused Bun composition tests and Vitest + Playwright Chromium story tests.\
**Evidence artifacts:** `artifacts/batch-b/actions/{pen-readback.md,red-green.md,composition-green.txt,browser-story-red.txt,browser-story-green.txt,check.txt,check-deps.txt,build.txt}`.

### Pen enumeration gate (B1)

| Owner | Pen node / frame | Documented public variant / state | Disposition |
| --- | --- | --- | --- |
| Toggle | `gkK5e` → `MApo8` | `icon or label` anatomy; states `default · hover · active · pressed · focus-visible · disabled` | **PASS** |
| Toggle | `MApo8` accessibility | "Icon-only toggles require an accessible label."; "Expose pressed state…"; "Keyboard toggles with Enter and Space." | **PASS** — approved public API: optional `label`; icon-only form requires a non-empty `aria-label` |
| Toggle Group | `e5ySA` → `OHpCJ` | "Single vs multiple selection is a public variant and must be named."; states `default · hover · pressed · focus-visible · disabled` | **PASS** — `selectionMode: "single" \| "multiple"` (default `multiple`); multiple keeps `role="group"` + `aria-pressed` |
| Toggle Group | `OHpCJ` accessibility | "Expose selected and pressed state per item."; "Arrow keys move between items; Enter and Space toggle."; "focus-visible is drawn per item…" | **PASS** — single mode roving focus, arrows skip disabled, Enter/Space select |
| Segmented Control | `yqYp1` (master ref `e5ySA`) | "two · three · four segments, with icon, disabled"; states `selected · hover · focus-visible · disabled` | **PASS** — exclusive `single` projection of the existing owner; no `SegmentedControl` export/component added |
| Segmented Control | `yqYp1` accessibility | "Radiogroup semantics with arrow-key movement."; "The selected segment is announced."; "Each segment has an accessible name even when icon-only." | **PASS** — `role="radiogroup"` + `role="radio"`/`aria-checked`; icon-only options carry `aria-label` |
| Segmented Control | `yqYp1` content rules | "One segment is always selected."; "The control keeps its width when the selection changes." | **INFO** — controlled value displays its first entry; the selected label weight `semibold` matches `OZiXD` (`fw=600`), so the width rule is preserved by the existing recipe |
| Segmented Control | `yqYp1` named part | "sliding indicator" | **INFO** — no documented motion; animation stays out per the behaviour boundary |

### Approved public surface (per handoff)

- `Toggle`: `label` is now optional; a non-empty `aria-label` is required for (and only for) the icon-only form. Controlled (`pressed` + `onPressedChange`) and uncontrolled (`defaultPressed`) `aria-pressed` behavior is unchanged; disabled remains a native no-op; the icon stays decorative (`aria-hidden`).
- `ToggleGroup`: gains `selectionMode?: "single" | "multiple"` (default `multiple`). Options gain `icon?` and a named icon-only form (`aria-label`). The `readonly string[]` `value`/`defaultValue`/`onChange` contract is unchanged. `multiple` keeps `role="group"` + per-item `aria-pressed`. `single` renders `role="radiogroup"` with `role="radio"` + `aria-checked`, exactly one selected entry (the first array entry), a single roving `tabindex`, arrow keys that move focus only and skip disabled items, and Enter/Space selection. An option without a label or accessible name is rejected.
- No `SegmentedControl` component, export, tab, persistence, animation, validation or route behaviour was added.

### Tests-first proof (RED → GREEN)

Focused composition (Bun):

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/toggle/Toggle.composition.test.tsx src/shared/components/toggle-group/ToggleGroup.composition.test.tsx` |
| RED exit | `1` |
| RED result | `10 fail` / `13 pass` (23 total), `43 expect() calls` |
| RED failures | the seven new ToggleGroup contract tests (`radiogroup`, malformed first-selection, roving tab stop, no-selection fallback, icon-only names, 2/3/4 segments, unnamed-option rejection) and the three new Toggle icon-only tests (accessible name, unnamed rejection, empty label) |
| GREEN exit | `0` |
| GREEN result | `23 pass` / `0 fail` (54 expect calls) |

Focused browser stories (Vitest + Playwright Chromium), proven test-first by reverting only `toggle/toggle.tsx`, `toggle-group/toggle-group.tsx`, `toggle-group/preset.ts` during a temporary `git stash`, regenerating, and observing RED:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/toggle/Toggle.stories.tsx src/shared/components/toggle-group/ToggleGroup.stories.tsx` |
| RED exit | `1` |
| RED result | `2 failed` files, `10 failed \| 17 passed (27)` — `Icon Only`, `Dark Icon Only` (Toggle); `Single Exclusive`, `Dark Single Exclusive`, `Single Keyboard`, `Single Disabled No Op`, `Icon Only`, `Dark Icon Only`, `Segment Counts`, `Dark Segment Counts` (ToggleGroup) |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `27 passed (27)` |

### Both-theme / state coverage

| Contract | Light story assertion | Dark story assertion |
| --- | --- | --- |
| Toggle default surface | `Light` → `rgb(248, 250, 252)` | `Dark` → `rgb(2, 6, 23)` |
| Toggle pressed / icon-only / disabled no-op / Enter+Space | `Pressed`, `IconOnly`, `DisabledNoOp`, `Keyboard`, `UncontrolledInteraction` | `DarkIconOnly` |
| ToggleGroup multiple `role="group"` + `aria-pressed` | `ReferenceLight`, `MultipleIndependent`, `Interactive`, `Disabled` | `ReferenceDark` |
| ToggleGroup single `radiogroup` + one `aria-checked` | `SingleExclusive`, `SegmentCounts` | `DarkSingleExclusive`, `DarkSegmentCounts` |
| ToggleGroup roving focus / arrows skip disabled / Enter select | `SingleKeyboard` | — (logic is theme-independent; selection is asserted in the light story) |
| ToggleGroup disabled single no-op | `SingleDisabledNoOp` | — |
| ToggleGroup icon-only accessible names | `IconOnly` | `DarkIconOnly` |
| Two / three / four segments | `SegmentCounts` (2+3+4) | `DarkSegmentCounts` (2+4) |

Hover / active / focus-visible styling is unchanged from the existing recipes (the `toggle` and `toggleGroup` presets are the same for those states); the shared `semantic.focus.ring` / `borderWidths.thick` focus ring and the `pressed` surface are asserted by the composition and browser tests above. Disabled contrast remains **`DISABLED / REVIEW`** in both themes.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `10 fail` / `13 pass` |
| focused composition GREEN | `0` | `23 pass` / `0 fail` |
| focused browser RED | `1` | `10 failed \| 17 passed (27)` |
| focused browser GREEN | `0` | `27 passed (27)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `687 pass / 0 fail` (90 files); browser `422 passed` (73 files) |
| `mise run check:deps` | `1` | **BLOCKED (pre-existing, out of B1 scope)** — `Unlisted dependencies @pandacss/node src/shared/styles/panda-static-css.test.ts:6:53`, introduced by the Batch B0 static-CSS test and reproduced at HEAD with the B1 diff stashed. B1's own `ToggleGroupSelectionMode` unused-export finding was fixed. |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-RgfOP5jp.css 213.78 kB` |

Counts moved from the Batch B0 shipped baseline (`53c9aa7`): unit `676 → 687` (`+11`), browser `408 → 422` (`+14`).

### Changed paths

`src/shared/components/toggle/{toggle.tsx,Toggle.composition.test.tsx,Toggle.stories.tsx}`, `src/shared/components/toggle-group/{toggle-group.tsx,preset.ts,ToggleGroup.composition.test.tsx,ToggleGroup.stories.tsx}`, `outputs/experiments/pencil-opencode-workflow/artifacts/batch-b/actions/` (new), this evidence. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Toggle label-or-icon + icon-only accessible label | **PASS** |
| Toggle controlled/uncontrolled `aria-pressed`, disabled no-op, Enter/Space | **PASS** |
| Toggle Group `single · multiple` named public variant | **PASS** |
| Toggle Group exclusive radiogroup + announced selection + roving arrow focus | **PASS** |
| Toggle Group option icon / icon-only accessible name | **PASS** |
| Segmented Control 2/3/4 exclusive segments | **PASS** (projection of `e5ySA`, no new component) |
| Toggle / ToggleGroup hover · active · focus-visible visuals | **PASS** (existing recipe states, unchanged) |
| Disabled contrast | `DISABLED / REVIEW` (both themes) |
| `mise run check:deps` pre-existing `@pandacss/node` finding | **BLOCKED (out of scope)** — needs a dependency/Knip-config decision owned by the B0 static-CSS slice, not B1 |
| **B1 final status** | **PASS** for the action enumeration/API slice; the only blocker is the pre-existing, out-of-scope Knip finding |
