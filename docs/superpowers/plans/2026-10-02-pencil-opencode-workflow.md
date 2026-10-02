# Pencil × OpenCode Workflow Experiment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and validate a project-local OpenCode skill that drives a Pencil MCP benchmark for the code-aware, Pen-first Create Project dashboard flow.

**Architecture:** The skill at `.opencode/skills/pencil-design-experiment/` orchestrates an evidence-first workflow and loads narrow references/templates only when needed. `outputs/experiments/pencil-opencode-workflow/` is durable state; the benchmark is a separate writable copy, while the existing Pen system and `src/` remain read-only references.

**Tech Stack:** OpenCode V2 project skills, Pencil MCP, Pen document, Markdown durable state, Bun/mise checks, existing React/PandaCSS contracts.

**Spec:** `docs/superpowers/specs/2026-10-02-pencil-opencode-workflow-design.md`

## Global Constraints

- Do not modify React/PandaCSS implementation, production behavior, foundation tokens, reusable masters, public components or icon set.
- Treat `/Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen` as read-only; only `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen` is writable.
- Reuse existing component refs, semantic tokens, theme contexts and canonical icon assets; do not create visual substitutes.
- Master, token, global canvas or any source-of-truth modification requires explicit user approval.
- Keep document roots clean; all new screen frames use `clip: true`.
- Before a Pencil mutation, load Pencil’s skill plus relevant schema, execute and design-system references.
- Reviewer subagents are read-only, narrowly prompted, cannot launch children, and have model/variant logged.
- Before a major phase, large result, subagent fan-out or Pencil mutation, update/check `roadmap.md`, `todo.md`, `log.md`; if the next atomic action cannot be safely completed, hand off and await Compact/new session.
- Run `mise run check` before each commit. Do not run `check:deps`: dependencies and exports do not change.
- Do not close the experiment, merge or push without explicit user direction.

## Review Focus

- The skill must reject a missing or non-isolated writable Pen target before any mutation.
- A checkpoint must record all three durable files and an exact next action, not only prose.
- A mechanically valid but visually weak composition is `HUMAN REVIEW`, not `PASS`.
- Contrast review uses nearest actual resolved fill, including `palette/*`, never only a semantic ancestor.
- Orchestrator verifies every subagent claim against an artifact before accepting it.

---

## File Structure

| Path                                                                         | Responsibility                                            |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- |
| `.opencode/skills/pencil-design-experiment/SKILL.md`                         | Entry workflow, gates, delegation and checkpoints.        |
| `.opencode/skills/pencil-design-experiment/references/*.md`                  | Contracts, rubric, Pencil protocol and handoff reference. |
| `.opencode/skills/pencil-design-experiment/templates/*.md`                   | Durable-state templates.                                  |
| `outputs/experiments/pencil-opencode-workflow/README.md`                     | Experiment question, scope, criteria and artifact map.    |
| `outputs/experiments/pencil-opencode-workflow/{roadmap,todo,log,history}.md` | Actual durable state and chronology.                      |
| `outputs/experiments/pencil-opencode-workflow/notes/*.md`                    | Brief, inventory, baseline, reviews and results.          |
| `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`  | Isolated writable benchmark.                              |
| `outputs/history.md`                                                         | Registry entry created when the experiment opens.         |

### Task 1: Open experiment with durable state

**Files:**

- Create: `outputs/experiments/pencil-opencode-workflow/{README,roadmap,todo,log,history}.md`
- Create: `outputs/experiments/pencil-opencode-workflow/notes/{design-brief,benchmark-protocol}.md`
- Modify: `outputs/history.md`

**Interfaces:** Consumes the approved spec. Produces the durable directory that every later task and the skill reads first.

- [ ] **Step 1: Create README and registry entry**

Write the hypothesis, Create Project scope, source/target boundaries, success and honest-failure criteria, and artifact map. Add an `active (2026-10-02)` entry to `outputs/history.md` linking to the README.

