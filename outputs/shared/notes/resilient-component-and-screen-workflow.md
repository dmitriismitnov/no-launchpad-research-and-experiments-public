# Устойчивый workflow компонентов и экранов

Общая заметка вне эксперимента. Описывает целевую модель устойчивой
многоагентной работы для двух потоков:

1. создание компонентов — от описания, референса или готового дизайна до
   design-side и code-side контракта;
2. создание экранов из уже утверждённых компонентов без скрытого изменения их
   контрактов.

Связанный базовый технический контур OpenCode описан в
[opencode-multi-agent-orchestration](opencode-multi-agent-orchestration.md).

## Основания

Эксперименты подтвердили следующие положения:

- небольшой компонент может быть выведен из близкого прецедента, правил и
  существующего кода;
- asset-пайплайны становятся воспроизводимыми, когда правила закреплены в
  skills, скриптах и проверках, а не остаются знаниями сессии;
- экран возможно собрать из токенов и компонентов в light/dark и responsive
  контекстах;
- наибольшие риски — расползание scope, несогласованные обходы архитектурных
  правил, недоказанное завершение, а также хрупкое состояние открытого
  Pen-документа.

Следствия:

- чат и память модели не являются источником истины о задаче;
- компонент владеет своей visual projection;
- изменение публичного контракта нельзя маскировать как работу над экраном;
- отсутствие доказательства не позволяет перевести задачу в `done`.

## Три слоя workflow

1. **Governance:** роли, полномочия, статусы, правила breaking changes и
   блокировок.
2. **Производственные потоки:** component lifecycle и screen assembly.
3. **Durable state:** task artifacts, по которым новую или скомпактированную
   сессию можно безопасно продолжить.

## Роли

| Роль | Ответственность | Ограничение |
| --- | --- | --- |
| Product owner | Цель, приоритет, согласование scope и breaking changes | Не подменяет технические решения ролей |
| Product manager / dispatcher | Очередь атомарных задач, зависимости и порядок | Не расширяет scope самостоятельно |
| Orchestrator | Переходы ролей, гейты, handoff и durable state | Не реализует дизайн или код |
| Component architect | Контракты, ownership, API и совместимость компонентов | Не утверждает breaking change без решения пользователя |
| Design-system designer | Design brief, варианты, состояния, композиционные правила | Не передаёт дизайн в код без аудита |
| Reverse-design analyst | Референс/дизайн → intent, паттерны, gaps и brief | Не создаёт компонент без доказательства необходимости |
| Planner | Scope, план, DoD, риски и команды проверки | Read-only; не изменяет проект |
| Design builder | Изолированный Pen-артефакт и design evidence | Не изменяет открытый канонический документ без изоляции |
| Code builder | Реализация по утверждённому плану, journal, проверки | Не меняет контракт в screen-задаче |
| Asset maintainer | Шрифты, иконки, изображения и их pipelines | Не правит generated assets вручную |
| Reviewer | Независимое ревью scope, API, семантики, a11y и регрессий | Не исправляет находки без отдельного remediation-этапа |
| Verifier | Воспроизводимое evidence по DoD | Не принимает работу по одному скриншоту |
| Release / integration owner | Коммиты, история, интеграция и финальный статус | Не заменяет решение пользователя |

Для малой задачи роли могут совмещаться, но `orchestrator` не совмещается с
`builder`, а `builder` — с независимым `reviewer`.

## Общие статусы и гейты

```text
intake → planned → implementing → ready-for-review → verified → done
                                └→ blocked
                                └→ skipped
```

Переход разрешён только при наличии соответствующего артефакта и evidence:

- `intake → planned`: утверждены цель, scope, DoD и полномочия;
- `planned → implementing`: есть versioned `plan.md`;
- `implementing → ready-for-review`: journal содержит фактические изменения и
  результаты проверок;
- `ready-for-review → verified`: независимый review сопоставил evidence с DoD;
- `verified → done`: завершены commit/integration действия, требуемые задачей.

## Политики, которые необходимо закрепить

### Breaking change

Отдельной задачей с решением пользователя является изменение:

- публичных props, variants, states или anatomy;
- DOM- и accessibility-контракта;
- foundation tokens, semantic roles или visual baseline;
- asset manifest и его стабильных ключей;
- поведения существующего компонента.

### Противоречие правилу

Если найдено противоречие существующему правилу, агент обязан воспроизвести
его, описать варианты и остановиться до закрепления workaround. Отсутствующая
деталь допускает локальное допущение с обоснованием и записью в decision log.

### Skip и blocker

Каждый обнаруженный gap имеет один статус:

| Статус | Действие |
| --- | --- |
| `supported` | Реализовать существующим контрактом |
| `composable` | Собрать из компонентов без изменения контрактов |
| `missing-nonblocking` | Зафиксировать и пропустить; продолжить независимую часть |
| `missing-blocking` | Остановить поток и запросить решение пользователя |
| `requires-breaking-change` | Создать отдельное предложение; не исправлять в текущей задаче |
| `reference-ambiguous` | Запросить уточнение дизайна или продукта |

Задача не может быть `done`, пока есть `missing-blocking` или
`requires-breaking-change` без явного решения пользователя.

## Durable task artifacts

