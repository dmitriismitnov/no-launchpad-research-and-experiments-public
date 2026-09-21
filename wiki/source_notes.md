# Source notes

Реестр всех источников, ingested из `raw/`. `raw/` неизменяем и является source of truth.

## migration

| Источник | Тип | Кратко | Ключевые термины | Ingested |
| --- | --- | --- | --- | --- |
| [README.md](../raw/migration/README.md) | инструкция | Назначение и решения первой итерации, состав пакета, следующий шаг | component-scoped, system context, static vocabulary, Panda rules | 2026-09-21 |
| [iteration-1-retrospective.md](../raw/migration/iteration-1-retrospective.md) | ретро | Итог итерации 1: agnostic implementation преждевременна | premature abstraction, component-scoped, static vocabulary | 2026-09-21 |
| [component-axes-model.md](../raw/migration/component-axes-model.md) | модель | Четыре категории осей и правила пересечения | variants, system contexts, behavior states, interaction conditions | 2026-09-21 |
| [component-axes-graph.md](../raw/migration/component-axes-graph.md) | граф | Mermaid-схема слоёв модели | resolution, precedence | 2026-09-21 |
| [component-projection-crystallization.md](../raw/migration/component-projection-crystallization.md) | кристаллизация | Формулировка component-scoped projection и открытые вопросы | projection, static/dynamic vocabulary, nesting order | 2026-09-21 |
| [design_system_v1/README.md](../raw/migration/design_system_v1/README.md) | прототип | Visual-only API, правила проекции | manifest, theme, tone, size | 2026-09-21 |
| [design_system_v1/manifest.json](../raw/migration/design_system_v1/manifest.json) | данные | Global axes, resolutionOrder, excluded | theme, resolutionOrder | 2026-09-21 |
| [design_system_v1/vocabulary/static.json](../raw/migration/design_system_v1/vocabulary/static.json) | данные | Неизменяемые constants | color, space, dimension, radius, fontSize, borderWidth | 2026-09-21 |
| [design_system_v1/components/button.json](../raw/migration/design_system_v1/components/button.json) | данные | Агностичная проекция Button | anatomy, tone, size, `_theme`, `_hover` | 2026-09-21 |
| [design_system_v1_panda/README.md](../raw/migration/design_system_v1_panda/README.md) | политики | Действующие Panda rules и пример Button | defineSlotRecipe, longhand, property-local | 2026-09-21 |
| [design_system_v1_panda/panda.config.ts](../raw/migration/design_system_v1_panda/panda.config.ts) | конфиг | Tokens, light/dark conditions, slot recipe | conditions.extend, tokens, slotRecipes | 2026-09-21 |
| [design_system_v1_panda/src/theme/button.recipe.ts](../raw/migration/design_system_v1_panda/src/theme/button.recipe.ts) | рецепт | Базовая Button-проекция | base, variants, defaultVariants | 2026-09-21 |
| [design_system_v1_panda_pen_example/README.md](../raw/migration/design_system_v1_panda_pen_example/README.md) | proof of concept | PEN-derived visual-only пример | tones, icon tone, 16px icons | 2026-09-21 |
| [pen_example/panda.config.ts](../raw/migration/design_system_v1_panda_pen_example/panda.config.ts) | конфиг | Семантические токены и shadow1..8 | surface, ink, line, accent | 2026-09-21 |
| [pen_example/button.recipe.ts](../raw/migration/design_system_v1_panda_pen_example/src/theme/button.recipe.ts) | рецепт | Button с 4 tones и compoundVariants | compoundVariants, paddingLeft/Right | 2026-09-21 |
| [pen_example/design_raw.pen](../raw/migration/design_system_v1_panda_pen_example/design_raw.pen) | дизайн | Исходный PEN-макет (~68k строк) | PEN | 2026-09-21 |

## references

| Источник | Тип | Кратко | Ключевые термины | Ingested |
| --- | --- | --- | --- | --- |
| [Panda CSS Complete Documentation.md](../raw/references/Panda%20CSS%20Complete%20Documentation.md) | документация | Полный справочник Panda CSS (~21 800 строк) | recipes, tokens, conditions, cssgen | 2026-09-21 |
| [llm-wiki.md](../raw/references/llm-wiki.md) | идея | Паттерн persistent LLM-wiki | raw, wiki, schema, ingest, lint | 2026-09-21 |
| [Ark UI.md](../raw/references/Ark%20UI.md) | ссылка | LLMs.txt для Ark UI | headless, accessibility | 2026-09-21 |
| [Zagjs LLMs.txt.md](../raw/references/Zagjs%20LLMs.txt.md) | ссылка | LLMs.txt для Zag JS | state machine, framework-agnostic | 2026-09-21 |
| [Chakra UI LLMs.txt](../raw/references/LLMs.txt%20Documentation%20%20Chakra%20UI.md) | ссылка | LLMs.txt для Chakra v3 | v3, migration | 2026-09-21 |
| [open-ui](../raw/references/openuiopen-ui%20Maintain%20an%20open%20standard%20for%20UI%20and%20promote%20their%20adherence%20and%20adoption..md) | ссылка | Устав Open UI | anatomy, parts, states | 2026-09-21 |
