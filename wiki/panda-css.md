---
confidence: high
last_verified: 2026-09-21
sources:
  - raw/references/Panda CSS Complete Documentation.md
---

# Panda CSS

CSS-компилятор с zero-runtime выводом; в этом проекте — implementation layer дизайн-системы (см. [[design-system-migration]]).

## Роль в проекте

- `panda.config.ts` задаёт tokens, conditions и recipes.
- `defineRecipe` / `defineSlotRecipe` — визуальные правила компонентов (см. [[panda-rules]]).
- `conditions.extend` добавляет `light: '[data-theme="light"] &'` и `dark: '[data-theme="dark"] &'` — так активируется system context `theme`.
- Generated output (`styled-system/`) вручную не редактируется; пересобирается через `panda codegen` и `panda cssgen`.

## Источник

- [raw/references/Panda CSS Complete Documentation.md](../raw/references/Panda%20CSS%20Complete%20Documentation.md) — полный справочник (~21 800 строк). Ingest выборочный: читать целевые разделы, а не весь файл.