Общий минимальный набор:

```text
outputs/tasks/<task-id>/
├── brief.md
├── plan.md
├── decision-log.md
├── execution-journal.md
├── evidence.md
├── review.md
└── handoff.md
```

Перед продолжением любой роли необходимо сверить состояние artifacts с `git
status`, `git diff`, файлами и результатами доступных проверок.

### Задача компонента

```text
├── component-spec.md
├── compatibility-report.md
├── design-audit.md
└── implementation-map.md
```

### Задача экрана

```text
├── screen-brief.md
├── component-map.md
├── gap-register.md
├── responsive-matrix.md
└── fidelity-review.md
```

## Поток: component lifecycle

```text
Описание / reference / готовый дизайн
→ intake
→ discovery или reverse-design analysis
→ component brief
→ архитектурный gate
→ Pen design contract (если нужен)
→ code implementation
→ independent review + verification
→ component catalog / documentation
```

`component-spec.md` обязан фиксировать purpose, границы, anatomy, публичный
API, variants, states, semantic roles, accessibility, responsive-поведение,
asset dependencies, критерии готовности и compatibility impact.

Пользовательское решение обязательно, если нужны новый foundation token,
публичный вариант или slot, изменение существующего компонента, расширение
scope, либо есть несколько равноправных моделей референса.

## Поток: screen assembly

```text
Экран / reference / brief
→ screen decomposition
→ component map
→ gap register
→ feasibility gate
→ screen composition plan
→ implementation только из публичных API
→ fidelity + responsive review
→ verification
```

В screen-задаче builder может выбирать компоненты, передавать публичные props,
компоновать layout и применять разрешённые токены или публичные escape hatches.

Builder не может менять preset, anatomy, API, states, внутренности компонента
или добавлять исключительный visual prop ради одного экрана. Такая потребность
переходит в отдельную breaking-change задачу.

## Набор skills

### Общие

- `task-intake` — классификация запроса и исходный scope;
- `scope-and-decision-gate` — полномочия, допущения и точки решения;
- `durable-task-state` — создание, обновление и восстановление task state;
- `handoff` — передача следующей роли по путям к проверенным артефактам;
- `breaking-change-assessment` — оценка совместимости;
- `verification-protocol` — выбор и запуск evidence-проверок;
- `close-task` — закрытие, интеграция и запись выводов.

### Компоненты

- `component-discovery`;
- `component-specification`;
- `reference-to-component-brief`;
- `component-to-pen-design`;
- `pen-design-audit`;
- `component-to-code`;
- `component-contract-review`;
- `asset-pipeline`.

### Экраны

- `screen-decomposition`;
- `screen-composition-plan`;
- `screen-build`;
- `screen-gap-and-skip`;
- `screen-fidelity-review`.

Skills описывают процедуру, но не заменяют state-задачи. Повторяемые проверки
следует переносить в versioned scripts и команды `mise`, а не в длинные prompts.

## Чего не хватает

### Для полного создания компонентов

1. Канонического шаблона и обязательного формата `component-spec.md`.
2. Правила, отличающего уникальную деталь экрана от нового переиспользуемого
   компонента.
3. Compatibility matrix для API, anatomy, variants, states, tokens, a11y, DOM,
   assets и visual baselines.
4. Закреплённого обратного потока `reference/design → brief → стандартный
   проектный компонент`.
5. Явной модели ownership и синхронизации Pen ↔ code.
6. Контракта и pipeline для image/logo assets, сопоставимого со зрелыми
   icon/font pipelines.
7. Исполняемых guardrails: уникальность recipes, component catalog completeness,
   защита от ложных экспортов, drift generated artifacts и contract tests.

### Для сборки экранов

1. Стандарта допустимых composition/layout-слоёв вокруг компонентов.
2. Машиночитаемого component catalog: purpose, props, variants, states, slots,
   a11y, examples и ограничения.
3. Обязательных `component-map`, `gap-register` и feasibility gate.
4. Матриц responsive/theme-приёмки для desktop/tablet/mobile и light/dark.
5. Стандарта fidelity evidence: визуальная проверка дополняет, но не заменяет
   contract, semantic и accessibility evidence.
6. Content model: реальные и placeholder-данные, локализация, переполнение и
   неизвестные значения.

## Последовательность внедрения

1. Зафиксировать role charters, статусы, authority, breaking и skip policies.
2. Ввести общие task templates и skills durable state / handoff / verification.
3. Ввести `component-spec`, discovery и component-contract review.
4. Ввести screen component map, gap register и запрет изменения компонентов в
   screen-задачах.
5. Собрать машиночитаемый каталог существующих компонентов.
6. Провести отдельный эксперимент обратного потока из референса в component
   brief и Pen/code реализацию.
7. Автоматизировать повторяющиеся гейты скриптами и `mise`-задачами.

## Связанное

- [opencode-multi-agent-orchestration](opencode-multi-agent-orchestration.md)
- [agent-work-model](agent-work-model.md)
- [roles](roles.md)
- [landing-system-roadmap](landing-system-roadmap.md)
- [pen-design-system-integration](pen-design-system-integration.md)
- [script-first-flows-and-agent-workspace](script-first-flows-and-agent-workspace.md)
