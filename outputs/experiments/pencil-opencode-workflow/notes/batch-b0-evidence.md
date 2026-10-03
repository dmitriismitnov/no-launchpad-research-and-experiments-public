# Batch B0 evidence — public-variant enumeration correction (Button / Icon Button)

**Date:** 2026-10-03\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Artifact identity:** SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged after inspection; same identity as Batch A).\
**Base commit:** `970fb052ac2480f7add50ea01b9f12453a22bb3d` (`docs: add public-variant enumeration gate and B0 destructive slice`).\
**Method:** Pencil MCP `execute` (`Get` visitor + `GetVariables`, `Export`; no document mutation) plus code reads from `src/shared/**` and the generated `styled-system`. Status semantics follow the spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.

This ledger closes the Batch B0 gap for the destructive tone of `IcuBw` Button and `L72UAx` Icon Button, and records the full public-variant enumeration for the remaining axes.

## Source Pen node IDs

| Role | Node | Name |
| --- | --- | --- |
| Button master | `IcuBw` | Button (children `u38lw` Prefix, `VpW5X` Label, `i2ROq` Suffix) |
| Button documentation frame | `OaO6i` → `vW8MG` | 04 Components — Actions → Components — Actions — Button |
| Button public variants | `Z8OMS4` (`q1hwK0` label, `RrQJW` specimens, `zn9wJ` variant-names text) | Public variants |
| Button state contract | `xw0yy` (`h5QMsN` matrices; light `aE4P3`, dark `et9ni`) | State contract |
| Button anatomy/state spec | `pzvnT` → `utSXT` | `Button · anatomy: root / prefix / label / suffix / spinner · public: tone, size, width, icon placement` |
| Button shared rules | `OaO6i` → `A37eB` | disabled suppresses hover/active/focus-visible, loading preserves label width, focus-visible draws `semantic/focus/ring` outside |
| Icon Button master | `L72UAx` | Icon Button (child `Or7zW` Glyph) |
| Icon Button documentation frame | `OaO6i` → `L2cyL` | Components — Actions — Icon Button |
| Icon Button public variants | `nBBmj` (`QQ4iI` label, `V1BleN` specimens) | Public variants |
| Icon Button state contract | `nqoVi` (`upZl4` matrices, `TVJu8` spec) | State contract (`public: tone, size · always needs an accessible label / tooltip`) |
| Actions overview hierarchy | `OaO6i` → `F8chr` (`oZJic` destructive) | primary / secondary / ghost / destructive |
| State model | `YwxEo` | 03 Components — State model |

### Destructive specimens resolved (light / dark)

| State | Light ref | Dark ref | Resolved fill | Foreground |
| --- | --- | --- | --- | --- |
| default | `QwC5i` | `K8ISDu` | `#DC2626` | `#FFFFFF` |
| hover | `tdv5D` | `yX9Ot` | `#B91C1C` | `#FFFFFF` |
| active | `hQuLI` | `xL8aP` | `#B91C1C` | `#FFFFFF` |
| focus-visible | `XNBlA` | `dANt6` | `#DC2626` + ring `#16A34A` / width 2 | `#FFFFFF` |
| disabled | `Ag9jk` | `bNdqh` | `#F1F5F9` / `#1E293B` | `#94A3B8` / `#64748B` |
| loading | `chU7Q` | `bv3v1` | `#DC2626` | `#FFFFFF` |
| Icon Button destructive | `LVKWA` | — | `#DC2626` (40×40, 18px glyph) | `#FFFFFF` |

The Button public-variant tone row (`Zt6Sy`) also carries a `Destructive` ref (`JfZbv`, 126×40) and the variant-names text (`zn9wJ`) reads:

> `tone: primary · secondary · ghost · destructive        size: sm · md        width: hug · full        icon: none · prefix · suffix`

## Token mapping (no token added)

Every resolved Pen value matches an existing semantic role exactly; **no new token was added**.

| Pen role / resolved value | Existing semantic token | Light | Dark |
| --- | --- | --- | --- |
| `action/danger-bg` `#DC2626` | `semantic.action.danger.background` (red.600) | red.600 | red.600 |
| `action/danger-bg-hover` `#B91C1C` (hover + active) | `semantic.action.danger.hover` (red.700) | red.700 | red.700 |
| `action/danger-fg` `#FFFFFF` | `semantic.action.danger.foreground` | white | white |
| `action/disabled-bg` | `semantic.action.disabled.background` | neutral.100 `#F1F5F9` | neutral.800 `#1E293B` |
| `action/disabled-fg` | `semantic.action.disabled.foreground` | neutral.400 `#94A3B8` | neutral.500 `#64748B` |
| focus ring `#16A34A` / width 2 | `semantic.focus.ring` + `borderWidths.thick` (already on the base root) | green.600 | green.500 |

`semantic.action.danger.border` (`red.300` / `red.500`) is **not** used: the Pen destructive Button is a solid fill with no boundary (unlike `secondary`, which owns the functional border).

## Public-variant enumeration matrix

### `IcuBw` Button — owner `src/shared/components/button/`

