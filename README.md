# No Launchpad Landing

Landing page for the No Launchpad product. React + Vite app styled with PandaCSS, documented with Storybook, with Bun unit tests, Vitest browser tests and Playwright visual tests. All commands run through mise.

## Prerequisites

- [mise](https://mise.jdx.dev/)

## Setup

```sh
mise run install
mise run prepare
```

`prepare` installs the Husky git hooks and runs PandaCSS codegen.

## Commands

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `mise run dev:start`     | Vite dev server on `APP_PORT`             |
| `mise run dev:stop`      | Stop the dev server                       |
| `mise run dev:storybook` | Storybook on `STORYBOOK_PORT`             |
| `mise run check`         | lint + types + format + tests             |
| `mise run check:deps`    | Knip dependency and export check          |
| `mise run gen`           | PandaCSS codegen and CSS generation       |
| `mise run icons:build`   | Build the icon font and manifest          |
| `mise run icons:check`   | Fail if generated icon assets drifted     |
| `mise run build`         | production build                          |
| `mise run test:visual`   | Playwright visual tests against `APP_URL` |

Environment defaults live in `.mise.toml`; personal overrides go in `.mise.local.toml`.

## Contributing

See `AGENTS.md` and `.agents/` for architecture, tooling and workflows. See `WIKI_LLM.md` for the knowledge wiki.
