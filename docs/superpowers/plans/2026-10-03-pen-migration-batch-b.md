# Pen migration Batch B — Actions and Forms & selection Implementation Plan

> **For agentic workers:** REQUIRED FOREGROUND PROCESS: the foreground GPT planner dispatches **DeepSeek v4.1 Flash** as builder, then **GPT-5.6 Terra** as reviewer, for one slice at a time. On Critical or Important findings only, the foreground GPT planner writes the smallest correction plan and dispatches exactly one second DeepSeek builder / GPT reviewer cycle. Never run more than two cycles for a slice; if the second review remains Critical or Important, mark the slice `BLOCKED` and return its evidence. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Migrate the Batch B Actions and Forms & selection Pen masters to the mapped React/Panda owners, with every Pen-proven public variant, visual state, semantic interaction, aggregate boundary, and both-theme evidence accounted for.

> **Closure (2026-10-05): COMPLETE and ACCEPTED.** All Batch B slices (B0–B6) are done and reviewed; see `outputs/experiments/pencil-opencode-workflow/notes/batch-b0-evidence.md` and `batch-b-evidence.md` (plus the Batch B final-verification section). Every step below is satisfied; the checkboxes are marked to match reality. The one program-level regression traced to this batch (B0 `Button width:"hug"` collapsing the Landing mobile-menu CTA) was resolved in `0633e4c` (Landing explicit `width="full"` + refreshed baselines), accepted in `batch-e-evidence.md` §9–§10. Residuals are the documented `BLOCKED`/`INFO`/`DISABLED / REVIEW` rows, not unresolved failures.

**Architecture:** Each slice owns complete component directories—implementation, Panda preset, public barrel, stories, focused tests, and evidence—so it can ship and be reviewed independently. Pen is read-only authority; the public-variant enumeration gate is performed from each documentation frame before the existing React API can be retained. Aggregate masters remain internal to their designated owner: Option/Select Popup → Select, Calendar Day/Calendar → Calendar/DatePicker, Color Popup → ColorPicker, and Radio → RadioGroup.

**Tech Stack:** React, TypeScript, PandaCSS, Bun, Vitest, Storybook interaction tests, Playwright/Chromium, Pencil MCP (read-only), mise.

**Spec:** `docs/superpowers/specs/2026-10-03-full-pen-component-migration-design.md`; program plan: `docs/superpowers/plans/2026-10-03-full-pen-component-migration.md`; B0 evidence: `outputs/experiments/pencil-opencode-workflow/notes/batch-b0-evidence.md`.

## Global Constraints

