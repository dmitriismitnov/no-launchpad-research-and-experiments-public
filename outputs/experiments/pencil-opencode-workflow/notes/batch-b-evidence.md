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
**Evidence artifacts:** `artifacts/batch-b/actions/{pen-readback.md,red-green.md}`.

### Pen enumeration gate (B1)

| Owner | Pen node / frame | Documented public variant / state | Disposition |
| --- | --- | --- | --- |
| Toggle | `gkK5e` → `MApo8` | `icon or label` anatomy; states `default · hover · active · pressed · focus-visible · disabled` | **PASS** |
| Toggle | `MApo8` accessibility | "Icon-only toggles require an accessible label."; "Expose pressed state…"; "Keyboard toggles with Enter and Space." | **PASS** — approved public API: optional `label`; the icon-only form requires an actual icon **and** a non-empty `aria-label` (compile time and runtime) |
| Toggle Group | `e5ySA` → `OHpCJ` | "Single vs multiple selection is a public variant and must be named."; states `default · hover · pressed · focus-visible · disabled` | **PASS** — `selectionMode: "single" \| "multiple"` (default `multiple`); multiple keeps `role="group"` + `aria-pressed` |
| Toggle Group | `OHpCJ` accessibility | "Expose selected and pressed state per item."; "Arrow keys move between items; Enter and Space toggle."; "focus-visible is drawn per item…" | **PASS** — single mode roving focus, arrows skip disabled, Enter/Space select |
| Segmented Control | `yqYp1` (master ref `e5ySA`) | "two · three · four segments, with icon, disabled"; states `selected · hover · focus-visible · disabled` | **PASS** — exclusive `single` projection of the existing owner; no `SegmentedControl` export/component added |
| Segmented Control | `yqYp1` accessibility | "Radiogroup semantics with arrow-key movement."; "The selected segment is announced."; "Each segment has an accessible name even when icon-only." | **PASS** — `role="radiogroup"` + `role="radio"`/`aria-checked`; icon-only options carry `aria-label` |
| Segmented Control | `yqYp1` content rules | "One segment is always selected."; "The control keeps its width when the selection changes." | **PASS** — the effective selection is the first supplied value that maps to an option, otherwise the first option even when disabled, so exactly one segment is checked; the selected label weight `semibold` matches `OZiXD` (`fw=600`), so the width rule is preserved by the existing recipe |
| Segmented Control | `yqYp1` named part | "sliding indicator" | **INFO** — no documented motion; animation stays out per the behaviour boundary |

### Approved public surface (per handoff)

- `Toggle`: `label` is now optional; the icon-only form requires an actual icon **and** a non-empty `aria-label`, enforced at compile time and rejected at runtime. A whitespace-only label counts as label-less; a whitespace-only accessible name is rejected. Controlled (`pressed` + `onPressedChange`) and uncontrolled (`defaultPressed`) `aria-pressed` behavior is unchanged; disabled remains a native no-op; the icon stays decorative (`aria-hidden`).
- `ToggleGroup`: gains `selectionMode?: "single" | "multiple"` (default `multiple`). Options gain `icon?` and a named icon-only form (actual icon + non-empty `aria-label`). The `readonly string[]` `value`/`defaultValue`/`onChange` contract is unchanged. `multiple` keeps `role="group"` + per-item `aria-pressed`. `single` renders `role="radiogroup"` with `role="radio"` + `aria-checked`; the effective selection is the first supplied value that maps to an option, otherwise the first option even when disabled, so exactly one segment is checked; the roving `tabindex` is independent of selection (the focused enabled item, otherwise the first enabled item); arrow keys move focus only and skip disabled items; Enter/Space select. A label-less option without an icon or without a non-empty accessible name is rejected.
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

Real keyboard focus-visible styling and the disabled surface are asserted in both themes by the browser stories (see the cycle-2 correction below); hover and active styling are **not** claimed this cycle. Disabled contrast remains **`DISABLED / REVIEW`** in both themes.

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
| Toggle / ToggleGroup focus-visible ring (real keyboard) + disabled surface, both themes | **PASS** (cycle 2 browser assertions) |
| Label-less icon + non-empty accessible name contract (compile time and runtime) | **PASS** (cycle 2) |
| ToggleGroup disabled selected segment paints the disabled surface | **PASS** (cycle 2) |
| Disabled contrast | `DISABLED / REVIEW` (both themes) |
| `mise run check:deps` pre-existing `@pandacss/node` finding | **BLOCKED (out of scope)** — needs a dependency/Knip-config decision owned by the B0 static-CSS slice, not B1 |
| **B1 final status** | **PASS** for the action enumeration/API slice; the only blocker is the pre-existing, out-of-scope Knip finding |

## B1 correction — selection, icon contract, disabled surface, browser proof (cycle 2/2)

**Base commit:** `42c0f864` (`feat(shared): add Toggle icon-only label and ToggleGroup selection modes`).\
**Correction plan:** the reviewer's cycle-1 findings on the B1 slice: (1) single-mode effective selection must be the first valid supplied value, else the first option even when disabled, with exactly one `aria-checked`; (2) the roving tab stop must be independent of selection (first enabled); (3) the label-less contract must require an actual icon as well as a non-empty accessible name, at compile time and runtime, and reject whitespace; (4) a disabled selected single segment must paint the disabled group surface, not the selected one; (5) the browser evidence must assert the real keyboard focus-visible ring and the disabled background/foreground/cursor in both themes, with no unproven hover/active claim.\
**Status:** **PASS**.

### Fixes implemented

| # | Finding | Fix |
| --- | --- | --- |
| 1 | Single mode used the first array entry verbatim, so an unknown or absent value left no segment checked and a disabled first option could never be checked. | The effective selection is now the first supplied value that maps to an option, otherwise `options[0].value`; a disabled first option is still checked when nothing valid is supplied, so exactly one `aria-checked` holds whenever options exist. |
| 2 | The tab stop fell back to the selected item. | The roving tab stop is the focused enabled item, otherwise the first enabled item, independent of selection. |
| 3 | The icon-only union branch only required `aria-label`; runtime only checked label/name length and accepted whitespace. | The label-less `Toggle` / option branch now requires `icon: IconName`; runtime requires an actual icon and a non-empty trimmed `aria-label` (or a trimmed label); whitespace-only names are rejected. |
| 4 | A disabled selected segment kept the `pressed` background/border/foreground. | The `pressed` variant now carries a `_disabled` override (more specific than the plain pressed class in the same cascade layer) that paints the disabled group surface: transparent background/border, disabled foreground, `not-allowed` cursor. |
| 5 | Evidence claimed hover/active visuals and shared a raw-log list. | The six raw log files were removed; browser stories assert the real keyboard focus-visible outline and the disabled background/foreground/cursor in both themes; hover/active are no longer claimed. |

The cycle-1 public surface is otherwise unchanged: no new prop, component, export or dependency was added, and `panda.config.ts` was not touched.

### Tests-first proof (RED → GREEN)

Focused composition (Bun):

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/toggle/Toggle.composition.test.tsx src/shared/components/toggle-group/ToggleGroup.composition.test.tsx` |
| RED result | `9 fail` / `23 pass` (32 total), `65 expect() calls` |
| RED failures | Toggle — label-less reject without an icon, whitespace-only accessible name reject, whitespace-only label treated as icon-only; ToggleGroup — first valid supplied value, fallback to a disabled first option, tab stop independent of selection, first option/first-enabled tab stop with no supplied value, label-less reject without an icon, whitespace-only accessible name reject |
| GREEN result | `32 pass` / `0 fail`, `73 expect() calls` |

Focused browser stories (Vitest + Playwright Chromium), proven test-first by reverting only `toggle/toggle.tsx`, `toggle-group/toggle-group.tsx` and `toggle-group/preset.ts`, regenerating, and observing RED:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/toggle/Toggle.stories.tsx src/shared/components/toggle-group/ToggleGroup.stories.tsx` |
| RED result | `1 failed \| 1 passed` files, `2 failed \| 33 passed (35)` — `Disabled Selected Surface Light`, `Disabled Selected Surface Dark` |
| GREEN result | `2 passed` files, `35 passed (35)` |

### Both-theme browser captures (computed style, in browser)

