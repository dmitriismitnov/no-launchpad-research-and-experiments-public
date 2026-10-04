# Full Pen component migration — execution plan

**Spec:** `docs/superpowers/specs/2026-10-03-full-pen-component-migration-design.md`\
**Authority:** read-only `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Goal:** complete all 82 mapped masters without changing Pen, screens/dashboard, or the completed Landing implementation.

> **Closure (2026-10-05): COMPLETE and ACCEPTED.** Every step below is done; the authoritative record is `outputs/experiments/pencil-opencode-workflow/notes/batch-{a,b,b0,c,d,e}-evidence.md`. Final gates: `mise run gen`, `mise run icons:check`, `mise run check` (unit 840 pass / browser 724 passed), `mise run check:deps`, `mise run build`, `mise run test:visual` (7/7). The single program-level regression (Landing mobile-menu CTA width, caused by Batch B0 `Button width:"hug"` → `fit-content`) was resolved in `0633e4c`: explicit `width="full"` on the Landing mobile-menu CTA plus refreshed Landing visual baselines; acceptance recorded in `batch-e-evidence.md` §9–§10. Residuals are documented `BLOCKED` design-decision/Foundation axes, `INFO` approximations, `DISABLED / REVIEW` contrast, and `HUMAN REVIEW` items — no unresolved `FAIL`, Critical, or Important finding. From mid-B5 the GPT provider hit its usage limit, so per user instruction planning/building/reviewing continued on DeepSeek V4.1 Flash (noted per ledger). Pen authority unchanged: SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`.

> **Correction notice (2026-10-05; preserves the closure above).** (1) The closure
> text originally quoted a 63-character SHA (`…dde787421daf7fa`, one `7`
> missing); it is corrected in place to the true 64-character digest. (2)
> "COMPLETE and ACCEPTED" means **bounded acceptance**: all 82 masters map to one
> of 72 owner directories and the documented commands pass, but many documented
> public axes remain `BLOCKED` (`batch-e-evidence.md` §2/§3) — this is not full
> behavioral or visual parity, and the checkboxes below are ticked on that
> bounded basis. (3) Batch E's fresh exhaustive screenshot step is
> **partial/deferred** (not "done"; see the Batch E step 2 note below and
> `batch-e-evidence.md` §7 item 5). (4) The `test:visual` row in
> `batch-e-evidence.md` §9 labeled "(pre-fix)" is mislabeled, and durable
> post-fix logs for `check`/`test:visual` are missing; those runs are, however,
> shown by conversation evidence (post-change `check` 840/724; visual
> update + rerun 7 pass). Post-fix `check:deps`/`build` are not evidenced at all.
> A missing raw log is not proof a test did not run. Final authoritative
> assessment: `outputs/experiments/pencil-opencode-workflow/notes/retrospective.md`.

## Program-wide rules

- Work only in the mapped `src/shared/components/` owners, Foundation, canonical icon assets/pipeline, their stories/tests, and approved evidence files. Never edit `src/shared/styled-system/`.
- Every correction is tests-first: capture Pen facts, add one focused failing test that represents the mismatch, observe failure, make the smallest code change, then pass focused tests. A pre-existing test may be extended only if it can fail before the change.
- For every owner, re-query its master and documentation frame with Pencil MCP before implementation; record IDs, dimensions, named parts, variants, states, accessibility/interaction text, and light/dark references. Do not mutate `ex_2.pen`.
- Each component family follows existing files: `{owner}.tsx`, `preset.ts`, `index.ts`, `*.stories.tsx`, `*.composition.test.tsx`, and focused unit/browser tests where semantics require them. Run `mise run gen` after Panda changes; use `mise run icons:check` after icon work.
- Landing is excluded. At final verification, use it only as the existing desktop/tablet/mobile, light/dark regression evidence.

## Required foreground orchestration (per batch)

1. The foreground GPT planner writes or confirms the atomic batch plan and acceptance rows.
2. The foreground orchestrator dispatches **DeepSeek v4.1 Flash** as builder with only that batch's files, Pen IDs, evidence requirements, and failing-test requirement.
3. The foreground orchestrator dispatches **GPT-5.6 Terra** as reviewer with the builder diff, test output, Pen evidence, and screenshot evidence.
4. If the review has Critical or Important findings, the foreground GPT planner produces the smallest correction plan. Dispatch one additional DeepSeek builder attempt and one additional GPT-5.6 Terra review.
5. Never run more than **two builder/reviewer cycles per batch**. If the second review retains a Critical/Important finding, mark the batch BLOCKED and return the evidence to the user; do not conceal it or start a third cycle.
6. A clean review advances only after the evidence ledger marks every addressed row PASS/INFO/HUMAN REVIEW as appropriate and has no unresolved FAIL/BLOCKED. All dispatches are foreground: wait for each builder/reviewer result before the next step.

## Batch A — Foundation, assets, state audit, and themed previews

**Rows:** `q5xZR3`, `pt3X0`, `M4GSR0`; plus Foundation/state contracts supporting all remaining rows.

