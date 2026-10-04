# OpenCode против dynamic workflows в Claude Code

Общая заметка вне эксперимента. Отвечает на вопрос: есть ли в OpenCode V2
аналог dynamic workflows из Claude Code.

Короткий ответ: **встроенного аналога нет**, но есть примитивы, из которых
эквивалент собирается вручную — плагином или внешним SDK-приложением поверх
сессий OpenCode.

## Что такое dynamic workflows в Claude Code

Dynamic workflow — это JavaScript-скрипт, который оркеструет множество
субагентов. Claude пишет скрипт под конкретную задачу, а рантайм исполняет его
в фоне, пока сессия остаётся отзывчивой.

Ключевая идея: **план переносится в код**. Не модель решает по шагам, кого
запускать, а скрипт держит цикл, ветвление и промежуточные результаты.
Промежуточные результаты живут в переменных скрипта, а не в контексте модели,
поэтому контекст содержит только финальный ответ.

Примитивы скрипта: `agent()`, `pipeline()`, `parallel()`, `phase()`, `log()`,
глобальный `args`. Тело — обычный JavaScript с top-level `await`.

Возможности вокруг рантайма:

- встроенный воркфлоу `/deep-research`;
- запуск по ключевому слову `ultracode` в промпте;
- режим `/effort ultracode` — Claude сам решает, когда задача заслуживает
  workflow;
- сохранение прогона как команды: `.claude/workflows/` (проект) или
  `~/.claude/workflows/` (личное), запуск как `/<name>`;
- распространение через плагины: `workflows/` в корне плагина;
- вид `/workflows`: прогресс по фазам и агентам, токены, время, pause/resume,
  restart агента, stop, сохранение скрипта;
- resume после остановки: завершённые агенты возвращают сохранённый результат,
  упавшие и все последующие запускаются заново;
- ограничения и стоимость: до 16 конкурентных агентов по умолчанию, до 1000
  агентов на прогон, предупреждение `Large workflow`, ожидание лимита
  использования.

Кому соответствует по модели: subagents, skills и agent teams держат план в
контексте модели (turn-by-turn), а workflow держит план в скрипте. Это разные
уровни, а не замена друг друга.

## Чего нет в OpenCode V2

- Нет именованного рантайма воркфлоу: нет `agent()/pipeline()/parallel()/phase()`.
- Нет режима `/workflows` с визуальным прогрессом, pause/resume и restart.
- Нет автоматической генерации скрипта оркестрации моделью под задачу.
- Нет replay сохранённых результатов агентов при перезапуске прогона.
- Нет встроенных caps на число агентов и предупреждения о стоимости прогона.
- Нет аналога `ultracode` и сохранения прогона одной клавишей в команду.

Роль файловой персистентности и возобновления в OpenCode выполняют durable task
artifacts (`plan.md`, `execution-journal.md`, `review.md`), а не рантайм.

## Что есть в OpenCode V2

### Агенты и субагенты

Кастомные агенты задают system prompt, модель, режим (`primary`, `subagent`,
`all`) и permissions. Субагенты запускаются в дочерних сессиях с чистым
контекстом, в foreground или background. Родитель управляет тем, каких агентов
ему разрешено запускать, через действие `subagent` в permissions.

Это уровень Claude subagents / agent teams: план держит модель, шаг за шагом.

### Команды

`.opencode/commands/<name>.md` и JSON-команды принимают `agent`, `model` и
`subagent`. Это сохранённый повторяемый вход, но без fan-out, ветвления и цикла
внутри запуска.

### Skills

Процедура, загружаемая по требованию. Описывает workflow, но не исполняет его и
не заменяет durable state.

### Плагины и SDK — ближайший настоящий аналог

Контекст плагина — это клиент сервера OpenCode. Он умеет:

- `ctx.session.create`, `get`, `context`, `remove`;
- `ctx.session.switchAgent`, `switchModel`;
- `ctx.session.prompt`, `generate`, `command`, `synthetic`;
- `ctx.session.wait`, `interrupt`, `compact`;
- `ctx.generate.text` — генерация без создания сессии;
- `ctx.storage` — durable JSON-хранилище плагина;
- `ctx.event.subscribe` — поток событий сервера;
- регистрацию инструментов, команд, агентов, skills и hooks.

Это позволяет написать оркестрацию на TypeScript: создать сессию на каждый
элемент, переключить агента и модель, отправить промпт, дождаться и собрать
результаты. Fan-out делается через `Promise.all`, цикл — обычным кодом.