| Story (theme) | Assertion | Observed |
| --- | --- | --- |
| `FocusVisibleLight` / `FocusVisibleDark` (Toggle) | real keyboard focus (`user.tab()`) paints the focus ring | `outline-style: solid`, `outline-width: 2px`, `outline-color: rgb(34, 197, 94)` |
| `FocusVisibleLight` / `FocusVisibleDark` (ToggleGroup) | same on the first enabled radio | `outline-style: solid`, `outline-width: 2px`, `outline-color: rgb(34, 197, 94)` |
| `DisabledSurfaceLight` / `Dark` (Toggle) | disabled background / foreground / cursor | light `rgb(241, 245, 249)` / `rgb(148, 163, 184)` / `not-allowed`; dark `rgb(15, 23, 42)` / `rgb(71, 85, 105)` / `not-allowed` |
| `DisabledSelectedSurfaceLight` / `Dark` (ToggleGroup) | disabled first option is the effective selection and paints disabled, matching a disabled unselected segment | `aria-checked="true"`, transparent background/border (equal to the disabled unselected segment), light `rgb(148, 163, 184)` / dark `rgb(71, 85, 105)`, `not-allowed` |

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `9 fail` / `23 pass` |
| focused composition GREEN | `0` | `32 pass` / `0 fail` |
| focused browser RED | `1` | `2 failed \| 33 passed (35)` |
| focused browser GREEN | `0` | `35 passed (35)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `696 pass / 0 fail` (90 files); browser `430 passed` (73 files) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-3PnQWaRR.css 214.01 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B1 cycle-1 baseline (`42c0f864`): unit `687 → 696` (`+9`), browser `422 → 430` (`+8`). `mise run check:deps` was intentionally not run: it is out of scope for this correction, and the known `@pandacss/node` finding is owned by the B0 static-CSS slice.

### Changed paths

`src/shared/components/toggle/{toggle.tsx,Toggle.composition.test.tsx,Toggle.stories.tsx}`, `src/shared/components/toggle-group/{toggle-group.tsx,preset.ts,ToggleGroup.composition.test.tsx,ToggleGroup.stories.tsx}`, `outputs/experiments/pencil-opencode-workflow/artifacts/batch-b/actions/{red-green.md}` (rewritten), this evidence. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Disposition (cycle 2/2)

| Row | Disposition |
| --- | --- |
| Single effective selection + exactly one `aria-checked` | **PASS** |
| Roving tab stop independent of selection | **PASS** |
| Label-less icon + non-empty accessible name (compile time and runtime) | **PASS** |
| Disabled selected single segment paints the disabled surface | **PASS** |
| Real keyboard focus-visible ring + disabled background/foreground/cursor, both themes | **PASS** |
| Hover / active visuals | **not claimed** this cycle |
| Disabled contrast | `DISABLED / REVIEW` (both themes) |
| **B1 correction final status** | **PASS** |

## B2 — Native entry controls and Field composition (cycle 1/2)

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` — SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged; re-verified after the read-only queries).\
**Base commit:** `070920857f6645cda8a078ac821227cdde75bec9` (`build(deps): declare @pandacss/node as a direct devDependency`).\
**Method:** Pencil MCP read-only `Get`/`Print` + `TakeScreenshot` (`get_app_state` confirmed `ex_2.pen` as the active editor; no mutation, no `SetVariables`/`Insert`/`Update`/`Replace`); focused Bun composition/recipe tests and Vitest + Playwright Chromium story tests, with the browser RED proven by temporarily stashing only the four owners' implementations and regenerating.\
**Owner paths:** `src/shared/components/{input,textarea,number-input,field}/`.

### Pen enumeration gate (B2)

| Owner | Pen master → documentation frame | Documented public variant / state | Disposition |
| --- | --- | --- | --- |
| Text Input | `dO8tX` → `VSh2R` | anatomy `root · prefix icon · value or placeholder · suffix slot · focus ring` (named parts `h51Bm`); public variants (`tpCGz`) `type: text · email · password · search`, `size`, `prefix/suffix icon`, `required`; behavior (`MPSkP`) `empty · filled · disabled · read-only · invalid · valid` | **PASS** for `type` / `required` / `read-only` (native) and `prefix/suffix icon` (new decorative slots). **BLOCKED**: `size`, `valid` visual state (user decision) |
| Text Input | `VSh2R` border role (`NEbdq`), content rules (`n7zVp`, `mQhvr`, `AH4At`), accessibility (`AB5bA`, `sqZFF`, `weeU6`) | `border.strong` default; focus `semantic/focus/ring`; invalid negative roles; prefix/suffix hold icons/units/reveal; pair with a Field label; announce invalid/required; typed value announced on submit | **PASS** for the existing `border.strong` + `semantic.brand.500.background` focus + `negative.600` invalid roles and the retained `aria-invalid`/`aria-describedby` wiring. `read-only` border.subtle visual is **not claimed** (see Remaining concerns) |
| Textarea | `w6oNZ7` → `N0ymEX` | public variants (`dCzhj`) `rows`, `auto-grow`, `character counter`, `invalid`; states `default · focus-visible · disabled · invalid`; content (`IfXee`, `WqFI5`, `UDCUt`); accessibility (`sMQ1v`, `yWMaC`) `... announce remaining characters when a limit exists` | **PASS** for `rows` (native), `character counter` + remaining-character announcement (new polite live region), `invalid`/`disabled` (existing). **BLOCKED**: `auto-grow` (user decision) |
| Number Input | `EZfrL` → `oTL4D` | anatomy `root · prefix or unit · value · stepper controls`; public variants (`a2tQM`) `stepper on/off`, `unit`, `min/max`, `size`; states `default · focus-visible · disabled · invalid` + `num-Min reached` (`ox2RF`) / `num-Max reached` (`W1OqsJ`); content (`T6nMPR`, `bm5Z2`, `RAOC3`) clamp silently; accessibility (`rf7CW`, `RhpAf`) numeric role with min/max/step, labelled steppers | **PASS** for `stepper on/off`, `unit`, `min/max` (native bounds + saturated-direction stepper disabling), numeric role/labels. **BLOCKED**: `size` (user decision). The `min/max reached` visual is projected per-direction (see Remaining concerns) |
| Field | `pHfEy` → `c6uIoT` | anatomy `root · label row · required marker · control slot · hint · error message` (`rfCG2`); public variants (`I8f79X`) `label placement`, `hint on/off`, `error on/off`, `required`; states `default · focus-visible · invalid · disabled`; content (`NDLPr`, `j4P442`, `SbjP5`); accessibility (`jZwOO`, `vmbkG`, `ZbhVg`) label associated, hint/error announced on change, required exposed as a state | **PASS** for `hint on/off` + `error on/off` replacement, `required`, label association, invalid/disabled forwarding, and hint/error update announcement (new polite live regions). **BLOCKED**: `label placement` (user decision) |

Verbatim Pen facts used:

- `h51Bm` — "Named parts: root · prefix icon · value or placeholder · suffix slot · focus ring".
- `tpCGz` — "Public variants: type: text · email · password · search, size, prefix/suffix icon, required".
- `MPSkP` — "Text Input · public: text, email, search, password, prefix, suffix · behavior: empty, filled, disabled, read-only, invalid, valid".
- `NEbdq` — "Boundary: border.strong … Read-only and disabled keep geometry and drop to border.subtle with the disabled surface. Focus: semantic/focus/ring, never a border token. Invalid: semantic/feedback/negative-* roles, never a generic border."
- `AB5bA` / `sqZFF` — "Always pair with a Field label; placeholder is not an accessible name." / "Announce invalid and required states."
- `dCzhj` — "Public variants: rows, auto-grow, character counter, invalid".
- `yWMaC` — "Announce remaining characters when a limit exists."
- `WqFI5` — "Show a counter only when a limit exists."
- `a2tQM` — "Public variants: stepper on/off, unit, min/max, size".
- `bm5Z2` / `RAOC3` — "Clamp silently at min and max rather than failing validation." / "Allow typing; the stepper is an accelerator, not the only input."
- `rf7CW` / `RhpAf` — "Numeric input role with min, max and step exposed." / "Stepper buttons need accessible labels."
- `oTL4D` `ox2RF` / `W1OqsJ` — "Min reached" (`1`, stepper `ENABLED=false`) / "Max reached" (`64`, stepper `ENABLED=false`).
- `I8f79X` — "Public variants: label placement, hint on/off, error on/off, required".
- `j4P442` / `SbjP5` — "Error replaces the hint and never appears without an invalid control." / "Field forwards invalid, disabled and required to the control inside."
- `vmbkG` / `ZbhVg` — "Hint and error are announced when they change." / "Required is exposed as a state, not only as an asterisk."

### User decisions applied

- **Approved:** `Input` gains `prefixIcon?: IconName` and `suffixIcon?: IconName`, following the existing Button pattern — the component renders `Icon size="sm"` in the `prefixIcon` / `suffixIcon` slots, decorative (`aria-hidden`), coloured by the recipe, never a public node/children API.
- **BLOCKED (recorded, no API):** `Input` `size`, `Input` `valid` visual state, `NumberInput` `size`, `Textarea` `auto-grow`, `Field` `label placement`.
- **Retained for compatibility:** the per-control `label` / `invalid` / `error` props stay; `Field` remains the composition owner and is not reduced to a forwarding-only shell.

### Approved public surface and behaviour