| Axis | Pen documented values | Code | Disposition |
| --- | --- | --- | --- |
| tone | `primary · secondary · ghost · destructive` | `ButtonTone` + recipe now `primary · secondary · ghost · destructive` | **PASS** (destructive added this batch) |
| size | `sm · md` | recipe `sm` 32px / `md` 40px, matching Pen (`u7faAt` 56×32, `FOn6S` 87×40) | **PASS** |
| width | `hug · full` | `hug` = default `fit_content`; `full` = Pen ref `MboG8`/`GW4Jy` overriding `width: fill_container` inside the 280px column `K4pyRx`. The public Button has no `width` prop | **BLOCKED** (needs public `width: "hug" \| "full"` API) |
| icon | `none · prefix · suffix` | `prefixIcon` / `suffixIcon` props; Pen `S6Uov` (prefix) / `krnOl` (suffix) | **PASS** |
| state | `default · hover · active · focus-visible · disabled` | recipe `base` focus ring + tone `_hover`/`_active`/`_disabled`; asserted in stories | **PASS** |
| state | `loading` | Pen anatomy documents a `spinner` part and geometry-preserving loading; the code has neither a `loading` prop nor a `spinner` slot (only `root/prefixIcon/label/suffixIcon`) | **BLOCKED** (needs public `loading` + `spinner` API) |
| theme | `light · dark` via `data-theme` (system context, never a public variant) | semantic tokens switch inside the token; recipe never branches (`_light`/`_dark` test) | **PASS** |

### `L72UAx` Icon Button — owner `src/shared/components/button-icon/`

| Axis | Pen documented values | Code | Disposition |
| --- | --- | --- | --- |
| tone | `primary · secondary · ghost · destructive` (`o5B9Z`, `W5bH86`, `r1hay`, `LVKWA`) | `ButtonIconTone` + recipe now `primary · secondary · ghost · destructive` | **PASS** (destructive added this batch) |
| size | `sm · md` (`G9Lb2e` 32×32, `ib-primary` 40×40) | recipe `sm` `x16` / `md` `x20`, square; `md` glyph `x9` | **PASS** |
| state | `default · hover · active · focus-visible · disabled` | recipe focus ring + tone states; asserted in stories | **PASS** |
| state | `loading` (`R3LwyT`) | no `loading` prop | **BLOCKED** (same API gap as Button) |
| accessible label | mandatory, glyph decorative (`BAqGc`) | required `label` prop → `aria-label`; glyph `aria-hidden` | **PASS** |
| theme | light · dark via `data-theme` | semantic tokens only | **PASS** |

No new tokens are required for any `BLOCKED` row; each is an API-surface decision, not a source/asset gap.

## `alert-dialog` duplication — INFO

`src/shared/components/alert-dialog/preset.ts` (`confirm` slot, `destructive: true`) duplicates danger confirm styling locally: `semantic.negative.600.background` / `negative.600.text` with `opacity: 0.85` hover and `borderRadius: "sm"`. Pen's destructive action is `action/danger-bg` red.600 **both themes**, red.700 hover/active, foreground white, `radius/md`, with label/prefix/suffix slots. The two are **not** equivalent in dark theme (`negative.600` resolves to red.400 dark, the Pen role stays red.600), and the local confirm has different geometry and hover behaviour. Composing the public `Button tone="destructive"` would change behaviour/geometry, so it was **not** refactored. Recorded as **INFO**; any future refactor is a separate, clearly-scoped change.

## Tests-first proof (RED → GREEN)

Process: the focused tests were written before the recipe change and observed failing (nonzero exit); the smallest recipe/type change was then made and the same focused command observed passing. The browser proof repeated the same pattern by temporarily reverting only the four implementation files and regenerating CSS.

### Focused unit + composition (Bun)

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/button/Button.test.ts src/shared/components/button/Button.composition.test.tsx src/shared/components/button-icon/ButtonIcon.test.ts src/shared/components/button-icon/ButtonIcon.composition.test.tsx` |
| RED exit | `1` |
| RED result (verbatim excerpt) | `error: expect(received).toMatchObject(expected)` … `Matcher error: received value must be a non-null object` … `(fail) button recipe > matches the PEN destructive action contract` … `(fail) buttonIcon recipe > matches the Button destructive action contract` … `8 tests failed` … `43 pass` … `8 fail` |
| GREEN exit | `0` |
| GREEN result (verbatim excerpt) | `(pass) button recipe > matches the PEN destructive action contract` … `(pass) buttonIcon recipe > matches the Button destructive action contract` … `51 pass` … `0 fail` |

Failing assertions: both `declares public variants only` lists (destructive missing), both destructive recipe-contract tests (`variants.tone.destructive` undefined), both tone-foreground loops (`slotColours` / `iconColours` now include destructive), and both disabled-foreground loops.

### Focused browser stories (Vitest + Playwright Chromium)

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/button/Button.stories.tsx src/shared/components/button-icon/ButtonIcon.stories.tsx` (with only the recipe/type files reverted, then `mise run gen`) |
| RED exit | `1` |
| RED result (verbatim excerpt) | `expected 'rgba(0, 0, 0, 0)' to be 'rgb(220, 38, 38)'` … `expected 'rgb(15, 23, 42)' to be 'rgb(17, 34, 51)'` … `Test Files  2 failed (2)` … `Tests  8 failed \| 15 passed (23)` |
| GREEN exit | `0` |
| GREEN result (verbatim excerpt) | `Test Files  2 passed (2)` … `Tests  23 passed (23)` |

