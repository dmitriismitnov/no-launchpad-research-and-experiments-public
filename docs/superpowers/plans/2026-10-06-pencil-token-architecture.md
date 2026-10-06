# Pencil Token Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Model the project’s layered token architecture in the isolated Pencil UI Kit document and migrate its existing components to the new semantic and scale variables.

**Architecture:** The Pen document will use namespaced primitive variables for palette, opacity, layout, shape and typography, while semantic variables are theme-aware aliases onto the primitive palette. Existing masters and their instances retain their ids and anatomy; their visual properties are updated in place to consume only the semantic/scaled layers.

**Tech Stack:** pen.dev CLI interactive shell; Pen `SetVariables`, `GetVariables`, `Get`, `Update`; Markdown evidence; read-only PandaCSS Foundation contracts.

**Spec:** `docs/superpowers/specs/2026-10-06-pencil-cli-ui-kit-design.md`; approved conversation design (2026-10-06).

## Global Constraints

- Modify only `outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen` and this experiment’s durable state.
- Treat `src/`, existing `.pen` files and icon assets as read-only contracts.
- Preserve existing reusable masters and instance IDs; update them rather than recreating them.
- Model the project’s layering logic, not its complete token catalogue.
- Primitive variables are theme-independent; `semantic.*` variables own light/dark mapping and reference primitives.
- Components use only `$semantic.*` colours and non-colour scale tokens.
- Verify the active target before mutation, then record `GetVariables`, structure, `ctx.problems`, screenshot and SHA-256 evidence.

## Review Focus

- Theme mapping: semantic variables must contain both light and dark values, not a hardcoded single colour.
- Dependency direction: primitive variables must not refer to semantic variables; semantic variables must refer to primitives.
- Migration completeness: no created master or Projects overview root retains the old `$action-*`, `$surface-*`, `$text-*` or `$border-*` aliases.
- Instance integrity: existing refs must still resolve after master updates.
- Layout safety: variable changes must not introduce clipping or collapsed bounds.

---

### Task 1: Record the token-architecture baseline and failing audit

**Files:**

- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/token-architecture-baseline.md`

**Interfaces:**

- Consumes: current target variables and masters `z6FBhy`, `ngKcI`, `COzjp`.
- Produces: documented pre-migration failure for namespaced variables and a known verification command.

- [ ] **Step 1: Write the failing audit contract**

Require `GetVariables()` to contain `palette.neutral.50`, `spacing.x4`, `fonts.body`, and `semantic.common.50.background`, and require no visual master property to use the old simplified aliases.

- [ ] **Step 2: Run the audit and verify it fails**

Run a read-only `pen interactive --in … --out …` session that prints variables and master trees. Expected: FAIL because namespaced variables are absent and existing nodes use simplified aliases.

- [ ] **Step 3: Commit baseline evidence**

```sh
git add docs/superpowers/plans/2026-10-06-pencil-token-architecture.md outputs/experiments/pencil-cli-ui-kit
git commit -m "docs: plan Pencil token architecture"
```

### Task 2: Install the layered variable set and migrate existing components

**Files:**

- Modify: `outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen`
- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`

**Interfaces:**

- Consumes: Task 1’s expected names; existing node/master IDs.
- Produces: namespaced Pen variables and migrated master/instance properties.

- [ ] **Step 1: Define the minimum faithful layers**

Use `SetVariables` to add: palette families/stops used by the UI; `opacity.*`; `spacing.x*`, `sizes.x*`, `radii.*`, `borderWidths.*`; `fonts.body`, `fontSizes.*`, `fontWeights.*`; and semantic aliases under `semantic.common`, `semantic.brand`, `semantic.negative` and `semantic.focus`. Give each semantic colour a `light` and `dark` value that references a primitive palette variable.

- [ ] **Step 2: Migrate in place**

Use `Update` only. Change the three masters, their showcase roots, the Foundation specimen and `Projects overview` so their fills/text/strokes use `$semantic.*`, while gaps/padding/radii use `$spacing.*` or `$radii.*`. Preserve master and ref ids.

- [ ] **Step 3: Run the token audit and verify it passes**

Run a read-only session that checks required variables, semantic theme mappings, master ids/refs and visitor `ctx.problems`. Expected: all required names exist, no old aliases remain on scanned created nodes, and no problem rows print.

- [ ] **Step 4: Capture updated evidence and commit**

Force the Foundation and Projects overview containers to re-render, capture focused screenshots, record SHA-256 and then:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "feat: layer Pencil token architecture"
```

### Task 3: Classify the migration and restore review readiness

**Files:**

- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/token-architecture.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/notes/results.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/roadmap.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`

**Interfaces:**

- Consumes: Task 2 audit and screenshot/hash output.
- Produces: human-review-ready evidence classification.

- [ ] **Step 1: Record PASS/INFO/HUMAN REVIEW findings**

Record variable names, primitive-to-semantic dependency direction, master migration coverage, mechanical layout result, screenshot paths and the final SHA-256. Keep visual quality as `HUMAN REVIEW`.

- [ ] **Step 2: Run final mechanical verification**

Run the Task 2 read-only audit again and `git status --short`. Expected: required token hierarchy and three masters print, no `problem` rows print, and no unexpected worktree changes remain.

- [ ] **Step 3: Commit documentation**

```sh
git add docs/superpowers/plans/2026-10-06-pencil-token-architecture.md outputs/experiments/pencil-cli-ui-kit
git commit -m "docs: audit Pencil token architecture"
```

## Self-review

- Spec coverage: Task 1 establishes reproducible baseline evidence; Task 2 owns the only Pen mutation and its immediate mechanical checks; Task 3 classifies findings and preserves the user’s GUI-review gate.
- Placeholder scan: no deferred implementation steps or unspecified verification commands remain.
- Interface consistency: Task 1 names the existing masters consumed by Task 2; Task 2 emits the variable/master audit consumed by Task 3.
- Review focus: each listed failure mode is checked by Task 2’s audit, with Task 3 repeating the complete audit before completion.