- **Input** — `control` is now the bordered surface and the native `<input>` is transparent inside it, so the new decorative `prefixIcon` / `suffixIcon` slots share the same boundary (Pen `dO8tX`). `aria-invalid` / `aria-describedby` ownership is unchanged; native `type`, `required`, `readOnly`, `value`/`defaultValue`/`onChange` still pass through. A new internal `disabled` variant dims the whole control (cursor `not-allowed`, opacity `0.45`). The icon slots inherit the tertiary text role and add no accessible name.
- **Textarea** — the optional counter is a `role="status"` / `aria-live="polite"` region; when `maxLength` exists it carries a visually-hidden `${remaining} characters remaining` announcement while the visible text remains `current / max` (Pen `N0ymEX`). `rows`, `maxLength`, `invalid`/`disabled` wiring unchanged.
- **NumberInput** — the native `<input type="number">` remains the control (`min`/`max`/`step` exposed for the implicit spinbutton role) and both stepper buttons keep accessible names. The component now tracks the controlled (`value`) and uncontrolled (`defaultValue` + `onChange`) value: the **saturated** direction is disabled at a bound (increase at max, decrease at min), and `stepUp`/`stepDown` clamp silently. No explicit `aria-valuemin/max/now` is added because the native `type="number"` already exposes them and hand-set values would go stale on typing.
- **Field** — label/hint/error association and `required`/`invalid`/`disabled` forwarding retained; hint and error are now `role="status"` / `aria-live="polite"` regions so a change is announced. Native children still receive the native `required`/`disabled`; non-native children now receive `aria-required` / `aria-disabled` so the state is exposed "not only as an asterisk".

No submission-time announcement, validation policy, persistence, auto-grow, route, backend or animation behaviour was added.

### Tests-first proof (RED → GREEN)

Focused unit + composition (Bun):

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/input/Input.test.ts src/shared/components/input/Input.composition.test.tsx src/shared/components/textarea/Textarea.composition.test.tsx src/shared/components/number-input/NumberInput.composition.test.tsx src/shared/components/field/Field.composition.test.tsx` |
| RED exit | `1` |
| RED result | `47 pass` / `15 fail` (62 total), `161 expect() calls` |
| RED failures | Input recipe `declares the anatomy`, `declares public variants only`, `declares default variants`, `shares one focus ring with Button`, `disabled control drops opacity and cursor`, `placeholder is muted…`, `composes control typography…`, `composes the icon slots from the tertiary text role`; Input composition `className is merged with the input class…`, `forwards the required and read-only native states`, `renders decorative prefix and suffix icons…`; NumberInput `disables… at a bound` (2 tests), `keeps the stepper enabled between the bounds`; Field `announces the hint and the error…`, `exposes required and disabled as states on a non-native control`; Textarea `announces the remaining characters…` |
| GREEN exit | `0` |
| GREEN result | `62 pass` / `0 fail` (181 expect calls) |

Focused browser stories (Vitest + Playwright Chromium), proven test-first by `git stash push` of only `{input/input.tsx,input/preset.ts,textarea/textarea.tsx,textarea/preset.ts,number-input/number-input.tsx,field/field.tsx}`, `mise run gen`, observing RED, then `git stash pop` + `mise run gen`:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/input/Input.stories.tsx src/shared/components/textarea/Textarea.stories.tsx src/shared/components/number-input/NumberInput.stories.tsx src/shared/components/field/Field.stories.tsx` |
| RED exit | `1` |
| RED result | `4 failed` files, `21 failed \| 30 passed (51)` |
| RED failures | Input `Prefix Suffix`, `Dark Prefix Suffix`, `Read Only`, `Dark Read Only`, `Native Types`, `Dark Native Types`; Textarea `Counter Announcement`, `Dark Counter Announcement`; NumberInput `Min Reached`, `Dark Min Reached`, `Max Reached`, `Dark Max Reached`, `Stepper Clamp`, `Controlled Clamp`, `Dark Controlled Clamp`; Field `Hint Announcement`, `Dark Hint Announcement`, `Error Announcement`, `Dark Error Announcement`, `Non Native Control`, `Dark Non Native Control` |
| GREEN exit | `0` |
| GREEN result | `4 passed` files, `51 passed (51)` |

### Both-theme / state coverage (computed style, in browser)

