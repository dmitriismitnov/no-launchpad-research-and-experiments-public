# Handoff protocol

Checkpoint and continuation reference. Durable state is authoritative; OpenCode
compaction is lossy and is never the source of truth.

Before a new major phase, a large inspection, a subagent fan-out or a Pencil
mutation, evaluate whether the next atomic action can be completed safely with
the current context. When it cannot:

1. finish only the current safe atomic operation;
2. update `roadmap.md`, `todo.md` and `log.md` with evidence;
3. do not start a new subagent or Pencil mutation;
4. choose autonomously between manual compaction and a clean-session handoff;
5. for compaction, request it at the safe point, log the request and result, and
   continue after it completes when durable state is sufficient;
6. for a clean session, emit the handoff below, then end the run. Do not ask the
   user to select a mode.

Use this protocol proactively at phase boundaries; do not wait for a
context-limit failure. Only the final benchmark review requires human input.

## Handoff template

```md
## Objective

<the experiment objective and the current phase>

## Completed

- <verified work, each item with its evidence>

## Active

<the one atomic task in progress and its exact state>

## Blockers

<none, or the blocker, its owner and what unblocks it>

## Evidence

- <file/frame/node or screenshot that proves the state>

## Exact next action

<one command or one Pencil operation to start the next session>

## Files

- <durable files and artifacts that must be read first>

## Continuation mode

<manual compaction | clean-session handoff, plus where compaction stopped or the
session ended>
```

A checkpoint is complete only when all three durable files — `roadmap.md`,
`todo.md` and `log.md` — are updated and an exact next action is recorded, not
only prose.