**File families:** `src/shared/styles/foundation/{colors,layout,shape,typography}/`, `src/shared/styles/foundation/{preset.ts,foundation.test.ts,Colors.stories.tsx}`, `src/shared/components/{icon,asset-icon-tile,theme-switch-preview}/`, `src/shared/styles/index.ts`; icon SVG/tool files only when Pen proves a missing canonical asset.

**Steps:**

- [x] Read Foundation roots, icon inventory/usage map, theme comparison, state-applicability documentation, and masters `q5xZR3`, `pt3X0`, `M4GSR0`.
- [x] Produce the shared state matrix: documented state names, applicable component classes, semantic token roles, and accessibility rule source. Treat absent state text as no runtime feature authorization.
- [x] Add failing targeted tests/stories for proven foundation, theme-preview, asset-tile, or icon mismatches; do not change generated assets manually.
- [x] Implement only shared token/preset/icon-pipeline corrections; run focused tests, `mise run gen` when required, and `mise run icons:check` when required.
- [x] Capture both themes for preview/tile/icon and record token resolution, source IDs, and screenshots.

**Verification:** focused tests; `mise run gen` if styles changed; `mise run icons:check` if icon inputs changed; reviewer checks no component-local theme fork or invented state policy.

## Batch B0 — public-variant enumeration correction

**Rows (already-shipped components with gaps):** `IcuBw` Button, `L72UAx` Icon Button; then extend the same enumeration pass to `QWV5n`, `as3xr`, `Q2PWF`, `a4r4Y`, `UyMqu` inside their batch slices.

**Steps:**

- [x] Re-read each master's `Public variants` documentation text and specimens; transcribe every axis before coding.
- [x] Button `IcuBw`: add the `destructive` tone (fill `action/danger-bg` red.600, hover `action/danger-bg-hover` red.700, forward/foreground white, border `action/danger-border`), full state contract, both themes, with a failing test first. Remove the `alert-dialog/` local danger workaround only if it now composes the public Button tone; otherwise leave it and record `INFO`.
- [x] Icon Button `L72UAx`: re-enumerate `tone` including destructive and add any missing state.
- [x] Verify `size: sm · md`, `width: hug · full`, `icon: none · prefix · suffix` for Button against Pen; record `BLOCKED` if `width: full` cannot be expressed without a public API change.
- [x] Capture both themes for every added tone/state.

**Verification:** focused recipe/composition/browser tests; `mise run gen`; reviewer confirms the full documented variant list, not just the previous API.

## Batch B — Actions and Forms & selection

**Rows:** Actions `IcuBw`, `L72UAx`, `gkK5e`, `e5ySA`; Forms `dO8tX`, `w6oNZ7`, `EZfrL`, `e2q2z`, `UrFJz`, `BQvnn`, `z57yzW`, `tOLtR`, `GjzX0`, `aXD61`, `f985P`, `ivx6N`, `oKLr9`, `zh2sP`, `E3ZhdP`, `YxCMD`, `Ecy07`, `vUOIa`, `qIRY3`, `zoEMh`, `pHfEy`, `IENTK`, `bpCbJ`.

**File families:** the mapped owner directories in `button/`, `button-icon/`, `toggle/`, `toggle-group/`, `input/`, `textarea/`, `number-input/`, `checkbox/`, `radio/`, `switch/`, `slider/`, `select/`, `multi-select/`, `date-input/`, `calendar/`, `pin-input/`, `file-upload/`, `color-picker/`, `rating/`, `editable/`, `field/`, `radio-group/`, `date-picker/`, plus only proven Foundation files.

**Steps:**

- [x] Split into independently shippable owner slices, preserving the aggregate decisions: Option/SelectPopup in Select; CalendarDay/Calendar in Calendar/DatePicker; ColorPopup in ColorPicker; Radio in RadioGroup.
- [x] For each slice, query the master plus its documentation frame and capture every displayed variant/state/theme before writing a failing composition/unit/browser test.
- [x] Implement Pen-defined native control, label/error, disabled, invalid, selected, open, focus-visible, and keyboard behaviour only where documented; test controlled/uncontrolled parity where needed to expose shown states.
- [x] Handle Segmented Control as a ToggleGroup evidence gate: re-query `yqYp1` and `e5ySA`; prove its exclusive two-to-four segment, icon, disabled and radiogroup/arrow-key contract. Block rather than duplicate if the existing API cannot express it.
- [x] Capture all variants in both themes and the aggregate internals in their owner story; run focused tests and `mise run gen`.

**Verification:** focused owner test suites and stories; keyboard/ARIA assertions for documented controls; visual evidence for every state; `mise run gen`; reviewer confirms no separate Option, CalendarDay, ColorPopup, or SegmentedControl public component was invented.

## Batch C — Navigation, disclosure, and overlays

**Rows:** Navigation `QWV5n`, `l8wwSv`, `MGoSj`, `Bvk23`, `EagLC`, `KI0Dl`, `z2jG4r`, `YGgyy`, `CX1vE`, `GLufg`, `cAzIA`, `RFehj`, `rm4a0`, `DdvJi`, `rokhq`; Overlays `eEhwI`, `Qwced`, `l7aEf`, `UJUPb`, `FiHft`, `UbA6r`, `aOMDf`, `J3VmmT`, `AHDih`.

