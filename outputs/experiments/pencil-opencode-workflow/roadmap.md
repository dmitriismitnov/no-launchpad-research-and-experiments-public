# Roadmap: Pencil × OpenCode workflow

**Status:** closed (final closure 2026-10-05; workflow phase completed 2026-10-02).

Current checkpoint position: **closed**. Pencil-workflow фаза закрыта по решению пользователя; выводы зафиксированы. Следующий этап — перенос дизайн-системы в код — **уже выполнен** как расширение и закрыт отдельно 2026-10-05; итог — [`notes/retrospective.md`](notes/retrospective.md).

> **Correction notice (2026-10-05).** The phase-detail headings below previously
> read `(active)`/`(planned)` while the phase table and status said `done`; they
> are corrected to match. Deferred items (inline validation, tablet/mobile,
> new-session handoff test) are recorded in `notes/retrospective.md` §4.4 and are
> not success.

## Phases

| Phase                            | Status | Goal                                                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| Bootstrap                        | done   | Open durable state and registry entry; define brief and benchmark protocol.           |
| Brief and plan                   | done   | Inventory code/Pen contracts, confirm Gate A and freeze the atomic plan.              |
| Design and verification          | done    | Five ex_2 screens composed from existing refs (form light/dark, empty, entry, success); layout audited. |
| Human review and retrospective   | done   | Evidence presented; phase closed by the user; port to code is the next experiment.   |

## Phase detail

### 1. Bootstrap (done)

- Create `README.md`, `roadmap.md`, `todo.md`, `log.md`, `history.md`.
- Define the design brief and the benchmark protocol with Gates A–D.
- Register the experiment as `active (2026-10-02)` in `outputs/history.md`.
- No Pencil mutation is performed in this phase.

### 2. Brief and plan (done)

- Inventory code-side components/tokens/icons and Pen-side contracts.
- Copy the source Pen document to the isolated writable target.
- Confirm Gate A (isolated artifact exists, brief and acceptance criteria
  approved, contracts and baseline recorded).
- Freeze the atomic design plan before the first mutation.

### 3. Design and verification (done, with deferrals)

- Confirm Gate B before any mutation.
- Compose the Create Project flow section by section from existing system
  artifacts, verifying structure, clipping, resolved fills and screenshots
  immediately after each section (Gate C).
- Produce structural, contrast and code-alignment evidence.
- Execute the mandatory new-session handoff/compaction test.

**Deferred (not success):** inline validation copy, tablet/mobile variants and
the controlled real-session resume (handoff/compaction test). See
`notes/retrospective.md` §4.4.

### 4. Human review and retrospective (closed 2026-10-05)

- Present Gate D: full flow coverage, classified findings, completed mechanical
  checks and explicit unresolved aesthetic trade-offs.
- Act only within the user decision (`accept` / `revise` / `reject`).
- Write the evidence-based retrospective and update the skill only from logged
  observations. The experiment is never closed or merged autonomously.

**Note:** the user's explicit final visual `accept` is not recorded in durable
state; the human-review items remain open and are `closed-unverified`
(`notes/visual-review.md:37-41`). A closure request is not visual acceptance.
The experiment is closed here as a documentation closure by user request.

## Decisions

| # | Date       | Decision                                                                                       | Owner        |
| - | ---------- | ---------------------------------------------------------------------------------------------- | ------------ |
| 1 | 2026-10-02 | Only `artifacts/create-project.pen` is writable; source Pen and `src/` stay read-only.         | orchestrator |
| 2 | 2026-10-02 | Initially workers `deepseek/deepseek-flash`, reviews GPT-5.6 Terra. | orchestrator |
| 4 | 2026-10-02 | GPT limits exhausted: `deepseek/deepseek-flash` performs every role; independent review replaced by rubric-based evidence self-audit plus mandatory human visual review. | orchestrator |
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
| 2026-10-02 | Brief and plan | scripts/, notes/code-system-inventory.md, notes/pen-baseline.md, roadmap, todo, log, history | Confirm Gate A; freeze the atomic Create Project plan; then compose the Projects entry section. |
| 2026-10-05 | Closed | README, roadmap, todo, log, history, notes/results.md, notes/retrospective.md, outputs/history.md | None — experiment closed; deferred items are tracked in `notes/retrospective.md` §4.4. |
