# Todo: Pencil × OpenCode workflow

**Status:** closed (final closure 2026-10-05; workflow phase completed 2026-10-02).

Statuses: `planned`, `active`, `blocked`, `verified`, `deferred`.
Final assessment and deferred items: [`notes/retrospective.md`](notes/retrospective.md).

## Verified

- [x] Open durable experiment state and registry entry — `verified`
  - `README.md`, `roadmap.md`, `todo.md`, `log.md`, `history.md`, `notes/design-brief.md`, `notes/benchmark-protocol.md`.
- [x] Create project-local skill `pencil-design-experiment` — `verified`
  - `.opencode/skills/pencil-design-experiment/` with references and templates.
- [x] Code-system inventory — `verified`
  - `notes/code-system-inventory.md`: 5 components, token ownership, theme, 17 icons, code↔Pen divergence.
- [x] Pen baseline in an isolated document — `verified`
  - `notes/pen-baseline.md`: 82 masters, 1720 refs, 0 `ctx.problems`.
- [x] Compose Create Project entry / empty / filled / success — `verified`
  - `artifacts/ex_2.pen`, frames `XKqHF`, `iKbNI`, `WqoYt`, `negSS`.
- [x] Compose dark variant — `verified`
  - frame `R1Yg8`.
- [x] Structural/contrast audit — `verified`
  - `notes/structural-audit.md`: layout without overlap; refs/tokens/theme pass.
- [x] Visual review — `verified` (agent-level)
  - `notes/visual-review.md`: not AI slop; explicit user `accept` not recorded.
- [x] Persist the composed flow to disk — `verified`
  - `ex_2.pen` saved with the five frames (9 271 120 → 9 291 756 bytes).
- [x] Write the retrospective — `verified` (2026-10-05)
  - `notes/retrospective.md`; supersedes `notes/results.md` for final closure.

## Blocked / deferred (not success)

- [ ] Human acceptance of the final visual review — `closed-unverified`
  - The agent-level `HUMAN REVIEW` list remains open (`notes/visual-review.md`);
    no explicit user `accept` is recorded. The user's closure request is **not**
    visual acceptance. See retrospective §4.4.
- [ ] Explicit inline validation copy — `blocked / deferred`
  - A `ref` cannot set the `Field` `invalid` variant, so error text stays hidden;
    empty state uses empty fields + dimmed primary action. See retrospective §4.4.
- [ ] Tablet and mobile variants — `deferred / unmet`
  - Not built; recorded in `notes/structural-audit.md` and retrospective §4.4.
- [ ] Controlled real-session resume (handoff/compaction test) — `deferred / not evidenced`
  - Criteria in `README.md` §Success criteria; a controlled real-session resume is
    not evidenced in the reviewed durable state (absence of a record is not proof
    it is impossible). See retrospective §4.4.

## Closed

- [x] Isolation-breach incident recorded and cleaned — `verified`, with a correction
  - See `notes/structural-audit.md` and `log.md` entry 14. On-disk source hash was
    unchanged, but the open editor document was transiently mutated then cleaned
    (see retrospective §7.5) — "never mutated" is superseded.

## Plan mapping

| Plan task | State |
| --- | --- |
| Task 1 — durable state | done |
| Task 2 — project-local skill | done |
| Task 3 — inventory + baseline | done |
| Task 4 — compose + verify flow | done (bounded: 5 screens; responsive and controlled real-session resume not evidenced) |
| Task 5 — human review + retrospective | retrospective written 2026-10-05; human visual acceptance not recorded (`closed-unverified`) |
