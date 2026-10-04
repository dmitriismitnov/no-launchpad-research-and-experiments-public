# Ретроспектива: Pencil × OpenCode workflow и расширенная миграция Pen → код

**Дата закрытия:** 2026-10-05.
**Статус:** эксперимент закрыт (документальное закрытие). Commit/merge/push на
момент написания не выполнялись; коммит авторизованной документации остаётся за
пользователем.
**Автор ретроспективы:** DeepSeek V4.1 Flash (субагент-аудитор).
**Область:** «эксперимент + расширение» — исходный Pencil × OpenCode workflow и
связанный поток переноса Pen-дизайн-системы в код (design-system-to-code →
full Pen component migration).

**Граница аудита:** это ревью **durable-записей и артефактов**, а не первичный
аудит транскрипта. Первичные чат-сессии и сырые tool-выводы в reviewed durable
state не входят; там, где факт подтверждается только разговором, он явно
помечен как **conversation evidence** (см. §3).

---

## 0. Как читать этот документ

Это финальная ретроспектива. Она **не переписывает историю**: все прежние
утверждения сохраняются, спорные или ошибочные помечаются как
`superseded`/`corrected` со ссылкой на корректный факт. Модель работы —
WIKI_LLM.md:30-38 и WIKI_LLM.md:98-104 (supersession, конфликты, запрет
молчаливого удаления).

Ретроспектива фиксирует четыре уровня:

1. **Что было нужно** — исходная гипотеза и критерии успеха.
2. **Что достигнуто** — с границей «достигнуто ограниченно».
3. **Что не достигнуто / отложено / отменено / вне scope.**
4. **Контроли следующей итерации** — приоритизированные.

**Конвенция цитирования.** Пути вида `notes/*.md`, `batch-*.md`, `history.md`,
`log.md`, `todo.md`, `roadmap.md`, `results.md`, `visual-review.md`,
`structural-audit.md`, `landing-parity-evidence.md`, `benchmark-protocol.md`
указывают на файлы эксперимента
`outputs/experiments/pencil-opencode-workflow/`, если не задан полный путь.
Файлы вне эксперимента всегда приводятся полным путём.

---

## 1. Исходная гипотеза и расширение scope

Исходный эксперимент (`README.md` §Hypothesis) проверял **workflow, а не продукт**:
способен ли project-local OpenCode skill вести Pencil MCP работу предсказуемо и
code-aware, собрать новый Create Project flow из существующей дизайн-системы
без «AI slop», с durable state, изоляцией артефакта и независимыми ревью.

Критерии успеха (README.md §Success criteria) включали, среди прочего:

- persistent state без скрытых решений;
- Create Project, собранный из существующих контрактов;
- воспроизводимые structural/contrast/code-alignment отчёты;
- **восстановление checkpoint/handoff в новой сессии без потери состояния**
  (`README.md` §Success criteria);
- независимые ревью, проверенные по артефактам;
- **принятие финального визуального ревью пользователем** (`README.md` §Success criteria);
- skill, пригодный для сопоставимой будущей задачи.

Затем scope **расширился за пределы исходной гипотезы** — в отдельный, но
связанный поток:

- `design-system-to-code` (status — `outputs/experiments/design-system-to-code/README.md`;
  early history — `outputs/experiments/design-system-to-code/history.md:3-13`) — перенос foundation и
  компонентов Pen в код, затем лендинг как проверка;
- `docs/superpowers/plans/2026-10-03-full-pen-component-migration.md` — полная
  миграция всех 82 masters, spec
  `docs/superpowers/specs/2026-10-03-full-pen-component-migration-design.md`.

Именно расширенный поток дал основной объём работы, и он же использовал
`outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` как Pen-источник
(batch-a-evidence.md:5; blueprint — migration spec).

---

## 2. Краткая хронология

| Дата       | Событие                                                                                                                                                 | Ссылка                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| 2026-10-02 | Открыт эксперимент, durable state, skill `pencil-design-experiment`; baseline.                                                                          | history.md:3-41                   |
| 2026-10-02 | GPT лимиты исчерпаны → все роли на `deepseek/deepseek-flash`; кросс-модельное ревью заменено rubric-based review + человеческим ревью (в исторических записях названо self-audit; фактически — отдельные session/context-проверки, не обязательно проверка собственной работы).                | history.md:29-34; roadmap.md §Decisions   |
| 2026-10-02 | Инцидент изоляции: MCP писал в активный исходный `.pen`; узлы удалены; диск-хэш не изменился.                                                            | history.md:53; log.md:70          |
| 2026-10-02 | Второй проход в `ex_2.pen`: 5 экранов Create Project; подтверждена персистентность; исправлен вывод про потерю.                                         | history.md:56-63                  |
| 2026-10-02 | Смена бренда blue → green на уровне токенов; 0 контрастных провалов.                                                                                    | history.md:66-70                  |
| 2026-10-02 | Промежуточное закрытие фазы Pencil workflow; вывод «Pen пригоден, код — источник истины».                                                               | history.md:78-148                 |
| 2026-10-02…03 | `design-system-to-code`: foundation, 72 каталога компонентов, лендинг; затем visual parity phase 1.                                                  | `outputs/experiments/design-system-to-code/history.md` |
| 2026-10-03 | Landings remediation: измеренные geometry-дельты закрыты (`8120b31`), затем mobile CTA regression (`0633e4c`).                                          | landing-parity-evidence.md:133-266 |
| 2026-10-03…05 | Full migration batches A, B0, B, C, D; evidence-ledgers.                                                                                              | batch-{a,b0,b,c,d}-evidence.md    |
| 2026-10-05 | Batch E reconciliation и финальная регрессия; §9-§10 acceptance; планы закрыты `de04673`.                                                              | batch-e-evidence.md; de04673      |
| 2026-10-05 | Документальное закрытие и эта ретроспектива.                                                                                                            | —                                 |

