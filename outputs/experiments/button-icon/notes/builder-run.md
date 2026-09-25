# ButtonIcon — прогон билдера

Свидетельство о прогоне агента-билдера. Оценка автономности и решение о
закрытии здесь намеренно не выносятся.

## Условия прогона

- Дата: 2026-09-25.
- Ветка: `experiment/button-icon`, коммит эксперимента `3238d43` (от `main`
  `b1f3c62`).
- Механизм: отдельный агент-билдер в чистом контексте (субагент), сессия
  `ses_f27388c98ffe39JOM6bSSIzihx`.
- Билдеру передано только исходное задание: реализовать `ButtonIcon` из
  существующих деталей проекта, самостоятельно вывести API, оформление и
  композицию. Критерии наблюдения и оценка автономности билдеру не передавались.
- Границы, заданные билдеру: не изменять `outputs/`, не закрывать эксперимент.

## Задание билдеру

> Реализуй компонент `ButtonIcon` — кнопку с иконкой без видимого текста — из
> существующих деталей проекта.
>
> 1. Самостоятельно изучи текущие правила, заметки и код репозитория.
> 2. На их основе определи API, внешний вид, поведение, способ композиции и
>    место компонента в проекте.
> 3. Реализуй компонент, его демонстрацию и необходимые проверки в соответствии
>    с принятыми в проекте требованиями.
> 4. При неоднозначностях сначала ищи ответ в репозитории. Если ответа нет,
>    принимай обоснованное решение и отмечай допущение. Если продолжение требует
>    решения пользователя, задай конкретный вопрос.
> 5. Соблюдай действующие правила проекта, включая обязательные согласования и
>    проверки.

## Фактическое состояние после прогона

- Работа билдера **не закоммичена**: в ветке только коммит эксперимента
  `3238d43`. Все изменения остались в рабочей директории.
- Изменённые файлы (незакоммичено):
  - `M src/app/App.tsx`
  - `M src/shared/styles/index.ts`
  - `M panda.config.ts`
  - `M knip.jsonc`
  - `M test/visual/__snapshots__/landing.spec.ts-snapshots/landing-chromium-darwin.png`
  - `?? src/shared/components/button-icon/` (новый модуль)
- `outputs/`, `wiki/`, `raw/` билдер не трогал.

## Отчёт билдера (сохранён как получен)

### Что реализовано

Добавлен самостоятельный компонент `ButtonIcon` — кнопка с иконкой без
видимого текста.

**Новые файлы** (`src/shared/components/button-icon/`):

- `button-icon.tsx` — компонент.
- `preset.ts` — `buttonIconRecipe` + `buttonIconPreset`.
- `index.ts` — публичный barrel.
- `ButtonIcon.stories.tsx` — демонстрация (10 историй, включая play-проверки).
- `ButtonIcon.test.ts` — контрактные тесты рецепта (15).
- `ButtonIcon.composition.test.tsx` — тесты рендера/типов (7).

**Изменённые файлы:**

- `src/shared/styles/index.ts` — регистрация пресета.
- `panda.config.ts` — `staticCss` для `buttonIcon`.
- `knip.jsonc` — entry для нового модуля.
- `src/app/App.tsx` — демонстрация (по одному `ButtonIcon` каждого tone в обеих
  темах).
- `test/visual/__snapshots__/.../landing-chromium-darwin.png` — baseline
  обновлён осознанно.

### API и поведение

- `ButtonIconProps = Omit<ComponentProps<"button">, "children"> & { icon: IconName; label: string; tone?: "primary"|"secondary"|"ghost"; size?: "sm"|"md" }`.
- Рендерит нативный `<button>`: атрибуты, события, `ref`, `disabled`, `type`
  сохраняются. `label` обязателен и становится `aria-label`; глиф декоративный и
  имя не дублирует.
- Компонент сам владеет размером иконки (таблица `ButtonIconSize → IconSize`,
  обе → `sm`) и её цветом (роль `icon`), потребитель их не выбирает.
- Рецепт — отдельный `defineSlotRecipe` `root`/`icon`: квадрат `x16`/`x25`
  (совпадает с высотой `Button` того же размера), слот иконки `x8`, те же
  tone-контракты, что у `Button` (opacity-only primary, surface-feedback
  secondary/ghost, фокус-кольцо, disabled).

### Источники ключевых решений

- `Button.test.ts` / `Button.composition.test.tsx` — прямые утверждения
  «icon-only buttons get a dedicated component», запрет `tone="icon"`.