| Owner | Light story assertion | Dark story assertion |
| --- | --- | --- |
| Input control surface | `Light` → `rgb(248, 250, 252)` | `Dark` → `rgb(2, 6, 23)` |
| Input prefix/suffix icons (decorative, shared boundary) | `PrefixSuffix` → icons inside `.input__control`, glyph `aria-hidden="true"`, icon colour = label tertiary role = `rgb(71, 85, 105)` | `DarkPrefixSuffix` → same, icon colour `rgb(148, 163, 184)` |
| Input read-only (value visible, not editable) | `ReadOnly` → `.input__input` `readOnly`, `value="user@example.com"`, no `aria-invalid` | `DarkReadOnly` → same |
| Input native types | `NativeTypes` → `[ "text", "email", "password", "search" ]` | `DarkNativeTypes` → same |
| Input disabled contrast | existing `Disabled` (unchanged) | — `DISABLED / REVIEW` |
| Textarea rows | `Rows` → `rows="6"` | — (structural, theme-independent) |
| Textarea counter announcement | `CounterAnnouncement` → `role="status"`, `aria-live="polite"`, `197 characters remaining`, `3 / 200` | `DarkCounterAnnouncement` → same |
| Textarea disabled contrast | existing `Disabled` (unchanged) | — `DISABLED / REVIEW` |
| NumberInput min reached | `MinReached` → decrease `disabled`, increase enabled | `DarkMinReached` → same |
| NumberInput max reached | `MaxReached` → increase `disabled`, decrease enabled | `DarkMaxReached` → same |
| NumberInput uncontrolled clamp | `StepperClamp` → 2→3, increase disabled, then 3→0, decrease disabled | — (logic theme-independent) |
| NumberInput controlled clamp | `ControlledClamp` → `value` 2→3 via `onChange`, increase disabled | `DarkControlledClamp` → same |
| Field hint announcement | `HintAnnouncement` → `.field__hint` `role="status"`, `aria-live="polite"` | `DarkHintAnnouncement` → same |
| Field error announcement | `ErrorAnnouncement` → `.field__error` `role="status"`, `aria-live="polite"`, error replaces hint | `DarkErrorAnnouncement` → same |
| Field non-native required/disabled state | `NonNativeControl` → child `aria-required="true"`, `aria-disabled="true"` | `DarkNonNativeControl` → same |
| Field disabled contrast | existing `Disabled` (unchanged) | — `DISABLED / REVIEW` |

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused unit RED | `1` | `15 fail` / `47 pass` |
| focused unit GREEN | `0` | `62 pass` / `0 fail` |
| focused browser RED | `1` | `21 failed` / `30 passed` (51) |
| focused browser GREEN | `0` | `51 passed` (51) |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `709 pass / 0 fail` (90 files); browser `452 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings (the Batch B0 `@pandacss/node` finding is resolved by `0709208`) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-Cb_XQEPt.css 214.75 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the Batch B1 shipped baseline (`0709208`): unit `696 → 709` (`+13`), browser `430 → 452` (`+22`). One `mise run check` browser pass was flaky on `card/Card.stories.tsx` (unrelated to B2: passes in isolation and on re-run); the re-run was fully green.

### Changed paths

`src/shared/components/input/{input.tsx,preset.ts,index.ts,Input.test.ts,Input.composition.test.tsx,Input.stories.tsx}`, `src/shared/components/textarea/{textarea.tsx,preset.ts,Textarea.composition.test.tsx,Textarea.stories.tsx}`, `src/shared/components/number-input/{number-input.tsx,NumberInput.composition.test.tsx,NumberInput.stories.tsx}`, `src/shared/components/field/{field.tsx,Field.composition.test.tsx,Field.stories.tsx}`, this evidence. `index.ts` barrels were left unchanged (no new exports). Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Input `type: text · email · password · search` | **PASS** |
| Input `required` / `read-only` native behaviour | **PASS** |
| Input `prefix/suffix` decorative icon slots (approved, Button pattern) | **PASS** |
| Input `invalid` / error association | **PASS** (retained) |
| Input `size` | **BLOCKED** (user decision, no API) |
| Input `valid` visual state | **BLOCKED** (user decision, no API) |
| Textarea `rows` | **PASS** |
| Textarea `character counter` + remaining-character announcement | **PASS** |
| Textarea `invalid` / `disabled` | **PASS** (retained) |
| Textarea `auto-grow` | **BLOCKED** (user decision, no API) |
| NumberInput `stepper on/off` + accessible names | **PASS** |
| NumberInput `unit` | **PASS** |
| NumberInput `min/max` + saturated-direction disabling + controlled/uncontrolled clamp | **PASS** |
| NumberInput numeric role with min/max/step | **PASS** |
| NumberInput `size` | **BLOCKED** (user decision, no API) |
| Field label association + `hint on/off` / `error on/off` replacement | **PASS** |
| Field `required` / `invalid` / `disabled` forwarding (native and non-native) | **PASS** |
| Field hint/error update announcement | **PASS** |
| Field `label placement` | **BLOCKED** (user decision, no API) |
| Disabled contrast (all four owners) | `DISABLED / REVIEW` (both themes) |
| **B2 final status** | **PASS** — every non-blocked Pen axis is implemented and evidenced; the blocked axes are explicit user decisions with no speculative API |

### Remaining concerns

- **INFO — NumberInput `min/max reached` projection (superseded by the cycle-2 correction below).** Pen `EZfrL` (`ox2RF` / `W1OqsJ`) sets the whole `Stepper` frame `ENABLED=false` at a bound. Disabling the cluster in both directions would trap the value (no way back from a bound), which contradicts `RAOC3` ("the stepper is an accelerator"). The implementation disables only the saturated direction (increase at max, decrease at min) so the control stays operable; this is the chosen interpretation, not a new public axis. **Withdrawn in the B2 correction — cycle 2/2, which disables both stepper buttons at either bound and keeps typing as the way out.**
- **INFO — Input `read-only` border.subtle.** `NEbdq` describes a `border.subtle` + disabled surface for read-only. The native `readOnly` behaviour and value visibility are implemented and tested; the read-only *border/background* swap is not claimed this cycle (the user approval covered the icon slots only). Recorded so the reviewer can decide whether the visual is required. Disabled contrast remains `DISABLED / REVIEW`.
- **INFO — Input `valid` and `size`.** `VSh2R` and `oTL4D` list `valid` and `size`, and `N0ymEX`/`c6uIoT` list `auto-grow`/`label placement`; all are recorded `BLOCKED` per the user's explicit scope decision, with no `BLOCKED` API shipped.
- **INFO — Field non-native state.** `aria-required` / `aria-disabled` are forwarded to a non-native child because Pen `ZbhVg` requires the state to be exposed and `SbjP5` requires forwarding; the consumer remains responsible for the enforced behaviour.

## B2 correction — NumberInput full-stepper bound state and Field project-control composition (cycle 2/2)

**Base commit:** `0fdd25f` (`feat(shared): add Input icon slots and entry-control state semantics`).\
**Correction plan:** the reviewer's cycle-1 findings on the B2 slice: (1) Pen disables the complete `Stepper` at a bound, but the implementation disabled only the saturated direction; (2) `Field` did not integrate the project `Input` / `Textarea` / `NumberInput` state contract and could duplicate label/error ownership; (3) `readOnly` allowed stepper mutation.\
**Status:** **PASS** (the former per-direction `INFO` is withdrawn).

### Direct Pen facts re-used (read-only)

- `oTL4D` `ox2RF` ("Min reached") and `W1OqsJ` ("Max reached") both set the complete `Stepper` frame `enabled: false` at the bound.
- `bm5Z2` / `RAOC3` — "Allow typing; the stepper is an accelerator, not the only input."
- `c6uIoT` (`I8f79X`, `j4P442`, `SbjP5`, `ZbhVg`) — Field forwards `invalid` / `disabled` / `required`; Field owns label, hint and error, with error replacing hint and never appearing without an invalid control.

### Fixes implemented

| # | Finding | Fix |
| --- | --- | --- |
| 1 | Only the saturated stepper direction was disabled at a bound. | `stepperDisabled = disabled ‖ readOnly ‖ atMin ‖ atMax` now drives **both** named buttons, matching Pen `Stepper ENABLED=false`; the native `<input type="number">` stays editable. |
| 2 | `readOnly` did not disable or guard the stepper. | `readOnly` is destructured, forwarded to the native input, included in `stepperDisabled`, and re-checked in `handleStep`, so the accelerator cannot mutate a read-only value. |
| 3 | `Field` did not pass the state/description contract to project controls, so a `Field`-wrapped `Input` / `Textarea` / `NumberInput` lost the Field description and could render a duplicate local error. | Field detects the three project component types by identity and clones them with `id`, native `required` / `disabled`, `invalid`, `error: undefined` and its active hint/error descriptor. Field remains the sole label/hint/error owner. |
| 4 | Components discarded a consumer/Field `aria-describedby`. | `Input`, `Textarea` and `NumberInput` keep the supplied descriptor when they render no local invalid error, and their local `${id}-error` overrides it when they do. |
| 5 | A project control's own descriptor could be clobbered when Field had no active description. | Field falls back to the child's own `aria-describedby` when it has neither active hint nor error. Intrinsic and foreign children keep the generic ID / ARIA-state behaviour and receive no project-only `invalid` / `error`. |

No public API, token, preset, barrel, Panda configuration or generated output was changed. `mise run gen` was therefore not required.

### Tests-first proof (RED → GREEN)

Focused composition (Bun), command `bun test src/shared/components/input/Input.composition.test.tsx src/shared/components/textarea/Textarea.composition.test.tsx src/shared/components/number-input/NumberInput.composition.test.tsx src/shared/components/field/Field.composition.test.tsx`:

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `10 fail` / `47 pass` (57 total), `184 expect() calls` |
| RED failures | NumberInput both-buttons-at-bound (uncontrolled), both-buttons-at-bound (controlled), readOnly both disabled + native non-disabled, external-descriptor preserved; Input and Textarea external-descriptor preserved; Field project-control composition for Input / Textarea / NumberInput and Field child-descriptor fallback |
| GREEN exit | `0` |
| GREEN result | `57 pass` / `0 fail` (57 total), `218 expect() calls` |

With `Input.test.ts` added, the plan's final focused unit command is `70 pass` / `0 fail` (5 files), `238 expect() calls`.

Focused browser stories (Vitest + Playwright Chromium), proven test-first by `git stash push` of only `number-input/number-input.tsx` and `field/field.tsx` (no `mise run gen`, since no preset changed), observing RED, then `git stash pop`:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/number-input/NumberInput.stories.tsx src/shared/components/field/Field.stories.tsx` |
| RED exit | `1` |
| RED result | `2 failed` files, `11 failed` / `21 passed` (32) — `Min Reached`, `Dark Min Reached`, `Max Reached`, `Dark Max Reached`, `Read Only`, `Dark Read Only`, `Typed From Min`, `Controlled Typed`, `Dark Controlled Typed`, `Project Controls`, `Dark Project Controls` |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `32 passed` (32) |

### Both-theme story coverage (computed/DOM, in browser)

| Story (theme) | Assertion | Observed |
| --- | --- | --- |
| `MinReached` / `DarkMinReached` | both named buttons disabled, spinbutton enabled | pass |
| `MaxReached` / `DarkMaxReached` | both named buttons disabled, spinbutton enabled | pass |
| `TypedFromMin` | at bound both buttons disabled; clear + type `32` → value `32` and both buttons re-enabled | pass |
| `ControlledTyped` / `DarkControlledTyped` | controlled value starts at the bound with both buttons disabled; typed `24` propagates through `onChange` and re-enables both | pass |
| `ReadOnly` / `DarkReadOnly` | native control `readonly`, non-disabled; both buttons disabled; clicking does not mutate the value (`8`) | pass |
| `ProjectControls` / `DarkProjectControls` | Field-wrapped `Input`, `Textarea`, `NumberInput`: actual native control `required`, `disabled`, `aria-invalid="true"`, `aria-describedby="pc-*-error"`; exactly one `#pc-*-error` and three `.field__error`; hint and child-local error text absent | pass |

Disabled contrast remains **`DISABLED / REVIEW`** in both themes.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| focused composition RED | `1` | `10 fail` / `47 pass` |
| focused composition GREEN | `0` | `57 pass` / `0 fail` (`70 pass` with `Input.test.ts`) |
| focused browser RED | `1` | `11 failed` / `21 passed` (32) |
| focused browser GREEN | `0` | `32 passed` (32) |
| `git diff --check` | `0` | clean |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `717 pass / 0 fail` (90 files); browser `456 passed` (73 files) |

Counts moved from the B2 cycle-1 shipped baseline (`0fdd25f`): unit `709 → 717` (`+8`), browser `452 → 456` (`+4`).

### Changed paths

`src/shared/components/number-input/{number-input.tsx,NumberInput.composition.test.tsx,NumberInput.stories.tsx}`, `src/shared/components/field/{field.tsx,Field.composition.test.tsx,Field.stories.tsx}`, `src/shared/components/input/{input.tsx,Input.composition.test.tsx}`, `src/shared/components/textarea/{textarea.tsx,Textarea.composition.test.tsx}`, this evidence. No `index.ts`, `preset.ts`, `panda.config.ts`, token, dependency, Pen or generated file was touched.

### Disposition (cycle 2/2)

