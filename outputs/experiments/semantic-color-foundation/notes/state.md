# State And Decisions

Снимок текущих решений и состояния эксперимента. Обновлять по ходу работы;
хронология — в `../history.md`, правила — в соседних заметках.

**Дата:** 2026-09-24. **Статус:** completed (2026-09-24).
**Ветка:** `experiment/semantic-color-foundation`.

## Реализованные решения

Три уровня цветов:

1. `colors.palette.<family>.<step>` — primitive, opaque, без темы.
   Families: `neutral`, `blue`, `green`, `red`, `sky`, `cyan`; шаги `50…950`
   (`PALETTE_STEPS`), pivot — `.500`.
2. `opacity.<percent>` — technical шкала
   `0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100`; не semantic.
3. `colors.semantic.<group>.<step>.<projection>` — theme-aware; значение
   переключает тему внутри токена (`_light` / `_dark`) и ссылается на
   `colors.palette.*`.

Context groups (полная матрица `6 × 11 × 5` = 330 токенов):

- группы: `common`, `occasional`, `rare`, `brand`, `positive`, `negative`;
- проекции: `background`, `text`, `icon`, `border`, `divider`;
- `common`/`occasional`/`rare` — neutral со сдвигом шага `0/1/2` и
  переименованные `primary`/`secondary`/`tertiary`; смысл — частота
  применения, не акцент;
- `brand`/`positive`/`negative` — `blue`/`green`/`red`;
- один step — canonical согласованный набор; смешивание steps разрешено;
- `divider` всегда тише `border` (проверяется тестом) и без WCAG-порога.

Specialized domains: `overlay`, `shadow`, `data`, `decoration` — часть модели.
Реализован только `colors.semantic.shadow.100…800` (values из старых
`shadow1…8`, сохранены 1:1). Остальные — без токенов до потребителя.

Правила:

- палитра — прямые цвета, family names только по цвету; `brand`/`danger` в
  primitive palette запрещены;
- палитра строится от pivot «по науке», а не копирует PEN 1:1; расхождения —
  в `pen-mismatches.md`;
- semantic — рекомендованный, но не обязательный путь; компонент может брать
  palette, literal или `color-mix()`;
- ownership: `settings` — `preflight`/`globalCss`; `foundation` — palette,
  opacity, semantic, conditions; component preset — только свой рецепт;
- `colorPalette.include: ["palette.*"]`;
- контраст: canonical `text/background` ≥ `4.5:1`, `icon`/functional `border`
  ≥ `3:1`; mixed-step — только диагностика.

## Состояние реализации

Файлы:

- `src/shared/styles/foundation/colors/palette.ts` — palette + `paletteValues`;
- `src/shared/styles/foundation/colors/opacity.ts`;
- `src/shared/styles/foundation/colors/semantic.ts` — один литеральный объект
  `semanticColors`, без расчётной логики;
- `src/shared/styles/foundation/colors/colors.ts` — только `themeConditions`;
- `src/shared/styles/foundation/preset.ts` — `tokens` + `semanticTokens`;
- `src/shared/utils/contrast.ts` — WCAG-утилиты (не foundation);
- генератор палитры: `../tools/generate-palette.ts`.

Потребители переведены на semantic: Button, `App.tsx`, `global-css.ts`,
`Button.stories.tsx`, `Colors.stories.tsx`. Старая модель static-пар и
`effects/shadows.ts` удалены.

## Button contract (код)

Основной результат — код. PEN используется как feasibility-референс, а не как
двусторонний source of truth.

- Primary: opacity-модель: hover `0.85`, active `0.70`, disabled `0.45`;
  fill `semantic.common.50.text`, без border.
- Secondary/Ghost/Icon: surface-feedback: hover `common.100.background`,
  active `common.200.background`, disabled `0.45`.
- Primary/Secondary/Ghost: `shadow.700`; Icon — без shadow.
- Общий focus ring: `blue/500`, outer, `outlineOffset: 0`.
- Hover/active ограничены condition `_enabled`, чтобы Storybook-состояния
  (`[data-hover]`/`[data-active]`) не перекрывали disabled; селекторы
  `:disabled` и `:enabled` и так взаимоисключающие.
- `size="sm"` — code-only extension: PEN определяет только 50px `md` Button.
- Panda `staticCss` в `panda.config.ts` форсирует генерацию всех публичных
  tone/size combinations, потому что `tones.map(...)` не раскрывается
  статически.

PEN-coverage на текущий момент: token vocabulary, aliases и theme branches
перенесены в `assets/design_raw.pen`; Primary states присутствуют. Secondary/
Ghost/Icon states, Ghost spec card и выравнивание live Secondary sample в PEN
не доведены — это следующий эксперимент, а не результат foundation-модели.

## Проверки

- `mise run check`, `check:deps`, `build`, `storybook:build` — проходят;
- unit 18 (8 foundation + 10 Button; инвариант `divider < border`),
  browser 7;
- Playwright visual: baseline обновлён после Button work и повторный прогон
  зелёный;
- canonical same-step: исключений нет (`contrast-exceptions.md`);
- `divider` во всех `6 × 11 × 2` контекстах тише `border` (проверяется тестом).

Коммиты: `609d4ca` (feat styles), `8eec671` (docs outputs).

## Найденные пробелы модели

- `text` всегда near-black/white → мягкий `ink.soft` берётся как
  `.background` среднего шага;
- тихая линия решена проекцией `divider`; сильная `line` по-прежнему берётся
  как `.background` более тёмного шага;
- `transparent` не входит в canonical набор — остаётся literal.

## Рассмотрено и отложено

- **State layers** (MD3-подход: hover 8%, focus/pressed 10%, dragged 16% как
  полупрозрачный слой контент-цвета) — решили не вводить. У Button hover
  сейчас меняет сам semantic context (например, neutral → brand), и blanket
  overlay не является заменой один-в-один. При необходимости вернуться к
  этому отдельно.
- **`surface`-домен** — не вводим: `background` уже означает фон конкретного
  контекста, поэтому термин `surface` дал бы коллизию. Отдельные уровни
  плоскостей появятся только с реальным потребителем и под другим именем.
- **`inverse`/`scrim`/`data`/`decoration`** — часть модели, токены не
  создаются без потребителя.
- **Small API поверх матрицы** (узкий набор ролей для компонентов) — пока не
  вводим: нужен реальный компонент, чтобы подтвердить набор.

## Открытые вопросы / следующий шаг

- полная PEN-интеграция и Button board synchronization (`pen-mismatches.md`) —
  отдельный эксперимент; в этом эксперименте PEN подтверждает feasibility;
- crystallization правил в `wiki/` (правило «только static tokens» сейчас
  противоречит модели) — по прямой команде;
- наполнение `overlay`/`data`/`decoration` только с реальным потребителем.
