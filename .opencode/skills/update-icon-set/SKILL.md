---
name: update-icon-set
description: Use when replacing, renaming or removing icons in an existing set - "обнови набор иконок", "rename icon", "remove icon", "update icon set", "breaking change in icons", "icons:update". Compares a proposed set with the committed manifest and usages, classifies every change, and asks the user before anything that alters the existing contract.
---

# Update Icon Set

Evolve an existing icon set safely. Additions are automated; anything that
changes the existing contract stops for a user decision.

## Steps

1. Run a dry run:
   `mise run icons:update -- --from <dir>`
   It normalizes the proposed set, compares it with the committed manifest and
   the static `<Icon name="…">` usages in `src/`, and prints the classification.
2. Read the report. Non-zero exit means something is blocked or needs a decision.
3. Ask the user how to resolve blocked changes. Never choose for them.
4. Re-run with `--apply` plus the chosen flags.
5. Verify: `mise run icons:check` and `mise run check`.

## Classification

- **added** — a new key. Safe; applied automatically.
- **unchanged** — identical glyph; nothing to do.
- **changed** — the same key with different geometry. The API is intact, but the
  rendered icon changes. Requires `--allow-glyph-change`.
- **removed** — a key no longer in the set. Breaking. Requires a decision:
  `--allow-remove`, `--migrate-usage old=new`, or `--keep-alias old=new`.
- **possible rename** — a removal whose glyph reappears under a new key. Only a
  hint; it is never applied automatically.
- **collision** — a file's `data-icon-name` disagrees with its file name. Always
  blocking; fix the source first.
- **dynamic usage** — a non-literal `name` prop. Always listed for manual
  handling; it cannot be migrated automatically.

## Resolving a blocked change

Present these options to the user:

1. **Keep both glyphs** — `--keep-alias old=new`: the old key stays valid and
   points at the new glyph; nothing is removed.
2. **Migrate consumers** — `--migrate-usage old=new`: rewrites static
   `<Icon name="old">` usages to the new key, then removes the old key.
3. **Allow the raw change** — `--allow-remove` / `--allow-glyph-change`.
4. **Cancel** — change nothing and revisit the source SVGs.

A dry run with the chosen flags must exit zero before `--apply` is used.

## Rules

- Only static `<Icon name="…">` calls can be migrated. Dynamic names are always
  manual.
- Never remove or rename without an explicit user decision; never guess a
  rename.
- `--apply` rewrites canonical SVGs and generated assets, and may rewrite
  `src/` usages for `--migrate-usage`. Report exactly what changed.
- After applying, `mise run icons:check` must be green; otherwise the assets and
  sources diverged.
