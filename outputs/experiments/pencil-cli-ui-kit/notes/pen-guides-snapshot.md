# Pen guides snapshot

**Captured:** 2026-10-06  
**Source:** installed `pen.dev CLI` 0.3.10  
**Source directory:**
`/Users/es/.nvm/versions/node/v25.8.0/lib/node_modules/@pen.dev/cli/dist/out/skills/pen-dev/`

## Purpose

`pen-guides/` is a read-only, versioned snapshot of every Markdown instruction
resource exposed by `pen interactive` → `read_skill()`. It lets the experiment
cite the exact Pencil guidance used for a decision, without depending on a
future CLI installation.

The snapshot contains the root skill, schema and execute protocol, generation,
components, scripts/shaders, whiteboard, and every domain guide under `guide/`.
`SHA256SUMS` records the source Markdown file hashes at capture time.

## Use

- Read `pen-guides/SKILL.md` first for the index and global canvas rules.
- Read `pen-schema.md` and `execute.md` before every Pencil mutation.
- Load a domain guide only when the active task needs it; for this experiment,
  `guide/components.md` applies to `ButtonIcon` and `Card` masters.
- Treat this directory as vendor evidence: do not edit individual guide files.
  Refresh it only by copying the complete installed source and updating this
  note with the new CLI version and hashes.
