# Roadmap: Pencil CLI UI Kit

**Status:** active (2026-10-06).

Current checkpoint position: **Bootstrap — active**. Durable state is opening;
no `.pen` file or Pencil mutation exists yet.

## Phases

| Phase | Status | Goal |
| --- | --- | --- |
| Bootstrap | done | Create experiment contract, durable state and registry entry. |
| CLI discovery | done | Test direct CLI and headless interactive CLI routes. |
| Gate A baseline | verified | Confirm active clean target and record baseline. |
| UI Kit | active | Create foundation, Button, ButtonIcon and Card. |
| Evidence and human review | planned | Audit evidence and present GUI review to the user. |

## Decisions

| # | Date | Decision | Owner |
| --- | --- | --- | --- |
| 1 | 2026-10-06 | Both CLI paths must be tested, including headless after direct CLI success. | user |
| 2 | 2026-10-06 | The target is a clean document, not a copy of an existing `.pen`. | user |
| 3 | 2026-10-06 | GUI is reserved for final user review. | user |
| 4 | 2026-10-06 | Create foundation and three masters only in the isolated target. | user |
| 5 | 2026-10-06 | CLI `ctx.problems` must be accessed inside a `Get` visitor. | orchestrator |

## Gates

- **Gate A — readiness:** both CLI paths are documented; the target exists;
  headless `get_app_state()` confirms it is active; code contracts and baseline
  are recorded.
- **Gate B — before mutation:** one atomic task is active; target and scope are
  confirmed; the user-authorized foundation/master mutation has a verification
  method.
- **Gate C — per section:** no clipping/collapsed layout in `ctx.problems`; no
  stray root leaves; resolved fills and screenshot are recorded.
- **Gate D — human review:** all scope elements have evidence, findings are
  classified and unresolved visual judgment is presented to the user.

## Checkpoints

| Date | Position | Durable files updated | Exact next action |
| --- | --- | --- | --- |
| 2026-10-06 | Gate A verified | README, roadmap, todo, log, history, CLI evidence | Read Foundation contracts and create its atomic task. |
