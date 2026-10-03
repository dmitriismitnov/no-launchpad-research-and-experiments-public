# B4 RED → GREEN evidence — Select combobox / MultiSelect (correction cycle 2/2)

Correction cycle 2/2 on base `4b690bb`. Scope: `select/select.tsx`, `Select.stories.tsx`, `MultiSelect.stories.tsx` and the Batch B evidence. No API, filtering, portal, icon, token, preset, generated-file, dependency, Pen or unrelated-component change.

The two corrections:

1. **Placement from the popup's real rendered height.** The old `measurePlacement` estimated the pane as `ordered.length * ROW_HEIGHT + 12` (capped) and therefore ignored the search row and group labels. It now measures `popupRef.getBoundingClientRect().height` in a `useLayoutEffect` after the popup commits, then flips above only when `spaceBelow < measured && spaceAbove > spaceBelow`.
2. **The search field owns its keys.** The search input now stops propagation for every key except `Escape`, so arrows, `Enter` and `Space` type in the field instead of moving or selecting a root option; `Escape` still bubbles to close the popup and refocus the trigger.

## Focused browser stories (Vitest + Playwright Chromium)

Command: `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/select/Select.stories.tsx src/shared/components/multi-select/MultiSelect.stories.tsx`

| Field | Value |
| --- | --- |
| RED exit | `1` |
| RED result | `1 failed \| 1 passed` files, `5 failed \| 53 passed (58)` |
| RED failures | Select — `Searchable Query Alpha Beta` (`toHaveValue("alpha beta")` received `"alpha"`), `Searchable Arrow Keys Stay Local` (active `Starter` → `Team` after `ArrowDown`), `Searchable Enter Stays Local` (`aria-expanded` `true` → `false`, option selected), `Searchable Grouped Popup Flips On Measured Height` (`data-placement` `top` → `bottom`), `Dark Searchable Grouped Popup Flips On Measured Height` (`data-placement` `top` → `bottom`) |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `58 passed (58)` |

The MultiSelect story file passed on the RED run (it has no root arrow/Enter handling to leak into), so its new stories are regression coverage; the five Select failures are the corrected behaviour.

## Placement measurement (rendered, not estimated)

`SearchableGroupedPopupFlipsOnMeasuredHeight` pins the trigger with `bottom: 60px` and uses one group with one option plus the search row. Instrumented at the assertion point:

| Quantity | Value |
| --- | --- |
| `spaceBelow` | `60px` (exact) |
| `spaceAbove` | `100px` (exact) |
| Measured popup height | `111.984375px` |
| Old row estimate | `1 × 36 + 12 = 48px` |

The old estimate (`48`) was below the `60px` gap, so the pane stayed `bottom`; the real height (`≈112`) exceeds the gap, so the corrected pane flips `top`.

The follow-up (`B4 final-review follow-up`, cycle 3/3) makes this deterministic and physical: the story frame is resized to exactly `triggerHeight + 160px` before opening, so `spaceBelow` and `spaceAbove` are the exact values above. Both themes now assert `renderedHeight > 60`, `spaceBelow === 60`, `spaceAbove === 100`, `data-placement="top"` **and** `popupRect.bottom <= triggerRect.top`, so the pane is physically above the trigger rather than only labelled. The placement effect reads the real resized `window.innerHeight`; the assertion does not mock a rect.

## Search-key isolation

| Key in the search field | Before | After |
| --- | --- | --- |
| Printable + `Space` | `Space` bubbled to the root and selected the active option, closing the popup (`"alpha beta"` truncated to `"alpha"`) | Stays in the field; query is `"alpha beta"`, popup stays open, trigger keeps its placeholder |
| `ArrowDown` / `ArrowUp` | Moved the root active option (`Starter` → `Team`) | Local to the field; active option unchanged |
| `Enter` | Selected the active option and closed | Local to the field; no selection, popup stays open |
| `Escape` | Closed and refocused (already correct) | Unchanged: bubbles, closes and refocuses the trigger |

