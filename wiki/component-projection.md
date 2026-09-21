---
confidence: medium
last_verified: 2026-09-21
sources:
  - raw/migration/component-projection-crystallization.md
---

# Component Projection

Архитектурная формулировка для следующей итерации: компонент описывает собственную проекцию целиком — anatomy, parts, поддерживаемые global axes, public variants, interaction conditions, visual rules и опубликованные behavior states.

## Правила

- Application manifest только **активирует context**; он не содержит отдельных component theme overrides.
- Условия собираются локальными merge и nesting rules; вложенность уточняет condition и задаёт precedence.
- Compound cases пишутся только там, где действительно нужны.
- Наследование и `extends` не используются.
- Vocabulary делится на `static` (неизменяемые константы) и `dynamic` (редкие global policies, прежде всего motion mode). `dynamic` консервативен: не хранит component families, variants или общие component styles — см. [[static-vocabulary]].

## Открытые вопросы

- точная schema grammar и канонический nesting order;
- список supported global axes;
- глубина behavior contract: только published states либо также events/transitions.

## Источник

- [raw/migration/component-projection-crystallization.md](../raw/migration/component-projection-crystallization.md)
