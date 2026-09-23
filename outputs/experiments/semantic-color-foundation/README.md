# Эксперимент: Semantic Color Foundation

**Статус:** active.

## Вопрос

Как устроить цветовой foundation так, чтобы палитра была набором прямых
цветов без деления на темы, а поверх неё существовал плотный, широко
переиспользуемый semantic-слой, который сам переключает тему; при этом
компонент сохраняет полное владение своей visual projection, а применение
семантики остаётся рекомендованным, но не обязательным.

## Scope

В рамках:

- primitive palette `colors.palette.*` из прямых opaque цветов, family names
  только по цвету (`neutral`, `blue`, `green`, `red`, `sky`, `cyan`), шкала
  `50…950` от pivot `.500`;
- technical opacity scale `0…100` с ограниченным набором значений;
- context groups `colors.semantic.<group>.<step>.<projection>`:
  `primary`, `secondary`, `tertiary`, `brand`, `positive`, `negative` ×
  `50…950` × `background | text | icon | border` (полная матрица, 264 токена);
- semantic tokens сами переключают тему (`_light` / `_dark` внутри значения);
- specialized semantic domains `overlay`, `shadow`, `data`, `decoration` как
  часть модели; в этой итерации реализуется только `shadow.*` (уже есть
  потребитель);
- миграция Button, App, foundation-галереи на новую модель;
- контрастные проверки canonical same-step пар и диагностическая mixed-step
  матрица;
- журнал расхождений с PEN-макетом;
- обновление правил, которые затрагивает смена модели.

Вне рамок:

- изменение `raw/`, включая `design_raw.pen` (отдельный последующий шаг);
- наполнение `overlay`, `data`, `decoration` токенами без потребителя;
- responsive, motion, density, typography;
- закрытие эксперимента (только по прямой команде).

## Модель (принятые решения)

- `colors.palette.<family>.<step>` — прямые цвета, без темы.
- `opacity.<percent>` — техническая шкала, не semantic.
- `colors.semantic.<group>.<step>.<projection>` — theme-aware; значение
  ссылается на `colors.palette.*`.
- Один и тот же step внутри группы — canonical согласованный quartett.
  Смешивание steps одной группы разрешено и остаётся ответственностью
  компонента.
- `50…950` — property-independent шкала вариаций, не светлота/opacity.
- Имена групп означают ожидаемую частоту системного применения, а не
  конкретный hue и не визуальную иерархию.
- Применение семантики рекомендовано, но не обязательно: компонент может
  использовать `colors.palette.*`, literal или `color-mix()`.
- Старая модель static-пар `*.light` / `*.dark` удаляется, совместимостный API
  не сохраняется.
- `colorPalette` ограничен families палитры.

## Контраст

- canonical `text` / `background` — от `4.5:1`;
- значимые `icon` / `background` и functional `border` / `background` — от
  `3:1`;
- намеренные исключения фиксируются с причиной; пороги и модель могут быть
  пересмотрены, если проверки покажут конфликт с дизайном;
- mixed-step сочетания — только диагностика, ответственность компонента.

## Успех

- `colors.palette.*` содержит согласованные families со шкалами `50…950`.
- `colors.semantic.*` содержит полную матрицу 6 × 11 × 4 и переключает тему.
- Panda компилирует nested semantic paths и ссылки на палитру.
- Текущие потребители переведены на новую модель; старый API удалён.
- Storybook показывает палитру, opacity, группы light/dark, canonical-пары,
  диагностическую матрицу и `shadow.*`.
- Расхождения с PEN записаны в журнал; `raw/` не изменён.
- `mise run gen`, `check`, `check:deps`, `build`, `storybook:build`, browser и
  visual тесты проходят с осознанным пересмотром visual baseline.
- Выводы зафиксированы; статус остаётся active до прямой команды.

## Ссылки

- `notes/model.md` — полный контракт имён и ownership
- `notes/palette-rules.md` — правила палитры, шагов, opacity и расширения
- `notes/pen-mismatches.md` — расхождения с PEN-макетом
- `notes/contrast-exceptions.md` — исключения по контрасту
- `history.md`
