# Pencil MCP protocol

Mechanics for driving Pencil MCP without canvas clutter or unverifiable edits.
Load the built-in Pencil skill plus the schema, `execute` and design-system
references before the first mutation.

## Read before mutate

- Load the Pencil skill and inspect the target document, node refs, variables,
  resolved fills and existing instances before changing anything.
- Confirm Gate B: the atomic task exists in `todo.md`, the target is inside the
  approved experiment scope, no master/token/global change is involved, and the
  verification method is known.
- Record the exact target frame and expected verification before the mutation.

## Mutation rules

- One atomic task per mutation; do not batch unrelated changes.
- Set `placeholder: true` while a new root's content is unfinished, and remove
  it when the section is complete.
- Use `clip: true` on every new screen frame.
- Update properties directly on existing nodes instead of deleting and
  recreating them, so node ids, refs and children are preserved.
- Do not pollute document roots with leaf nodes; new roots must be isolated
  experiment frames.
- Use existing refs, semantic tokens, theme contexts and icon assets. Never
  hardcode a substitute or create a master, token or icon.

## Immediate verification

After each section, before moving on:

- inspect `ctx.problems` for clipping or collapsed layout;
- confirm resolved refs and actual resolved fills (nearest actual resolved fill);
- confirm the root is clean and contains no stray leaf nodes;
- capture a focused screenshot as review evidence;
- record the result and disposition in `log.md`.

Do not wait for the whole flow to be finished before checking. If a check fails,
correct it inside local experiment frames and rerun the query before proceeding.