---

## 3. Evidence scope — что реально проверено, а что нет

**Характер аудита.** Проведён обзор **durable-записей** (файлы, артефакты, git),
а не первичный аудит транскрипта сессий. Первичный чат/сырой tool-вывод
существует, но в reviewed durable state не хранится. Где факт опирается только
на разговор, он помечен ниже как *conversation evidence* и не приравнивается к
durable-логу.

### 3.1 Durable repo evidence (проверено)

- durable state эксперимента: README, roadmap, todo, log, history;
- evidence-ledgers: batch-a/b0/b/c/d/e, landing-parity-evidence,
  structural-audit, visual-review, pen-baseline, code-system-inventory;
- планы и спеки `docs/superpowers/**`;
- SDD-отчёты `.superpowers/sdd/2026-10-02-pencil-opencode-workflow/**`;
- артефакты (PNG, JSON, логи команд) и git-история (коммиты, даты, diff);
- отчёты `outputs/experiments/design-system-to-code/notes/batch1..13-report.md`
  и parity-phase-1.

### 3.2 Conversation evidence (не durable-лог)

Из переданного родительской сессией транскрипта, **без сохранённого repo-лога**:

- пост-Landing-change `mise run check` → `EXIT 0`, 840 unit / 724 browser;
- пост-change `test:visual`: первый прогон падает только на скриншотах
  (`screenshots-only`), затем `test:visual:update` → 7 pass, повторный
  `test:visual` → 7 pass;
- пост-fix `check:deps` и `build` **не показаны** нигде (ни как лог, ни как
  conversation evidence).

Эти факты **поддерживают** `batch-e-evidence.md` §9, но не заменяют durable-лог;
именно поэтому §9 там помечен «частично подтверждён» (см. §7.2).

### 3.3 Что НЕ проверялось и не должно утверждаться

- **Нет сплошного raw-session/token-аудита**: точные токенные затраты и
  стоимость не хранятся; любые выводы о «избыточных лимитах» — восприятие
  пользователя, а не измеренная величина. Бенчмарков и cost-замеров здесь нет.
- **Нет полного per-cluster pixel-attribution** лендинг-базлайнов (§7.3).
- **`HUMAN REVIEW` записи** (reviews, residual deltas) — открытые пункты, не PASS.
- **Отсутствие сырого лога ≠ тест не запускался и не падал.** Проверки,
  показанные как conversation evidence (check, test:visual), считаются
  выполненными; недоказанными считаются только те, что не показаны ни логом, ни
  разговором (post-fix `check:deps`/`build`).
- **Отсутствие записанного resume ≠ resume невозможен.** Контролируемый
  real-session resume просто не подтверждён в reviewed durable state (§4.4).

---

## 4. Нужно / достигнуто / не достигнуто / отменено / вне scope

### 4.1 Что было нужно (need)

- Проверить управляемость Pen через OpenCode/MCP как workflow.
- Собрать Create Project flow из существующих контрактов.
- Обеспечить durable state, изоляцию, воспроизводимые проверки,
  handoff/human gate.
- Затем — перенести Pen-дизайн-систему в код с проверяемой приёмкой.

### 4.2 Достигнуто (achieved)

- Skill `pencil-design-experiment` создан, обнаруживается и загружается;
  references/templates читаются по требованию (results.md §Evidence for; log.md:33).
- Durable state реально вёл работу через десятки шагов и пережил смену модели
  (results.md §Evidence for; history.md:88-89).
- Code/Pen инвентарь, baseline и структурный аудит дали проверяемые факты
  (code-system-inventory.md; pen-baseline.md; structural-audit.md).
- Пять экранов Create Project собраны из existing refs и semantic-токенов
  (`WqoYt`, `R1Yg8`, `iKbNI`, `XKqHF`, `negSS`), light/dark (results.md §Second pass).
- Смена бренда blue → green выполнена на токенах, 0 контрастных провалов,
  компоненты не менялись (results.md §Смена бренда).
- Расширение: 82 Pen masters → 72 owner-каталога; каждый owner имеет story и
  focused test (batch-e-evidence.md §2, §10).
- Документированные команды миграции проходят; пост-fix `check` (840/724) и
  `test:visual` (update + rerun 7 pass) подтверждены как **conversation
  evidence** (batch-e-evidence.md §9–§10; §3.2); post-fix `check:deps`/`build`
  логом не подтверждены.
- Лендинг собран в light/dark и responsive
  (`outputs/experiments/design-system-to-code/history.md:76-88`;
  landing-parity-evidence.md:158-170).

### 4.3 Достигнуто ограниченно (achieved bounded)

- «COMPLETE and ACCEPTED» миграции — это **ограниченная** приёмка: 82 masters
  сопоставлены owner-каталогам, но многие публичные оси остались `BLOCKED`
  (batch-e-evidence.md §3). Это не полный поведенческий/визуальный паритет.
