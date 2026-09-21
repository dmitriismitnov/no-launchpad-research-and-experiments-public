---
confidence: high
last_verified: 2026-09-21
sources:
  - raw/migration/README.md
  - raw/migration/iteration-1-retrospective.md
---

# Design System Migration

Переносимая инструкция, результат первой итерации дизайн-системы. Самодостаточна: содержит действующие решения, правила, примеры данных и PEN-макет. Исторические исследования вынесены в `../archive/` и инструкцией не являются.

## Ключевое решение

Не строить полную platform-agnostic implementation до проверки на реальном интерфейсе. Первая практическая версия:

- [[panda-css]] как visual implementation layer;
- application root активирует system context — сейчас только `data-theme="light|dark"`;
- [[static-vocabulary]] хранит неизменяемые values (palette, spacing, dimensions, radii, typography, shadow colors);
- компонент локально описывает anatomy, public variants и все visual rules;
- отдельные theme files, component-family overrides, `extends` и скрытая inheritance не используются;
- behavior, runtime state machine, motion и density не входят в v1.

## Модель компонента

Компонент настраивается через четыре категории: public variants, system contexts, behavior states, interaction conditions — см. [[component-axes-model]]. Механика локальной сборки rules — [[component-projection]].

## Правила visual-слоя

Свод правил рецептов — [[panda-rules]]. Первый конкретный компонент — [[button]].

## Исключено

- runtime state machines и interaction behavior;
- accessibility implementation;
- motion и density policies;
- design tokens compiler, зависимости, generated Panda output, package setup;
- исторические эксперименты и преждевременные agnostic schemas.

## Следующая итерация

Одна задача: перенести существующий статичный landing page в рабочий codebase без интерактивности, пользуясь этими правилами и boilerplate. Проверить:

- достаточно ли component-scoped architecture для реальной страницы;
- какие правила стабильны, а какие требуют корректировки;
- какие комбинации осей реально нужны;
- какие behavior/state edge cases решать сейчас, а какие записать как отложенные;
- как хранить code-linked decisions рядом с тестами и implementation.

Длинный roadmap не строится: blocker текущей страницы решается сейчас, observation без текущей стоимости фиксируется отдельно.

## Источники

- [raw/migration/README.md](../raw/migration/README.md)
- [raw/migration/iteration-1-retrospective.md](../raw/migration/iteration-1-retrospective.md)
