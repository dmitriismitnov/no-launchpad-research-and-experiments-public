# Эксперимент: Panda Design System Rules

**Статус:** completed (2026-09-22). Итог в
`crystallizations/foundation-and-preset-rules.md`.

## Вопрос

Как имплементировать визуальную часть дизайн-системы через PandaCSS так, чтобы
компонент полностью владел своей visual projection, foundation оставался
консервативным набором переиспользуемых шкал, а правила были проверяемыми и
однозначными.

## Scope

В рамках:

- foundation/tokens/settings/component presets на PandaCSS;
- перенос foundation и Button из PEN-примера;
- Storybook для Button;
- минимальная рабочая галерея кнопок;
- проверка и уточнение правил дизайн-системы.

Вне рамок:

- runtime behavior и state machines;
- accessibility implementation за пределами визуальной проверки;
- motion и density policies;
- публикация npm-пакета;
- CI.

## Успех

- Panda codegen компилирует settings, foundation и Button preset.
- `mise run gen`, `check`, `check:deps`, `build`, `storybook:build` проходят.
- Storybook показывает все public variants Button в light и dark context.
- Browser-тесты stories проходят.
- Visual test фиксирует рабочую галерею.
- Сформулированы проверенные правила для:
  - static/консервативных foundation tokens;
  - theme context;
  - property-local conditions;
  - slot anatomy;
  - применения `compoundVariants`;
  - границы владения presets и запрета inheritance.

## Правила эксперимента

Полные правила зафиксированы в
`notes/foundation-and-preset-rules.md`.

## Ссылки

- `crystallizations/foundation-and-preset-rules.md` — итоговая crystallization
- `notes/foundation-and-preset-rules.md`
- `notes/open-questions.md` — развилки для будущих экспериментов
- `history.md`
- `raw/migration/` — исходные материалы миграции.