- Ревью в батчах B/C/D выполнены **той же моделью** `DeepSeek v4.1 Flash`, что и
  сборка (batch-c-evidence.md:1102, 1114; batch-d-evidence.md:1207, 1218). Это
  даёт process/context-независимость (отдельная сессия, повторный запрос
  артефактов), но **не кросс-модельную** независимость; это не обязательно
  self-audit — независимый артефактный контроль возможен и на одной модели.

### 4.4 Не достигнуто / отложено (deferred / unmet)

- **Явная inline validation copy** — `blocked`: `ref` не задаёт `invalid`-вариант
  `Field` (todo.md §Blocked / deferred; structural-audit.md:28).
- **Tablet и mobile** Create Project — `planned`, не собраны (todo.md §Blocked / deferred;
  structural-audit.md:29; visual-review.md:23).
- **Controlled real-session resume** — `planned`; контролируемый реальный resume
  в новой сессии **не подтверждён в reviewed durable state** (todo.md §Blocked / deferred;
  README.md §Success criteria). Это один из критериев успеха — **не доказан**.
- **Человеческое принятие финального визуального ревью** — статус `HUMAN REVIEW`
  (visual-review.md:3, 37-41); явного `accept` в durable state нет, а запрос на
  закрытие эксперимента — не то же самое, что визуальная приёмка.
- **Свежий исчерпывающий screenshot-шаг Batch E** — не выполнен; per-batch
  computed-style и PNG остаются основным per-master свидетельством
  (batch-e-evidence.md §7).
- **Foundation `font/mono` (IBM Plex Mono)**, tracking units, Asset Icon Tile
  22px vs 20px, Rating size prop, Tab absolute indicator bounds — `HUMAN REVIEW`
  (batch-e-evidence.md §3).
- **Лендинг dark parity в Pen** — невозможно: dark-фреймов лендинга нет
  (landing-parity-evidence.md:23-35, 155-156).
- **Residual лендинг section deltas и mobile clipping** — `HUMAN REVIEW`
  (landing-parity-evidence.md:225-250).

### 4.5 Отменено / остановлено (cancelled / stopped)

- Исходный **мульти-модельный протокол** (GPT planner/reviewer + DeepSeek
  builder) был **заменён** single-model режимом из-за лимитов GPT
  (history.md:29-34; roadmap.md §Decisions). Это замена режима, а не отмена
  результатов.
- Для данного прогона **остановлены/не продолжены** responsive-варианты и
  new-session handoff test (перенесены в deferred, §4.4), а не «отменены» как
  фичи.
- Ошибочные промежуточные выводы **отозваны, а не отменены как задачи**:
  «MCP не сохраняет на диск» (§7.4) и «источник никогда не мутировался» (§7.5).

### 4.6 Вне scope (outside scope)

Различаются исходные исключения порта и авторизованное поведение миграции.

- **Исходный порт `design-system-to-code`** вне scope: runtime behavior, state
  machines, motion; dashboard; перенос всех ~70 компонентов в том проходе
  (`outputs/experiments/design-system-to-code/README.md` §Scope).
- **Поздняя миграция** явно **включила** interaction/accessibility поведение,
  если оно документировано Pen (`docs/superpowers/specs/2026-10-03-full-pen-component-migration-design.md`).
  Вне scope осталось runtime, **не** документированное мастером: persistence,
  networking, routing, validation rules, animations без master-описания.
  Поэтому «runtime вне scope» неверно применять ко всей миграции.
- Изменение Pen-документов (в миграции — только read-only).
- Токенные затраты/бенчмарки производительности — не измерялись.

---

## 5. Выводы пользователя (зафиксированы дословно по смыслу) и критическое сопоставление

Ниже — выводы пользователя, записанные **верно**, затем — критическое сравнение
с evidence.

### 5.1 Формулировки пользователя

1. **PEN/MCP и оркестрация — полезны.** Следующий чистый проект должен сравнить
   creative design через OpenCode против прямого Pen, включая нативные Pen skills.
2. **Destructive Button был пропущен даже после запроса «все компоненты», пока не
   назван явно.** Гипотеза пользователя: bias кэша/«уже существующего» обновления.
3. **Мощные границы дизайна и skill-MCP неизвестны.**
4. **Оркестрация сильна, удержание контекста хорошее, но лимиты воспринимаются
   избыточными.**
5. **Планирование и ревью — умной моделью (одной и той же); оркестратор/
   контроллер — дешёвым и быстрым.** (Про дешёвого builder в этом сообщении речи
   не было; builder может оставаться отдельным/независимым опционально.)
   Уточнение 2026-10-05: та же умная модель-ревьюер по итогам ревью пишет
   **ограниченный correction plan** (план исправления findings), а не общий
   task plan. Это не то же самое, что «planner сам ревьюит свой общий план»,
   и не отдельная роль Correction Planner (см. §5.4).
6. **Ревью должно классифицировать must-fix vs backlog vs human review.**
7. **Плагины могут дать детерминированный workflow + логи.**
8. **Portable textual spec переносим между harness-инструментами.**

### 5.2 Критическое сопоставление