| Row | Disposition |
| --- | --- |
| NumberInput full `Stepper` disabled at min **or** max, native input editable | **PASS** |
| NumberInput mid-range both buttons enabled | **PASS** |
| NumberInput controlled and uncontrolled typed movement off a bound re-enables both buttons | **PASS** |
| NumberInput `readOnly` disables both buttons, native stays `readonly` and non-disabled, guard blocks mutation | **PASS** |
| Field forwards `id` / `required` / `disabled` / `invalid` / active description to `Input`, `Textarea`, `NumberInput` | **PASS** |
| Field is the sole label/hint/error owner; child-local error suppressed; one error text and one `id="…-error"` | **PASS** |
| External `aria-describedby` preserved without a local invalid error; local error overrides it | **PASS** |
| Intrinsic and foreign children keep generic ID/ARIA-state behaviour without project-only props | **PASS** |
| Disabled contrast | `DISABLED / REVIEW` (both themes) |
| **B2 correction final status** | **PASS** |

## B3 — Checkbox, Radio/RadioGroup, Switch and Slider (cycle 1/2)

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` — SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged; re-verified after the read-only queries).\
**Base commit:** `7ece9ae` (`fix(shared): correct NumberInput bound stepper and Field control composition`).\
**Method:** Pencil MCP `execute` read-only `Get`/`Print` (`get_app_state` confirmed `ex_2.pen` as the active canvas editor; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`), focused Bun composition tests, and Vitest + Playwright Chromium story tests. Arrow-key stepping is driven through the provider CDP session because the Storybook user-event harness does not deliver range arrow keys.\
**Owner paths:** `src/shared/components/{checkbox,radio,radio-group,switch,slider}/`.

### Pen enumeration gate (B3)

| Owner | Pen master → documentation frame | Documented public variant / state | Disposition |
| --- | --- | --- | --- |
| Checkbox | `e2q2z` → `RB6lx` | named parts `root · box · mark · label`; variant names `checked · unchecked · indeterminate, with label, disabled`; states `unchecked · checked · indeterminate · focus-visible · disabled` | **PASS** — native checkbox is the source; all listed states present |
| Checkbox | `RB6lx` content + accessibility | "Clicking the label toggles the box."; "Indeterminate is a display-only parent state."; "Expose checked and indeterminate states."; "Space toggles the focused checkbox." | **PASS** — label association, native Space, `input.indeterminate` (mixed) |
| Checkbox | `RB6lx` invalid | "Invalid: semantic/feedback/negative-* roles"; box `border.strong` | **PASS** — retained `aria-invalid` + error `aria-describedby` |
| Radio (atomic) | `UrFJz` → `BRhSj` | single native control: `Circle` (`Gqmap`), `Dot` (`Nn6mZ`), `Label` (`uJlDG`); consumed by `IENTK` refs `CzAuD`/`dJQgp`/`XmHy8` | **PASS** (atomic member; no standalone group feature inferred) |
| Radio Group | `IENTK` → `BRhSj` | named parts `root · group label · radio item · circle · option label · description`; variant names `vertical · horizontal, with description, invalid, disabled`; spec `2–5 options`, `default · selected · invalid · disabled`, `hover · focus-visible` | **PASS** — orientation, group `hint` (description), invalid, disabled, 3-option specimens |
| Radio Group | `BRhSj` accessibility | "Arrow keys move within the group, one tab stop per group."; "The group has an accessible name; each option its own label."; "Invalid state is announced on the group." | **PASS** — `role="radiogroup"` + name, native arrow movement/one tab stop, group `aria-invalid`/`aria-describedby` |
| Switch | `BQvnn` → `gHtWp` | named parts `root · track · thumb · label`; variant names `on · off, size, with label, disabled`; states `off · on · hover · focus-visible · disabled` | **PASS** for `on/off`, `with label`, `disabled`, `hover`, `focus-visible`. **BLOCKED**: `size` (user decision) |
| Switch | `gHtWp` accessibility | "Expose the switch role with checked state."; "Space toggles; the label is part of the target." | **PASS** — `role="switch"` + `aria-checked`; label target; native Space |
| Slider | `z57yzW` → `lLkUG` | named parts `root · track · filled range · thumb · value label · ticks`; variant names `single · range, with value label, stepped, disabled`; states `default · hover · focus-visible · disabled` | **PASS** for `single`, `with value label` (default on), `stepped`, `disabled`, `default/hover/focus-visible/dragging`. **BLOCKED**: `range`, `ticks` (user decision) |
| Slider | `lLkUG` content + accessibility | "Always show the current value near the control."; "Offer a numeric fallback for precise entry."; "Expose min, max and current value."; "Arrow keys adjust by one step; Home and End jump to bounds." | **PASS** for the visible value default, native `min`/`max`/`step`, native keyboard. **BLOCKED**: numeric fallback (user decision) |
| Slider | `lLkUG` thumb specimens | `sl-Hover thumb` 24px `#166534` stroke; `sl-Focus thumb` 28px `#16A34A` stroke; `sl-Dragging` 22px `#15803D` fill | **PASS** — peer-driven thumb states (light values asserted; dark tokens flip) |

Verbatim Pen facts used:

- `RB6lx` "Purpose: Checkbox selects zero or more independent options, or acknowledges a single statement." · "Public variants: checked · unchecked · indeterminate, with label, disabled" · "Clicking the label toggles the box." · "Indeterminate is a display-only parent state." · "Expose checked and indeterminate states." · "Space toggles the focused checkbox."
- `BRhSj` "Purpose: Radio Group selects exactly one option from a small, visible set." · "Public variants: vertical · horizontal, with description, invalid, disabled" · "Arrow keys move within the group, one tab stop per group." · "The group has an accessible name; each option its own label." · "Invalid state is announced on the group."
- `gHtWp` "Purpose: Switch turns a single setting on or off and applies the change immediately." · "Public variants: on · off, size, with label, disabled" · "Expose the switch role with checked state." · "Space toggles; the label is part of the target."
- `lLkUG` "Public variants: single · range, with value label, stepped, disabled" · "Always show the current value near the control." · "Expose min, max and current value." · "Arrow keys adjust by one step; Home and End jump to bounds." · thumb specimens `sl-Hover thumb`, `sl-Focus thumb`, `sl-Dragging`.

### User decisions applied

- **Approved:** `Slider` `showValue` defaults to `true` per Pen "Always show the current value near the control."; `showValue={false}` remains the documented opt-out.
- **BLOCKED (recorded, no API):** `Switch` `size`; `Slider` `range` (two thumbs); `Slider` `ticks`; `Slider` numeric fallback.
- **Not added (justified):** `RadioGroup` `aria-orientation`. Pen's contract only requires arrow movement with one tab stop, and native radios respond to all arrow directions regardless of layout; adding `aria-orientation` would announce a restriction the control does not enforce. Recorded as `INFO`.
- **Retained:** `Radio` remains the atomic native control; `RadioGroup` owns the group `name`, `value`, `hint`/`error` and `orientation`. No standalone group feature was inferred for `Radio`.

### Approved public surface and behaviour

- **Checkbox / Radio / RadioGroup / Switch** — no implementation change was required: the documented Pen facts were already satisfied by the shipped native-control behaviour. This cycle adds the missing focused composition and browser regression assertions only (`radio/radio.tsx`, `radio/preset.ts`, `checkbox/checkbox.tsx`, `switch/switch.tsx` and their presets are untouched).
- **Slider** — two minimal changes. (1) `showValue` default is now `true`. (2) The native `<input type="range">` now precedes the decorative `track`/`range`/`thumb` spans so Panda's `peer`-relative conditions can reach them; the three decorative spans get `pointer-events: none`, keeping the native range as the pointer source. The preset adds Pen's `Hover thumb` (24px, `brand.800` stroke), `Focus thumb` (28px, `focus/ring` stroke) and `Dragging` (22px, `brand.700` fill) states, and the thumb outline now reads `semantic.focus.ring` (the Pen focus role, matching the B0 focus ring) instead of `brand.500.background`.
- No public API, token, barrel, dependency or generated-config file was added or changed. `mise run gen` was run because the Slider preset changed.

### Tests-first proof (RED → GREEN)

Focused composition (Bun), command `bun test src/shared/components/{checkbox/Checkbox,radio/Radio,radio-group/RadioGroup,switch/Switch,slider/Slider}.composition.test.tsx`:

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `60 pass` / `1 fail` (61 total), `168 expect() calls` |
| RED failures | `Slider composition > shows the current value by default (Pen: always show the value)` (default `showValue` was `false`) |
| GREEN exit | `0` |
| GREEN result | `61 pass` / `0 fail` (5 files), `169 expect() calls` |

The Checkbox / RadioGroup / Switch composition assertions (`for`/`id` association, error-id/`described-by` match, vertical default, per-option labels) passed on the first run: those Pen facts were already implemented, so no RED was achievable for them. They are logged as verified regression coverage rather than fabricated failures.