## Both-theme invalid / disabled computed styles

| Contract | Light | Dark |
| --- | --- | --- |
| Select invalid trigger border | `Invalid Surface Light` → `rgb(220, 38, 38)` | `Invalid Surface Dark` → `rgb(248, 113, 113)` |
| Select disabled trigger surface / foreground / cursor | `Disabled Surface Light` → `rgb(241, 245, 249)` / `rgb(148, 163, 184)` / `not-allowed` | `Disabled Surface Dark` → `rgb(15, 23, 42)` / `rgb(71, 85, 105)` / `not-allowed` |
| MultiSelect invalid control border | `Invalid Surface Light` → `rgb(220, 38, 38)` | `Invalid Surface Dark` → `rgb(248, 113, 113)` |
| MultiSelect disabled control surface / cursor / toggle foreground | `Disabled Surface Light` → `rgb(241, 245, 249)` / `not-allowed` / `rgb(148, 163, 184)` | `Disabled Surface Dark` → `rgb(15, 23, 42)` / `not-allowed` / `rgb(71, 85, 105)` |

Disabled contrast remains `DISABLED / REVIEW` (computed style recorded, not accepted as a contrast `PASS`).

## Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused browser RED | `1` | `1 failed \| 1 passed` files, `5 failed \| 53 passed (58)` |
| focused browser GREEN | `0` | `2 passed` files, `58 passed (58)` |
| focused composition (Bun) | `0` | `30 pass` / `0 fail` (`87 expect() calls`) |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `738 pass / 0 fail` (90 files); browser `527 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-_kX2xiic.css 219.62 kB` |
| `git diff --check` | `0` | clean in the working tree; **stale as commit evidence** — the committed range `4b690bb..2fdf6e0` reported `new blank line at EOF` in `notes/batch-b-evidence.md`. Corrected in the final-review follow-up below. |

Counts moved from the cycle-1 baseline (`4b690bb`): browser `510 → 527` (`+17`); unit unchanged at `738`.

## Final-review follow-up (cycle 3/3) — exact and physical flip proof

**Base commit:** `2fdf6e0`. **Scope:** `Select.stories.tsx` and the B4 evidence artifacts; no runtime/API/Pen/token/dependency change.

The cycle-2 flip stories used inequalities (`spaceBelow <= 60`, `spaceAbove >= 100`) and, in the dark story, `data-placement` alone. The follow-up:

1. Resizes the real story frame to exactly `triggerHeight + 160px` before opening, so `spaceBelow = 60px` and `spaceAbove = 100px` are deterministic; the placement effect reads the real resized `window.innerHeight` (no mocked rect).
2. Asserts the exact values (`spaceBelow === 60`, `spaceAbove === 100`) plus `renderedPopupHeight > 60`.
3. Asserts physical geometry in both themes: `data-placement="top"` **and** `popupRect.bottom <= triggerRect.top`.

RED (legacy `48px` row estimate restored temporarily in `select.tsx`, then reverted byte-identically): both flip stories fail with `data-placement="bottom"` — `2 failed | 32 passed (34)`. GREEN with the measured runtime: `2 passed` files, `58 passed (58)`. The follow-up commit also removes the blank line at EOF so `git diff --check 2fdf6e0..<follow-up>` exits `0`; it changes no test count, so `mise run check` stays unit `738` / browser `527`.

## Changed paths

`src/shared/components/select/{select.tsx,Select.stories.tsx}`, `src/shared/components/multi-select/MultiSelect.stories.tsx`, this artifact and `notes/batch-b-evidence.md`. No `panda.config.ts`, token, icon, font, dependency, Pen or other component file was changed; generated `src/shared/styled-system/` stayed git-ignored and was only regenerated.

## No new API / policy

`SelectProps`, `SelectOption`, `SelectGroup`, `MultiSelectProps` and `MultiSelectOption` are unchanged; `Option`, `SelectPopup` and the popup remain private and portal-free; no filtering, virtualisation or other overlay policy was added.
