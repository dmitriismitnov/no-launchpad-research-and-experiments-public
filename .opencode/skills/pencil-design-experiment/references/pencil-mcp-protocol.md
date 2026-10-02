# Pencil MCP protocol

Mechanics for driving Pencil MCP without canvas clutter or unverifiable edits.
Load the built-in Pencil skill plus the schema, `execute` and design-system
references before the first mutation.

## Isolation is not automatic (critical, verified 2026-10-02)

Passing a relative `filePath` does **not** guarantee the copy is the edit target:
Pencil MCP `execute` applies mutations to the **active editor** document. In the
2026-10-02 run this put experimental nodes into the read-only source
`design_system_ex_1.pen` while the agent believed it was editing the copy.

Before any mutation: open the isolated copy explicitly, confirm via
`get_app_state` that the active canvas editor is that copy, and re-check the
active path after any interruption. Never rely on the `filePath` argument alone.

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

## Render-cache workaround (verified 2026-10-02)

Newly created or modified **nested** content (text or nodes inside a frame) does
not appear in `TakeScreenshot` or `Export` until the containing frame is marked
dirty again. The symptom is a frame that renders its background and refs but no
child text, while a standalone top-level text node renders normally.

Before every screenshot or export, force a re-render by touching the section
frame with a harmless property change, for example:

```js
Update(sectionId, { gap: 37, });
Update(sectionId, { gap: 36, });
TakeScreenshot([ sectionId, ]);
```

Record this as a required step; without it, a correct composition can look
blank and be misreported as a layout failure.

## Known ref/master limitations (verified 2026-10-02)

- A `ref` does not accept component variant props as flat properties; for example
  `{type:'ref', tone:'secondary'}` fails with `unexpected property "tone"`. To
  express a variant, override the instance's fill/label tokens instead, or use a
  master that already carries the variant.
- Some masters are not drop-in controls: `Date Picker` embeds its calendar popup
  (use `Date Input` inline), and replacing a `Field` control with `Textarea` left
  a large empty block. Verify a master's full subtree before using it inline.
- Frame border props (`borderWidth`/`borderStyle`/`borderColor`) are not valid
  `.pen` frame properties; use the shape/fill model the schema supports.
- After structural changes, bounds can stay stale until the section frame is
  touched again; re-read bounds after the touch before trusting `ctx.problems`.
- Prefer one whole-document `Get` scan per call and reuse the collected ids in
  the same call: multiple whole-document scans, and `FindEmptySpace` on a large
  document, triggered `InternalError: interrupted`.
- The `Field` master's Hint text is `uOwyc`; `ss2MJ` is Error. Error copy stays
  hidden unless the Field carries its `invalid` variant, which a `ref` cannot
  set; for an empty state rely on empty controls plus a dimmed primary action,
  or ask before inventing a substitute.
- A frame's corner radius property is `cornerRadius`, not `borderRadius`.
- Set a nested control value after creation via the path
  `instanceId/bIaC6/f8QzS`; creation-time `descendants` does not reach it.
- Isolation procedure: the user opens the target document in Pen, then confirm
  the active canvas editor with `get_app_state` before any mutation. MCP does not
  switch documents from `filePath`.

## Persistence (critical, verified 2026-10-02)

Pencil MCP mutations are held **in memory** and are not written to the `.pen`
file automatically. On 2026-10-02 the composed frames were lost on document
reload: the on-disk file stayed byte-identical to the pristine source. A Save in
the native Pen UI is required to persist work.

After finishing a section, ask the user to save the document, then re-read the
file hash and confirm it changed before treating the artifact as delivered.

## Immediate verification

After each section, before moving on:

- touch the section frame (see render-cache workaround) before capturing;
- inspect `ctx.problems` for clipping or collapsed layout;
- confirm resolved refs and actual resolved fills (nearest actual resolved fill);
- confirm the root is clean and contains no stray leaf nodes;
- capture a focused screenshot as review evidence;
- record the result and disposition in `log.md`.

Do not wait for the whole flow to be finished before checking. If a check fails,
correct it inside local experiment frames and rerun the query before proceeding.
