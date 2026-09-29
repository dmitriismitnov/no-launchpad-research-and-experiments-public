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

## Icons

1. Add or normalize source SVGs: `mise run icons:build -- --from <dir>`.
2. `mise run icons:build` regenerates the font and manifest.
3. `mise run icons:check` fails when the committed assets are stale.
4. `mise run icons:update -- --from <dir>` reports breaking changes before
   touching anything; see the `build-icon-font` and `update-icon-set` skills.

## Fonts

1. Add the variable normal/italic sources and their licence under
   `src/shared/fonts/assets/raw/`; never below `public/`.
2. `mise run fonts:build` regenerates the WOFF2 assets, manifest and generated
   CSS.
3. `mise run fonts:check` fails when the committed assets, manifest or CSS are
   stale.
4. See the `build-web-font` skill.

## Commits

Conventional commits. Husky runs lint-staged on commit and `check` on push.

## Wiki

See `WIKI_LLM.md`. Write to `outputs/` only on explicit request.
