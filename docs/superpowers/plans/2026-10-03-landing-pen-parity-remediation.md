# Landing Pen parity remediation — Implementation Plan

> **For agentic workers:** This plan is executed by the foreground orchestrator workflow: **DeepSeek v4.1 Flash builder → GPT-5.6 Terra reviewer**, maximum **two** builder/reviewer cycles. A GPT correction planner runs only after a Critical/Important review finding. Steps use checkbox syntax for tracking.

**Goal:** close the measured Landing↔Pen geometry divergences recorded as `BLOCKED` in Batch A, so the Landing matches `DsHK8` (desktop), `XiPDu` (tablet) and `T4klu9` (mobile) and `mise run test:visual` passes.

**Architecture:** Landing composes existing public components through app-local Panda CSS in `src/app/Landing.tsx`. All corrections stay in the app component: local layout tokens and literals only, no shared Button/Card recipe or public API change. `data-theme` remains the only light/dark axis.

**Tech Stack:** React, TypeScript, PandaCSS, Playwright visual tests, Pencil MCP (read-only), Bun/mise tasks.

**Spec:** `docs/superpowers/specs/2026-10-03-full-pen-component-migration-design.md` (Batch A blocker) and `docs/superpowers/plans/2026-10-03-full-pen-component-migration.md`.

## Global Constraints

- Do not mutate `ex_2.pen`; do not touch dashboards/screens, other components, icon architecture or dependencies.
- Do not change shared component public APIs or presets unless a Pen measurement proves it impossible locally; prefer Landing-local layout.
- Never edit `src/shared/styled-system/` manually; run `mise run gen` after Panda changes.
- Keep `data-theme` as the sole theme axis; use semantic/foundation tokens where the scale reaches, literals only where Pen exceeds the scale.
- Every correction is TDD: add a failing measurement assertion, observe RED, change the Landing layout, observe GREEN.
- Snapshots refresh only after fresh Pen export + current code capture prove the delta is fully explained; never self-baseline.
- Preserve `Landing.contract.test.ts`, `scripts/assert-landing-snug.ts`, and the untracked `outputs/shared/notes/*` files.

## Review Focus

- Feature paddingBlock/gap/visual height match 64/72/380 desktop, 48/32/300 tablet, 36/16/260 mobile.
- Desktop and tablet hero primary buttons are 48px, matching `bambL`/`L1Xf4m`; mobile stays 350×48 stacked with a 12px gap (`P6A8Xm`).
- No horizontal overflow and no clipped visual at any viewport/theme.
- Desktop keeps bullets + secondary action; tablet/mobile keep Tag/H2/P/Visual only.
- Visual pass must be achieved through source parity, not by refreshing snapshots to match current output.

---

### Task 1: Pen measurement audit and failing geometry tests

**Files:**

- Modify: `test/visual/landing-pen-evidence.ts` (only if fresh read-only query changes identity/values).
- Modify: `test/visual/landing-responsive.spec.ts`.
- Evidence: `outputs/experiments/pencil-opencode-workflow/notes/landing-parity-evidence.md`.

- [ ] Re-query `DsHK8`, `XiPDu`, `T4klu9` read-only; record frame dimensions, feature node bounds, hero action bounds, and confirm the absence of dark Landing frames.
- [ ] In `landing-responsive.spec.ts`, add focused assertions that currently fail:
  - `feature` (and `featureReversed`) computed `paddingBlock`: desktop 64, tablet 48, mobile 36.
  - `feature` computed `gap`: desktop 72, tablet 32, mobile 16.
  - `[data-slot="visual"]` height: desktop 380, tablet 300, mobile 260.
  - hero primary/secondary button height: desktop 48, tablet 48, mobile 48.
- [ ] Run the focused spec and confirm the failures are the measured Pen mismatches, then commit the tests/evidence.

### Task 2: Landing layout corrections

**Files:**

- Modify: `src/app/Landing.tsx`.

- [ ] Feature grid `paddingBlock: { base: "36px", md: "x24", xl: "x32" }` (36/48/64; mobile 36 exceeds the xN scale so it stays a literal Pen value).
- [ ] Feature grid `gap: { base: "x8", md: "x16", xl: "72px" }` (16/32/72; desktop 72 exceeds the scale so it stays a literal).
- [ ] Give the feature visual a Pen height: `height: { base: "260px", md: "300px", xl: "380px" }` on the visual slot/panel.
- [ ] Hero action button height `height: { base: "x24", md: "x24" }` so desktop/tablet are 48px (mobile stays 350×48, gap x6/12).
- [ ] Confirm desktop keeps bullets + secondary action and tablet/mobile keep none; no public API change.
- [ ] Run the focused spec to GREEN, then `mise run gen`.

### Task 3: Fresh Pen/code evidence and snapshot refresh

**Files:**

- Artifacts: `outputs/experiments/pencil-opencode-workflow/artifacts/landing-parity/{pen,code}/`.
- Snapshots: `test/visual/__snapshots__/landing-responsive.spec.ts-snapshots/*` and `landing.spec.ts-snapshots/landing-chromium-darwin.png`.
- Evidence: `outputs/experiments/pencil-opencode-workflow/notes/landing-parity-evidence.md`.

- [ ] Re-export `DsHK8`/`XiPDu`/`T4klu9` and capture current code light/dark desktop/tablet/mobile with the existing capture tooling; store under the durable evidence paths.
- [ ] Diff each section's measured geometry against Pen and confirm the only remaining deltas are the intended padding/gap/visual/hero corrections; record any residual as `HUMAN REVIEW` with numbers.
- [ ] Only then run `mise run test:visual:update` and `mise run test:visual`; commit the changed snapshot PNGs and evidence.
- [ ] If a delta is not explained by the intended corrections, stop and report `BLOCKED` with measurements; do not silently refresh.

### Task 4: Full verification

- [ ] `mise run gen`
- [ ] `mise run check`
- [ ] `mise run check:deps`
- [ ] `mise run build`
- [ ] `mise run test:visual`
- [ ] Confirm no unresolved `FAIL`/`BLOCKED`; update the migration evidence ledger with a Landing `PASS` row.

## Execution cycle

1. Orchestrator dispatches the foreground DeepSeek builder with this plan and waits.
2. Orchestrator dispatches the foreground GPT reviewer with the builder diff, tests, Pen exports and screenshots; waits.
3. Clean review → advance to Task 4 / done. Critical/Important → GPT correction planner, then **one** additional builder + reviewer pass.
4. Never more than two builder/reviewer cycles; remaining load-bearing findings are reported to the user as `BLOCKED`.

> Note: the GPT planner was unavailable (usage limit) when this plan was written, so the orchestrator authored it directly from measured evidence.