The four per-file story failures before the change were the light and dark destructive fill stories plus the light and dark slot-role probes; all pass after.

## Both-theme status

| Tone / state | Light | Dark | Evidence |
| --- | --- | --- | --- |
| destructive default | `rgb(220, 38, 38)` | `rgb(220, 38, 38)` | `DestructiveStates` / `DarkDestructiveStates` play assertions |
| destructive hover | `rgb(185, 28, 28)` | `rgb(185, 28, 28)` | same |
| destructive active | `rgb(185, 28, 28)` | `rgb(185, 28, 28)` | same |
| destructive disabled | `rgb(241, 245, 249)` | `rgb(30, 41, 59)` | same |
| destructive foreground (label + both icon slots) | tone role probe | tone role probe | `SlotColourRoles` / `DarkSlotColourRoles` (now include destructive) |
| Icon Button destructive | `rgb(220, 38, 38)` / hover / active / disabled | same | `ButtonIcon.stories` `DestructiveStates` / `DarkDestructiveStates` |

The focus-visible ring is inherited unchanged from the shared base (`semantic.focus.ring`, `borderWidths.thick`, offset 0) and is asserted by the pre-existing `shares one focus ring` recipe tests for every tone.

Pen reference exports (side-by-side source of truth) are in `outputs/experiments/pencil-opencode-workflow/artifacts/batch-b0/pen/`: `QwC5i`/`K8ISDu` default, `tdv5D`/`yX9Ot` hover, `hQuLI`/`xL8aP` active, `XNBlA`/`dANt6` focus-visible, `Ag9jk`/`bNdqh` disabled, `chU7Q`/`bv3v1` loading, `LVKWA` Icon Button destructive. Code-side both-theme proof is the computed-style story assertions above; no raster code capture was produced for this slice (**INFO** — no PNG side-by-side for the code side, unlike Batch A; the computed values are asserted in-browser).

## Command results

| Command | Exit | Result (verbatim excerpt / concise) |
| --- | --- | --- |
| `mise run gen` | `0` | `Successfully extracted css from 425 file(s)`; codegen + cssgen emitted `css`, `tokens`, `patterns`, `recipes`, `jsx` |
| focused unit/composition RED | `1` | `8 fail` / `43 pass` (4 files) |
| focused unit/composition GREEN | `0` | `51 pass` / `0 fail` (4 files) |
| focused browser RED | `1` | `2 failed` files, `8 failed \| 15 passed (23)` |
| focused browser GREEN | `0` | `2 passed` files, `23 passed (23)` |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `663 pass / 0 fail` (`89` files); browser `73 passed` files, `396 passed` tests |
| `mise run check:deps` | `0` | Knip, no findings |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-DoqbQpqn.css 212.97 kB` |

Unit count moved `659 → 663` (Batch A baseline → now): `+4` destructive recipe assertions. Browser count moved `392 → 396`: `+4` destructive story tests.

## Row disposition

| Row | Disposition |
| --- | --- |
| `IcuBw` tone `destructive` | **PASS** |
| `L72UAx` tone `destructive` | **PASS** |
| `IcuBw` size / icon placement / states (non-loading) / theme | **PASS** |
| `L72UAx` size / states (non-loading) / label / theme | **PASS** |
| `IcuBw` `width: full` | **BLOCKED** — public `width` API decision |
| `IcuBw` / `L72UAx` `loading` | **BLOCKED** — public `loading` + `spinner` API decision |
| `alert-dialog` danger confirm duplication | **INFO** — not a clean drop-in; left unchanged |
| Code-side raster side-by-side | **INFO** — computed-style proof instead |

## Unresolved concerns

- **`BLOCKED` — Button `width: full`.** Pen expresses it as a `width: fill_container` ref override (`MboG8`, `GW4Jy`) inside the 280px `K4pyRx` column. The public Button root is `inline-flex` with no width prop; a correct fix is a public `width: "hug" | "full"` variant, which is an API decision for the owning slice.
- **`BLOCKED` — Button / Icon Button `loading`.** Pen's anatomy spec `utSXT` names a `spinner` part and the shared rules require loading to preserve label width; the code exposes neither a `loading` prop nor a `spinner` slot. Adding both is a public API decision; the destructive recipe already paints the Pen loading fill (`danger.background`, red.600) if such a state is later exposed.
- **`INFO` — `alert-dialog`.** See above; its `negative.600` dark value diverges from Pen's theme-stable `action/danger`.
- **`INFO` — code-side raster capture.** Only Pen reference PNGs and in-browser computed-style assertions were produced for this slice; if the reviewer requires code PNG side-by-side for every state, Batch E should capture them.

No unresolved `FAIL` or new `BLOCKED` introduced by this slice beyond the two API decisions already named in the plan; no component outside `button/` and `button-icon/` was changed.