- [ ] **Step 2: Create precise initial durable state**

`roadmap.md` starts with `Bootstrap` (active), `Brief and plan`, `Design and verification`, and `Human review and retrospective`. `todo.md` has active `Inventory source contracts and create isolated Pen copy`; all later work is `planned`. `log.md` records source path, target path and the user-gate rule. `history.md` says no Pencil mutation has occurred.

- [ ] **Step 3: Create brief and protocol**

`design-brief.md` defines name, description, owner and due-date fields; required validation; cancel; submit; and success in Projects. `benchmark-protocol.md` defines Gates A–D, evidence for each gate, three read-only reviewer roles and human visual review.

- [ ] **Step 4: Verify state files**

Run:

```sh
for file in README.md roadmap.md todo.md log.md history.md; do
  test -s "outputs/experiments/pencil-opencode-workflow/$file"
done
grep -q "Create Project" outputs/experiments/pencil-opencode-workflow/notes/design-brief.md
grep -q "Gate D" outputs/experiments/pencil-opencode-workflow/notes/benchmark-protocol.md
```

Expected: every command exits `0`.

- [ ] **Step 5: Verify and commit**

Run `mise run check` (expected: all non-failing project checks). Then:

```sh
git add outputs/experiments/pencil-opencode-workflow outputs/history.md
git commit -m "docs: open Pencil OpenCode workflow experiment"
```

### Task 2: Create the reusable project-local skill

**Files:**

- Create: `.opencode/skills/pencil-design-experiment/SKILL.md`
- Create: `.opencode/skills/pencil-design-experiment/references/{design-system-contract,quality-rubric,pencil-mcp-protocol,handoff-protocol}.md`
- Create: `.opencode/skills/pencil-design-experiment/templates/{roadmap,todo,log}.md`

**Interfaces:** Consumes Task 1 state and existing code/Pen contracts. Produces discoverable skill ID `pencil-design-experiment`.

- [ ] **Step 1: Add entry point and hard stop**

Use:

```md
---
name: Pencil Design Experiment
description: Run a code-aware, evidence-first Pencil MCP experiment using the project's existing design system and durable workflow state.
---
```

Require reading current `roadmap.md`, `todo.md`, `log.md`, experiment README, relevant code contracts and Pencil skill before planning/mutation. Stop if no isolated target artifact exists.

- [ ] **Step 2: Add delegation and context contract**

Embed this rule verbatim:

```text
If the next action is a new phase, a large inspection, a subagent fan-out, or a Pencil mutation and the current context cannot safely complete it, update roadmap/todo/log, emit the handoff, and wait for the user to choose Compact or new session.
```

Allow only code-system audit, Pencil structural audit and visual review. Each requires narrow inputs, read-only access, model reference, evidence and orchestrator disposition.

- [ ] **Step 3: Write references and templates**

`design-system-contract.md` names source paths, ownership and no-source-edit rules. `quality-rubric.md` defines `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, nearest actual resolved fill logic and anti-slop questions. `pencil-mcp-protocol.md` requires read-before-mutate, `placeholder: true` while new root content is unfinished, `clip: true` for screens, immediate `ctx.problems` and screenshot checks, and direct updates instead of delete/recreate. `handoff-protocol.md` contains headings: `Objective`, `Completed`, `Active`, `Blockers`, `Evidence`, `Exact next action`, `Files`, `User decision required`.

- [ ] **Step 4: Run static skill-contract checks**

```sh
test -f .opencode/skills/pencil-design-experiment/SKILL.md
grep -q '^name: Pencil Design Experiment$' .opencode/skills/pencil-design-experiment/SKILL.md
for heading in Objective Completed Active Blockers Evidence "Exact next action" Files "User decision required"; do
  grep -q "$heading" .opencode/skills/pencil-design-experiment/references/handoff-protocol.md
