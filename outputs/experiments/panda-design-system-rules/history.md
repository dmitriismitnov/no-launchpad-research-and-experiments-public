# History: Panda Design System Rules

## 2026-09-22 - Старт эксперимента

- Сформулированы цель, scope и success criteria.
- Принята архитектура: foundation, settings и каждый компонент — отдельные Panda presets.
- Зафиксированы полные правила в `notes/foundation-and-preset-rules.md`.
- Следующий шаг: установить структуру директорий и собрать presets.

## 2026-09-22 - Структура и presets

- Создана структура `src/shared/styles/{settings,foundation}` и
  `src/shared/components/button/`.
- Foundation сгруппирован по предметным областям: `layout`, `shape`, `effects`,
  `typography`; `colors.ts` владеет осью `theme`.
- Регулярная шкала: `xN = N * 0.125rem`; `spacing` и `sizes` используют одну шкалу.
- Записан `manifest.json` как декларативное описание системы.

## 2026-09-22 - Button preset, Storybook, демо

- Button перенесён в компонентный preset рядом с компонентом.
- Собраны Storybook stories: тона и размеры, light/dark, playground.
- `App.tsx` показывает галерею кнопок в двух темах.
- Unit-тесты: правила рецепта, регулярность шкалы foundation.

## 2026-09-22 - Проверки

- `mise run gen`, `check`, `check:deps`, `build`, `storybook:build` — проходят.
- Storybook browser tests: 5 stories — проходят.
- Playwright visual baseline создан для light/dark галереи.

## 2026-09-22 - Наблюдения и уточнения правил

- **preflight.** `preflight` — это `CssgenOption`, а не часть preset. Значение
  по-прежнему принадлежит `settings` (`settings/preflight.ts`), но подключается
  в корневом `panda.config.ts`. Правило скорректировано: settings владеет
  политикой, wiring остаётся техническим.
- **preset-panda.** Когда указан `presets`, Panda исключает `@pandacss/preset-panda`
  (его tokens, breakpoints, keyframes, textStyles), но оставляет
  `@pandacss/preset-base` (conditions, utilities, patterns). Это позволяет
  foundation быть единственным владельцем tokens. Плата: нет breakpoints и
  keyframes по умолчанию — для v1 приемлемо.
- **conditions.extend.** `_light`/`_dark` объявляются через
  `conditions.extend` и переопределяют встроенные `.light`/`.dark` из
  preset-base на `[data-theme="..."]`. Это декларация условия, а не component
  override; единственное касание встроенного namespace.
- **compoundVariants.** Сокращены с 6 до 3. `size` задаёт регулярный
  `paddingInline`; `compoundVariants` оставлены только для реальных пересечений:
  `icon x sm`, `icon x md` (сброс padding) и `secondary x md` (22px вместо 24px).
  Пересечения не выражаются независимым merge, поэтому правило соблюдено.
- **Static tokens + property-local conditions.** Вложенные static tokens и
  property-local `_light`/`_dark` компилируются в Panda 1.12; ключ `base` внутри
  условия работает. Модель миграции подтверждена на реальном интерфейсе.
- **Шкала.** Регулярная шкала `0.125rem` и индексы `xN` работают; тест
  foundation это фиксирует.
- **icon tone.** Label не рендерится без children, icon-only собирается через
  `prefixIcon`; story задаёт `aria-label`. Runtime accessibility contract
  по-прежнему вне v1.
- **Foundation ownership.** Тест `button.test`/`foundation.test` фиксирует
  отсутствие shorthand properties и регулярность шкалы. Shadow colors
  (`effects/shadows.ts`) вливаются в token-категорию `colors`; семантические
  elevation-shadows — кандидат на будущее уточнение.

## 2026-09-22 - Развилки вынесены в заметку

- Три открытых вопроса зафиксированы в `notes/open-questions.md`.
- Решения этой итерации: статическая модель токенов остаётся;
  breakpoints/keyframes/textStyles отложены как вне целей; elevation пока
  остаётся component-owned.
- Заметка — основа будущих экспериментов, не задача текущего.

## 2026-09-22 - Закрытие эксперимента

- Гипотеза подтверждена на single-part Button: изолированные presets
  компилируются, foundation остаётся консервативным, правила проверяемы тестами.
- Создана итоговая crystallization
  `crystallizations/foundation-and-preset-rules.md`.
- Статус изменён на `completed`; `outputs/history.md` обновлён.
- Уточнено расхождение: icon-only поддержан компонентом и gallery, но отдельная
  Storybook story не публикуется, пока нет icon foundation.
- Распространение на multipart-компоненты и responsive — будущие эксперименты.

## Открытые вопросы

См. `notes/open-questions.md`.
