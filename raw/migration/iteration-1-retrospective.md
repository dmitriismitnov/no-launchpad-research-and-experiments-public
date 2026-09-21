# Iteration 1 Retrospective

## Вывод

Полная platform-agnostic implementation оказалась преждевременной. Первая итерация сузила задачу до применимой основы: component-scoped visual rules, небольшой static vocabulary, application-level system contexts и Panda CSS как implementation layer.

Компонент многомерно настраивается через public variants, system contexts, behavior states и interaction conditions. Полный декартов продукт нужен для анализа, но не для генерации всех rules: локально описываются только реальные пересечения.

## Что подтвердилось

- Компонент должен быть центром visual definition: он локально описывает anatomy, public variants и visual rules.
- Static constants и редкие global policies связывают стиль, но не должны становиться component-family overrides.
- Open UI и DTCG полезны как агностичные референсы; Panda CSS, Ark UI и Zag JS показывают реализацию на web-платформе.
- Перенос решений из PEN в код возможен с малым ручным участием, если rules реализации заданы явно.

## Следующая итерация

Перенести статичный landing page в рабочий codebase без интерактивности, с тестами и существующим boilerplate. Цель: проверить architecture на реальном интерфейсе, стабилизировать Panda rules и записать или отложить пограничные случаи.

Не строить длинный roadmap: новые проблемы в исследовательской работе появляются последовательно. Решать только blocker текущей задачи; observation без текущей стоимости фиксировать отдельно.