Focused browser stories (Vitest + Playwright Chromium), command `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/{checkbox/Checkbox,radio/Radio,radio-group/RadioGroup,switch/Switch,slider/Slider}.stories.tsx`:

| Field | Value |
| --- | --- |
| RED exit | `1` (Slider file only, proven test-first against the pre-change implementation) |
| RED result | `1 failed` file, `9 failed \| 9 passed (18)` |
| RED failures | `Value By Default`, `Dark Value By Default`, `Keyboard`, `Thumb Hover`, `Dark Thumb Hover`, `Thumb Focus`, `Dark Thumb Focus`, `Thumb Active`, `Dark Thumb Active` |
| GREEN exit | `0` |
| GREEN result | `5 passed` files, `66 passed (66)` |

### Both-theme / state coverage (computed style and DOM, in browser)

| Owner | Light story assertion | Dark story assertion |
| --- | --- | --- |
| Checkbox label target | `LabelClickToggles` → clicking the label toggles both ways | — (logic is theme-independent) |
| Checkbox native Space | `SpaceToggles` → `aria`/checked toggles on Space | — (logic is theme-independent) |
| Checkbox indeterminate DOM/mixed | `IndeterminateDom` → `input.indeterminate === true`, `toBePartiallyChecked()` | `DarkIndeterminateDom` → same |
| Checkbox checked fill | `CheckedFillLight` → `rgb(21, 128, 61)` | `CheckedFillDark` → `rgb(134, 239, 172)` |
| Checkbox invalid description | composition `aria-describedby` = error `<p>` id | — (structural) |
| RadioGroup orientation / radiogroup / labels | composition + `Horizontal` | — (structural) |
| RadioGroup native arrows / one tab stop | `NativeArrows` (ArrowDown moves focus and selection), `OneTabStop` | — (logic is theme-independent) |
| RadioGroup error description | `ErrorDescription` → group `aria-describedby` targets the error text | `DarkErrorDescription` → same |
| RadioGroup selected dot | `SelectedDotLight` → opacity `1`, `rgb(21, 128, 61)` | `DarkSelected` → opacity `1`, `rgb(134, 239, 172)` |
| Switch label target / Space | `LabelClickToggles`, `SpaceToggles` → `aria-checked` toggles | — (logic is theme-independent) |
| Switch `role="switch"` / checked / disabled | `Reference`, `On`, `Invalid`, `Disabled` | `DarkOn` → `aria-checked="true"`, track `rgb(134, 239, 172)`; `DarkDisabled` → disabled |
| Slider visible value default | `ValueByDefault` → value rendered without the prop; `ValueOptOut` → hidden with `showValue={false}` | `DarkValueByDefault` → value rendered |
| Slider native keyboard `min`/`max`/`step` | `Keyboard` → ArrowRight `50→55`, Home `0`, End `100`; composition asserts `min`/`max`/`step`/`value` | — (logic is theme-independent) |
| Slider thumb hover 24px | `ThumbHover` → `24×24`, border `rgb(22, 101, 52)` (`#166534`) | `DarkThumbHover` → `24px`, border `rgb(187, 247, 208)` |
| Slider thumb focus 28px | `ThumbFocus` → `28×28`, border `rgb(22, 163, 74)` (`#16A34A`) | `DarkThumbFocus` → `28px`, border `rgb(34, 197, 94)` |
| Slider thumb active 22px fill | `ThumbActive` → `22×22`, background `rgb(21, 128, 61)` (`#15803D`) | `DarkThumbActive` → `22px`, background `rgb(134, 239, 172)` |
| Disabled contrast (all five owners) | existing `Disabled` stories (unchanged) | `DISABLED / REVIEW` |

Hover and active are asserted through Panda's documented `[data-hover]` / `[data-active]` conditions on the peer input because the Storybook user-event harness performs no real pointer move for CSS `:hover`/`:active`; focus and keyboard are real (Tab and CDP `Input.dispatchKeyEvent`). This is recorded as an evidence-mechanism limitation, not a product behaviour change.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `60 pass` / `1 fail` (61 total, `168 expect() calls`) |
| focused composition GREEN | `0` | `61 pass` / `0 fail` (`169 expect() calls`) |
| focused browser RED (Slider) | `1` | `9 failed \| 9 passed (18)` |
| focused browser GREEN (5 files) | `0` | `66 passed (66)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `726 pass / 0 fail` (90 files, `3914 expect() calls`); browser `482 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings (no exports/dependencies changed) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-BdPXuZt4.css 215.11 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B2 shipped baseline (`7ece9ae`): unit `717 → 726` (`+9`), browser `456 → 482` (`+26`).

### Changed paths

`src/shared/components/checkbox/{Checkbox.composition.test.tsx,Checkbox.stories.tsx}`, `src/shared/components/radio-group/{RadioGroup.composition.test.tsx,RadioGroup.stories.tsx}`, `src/shared/components/switch/{Switch.composition.test.tsx,Switch.stories.tsx}`, `src/shared/components/slider/{slider.tsx,preset.ts,Slider.composition.test.tsx,Slider.stories.tsx}`, this evidence. `radio/` was read-only. No `index.ts`, dependency, token, `panda.config.ts`, Pen or generated-config file was changed; `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Checkbox label click / native Space toggles | **PASS** |
| Checkbox `input.indeterminate` (DOM) + announced mixed | **PASS** |
| Checkbox invalid description wiring | **PASS** |
| Radio `UrFJz` atomic member consumed by `IENTK` | **PASS** |
| RadioGroup `vertical · horizontal` orientation | **PASS** |
| RadioGroup `role="radiogroup"` + accessible name + per-option label | **PASS** |
| RadioGroup native arrows / one tab stop | **PASS** |
| RadioGroup error description + invalid announcement | **PASS** |
| Switch label target + native Space | **PASS** |
| Switch `role="switch"` + `aria-checked` + disabled | **PASS** |
| Switch `size` | **BLOCKED** (user decision, no API) |
| Slider value label shown by default | **PASS** |
| Slider `min`/`max`/`step` + Arrow/Home/End keyboard | **PASS** |
| Slider hover 24px `#166534` / focus 28px `#16A34A` / active 22px `#15803D` thumb | **PASS** |
| Slider `range` (two thumbs) | **BLOCKED** (user decision, no API) |
| Slider `ticks` | **BLOCKED** (user decision, no API) |
| Slider numeric fallback | **BLOCKED** (user decision, no API) |
| RadioGroup `aria-orientation` | **INFO** — not added; native arrows are not axis-restricted |
| RadioGroup per-option `description` | **INFO** — no specimen renders it; the existing group `hint` carries the description role |
| Disabled contrast (all five owners) | `DISABLED / REVIEW` (both themes) |
| **B3 final status** | **PASS** — every non-blocked Pen axis is implemented or verified; the blocked axes are explicit user decisions with no speculative API |

### Remaining concerns

- **INFO — pointer-state evidence mechanism.** Hover and active thumb states are asserted through `[data-hover]`/`[data-active]`; the harness cannot deliver a real CSS `:hover`/`:active`. Focus (Tab) and keyboard (CDP) are real.
- **INFO — disabled + pointer cascade (superseded by the cycle-2 correction below).** A disabled range could match `:hover`/`:active` (native and synthetic) and override the disabled thumb. The cycle-2 correction adds the `:enabled` guard, so the disabled surface now wins; disabled contrast remains `DISABLED / REVIEW`.
- **INFO — `RadioGroup` description.** Pen's variant text names `description`; only the group-level `hint` exists and no specimen renders an option-level description. No new option field was added.
- **INFO — Slider focus outline.** The thumb outline colour was aligned from `brand.500.background` to `semantic.focus.ring` (the Pen focus role and the B0 focus ring); the 28px `focus/ring` thumb stroke is asserted in both themes.

## B3 correction — disabled pointer scoping and canonical browser import (cycle 2/2)

**Base commit:** `3fa6f14` (`feat(shared): default Slider value label and add B3 control coverage`).\
**Correction plan:** the reviewer's cycle-1 findings on the B3 slice: (1) a disabled Slider still matched the thumb `peer` `:hover`/`:active` conditions — including the synthetic `[data-hover]`/`[data-active]` markers — so the disabled thumb grew to 24px/22px with the brand stroke/fill instead of keeping the disabled geometry and paint; (2) the story file still loaded the deprecated `@vitest/browser/context` module.\
**Status:** **PASS**.

### Fixes implemented