done
grep -q 'nearest actual resolved fill' .opencode/skills/pencil-design-experiment/references/quality-rubric.md
```

Expected: every command exits `0`.

- [ ] **Step 5: Verify and commit**

Run `mise run check`, then:

```sh
git add .opencode/skills/pencil-design-experiment
git commit -m "feat: add Pencil design experiment skill"
```

### Task 3: Inventory contracts and create the isolated Pencil baseline

**Files:**

- Create: `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`
- Create: `outputs/experiments/pencil-opencode-workflow/notes/{code-system-inventory,pen-baseline}.md`
- Modify: `outputs/experiments/pencil-opencode-workflow/{roadmap,todo,log,history}.md`

**Interfaces:** Consumes Tasks 1–2. Produces writable target and verified component/token/icon/Pen baseline for Task 4.

- [ ] **Step 1: Run code-system audit subagent**

Give a read-only subagent only `src/shared/components/`, `src/shared/styles/foundation/`, `src/shared/components/icon/`, `.agents/project.md` and the design brief. Require a table of available components, public variants/states, token ownership, theme mechanism, icon keys and source paths. It must not design or edit.

- [ ] **Step 2: Verify and log audit evidence**

Orchestrator checks every component and icon assertion against repository files. Record accepted/rejected findings in `code-system-inventory.md`; log model/variant, role, input paths, evidence and disposition in `log.md`.

- [ ] **Step 3: Copy and inspect baseline without mutation**

```sh
cp /Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen \
  outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen
