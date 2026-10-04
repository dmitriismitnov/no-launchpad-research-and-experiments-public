# History: Pencil × OpenCode workflow

## 2026-10-02 — experiment opened (active)

- Opened the durable experiment state for the Pencil × OpenCode workflow test.
- Source Pen document is read-only; `artifacts/create-project.pen` is the only
  writable target, and it does not exist yet.
- Recorded source path, target path and the user-gate rule in `log.md`.
- Defined the Create Project design brief and the Gates A–D benchmark protocol.
- Registered the experiment as `active (2026-10-02)` in `outputs/history.md`.
- **No Pencil mutation has occurred.** No isolated Pen copy exists, and no
  review has been performed.
- Next action: inventory source contracts and create the isolated Pen copy.

## 2026-10-02 — isolated Pen copy and raw baseline

- Copied the read-only source Pen to `artifacts/create-project.pen`; source and
  copy are byte-identical (SHA-256
  `c9695a1da46e282f77d136455bee48affe8914fea96a5295db3492a126daddc2`).
- Inspected the copy with Pencil MCP using read-only queries only: 155 root
  frames, 82 reusable masters, 1720 refs, 587 variables, theme axis
  `theme: [light, dark]`, and `ctx.problems` count 0.
- Drafted `notes/pen-baseline.md` (raw facts, timestamp
  `2026-10-02T04:13:50Z`). Not yet reviewed; Task 3 is not complete.
- No Pencil mutation has occurred. Next: orchestrator code-system audit,
  evidence verification and structural review (Task 3 Steps 1–2, 4).


## 2026-10-02 — изменение модели (важно)

- У GPT-5.6 Terra исчерпаны лимиты, поэтому независимое кросс-модельное ревью стало невозможно.
- Решение: **все роли выполняет текущая модель `deepseek/deepseek-flash` (DeepSeek V4.1 Flash)** — implementation, planning, orchestration, audit и review.
- Компенсация: rubric-based evidence self-audit (каждое finding обязано ссылаться на raw Pen/code/screenshot artifact, который перепроверяется до принятия) и обязательный человеческий visual review в конце.
- Причина изменения зафиксирована в `roadmap.md` (decision 4), `log.md` и `notes/benchmark-protocol.md`.

## 2026-10-02 — Task 3 завершён

- Code-system inventory (`notes/code-system-inventory.md`) зафиксировал пять реализованных компонентов (`Button`, `ButtonIcon`, `Input`, `Card`, `Icon`), token ownership, theme mechanism и 17 canonical icon keys.
- Подтверждено расхождение code/Pen: код использует `border` + `divider`, Pen-копия — `border/subtle` + `border/strong` + `divider`; benchmark следует Pen-токенам, код не меняется.
- Baseline `notes/pen-baseline.md` перепроверен: 155 root frames, 82 masters, 1720 refs, 0 `ctx.problems`, copy hash неизменен.
- Gate A выполнен. Source-of-truth изменения не требуются.


## 2026-10-02 — Design/verification — первый проход

- Собран локальный экран `Create Project — Form — Desktop Light` (frame `x9le7`) только из existing refs (`Field`, `Button`, `Select`, `Date Input`) и semantic tokens; исходный `.pen` не изменялся.
- Найдена и записана в skill ключевая проблема: MCP не рендерит новый вложенный контент, пока фрейм не «тронут» (`Update` свойства). Без этого корректная форма выглядит пустой.
- Найдены ограничения: ref не принимает `tone`/варианты; `Date Picker` тянет календарь; `Textarea`-field ломает layout; border-свойства фрейма невалидны; несколько whole-doc сканов и `FindEmptySpace` вызывают internal interrupt.
- Структурный аудит: изоляция, refs, токены, тема — PASS; layout overlap `Actions`/`Fields` — FAIL; охват brief неполный.
- Визуальный аудит: секция не AI-slop, но неполная и с overlap → `HUMAN REVIEW`.
- Итог: частичный успех (см. `notes/results.md`). Нужна проверка в нативном Pen UI и продолжение в новой сессии.

- **Критический инцидент изоляции:** Pencil MCP применял мутации к активному документу (`design_system_ex_1.pen`), игнорируя относительный путь к копии; экспериментальные узлы попали в источник. Узлы удалены, on-disk hash источника перепроверен и не изменён. Вывод: относительный `filePath` не изолирует; копию нужно явно открыть и подтвердить активной через `get_app_state`.


## 2026-10-02 — второй проход в ex_2.pen (изоляция корректна)

