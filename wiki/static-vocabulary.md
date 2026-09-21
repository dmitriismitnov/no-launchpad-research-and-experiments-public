---
confidence: high
last_verified: 2026-09-22
sources:
  - raw/migration/design_system_v1/vocabulary/static.json
  - raw/migration/component-projection-crystallization.md
  - outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md
---

# Static Vocabulary

Неизменяемые visual constants, на которые ссылаются component projections. Значения записываются как `{static.path.to.value}`.

## Ключи (design_system_v1)

- `color` — `white`, `black`, `blue.300/400/500/600/700`, `gray.50/100/200/300/500/700/800/900/950`
- `space` — `x1` 0.25rem, `x2` 0.5rem, `x3` 0.75rem, `x4` 1rem
- `dimension` — `x16` 1rem, `x18` 1.125rem, `x32` 2rem, `x40` 2.5rem
- `radius` — `sm` 0.25rem, `md` 0.375rem
- `fontSize` — `sm` 0.875rem, `md` 1rem
- `fontWeight` — `medium` 500, `semibold` 600
- `borderWidth` — `x1` 1px, `x2` 2px

PEN-пример использует другую, семантическую палитру (`surface`, `ink`, `line`, `accent`, `shadow1..8`) и значения `x10/x22/x24`, `x16/x32/x50`, radii `control/surface`, font `Geist` 15px — см. [[button]].

## Конфликт шкал: v1 против landing

**Прежнее значение (v1, выше).** `space` — `xN = N * 0.25rem`: `x1` 0.25rem, `x2` 0.5rem, `x4` 1rem.

**Текущее решение (landing).** `xN = N * 0.125rem`: `x1` 0.125rem. Регулярная шкала введена в эксперименте и проверена тестом foundation. PEN-пример уже использует этот шаг (`x5` 0.625rem, `x8` 1rem, `x16` 2rem).

**Почему изменено.** v1-шкала с шагом 0.25rem не совместима с PEN-значениями и не даёт достаточно шагов для плотных размеров Button. Шаг 0.125rem выбран как единый знаменатель и заменяет v1-числа в новом codebase. Значения v1 не удаляются: они остаются историей дизайн-системы. См. crystallization [[panda-rules]].

## dynamic vocabulary

Появляется только для редких application-wide policies, прежде всего motion mode. Консервативен: не хранит component families, variants и общие component styles — это остаётся в [[component-projection]].

## Источник

- [raw/migration/design_system_v1/vocabulary/static.json](../raw/migration/design_system_v1/vocabulary/static.json)
