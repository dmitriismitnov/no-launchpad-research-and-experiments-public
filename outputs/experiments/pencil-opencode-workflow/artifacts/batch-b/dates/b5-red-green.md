# B5 RED → GREEN evidence — DateInput / Calendar / DatePicker range (cycle 1/2)

**Date:** 2026-10-04\
**Base commit:** `0034ba5` (`test(shared): assert exact and physical Select popup flip placement`).\
**Scope:** `src/shared/components/{date-input,calendar,date-picker}/` and this evidence. No Pen/generated/token/foundation/preset/dependency/other-component change.

Approved public contract (user decision, dispatch): `selectionMode?: "single" | "range"` (default `single`); `value` / `defaultValue` are a `Date` for `single` and `{ start?: Date; end?: Date }` for `range`, with a matching `onChange`; first pick sets the start, second the end, and any later pick starts a new range; DatePicker stays open after the start and closes after the end. `CalendarDay` is internalized (no public export). `DateInput` keeps the raw string value (typing/pasting, no parser); Calendar disables dates only through the explicit predicate and `min`/`max`. Out of scope and not added: a typed DatePicker parser/formatter, automatic past-date disabling, locale/timezone policy, portals.

## Focused composition (Bun)

Command: `bun test src/shared/components/date-input/DateInput.composition.test.tsx src/shared/components/calendar/Calendar.composition.test.tsx src/shared/components/date-picker/DatePicker.composition.test.tsx`

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `6 fail` / `24 pass` (30 total), `72 expect() calls` |
| RED failures | Calendar — `highlights a controlled range between its endpoints`, `normalizes a backwards controlled range`, `Calendar public surface > keeps CalendarDay internal to the owner`; DatePicker — `associates the invalid error with the trigger`, `associates the hint with the trigger`, `shows both range endpoints in the trigger` |
| GREEN exit | `0` |
| GREEN result | `30 pass` / `0 fail`, `82 expect() calls` |

The DateInput raw-value guard (`value="2025-02-30"` stays verbatim, `type="text"`) and the pre-existing Calendar/DateInput/DatePicker assertions pass unchanged in both runs.

## Focused browser stories (Vitest + Playwright Chromium)

Command: `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/calendar/Calendar.stories.tsx src/shared/components/date-picker/DatePicker.stories.tsx src/shared/components/date-input/DateInput.stories.tsx`

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `1 failed \| 2 passed` files, `13 failed \| 24 passed (37)` |
| RED failures | Calendar — `Range`, `Range Select`, `Range Backwards`, `Range Controlled`, `Range Controlled Noop`, `Range Colors`, `Dark Range Colors`, `Disabled No Op`, `Keyboard`; DatePicker — `Range Flow`, `Dark Range Flow`, `Range Controlled`, `Invalid` |
| GREEN exit | `0` |
| GREEN result | `3 passed` files, `37 passed (37)` |

## Pen facts implemented (read-only source `ex_2.pen`, SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes, unchanged)

| Pen node | Fact | Disposition |
| --- | --- | --- |
| `ivx6N` Date Input master | frame; calendar `CalIcon`; `Value` "Select date" | **PASS** — unchanged raw text field |
| `dW2kV` Date Input docs | `Public variants: empty · filled, with format hint, invalid, disabled`; "Accept typed and pasted values, not only picked ones"; "Expose the expected format in the hint"; "Typing is the primary path" | **PASS** — raw value preserved, no parser |
| `oKLr9` Calendar Day master | frame; `Num` day text | **PASS** — now internal anatomy of `Calendar` |
| `zh2sP` Calendar master | `Head` (month, prev/next), `Weekdays`, `Week0..Week4` of 35 `Day` refs | **PASS** |
| `qPx25` Date Picker docs | `Public variants: single · range, with month navigation, disabled days, invalid`; "The calendar opens on the selected month, otherwise the current one."; "Past or unavailable days are disabled, never hidden."; "Closing without a selection leaves the previous value untouched."; "Arrow keys move by day, Page Up and Down by month."; "Selected and disabled days are announced." | **PASS** |

## Behavior implemented

