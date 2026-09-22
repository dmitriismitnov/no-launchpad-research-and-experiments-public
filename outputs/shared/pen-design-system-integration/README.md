# PEN Design-System Integration — Artifacts

Общий пакет вне эксперимента. Артефакты исследовательского трека по интеграции
PEN-макета в единую дизайн-систему. Связанная заметка:
[pen-design-system-integration](../notes/pen-design-system-integration.md).

## Что здесь лежит

```text
design/design_raw.migrated.pen   результат частичной миграции (step 1 draft)
tools/migrate-pen.ts             строковый мигратор: rename ролей + палитра
tools/verify-pen.py              проверка эквивалентности значений по хешам
```

## Фактический статус артефакта

Это **черновик первого шага**, а не подтверждённая миграция:

- добавлены 33 palette variables `ds/palette/<family>/<step>`;
- переименована часть system-ролей (`ds/surface-base`, `ds/ink-strong`,
  `ds/ink-soft`, `ds/line-strong`, `ds/accent-base`, `ds/status-danger`);
- значения ролей сохранены, композиция и node id не менялись.

Чего в `.pen` **нет** (хотя может упоминаться в черновиках заметок):

- aliases `role → palette`: 0;
- ссылок элементов на `ds/palette/*`: 0 (палитра не подключена);
- component tokens (`ds/components/button/*`): 0;
- foundation-групп `ds/spacing-xN`, `ds/border-width-xN`, `ds/font-weight-*`: 0;
- обновлённого token board под палитру и component tokens.

Итог: палитра добавлена, но изолирована. Роли по-прежнему хранят literal values,
поэтому изменение палитры не влияет на макет.

## Как проверялось

`tools/verify-pen.py <file.pen>` печатает `count/ordered/sum/distinct` — хеш
строки из значений свойств, которые миграция могла переписать, с резолвом
переменных и наследованием темы. Совпадение хешей до и после доказывает
идентичность результата. Для step 1 хеши совпадают; alias-цепочки в артефакте
отсутствуют, поэтому alias-поведение этим файлом не проверено.

`tools/migrate-pen.ts` запускается из корня репозитория и перезаписывает
`design/design_raw.migrated.pen`. Пути в нём указывают на старую папку
эксперимента и требуют обновления при следующем запуске.

## Открытые вопросы

Перечислены в
[pen-design-system-integration](../notes/pen-design-system-integration.md).

## Статус

Backlog. Вне активных экспериментов.
