# B1 RED → GREEN evidence — Toggle / Toggle Group

## Focused composition (Bun)

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/toggle/Toggle.composition.test.tsx src/shared/components/toggle-group/ToggleGroup.composition.test.tsx` |
| RED exit | `1` |
| RED result | `10 fail` / `13 pass` (23 total), `43 expect() calls` |
| RED failures — Toggle | `names the icon-only form from aria-label and drops the label slot`, `rejects an icon-only toggle without a non-empty accessible label`, `keeps the button accessible name when the visible label is empty` |
| RED failures — ToggleGroup | `renders the exclusive projection as a radiogroup of radios`, `single mode renders only the first value of a malformed controlled array`, `single mode roves a single tab stop onto the selected enabled item`, `single mode falls back to the first enabled item when nothing is selected`, `renders icon-only options with their accessible names and no label slot`, `renders two, three and four exclusive segments`, `rejects an option without a label or accessible name` |
| GREEN command | same |
| GREEN exit | `0` |
| GREEN result | `23 pass` / `0 fail` (54 expect calls) |
| GREEN log | `composition-green.txt` |

The RED run also printed the old markup proving the gap: `role="group"` + `aria-pressed` with a `selectionMode="single"` attribute leaking to the DOM, empty `toggleGroup__label` spans for icon options, and a rendered (not rejected) unnamed toggle/option.

## Focused browser stories (Vitest + Playwright Chromium)

The story layer was proven test-first by temporarily reverting only the three implementation files (`toggle/toggle.tsx`, `toggle-group/toggle-group.tsx`, `toggle-group/preset.ts`) via `git stash push -- <paths>`, regenerating PandaCSS, and running the new stories against the old implementation.

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/toggle/Toggle.stories.tsx src/shared/components/toggle-group/ToggleGroup.stories.tsx` (implementation reverted) |
| RED exit | `1` |
| RED result | `2 failed` files, `10 failed \| 17 passed (27)` |
| RED failures | Toggle `Icon Only`, `Dark Icon Only`; ToggleGroup `Single Exclusive`, `Dark Single Exclusive`, `Single Keyboard`, `Single Disabled No Op`, `Icon Only`, `Dark Icon Only`, `Segment Counts`, `Dark Segment Counts` |
| RED log | `browser-story-red.txt` |
| GREEN command | same (implementation restored, `mise run gen`) |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `27 passed (27)` |
| GREEN log | `browser-story-green.txt` |

## Assertions added

**Toggle (composition + browser):** controlled and uncontrolled `aria-pressed`; disabled no-op (native `HTMLElement.click()` on a disabled button); native `Enter`/`Space` activation via `userEvent.keyboard`; icon-only accessible name from `aria-label` with no label slot; runtime rejection of an icon-only toggle without a non-empty name; both-theme base surface.

**ToggleGroup (composition + browser):** `single` exclusive projection is `role="radiogroup"` with `role="radio"` + `aria-checked`; exactly one checked item; malformed controlled multivalue (`["grid","list","board"]`) renders only the first; one roving tab stop (`tabindex="0"` on the selected/first-enabled item, `-1` elsewhere); `multiple` stays `role="group"` + `aria-pressed` with independent toggling; arrow keys move focus only and skip a disabled middle item; `Enter` selects the focused item; icon-only options expose `aria-label` names with no label slot; two/three/four exclusive segments; disabled group no-op; both themes.

## Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `10 fail` / `13 pass` |
| focused composition GREEN | `0` | `23 pass` / `0 fail` |
| focused browser RED | `1` | `10 failed \| 17 passed (27)` |
| focused browser GREEN | `0` | `27 passed (27)` |
| `mise run check` | `0` | unit `687 pass / 0 fail` (90 files); browser `73 passed` files, `422 passed`; `✓ icons up to date (38 icons)`, `✓ web fonts up to date (2 faces)` |
| `mise run check:deps` | `1` | one **pre-existing** finding: `Unlisted dependencies @pandacss/node src/shared/styles/panda-static-css.test.ts:6:53` (from Batch B0, confirmed at HEAD with the B1 diff stashed). The B1 finding (`ToggleGroupSelectionMode` unused export) was fixed. |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-RgfOP5jp.css 213.78 kB` |

Counts moved from the Batch B0 shipped baseline: unit `676 → 687` (`+11`), browser `408 → 422` (`+14`).