| Вывод пользователя | Что подтверждает evidence | Слабое место / что не доказано |
| --- | --- | --- |
| PEN/MCP и оркестрация полезны | skill, durable state, baseline, композиция, аудит (results.md §Evidence for/against); 82 master→owner (batch-e-evidence.md §10) | Полезность подтверждена как **workflow-инструмент**, не как автономный дизайнер: управление документом, сохранение и визуальная проверка частично зависят от нативного UI (history.md:141-148). |
| Нужен чистый проект OpenCode vs прямой Pen + native skills | `outputs/experiments/pen-design-system-development/notes/final-results.md:19-22, 287-299` прямо называет это критичной следующей проверкой | Сам сравнительный прогон **не проводился**; это proposal, не результат. |
| Destructive пропущен, гипотеза cache/existing bias | Факт: в phase 1 destructive помечен «not implemented» (`outputs/experiments/design-system-to-code/notes/parity-phase-1/evidence.md:56`), добавлен лишь в B0 (batch-b0-evidence.md:65, 152) | **Причинная связь с cache/already-existing bias НЕ установлена.** Есть только наблюдение пропуска; механизм не доказан. Render-cache инцидент существует отдельно (history.md:108-109; structural-audit.md:35), но он про невидимость нового контента, а не доказанная причина пропуска. |
| Границы design/skill-MCP неизвестны | Зафиксированы жёсткие ограничения: активный редактор, `ref` не принимает варианты, master-и не универсальны (history.md:97-118) | «Неизвестны» корректно как «не полностью картированы»; часть границ уже известна и документирована. |
| Оркестрация сильна, контекст держится, лимиты избыточны | durable state пережил смену модели, handoff-протокол (results.md §Evidence for; benchmark-protocol.md:86-94) | «Избыточные лимиты» — **восприятие, не измерение**: raw-session/token-аудита нет. Нельзя приводить как метрику. |
| Умный planner/reviewer + дешёвый оркестратор/контроллер | Разделение ролей реально применялось (planner/builder/reviewer в планах) | **Proposal, не проверенный результат.** Уточнение 2026-10-05 (см. §5.4): ожидаемый цикл — Builder → Reviewer (findings + ограниченный correction plan) → Builder → Reviewer; reviewer пишет correction plan **после** ревью, а не общий task plan. Прежняя критика «planner-review anchoring» построена на неверной интерпретации и **отозвана**. Остаточный риск — привязанность ревьюера к собственному prescribed fix; повторное ревью оценивает устранение дефекта, тесты и отсутствие регрессий, а не буквальное следование рецепту, и принимает допустимые альтернативы. Builder не затрагивается. Отдельный correction planner нужен только при новой архитектуре/смене scope/конфликтующих требованиях (при необходимости — human gate). |
| Классифицировать must-fix vs backlog vs human | Статусы `PASS/FAIL/INFO/HUMAN REVIEW/BLOCKED/DISABLED-REVIEW` уже используются (migration spec; batch-e-evidence.md §1) | Частично реализовано; обязательной классификации must-fix vs backlog нет — добавлен рубрикатор в §8. |
| Плагины → детерминированный workflow + логи | Заметки `outputs/shared/notes/opencode-vs-claude-dynamic-workflows.md:79-96` описывают плагины/SDK как **ближайший аналог**, но это пре-существующие пользовательские заметки, не доказательство постройки | **Plugin/runner не построен.** В этом эксперименте оркестрация была turn-by-turn моделью. Заметки — референс, а не результат эксперимента. |
| Portable textual spec между harness | durable markdown + команды `mise` переносимы (`outputs/shared/notes/opencode-multi-agent-orchestration.md:161-220`; пользовательская заметка) | Проверки на другом harness **не выполнялись**; переносимость заявлена, не измерена. |

### 5.3 Чего в выводах пользователя не хватает (по evidence)

- **Явного признания ограниченности приёмки**: «COMPLETE and ACCEPTED» ≠ полный
  паритет из-за множества `BLOCKED` (batch-e-evidence.md §3, §10).
- **Оговорки, что ревью B/C/D — same-model** (process/context-независимые, но не
  кросс-модельные): DeepSeek v4.1 Flash (batch-c-evidence.md:1102;
  batch-d-evidence.md:1207).
- **Оговорки, что fresh exhaustive screenshots не выполнены**
  (batch-e-evidence.md §7).
- **Оговорки, что durable-логи пост-fix не сохранены**, хотя сами проверки
  показаны как conversation evidence (§3.2, §7.2).

### 5.4 Уточнение (supersession, 2026-10-05): correction plan — часть ревью, не «planner-review anchoring»

- **Прежняя интерпретация (агентская ошибка).** Ретроспектива прочитала вывод
  пользователя «планирование и ревью — одной умной моделью» как «одна и та же
  модель пишет общий task plan и сама его ревьюит», и вывела отсюда риск
  planner-review anchoring (§5.2, §6.3, §8.2, §9.10). Это была **неверная
  интерпретация агента**, а не позиция пользователя.
- **Корректное понимание.** Умная модель-ревьюер по итогам ревью пишет
  **correction plan** — ограниченный план исправления findings, а не общий план
  задачи. Ожидаемый цикл: **Builder → Reviewer (findings + bounded correction
  plan) → Builder → Reviewer**, без отдельной роли Correction Planner.
- **Почему это лучше.** Ревьюер уже держит evidence и контекст findings, поэтому
  correction plan не требует отдельной передачи/повторного чтения и меньше
  искажается при handoff. Экономия при этом **не измерена** — это proposal, а не
  доказанный результат (см. §8.2).
- **Остаточный риск.** Привязанность ревьюера к собственному prescribed fix.
  Повторное ревью (rereview) должно оценивать, устранён ли дефект, проходят ли
  тесты и нет ли регрессий, а не буквальное следование рецепту; допустимые
  альтернативные решения принимаются.
- **Когда нужен отдельный correction planner.** Только при новой архитектуре,
  смене scope или конфликтующих требованиях — и тогда, где необходимо, с
  **human gate**.
