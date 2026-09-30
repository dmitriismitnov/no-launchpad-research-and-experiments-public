# Card Component — итоги эксперимента

## Вывод пользователя

В целом результатом довольны: работа была достаточно автономной, а
эксперимент удержан в согласованных границах.

## Что планировалось и выполнено

| План | Результат |
| --- | --- |
| Универсальный `Card` без каталоговых полей | Выполнено: статический `<article>` с `title`, `description`, `media`, `header`, `footer`, `actionButton`. |
| Slot recipe и явная регистрация Panda | Выполнено: полная анатомия слотов, preset в общем сборщике, barrel учтён Knip. |
| 16:9 медиа с заглушкой | Выполнено: supplied `<img>` либо локальный inline SVG; проверены обе темы и геометрия raster fixture. |
| Кнопка в футере через существующий Button | Выполнено: `ButtonProps`, default `sm`, явный размер и `undefined` покрыты. |
| Storybook и browser-проверки | Выполнено: reference, edge-case и light/dark stories; Playground с section-controls для вложенных props; Code panel включён только для Card. |
| Качество и независимое ревью | Выполнено: follow-up замечания закрыты регрессиями; свежий `check` — 166 unit / 34 browser, Knip чист. |

## Что не делалось намеренно

Это не дефекты Card v1, а границы scope:

- card-level click/link/keyboard interaction;
- `children`, compound API и custom media renderer;
- visual/size variants, responsive typography, loading и image-error fallback;
- production image pipeline и миграция потребителей;
- публичная role для muted text на surface.

## Что отложено

- Поведение с external/production raster media и в контейнерах, отличных от
  16:9; локальная квадратная fixture покрывает только decode и заполнение
  media-slot.
- Системная проверка contrast для cross-projection muted text: точные пары Card
  проверены, но правило не поднято в foundation.
- Решение о вариантах, уровне заголовка и интерактивной модели — только при
  появлении реального product-требования.

## Что улучшилось по ходу

- Chromium выявил невалидное PEN/CSS значение `space_between`; browser-тест
  превратил находку в регрессию.
- Вложенные объектные props получили usable Storybook Playground без изменения
  публичного API.
- Закрыты реальные границы React/Panda: unsafe `dangerouslySetInnerHTML`,
  `size: undefined`, невалидный `full` в CSS и пустые optional regions.
- `Card` структурирован как public orchestration-слой с private частями ниже
  него: `Media`, `Body`, `BodyHeader`, `BodyFooter`, `hasText`.

## Оценка автономности

Автономность была высокой для реализации и проверки: агент следовал
согласованному scope, фиксировал отклонения, добавлял регрессии и не закрывал
эксперимент или не вливал ветку без команды пользователя.

Ограничение проявилось в эргономике и структуре: выделение private частей,
правило порядка declarations, удобный Storybook Playground и Code panel были
уточнены пользователем уже после базовой реализации. Это не выход за scope, но
показывает, что такие требования нужно превратить из review-наблюдений в
предварительные правила.

## Следующий цикл: приоритеты процесса

### 1. Skills для кода и ревью

Сначала провести отдельный design/skill эксперимент, не добавляя правила
непроверенными в общий процесс. Целевой контракт:

- **Component build skill:** imports → module constants → public types и
  exports → private types/configuration → private components/helpers. Публичное
  располагается выше private; private не экспортируется без отдельной причины.
- **Component review skill:** проверяет API ownership, пустые regions,
  prop-spreads и defaults, валидность CSS/Panda значений, границы inline HTML,
  локальность fixtures, testable browser geometry и актуальность docs.
- **Code-smell checklist:** запрещает размножение источников истины,
  неиспользуемые controls, remote assets в детерминированных stories, comments
  без неочевидной причины и private abstraction без одной ясной обязанности.

Сначала правила должны жить в skills/review checklist. Автоматический AST/lint
script стоит добавлять только для повторяющихся, механически проверяемых правил
после нескольких компонентов.

### 2. Роли моделей

Предложенная схема: GPT Terra для plan и review, DeepSeek Flash для build.
Перед настройкой нужно проверить точные доступные model IDs, стоимость и
качество на одном контрольном задании. Build-модель должна эскалировать в Terra
изменения публичного API, security/accessibility границы, неясный дизайн или
любую красную проверку; Terra остаётся владельцем решения и ревью.

### 3. Storybook

Зафиксировать отдельные правила story authoring: section-controls для nested
props, `if` для зависимых controls, story-only adapter без изменения component
API, локальные fixtures, одна literal usage-story и browser assertions для
geometry/computed styles, когда они критичны.

Отдельным spike проверить и ранжировать:

- Autodocs (`tags: ["autodocs"]`) и единый Docs template;
- перевод существующего `a11y.test: "todo"` в enforceable policy после
  baseline-аудита;
- встроенные viewport/background/measure/outline tools;
- интеграцию design links или visual-regression service, только если появится
  стабильный внешний design source.

Code panel уже включён локально для Card; включать его глобально следует после
оценки качества generated source в других stories.
