---
confidence: high
last_verified: 2026-09-22
sources:
  - raw/migration/component-projection-crystallization.md
  - outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md
---

# Component Projection

Архитектурная формулировка: компонент описывает собственную проекцию целиком — anatomy, parts, поддерживаемые global axes, public variants, interaction conditions, visual rules и опубликованные behavior states.

## Правила

- Application manifest только **активирует context**; он не содержит отдельных component theme overrides.
- Условия собираются локальными merge и nesting rules; вложенность уточняет condition и задаёт precedence.
- Compound cases пишутся только там, где действительно нужны.
- Наследование и `extends` в recipes не используются. Исключение — технический `conditions.extend` для объявления system conditions; см. [[panda-rules]].
- Preset ownership изолирован: `settings` — `preflight`/`globalCss`, `foundation` — tokens и system conditions, компонент — только свой recipe. Зоны не пересекаются, компонент не модифицирует foundation или другой компонент.
- Vocabulary делится на `static` (неизменяемые константы) и `dynamic` (редкие global policies, прежде всего motion mode). `dynamic` консервативен: не хранит component families, variants или общие component styles — см. [[static-vocabulary]].

## Итог проверки (2026-09-22)

Проверено на реальном Button в эксперименте:

- nesting order подтверждён: `theme -> hover -> focusVisible`;
- property-local conditions (`backgroundColor._light._hover`) компилируются;
- static paired tokens `*.light` / `*.dark` работают;
- изолированные presets компилируются и не размывают владение;
- правила проверяемы тестами (unit, Storybook browser, Playwright visual).

Подробности — в crystallization [[panda-rules]] и в
[outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md](../outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md).

## Открытые вопросы

**Прежнее состояние.** Канонический nesting order, список supported global axes и глубина behavior contract были открыты.

**Текущее состояние.** Nesting order закрыт (`theme -> hover -> focusVisible`). Остаются открытыми:

- точная schema grammar;
- список supported global axes (сейчас только `theme`);
- глубина behavior contract: только published states либо также events/transitions;
- static tokens против semantic tokens, breakpoints и elevation — см.
  [open-questions](../outputs/experiments/panda-design-system-rules/notes/open-questions.md).

## Источник

- [raw/migration/component-projection-crystallization.md](../raw/migration/component-projection-crystallization.md)
