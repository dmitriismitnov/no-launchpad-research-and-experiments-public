# Input Component — history

- 2026-09-30 — эксперимент открыт. Ветка `experiment/input-component` от `main`.
  Зафиксированы вопрос, scope, модель и критерии успеха (`README.md`).
- 2026-09-30 — созданы артефакты эксперимента до кода: `README.md`, `plan.md`
  (копия плана), `notes/design-spec.md` (детальная спецификация Input v1),
  `notes/execution-log.md` (скелет журнала), этот `history.md`
  (`d1c47d0`).
- 2026-09-30 — визуальный рецепт и регистрация (`c107c0a`): `inputRecipe`/
  `inputPreset`, слоты `root/label/control/error`, единственный вариант
  `invalid`; пресет зарегистрирован в `src/shared/styles/index.ts`, регрессия
  `presets.test.ts` дополнена `input`; `mise run gen` отработал.
- 2026-09-30 — компонент и barrel (`268ba8d`): `Input`, `InputProps`,
  `htmlFor`/`id`/`aria-invalid`/`aria-describedby`, `useId` при отсутствии
  потребительского `id`, проброс нативных атрибутов, мерж `className`, пустые
  опциональные области не рендерятся; barrel зарегистрирован entry-точкой в
  `knip.jsonc`.
- 2026-09-30 — stories и browser-проверки (`cccc34a`): 7 stories
  (`Playground`, `Reference`, `Minimal`, `Invalid`, `Disabled`, `Light`, `Dark`)
  с play-проверками; `mise run test:browser` — 41 pass.
- 2026-09-30 — визуальная проверка headless Chromium по `iframe.html` (десктоп-
  браузер не был подключён): control 50px, radius 6px, padding 12px, gap 6px,
  focus-visible `solid 2px brand.500`, invalid рамка/текст `negative.600`,
  disabled `opacity .45` + `not-allowed`, фон white/black в light/dark,
  контент не обрезан. Storybook запущен на 6007 (6006 занят давним
  dev-сервером) и остановлен после проверки.
- 2026-09-30 — интеграционные проверки: `mise run check` (184 unit / 41 browser,
  lint/types/format/icons/fonts) и `check:deps` — зелёные.
- 2026-09-30 — закрыт разрыв плана: два входа `Review Focus` (п.2 `invalid` без
  непустого `error`, п.6 controlled/uncontrolled), обещанные Self-Review, но не
  покрытые перечнем тестов Task 2, добавлены composition-регрессиями
  (`chore(input): verify input integration`). Тест п.2 проверен негативным
  контролем.
- 2026-09-30 — заполнены `notes/execution-log.md` (решения, проверки, границы,
  открытые вопросы) и `notes/results.md` (итоги и оценка автономности).
- 2026-09-30 — эксперимент **не закрыт**: закрытие — по прямой команде
  пользователя. Ветка `experiment/input-component` не влита.
