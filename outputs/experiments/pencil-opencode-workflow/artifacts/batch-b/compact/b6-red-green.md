# B6 RED → GREEN evidence — PinInput / FileUpload / ColorPicker / Rating / Editable (cycle 1/2)

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` — SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged after the read-only queries).\
**Base commit:** `3ac4a70` (`fix(shared): reconcile Calendar focus when disabled props change`).\
**Method:** Pencil MCP read-only `Get`/`Print` (`get_app_state` confirmed `ex_2.pen` as the active editor; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`), focused Bun composition tests and Vitest + Playwright Chromium story tests, plus `mise run gen` / `check` / `check:deps` / `build` and `git diff --check`. The browser RED was captured in one consolidated run by `git stash push` of only the five owners' implementation/preset files and `mise run gen` before the run; the GREEN run is the restored tree.\
**Owner paths:** `src/shared/components/{pin-input,file-upload,color-picker,rating,editable}/`.

## Pen enumeration gate (B6)

| Owner | Pen master → documentation frame | Documented public variant / state | Disposition |
| --- | --- | --- | --- |
| Pin Input | `E3ZhdP` → `K8gNTw` | named parts `root · cell · focused cell · filled cell · error row`; public variants `4 · 6 cells, masked, invalid, disabled`; states `empty · filled · focus-visible · invalid · disabled` | **PASS** — one accessible input owns the code, cells are presentational, `4`/`6`/`masked`/`invalid`/`disabled` retained |
| Pin Input | `K8gNTw` content + accessibility | "Typing advances automatically; Backspace clears and steps back."; "Pasting the full code fills every cell."; `znfZu` "One accessible input for the whole code where possible."; `X856Z2` "Announce how many characters remain."; "Never rely on colour alone for the filled state." | **PASS** — auto-advance / Backspace / arrows / full-code paste via the single input and the active-cell marker; polite remaining-character region; the digit itself is the non-colour filled state |
| File Upload | `YxCMD` → `pikCU` | named parts `root · dropzone · icon · instruction · accepted types · file row · progress · remove`; public variants `single · multiple, drag active, uploading, error`; states `default · drag active · uploading · complete · error · disabled` | **PASS for the visual projection** — external `status`/`progress`/`fileName`/`statusMessage` render loading/success/error; transport, retry, parsing, files-array and remove stay out of scope |
| File Upload | `pikCU` accessibility | `m0JpkI` "The dropzone is reachable and activatable by keyboard."; `ZorBH` "Progress changes are announced."; `S6563z` "Error rows explain the reason in text." | **PASS** — keyboard focus reaches the native input and paints the focus ring; `role="progressbar"` carries `aria-valuenow/min/max`; the error reason is text on a negative border |
| Color Picker | `Ecy07` + `vUOIa` → `RLmkc` | named parts `root · swatch · trigger · popup · palette grid · value field · opacity`; public variants `swatch · trigger, with palette, with value field, invalid`; states `default · focus-visible · invalid · disabled` | **PASS** — no public API change; `Color Popup` stays private |
| Color Picker | `RLmkc` selected/open | selected swatch indicator stroke 2 + `text/primary` (`WHWWK`); the open specimen `Al6Ac` (`cp2`) resolves `E8X0Qf` `Chevron rot=180` | **PASS** — selected swatch `borderWidth: thick` (2px) + `text/primary`; chevron `rotate(180deg)` while open |
| Rating | `qIRY3` → `PxfEf` | named parts `root · icon row · filled icon · empty icon · value label`; public variants `interactive · read-only, sizes, with value label` | **PASS (regression only)** — no implementation change |
| Rating | `PxfEf` accessibility | `IVyo2` "Expose the score and the maximum."; `uCV9n` "Arrow keys adjust the score when interactive."; `z94Ii` "Read-only ratings are text, not controls." | **PASS (regression only)** — score+max on each radio, Arrow keys, read-only `role="img"` text, value label |
| Editable | `zoEMh` → `RN3EO` | named parts `root · read view · edit view · affordance icon · confirm and cancel`; public variants `text, with affordance, multiline, saving`; states `read · hover · edit · focus-visible · saving · disabled` | **PASS** — confirm/cancel controls and `saving`; `multiline` stays out of scope |
| Editable | `RN3EO` content + accessibility | `Uo19r` "Enter confirms, Escape cancels and restores the previous value."; `LiBiT` "Show the edit affordance on hover and on focus."; `y6mZ4` "While saving, keep the field in place and show progress."; `WLTIp` "The read view is focusable and announces that it is editable."; `DRJ0l` "The edit view is a labelled input."; `XrUb6` "Confirm and cancel are reachable by keyboard." | **PASS** — Enter/Escape retained; affordance only on hover and focus-visible; saving keeps the field and shows a rotating indicator; named Confirm/Cancel buttons |

