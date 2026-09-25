---
name: build-icon-font
description: Use when adding icons to the project or regenerating the icon font and manifest - "добавь иконку", "add icon", "build icon font", "пересобери иконки", "icons:build". Normalizes raw SVG exports into the canonical contract, validates them, and rebuilds the WOFF2 font and generated manifest.
---

# Build Icon Font

Rebuilds the icon font and manifest from the canonical SVG sources in
`src/shared/components/icon/assets/svg/`.

## When to use

- A new icon is needed.
- Raw SVG exports must be brought into the project.
- The font or `manifest.generated.ts` is out of date.

Adding a brand-new icon is safe. Changing an existing glyph or key is not: use
the `update-icon-set` skill instead.

## Steps

1. Put raw exports in a directory outside the canonical sources, for example the
   repo-root `assets/icons/` drop. Never hand-edit canonical SVGs.
2. Import and build:
   `mise run icons:build -- --from <raw-dir>`
   The tool normalizes each SVG into the canonical form, validates it, writes it
   to `assets/svg/`, then rebuilds the font and manifest.
3. If validation fails, fix the raw export and rerun. The report names the file
   and the broken rule. Never work around a validation error.
4. Verify: `mise run icons:check` and `mise run check`.

## Canonical contract

- one root `<svg>` with `xmlns` and a four-number `viewBox`;
- monochrome, fill-based geometry with `fill="currentColor"`; stroke-based or
  multi-colour SVGs must be flattened to filled paths first;
- no provenance attributes, inline styles, `<title>`/`<desc>`, raster images,
  external references, masks, gradients or filters;
- the file name is the public key: lower-case `kebab-case`, matching
  `^[a-z0-9]+(?:-[a-z0-9]+)*$`.

`fill="none"` is allowed; other literal colours are normalized to
`currentColor`. The icon inherits colour from its context, so never encode a
colour in the SVG.

## Rules

- The tool owns `manifest.generated.ts` and `assets/font/icon.woff2`. Never edit
  them by hand.
- The build is deterministic: rerunning without source changes must leave
  `mise run icons:check` green.
- Existing keys keep their codepoint; new keys continue after the highest one.
- A committed, stale font or manifest is a failure, not a warning.
