# Outputs history

Operating journal of all work products. `wiki/log.md` tracks wiki changes only.

## Latest experiment

[[experiments/card-component/README]] — **completed** (2026-09-30). Ветка
`experiment/card-component` от `main`, не влита. Первый составной компонент
`Card`: статический `<article>` без `onClick`, универсальный API (медиа, заголовок,
описание, маркер/иконка, две заметки футера, `actionButton` как `ButtonProps`),
заглушка медиа inline из `currentColor`-ассета. Реализован по плану в четырёх
задачах; `mise run check` и `check:deps` зелёные (166 unit, 34 browser); два
исполнения отличались от плана и перенесены в спецификацию; независимое ревью
нашло и закрыло два Important. Пользователь подтвердил результат и закрыл
эксперимент; интеграция ветки остаётся отдельным решением. Детали —
[[experiments/card-component/notes/results]].

Предыдущий — [[experiments/card-media-skeleton/README]] — completed (2026-09-30),
закрыт пользователем как случайный. Цель была узкой: проверить, может ли DeepSeek
сгенерировать SVG; ответ — может. Результат — самодостаточный ассет
`card-media.skeleton.svg` (кадр 16:9, монохром через `currentColor`). Открытый
вопрос про контракт изображений не решался; два его пункта закрыты в
`card-component` (подключение через `?raw` + inline и поведение внутри реального
`Card`).

Предыдущий — [[experiments/typography-asset-foundation/README]] — completed
(2026-09-30): детерминированный pipeline
`variable TTF → WOFF2 + manifest + generated CSS` для Inter, навык
`build-web-font`, задачи `fonts:build`/`fonts:check`, атомарные typography-шкалы
в foundation и первая композиция `Button.label`. Отложенное —
[[shared/notes/backlog]]. Следующий шаг по roadmap — составной `Card`.

## Experiments

