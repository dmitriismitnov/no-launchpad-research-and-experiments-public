# AGENTS.md

Project-level rules for agents and contributors. Details live in `.agents/`.

## Project

`@no-launchpad/landing` - landing page for the No Launchpad product. React + Vite app, styled with PandaCSS, tested with Bun, Vitest and Playwright, documented with Storybook.

## Aliases (keep in sync)

- `@app/*` -> `src/app/*`
- `@shared/*` -> `src/shared/*`

Keep these aliases identical in `tsconfig.json`, `vite.config.ts` and `vitest.config.ts`.

## Commands

Use `mise run <task>`. There are no `package.json` scripts.

- `mise run install` - install dependencies.
- `mise run prepare` - install git hooks and run codegen.
- `mise run dev:start` / `dev:stop` / `dev:restart` - Vite dev server.
- `mise run dev:storybook` - Storybook.
- `mise run check` - lint + types + format + tests.
- `mise run check:deps` - Knip, run after dependency or export changes.
- `mise run gen` - PandaCSS codegen and CSS generation.
- `mise run fonts:build` / `fonts:check` - build or verify the web font assets.
- `mise run icons:build` / `icons:check` / `icons:update` - build or update the icon font.
- `mise run build` - production build.

## Rules

- Never edit generated code in `src/shared/styled-system`; change the theme or config and run `mise run gen`.
- Keep every task name synchronized across `.mise.toml`, `.husky/*`, `lint-staged.config.mjs`, `.agents/*` and `README.md`.
- Exact dependency versions only; no `^` or `~`. Commit `bun.lock` with dependency changes.

See `.agents/project.md`, `.agents/tooling.md`, `.agents/workflows.md`.