```

With Pencil MCP, print root frame names, reusable-master/ref counts, theme contexts and `ctx.problems` for the copy. Write raw facts and timestamp to `pen-baseline.md`; do not mutate the copy in this task.

- [ ] **Step 4: Structural reviewer and independent confirmation**

Launch the structural reviewer against copied file and baseline report. Require root structure, refs, variables, resolved-fill capability and clipping facts. Rerun every reported Pencil query before logging accepted/rejected findings.

- [ ] **Step 5: Update state, verify and commit**

Move baseline inventory to `verified`; set first design task `active`; update roadmap/history. Run `mise run check`, then:

```sh
git add outputs/experiments/pencil-opencode-workflow
git commit -m "docs: record Pencil workflow baseline"
```

### Task 4: Compose and verify Create Project

**Files:**

- Modify: `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`
- Create: `outputs/experiments/pencil-opencode-workflow/notes/{structural-audit,visual-review}.md`
- Modify: `outputs/experiments/pencil-opencode-workflow/{roadmap,todo,log,history}.md`

**Interfaces:** Consumes brief, inventory, baseline and skill. Produces benchmark flow and review evidence for human evaluation.

- [ ] **Step 1: Confirm Gate B**

Record allowed top-level experiment frame, target sizes/themes, atomic task and expected verification. If existing refs cannot support a needed element, or a new master/token/source change is required, stop and ask the user instead of designing a substitute.

- [ ] **Step 2: Build atomic sections only from existing system artifacts**

Create local screens/frames for:

1. Projects entry with Create Project trigger.
2. Empty/invalid form with all four fields and required validation.
3. Filled form with owner/due-date selection, primary submit and secondary cancel.
4. Success state with created project in Projects.

For each section, use `placeholder: true` during its construction; remove it when finished; use `clip: true` for screens; inspect `ctx.problems`, resolved refs/fills and a focused screenshot. Do not create a master, token, icon, arbitrary card wrapper or hardcoded substitute.

- [ ] **Step 3: Perform mechanical audit**

Create `structural-audit.md` with root frames, masters/refs, themes, clipping, nearest actual resolved text/icon/boundary pairs and contracts. Mark `PASS`, `FAIL`, `INFO` or `HUMAN REVIEW`; disabled specimens never count as enabled PASS. Correct confirmed failures only within local experiment frames and rerun their query.

- [ ] **Step 4: Perform independent visual review**

Give the visual reviewer focused screenshots and `quality-rubric.md`. Require findings on scan order, hierarchy, primary/secondary action, container purpose, density, restrained effects and system coherence. Validate each claim against screenshots; non-mechanical concerns remain `HUMAN REVIEW`.

- [ ] **Step 5: Execute mandatory new-session handoff test**

At a safe phase boundary, update `roadmap.md`, `todo.md`, `log.md` and emit the exact handoff template. Stop the session and ask the user to open a new one. The new session loads the skill, reads those files and completes the exact next action without re-running the full investigation. Record restoration quality and gaps.

- [ ] **Step 6: Verify and commit**

Run `mise run check`, then:

```sh
git add outputs/experiments/pencil-opencode-workflow
git commit -m "feat: compose Create Project Pencil benchmark"
```

### Task 5: Human review and retrospective

**Files:**

- Create: `outputs/experiments/pencil-opencode-workflow/notes/{review-report,results}.md`
- Modify: `.opencode/skills/pencil-design-experiment/{SKILL.md,references/*.md}`
- Modify: `outputs/experiments/pencil-opencode-workflow/{roadmap,todo,log,history}.md`

**Interfaces:** Consumes all evidence and user decision. Produces result, evidence-based skill changes and an active experiment; it never closes or merges autonomously.

- [ ] **Step 1: Present Gate D**

Show focused screenshots, structural and visual reports, status table, unresolved `HUMAN REVIEW` items and handoff result. Ask for exactly `accept`, `revise` or `reject`.

- [ ] **Step 2: Act only within decision and scope**

For `revise`, create one atomic task per accepted finding and return only to local Task 4 mutations. For `reject`, preserve artifacts and identify failed criterion. For `accept`, mark flow verified. Never modify code, source Pen, tokens or masters.

- [ ] **Step 3: Retrospective and proven skill update**

Write hypothesis, evidence for/against, Pencil MCP limits, handoff outcome, review findings, visual decision and next experiment to `results.md`. Change the skill only for a logged observation; cite that log entry from the changed reference.

- [ ] **Step 4: Verify final artifact set**

```sh
for file in README.md roadmap.md todo.md log.md history.md notes/design-brief.md \
  notes/benchmark-protocol.md notes/code-system-inventory.md notes/pen-baseline.md \
  notes/structural-audit.md notes/visual-review.md notes/review-report.md notes/results.md \
  artifacts/create-project.pen; do
  test -s "outputs/experiments/pencil-opencode-workflow/$file"
done
git diff --check
mise run check
```

Expected: every command exits `0`.

- [ ] **Step 5: Commit without closing**

```sh
git add .opencode/skills/pencil-design-experiment outputs/experiments/pencil-opencode-workflow
git commit -m "docs: record Pencil workflow experiment results"
```

Do not change `outputs/history.md` from `active` to `completed` unless the user explicitly closes the experiment.

## Plan Self-Review

### Spec coverage

- Scope, source boundaries and isolated target: Tasks 1 and 3.
- Project-local skill and compact references/templates: Task 2.
- Independent code/Pen/visual reviews: Tasks 3 and 4.
- Create Project flow with immediate verification: Task 4.
- Checkpoint and new-session recovery: Task 4, Step 5.
- Human control and evidence-based outcome: Task 5.

### Placeholder scan

No task delegates undefined work: every task names paths, states, commands and expected outcomes.

### Interface consistency

Task 1 supplies durable state; Task 2 supplies the skill; Task 3 supplies verified inventory/baseline; Task 4 supplies the benchmark evidence; Task 5 records the user decision and updates rules only from evidence.

### Review focus coverage

Source-target isolation is tested in Task 3; checkpoint completeness in Task 4 Step 5; status honesty and visual quality in Task 4 Steps 3–4; nearest actual fills in Task 4 Step 3; subagent evidence validation in Tasks 3–4.