Тот же контракт доступен снаружи через HTTP API и `@opencode/client`/SDK.

### Политики

`experimental.policies` жёстко запрещают действия без интерактивного запроса:
провайдеры и правила `permission` вида `subagent:general`, `shell:*`,
`external_directory:*`. Это грубый, но детерминированный заменитель бюджетов и
caps, которые в Claude Code у workflow встроены.

## Сопоставление

| Возможность | Claude dynamic workflows | OpenCode V2 |
| --- | --- | --- |
| Кто держит план | Скрипт | Модель, по шагам (агент-оркестратор) |
| Fan-out многих агентов | `pipeline` / `parallel` | Параллельные фоновые субагенты; в коде — плагин/SDK |
| Модель пишет оркестрацию | Да, автоматически | Косвенно: агент может написать плагин/скрипт |
| Повторяемость оркестрации | Сам скрипт | Плагин, command, agent definition |
| Сохранить как команду | `s` → `.claude/workflows` → `/name` | `.opencode/commands/*.md`, plugin-команды |
| Воркфлоу с параметрами | Да (`args`) | Commands с `$ARGUMENTS`, `agent`, `model`, `subagent` |
| Прогресс / resume / cost UI | `/workflows` | Нет встроенного; частично собирается CLI-плагином |
| Конкурентность и лимиты | 16 по умолчанию, 1000 агентов | Нет общих caps; ограничивают permissions/policies |
| Возобновление после остановки | Replay сохранённых результатов | Durable task artifacts |
| Промежуточные результаты | Переменные скрипта, вне контекста модели | Контекст сессии либо файлы/`ctx.storage` |

## Три уровня замены в OpenCode

1. **Оркестратор-агент + субагенты (turn-by-turn).** Соответствует уровню
   subagents / agent teams, а не workflows. Это схема
   `orchestrator → planner → builder → reviewer` из
   [opencode-multi-agent-orchestration](opencode-multi-agent-orchestration.md).
   План держит модель.

2. **Command как сохранённый воркфлоу.** Повторяемый вход с фиксированными
   `agent`/`model`/`subagent`, но без ветвления и fan-out внутри запуска.

3. **Плагин или SDK как скриптовый рантайм.** Ближайший настоящий аналог.
   Оркестрация пишется на TypeScript поверх `ctx.session.*` и исполняется
   OpenCode. Отличия от Claude: скрипт пишет человек или агент как код плагина,
   а не рантайм генерирует под задачу; нет `pipeline/parallel/phase`, нет
   `/workflows`, нет replay-семантики и cost warning; прогресс, resume и лимиты
   нужно реализовать самому.

## Практические выводы

- Схема `orchestrator → planner → builder → reviewer` достижима штатно, без
  плагинов, и соответствует уровню субагентов.
- Настоящий fan-out (аудит всех компонентов, миграция сотен файлов, перекрёстная
  проверка находок) в OpenCode делается плагином-раннером поверх
  `ctx.session.*`, а не встроенной фичей.
- Durable task artifacts остаются обязательными в любом случае: replay
  сохранённых результатов, как в `/workflows`, в OpenCode нет.
- Ограничения и стоимость лучше выражать через permissions и policies, а не
  ожидать встроенных caps.

## Источники

- [Claude Code — Orchestrate subagents at scale with dynamic workflows](https://code.claude.com/docs/en/workflows)
- [Claude Code — Overview](https://docs.claude.com/en/docs/claude-code/overview)
- [OpenCode V2 — Agents](https://opencode.ai/v2/docs/agents/)
- [OpenCode V2 — Commands](https://opencode.ai/v2/docs/commands/)
- [OpenCode V2 — Plugins](https://opencode.ai/v2/docs/plugins/)
- [OpenCode V2 — Build plugins](https://opencode.ai/v2/docs/build/plugins/)
- [OpenCode V2 — Policies](https://opencode.ai/v2/docs/policies/)
- [OpenCode V2 — SDK](https://opencode.ai/v2/docs/build/sdk/)

## Связанное

- [opencode-multi-agent-orchestration](opencode-multi-agent-orchestration.md)
- [resilient-component-and-screen-workflow](resilient-component-and-screen-workflow.md)
- [agent-work-model](agent-work-model.md)
- [script-first-flows-and-agent-workspace](script-first-flows-and-agent-workspace.md)