- Пользователь открыл `artifacts/ex_2.pen` с копией дизайн-системы; `get_app_state` подтвердил активный редактор.
- Собраны 5 экранов из existing refs: form light (`WqoYt`), form dark (`R1Yg8`), empty/invalid (`iKbNI`), Projects entry (`XKqHF`), success (`negSS`).
- Экспортированы рендеры в `artifacts/render/`.
- Аудит: layout без overlap, токены/тема/refs — PASS; отложены validation copy и tablet/mobile.

- **Уточнение по персистентности:** повторная сборка сохранилась в `ex_2.pen` (9 271 120 → 9 291 756 байт, hash `c523c37f…`). Значит Pen пишет изменения автоматически. Прошлая потеря вызвана моей перезаписью открытого файла копией, а не отсутствием персистентности.


## 2026-10-02 — смена бренда blue → green

- В `ex_2.pen` бренд переведён на green через semantic-токены; компоненты не менялись.
- `semantic/brand/*` получили раскладку `semantic/positive`; переведены action/focus/link/surface.
- Pen contrast audit: 0 провалов; `palette/blue` больше не используется; `mise run check` зелёный.


## 2026-10-02 — реорганизация canvas

- Top-level фреймы перегруппированы в три читаемых региона: `Design System` (Foundation, assets, 02/03, компоненты 04–09), `Finished designs` (Landing 10–12, Dashboard 13–15), `Create Project flow` (5 экранов).
- Добавлены section-заголовки; дизайны отнесены правее с большим зазором от дизайн-системы; пересечений нет, компоненты не менялись.

## 2026-10-02 — промежуточные выводы (закрытие фазы Pencil workflow)

Эксперимент подтвердил саму связку, но выявил жёсткие ограничения среды. Все
выводы проверены на практике, а не выведены из предположений.

### Что подтвердилось

- Project-local skill `pencil-design-experiment` создаётся, находится и
  загружается; его references/templates читаются по необходимости и не
  раздувают контекст.
- Durable state (`roadmap`/`todo`/`log`) реально вёл работу через десятки шагов и
  пережил смену модели (GPT → DeepSeek).
- Инвентарь code/Pen контрактов, baseline и структурный аудит дают проверяемые
  факты, а не впечатления.
- Сборка экранов из existing refs и semantic-токенов возможна и даёт
  не-AI-slop результат; созданы entry/empty/filled/success + dark.
- Смена бренда на уровне токенов меняет все компоненты без правки компонентов.
- Готовые дизайны и дизайн-систему можно разнести по читаемым регионам.

### Критичные ограничения Pencil MCP

1. **Управление документом только через активный редактор.** `filePath` не
   переключает документ; `execute` всегда работает с активным. Целевой файл
   открывает пользователь, а агент обязан подтвердить его через `get_app_state`.
2. **Изоляция не автоматическая.** Первый проход писал правки в исходный
   `design_system_ex_1.pen`, потому что относительный путь не создал копию.
3. **Персистентность есть, но хрупкая.** Pen автоматически сохраняет `.pen`
   (хэш менялся), однако внешняя перезапись открытого файла (`cp`) приводит к
   перечитыванию диска и потере неподтверждённых правок. Файл нужно менять
   только через приложение и проверять хэш после работы.
4. **Render-cache.** Новый вложенный контент не появляется в
   `TakeScreenshot`/`Export`, пока фрейм не «тронуть» (`Update` свойства).
5. **ref не принимает варианты.** `tone`/variant-свойства на `ref` отклоняются;
   вариант выражается только через переопределение fill/label-токенов.
6. **Master-и не универсальны.** `Date Picker` тянет popup календаря; замена
   `Field.Control` на `Textarea` ломала layout; рамка фрейма — `cornerRadius`,
   не `borderRadius`; у `Field` Hint = `uOwyc`, Error = `ss2MJ` и Error скрыт без
   `invalid`-варианта, недоступного через `ref`.
7. **Производительность.** Несколько whole-document `Get`-сканов в одном вызове и
   `FindEmptySpace` на большом документе дают `InternalError: interrupted`;
   нужен один скан за вызов и повторное использование id.

### Смена бренда (blue → green)

- Наивная замена blue→green дала 16 контрастных провалов (белый на green/600 =
  3.30, focus green/500 = 2.28 и др.).
- Решение: `semantic/brand/*` берёт уже рабочую green-раскладку
  `semantic/positive`; `palette/green` (общий с positive) не трогается;
  action/focus/link/surface переводятся на green-шаги с проверенным контрастом.
- Итог: 0 провалов, blue-ссылок нет, компоненты не менялись. Вывод: бренд — это
  маппинг semantic-токенов, а не перекраска компонентов; отдельная brand-палитра
  лучше общей, если hue делят несколько ролей.