Verbatim Pen facts used:

- `K8gNTw` — `znfZu` "· One accessible input for the whole code where possible." · `X856Z2` "· Announce how many characters remain." · "· Typing advances automatically; Backspace clears and steps back." · "· Pasting the full code fills every cell." · "· Never rely on colour alone for the filled state."
- `pikCU` — "Named parts: root · dropzone · icon · instruction · accepted types · file row · progress · remove"; "Public variants: single · multiple, drag active, uploading, error"; states `default · drag active · uploading · complete · error · disabled`; `m0JpkI` "· The dropzone is reachable and activatable by keyboard."; `ZorBH` "· Progress changes are announced."; `S6563z` "· Error rows explain the reason in text."
- `RLmkc` — "Named parts: root · swatch · trigger · popup · palette grid · value field · opacity"; "Public variants: swatch · trigger, with palette, with value field, invalid"; `wOCyQ` "open · selected swatch"; "· The swatch exposes the colour value as its name." · "· Palette cells are keyboard reachable and labelled." The open specimen `Al6Ac` (`cp2`) resolves `E8X0Qf` (`Chevron`) `rot=180`.
- `PxfEf` — "Named parts: root · icon row · filled icon · empty icon · value label"; "Public variants: interactive · read-only, sizes, with value label"; `IVyo2` "· Expose the score and the maximum." · `uCV9n` "· Arrow keys adjust the score when interactive." · `z94Ii` "· Read-only ratings are text, not controls."
- `RN3EO` — "Named parts: root · read view · edit view · affordance icon · confirm and cancel"; "Public variants: text, with affordance, multiline, saving"; `Uo19r` "· Enter confirms, Escape cancels and restores the previous value." · `LiBiT` "· Show the edit affordance on hover and on focus." · `y6mZ4` "· While saving, keep the field in place and show progress." · `WLTIp` "· The read view is focusable and announces that it is editable." · `DRJ0l` "· The edit view is a labelled input." · `XrUb6` "· Confirm and cancel are reachable by keyboard."

## User-approved contract implemented

1. **PinInput** — the `znfZu` single-input projection: one focusable `<input>` owns the whole code (`autocomplete="one-time-code"`, `inputMode="numeric"`, `maxLength=length`), the cells are `aria-hidden` presentational spans, and the active cell carries `data-active="true"` and the shared focus ring. Auto-advance, Backspace-steps-back, Arrow keys and full-code paste are preserved. A visually hidden `role="status" aria-live="polite"` region announces `${remaining} characters remaining` (`X856Z2`). `znfZu` is **PASS**, not `BLOCKED`: the single input coexists with per-cell advance/backspace/arrows through the active-cell marker and the native caret, with no public API change.
2. **FileUpload** — the external-state props `status?: "idle" | "uploading" | "complete" | "error"`, `progress?: number` (0–100), `fileName?: string`, `statusMessage?: string` render loading/success/error without changing the dropzone box; `status="error"` paints the negative border and the text reason; `uploading` renders a `role="progressbar"` with `aria-valuenow`/`aria-valuemin="0"`/`aria-valuemax="100"`. No transport, retry, parsing, files-array or remove API, and no drag-active visual invention.
3. **ColorPicker** — no public API change; the selected swatch indicator is `borderWidth: thick` (2px) with `text/primary`; the chevron rotates 180° while open. `Color Popup` stays private (the generic `Popover` is reused; no new barrel export).
4. **Rating** — no API or visual change; documented semantics only (regression).
5. **Editable** — the edit view gains keyboard-reachable Confirm/Cancel buttons with those accessible names (`XrUb6`) and a `saving?: boolean` prop that keeps the field in place and shows a rotating progress indicator (`y6mZ4`). The affordance is hidden until hover and focus-visible (`LiBiT`). Enter confirms, Escape cancels and restores. The blur-commit was dropped because it is incompatible with the explicit Cancel control; this is the documented behaviour change (no blur test existed).

## Tests-first proof (RED → GREEN)

### Focused composition (Bun)

Command: `bun test src/shared/components/pin-input/PinInput.composition.test.tsx src/shared/components/file-upload/FileUpload.composition.test.tsx src/shared/components/color-picker/ColorPicker.composition.test.tsx src/shared/components/rating/Rating.composition.test.tsx src/shared/components/editable/Editable.composition.test.tsx`

