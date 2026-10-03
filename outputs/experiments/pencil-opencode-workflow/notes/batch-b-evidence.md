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