### Организация canvas

- Читаемая раскладка — это пространственное разделение: `Design System`
  (Foundation, assets, 02/03, компоненты 04–09), `Finished designs` (Landing
  10–12, Dashboard 13–15) и `Create Project flow`. Заголовки секций + большой
  зазор работают; перепривязка крупных фреймов под контейнер рискованна из-за
  `fill_container`.

### Оценка workflow

- Связка Pen + OpenCode пригодна для inspect, baseline, токен-работы, композиции
  и аудита. Полная автономность — нет: управление документом, сохранение и
  визуальная проверка частично зависят от нативного UI.
- Независимое кросс-модельное ревью ценно, но зависит от доступности модели;
  при исчерпании лимитов остаётся rubric-based self-audit + человеческий review.
- Главный практический вывод: **Pen-работа пригодна для дизайн-решений и
  проверки токенов, но код остаётся источником истины для продукта** — поэтому
  следующий шаг — перенос дизайн-системы в код.

## 2026-10-05 — финальное закрытие (расширенный эксперимент)

- Эксперимент закрыт документально. Итоговая ретроспектива:
  [`notes/retrospective.md`](notes/retrospective.md); `notes/results.md` помечен как
  superseded для финального закрытия.
- Расширение scope зафиксировано: `design-system-to-code` (foundation + 72
  owner-каталога + лендинг) и полная миграция Pen → код (82 masters → 72 owners),
  использующая `artifacts/ex_2.pen` как Pen-источник.
- Приёмка миграции — **ограниченная**: 82 masters сопоставлены owner-каталогам,
  но многие публичные оси остались `BLOCKED`; «COMPLETE and ACCEPTED» не равно
  полному паритету.
- Исправлены документальные ошибки (с сохранением истории, см. ретроспективу §7):
  - 63-символьный SHA Pen в closure миграционного плана → корректный 64-символьный
    `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`;
  - `test:visual` post-change прогон в §9 batch-e помечен неверно; post-fix
    `check`/`check:deps`/`build` не подтверждены сохранёнными логами;
  - refresh базлайнов обоснован размером файла, без per-cluster инспекции;
  - «источник никогда не мутировался» уточнено: in-editor документ был
    транзиентно изменён и очищен, дисковый hash не менялся;
  - «independent review» в B/C/D — та же модель (DeepSeek V4.1 Flash), не
    кросс-модельная независимость;
  - cache/already-existing bias как причина пропуска destructive Button — не
    установлена (только наблюдение).
- Не достигнуто (не засчитано success): inline validation copy, tablet/mobile,
  реальный new-session handoff test; явный пользовательский `accept` не
  зафиксирован.
- Связанный эксперимент `design-system-to-code` закрыт как отдельный поток.
- commit/merge/push на момент написания не выполнялись (решение о коммите
  авторизованной документации — за пользователем); `outputs/shared/notes/**`, production, skills и `.pen`
  не изменялись.

## 2026-10-05 — уточнение: correction plan входит в ревью

- Пользователь уточнил вывод о планировании/ревью: ревьюер по итогам ревью
  сразу пишет **ограниченный correction plan** (план исправления findings).
  Предложение не относится к объединению общего task plan и ревью;
  отдельный Correction Planner в обычном correction-цикле не требуется.
- Ожидаемый цикл: **Builder → Reviewer (findings + bounded correction plan) →
  Builder → Reviewer**. Отдельный Correction Planner нужен только при новой
  архитектуре/смене scope/конфликтующих требованиях (при необходимости — human
  gate). Смена модели builder при этом не подразумевается; предложение о дешёвом
  механическом оркестраторе/контроллере остаётся отдельным и в силе.
- Прежняя критика «planner-review anchoring» в ретроспективе — **агентская
  ошибка интерпретации**; замечание отозвано. См. `notes/retrospective.md` §5.4
  (а также исправленные §5.1 п.5, §5.2, §6.3, §8.2, §9 п.10).

## 2026-10-05 — локальная интеграция в main (авторизована пользователем)

- Пользователь запросил слияние экспериментальной ветки в основную и закрытие ветки.
- Перед интеграцией: `mise run check` — 840 unit / 724 browser, `mise run test:visual` — 7/7, `mise run check:deps` и `mise run build` — exit 0.
- Итоговая документация и уточнение correction-plan включаются в коммит; пользовательские `outputs/shared/notes/*` остаются вне коммита.
- Цель — локальный `main`; push не выполняется. Результат слияния и проверки на `main` фиксируется в сообщении завершения.
