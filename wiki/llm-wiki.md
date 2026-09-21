---
confidence: high
last_verified: 2026-09-21
sources:
  - raw/references/llm-wiki.md
---

# LLM Wiki

Паттерн персональной базы знаний, которую ведёт LLM (gist Karpathy). Основа устройства этого vault и схемы `WIKI_LLM.md`.

## Идея

Вместо RAG, где знание переоткрывается на каждый запрос, LLM инкрементально строит и поддерживает **persistent wiki** — структурированную сеть markdown-файлов между пользователем и сырыми источниками. Знание компилируется один раз и затем поддерживается актуальным.

## Три слоя

- **Raw sources** — неизменяемые исходники (source of truth).
- **The wiki** — markdown, которым владеет LLM: summaries, entity/concept pages, comparisons, synthesis.
- **The schema** — файл правил (`WIKI_LLM.md` в этом проекте), превращающий LLM в дисциплинированного хранителя.

## Операции

- **Ingest** — прочитать источник, написать summary, обновить concept/entity pages, [[index]] и [[log]].
- **Query** — отвечать по wiki, при необходимости сверяясь с `raw/`; хорошие ответы можно филировать обратно как новые страницы.
- **Lint** — проверять противоречия, устаревшие claims, orphans, missing cross-references.

## Index и log

`index.md` — контентный каталог; `log.md` — хронологический append-only журнал. Префикс `## [дата] ingest | ...` делает log parseable.

## Источник

- [raw/references/llm-wiki.md](../raw/references/llm-wiki.md)