- **Что НЕ меняется.** Предложение о **дешёвом механическом оркестраторе/
  контроллере** остаётся отдельным и в силе; смена модели **builder** этим не
  подразумевается (см. §8.2, §9.10).

---

## 6. Оценка агентов и слабые места

### 6.1 Что агент сделал хорошо

- Дисциплина durable state и evidence-first: почти каждое утверждение имеет
  artifact/ID/команду (log.md, batch-*-evidence.md).
- Честность классификации: `BLOCKED`, `DISABLED / REVIEW`, `HUMAN REVIEW`
  использовались, disabled не выдавался за PASS (batch-e-evidence.md §3).
- TDD: RED→GREEN зафиксированы для B0–B6, включая отдельные correction-циклы
  (batch-b-evidence.md:66-88, 153-183).
- Самокоррекция ошибок: hash-note (batch-d-evidence.md:10), отзыв неверного
  FileUpload RED (commit `0de0427`), уточнение персистентности (results.md §Персистентность).
- Полная атрибуция mobile regression (batch-e-evidence.md §6.1) — образец
  добросовестного разбора.

### 6.2 Слабые места

1. **Ограниченная приёмка выдана как COMPLETE** — десятки `BLOCKED` осей при
   формальном «COMPLETE and ACCEPTED» (batch-e-evidence.md §3, §8/§10).
2. **Same-model review** — после ухода GPT ревью B/C/D выполняла та же модель,
   что и сборку: process/context-независимо, но не кросс-модельно
   (batch-c-evidence.md:1102; batch-d-evidence.md:1207).
3. **Durable-логи пост-fix не сохранены** — §9 batch-e опирается на conversation
   evidence (check 840/724, visual update/rerun), а pre-fix-логи остались от
   предыдущего прогона. Это пробел логирования, **не** доказательство, что
   проверки не запускались (§7.2).
4. **Обоснование refresh базлайнов по байтам** — не по визуальному диффу
   (batch-e-evidence.md §9).
5. **Свежие исчерпывающие скриншоты не сделаны** (batch-e-evidence.md §7).
6. **Шаг изоляции не автоматизирован** — MCP работал с активным редактором;
   защита осталась ручной (history.md:99-107).
7. **Hash-строка не валидировалась** — план получил 63-символьный SHA (§7.1).
8. **Ошибочные промежуточные выводы** («MCP не сохраняет», «источник не
   мутировался») сначала попали в durable state (§7.4, §7.5).

### 6.3 Оценка ролей/агентов (strengths / weaknesses)

Оценка по наблюдаемым артефактам, не по внутренней «автономности».

| Роль | Сильные стороны | Слабые стороны |
| --- | --- | --- |
| **Planner** | Атомарные планы, Gates A–D, RED→GREEN-дисциплина, явные enum-таблицы Pen-осей. | Часть плановых шагов (Batch E screenshots, resume) отложена, но помечена как выполненная. Прежнее замечание об anchoring «planner и reviewer — одна умная модель» **отозвано** как неверная интерпретация: reviewer пишет ограниченный correction plan после ревью, а не общий task plan (см. §5.4). |
| **Controller / coordinator** | Реальные переключения ролей, durable state, handoff-протокол, удержание контекста через смену модели. | Расширял гейты D3–D6, опираясь на исторический контекст — это **наблюдение из истории разговора, не первично верифицированный факт** (и не утверждение пользователя); зависимости/лимиты отслеживались вручную; нет детерминированного рантайма. |
| **Builder** | TDD RED→GREEN, минимальные изменения, самокоррекция (hash-note, отзыв FileUpload RED), полная атрибуция regression. | Иногда пропускал документированные оси (destructive — наблюдение; доказанная причина не установлена); «COMPLETE» при множестве `BLOCKED`. |
| **Reviewer / verifier** | Проверял артефакты повторно, фиксировал `BLOCKED`/`DISABLED-REVIEW`, не выдавал disabled за PASS. | Та же модель, что и builder → process/context-независимость без кросс-модельной; независимый артефактный контроль при этом возможен. |
| **Reporting** | Богатые evidence-ledgers, честные `HUMAN REVIEW`, hash-note. | Отдельные overclaims (COMPLETE, «pre-fix», размер-вместо-диффа), потребовавшие corrections post factum. |

Дополнительно:

- **GPT-5.6 Terra** участвовал на старте (Task 1/2 review clean —
  `.superpowers/sdd/.../progress.md:14-16`), затем стал недоступен
  (history.md:29-34). Кросс-модельное ревью как результат **не подтверждено** на
  большей части объёма.
- **Человек** — ключевой внешний контроль (приёмка, приоритеты, scope), но не
  единственный источник независимости: артефактные проверки и другая модель тоже
  дают независимость. Финальное визуальное принятие не зафиксировано явным
  `accept`.

---

## 7. Исправления документальных ошибок (явная supersession)

Все прежние формулировки сохраняются; ниже — корректная версия.

### 7.1 SHA-256 Pen в closure-заголовке миграционного плана

- **Было:** `docs/superpowers/plans/2026-10-03-full-pen-component-migration.md:7`
  содержит 63-символьный SHA `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde787421daf7fa`
  (пропущена `7`).
- **Корректно:** 64-символьный SHA
  `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`
  (batch-e-evidence.md §1; batch-c-evidence.md:5; landing-parity-evidence.md:15).
- **Supersession:** строка исправлена; это ошибка копирования, не изменение
  Pen. Та же 63-символьная ошибка ранее фиксировалась в handoff и
  исправлялась (batch-d-evidence.md:10, 225, 437, …). Пен не изменялся.