| Field | Value |
| --- | --- |
| RED (per-owner, before implementation) | PinInput `8 fail` / `4 pass`; FileUpload `3 fail` / `9 pass`; Editable `3 fail` / `7 pass`; ColorPicker and Rating unchanged (regression) |
| GREEN exit | `0` |
| GREEN result | `51 pass` / `0 fail` (5 files), `162 expect() calls` |

The ColorPicker composition suite is unchanged and passes as regression; the genuinely missing PinInput/FileUpload/Editable facts failed against the pre-change code.

### Focused browser stories (Vitest + Playwright Chromium)

Command: `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/pin-input/PinInput.stories.tsx src/shared/components/file-upload/FileUpload.stories.tsx src/shared/components/color-picker/ColorPicker.stories.tsx src/shared/components/rating/Rating.stories.tsx src/shared/components/editable/Editable.stories.tsx`

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `4 failed \| 1 passed` files, `30 failed \| 37 passed (67)` |
| RED failures (PinInput, 13) | `Reference`, `Single Accessible Input`, `Typing Advances`, `Backspace Steps Back`, `Arrow Keys Move Marker`, `Paste Fills Code`, `Live Remaining`, `Six Cells`, `Masked`, `Active Cell Ring`, `Dark Active Cell Ring`, `Invalid`, `Disabled` |
| RED failures (FileUpload, 7) | `External Uploading`, `Dark External Uploading`, `Progress Clamp`, `External Complete`, `Dark External Complete`, `External Error`, `Dark External Error` |
| RED failures (ColorPicker, 4) | `Selected Indicator`, `Dark Selected Indicator`, `Chevron Rotates`, `Dark Chevron Rotates` |
| RED failures (Editable, 6) | `Confirm Cancel Controls`, `Cancel Control`, `Saving Keeps Field`, `Dark Saving Keeps Field`, `Affordance Reveal`, `Dark Affordance Reveal` |
| GREEN exit | `0` |
| GREEN result | `5 passed` files, `67 passed (67)` |

**Regression-only (not true RED):**

- Rating — all 11 stories passed on the RED run; the implementation is untouched and the assertions are documented-semantics regression coverage.
- FileUpload `Keyboard Activation` — passed on the RED run; the dropzone was already keyboard-reachable through the visually hidden native input, so this is regression coverage of `m0JpkI`.
- FileUpload `Playground`/`Light`/`Dark`, ColorPicker `Reference`/`Open And Select`/`Disabled`/`Light`/`Dark`, Editable `Playground`/`Reference`/`Edit And Save`/`Cancel With Escape`/`Invalid`/`Disabled`/`Light`/`Dark`, PinInput `Playground`/`Light`/`Dark` — retained regression coverage.

## Both-theme browser captures (computed style / DOM, in browser)

| Story (theme) | Assertion | Observed |
| --- | --- | --- |
| `Reference` (PinInput) | one `textbox` named `КОД`, `autocomplete="one-time-code"`, 4 cells | value `482`, `one-time-code`, 4 cells |
| `SingleAccessibleInput` (PinInput) | one `.pinInput__input`; all cells `aria-hidden`; remaining text | one input, cells `aria-hidden="true"`, `1 character remaining` |
| `TypingAdvances` / `BackspaceStepsBack` / `ArrowKeysMoveMarker` / `PasteFillsCode` | marker and value through real keyboard/paste | `1→2` marker advance; `48`→`4` marker back; arrows move the marker; paste `13-57`→`1357` |
| `ActiveCellRing` / `DarkActiveCellRing` | active cell ring | `outline-style: solid`, `outline-width: 2px`, `outline-color: rgb(34, 197, 94)`, both themes |
| `LiveRemaining` (PinInput) | polite region updates | `6 characters remaining` → `4 characters remaining` |
| `Masked` (PinInput) | presentational dots + password input | `type="password"`, cells `•••` |
| `Invalid` / `Disabled` (PinInput) | single-input ARIA / disabled | `aria-invalid="true"` + error text; disabled input |
| `ExternalUploading` / `DarkExternalUploading` (FileUpload) | progressbar values + fill + file name/reason | `aria-valuenow="42"`, `aria-valuemin="0"`, `aria-valuemax="100"`, bar `width: 42%`, `logo.png`, `Загрузка…`, border not negative |
| `ProgressClamp` (FileUpload) | out-of-range progress | `140` → `aria-valuenow="100"` |
| `ExternalComplete` / `DarkExternalComplete` (FileUpload) | success text, no progressbar | `logo.png`, `Готово`, no `progressbar` |
| `ExternalError` / `DarkExternalError` (FileUpload) | negative border + reason + description | border `rgb(220, 38, 38)` light / `rgb(248, 113, 113)` dark; `Файл слишком большой.`; input `aria-describedby` set |
| `KeyboardActivation` (FileUpload) | keyboard focus reaches the input and paints the ring | `document.activeElement` is the input; root `outline-style: solid`, `outline-width: 2px` |
| `SelectedIndicator` / `DarkSelectedIndicator` (ColorPicker) | selected swatch stroke | `border-top-width: 2px`; `rgb(15, 23, 42)` light / `rgb(248, 250, 252)` dark |
| `ChevronRotates` / `DarkChevronRotates` (ColorPicker) | chevron rotation | closed `transform: none`; open `180°` |
| `Semantics` / `DarkSemantics` (Rating) | score+max, arrows, value label | `4 of 5` checked, `4 / 5`, ArrowRight → `5 of 5`, `5 / 5` |
| `SavingKeepsField` / `DarkSavingKeepsField` (Editable) | field in place + progress | textbox `Edit value`, no read button, `aria-busy="true"`, `Saving` glyph `animation-name: spin`, Confirm/Cancel disabled |
| `AffordanceReveal` / `DarkAffordanceReveal` (Editable) | affordance on hover and focus only | `opacity: 0` idle; `1` under `[data-hover]`; `0` again; `1` on real `:focus-visible` |

