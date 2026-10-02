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
