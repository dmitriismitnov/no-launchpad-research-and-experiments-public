# Roadmap: Pencil × OpenCode workflow

**Status:** active (2026-10-02).

Current checkpoint position: **Bootstrap — active**. Durable state was opened;
no isolated Pen copy and no Pencil mutation exist yet.

## Phases

| Phase                            | Status | Goal                                                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| Bootstrap                        | active | Open durable state and registry entry; define brief and benchmark protocol.           |
| Brief and plan                   | planned | Inventory code/Pen contracts, confirm Gate A and freeze the atomic plan.              |
| Design and verification          | planned | Create the isolated Pen baseline, then compose and verify the Create Project flow.    |
| Human review and retrospective   | planned | Present Gate D to the user; record results and update the skill from evidence.        |

## Phase detail

### 1. Bootstrap (active)

- Create `README.md`, `roadmap.md`, `todo.md`, `log.md`, `history.md`.
- Define the design brief and the benchmark protocol with Gates A–D.
- Register the experiment as `active (2026-10-02)` in `outputs/history.md`.
- No Pencil mutation is performed in this phase.

### 2. Brief and plan (planned)

- Inventory code-side components/tokens/icons and Pen-side contracts.
- Copy the source Pen document to the isolated writable target.
- Confirm Gate A (isolated artifact exists, brief and acceptance criteria
  approved, contracts and baseline recorded).
- Freeze the atomic design plan before the first mutation.

### 3. Design and verification (planned)

- Confirm Gate B before any mutation.
- Compose the Create Project flow section by section from existing system
  artifacts, verifying structure, clipping, resolved fills and screenshots
  immediately after each section (Gate C).
- Produce structural, contrast and code-alignment evidence.
- Execute the mandatory new-session handoff/compaction test.

### 4. Human review and retrospective (planned)

- Present Gate D: full flow coverage, classified findings, completed mechanical
  checks and explicit unresolved aesthetic trade-offs.
- Act only within the user decision (`accept` / `revise` / `reject`).
- Write the evidence-based retrospective and update the skill only from logged
  observations. The experiment is never closed or merged autonomously.

## Decisions

| # | Date       | Decision                                                                                       | Owner        |
| - | ---------- | ---------------------------------------------------------------------------------------------- | ------------ |
| 1 | 2026-10-02 | Only `artifacts/create-project.pen` is writable; source Pen and `src/` stay read-only.         | orchestrator |
| 2 | 2026-10-02 | Implementation workers use `deepseek/deepseek-flash`; reviews stay with the GPT orchestrator.  | orchestrator |
| 3 | 2026-10-02 | Compaction is lossy and is never the source of truth; durable state is authoritative.          | orchestrator |

## Gates

- **Gate A** — isolated Pen artifact exists; brief and acceptance criteria
  approved; code/Pen contracts and baseline recorded.
- **Gate B** — atomic task exists; target is inside the experiment scope; no
  master/token/global mutation; verification method known before the run.
- **Gate C** — per section: no clipping/collapsed layout; clean root; existing
  refs/tokens/assets; hierarchy/boundaries/contrast checked on resolved fills;
  focused screenshot saved.
- **Gate D** — before human review: all required fields and outcomes covered;
  findings classified `PASS`/`FAIL`/`INFO`/`HUMAN REVIEW`; mechanical checks
  done; unresolved aesthetic trade-offs exposed to the user.

## Checkpoints

| Date       | Position  | Durable files updated         | Exact next action                                                |
| ---------- | --------- | ----------------------------- | ---------------------------------------------------------------- |
| 2026-10-02 | Bootstrap | README, roadmap, todo, log, history | Run the code-system inventory and create the isolated Pen copy. |