- Pen authority is read-only `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`; do not mutate it, product screens, dashboard, Landing, or generated `src/shared/styled-system/`.
- Before accepting any owner API, transcribe its full Pen `Public variants` and specimens. Every axis must map to a public prop or be `BLOCKED`; a pre-existing API is not evidence.
- Implement only interaction/accessibility behavior written or demonstrated in Pen. Do not invent persistence, validation policy, upload transport, retry policy, saving backend, animation, route behavior, or calendar business rules.
- Each changed owner uses its existing `{component}.tsx`, `preset.ts`, `index.ts`, `{Component}.stories.tsx`, and `{Component}.composition.test.tsx` convention. Run `mise run gen` after Panda changes; never hand-edit generated output.
- For every changed owner and aggregate, capture Pen/code side-by-side evidence in both `data-theme="light"` and `data-theme="dark"`; record Pen/master/doc IDs, state, viewport, command result, token/geometry observations, and final disposition in `outputs/experiments/pencil-opencode-workflow/notes/batch-b-evidence.md`.
- `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, and `DISABLED / REVIEW` have the definitions in the migration spec. Disabled contrast is always `DISABLED / REVIEW`, never `PASS`.
- A slice cannot ship with unresolved `FAIL`, `BLOCKED`, Critical, or Important findings. The sole exception is the explicit decision-only B0 gate below: it ships its documented `BLOCKED` disposition without changing product code.

## Review Focus

- A pre-existing prop that fails to express a documented Pen axis must become an explicit `BLOCKED` API decision, not be silently kept.
- Native controls must preserve labels, disabled/read-only behavior, invalid description/error wiring, and keyboard semantics before visual parity is accepted.
- Select, ColorPicker, Calendar, and DatePicker must not introduce a duplicate public aggregate component or add undocumented overlay policy.
- Controlled values/open state must call change callbacks without mutating controlled visual state; uncontrolled counterparts must visibly update.
- Light/dark evidence must include every documented selected/open/invalid/disabled state and must classify disabled contrast as review-only.

## Pen ownership and enumeration ledger

| Slice                                | Pen master → documentation frame                                                                                                                                        | Owner                                                                  | Complete Pen public variants / states to enumerate before API acceptance                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B0 decision gate                     | `IcuBw` Button → `vW8MG`; `L72UAx` Icon Button → `L2cyL`                                                                                                                | `src/shared/components/button/`; `src/shared/components/button-icon/`  | Button tone `primary·secondary·ghost·destructive`, size `sm·md`, width `hug·full`, icon `none·prefix·suffix`, default/hover/active/focus-visible/disabled/loading; Icon Button tone `primary·secondary·ghost·destructive`, size `sm·md`, default/hover/active/focus-visible/disabled/loading, required accessible label.                                                                                                                                                                |
| B1 actions                           | `gkK5e` Toggle → `MApo8`; `e5ySA` Toggle Group → `OHpCJ`; Segmented Control documentation `yqYp1`                                                                       | `src/shared/components/toggle/`; `src/shared/components/toggle-group/` | Toggle label/icon, default/hover/active/pressed/focus-visible/disabled. Toggle Group selection `single·multiple`, two/three/four segments, icon, disabled, selected/hover/focus-visible.                                                                                                                                                                                                                                                                                                |
| B2 native entry controls             | `dO8tX` Text Input → `VSh2R`; `w6oNZ7` Textarea → `N0ymEX`; `EZfrL` Number Input → `oTL4D`; `pHfEy` Field → `c6uIoT`                                                    | `input/`; `textarea/`; `number-input/`; `field/`                       | Input type `text·email·password·search`, size, prefix/suffix, required; empty/filled/hover/focus-visible/disabled/read-only/invalid/valid. Textarea rows, auto-grow, counter, invalid; default/focus-visible/disabled/invalid. Number stepper on/off, unit, min/max, size; default/focus-visible/disabled/invalid/min/max. Field label placement, hint on/off, error on/off, required; default/focus-visible/invalid/disabled.                                                          |
| B3 binary, range, and radio controls | `e2q2z` Checkbox → `RB6lx`; `UrFJz` Radio → `BRhSj`; `BQvnn` Switch → `gHtWp`; `z57yzW` Slider → `lLkUG`; `IENTK` Radio Group → `BRhSj`                                 | `checkbox/`; `radio/`; `switch/`; `slider/`; `radio-group/`            | Checkbox checked/unchecked/indeterminate, label, disabled, hover/focus-visible/invalid. RadioGroup vertical/horizontal, description, invalid, disabled, 2–5 options; selected/hover/focus-visible. Switch on/off, size, label, disabled; hover/focus-visible. Slider single/range, value label, stepped, disabled; default/hover/focus-visible/dragging.                                                                                                                                |
| B4 select families                   | `tOLtR` Select, `GjzX0` Option, `aXD61` Select Popup → `vMd62`; `f985P` Multi Select → `jZrkt`                                                                          | `select/`; `multi-select/`                                             | Select closed/open, searchable, prefix, invalid, disabled, filled; option default/hover/selected/disabled; grouped options. MultiSelect closed/open, search, max selection, invalid, disabled; item hover/selected, chip removal, overflow counter.                                                                                                                                                                                                                                     |
| B5 date families                     | `ivx6N` Date Input → `dW2kV`; `oKLr9` Calendar Day, `zh2sP` Calendar, `bpCbJ` Date Picker → `qPx25`                                                                     | `date-input/`; `calendar/`; `date-picker/`                             | DateInput empty/filled, format hint, invalid, disabled; focus-visible. Calendar/DatePicker single/range, month navigation, disabled dates, invalid; closed/open, selected day, today/range/unavailable, focus-visible trigger.                                                                                                                                                                                                                                                          |
| B6 compact and compound controls     | `E3ZhdP` Pin Input → `K8gNTw`; `YxCMD` File Upload → `pikCU`; `Ecy07` Color Picker, `vUOIa` Color Popup → `RLmkc`; `qIRY3` Rating → `PxfEf`; `zoEMh` Editable → `RN3EO` | `pin-input/`; `file-upload/`; `color-picker/`; `rating/`; `editable/`  | Pin 4/6 cells, masked, invalid, disabled; empty/partial/complete/focus-visible. FileUpload single/multiple, drag active/uploading/error; default/drag/uploading/complete/error/disabled. ColorPicker swatch/trigger, palette, value field, invalid; default/open/focus-visible/disabled. Rating interactive/read-only, size, value label; empty/partial/full/hover/focus-visible/disabled. Editable text, affordance, multiline, saving; read/hover/edit/focus-visible/saving/disabled. |

## Evidence and orchestration protocol (applies to every slice)

- [x] Foreground planner re-queries the listed master and exact documentation frame with Pencil MCP `Get`; record source identity, named parts, `Public variants`, state specimens, interaction/accessibility text, and light/dark refs in the slice ledger before dispatch.
- [x] Foreground planner gives DeepSeek v4.1 Flash only the slice owner paths, exact Pen IDs, complete enumeration, RED assertions, constraints, evidence path, and verification commands below. The builder must not touch a different slice.
- [x] Builder writes the focused test first, runs it to prove a nonzero RED result against the specific Pen fact, makes the smallest implementation/preset/story change, runs GREEN, regenerates Panda when applicable, and captures evidence.
- [x] Foreground dispatches GPT-5.6 Terra with the builder diff, exact command output, Pen readback/exports, and code-side evidence. Reviewer checks enumeration completeness, behavior boundary, aggregate ownership, accessibility, both themes, generated-file discipline, and evidence disposition.
- [x] If reviewer severity is Critical or Important, foreground planner creates the smallest correction plan and runs one—not zero, not more than one—additional DeepSeek builder and GPT reviewer cycle. If the second review remains Critical or Important, mark `BLOCKED`; do not begin a third cycle.
- [x] When review is clean, append the slice evidence and a final PASS/INFO/HUMAN REVIEW disposition. Commit the slice independently using a conventional commit; do not batch unrelated owners.

### Task B0: Reconcile the already-shipped Button / Icon Button API blocks

**Files:**

- Read only unless an explicit API decision is supplied: `src/shared/components/button/{button.tsx,preset.ts,Button.test.ts,Button.composition.test.tsx,Button.stories.tsx,index.ts}`.
- Read only unless an explicit API decision is supplied: `src/shared/components/button-icon/{button-icon.tsx,preset.ts,ButtonIcon.test.ts,ButtonIcon.composition.test.tsx,ButtonIcon.stories.tsx,index.ts}`.
- Evidence: `outputs/experiments/pencil-opencode-workflow/notes/batch-b0-evidence.md`; append Batch B disposition to `outputs/experiments/pencil-opencode-workflow/notes/batch-b-evidence.md`.

**Interfaces:** Produces one of: accepted explicit public API decision and an implementation-ready correction task, or the unchanged documented `BLOCKED` disposition. It does not authorize a new API by inference.

- [x] **Step 1: Re-read only the B0 evidence and Pen facts needed for the unresolved axes.** Confirm Button `width: hug·full` from `IcuBw`/`vW8MG` (`MboG8`/`GW4Jy` full-width refs) and Button/Icon Button loading/spinner from `vW8MG`/`L2cyL`; retain B0’s passed destructive-tone rows.
- [x] **Step 2: Write the decision-gate RED assertions (only after API approval).** For an approved width decision, assert `render(<Button width="full">Save</Button>)` exposes the Pen full-width recipe while default `hug` remains content-sized. For an approved loading decision, assert `render(<Button loading>Save</Button>)` retains label width and exposes a decorative spinner; assert `ButtonIcon loading` follows the approved icon-button contract. Without approval, do not add speculative tests or props.
- [x] **Step 3: Preserve the current BLOCKED result when no decision exists.** Record `IcuBw width: full` and `IcuBw/L72UAx loading` as `BLOCKED`; do not reinterpret existing `className`, `disabled`, or children as a public implementation. Keep `alert-dialog` local danger styling as B0 `INFO`.
- [x] **Step 4: If and only if an API decision exists, implement and test the minimum approved surface.** Add no axis beyond Pen’s `width` or `loading`/spinner, update stories for all documented states in both themes, run `mise run gen`, and rerun the focused RED tests as GREEN.
- [x] **Step 5: Verify and review.** Run the focused Button/Icon Button tests and stories, then `mise run check`; collect both-theme computed style or screenshots. Send to reviewer under the two-cycle protocol.

### Task B1: Toggle and ToggleGroup / Segmented Control evidence gate

**Files:**

- Modify: `src/shared/components/toggle/{toggle.tsx,preset.ts,index.ts,Toggle.stories.tsx,Toggle.composition.test.tsx}`.
- Modify: `src/shared/components/toggle-group/{toggle-group.tsx,preset.ts,index.ts,ToggleGroup.stories.tsx,ToggleGroup.composition.test.tsx}`.
- Evidence: `outputs/experiments/pencil-opencode-workflow/artifacts/batch-b/actions/`; `outputs/experiments/pencil-opencode-workflow/notes/batch-b-evidence.md`.

**Interfaces:** Toggle remains a controlled/uncontrolled `pressed` button. ToggleGroup must explicitly represent the Pen selection mode and the documented item label/icon/disabled inputs; it must not export `SegmentedControl`.

- [x] **Step 1: Perform the action enumeration gate.** Re-query `gkK5e`/`MApo8`, `e5ySA`/`OHpCJ`, and `yqYp1`. Record Toggle’s label-or-icon accessible-name requirement and all six states. Record ToggleGroup `single·multiple`, and Segmented Control two/three/four exclusive segments, icon, disabled, selected/hover/focus-visible.
- [x] **Step 2: Write failing focused assertions.** Assert Toggle’s controlled and uncontrolled `aria-pressed`, disabled no-op, native Enter/Space, and icon-only accessible name. Assert ToggleGroup `single` never retains two values, `multiple` toggles independently, arrow keys move one item focus, Enter/Space changes the focused item, and the exclusive projection is `role="radiogroup"` with selected item announced. Assert 2/3/4 segments, icon-only names, and disabled items from `yqYp1`.
- [x] **Step 3: Run RED.** Run `bun test src/shared/components/toggle/Toggle.composition.test.tsx src/shared/components/toggle-group/ToggleGroup.composition.test.tsx`; expect failures for the missing selection-mode, radiogroup, roving-focus, and icon option contract before implementation.
- [x] **Step 4: Implement only documented semantics and Panda states.** Keep Toggle as `aria-pressed`; provide the Pen-proven single/multiple mode in ToggleGroup, use radiogroup/radio semantics only for exclusive segmented projection, preserve group semantics for multiple mode, and implement per-item focus-visible/disabled/pressed visuals. Do not create `SegmentedControl`, tabs, navigation, animation, or an arbitrary selection API.
- [x] **Step 5: Run GREEN and capture.** Run focused tests, `mise run gen`, and the two owner stories. Capture default/hover/active-or-pressed/focus-visible/disabled plus selected and 2/3/4 exclusive segments in both themes; inspect shared borders, item geometry, focus ring, and no clipping.
- [x] **Step 6: Review and commit.** Apply the foreground two-cycle protocol; commit only the Toggle slice after all its evidence rows are non-blocking.

### Task B2: Native entry controls and Field composition

**Files:**

- Modify: `src/shared/components/input/{input.tsx,preset.ts,index.ts,Input.stories.tsx,Input.test.ts,Input.composition.test.tsx}`.
- Modify: `src/shared/components/textarea/{textarea.tsx,preset.ts,index.ts,Textarea.stories.tsx,Textarea.composition.test.tsx}`.
- Modify: `src/shared/components/number-input/{number-input.tsx,preset.ts,index.ts,NumberInput.stories.tsx,NumberInput.composition.test.tsx}`.
- Modify: `src/shared/components/field/{field.tsx,preset.ts,index.ts,Field.stories.tsx,Field.composition.test.tsx}`.

**Interfaces:** Native `<input>`/`<textarea>` remain the behavior source. Field owns visible label/hint/error association and forwards only the Pen-proven required/invalid/disabled state to one child control.

- [x] **Step 1: Enumerate `dO8tX`/`VSh2R`, `w6oNZ7`/`N0ymEX`, `EZfrL`/`oTL4D`, and `pHfEy`/`c6uIoT`.** List every ledger axis before retaining an existing prop; mark an axis `BLOCKED` if it needs a public prop not demonstrated by the frame.
- [x] **Step 2: Write RED assertions.** Input: type, required, prefix/suffix, empty/filled/read-only/invalid description wiring. Textarea: rows, optional auto-grow and counter only when documented props expose them, invalid/disabled. NumberInput: typed numeric input, optional stepper controls with names, min/max clamp and `aria-valuemin/max/now`. Field: label-control association, required state, hint replaced by error only with invalid, and disabled/invalid forwarding.
- [x] **Step 3: Run RED.** Run `bun test src/shared/components/input/Input.test.ts src/shared/components/input/Input.composition.test.tsx src/shared/components/textarea/Textarea.composition.test.tsx src/shared/components/number-input/NumberInput.composition.test.tsx src/shared/components/field/Field.composition.test.tsx`; expect the exact unimplemented Pen assertions to fail.
- [x] **Step 4: Make the minimum component-local implementation.** Use `border.strong`, `semantic.focus.ring`, and negative feedback roles from existing Foundation; preserve native read-only/disabled form behavior. Do not add submission-time announcements, validation policy, arbitrary max-length behavior, or bespoke field layouts beyond Pen specimens.
- [x] **Step 5: GREEN and evidence.** Run the focused suite and `mise run gen`. Capture all listed states in both themes, including text input password/search, textarea counter only when limit exists, NumberInput min/max, and Field required/error replacement; log disabled rows as `DISABLED / REVIEW`.
- [x] **Step 6: Review and commit B2 independently.** Use the foreground two-cycle protocol and commit only these four owners/evidence.

### Task B3: Checkbox, Radio/RadioGroup, Switch, and Slider

**Files:**

- Modify: `src/shared/components/checkbox/{checkbox.tsx,preset.ts,index.ts,Checkbox.stories.tsx,Checkbox.composition.test.tsx}`.
- Modify: `src/shared/components/radio/{radio.tsx,preset.ts,index.ts,Radio.stories.tsx,Radio.composition.test.tsx}`.
- Modify: `src/shared/components/radio-group/{radio-group.tsx,preset.ts,index.ts,RadioGroup.stories.tsx,RadioGroup.composition.test.tsx}`.
- Modify: `src/shared/components/switch/{switch.tsx,preset.ts,index.ts,Switch.stories.tsx,Switch.composition.test.tsx}`.
- Modify: `src/shared/components/slider/{slider.tsx,preset.ts,index.ts,Slider.stories.tsx,Slider.composition.test.tsx}`.

**Interfaces:** Radio remains the atomic native control consumed by RadioGroup; it is not a competing group API. Checkbox/Switch remain native inputs. Slider exposes only Pen’s single/range, numeric value, step, bounds, and label semantics.

- [x] **Step 1: Enumerate all five owners from `RB6lx`, `BRhSj`, `gHtWp`, and `lLkUG`.** For `UrFJz` Radio, record it as the atomic member whose variants/accessibility are evidenced by `BRhSj`; do not infer a standalone group feature.
- [x] **Step 2: Write RED assertions.** Checkbox exposes `checked` and indeterminate (`input.indeterminate` plus appropriate announced state), label click, Space and invalid. RadioGroup has one tab stop, native arrow movement, named group, orientation, optional descriptions, invalid announcement, and disabled options. Switch uses `role="switch"`, checked state, label target, Space. Slider has `aria-valuemin/max/now`, Arrow/Home/End behavior, visible value label, range two thumbs only if Pen’s range interface is expressible.
- [x] **Step 3: Run RED.** Run the five focused composition suites; expect failures only for missing documented behavior/visual variant tests.
- [x] **Step 4: Implement the smallest semantic corrections.** Keep native radios under RadioGroup and use native browser grouping; do not add a separate RadioGroup selection model to Radio. Do not add form validation, touch drag persistence, or a numeric fallback widget beyond the documented control.
- [x] **Step 5: GREEN and evidence.** Run focused tests plus `mise run gen`. Capture Checkbox unchecked/checked/indeterminate/invalid, RadioGroup vertical/horizontal/selected, Switch on/off, and Slider single/range/stepped/disabled across both themes.
- [x] **Step 6: Review and commit B3 independently.** Use the exact foreground process and review aggregate ownership (`UrFJz` consumed by `IENTK`).

### Task B4: Select and MultiSelect, with Option/Popup retained internally

**Files:**

- Modify: `src/shared/components/select/{select.tsx,preset.ts,index.ts,Select.stories.tsx,Select.composition.test.tsx}`.
- Modify: `src/shared/components/multi-select/{multi-select.tsx,preset.ts,index.ts,MultiSelect.stories.tsx,MultiSelect.composition.test.tsx}`.

**Interfaces:** `Select` owns `GjzX0` Option and `aXD61` Select Popup as unexported anatomy. `MultiSelect` owns its trigger/chips/popup. Neither creates a public `Option` or `SelectPopup` export.

- [x] **Step 1: Enumerate `tOLtR`, `GjzX0`, `aXD61` from `vMd62` and `f985P` from `jZrkt`.** Specifically transcribe Select open/closed/searchable/prefix/grouped/item states and MultiSelect search/max-selection/chip/counter states; compare each to the current public API before coding.
- [x] **Step 2: Write RED assertions.** Select: combobox expanded state, listbox option default/hover/selected/disabled, arrow navigation, Enter select, Escape close, selected announcement, trigger-width popup and short-space flip. MultiSelect: selection does not close popup, chips have named remove controls, remove does not open popup, selected count is announced, max selection blocks only the Pen-proven addition path.
- [x] **Step 3: Run RED.** Run `bun test src/shared/components/select/Select.composition.test.tsx src/shared/components/multi-select/MultiSelect.composition.test.tsx`; expect failures before replacing a native-only select if Pen requires the documented popup behavior.
- [x] **Step 4: Implement only the proven projection.** If a Pen public axis cannot be represented without an API change, mark it `BLOCKED` rather than silently degrading it to native `<select>`. Keep Popup and Option private to Select; do not add remote search, filtering policy, virtualisation, persistence, or portal policy.
- [x] **Step 5: GREEN and evidence.** Run focused tests, `mise run gen`, and both owner stories. Capture trigger and popup in both themes, all option states, grouped rows, searchable state, chips/overflow/removal, invalid, and disabled.
- [x] **Step 6: Review and commit B4 independently.** Reviewer must explicitly reject new `Option` or `SelectPopup` exports and undocumented combobox behavior.

### Task B5: DateInput, Calendar/CalendarDay, and DatePicker aggregation

**Files:**

- Modify: `src/shared/components/date-input/{date-input.tsx,preset.ts,index.ts,DateInput.stories.tsx,DateInput.composition.test.tsx}`.
- Modify: `src/shared/components/calendar/{calendar.tsx,date-utils.ts,preset.ts,index.ts,Calendar.stories.tsx,Calendar.composition.test.tsx}`.
- Modify: `src/shared/components/date-picker/{date-picker.tsx,preset.ts,index.ts,DatePicker.stories.tsx,DatePicker.composition.test.tsx}`.

**Interfaces:** Calendar owns `oKLr9` Calendar Day as internal anatomy and supplies date-grid behavior to DatePicker. DatePicker composes DateInput plus Calendar; no separate public CalendarDay is introduced.

- [x] **Step 1: Enumerate `ivx6N`/`dW2kV` and `oKLr9`, `zh2sP`, `bpCbJ`/`qPx25`.** Record DateInput typed/pasted format behavior; Calendar’s selected/today/range/outside/unavailable day states; and DatePicker single/range/open/closed/invalid/disabled surfaces.
- [x] **Step 2: Write RED assertions.** DateInput associates expected-format hint and accepts typed/pasted input. Calendar has labelled grid, selected/disabled day announcements, Arrow day movement, PageUp/PageDown month movement, and navigation buttons with names. DatePicker opens on selected/current month, keeps value after close without selection, and supports single/range only if the public API proves both.
- [x] **Step 3: Run RED.** Run `bun test src/shared/components/date-input/DateInput.composition.test.tsx src/shared/components/calendar/Calendar.composition.test.tsx src/shared/components/date-picker/DatePicker.composition.test.tsx`; expect documented failures before correction.
- [x] **Step 4: Implement minimum documented behavior.** Use controlled/uncontrolled visual state only as needed. Past/unavailable days are disabled, never hidden. Do not add date parsing policy beyond the supplied format, locale/range business rules, time zones, persistence, or a public `CalendarDay` API.
- [x] **Step 5: GREEN and evidence.** Run focused tests and `mise run gen`; capture DateInput empty/filled/invalid, Calendar selected/today/range/unavailable/month navigation, and DatePicker closed/open/single/range in both themes.
- [x] **Step 6: Review and commit B5 independently.** Reviewer verifies `CalendarDay`/Calendar remain one owner and DatePicker remains its consumer.

### Task B6: PinInput, FileUpload, ColorPicker/Popup, Rating, and Editable

**Files:**

- Modify: `src/shared/components/pin-input/{pin-input.tsx,preset.ts,index.ts,PinInput.stories.tsx,PinInput.composition.test.tsx}`.
- Modify: `src/shared/components/file-upload/{file-upload.tsx,preset.ts,index.ts,FileUpload.stories.tsx,FileUpload.composition.test.tsx}`.
- Modify: `src/shared/components/color-picker/{color-picker.tsx,preset.ts,index.ts,ColorPicker.stories.tsx,ColorPicker.composition.test.tsx}`.
- Modify: `src/shared/components/rating/{rating.tsx,preset.ts,index.ts,Rating.stories.tsx,Rating.composition.test.tsx}`.
- Modify: `src/shared/components/editable/{editable.tsx,preset.ts,index.ts,Editable.stories.tsx,Editable.composition.test.tsx}`.

**Interfaces:** ColorPicker owns `vUOIa` Color Popup internally. FileUpload visualises externally supplied file/progress/error state only; Editable visualises externally supplied saving state only.

- [x] **Step 1: Enumerate the five owner contracts from `K8gNTw`, `pikCU`, `RLmkc`, `PxfEf`, and `RN3EO`.** Record every value/count/size/mode/state shown in the ledger before accepting existing props.
- [x] **Step 2: Write RED assertions.** PinInput advances, Backspace steps back, full-code paste fills cells, invalid clears/refocuses first cell, and exposes one code input/remaining characters where possible. FileUpload keyboard activates dropzone and announces externally supplied progress/error; no transport test. ColorPicker labels swatches, opens a keyboard-reachable palette, selects/announces value, and validates only on blur when a value-field API is proven. Rating exposes score/max, keyboard arrows when interactive, and read-only text semantics. Editable enters on keyboard, Enter confirms, Escape restores, has keyboard-reachable confirm/cancel, and preserves placement while external `saving` is true.
- [x] **Step 3: Run RED.** Run all five focused composition suites and verify the specific Pen assertion fails before implementation.
- [x] **Step 4: Implement only proved state presentation and native/ARIA semantics.** Do not add upload transport/retry, file parsing, clipboard access, arbitrary colour validation, server saving, or async workflow. Keep Color Popup private; do not export it.
- [x] **Step 5: GREEN and evidence.** Run focused tests and `mise run gen`. Capture every listed Pin/File/Color/Rating/Editable state in both themes, including FileUpload progress/error as externally provided specimens and disabled contrast as `DISABLED / REVIEW`.
- [x] **Step 6: Review and commit B6 independently.** Reviewer confirms `vUOIa` stays aggregated and no unavailable backend behavior was invented.

## Batch B final verification and evidence handoff

- [x] Confirm every required master has a source ID, documentation-frame ID, complete public-variant/state transcription, owner, focused RED/Green output, both-theme story, Pen/code capture, and disposition in `notes/batch-b-evidence.md`.
- [x] Run `mise run gen` and record its exact output.
- [x] Run every focused owner test named above, then `mise run check`; record exact output.
- [x] Run `mise run check:deps` only if exports/dependencies change, and `mise run build` for the final Batch B integration; record exact output.
- [x] Ensure no unresolved `FAIL`, `BLOCKED` (except the documented, unapproved B0 decision-only rows), Critical, or Important review finding remains. Preserve all aggregate decisions in the exported API surface.