### 7.2 `test:visual`/post-fix: provenance durable-логов, а не провал тестов

- **Было (durable):** `batch-e-evidence.md §9` помечает прогон `test:visual` как
  «(pre-fix)» и печатает таблицу `check`/`check:deps`/`build` как
  «Verification after fix».
- **Durable-логи в репозитории:** `test-visual.log` / `test-visual-fresh.log`
  (mtime 01:01) содержат mobile geometry failure; `check-run1.log` (01:00),
  `check-deps.log` (01:00:39), `build.log` (01:00:45) старше fix-commit
  `0633e4c` (01:10:12). То есть это **pre-fix** прогоны.
- **Conversation evidence (не сохранено как лог):** пост-Landing-change
  `mise run check` → `EXIT 0` (840 unit / 724 browser); пост-change
  `test:visual` сначала падает **только на скриншотах**, затем
  `test:visual:update` → 7 pass, повторный `test:visual` → 7 pass.
- **Что это значит:** проверки, показанные только разговором, считаются
  **выполненными**; отсутствие сырого лога — пробел логирования, **не**
  признак, что тест не запускался/упал. Метка «(pre-fix)» для пост-change
  прогона неверна.
- **Что остаётся недоказанным:** пост-fix `check:deps` и `build` не показаны
  ни логом, ни разговором; полная пиксельная атрибуция refresh отсутствует.
- **Supersession:** `batch-e-evidence.md` §9 подтверждён на уровне durable-логов
  только частично; пост-change `check` (840/724) и `test:visual` (update/rerun)
  верифицированы как **conversation evidence именно для fix-состояния**.
  Сохранённые pre-fix-логи (`check-run1`, `check-deps`, `build`, `test-visual*`)
  относятся к более раннему tree, **не** к состоянию `0633e4c`. Пост-fix
  `check:deps`/`build` остаются недоказанными.

### 7.3 Обоснование refresh базлайнов размером файла, без per-cluster инспекции

- **Было:** `batch-e-evidence.md §9` — «Snapshot deltas were tiny (hundreds of
  bytes per image), consistent with the accumulated Batch B–D … corrections».
- **Проблема:** это размер файла (binary bytes), а не визуальный дифф. Ранее сам
  ledger признаёт, что pixel-clusters не атрибутированы (batch-e-evidence.md §6.2).
  Per-cluster инспекции нет.
- **Conversation evidence:** пост-change visual сначала падает только на
  скриншотах, после update/rerun — 7 pass. Это подтверждает **совпадение текущего
  рендера с новым baseline** (воспроизводимость), но **не доказывает корректность
  принятия изменений** — проверка «обновили baseline → проходит» здесь
  циркулярна.
- **Supersession:** refresh базлайнов **выполнен**, но корректность его
  принятия не доказана; обоснование в durable-ledger — **слабое** (размер, не
  дифф). Корректная формулировка: базлайны обновлены, полная пиксельная
  атрибуция не проводилась → `HUMAN REVIEW`.

### 7.4 Персистентность: «MCP не сохраняет на диск» — отозвано

- **Было:** первоначальный вывод, что MCP не пишет на диск.
- **Корректно:** Pen автосохраняет; потеря была вызвана **внешней перезаписью
  открытого файла оператором** (`cp source ex_2.pen`), после чего приложение
  перечитало диск (history.md:63; results.md §Персистентность).
- **Статус:** уже откорректировано; в ретроспективе подтверждается. Урок: не
  писать в `.pen` извне, пока документ открыт.

### 7.5 «Источник никогда не мутировался» — неполно

- **Было:** results.md §Evidence for — «the source was never mutated»; history.md:53 —
  «on-disk hash источника … не изменён».
- **Корректно:** **на диске** исходный файл не изменился (hash `c9695a1d…`),
  **но** активный открытый документ был **транзиентно изменён** в редакторе:
  экспериментальные узлы попали в `design_system_ex_1.pen` и затем были удалены
  (log.md:70). «Неизменный дисковый hash ≠ документ никогда не мутировался».
- **Supersession:** формулировка «source was never mutated» уточняется до
  «on-disk hash неизменен; in-editor документ был транзиентно изменён и очищен».

### 7.6 «Независимые ревью» — process/context, но не кросс-модельные

- **Было:** планы/ledgers называют reviewer-роль «independent».
- **Корректно:** reviewer в B/C/D — `DeepSeek v4.1 Flash`, та же модель, что
  builder (batch-c-evidence.md:1102, 1114; batch-d-evidence.md:1207, 1218).
  Это даёт **process/context-независимость** (отдельная сессия, повторный запрос
  артефактов, независимый артефактный контроль), но **не кросс-модельную**
  независимость. Кросс-модельное ревью было только в Task 1/2
  (`.superpowers/sdd/.../progress.md:14-16`), затем GPT исчерпан
  (history.md:29-34).
- **Не перегибать:** одна модель-ревьюер ≠ автоматически self-audit; self-audit
  — только когда тот же worker реально проверял собственную работу. Идентичность
  модели сама по себе не делает независимую проверку невозможной.
- **Supersession:** «independent review» уточняется до «отдельная
  session/context-ревью; кросс-модельная независимость не обеспечена».

### 7.7 Destructive Button: cache/already-existing bias — НЕ установлена

