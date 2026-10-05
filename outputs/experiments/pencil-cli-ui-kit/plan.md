# Pencil CLI UI Kit Experiment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and evidence a clean Pencil UI Kit document entirely from CLI paths, then build a code-aligned foundation plus Button, ButtonIcon and Card masters.

**Architecture:** The experiment root is the durable source of truth. First create its project-standard contract and Pencil-specific state, then test both independent CLI routes: an agent prompt invocation and the native `pen interactive --out` headless shell. Only after the latter confirms `artifacts/pencil-cli-ui-kit.pen` as its active document may the headless MCP session create the UI Kit; every section immediately produces structure, problem and screenshot evidence.

**Tech Stack:** Bun; pen.dev CLI 0.3.10; Pencil interactive shell/MCP; Markdown durable state; existing React/PandaCSS contracts as read-only references.

**Spec:** `docs/superpowers/specs/2026-10-06-pencil-cli-ui-kit-design.md`

## Global Constraints

- Create no production React/PandaCSS code, generated output, font or icon artifact.
- Treat `src/`, existing `.pen` files and the icon set as read-only contracts.
- The sole writable Pen file is `outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen`.
- Test both `pen --out … --prompt …` and `pen interactive --out …` even if the first one succeeds.
- Do not use Pencil GUI to create or open the target; GUI is reserved for the user’s final visual review.
- Before every mutation, verify the active document is the target; never rely on MCP `filePath` to switch documents.
- Use foundation values and component anatomy from the code contracts; do not invent substitute assets or modify the code contracts.
- Record each command, output, evidence path, model/role and finding disposition in `log.md`.

## Review Focus

- CLI authentication can be active while the direct agent route still lacks a model credential; record the real command failure without substituting the GUI.
- A direct CLI output file can exist without the headless session owning it; `get_app_state()` must name the target before any mutation.
- Headless shell input can terminate before `save()`; verify a non-empty target file and a successful read-only reopen.
- New master/token creation is authorized only inside the clean target; inspect the root to rule out stray leaf nodes.
- A visual screenshot can omit fresh nested content due to render cache; touch the containing frame, then recapture and re-query before accepting it.

---

### Task 1: Bootstrap the durable experiment contract

**Files:**

- Create: `outputs/experiments/pencil-cli-ui-kit/README.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/plan.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/roadmap.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/log.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/history.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/design-brief.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/benchmark-protocol.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/cli-discovery.md`
- Modify: `outputs/history.md`

**Interfaces:**

- Consumes: the approved spec and `docs/superpowers/plans/2026-10-06-pencil-cli-ui-kit.md`.
- Produces: the active experiment root; all later tasks append evidence only beneath this root.

- [ ] **Step 1: Create the directory tree and copy the approved plan**

Run:

```sh
mkdir -p outputs/experiments/pencil-cli-ui-kit/{artifacts,notes/evidence}
cp docs/superpowers/plans/2026-10-06-pencil-cli-ui-kit.md \
  outputs/experiments/pencil-cli-ui-kit/plan.md
```

- [ ] **Step 2: Write the root contract and state files**

Write `README.md` with status `active (2026-10-06)`, the CLI-only hypothesis,
the two mandatory routes, scope, non-goals, writable-target path and acceptance
criteria from the spec. Write `history.md` with a dated active-start entry and
the rule that only the user closes the experiment. Instantiate `roadmap.md`,
`todo.md` and `log.md` from the project-local Pencil templates, replacing every
template marker with `Pencil CLI UI Kit`, the current date, exact target path and
the current operator model. Write `notes/design-brief.md` and
`notes/benchmark-protocol.md` from the approved spec; create
`notes/cli-discovery.md` with two empty evidence tables, one per mandatory route.

- [ ] **Step 3: Register the active experiment**

Add this first entry under `## Latest experiment` in `outputs/history.md`:

```markdown
[[experiments/pencil-cli-ui-kit/README]] — **active** (2026-10-06).
CLI-only Pencil experiment: verifies both direct `pen` output and headless
interactive-shell routes before creating a clean foundation, Button, ButtonIcon
and Card UI Kit. GUI is reserved for final human review.
```

- [ ] **Step 4: Verify the bootstrap contract**

Run:

```sh
test -f outputs/experiments/pencil-cli-ui-kit/README.md
test -f outputs/experiments/pencil-cli-ui-kit/plan.md
test -f outputs/experiments/pencil-cli-ui-kit/roadmap.md
test -f outputs/experiments/pencil-cli-ui-kit/todo.md
test -f outputs/experiments/pencil-cli-ui-kit/log.md
test -f outputs/experiments/pencil-cli-ui-kit/history.md
test -f outputs/experiments/pencil-cli-ui-kit/notes/design-brief.md
test -f outputs/experiments/pencil-cli-ui-kit/notes/benchmark-protocol.md
test -f outputs/experiments/pencil-cli-ui-kit/notes/cli-discovery.md
grep -F '[[experiments/pencil-cli-ui-kit/README]] — **active** (2026-10-06).' outputs/history.md
```

Expected: every `test` exits 0 and `grep` prints the registered entry.