Disabled contrast is unchanged and remains **`DISABLED / REVIEW`** in both themes for all five owners (the B6 slices do not touch disabled paint).

## Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition GREEN | `0` | `51 pass` / `0 fail` (`162 expect() calls`) |
| focused browser RED | `1` | `4 failed \| 1 passed` files, `30 failed \| 37 passed (67)` |
| focused browser GREEN | `0` | `5 passed` files, `67 passed (67)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `753 pass / 0 fail` (90 files, `4010 expect() calls`); browser `579 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ built in 80ms`; `dist/assets/index-BRqmZDGS.css 223.51 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B5 shipped baseline (`3ac4a70`): unit `742 → 753` (`+11`), browser `552 → 579` (`+27`).

## Changed paths

`src/shared/components/pin-input/{pin-input.tsx,preset.ts,PinInput.composition.test.tsx,PinInput.stories.tsx}`, `src/shared/components/file-upload/{file-upload.tsx,preset.ts,FileUpload.composition.test.tsx,FileUpload.stories.tsx}`, `src/shared/components/color-picker/{preset.ts,ColorPicker.stories.tsx}`, `src/shared/components/rating/{Rating.stories.tsx}`, `src/shared/components/editable/{editable.tsx,preset.ts,Editable.composition.test.tsx,Editable.stories.tsx}`, this artifact and `notes/batch-b-evidence.md`. No `index.ts` barrel, `panda.config.ts`, token, foundation, icon, font, dependency, other-component, screen or Pen file was changed. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

## Row disposition and final status

| Row | Disposition |
| --- | --- |
| PinInput one accessible code input + active-cell marker (`znfZu`) | **PASS** |
| PinInput auto-advance / Backspace / arrows / full-code paste | **PASS** |
| PinInput remaining-character polite announcement (`X856Z2`) | **PASS** |
| FileUpload external uploading/complete/error projection + progressbar | **PASS** |
| FileUpload keyboard activation (`m0JpkI`) | **PASS** (regression) |
| FileUpload error negative border + text reason (`S6563z`) | **PASS** |
| ColorPicker selected swatch 2px `text/primary` (`WHWWK`) | **PASS** |
| ColorPicker chevron 180° when open (`E8X0Qf`) | **PASS** |
| ColorPicker `Color Popup` stays private, no API change | **PASS** |
| Rating documented semantics (score+max, arrows, read-only text, value label) | **PASS** (regression only) |
| Editable keyboard-reachable Confirm/Cancel (`XrUb6`) | **PASS** |
| Editable `saving` keeps the field + progress indicator (`y6mZ4`) | **PASS** |
| Editable affordance on hover and focus-visible (`LiBiT`) | **PASS** |
| Editable Enter confirm / Escape cancel+restore | **PASS** |
| Disabled contrast (all five owners) | `DISABLED / REVIEW` (both themes) |
| **B6 final status** | **PASS** — no unresolved `FAIL` / `BLOCKED` / Critical / Important finding; `znfZu` is resolved as the approved single-input projection, not a `BLOCKED` API |
