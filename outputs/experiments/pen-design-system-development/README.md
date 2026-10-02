# Эксперимент: Разработка дизайн-системы в Pen

**Статус:** completed (2026-10-02).

## Вопрос

Может ли Pen последовательно преобразовать существующий большой canvas дизайн-системы в component-first documentation system: с отдельным фреймом на каждый компонент, полным контрактом вариантов и состояний, темами и примерами композиции?

## Цель

Проверить агентную генерацию и рефакторинг Pen-документа без изменения визуального языка: структура документации должна повторять component-scoped модель проекта, а не разделять anatomy, variants и states между общими витринами.

## Scope

В рамках:

- сохранение существующих foundation tokens, reusable masters, instances и landing screens;
- реорганизация документа в category-first / component-first иерархию;
- один самостоятельный documentation frame на компонент;
- перенос конкретных state matrices из глобальной галереи в документацию соответствующего компонента;
- общий `State model` как краткий словарь терминов и правил;
- проверка полного `tone × state` контракта Button в light и dark;
- проверка структуры canvas, использования instances, тем и отсутствия clipping;
- semantic rank и component-role contrast audits;
- inventory реальных project icons;
- responsive dashboard compositions в light/dark без изменения design system.

Вне рамок:

- реализация React/PandaCSS-кода;
- изменение `raw/`;
- изменение визуального языка или повторная разработка palette/foundation;
- реализация runtime state machines, motion или accessibility behavior в коде.

## Артефакты

- [Полный промпт для Pen-агента](pen-agent-prompt.md)
- [Reference решений для будущего prompting skill](notes/design-system-prompting-reference.md)
- [Итоги и выводы](notes/final-results.md)
- [История эксперимента](history.md)

## Успех

- В document root остаются только major frames, описанные в промпте.
- Каждый компонент имеет самостоятельный documentation frame.
- Варианты и применимые состояния конкретного компонента находятся рядом с его anatomy и usage guidance.
- Global state model не дублирует state matrices компонентов.
- Button документирует все четыре tones во всех поддерживаемых состояниях в light и dark.
- Existing reusable masters переиспользуются, а не дублируются.
- Canvas не содержит broken, collapsed или clipped layouts.
- Canonical и component-role contracts проверяются по actual resolved fills.
- Project icon inventory совпадает с public manifest и observed code usages.
- Dashboard screens собраны из existing instances для desktop/tablet/mobile и light/dark.
