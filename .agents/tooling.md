# Tooling

## Task runner

`mise` is the only task runner. `package.json` has no `scripts`. Environment defaults (`APP_PORT`, `APP_URL`, `STORYBOOK_PORT`, `STORYBOOK_URL`) live in `.mise.toml`; personal overrides go in `.mise.local.toml` (git-ignored).

## Quality stack

- TypeScript - `tsc6` type checks only, no emit.
- ESLint - code quality; formatting is not an ESLint concern.
- dprint - formatting for TS/JS/JSON/Markdown.
- Knip - unused files, exports and dependencies (`mise run check:deps`).
- Commitlint - conventional commit messages.
- lint-staged + Husky - pre-commit autofix, commit-msg lint, pre-push full check.

## Modules

- React/Vite app.
- PandaCSS (consumer): `panda:gen`, `panda:cssgen`, `panda:watch`, `panda:clean`.
- Testing: Bun unit (`test:unit`), Vitest browser + Storybook (`test:browser`), Playwright visual (`test:visual`).
- Storybook: `dev:storybook`, `storybook:build`.

## mise tasks

### Base

`install`, `prepare`, `build`, `dev:start`, `dev:stop`, `dev:restart`, `check`, `fix:all`, `gen`, `clean`, `husky`.

### Checks

`check:lint`, `check:types`, `check:types-watch`, `check:format`, `check:deps`.

### Autofixes

`fix:lint`, `fix:format`, `fix:staged`, `fix:lint-staged`, `fix:format-staged`.

### Tests

`test`, `test:unit`, `test:browser`, `test:visual`, `test:visual:update`, `test:install-browsers`.

### Codegen

`gen` -> `panda:gen`, `panda:cssgen`; `clean` -> `panda:clean`.

### Asset pipelines

Fonts: `fonts:build`, `fonts:check` -> `src/shared/fonts/tools/build.ts`.
Icons: `icons:build`, `icons:check`, `icons:update`.

### Storybook

`dev:storybook`, `storybook:build`.

### Git

`commitlint`.