- **Факт:** destructive tone не был реализован в phase 1
  (`outputs/experiments/design-system-to-code/notes/parity-phase-1/evidence.md:56`) и добавлен в B0 (batch-b0-evidence.md:65, 152).
- **Что НЕ установлено:** причинная связь с render-cache или «already-existing»
  bias. Render-cache инцидент (history.md:108-109; structural-audit.md:35)
  относится к невидимости нового контента при экспорте, а не доказанно к
  пропуску destructive. Гипотеза пользователя остаётся **гипотезой**.

---

## 8. Практические следующие эксперименты

Предложения; ничего из перечисленного здесь не было построено в этом эксперименте.

### 8.1 Чистый проект: OpenCode/MCP против прямого Pen

Сравнение на **одних и тех же** brief, ассетах, моделях (если управляемы) и
бюджете. Полностью идентичные инструменты **невозможны** — сравниваются разные
harness (native Pen UI vs OpenCode Pencil MCP); неизбежные различия инструментов
нужно **документировать явно**, а не выдавать за равные условия.

- одна дизайн-задача, два прогона: native Pen UI vs OpenCode Pencil MCP;
- генерация **без seed-композиции**, с фиксированным числом итераций;
- логировать, читал ли агент native Pen skill и как его использовал;
- оценка: **blinded human aesthetic review** + механические проверки;
- identity/version gates на документы (hash, active-editor, версия инструмента).

### 8.2 Benchmark оркестрации

- роли и число прогонов; total tokens, cost, walltime, retries,
  human interventions, acceptance;
- сравнить **детерминированный controller** (скрипт/плагин) против
  LLM-controller, который сам решает гейты; определить, какие гейты обязаны быть
  детерминированными;
- cheap orchestrator/controller vs smart planner/reviewer — **измерить** качество
  и цену, а не полагаться на восприятие (builder при этом может быть
  независимым, не обязательно «дешёвым»; смена модели builder этим не
  подразумевается);
- ожидаемый цикл ревью — Builder → Reviewer (findings + ограниченный correction
  plan) → Builder → Reviewer; reviewer пишет correction plan **после** ревью, а
  не общий task plan. Отдельный Correction Planner как роль нужен только при
  новой архитектуре/смене scope/конфликтующих требованиях (при необходимости —
  human gate); сравнивать с ним как с вариантом, **измерив** выгоду, а не
  постулируя экономию (см. §5.4);
- **smart fallback** на неоднозначность/конфликты с обязательной эскалацией.

### 8.3 Рубрика review-severity

- **must-fix:** safety, a11y, essential functional regressions, нарушение
  принятых требований.
- **minor/polish → backlog.**
- **human-review:** субъективная эстетика/вкус.
- **scope expansion → gate** (отдельное решение, не чинится в текущей задаче).

---

## 9. Приоритизированные контроли следующей итерации

Приоритет — по риску для достоверности.

1. **Явная модель независимости ревью.**
   - Либо реально другая модель/человек; либо ревью помечается
     `same-model session/context review` (process/context-независимо, но не
     кросс-модельно). Не называть его `independent` кросс-модельным и не
     называть `self-audit`, если worker не проверял собственную работу.
2. **Evidence must be post-fix и timestamped.**
   - Запретить переиспользование pre-fix таблиц как «Verification after fix».
   - Каждая проверка после изменения сохраняется отдельным логом с timestamp и
     привязкой к commit; conversation evidence явно помечать как таковое.
3. **Visual baseline refresh protocol.**
   - Refresh только после per-cluster diff-attribution (bounding box, тип
     перехода), не по размеру файла.
   - Отдельно доказывать, что дельта объясняется документированной Pen-правкой.
4. **Свежие исчерпывающие screenshots — обязательны либо явно deferred.**
   - Batch E checkpoint с заполненным списком master→capture или статусом
     `deferred` с причиной.
5. **Автоматическая валидация hash.**
   - Проверка 64 hex-символов + сравнение с `shasum`; невозможность записать
     63-символьный SHA в план/ledger.
6. **Изоляция Pen как executable gate.**
   - `get_app_state` assert активного документа перед любой мутацией; отдельная
     фиксация in-editor изменения vs disk-hash.
7. **Классификация review-findings по рубрике §8.3.**
   - `must-fix` / `backlog` / `human-review` / `scope-gate`; цикл исправлений
     только для must-fix.
8. **Чёткая граница «bounded acceptance» vs «full parity».**
   - Статус `COMPLETE (bounded)` с явным перечислением `BLOCKED`-осей; запрет
     тикать full-parity шаги.
9. **Плагин/runner для детерминированного workflow + логов (proposal).**
   - OpenCode плагин/SDK поверх `ctx.session.*` может дать fan-out, повторяемость
     и audit trail
     (`outputs/shared/notes/opencode-vs-claude-dynamic-workflows.md:79-96` —
     пользовательская заметка, не результат эксперимента).
   - Это **proposal**, не построенный результат.
10. **Cheap orchestrator/controller + smart planner/reviewer (proposal).**
    - Разделить модели по роли; это **отдельное** предложение по оркестратору и
      оно **не подразумевает смену модели builder** (builder может оставаться
      независимым/иным). Не выдавать за проверенный результат.
    - Ожидаемый цикл ревью: Builder → Reviewer (findings + ограниченный
      correction plan) → **Builder** → Reviewer. Reviewer пишет correction plan
      **после** ревью, а не общий task plan; прежнее замечание об anchoring
      «planner и reviewer — одна умная модель» **отозвано** как неверная
      интерпретация. Отдельный Correction Planner нужен только при новой
      архитектуре/смене scope/конфликтующих требованиях (при необходимости —
      human gate). Остаточный риск — привязанность ревьюера к собственному
      prescribed fix; повторное ревью оценивает устранение дефекта, тесты и
      отсутствие регрессий, а не буквальное следование рецепту, и принимает
      допустимые альтернативы. См. §5.4.
