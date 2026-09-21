---
confidence: high
last_verified: 2026-09-22
sources:
  - raw/migration/design_system_v1/components/button.json
  - raw/migration/design_system_v1_panda/src/theme/button.recipe.ts
  - raw/migration/design_system_v1_panda_pen_example/src/theme/button.recipe.ts
  - outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md
---

# Button

Первый и единственный конкретный компонент в migration package; служит проверкой правил [[panda-rules]].

## Anatomy

`root`, `prefixIcon`, `label`, `suffixIcon`.

## Public variants

| Вариант | design_system_v1 | PEN-пример |
| --- | --- | --- |
| `tone` | `primary`, `secondary` | `primary`, `secondary`, `ghost`, `icon` |
| `size` | `sm`, `md` | `sm`, `md` |

System context: `theme` (`light`, `dark`) приходит с application root через `data-theme`; branches живут внутри recipe.

## Отличия двух проекций

- **v1 (базовая):** плоские light/dark на `backgroundColor`, `borderColor`, `color`; без `compoundVariants`; focus-visible через `outline*`.
- **PEN-пример:** семантические токены, тени `shadow3` по теме, `compoundVariants` tone×size задают `paddingLeft/Right`; tone `icon` — icon-only (label не рендерится); иконки ровно 16px, размер caller-owned.

## API (React)

`tone`, `size`, `prefixIcon`, `suffixIcon` + нативные props `button`. Стили берутся из сгенерированного slot recipe `button({ tone, size })`, классы склеиваются через `cx`.

## Открытые моменты

- `compoundVariants` tone×size в PEN — кандидат на пересмотр: правило 9 разрешает их только когда пересечение не выразить независимым merge. **Решено (2026-09-22):** в landing осталось 3 `compoundVariants` — `icon × sm`, `icon × md` (сброс padding) и `secondary × md` (22px вместо 24px); остальные выражаются независимым merge. См. [[panda-rules]].
- icon-only режим потребует доступного имени (`aria-label`) в будущем behavior-слое.

## Источники

- [components/button.json](../raw/migration/design_system_v1/components/button.json)
- [design_system_v1_panda recipe](../raw/migration/design_system_v1_panda/src/theme/button.recipe.ts)
- [PEN recipe](../raw/migration/design_system_v1_panda_pen_example/src/theme/button.recipe.ts)