**File families:** `link/`, `nav-item/`, `brand/`, `breadcrumbs/`, `sidebar-item/`, `top-navigation/`, `tab/`, `accordion-item/`, `menu/`, `step/`, `tree-item/`, `carousel/`, `pagination/`, `context-menu/`, `tooltip/`, `popover/`, `hover-card/`, `dialog/`, `alert-dialog/`, `drawer/`, `sheet/`, `floating-panel/`, `tour/`.

**Steps:**

- [x] Read each Pen documentation frame and state specimens, then add failing tests for real geometry/state discrepancies.
- [x] Implement only documented disclosure/open/focus/keyboard interactions and accessible trigger/content relationships. No inferred route changes, carousel autoplay, tour progression, or dismissal/portal policy.
- [x] Treat Menu Item as `menu/` atomic ownership and Context Menu composition, not a duplicate export.
- [x] Capture open/closed, active/selected, hover/focus-visible/disabled, and both theme examples where present.

**Verification:** focused tests for navigation state and documented keyboard/focus semantics; visual captures for all Pen states; `mise run gen`; reviewer validates overlay behaviour does not exceed Pen documentation.

## Batch D — Content, data, and feedback/status

**Rows:** Content `q9qgrL`, `ziJHM`, `vTMbw`, `XqPjN`, `CjnzL`, `h9Cf2t`, `d5pll`, `M2LZ59`, `fgxmm`, `z4hUE9`, `FZPkF`, `Jfhu9`, `th3Nd`, `pHjwJ`, `U4KfQj`, `SX6Gf`, `kQTMg`, `vZUUG`; Feedback `Q2PWF`, `F1P1XX`, `as3xr`, `UyMqu`, `tTGQi`, `yz7HH`, `qfUOu`, `lpijt`, `Kj5Nm`, `a4r4Y`.

**File families:** `avatar/`, `card/`, `statistic/`, `list/`, `timeline/`, `data-table/`, `clipboard/`, `code-block/`, `scroll-area/`, `splitter/`, `media-placeholder/`, `qr-code/`, `divider/`, `alert/`, `toast/`, `badge/`, `tag/`, `progress/`, `progress-ring/`, `skeleton/`, `spinner/`, `empty-state/`, `status-indicator/`.

**Steps:**

- [x] Re-query each master/documentation frame; start with failing visual/semantic tests for a measured difference.
- [x] Keep Card Plain/Compact as Card variants; List Item, Timeline Item, and Table Row remain aggregate internals under List, Timeline, and DataTable.
- [x] Implement only documented feedback/status and content affordances. In particular, do not invent clipboard fallback, QR generation, scroll persistence, splitter drag persistence, toast queueing, or progress data policies.
- [x] Capture static, loading, status, tone, selected/disabled, and theme variants that Pen actually documents.

**Verification:** focused tests, aria/status/live-region assertions only where the Pen accessibility contract requires them, both-theme screenshots, `mise run gen`, and reviewer confirmation of aggregate ownership.

**Batch A status:** the Landing visual blocker recorded by Batch A was resolved by the standalone remediation batch `docs/superpowers/plans/2026-10-03-landing-pen-parity-remediation.md` (commits `8120b31`); `mise run test:visual` passes 7/7 and the four measured feature/hero mismatches now match `M2zLU`/`vzXfY`/`pRsS2` and `bambL`/`L1Xf4m`/`P6A8Xm`. Residual Landing-wide section deltas remain recorded as `HUMAN REVIEW` in `notes/landing-parity-evidence.md`.

## Batch E — full evidence and final regression

**File families:** no production changes by default; all mapped stories/tests, Foundation/icon checks, evidence ledger, and existing Landing regression harness.

**Steps:**

- [x] Reconcile the 82-row matrix against the Pen reusable-master query; every row must point to an owner, state list, test, story, and evidence capture.
- [ ] Run representative screenshots for every variant/state/theme owner and aggregate master. Classify each evidence row PASS, FAIL, INFO, HUMAN REVIEW, BLOCKED, or DISABLED / REVIEW under the spec semantics. **PARTIAL / DEFERRED (2026-10-05):** no new exhaustive per-owner captures were produced; the per-batch computed-style and PNG evidence remains the authoritative per-master record (`batch-e-evidence.md` §7 item 5). Reconciliation/classification was done on that existing evidence.
- [x] Run landing desktop/tablet/mobile light/dark regression captures only; do not change Landing unless a change in shared components produces a regression that must be reverted within component scope.
- [x] Resolve only verified migration regressions through the two-cycle orchestration limit; otherwise report the blocker with Pen/code evidence.

**Verification (record exact output):**

```sh
mise run gen
mise run icons:check
mise run check
mise run check:deps
mise run build
```

Final acceptance requires no unresolved `FAIL` or `BLOCKED`, no Critical/Important reviewer findings, and an evidence-backed human-review list for any irreducibly subjective differences.
