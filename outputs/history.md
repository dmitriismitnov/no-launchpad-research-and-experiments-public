# Outputs history

Operating journal of all work products. `wiki/log.md` tracks wiki changes only.

## Current experiment

Нет активного эксперимента. Последний —
[[experiments/button-icon-composition/README]] — completed (2026-09-25):
композиция `Button ↔ Icon` одним компонентом, цвет по слотам (`label` — роль
`text`, иконки — роль `icon`), `tone="icon"` удалён, приватный `_Button`
проверен и удалён. Выводы —
[[experiments/button-icon-composition/notes/retrospective]].

## Experiments

| Experiment | Subject | Status | Outcome |
| --- | --- | --- | --- |
| [[experiments/button-icon-composition/README]] | Button↔Icon composition: публичный icon-based `Button`, сравнение с приватным `_Button` | completed (2026-09-25) | Один публичный `Button` принимает `IconName`, владеет размером и семантическими цветами по слотам (`label` — роль `text`, иконки — роль `icon`); `tone="icon"` удалён; приватный `_Button` проверен и удалён. Выводы — [[experiments/button-icon-composition/notes/retrospective]] |
| [[experiments/icon-asset-component/README]] | Icon asset component: asset-классификация, SVG→font pipeline, API, навыки обновления | completed (2026-09-25) | Гипотеза подтверждена: детерминированный pipeline `SVG → WOFF2`, стабильный manifest, тонкий `Icon` (размер/цвет/a11y), навыки `build-icon-font` и `update-icon-set`, поток обновления с защитой от breaking changes. Пользователь проверил набор на 17 glyphs из design-system панели через другую сессию агента. Icon font признан рабочим для монохромного набора (прямого сравнения с inline SVG не было). Урок: повторное обсуждение согласованных решений и избыточные прогоны проверок. Выводы: [[experiments/icon-asset-component/notes/results]], [[experiments/icon-asset-component/notes/retrospective]] |
| [[experiments/semantic-color-foundation/README]] | Semantic color foundation: palette-first, theme-aware semantic layers | completed (2026-09-24) | Гипотеза подтверждена: `colors.palette.*` + `colors.semantic.*` (6×11×5), opacity, shadow; Button/App мигрированы; Button state-контракт реализован в коде; PEN подтверждает выразимость (feasibility). Урок: побочная PEN-работа размыла фокус. Полная PEN-интеграция и следующий цикл — отдельно ([[shared/notes/landing-system-roadmap]]) |
| [[experiments/panda-design-system-rules/README]] | PandaCSS visual design-system rules: foundation and Button preset | completed (2026-09-22) | Rules подтверждены для single-part Button; crystallization: [[experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules]] |
| [[experiments/color-foundation-palette/README]] | Color foundation palette: staticPalette, roles, PandaCSS projection | completed (2026-09-22) | Статическая палитра и роли работают без semantic tokens; дизайн не изменён; foundation-имена очищены; выводы: [[experiments/color-foundation-palette/notes/results]] |