11. **Portable textual spec (proposal).**
    - Проверить реальный перенос плана/статусов на другой harness; сейчас это
      гипотеза, а не измерение.

---

## 10. Матрица закрытия (closure disposition matrix)

| Артефакт / цель | Disposition | Основание |
| --- | --- | --- |
| Эксперимент Pencil × OpenCode workflow | **closed** | ретроспектива; history.md closure |
| Skill `pencil-design-experiment` | **achieved** | results.md §Evidence for |
| Durable state / context retention | **achieved** | results.md §Evidence for; history.md:88-89 |
| Create Project: entry/empty/filled/success + dark | **achieved** | results.md §Second pass |
| Create Project: inline validation copy | **blocked / deferred** | todo.md §Blocked / deferred |
| Create Project: tablet/mobile | **deferred / unmet** | todo.md §Blocked / deferred; structural-audit.md:29 |
| Controlled real-session resume | **not evidenced in reviewed durable state** | todo.md §Blocked / deferred; README.md §Success criteria |
| User final visual acceptance | **closed-unverified (no recorded `accept`)** | visual-review.md:37-41 |
| Brand swap blue→green | **achieved** | results.md §Смена бренда |
| Full Pen component migration (82 masters) | **achieved (bounded)** | batch-e-evidence.md §10 |
| Full behavioral/visual parity of all axes | **not achieved; many BLOCKED** | batch-e-evidence.md §3 |
| Landing parity (measured features/hero) | **achieved (bounded), residuals HUMAN REVIEW** | landing-parity-evidence.md:225-266 |
| Mobile CTA regression | **fixed** (`0633e4c`); post-fix check/test:visual — conversation evidence, durable post-fix logs missing | batch-e-evidence.md §9; §7.2 |
| Fresh exhaustive Batch E screenshots | **not performed / deferred** | batch-e-evidence.md §7 |
| Independent cross-model review | **not achieved after GPT limit; same-model review is session/context-independent only** | history.md:29-34; §7.6 |
| `design-system-to-code` (linked workstream) | **closed as separate workstream** | `outputs/experiments/design-system-to-code/README.md`, `.../history.md` closure |
| Token-cost/benchmark measurement | **outside scope / not measured** | §3 |

---

## 11. Audit checklist (для ретроспективы и todo)

- [x] Прочитаны durable state, evidence-ledgers, планы/спеки, SDD-отчёты,
      артефакты и git-история обоих потоков.
- [x] Подтверждён SHA Pen: 64-символьный
      `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`.
- [x] Исправлен 63-символьный SHA в closure миграционного плана (supersession).
- [x] Классифицированы: need/achieved/bounded/unmet/cancelled/outside scope.
- [x] Зафиксированы выводы пользователя и их критическое сопоставление.
- [x] Оценены агенты/роли и слабые места.
- [x] Исправлены документальные ошибки без стирания истории.
- [x] Добавлены correction notices в заголовки планов и Batch E.
- [x] Шаг свежих скриншотов Batch E помечен partial/deferred.
- [x] Закрыты связанные docs `design-system-to-code` как отдельный поток.
- [x] Синхронизированы `outputs/history.md`, README/roadmap/todo/history/log.
- [x] Не тронуты `outputs/shared/notes/**`, `.pen` (filesystem), production,
      skills; commit/merge/push на момент написания не выполнялись (коммит — за
      пользователем).
- [x] Прогнана документная формат-проверка `.mise.toml` и `git diff --check`.
- [x] Разграничены durable repo-evidence / conversation evidence / недоказанное (§3).
- [x] Добавлена рубрика review-severity и практические следующие эксперименты (§8).
- [ ] Открытый пункт: сохранить durable-логи пост-fix `check:deps`/`build`
      (см. §7.2) — задача следующей итерации.
- [ ] Открытый пункт: независимое кросс-модельное ревью вместо same-model
      (см. §7.6) — задача следующей итерации.

---

## 12. Ссылки

- README: `outputs/experiments/pencil-opencode-workflow/README.md`
- Roadmap/todo/log/history: там же.
- Evidence: `notes/batch-{a,b0,b,c,d,e}-evidence.md`,
  `notes/landing-parity-evidence.md`, `notes/structural-audit.md`,
  `notes/visual-review.md`.
- Планы: `docs/superpowers/plans/2026-10-03-full-pen-component-migration.md`,
  `.../2026-10-03-pen-migration-batch-b.md`,
  `.../2026-10-03-landing-pen-parity-remediation.md`,
  `.../2026-10-02-pencil-opencode-workflow.md`.
- Связанный поток: `outputs/experiments/design-system-to-code/`.
- Предыдущий опыт: `outputs/experiments/pen-design-system-development/notes/final-results.md`.
- Референс (пользовательские заметки, не результат эксперимента):
  `outputs/shared/notes/opencode-multi-agent-orchestration.md`,
  `outputs/shared/notes/opencode-vs-claude-dynamic-workflows.md`,
  `outputs/shared/notes/resilient-component-and-screen-workflow.md`.
- Модель знаний: `WIKI_LLM.md:30-38`, `WIKI_LLM.md:98-104`.