| Experiment | Subject | Status | Outcome |
| --- | --- | --- | --- |
| [[experiments/card-component/README]] | Первый составной компонент `Card`: универсальный API, медиа со заглушкой, действие в футере, проверка модели компонента | completed (2026-09-30) | Реализован по плану в четырёх задачах на ветке `experiment/card-component` (не влита). Публичная анатомия `root/media/body/header/title/description/footer/footerPrimary/footerSecondary/actionButton`; данные каталога остаются в Storybook-композиции, а не в API. Два исполнения отличались от плана и перенесены в спецификацию: заглушка встроена inline через `?raw` (иначе `<img>` блокирует `currentColor`), и футер собран `flex-end` + auto-margin вместо `space-between`. Визуальная проверка нашла невалидное PEN/CSS значение `space_between`; follow-up review закрыло media sizing, пользовательский `dangerouslySetInnerHTML`, `actionButton.size: undefined`, browser-stories и документацию. Playground получил story-only controls для вложенных props. Пользователь признал результат и закрыл эксперимент; rules/models/Storybook backlog — [[experiments/card-component/notes/results]]. Проверки: `check` (166 unit, 34 browser), `check:deps`. Интеграция ветки — отдельное решение. |
| [[experiments/card-media-skeleton/README]] | Проверка генерации SVG-картинки агентом: самодостаточная заглушка медиа-слота `Card` | completed (2026-09-30) | Вывод пользователя: эксперимент случайный — цель была узкой, проверить, может ли DeepSeek сгенерировать SVG-картинку; ответ — да, может. Ассет `card-media.skeleton.svg`: кадр 16:9, монохром через `currentColor` + `fill-opacity`/`stroke-opacity` (`0.1` поверхность, `0.3` глиф), без анимации, `style`, `id`, фильтров и градиентов. Подтверждение ограничено одним ассетом и одним визуальным осмотром рендера (light/dark/tone, сжатие до 320px), плюс `xmllint`. Рамка вопроса про контракт изображений оказалась шире замысла и не решена: не проверены не-16:9 контейнер, `?raw` + inline и поведение внутри реального `Card`. Детали — [[experiments/card-media-skeleton/history]] |
| [[experiments/typography-asset-foundation/README]] | Typography asset foundation: Inter WOFF2 pipeline, skill, atomic foundation tokens, Button label composition | completed (2026-09-30) | Гипотеза подтверждена: шрифт живёт как asset-модуль с детерминированным pipeline `variable TTF → WOFF2 + manifest + generated CSS` и навыком `build-web-font`; foundation отдаёт атомарные шкалы (family/size/weight/line-height/tracking), а `Button.label` собирает из них типографику сам. `root` больше не владеет типографикой. WOFF2 сжимает raw TTF на ~60 %; повторная сборка побайтово идентична; в production output нет `.ttf`/`.otf`; кириллица рендерится. Subsetting, preload, textStyles и обновление шрифта — сознательно вне рамок. Ревью 2026-09-30: реализация признана хорошей, отложенное — [[shared/notes/backlog]]. Выводы: [[experiments/typography-asset-foundation/notes/results]], [[experiments/typography-asset-foundation/history]] |
| [[experiments/button-icon/README]] | ButtonIcon: кнопка только с иконкой из существующих деталей проекта | completed (2026-09-25) | Компонент `ButtonIcon` (квадратная кнопка только с иконкой, обязательные `icon` и `label`, размер и цвет иконки задаёт сам компонент) выведен из существующих деталей агентом-билдером в чистом контексте. Найдена и решена проблема shallow-слияния `theme` в Panda: компонентные словари собираются явно в `src/shared/styles/index.ts`, добавлен регрессионный тест. Проверки зелёные. Оценка автономности и ограничения — [[experiments/button-icon/notes/retrospective]] |
| [[experiments/button-icon-composition/README]] | Button↔Icon composition: публичный icon-based `Button`, сравнение с приватным `_Button` | completed (2026-09-25) | Один публичный `Button` принимает `IconName`, владеет размером и семантическими цветами по слотам (`label` — роль `text`, иконки — роль `icon`); `tone="icon"` удалён; приватный `_Button` проверен и удалён. Выводы — [[experiments/button-icon-composition/notes/retrospective]] |
| [[experiments/icon-asset-component/README]] | Icon asset component: asset-классификация, SVG→font pipeline, API, навыки обновления | completed (2026-09-25) | Гипотеза подтверждена: детерминированный pipeline `SVG → WOFF2`, стабильный manifest, тонкий `Icon` (размер/цвет/a11y), навыки `build-icon-font` и `update-icon-set`, поток обновления с защитой от breaking changes. Пользователь проверил набор на 17 glyphs из design-system панели через другую сессию агента. Icon font признан рабочим для монохромного набора (прямого сравнения с inline SVG не было). Урок: повторное обсуждение согласованных решений и избыточные прогоны проверок. Выводы: [[experiments/icon-asset-component/notes/results]], [[experiments/icon-asset-component/notes/retrospective]] |
| [[experiments/semantic-color-foundation/README]] | Semantic color foundation: palette-first, theme-aware semantic layers | completed (2026-09-24) | Гипотеза подтверждена: `colors.palette.*` + `colors.semantic.*` (6×11×5), opacity, shadow; Button/App мигрированы; Button state-контракт реализован в коде; PEN подтверждает выразимость (feasibility). Урок: побочная PEN-работа размыла фокус. Полная PEN-интеграция и следующий цикл — отдельно ([[shared/notes/landing-system-roadmap]]) |
| [[experiments/panda-design-system-rules/README]] | PandaCSS visual design-system rules: foundation and Button preset | completed (2026-09-22) | Rules подтверждены для single-part Button; crystallization: [[experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules]] |
| [[experiments/color-foundation-palette/README]] | Color foundation palette: staticPalette, roles, PandaCSS projection | completed (2026-09-22) | Статическая палитра и роли работают без semantic tokens; дизайн не изменён; foundation-имена очищены; выводы: [[experiments/color-foundation-palette/notes/results]] |
