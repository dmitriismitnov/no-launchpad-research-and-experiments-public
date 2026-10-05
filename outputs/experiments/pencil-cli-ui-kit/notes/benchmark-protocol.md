# Benchmark protocol: Pencil CLI UI Kit

**Status:** active (2026-10-06).

## Evidence rules

`roadmap.md`, `todo.md` and `log.md` are durable sources of truth. Every CLI
operation logs its command, exit status, stdout/stderr artifact and disposition.
Every Pencil mutation logs the active target, task, node ids, `ctx.problems`,
resolved fills and a focused screenshot.

## CLI routes

The direct `pen --out … --prompt …` route and `pen interactive --out …` route
are independently mandatory. A direct-route success never waives the headless
route. A direct-route failure does not authorize GUI fallback.

## Mutation protocol

Before each mutation, load Pencil schema/execute guidance in the headless shell,
call `get_app_state()` and verify the target path. Use one atomic task at a time,
keep roots free of leaf nodes and set `clip: true` on display frames. Capture
evidence after touching a changed frame if nested rendering is stale.

## Finding statuses

- `PASS`: mechanically verified against raw evidence.
- `FAIL`: contract violated; correct or leave explicitly unresolved.
- `INFO`: factual observation with no required action.
- `HUMAN REVIEW`: visual judgment reserved for the user.

## Closure

Only the user closes the experiment after final GUI review.