| # | Finding | Fix |
| --- | --- | --- |
| 1 | `_peerHover`/`_peerActive` compile to `.peer:is(:hover, [data-hover]) ~ &` / `.peer:is(:active, [data-active]) ~ &`; both outrank the `slider__thumb--disabled_true` variant, so a disabled range reacted to pointer state in the running app and in the synthetic Storybook states. | Replaced the two conditions with explicit sibling selectors guarded by `:enabled`: `.peer:enabled:is(:hover, [data-hover]) ~ &` and `.peer:enabled:is(:active, [data-active]) ~ &`. The native `:disabled` attribute fails `:enabled`, so neither the native nor the synthetic pointer state reaches the thumb. |
| 2 | The story file imported the deprecated `@vitest/browser/context` (Vitest emitted a `DEPRECATED` warning on every run). | The CDP helper now dynamically imports `cdp` from the canonical `vitest/browser` entry. |

No public API, token, barrel, dependency, `panda.config.ts`, Pen or other component file was changed. The focus state (`.peer:is(:focus-visible, [data-focus-visible]) ~ &`) is deliberately left peer-native: a disabled range cannot receive focus, and the task scope was hover/active only. `mise run gen` was run because the Slider preset changed.

### Generated selector proof (real `panda cssgen` output)

| State | Emitted selector |
| --- | --- |
| Hover (enabled-only) | `.peer:enabled:is(:hover, [data-hover]) ~ .slider__thumb` |
| Active/dragging (enabled-only) | `.peer:enabled:is(:active, [data-active]) ~ .slider__thumb` |
| Focus-visible (preserved) | `.peer:is(:focus-visible, [data-focus-visible]) ~ .slider__thumb` |

### Tests-first proof (RED → GREEN)

Focused browser stories (Vitest + Playwright Chromium). The two new stories were added first and run against the unchanged preset, so the RED is a real test-first run (no implementation revert/stash needed):

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/slider/Slider.stories.tsx` |
| RED exit | `1` |
| RED result | `2 failed \| 18 passed (20)` — `Disabled Pointer`, `Dark Disabled Pointer` (thumb received `24px` instead of `20px`) |
| GREEN exit | `0` |
| GREEN result | `20 passed (20)` |

The full B3 owner set (`checkbox`, `radio`, `radio-group`, `switch`, `slider`) was also run: `5 passed` files, `68 passed (68)`.

### Both-theme browser captures (computed style, in browser)

| Story (theme) | Assertion | Observed |
| --- | --- | --- |
| `DisabledPointer` / `DarkDisabledPointer` | disabled range with `data-hover` then `data-active`: thumb geometry and disabled paint unchanged | light `20×20`, border `rgb(148, 163, 184)`, background `rgb(241, 245, 249)`; dark `20×20`, border `rgb(71, 85, 105)`, background `rgb(15, 23, 42)` |
| `ThumbHover` / `DarkThumbHover` | enabled hover still 24px with the `brand.800` stroke | unchanged (light `rgb(22, 101, 52)`, dark `rgb(187, 247, 208)`) |
| `ThumbActive` / `DarkThumbActive` | enabled active still 22px with the `brand.700` fill | unchanged (light `rgb(21, 128, 61)`, dark `rgb(134, 239, 172)`) |
| `ThumbFocus` / `DarkThumbFocus` | focus preserved (28px `focus/ring` stroke) | unchanged |
| `Keyboard` | the CDP-driven arrow/Home/End test still passes through `vitest/browser` | `50→55`, `0`, `100` |

Disabled contrast remains **`DISABLED / REVIEW`** in both themes.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused browser RED | `1` | `2 failed \| 18 passed (20)` |
| focused browser GREEN (Slider) | `0` | `20 passed (20)` |
| focused browser GREEN (5 B3 owners) | `0` | `68 passed (68)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `726 pass / 0 fail` (90 files, `3914 expect() calls`); browser `484 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-CzILDXrW.css 215.12 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B3 cycle-1 baseline (`3fa6f14`): unit `726 → 726` (unchanged; no unit test added), browser `482 → 484` (`+2`, the two new pointer stories).

### Changed paths

`src/shared/components/slider/preset.ts`, `src/shared/components/slider/Slider.stories.tsx`, this evidence. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited). No other file, dependency, token, Pen artifact or component was touched.

### Disposition (cycle 2/2)

| Row | Disposition |
| --- | --- |
| Disabled Slider ignores native and synthetic hover/active pointer state (stays 20px with disabled border/fill) | **PASS** |
| Enabled Slider hover 24px / active 22px / focus 28px preserved | **PASS** |
| Canonical `vitest/browser` import, CDP keyboard test preserved | **PASS** |
| Disabled contrast | `DISABLED / REVIEW` (both themes) |
| **B3 correction final status** | **PASS** |

## B4 — Select and MultiSelect, with Option/Popup retained internally (cycle 1/2)

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` — SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged; re-verified after the read-only queries).\
**Base commit:** `fc1acbb` (`fix(shared): correct Slider disabled pointer state and browser test import`).\
**Method:** Pencil MCP `execute` read-only `Get` visitor (`get_app_state` confirmed `ex_2.pen` as the active canvas editor; no `Insert`/`Update`/`Replace`/`Move`/`Delete`/`SetVariables`/`Copy`), focused Bun composition tests and Vitest + Playwright Chromium story tests, plus `mise run gen` / `check` / `check:deps` / `build`. The browser RED was proven test-first by running the new stories against the pre-change implementation.\
**Owner paths:** `src/shared/components/{select,multi-select}/`.

### Pen enumeration gate (B4)

| Owner | Pen master → documentation frame | Documented public variant / state | Disposition |
| --- | --- | --- | --- |
| Select | `tOLtR` → `vMd62` | trigger `root · trigger · value or placeholder · chevron`; public variants **`closed · open, searchable, with prefix, invalid, disabled`**; option states `default · hover · selected · disabled`; grouped options | **PASS** — combobox trigger + inline popup, `searchable`, `prefixIcon`, flat + additive grouped options, invalid/disabled |
| Select | `vMd62` content rules | "The trigger shows the current selection, never a verb." · **"The popup opens below and flips when space is short."** · **"Option rows keep the same width as the trigger."** | **PASS** — trigger shows value/placeholder; `data-placement="top"` flip; popup `width: 100%` matches the trigger |
| Select | `vMd62` accessibility | **"Combobox semantics with an expanded state."** · **"Arrow keys move through options; Enter selects; Escape closes."** · **"The selected option is announced."** | **PASS** — `role="combobox"` + `aria-expanded` + `aria-activedescendant`; arrows skip disabled; Enter selects; Escape closes; `role="status"` selected announcement |
| Option (aggregate) | `GjzX0` (consumed by `aXD61` / `tOLtR`) | label + trailing check, `fill` `surface/hover` / `surface/selected` | **PASS** — remains private anatomy inside `select.tsx`; no public `Option` export |
| Select Popup (aggregate) | `aXD61` (consumed by `tOLtR`) | `surface/overlay` + `border/subtle` + `shadow/500`; `SearchRow` + option rows | **PASS** — inline popup with optional search row; no public `SelectPopup` export, no portal |
| Multi Select | `f985P` → `jZrkt` | chips + overflow counter trigger; public variants **`closed · open, with search, max selection, invalid, disabled`**; item `hover · selected`; chip removal | **PASS** — chips, overflow counter, `searchable`, `maxSelected`, invalid/disabled, item states |
| Multi Select | `jZrkt` content rules | **"Chips wrap in the trigger and collapse into a counter when space runs out."** · **"Removing a chip never opens the popup."** · **"The popup stays open while several options are picked."** | **PASS** — `Tag` chips + `+N` counter; chip removal does not open the popup; selecting an option keeps it open |
| Multi Select | `jZrkt` accessibility | **"Each chip's remove control needs its own accessible label."** · **"Announce how many options are selected."** · **"Keyboard selection toggles without closing the popup."** | **PASS** — `Remove {label}` on every chip; `role="status"` count announcement; option toggles leave the popup open |

Pen facts used verbatim: `vMd62` "Public variants: closed · open, searchable, with prefix, invalid, disabled"; "The popup opens below and flips when space is short."; "Option rows keep the same width as the trigger."; "Combobox semantics with an expanded state."; "Arrow keys move through options; Enter selects; Escape closes."; "The selected option is announced." · `jZrkt` "Public variants: closed · open, with search, max selection, invalid, disabled"; "Removing a chip never opens the popup."; "The popup stays open while several options are picked."; "Each chip's remove control needs its own accessible label."; "Announce how many options are selected."

### User-approved axes (this cycle)

- **Approved:** `Select` `prefixIcon?: IconName` (following the B2 Input icon-slot pattern); additive `groups?: ReadonlyArray<{ label: string; options: SelectOption[] }>` while preserving the flat `options`; `Select`/`MultiSelect` `searchable?: boolean` with `query?` / `defaultQuery?` / `onQueryChange?` controlled or uncontrolled query UI and **no local or remote filtering**; `MultiSelect` `maxSelected?: number` blocks only new additions at the cap while existing selections stay removable, with a selected-count announcement.
- **B4 planner handoff implemented:** the native-only `<select>` was replaced by the Pen-documented combobox/popup; MultiSelect keeps its chips/listbox projection.
- **Retained for compatibility:** `SelectOption` / `MultiSelectOption`, `invalid`/`error`/`hint`, `disabled`, `maxVisible`, and the `Select`/`MultiSelect` barrel exports. No `Option` or `SelectPopup` export was added.