- [ ] **Step 5: Record and commit the bootstrap**

Add the exact command results to `log.md`, mark the bootstrap task `verified` in
`todo.md`, then run:

```sh
git add outputs/experiments/pencil-cli-ui-kit outputs/history.md
git commit -m "docs: open Pencil CLI UI Kit experiment"
```

### Task 2: Test the direct pen.dev CLI creation route

**Files:**

- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/notes/cli-discovery.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stdout.log`
- Create: `outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stderr.log`
- Create: `outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli-usage.json`

**Interfaces:**

- Consumes: active experiment root and direct CLI binary `pen` version `0.3.10`.
- Produces: a classified `PASS`, `FAIL` or `BLOCKED` record for the direct route;
  it does not authorize headless mutations.

- [ ] **Step 1: Capture executable and authentication preconditions**

Run:

```sh
pen version | tee outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stdout.log
pen status >> outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stdout.log 2>&1
pen --list-models --agent codex >> outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stdout.log 2>&1
```

Record the exit codes and redact no output unless it contains a secret.

- [ ] **Step 2: Run the direct output command against the target**

Run exactly once, retaining output even when it fails:

```sh
pen --out outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen \
  --prompt 'Create a blank, clean UI Kit document. Do not import a library, image, asset, or existing design. Add no product screens.' \
  --agent codex \
  --usage outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli-usage.json \
  >outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stdout.log \
  2>outputs/experiments/pencil-cli-ui-kit/artifacts/direct-cli.stderr.log
```

- [ ] **Step 3: Verify the route result without opening Pencil GUI**

Run:

```sh
test -s outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen
shasum -a 256 outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen
```

If both commands exit 0, classify this route `PASS`; otherwise classify it
`FAIL` or `BLOCKED` using the exit code and saved stderr. In every case retain
the target only if it is a valid non-empty `.pen`; do not replace it manually.

- [ ] **Step 4: Record and commit the direct-route evidence**

Add the command, exit status, target-file result and evidence paths to
`cli-discovery.md` and `log.md`. Mark only this route’s task complete in
`todo.md`, then run:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "docs: record direct Pencil CLI route"
```

### Task 3: Test the interactive headless CLI route and establish target ownership

**Files:**

- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/notes/cli-discovery.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/artifacts/headless-session.log`
- Create: `outputs/experiments/pencil-cli-ui-kit/artifacts/headless-baseline.png`

**Interfaces:**

- Consumes: `pen interactive --out <path>`, which starts from an empty canvas
  when no `--in` value is supplied.
- Produces: the active target document, its baseline hash and Gate A evidence;
  subsequent Pencil changes may only use this session/target pair.

- [ ] **Step 1: Start the native headless shell using the exact target path**

Run:

```sh
pen interactive \
  --out outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen \
  --enable-preview \
  --preview-output outputs/experiments/pencil-cli-ui-kit/artifacts/headless-baseline.png
```

At the `pen >` prompt, issue these commands in order:

```text
read_skill()
read_skill({ path: "pen-schema.md" })
read_skill({ path: "execute.md" })
get_app_state()
save()
exit()
```

Capture the complete terminal transcript in `headless-session.log`. If the
direct route already produced a target, run this headless route with
`--in artifacts/pencil-cli-ui-kit.pen --out artifacts/pencil-cli-ui-kit.pen`
only after recording the pre-session SHA-256; otherwise use the empty-canvas
command above.

- [ ] **Step 2: Verify persistence and active-document identity**

Run:

```sh
test -s outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen
shasum -a 256 outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen
grep -F 'pencil-cli-ui-kit.pen' outputs/experiments/pencil-cli-ui-kit/artifacts/headless-session.log
```

Expected: a non-empty target, a SHA-256 digest, and a `get_app_state()` result
that identifies the target. If the active document differs, classify the task
`BLOCKED` and perform no mutations.

- [ ] **Step 3: Capture the no-mutation baseline**

From a new `pen interactive --in … --out …` session, call:

```text
get_app_state()
execute({ input: 'Get((n,c)=>{c.skipChildren();Print(n.id,n.name,n.type)})' })
execute({ input: 'Print(ctx.problems)' })
save()
exit()
```

Append this transcript to `headless-session.log`. Write the root-node list,
`ctx.problems`, active-document result and SHA-256 to `cli-discovery.md`.

- [ ] **Step 4: Record Gate A and commit**

Mark Gate A `verified` only when both CLI routes have a documented result and
the headless route owns the target. Otherwise mark the UI Kit tasks `blocked`.
Commit the evidence:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "docs: verify Pencil headless CLI route"
```

### Task 4: Build the foundation in the clean target

**Files:**

