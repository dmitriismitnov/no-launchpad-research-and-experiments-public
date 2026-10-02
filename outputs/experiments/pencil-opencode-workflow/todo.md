# Todo: Pencil × OpenCode workflow

**Status:** active (2026-10-02).

Statuses: `planned`, `active`, `blocked`, `verified`.

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
- [x] Visual review — `verified`
  - `notes/visual-review.md`: not AI slop; still needs human confirmation.

## Active

- [ ] Human review of renders (`artifacts/render/*.png`) and `HUMAN REVIEW` items — `active`
- [ ] Write the retrospective and update the skill from logged evidence — `active`

## Blocked

- [ ] Explicit inline validation copy — `blocked`
  - A `ref` cannot set the `Field` `invalid` variant, so error text stays hidden; empty state uses empty fields + dimmed primary action.

## Planned

- [x] Persist the composed flow to disk — `verified`
  - `ex_2.pen` saved with the five frames (9 271 120 → 9 291 756 bytes).
- [ ] Tablet and mobile variants — `planned`
- [ ] New-session handoff/compaction test with a real resume — `planned`

## Closed

- [x] Isolation-breach incident recorded and cleaned — `verified`
  - See `notes/structural-audit.md` and `log.md` entry 14.

## Plan mapping

| Plan task | State |
| --- | --- |
| Task 1 — durable state | done |
| Task 2 — project-local skill | done |
| Task 3 — inventory + baseline | done |
| Task 4 — compose + verify flow | partial (5 screens; handoff test and responsive open) |
| Task 5 — human review + retrospective | active (awaiting user) |