- `outputs/experiments/button-icon-composition/notes/retrospective.md` — `tone` —
  ось оформления; связь размера принадлежит кнопке; отдельный слой оправдан лишь
  конкретной ответственностью.
- `wiki/button.md` и
  `raw/.../design_system_v1_panda_pen_example/src/theme/button.recipe.ts` —
  исходный `icon`-tone.
- `wiki/panda-rules.md` и crystallization `foundation-and-preset-rules.md` — один
  компонент = один recipe, slots = anatomy, longhand, цвет по слотам, изоляция
  пресетов.
- `.agents/project.md` — компонент сам владеет anatomy/variants/visual-rules;
  asset vs visual компоненты.
- `outputs/experiments/button-icon/README.md` — критерии успеха.
- `AGENTS.md`, `.agents/tooling.md`, `.agents/workflows.md` — обязательные
  команды/проверки.

### Переиспользовано

`Icon`/`IconName`/`IconSize`; семантические роли
(`common.*.icon`/`text`/`background`/`divider`); foundation-токены
(`x8/x16/x25`, `radii.sm`, `borderWidths.thick`, `shadow.700`); контракты и
политики `buttonRecipe`; `cx` и доступ к рецепту из `styled-system`; паттерны
тестов/историй из Button (`renderToStaticMarkup`, `@ts-expect-error`,
`ThemeShell`, role-probe, state-matrix, `RefForwarding`).

### Допущения

1. `theme.extend` в новом пресете — чтобы второй slot-recipe не вытеснил Button.
2. Набор осей `tone`/`size` взят как у `Button`; явного источника именно для
   `ButtonIcon` нет.
3. Квадрат = высота `Button` (`x16`/`x25`), слот иконки `x8` в обоих размерах.
4. Доступное имя — обязательный `label` → `aria-label` (в `wiki/button.md` это
   было отложено в «future behavior layer»).
5. Демонстрация в `App.tsx` — в рамках эксперимента; прочие потребители не
   мигрировались.

### Проверки (фактические результаты по отчёту билдера)

- `bun test` по каталогу `button-icon` + `button` — 43 pass / 0 fail.
- `mise run check` — 98 unit pass / 0 fail; 26 browser pass / 0 fail
  (ButtonIcon.stories: 10).
- `mise run check:types` — pass.
- `mise run check:lint` — pass.
- `mise run check:format` — сначала 1 unformatted (`App.tsx`); после
  `fix:format` — pass.
- `mise run check:deps` (Knip) — pass.
- `mise run build` — success (42 модуля, CSS 62.25 kB).
- `mise run storybook:build` — success.
- `mise run test:visual` — до обновления: 5599 px (~1%) diff, только 3 новых
  `ButtonIcon` в обеих темах (diff просмотрен); после `test:visual:update` —
  pass.

### Блокеры, вопросы, ограничения (по отчёту билдера)

1. Пробел Panda, найденный по ходу. Panda shallow-мержит `theme` между
   пресетами: второй прямой `theme.slotRecipes` заменяет рецепт Button. Нужно
   решение пользователя: (а) узаконить `theme.extend` как механизм сборки
   пресетов (и, вероятно, перевести на него Button/Icon), либо (б) собирать
   рецепты в один пресет в точке `styles/index.ts`. Пока сделан минимальный
   локальный workaround; третий компонент с рецептом упрётся в то же.
2. Выбор осей `ButtonIcon` (3 tone × 2 size) — допущение, требует
   дизайн-подтверждения.
3. Обновление visual-baseline — намеренное, требует ревью.
4. Вне покрытия: клавиатурная активация отдельным сценарием (полагается на
   нативный `<button>`), motion/density в системе отсутствуют.
5. `outputs/` не изменялись; итоговая оценка автономности и закрытие — не его.

### Пробелы/противоречия в материалах (по отчёту билдера)

- Crystallization прямо оговаривает, что правила проверены на одном single-part
  компоненте; multipart и второй компонент не проверялись — это первый случай, и
  он вскрыл проблему слияния пресетов.
- Правило 8 запрещает `extends`, но штатная сборка нескольких пресетов в Panda
  требует `theme.extend` (или агрегации) — противоречие, не покрытое заметками.
- Сырой PEN `icon`-tone (квадрат `x32`, «мягкий ink») расходится с текущим
  foundation: роли мягкого ink нет, `Button md` = `x25`. Согласовано с текущим
  `Button`, а не с PEN.
- `wiki/button.md` откладывал доступное имя icon-only в «будущий behavior-слой»;
  реализовано на уровне API компонента.