- Modify: `outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen`
- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/foundation.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/foundation.png`

**Interfaces:**

- Consumes: Gate A; `semanticColors`, `themeConditions`, `spacing`, `sizes`,
  `radii`, `borderWidths`, `fonts`, `fontSizes` and `fontWeights` exported by
  `src/shared/styles/foundation/index.ts`.
- Produces: named foundation variables and a themed Foundation frame used by
  each later master.

- [ ] **Step 1: Create an atomic foundation task and inspect the code contract**

Before opening the headless session, record `Foundation variables and specimen`
as the only active task in `todo.md`, with verification by `foundation.md` and
`foundation.png`. Read these contracts: `src/shared/styles/foundation/index.ts`,
`colors/semantic.ts`, `layout/spacing.ts`, `layout/sizes.ts`, `shape/radii.ts`,
`shape/border-widths.ts`, and `typography/index.ts`.

- [ ] **Step 2: Create code-aligned variables and the Foundation frame**

In `pen interactive --in artifacts/pencil-cli-ui-kit.pen --out artifacts/pencil-cli-ui-kit.pen`, re-run `read_skill()`, `pen-schema.md`, `execute.md` and
`get_app_state()`. Confirm the active target, then use the documented schema to
create semantic light/dark colour variables, spacing/sizing, radii, border,
shadow, typography and focus roles. Create one top-level `Foundation` frame
with `clip: true`, grouped token swatches and light/dark themed previews. Keep
all leaf nodes inside this frame, then run `save()`.

- [ ] **Step 3: Verify foundation evidence**

In the same session, run a focused `Get` for the `Foundation` frame, print
`ctx.problems`, take a screenshot, and save it as
`notes/evidence/foundation.png`. If nested content is absent from the capture,
touch the Foundation frame with a reversible `gap` update, re-read it and
recapture. Write the exact node ids, resolved fills, `ctx.problems` result and
screenshot path to `foundation.md`.

- [ ] **Step 4: Commit the verified foundation**

Mark the foundation task `verified` only when the target is active, the root has
no stray leaves, `ctx.problems` is empty and the screenshot exists. Then run:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "feat: add Pencil UI Kit foundation"
```

### Task 5: Build and verify Button, ButtonIcon and Card masters

**Files:**

- Modify: `outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen`
- Modify: `outputs/experiments/pencil-cli-ui-kit/todo.md`
- Modify: `outputs/experiments/pencil-cli-ui-kit/log.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/button.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/button.png`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/button-icon.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/button-icon.png`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/card.md`
- Create: `outputs/experiments/pencil-cli-ui-kit/notes/evidence/card.png`

**Interfaces:**

- Consumes: verified Foundation frame and `src/shared/components/button/preset.ts`,
  `src/shared/components/button-icon/preset.ts`, `src/shared/components/card/preset.ts`.
- Produces: three reusable masters plus focused evidence; no product screen or
  fourth component is created.

- [ ] **Step 1: Create and verify Button as one atomic task**

Set `Button master and showcase` active in `todo.md`; read the Button recipe.
In a target-confirmed headless session create a reusable `Button` master with
`root`, `prefixIcon`, `label`, `suffixIcon` and spinner anatomy. Document
primary, secondary, ghost and destructive tones; `sm` and `md` sizing;
enabled, hover, active, disabled, loading and focus-visible specimens in a
clipped showcase frame. Use semantic action/focus roles and canonical icon SVG
assets only. Query the master and showcase, print `ctx.problems`, touch the
showcase before capture if needed, save `button.png`, document resolved fills
and node ids in `button.md`, then save and commit:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "feat: add Pencil Button master"
```

- [ ] **Step 2: Create and verify ButtonIcon as one atomic task**

Set `ButtonIcon master and showcase` active in `todo.md`; read the ButtonIcon
recipe. In a target-confirmed headless session create a reusable `ButtonIcon`
master with `root` and `icon` anatomy, square `sm`/`md` geometry, primary /
secondary / ghost / destructive tones and enabled / hover / active / disabled /
loading / focus-visible specimens. Use the same semantic action and focus roles
as Button. Query, print `ctx.problems`, touch before capture if needed, save
`button-icon.png`, write node ids and resolved fills to `button-icon.md`, then
save and commit:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "feat: add Pencil ButtonIcon master"
```

- [ ] **Step 3: Create and verify Card as one atomic task**

Set `Card master and showcase` active in `todo.md`; read the Card recipe. In a
target-confirmed headless session create a reusable `Card` master with
`root`, `media`, `body`, `header`, `title`, `description`, `footer`,
`footerPrimary`, `footerSecondary` and `actionButton` anatomy. Document default,
plain and compact variants; raised surface, subtle boundary, rounded clipped
media, semantic text hierarchy and focus-visible ring. Query, print
`ctx.problems`, touch before capture if needed, save `card.png`, write node ids
and resolved fills to `card.md`, then save and commit:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "feat: add Pencil Card master"
```

- [ ] **Step 4: Run the final evidence audit**

Open the target through `pen interactive --in … --out …`; use `get_app_state()`,
a top-level `Get` scan, reusable-master `Get` scan and `Print(ctx.problems)`.
Record actual root nodes, the three master names, screenshot paths, SHA-256 and
the classification of every finding in `notes/results.md`. Mark findings only
as `PASS`, `FAIL`, `INFO` or `HUMAN REVIEW`; do not mark the experiment closed.

- [ ] **Step 5: Commit the final pre-review state**

Run:

```sh
git add outputs/experiments/pencil-cli-ui-kit
git commit -m "docs: record Pencil UI Kit evidence"
```
