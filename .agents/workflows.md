# Workflows

## First run

```sh
mise run install
mise run prepare
```

## Daily development

```sh
mise run dev:start      # Vite on APP_PORT
mise run dev:storybook  # Storybook on STORYBOOK_PORT
mise run test:unit
mise run test:browser
```

## Before pushing

```sh
mise run check
```

## Visual tests

```sh
mise run test:install-browsers   # once
mise run dev:start               # in one shell
mise run test:visual             # in another
mise run test:visual:update      # refresh baselines
```

## Changing the theme

1. Edit `src/shared/styles/panda/` or `panda.config.ts`.
2. Run `mise run gen`.
3. Never edit `src/shared/styled-system` by hand.

## Commits

Conventional commits. Husky runs lint-staged on commit and `check` on push.

## Wiki

See `WIKI_LLM.md`. Write to `outputs/` only on explicit request.
