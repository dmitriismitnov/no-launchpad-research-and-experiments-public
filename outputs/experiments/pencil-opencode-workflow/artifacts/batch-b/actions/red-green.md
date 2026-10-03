# B1 RED → GREEN evidence — Toggle / Toggle Group

Correction cycle 2/2 on base `42c0f864`. Scope: `Toggle` / `ToggleGroup` implementation, presets, stories and tests plus the Batch B evidence. No new component, no dependency or foundation change, no `panda.config.ts` change.

## Focused composition (Bun)

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/toggle/Toggle.composition.test.tsx src/shared/components/toggle-group/ToggleGroup.composition.test.tsx` |
| RED result | `9 fail` / `23 pass` (32 total), `65 expect() calls` |
| RED failures | Toggle — label-less reject without an icon, whitespace-only accessible name reject, whitespace-only label treated as icon-only; ToggleGroup — first valid supplied value, fallback to a disabled first option, tab stop independent of selection, first option + first-enabled tab stop with no supplied value, label-less reject without an icon, whitespace-only accessible name reject |
| GREEN result | `32 pass` / `0 fail`, `73 expect() calls` |

## Focused browser stories (Vitest + Playwright Chromium)

The story layer was proven test-first by reverting only the three implementation files (`toggle/toggle.tsx`, `toggle-group/toggle-group.tsx`, `toggle-group/preset.ts`) with `git stash push -- <paths>`, regenerating PandaCSS, and running the new stories against the previous implementation.

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/toggle/Toggle.stories.tsx src/shared/components/toggle-group/ToggleGroup.stories.tsx` (implementation reverted) |
| RED result | `1 failed \| 1 passed` files, `2 failed \| 33 passed (35)` |
| RED failures | `Disabled Selected Surface Light`, `Disabled Selected Surface Dark` (the disabled first option was not the effective selection, so no `aria-checked="true"` and no disabled surface) |
| GREEN result | `2 passed` files, `35 passed (35)` |

## Corrected behaviour under test

- **Effective single selection.** The effective value is the first supplied value that maps to an option; when none does, it is the first option, even a disabled one. Exactly one option carries `aria-checked="true"` whenever `options` is non-empty.
- **Roving tab stop.** The tab stop is the focused option when it is enabled, otherwise the first enabled option — independently of which option is selected.
- **Label-less contract.** A label-less `Toggle` and a label-less `ToggleGroup` option require an actual icon and a non-empty `aria-label`, enforced at compile time (required `icon: IconName`) and rejected at runtime. A whitespace-only label is treated as label-less; a whitespace-only accessible name is rejected.
- **Disabled selected segment.** A disabled selected single segment paints the disabled group surface (transparent background and border, disabled foreground, `not-allowed` cursor), never the raised selected surface. The `_disabled` condition inside the `pressed` variant is more specific than the plain pressed class, so it wins inside the same cascade layer.

## Browser assertions added (light + dark)

**Toggle:** real keyboard `Tab` focus asserts the focus-visible `outline-style: solid`, `outline-width: 2px` and `outline-color: rgb(34, 197, 94)`; disabled asserts `background-color`, foreground `color` and `cursor: not-allowed` (`rgb(241, 245, 249)` / `rgb(148, 163, 184)` light, `rgb(15, 23, 42)` / `rgb(71, 85, 105)` dark).

**ToggleGroup:** real keyboard `Tab` focus asserts the same focus-visible outline on the first enabled radio; the disabled selected segment asserts `aria-checked="true"`, transparent background/border, equal painting to a disabled unselected segment, disabled foreground and `not-allowed` cursor.

No hover or active claim is made: those states were not newly asserted in this cycle.

## Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `9 fail` / `23 pass` |
| focused composition GREEN | `0` | `32 pass` / `0 fail` |
| focused browser RED | `1` | `2 failed \| 33 passed (35)` |
| focused browser GREEN | `0` | `35 passed (35)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `696 pass / 0 fail` (90 files, `3787 expect() calls`); browser `430 passed` (73 files) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-3PnQWaRR.css 214.01 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the B1 cycle-1 baseline (`42c0f864`): unit `687 → 696` (`+9`), browser `422 → 430` (`+8`).

`mise run check:deps` was intentionally not run: it is out of scope for this correction, and the only known finding (`@pandacss/node` unlisted in the Batch B0 static-CSS test) is owned by the B0 slice.

## Evidence hygiene

The six raw log captures were removed. This document and `batch-b-evidence.md` carry the results; no evidence references a raw log file.
