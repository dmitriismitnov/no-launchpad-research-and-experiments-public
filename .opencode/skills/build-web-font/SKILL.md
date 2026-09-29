---
name: build-web-font
description: Use when adding a web font to the project or regenerating the web font assets and manifest - "добавь шрифт", "добавь fonts", "add font", "build web font", "пересобери шрифты", "fonts:build". Validates the canonical variable font sources and rebuilds the WOFF2 files and generated manifest.
---

# Build Web Font

Rebuilds the WOFF2 web-font assets and the generated manifest from the
canonical variable sources in `src/shared/fonts/assets/raw/`.

## When to use

- A new font family or face is needed.
- A font distribution must be brought into the project.
- The WOFF2 files or `manifest.generated.ts` are out of date.

## Steps

1. Put the raw distribution outside the canonical sources, for example the
   repo-root `assets/fonts/` drop.
2. Keep only what the contract needs: the variable normal and italic files and
   their licence. Static fonts are not part of the runtime set.
3. Import and build:
   `mise run fonts:build`
   It validates every source, converts it to WOFF2 and rewrites the generated
   assets and manifest.
4. If validation fails, fix the source and rerun. The report names the face and
   the broken rule. Never work around a validation error.
5. Verify: `mise run fonts:check` and `mise run check`.

## Canonical contract

- one directory per family under `src/shared/fonts/assets/raw/`;
- variable `TTF` sources only, exposing the axes the face declares;
- the family name must match the canonical contract;
- normal and italic are separate faces, never one face registered twice;
- the upstream licence file is retained next to the sources.

## Rules

- The pipeline owns `src/shared/fonts/assets/web/` and
  `src/shared/fonts/manifest.generated.ts`. Never edit generated WOFF2 files or manifest.generated.ts by hand.
- The build is deterministic: rerunning without source changes must leave
  `mise run fonts:check` green.
- Raw sources never live below Vite's `public/`; Vite copies every public file
  into the production output.
- `fonts:build` and `fonts:check` are thin mise tasks over
  `src/shared/fonts/tools/build.ts`; call those commands and never a different
  conversion command.
- Subsetting, preloading, replacing a family, and a destructive update workflow
  are outside this skill.
