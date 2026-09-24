# Эксперимент: Semantic Color Foundation

**Статус:** completed (2026-09-24).

Основной результат и source of truth — код foundation и его тесты. PEN
используется как подтверждение выразимости модели (feasibility), а не как
двусторонний источник правды; полная PEN-интеграция — отдельный последующий
эксперимент.

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
  `common`, `occasional`, `rare`, `brand`, `positive`, `negative` ×
  `50…950` × `background | text | icon | border | divider` (полная матрица,
  330 токенов);
- semantic tokens сами переключают тему (`_light` / `_dark` внутри значения);
- specialized semantic domains `overlay`, `shadow`, `data`, `decoration` как
  часть модели; в этой итерации реализуется только `shadow.*` (уже есть
  потребитель);
- миграция Button, App, foundation-галереи на новую модель;
- контрастные проверки canonical same-step пар и диагностическая mixed-step
  матрица;
- журнал расхождений с PEN-макетом как наблюдательный артефакт;
- реализация утверждённого Button-контракта и его проверка в коде;
- обновление правил, которые затрагивает смена модели.

Вне рамок:

- изменение `raw/`, включая `design_raw.pen` (immutable исторический вход);
- полная PEN-интеграция и доведение PEN Button board до принятого контракта —
  отдельный последующий эксперимент;
- наполнение `overlay`, `data`, `decoration` токенами без потребителя;
- перенос `ds/pen/paint/*` в PandaCSS;
- responsive, motion, density, typography;
- закрытие эксперимента (только по прямой команде).

PEN-роль: `assets/design_raw.pen` — versioned working copy, подтверждающая,
что та же token vocabulary, aliases и theme branches выразимы в PEN. Полнота
PEN-макета и его двусторонняя синхронизация не являются критерием успеха
этого эксперимента.

## Модель (принятые решения)

- `colors.palette.<family>.<step>` — прямые цвета, без темы.
- `opacity.<percent>` — техническая шкала, не semantic.
- `colors.semantic.<group>.<step>.<projection>` — theme-aware; значение
  ссылается на `colors.palette.*`.
- Один и тот же step внутри группы — canonical согласованный набор.
  Смешивание steps одной группы разрешено и остаётся ответственностью
  компонента.
- `50…950` — property-independent шкала вариаций, не светлота/opacity.
- Имена групп означают ожидаемую частоту системного применения, а не
  конкретный hue и не визуальную иерархию: `common`/`occasional`/`rare`
  заменяют `primary`/`secondary`/`tertiary` с сохранением цветового маппинга.
- `text` и `icon` — разные projections: `text` держит AA, `icon` допускает
  `3:1`.
- `divider` всегда тише `border` и не имеет WCAG-порога (разделитель
  layout-областей, не контент и не граница control).
- Применение семантики рекомендовано, но не обязательно: компонент может
  использовать `colors.palette.*`, literal или `color-mix()`.
- Старая модель static-пар `*.light` / `*.dark` удаляется, совместимостный API
  не сохраняется.
- `colorPalette` ограничен families палитры.
- Button реализует утверждённый контракт: opacity-модель для Primary,
  surface-feedback для Secondary/Ghost/Icon, `shadow.700`; `staticCss`
  форсирует генерацию всех публичных tone/size combinations; `size="sm"` —
  code-only extension. Это код-решение, а не заявление о полной parity с
  текущим PEN board.

## Контраст

- canonical `text` / `background` — от `4.5:1`;
- значимые `icon` / `background` и functional `border` / `background` — от
  `3:1`;
- `divider` / `background` — без минимума, но строго тише `border` в том же
  canonical context (проверяется тестом);
- намеренные исключения фиксируются с причиной; пороги и модель могут быть
  пересмотрены, если проверки покажут конфликт с дизайном;
- mixed-step сочетания — только диагностика, ответственность компонента.

## Успех

- `colors.palette.*` содержит согласованные families со шкалами `50…950`.
- `colors.semantic.*` содержит полную матрицу 6 × 11 × 5 и переключает тему.
- Panda компилирует nested semantic paths и ссылки на палитру.
- Текущие потребители переведены на новую модель; старый API удалён.
- Button реализует утверждённый state-контракт и генерирует все публичные
  tone/size combinations.
- Storybook показывает палитру, opacity, группы light/dark, canonical-пары
  (включая `divider`), диагностическую матрицу, `shadow.*` и детерминированные
  Button state matrices.
- Выразимость модели подтверждена в PEN: token vocabulary, aliases и theme
  branches переносятся в working copy; расхождения записаны в журнал; `raw/` не
  изменён.
- `mise run gen`, `check`, `check:deps`, `build`, `storybook:build`, browser и
  visual тесты проходят с осознанным пересмотром visual baseline.
- Выводы зафиксированы; эксперимент завершён 2026-09-24.

## Итог

Гипотеза подтверждена: palette-first, theme-aware semantic foundation выразим
и в PandaCSS, и в PEN; компонент сохраняет владение visual projection, а
семантика остаётся рекомендацией.

Что дало результат:

- плотная semantic-матрица `6 × 11 × 5` со ссылками на прямую палитру;
- тема переключается внутри токена, без дублирования пар;
- контрастные инварианты (text ≥ `4.5`, icon/border ≥ `3`, divider < border)
  проверяются тестом;
- Button state-контракт реализован в коде, генерация всех tone/size
  форсирована `staticCss`;
- PEN подтверждает выразимость vocabulary (feasibility), а не двустороннюю
  синхронизацию.

Урок процесса: по ходу эксперимента появилась крупная побочная работа
(адаптация PEN), которая в моменте казалась необходимой. Правильнее было
поставить эксперимент на паузу и оформить отдельную проверку: попытка вести
две цели одновременно размывает фокус. Сама идея допустима, но процесс должен
оставаться контролируемым — новую цель нужно фиксировать, а не тащить её
внутри текущего scope.

Не вошло и продолжается отдельно:

- полная PEN-интеграция —
  `outputs/shared/pen-design-system-integration/`;
- следующий цикл работ и общее ревью —
  `outputs/shared/notes/landing-system-roadmap.md`.

## Ссылки

- `notes/state.md` — текущие решения и состояние
- `notes/model.md` — полный контракт имён и ownership
- `notes/palette-rules.md` — правила палитры, шагов, opacity и расширения
- `notes/pen-mismatches.md` — расхождения с PEN-макетом
- `notes/contrast-exceptions.md` — исключения по контрасту
- `history.md`
- `../../../shared/notes/landing-system-roadmap.md` — следующий цикл после
  эксперимента
- `../../../shared/pen-design-system-integration/README.md` — отдельный трек
  PEN-интеграции