- **Calendar** — `selectionMode` selects one day or a `{ start, end }` range. In `range`: the first pick sets the start, the second completes the range in either direction (a backwards second pick is ordered), and any later pick starts a fresh range. Controlled `value` never mutates without `onChange`; uncontrolled `defaultValue` updates visually. Endpoints carry `aria-selected`, the span carries the `inRange` recipe variant. Disabled days come only from `min`/`max` and `isDateDisabled`; selecting one is a no-op. Keyboard: Arrow day movement, `Home`/`End` week edges, `PageUp`/`PageDown` months, Enter/Space select the focused enabled day.
- **CalendarDay** — module-private; `CalendarDay` / `CalendarDayProps` are no longer exported from `calendar/index.ts`. The public entry exports `Calendar`, `CalendarProps`, `CalendarSingleProps`, `CalendarRangeProps`, `CalendarSelectionMode`, `CalendarSurface`, `DateRange`.
- **DatePicker** — `selectionMode` mirrors the Calendar contract. The trigger carries `aria-invalid` when `invalid` and `aria-describedby` to the rendered hint or error element; the error replaces the hint. In `range` the popup stays open after the start pick and closes after the end pick; in `single` a pick closes it; `Escape`/outside close without changing the value; `disabled` blocks opening; the trigger shows `YYYY-MM-DD` or `YYYY-MM-DD – YYYY-MM-DD`.
- **DateInput** — unchanged: raw `<input type="text">` value, no parsing/formatting.

## Both-theme computed-style captures (in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Calendar selected day background | `Selected Colors` → `rgb(21, 128, 61)` | `Dark Selected Colors` → `rgb(134, 239, 172)` |
| Calendar range span background | `Range Colors` → `rgb(220, 252, 231)` | `Dark Range Colors` → `rgb(20, 83, 45)` |
| Calendar disabled day text / opacity | `Disabled Days` → `rgb(148, 163, 184)`, `disabled`, `aria-disabled="true"` | `Dark Disabled Days` → `rgb(71, 85, 105)`, `disabled` |
| DatePicker disabled field / value | `Disabled Surface` → `rgb(241, 245, 249)` / `rgb(148, 163, 184)` | `Dark Disabled Surface` → `rgb(15, 23, 42)` / `rgb(71, 85, 105)` |

Disabled contrast remains **`DISABLED / REVIEW`** (computed style recorded, never a contrast `PASS`).

## Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `6 fail` / `24 pass` |
| focused composition GREEN | `0` | `30 pass` / `0 fail` |
| focused browser RED | `1` | `13 failed \| 24 passed (37)` |
| focused browser GREEN | `0` | `3 passed` files, `37 passed (37)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `742 pass / 0 fail` (90 files); browser `543 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-_kX2xiic.css 219.62 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B4 shipped baseline (`0034ba5`, via `2fdf6e0`/B4 evidence): unit `738 → 742` (`+4`), browser `527 → 543` (`+16`).

## Changed paths

`src/shared/components/calendar/{calendar.tsx,date-utils.ts,index.ts,Calendar.composition.test.tsx,Calendar.stories.tsx}`, `src/shared/components/date-picker/{date-picker.tsx,index.ts,DatePicker.composition.test.tsx,DatePicker.stories.tsx}`, `src/shared/components/date-input/DateInput.composition.test.tsx`, this artifact and `notes/batch-b-evidence.md`. No `panda.config.ts`, preset, token, icon, font, dependency, Pen or other component file was changed; generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored, never hand-edited).

## No new API / policy

No `CalendarDay` public export, no `SegmentedControl`-style extra component, no DatePicker parser/formatter, no automatic past-date disabling, no locale/timezone policy and no portal change was added.

## Correction cycle 2/2 — keyboard focus never lands on a disabled day

**Date:** 2026-10-04\
**Base commit:** `695f755` (`feat(shared): support Calendar and DatePicker date ranges`).\
**Scope:** `src/shared/components/calendar/{calendar.tsx,Calendar.stories.tsx}`, this artifact and `notes/batch-b-evidence.md`. No public API/type/barrel, DatePicker/DateInput, preset, token, generated, dependency, Pen or other-component change.

### Root cause

`handleKeyDown` computed the raw adjacent / edge / month date and `moveFocus` unconditionally called `setFocusedDate(next)`. When the computed day was disabled, the grid gave that native disabled `<button>` `tabIndex={0}` (the only roving tab stop), and the focus effect's `target.focus()` was silently ignored by the disabled control, so `document.activeElement` stayed on the previous day while the tab stop pointed at a disabled cell. `2025-03-16` + `ArrowRight` with `17`/`18` disabled landed on disabled `17`.

### Fix (one disabled source + finite resolvers)

