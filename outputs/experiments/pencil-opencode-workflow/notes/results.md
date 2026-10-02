# Results — Pencil × OpenCode workflow

**Status:** success with deferred items (2026-10-02). **Model:** `deepseek/deepseek-flash` (single model, all roles).

## Hypothesis

A project-local OpenCode skill can drive Pencil MCP predictably enough to
compose a new dashboard flow, consistent with the existing design system and
without AI slop, using durable state, isolated artifacts, reviews and a
controlled checkpoint.

## Evidence for

- The skill `pencil-design-experiment` was created, discovered by OpenCode, and
  loaded successfully, including its references and templates.
- Durable state (`README`, `roadmap`, `todo`, `log`, `history`) drove the work
  across many turns and survived a model switch.
- Code/Pen contracts were inventoried (5 code components, token ownership, theme
  mechanism, 17 icon keys) and the code↔Pen border divergence was found.
- An isolated Pen copy was created and verified byte-identical; the source was
  never mutated.
- A real Create Project form section was composed **only from existing refs and
  tokens** (Field, Button, Select, Date Input) and rendered as a credible,
  non-template dashboard form in light theme.
- A reproducible render-cache workaround (touch the frame) was discovered and
  written into the skill.

## Evidence against / limitations

- Full autonomy is **not** confirmed: the flow is incomplete (no Description,
  invalid, success, dark, tablet/mobile) because each composition step is slow
  and fragile.
- `ref` variant overrides are unsupported; masters are not uniform drop-ins
  (`Date Picker` popup, `Textarea` field break); a layout overlap in `Actions`
  did not resolve with repeated touches.
- Multiple whole-document scans and `FindEmptySpace` caused `InternalError:
  interrupted`, forcing single-scan call design.
- Independent cross-model review became impossible when GPT limits were
  exhausted; the same model wrote and reviewed its own work. The only genuinely
  independent check left is the human visual review.
- Visual verification depends on the render-cache workaround; without it the
  agent mistakes a correct composition for a blank/failed one.

## Verdict

**Partially confirmed.** The workflow, skill, durable state, isolation and audit
methodology work. Reliable, fully autonomous, visually verified design
composition does not, within this environment and context. The core user
question — whether Pen can be driven from OpenCode as effectively as from its
own UI — is answered **not yet**, with concrete, reproducible reasons.

## Recommended next steps

1. Open `artifacts/create-project.pen` in the native Pen UI and compare the
   rendered result and the overlap with the agent's report.
2. New session: resume from the handoff and finish the flow (Description,
   invalid/empty, success, dark, tablet/mobile), re-reading the skill's
   limitations first.
3. Separate micro-experiment: how to express component variants from MCP, and
   whether opening/saving in the UI clears the render/layout cache staleness.


## Second pass in ex_2.pen

После инцидента изоляции пользователь создал и открыл `artifacts/ex_2.pen`. Через `get_app_state` подтверждено, что активный редактор — именно `ex_2.pen`; в него загружена копия дизайн-системы (82 masters). MCP не умеет переключать документы: активный документ задаёт пользователь.

В `ex_2.pen` собраны пять экранов только из existing refs:

- `WqoYt` — форма Create Project, desktop light;
- `R1Yg8` — та же форма, desktop dark;
- `iKbNI` — пустая/невалидная форма;
- `XKqHF` — entry Projects;
- `negSS` — success Projects с баннером и созданным проектом.

Рендеры — в `artifacts/render/`. Layout без overlap, тема light/dark из одних токенов, исходник не изменялся. Отложено: явные validation-сообщения (нужен Field invalid variant, недоступный через ref) и tablet/mobile.


## Критично: изменения MCP не персистятся на диск

Проверка после второго прохода: `artifacts/ex_2.pen` на диске и в коммите `a94891d` байт-идентичен исходной дизайн-системе (`c9695a1d…`) — **без собранных экранов**. То есть экраны существовали только в памяти редактора и были утеряны при перезагрузке документа.

Следствие: без явного сохранения (Save) в нативном Pen UI MCP-работа не появляется в `.pen`-файле, не версионируется и не передаётся. Это ограничивает применимость workflow: агент может собрать макет и показать рендер, но не может гарантировать артефакт.

Практическое правило: после сборки попросить пользователя сохранить документ (Cmd+S) и проверить изменение хэша файла. Только после этого артефакт считается доставленным.
