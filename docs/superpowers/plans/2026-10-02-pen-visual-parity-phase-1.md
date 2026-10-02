# Pen visual parity — phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use the user-approved sequential builder → reviewer → planner workflow. Tasks use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align Button, ButtonIcon, Card and the responsive landing with their Pen source masters and frames.

**Architecture:** Pen is measured read-only and remains the visual authority. Panda recipes own reusable component parity; `Landing.tsx` owns screen composition and breakpoint layout. Tests first lock each corrected visual/API contract, then browser screenshots provide the acceptance evidence.

**Tech Stack:** React, TypeScript, PandaCSS, Bun, Vitest/Storybook browser tests, Playwright screenshots.

**Spec:** `docs/superpowers/specs/2026-10-02-pen-visual-parity-phase-1-design.md`

## Global Constraints

- Do not modify Pen files, dashboard screens, other component families, icon architecture or add dependencies.
- Keep `data-theme` as the light/dark axis; use semantic tokens and foundation scales.
- Never edit `src/shared/styled-system/` manually; run `mise run gen` after recipe/foundation changes.
- New or changed visual behaviour follows TDD: record a failing focused test before production code.
- Keep the existing public Card API; avoid public API changes for Button/ButtonIcon unless Pen parity cannot be expressed otherwise.

## Review Focus

- Light/dark resolves one component implementation, not theme-forked selectors.
- Button/ButtonIcon shared height, focus, disabled and icon alignment survive every documented tone.
- Card plain/compact keep media omission and footer semantics while reaching Pen geometry.
- Tablet/mobile landing has explicit Pen structure, not incidental auto-fit wrapping.
- Screenshot checks catch overflow/clipping and stale icon-font rendering.

---

### Task 1: Evidence inventory and visual regression harness

**Files:**

- Modify: relevant `*.stories.tsx` under Button, ButtonIcon and Card; `src/app/Landing.tsx` tests/stories if present.
- Create: focused screenshot/evidence notes under `outputs/experiments/design-system-to-code/notes/` only if required by existing convention.

- [ ] Read Pen masters `IcuBw`, `L72UAx`, `ziJHM`, `vTMbw`, `XqPjN` and landing frames `DsHK8`, `XiPDu`, `T4klu9` without mutation.
- [ ] Record a comparison table: dimensions, padding, radius, type, surface/boundary/shadow roles, states and breakpoint structure.
- [ ] Add failing Storybook/browser assertions for each proven discrepancy; do not write implementation yet.
- [ ] Run the focused stories and confirm failures represent the measured Pen mismatch.
- [ ] Commit the evidence/tests.

### Task 2: Button and ButtonIcon parity

**Files:**

- Modify: `src/shared/components/button/{preset.ts,Button.stories.tsx,Button.composition.test.tsx}`.
- Modify: `src/shared/components/button-icon/{preset.ts,ButtonIcon.stories.tsx,ButtonIcon.composition.test.tsx}`.
- Modify foundation files only if Task 1 proves a shared token is missing.

- [ ] Use Task 1 failing tests for Pen dimensions, padding, radius, label/icon geometry, tones and states.
- [ ] Apply the smallest Panda recipe/token changes to match documented Pen controls in light/dark.
- [ ] Verify Button/ButtonIcon alignment, focus-visible, hover/active and disabled in browser stories.
- [ ] Run focused unit/browser tests, then `mise run gen`.
- [ ] Commit the component parity change.

### Task 3: Card parity

**Files:**

- Modify: `src/shared/components/card/{preset.ts,card.tsx,Card.stories.tsx,Card.composition.test.tsx,Card.test.ts}` as proven necessary.
- Modify: shared foundation shape tokens only if the Pen radius requires it.

- [ ] Use Task 1 failing tests for default/plain/compact geometry and card anatomy.
- [ ] Align raised surface, boundary, shadow, media, density, typography, header/footer and radius through recipe slots.
- [ ] Preserve one Card API; explicitly test plain/compact media omission and footer semantics.
- [ ] Run focused tests and browser stories in light/dark; run `mise run gen`.
- [ ] Commit the Card parity change.

### Task 4: Landing responsive parity

**Files:**

- Modify: `src/app/Landing.tsx`, `src/app/App.tsx` only if theme/breakpoint verification needs a stable harness.
- Modify/Create: landing browser/screenshot tests following repository conventions.

- [ ] Start with failing desktop/tablet/mobile visual/structural tests from Task 1 evidence.
- [ ] Replace generic accidental reflow with explicit responsive composition only where Pen frames differ.
- [ ] Preserve composition through public Button, ButtonIcon, Card and navigation components; no substitutes.
- [ ] Verify both themes at desktop, tablet and mobile widths with no clipping/overflow.
- [ ] Commit the landing parity change.

### Task 5: Final visual acceptance

**Files:** no production changes unless a Task 2–4 regression is found.

- [ ] Capture side-by-side evidence for each target Pen master/frame and the final code render.
- [ ] Classify every result PASS, FAIL, INFO or HUMAN REVIEW; no unresolved visual FAIL is accepted.
- [ ] Run `mise run gen`, `mise run check`, `mise run check:deps` and `mise run build`.
- [ ] Commit evidence-only updates if created.

## Execution cycle

1. Orchestrator (`openai/gpt-5.6-terra`) dispatches a foreground builder (`deepseek/deepseek-flash`) for the next unresolved task and waits for completion.
2. Orchestrator dispatches a foreground reviewer (`openai/gpt-5.6-terra`) with the task diff and evidence and waits for completion.
3. If review is clean, advance to the next task or report completion.
4. If review has Critical/Important findings, dispatch a foreground planner (`openai/gpt-5.6-terra`) to create the smallest correction plan, then give that plan to the builder and repeat review.
5. Stop after three builder/reviewer/planner cycles; report any remaining load-bearing finding to the user.