| # | Change |
| --- | --- |
| 1 | The single `isDisabled` (explicit `min` / `max` + `isDateDisabled`) is defined before the state and is the **only** disabled source the keyboard resolvers consult. |
| 2 | `focusedDate` is now `Date \| null`; `resolveInitialFocus` keeps the anchor (`value` / `defaultValue` / `today`) when it is enabled, otherwise falls back to the first enabled day of the displayed grid, otherwise `null`. |
| 3 | Finite `findEnabled(from, step, limit = 366)` walks to the first enabled day; `findEnabledInWeek` bounds `Home` / `End` to the 7-day week; `findEnabledInMonth` picks the nearest enabled day inside the target month (forward, then backward). |
| 4 | Arrows, `Home` / `End`, `PageUp` / `PageDown` all resolve through these; when no enabled candidate exists the keypress is consumed (`preventDefault`) but focus and month are preserved. |
| 5 | Defensive `moveFocus` (ignores a disabled or same-day target) and `onFocus` (ignores a disabled day). `tabIndex={0}` is emitted only when `focusedDate` is non-null and matches. |

No prop, type, barrel or recipe changed; `CalendarDay` stays internal.

### Tests-first proof (RED → GREEN)

Focused browser stories (Vitest + Playwright Chromium), command `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/calendar/Calendar.stories.tsx`. RED was produced test-first by running the seven new stories against the base `calendar.tsx` (the fix temporarily reverted; the 19 pre-existing stories passed in the same run).

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `7 failed \| 19 passed (26)` |
| RED failures | `Keyboard Skips Disabled`, `Keyboard Vertical Skip`, `Keyboard Min Max`, `Keyboard Home End`, `Keyboard No Enabled Candidate`, `Initial Disabled Default`, `Initial Disabled Value` |
| GREEN exit | `0` |
| GREEN result | `26 passed (26)` |

Focused unit / composition (Bun), command `bun test src/shared/components/calendar/Calendar.composition.test.tsx src/shared/components/date-picker/DatePicker.composition.test.tsx src/shared/components/date-input/DateInput.composition.test.tsx`: `30 pass` / `0 fail`, `82 expect() calls`.

Focused browser regression set (Calendar + DatePicker + DateInput stories): `3 passed` files, `44 passed (44)`.

### New story coverage (in browser)

| Story | Assertion |
| --- | --- |
| `Keyboard Skips Disabled` | `16` → `ArrowRight` skips native-disabled `17`/`18` → `19`; `document.activeElement` is `19`, `19` is the sole `tabindex="0"`, `17`/`18` are `disabled` with `tabIndex -1`; `ArrowLeft` skips back to `16`. |
| `Keyboard Vertical Skip` | `16` → `ArrowDown` skips disabled `23` → `30`; `24` → `ArrowUp` skips disabled `17` → `10`. |
| `Keyboard Min Max` | `17` → two `ArrowLeft` → `15`; a third `ArrowLeft` at `min` stays on `15`; `20` → `ArrowRight` at `max` stays on `20`. |
| `Keyboard Home End` | `Home` from `13` skips leading disabled `10`/`11` → `12`; `End` skips trailing disabled `15`/`16` → `14`. |
| `Keyboard No Enabled Candidate` | every day disabled: `ArrowRight` / `PageDown` keep `March 2025` and leave zero `tabindex="0"` cells. |
| `Initial Disabled Default` | `defaultValue` `20` disabled: `20` is `tabIndex -1`; the sole tab stop is the enabled `2025-02-24`. |
| `Initial Disabled Value` | controlled `value` `20` disabled but selected: same roving target rule. |

The pre-existing `Keyboard` story (`16 → 17 → 24 → PageDown April 24 → Enter selects`) and all selection / range / cross-month stories stay green.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| focused browser RED | `1` | `7 failed \| 19 passed (26)` |
| focused browser GREEN | `0` | `26 passed (26)` |
| focused unit / composition | `0` | `30 pass` / `0 fail`, `82 expect() calls` |
| focused browser regression (3 files) | `0` | `44 passed (44)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `742 pass / 0 fail` (90 files); browser `550 passed` (73 files) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-_kX2xiic.css 219.62 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B5 shipped baseline (`695f755`): browser `543 → 550` (`+7`, the new stories); unit unchanged at `742`. `mise run check:deps` was intentionally **not** run: no dependency, export or barrel changed.

### Changed paths

`src/shared/components/calendar/{calendar.tsx,Calendar.stories.tsx}`, this artifact and `notes/batch-b-evidence.md`. No `panda.config.ts`, preset, token, icon, font, dependency, Pen artifact, other component or generated file was changed; `mise run gen` was therefore not required.

### No new API / policy

No public export, prop, type, barrel, recipe or behavior outside the Calendar keyboard-focus defect was changed.