### Approved public surface and behaviour

- **Select** — the native `<select>` became a combobox **button** (`role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`) plus an inline `role="listbox"` popup (no portal). Flat `options` render first, then each `groups` entry as a labelled `role="group"`. `prefixIcon` is a decorative glyph. Selection is controlled (`value` + `onChange`) or uncontrolled (`defaultValue`); a controlled value is never mutated (the callback fires, the display stays). Keyboard: ArrowDown/ArrowUp/Home/End move the active option and **skip disabled options**; Enter/Space select the active option; Escape closes and returns focus to the trigger; the popup flips above via `data-placement="top"` and keeps the trigger width. A visually-hidden `role="status"` region announces `"{label} selected"`.
- **Select searchable** — a search row with an `aria-label`led textbox appears in the popup; `query` is controlled or `defaultQuery` uncontrolled, and `onQueryChange` fires on every input. The component never filters: the option list is always the full supplied set.
- **MultiSelect** — `searchable` adds the same query UI to the popup. `maxSelected` blocks only new additions (`atCap` short-circuits `toggleOption` for unselected values); selected values remain removable and become addable again below the cap; at-cap unselected options expose `aria-disabled="true"` and `data-max-reached="true"`. A `role="status"` region announces `"{n} selected"` or `"{n} of {max} selected"`. The popup stays open across toggles and chip removal never opens it.
- **No new policy was invented:** no portal, virtualisation, local/remote filtering, persistence, networking or validation rules; disabled contrast remains `DISABLED / REVIEW`.

### Tests-first proof (RED → GREEN)

Focused composition (Bun): `bun test src/shared/components/select/Select.composition.test.tsx src/shared/components/multi-select/MultiSelect.composition.test.tsx`

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `16 pass` / `14 fail` (`54 expect() calls`), `30 tests` across `2 files` |
| RED failures | Select: combobox trigger, controlled value display, uncontrolled `defaultValue` display, grouped options, prefix icon, search field, selected-status region, disabled trigger class, className-on-trigger, consumer-id label wiring; MultiSelect: selected-count status, `{n} of {max} selected`, searchable query field, no-search-when-closed, max-reached option marking |
| GREEN exit | `0` |
| GREEN result | `30 pass` / `0 fail` (`87 expect() calls`) |

Focused browser stories (Vitest + Playwright Chromium): `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/select/Select.stories.tsx src/shared/components/multi-select/MultiSelect.stories.tsx` (new stories run first against the unchanged native-select/chip implementation).

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `2 failed` files, `26 failed \| 15 passed (41)` |
| RED failures (Select) | `Reference`, `Filled`, `Open Popup`, `Dark Open Popup`, `Grouped Options`, `Dark Grouped Options`, `Prefix Icon`, `Dark Prefix Icon`, `Keyboard Skips Disabled`, `Keyboard Enter Selects`, `Escape Closes`, `Uncontrolled Selection`, `Controlled Selection`, `Popup Matches Trigger Width`, `Popup Flips Top`, `Dark Popup Flips Top`, `Searchable Query`, `Dark Searchable Query`, `Controlled Query` |
| RED failures (MultiSelect) | `Stay Open Toggles`, `Selected Count Announcement`, `Dark Selected Count Announcement`, `Max Selected Blocks Additions`, `Searchable Query`, `Dark Searchable Query`, `Controlled Query` |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `41 passed (41)` |

The eight stories that passed on the first RED run (`MultiSelect` `Reference`/`Interactive`/`Remove Chip`/`Invalid`/`Disabled`/`Light`/`Dark`/`Dark Stay Open Toggles`, plus the Select theme/validation stories) are retained regression coverage of behaviour that already existed; the failures above are the newly documented Pen behaviour.

### Both-theme / state coverage (browser)

| Contract | Light story | Dark story |
| --- | --- | --- |
| Select trigger surface | `Light` → `rgb(248, 250, 252)` | `Dark` → `rgb(2, 6, 23)` |
| Select popup surface, option states, grouped options | `Open Popup` / `Grouped Options` | `Dark Open Popup` / `Dark Grouped Options` |
| Select prefix icon (decorative) | `Prefix Icon` | `Dark Prefix Icon` |
| Select keyboard skip/Enter/Escape | `Keyboard Skips Disabled`, `Keyboard Enter Selects`, `Escape Closes` | — (theme-independent logic) |
| Select controlled vs uncontrolled selection | `Controlled Selection`, `Uncontrolled Selection` | — (theme-independent logic) |
| Select popup width + short-space flip | `Popup Matches Trigger Width`, `Popup Flips Top` | `Dark Popup Flips Top` |
| Select searchable query, no filtering | `Searchable Query` | `Dark Searchable Query` |
| Select controlled query | `Controlled Query` (`query` stays `""`, callback gets `abc`) | — |
| MultiSelect control surface | `Light` → `rgb(248, 250, 252)` | `Dark` → `rgb(2, 6, 23)` |
| MultiSelect stay-open toggle + chip removal/no-open | `Stay Open Toggles`, `Remove Does Not Open` | `Dark Stay Open Toggles` |
| MultiSelect selected-count / max-selection announcement | `Selected Count Announcement`, `Max Selected Blocks Additions` | `Dark Selected Count Announcement` |
| MultiSelect searchable query, no filtering | `Searchable Query` | `Dark Searchable Query` |
| MultiSelect controlled query | `Controlled Query` | — |
| Disabled contrast (both owners) | existing `Disabled` stories (unchanged) | `DISABLED / REVIEW` |

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `16 pass` / `14 fail` |
| focused composition GREEN | `0` | `30 pass` / `0 fail` (`87 expect() calls`) |
| focused browser RED | `1` | `2 failed` files, `26 failed \| 15 passed (41)` |
| focused browser GREEN | `0` | `2 passed` files, `41 passed (41)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `738 pass / 0 fail` (90 files, `3948 expect() calls`); browser `510 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-_kX2xiic.css 219.62 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B3 shipped baseline (`fc1acbb`): unit `726 → 738` (`+12`), browser `484 → 510` (`+26`).

### Changed paths

`src/shared/components/select/{select.tsx,preset.ts,index.ts,Select.composition.test.tsx,Select.stories.tsx}`, `src/shared/components/multi-select/{multi-select.tsx,preset.ts,MultiSelect.composition.test.tsx,MultiSelect.stories.tsx}`, this evidence. No `panda.config.ts`, token, icon, dependency, Pen or other component file was changed; generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Select combobox semantics + inline popup (no portal) | **PASS** |
| Select arrow navigation skips disabled; Enter selects; Escape closes | **PASS** |
| Select selected-option announcement (`role="status"`) | **PASS** |
| Select popup matches trigger width and flips on short space | **PASS** |
| Select flat `options` + additive `groups` | **PASS** |
| Select `prefixIcon` decorative slot (approved) | **PASS** |
| Select controlled/uncontrolled selection | **PASS** |
| Select `searchable` query UI + callback, no filtering | **PASS** |
| `GjzX0` Option / `aXD61` Select Popup owned privately, no export | **PASS** |
| MultiSelect stay-open option toggles | **PASS** |
| MultiSelect chip named removal, removal does not open the popup | **PASS** |
| MultiSelect selected-count announcement | **PASS** |
| MultiSelect `searchable` controlled/uncontrolled query, no filtering | **PASS** |
| MultiSelect `maxSelected` blocks additions but permits removal | **PASS** |
| Disabled contrast (both owners) | `DISABLED / REVIEW` (both themes) |
| **B4 final status** | **PASS** — every approved axis and the planner handoff are implemented and evidenced; no unresolved `FAIL` / `BLOCKED` / Critical / Important finding |

### Remaining concerns

- **INFO — search glyph.** Pen `aXD61` `SearchRow` carries a magnifier glyph, but the icon set ships no `search` icon and icons are out of scope for B4, so the search row is text-only (`Search…` placeholder + accessible name). Adding the glyph is a separate icon-pipeline change.
- **INFO — popup lifetime.** The popup is always mounted and `hidden` while closed (no portal), mirroring the repo's in-place overlay pattern; role queries do not see it until it is expanded.
- **INFO — flip heuristic.** Placement is measured from the trigger's viewport rect against an estimated popup height (row height × count, capped); it is a documented approximation of "flips when space is short", not an overlay policy engine.
- **INFO — MultiSelect at-cap surface.** At-cap unselected options are `aria-disabled`/`data-max-reached` and dimmed, but remain in the tab order so the blocked state is discoverable; no second disabled-cursor policy was added.
- Disabled contrast remains `DISABLED / REVIEW` in both themes.
