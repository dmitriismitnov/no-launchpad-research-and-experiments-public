# Component Projection: промежуточное решение

Эта заметка фиксирует применимую в следующей итерации архитектурную формулировку.

## Решение

Компонент описывает собственную проекцию целиком: anatomy, parts, поддерживаемые global axes, public variants, interaction conditions, visual rules и опубликованные behavior states. Application manifest только активирует context; он не содержит отдельные component theme overrides.

Условия собираются локальными merge и nesting rules. Вложенность уточняет condition и задаёт precedence; compound cases пишутся только там, где они действительно нужны. Наследование и `extends` не используются.

Vocabulary делится на:

- `static`: неизменяемые константы (`space.x4`, `color.blue.600`, `duration.x150`);
- `dynamic`: редкие global policies, прежде всего motion mode.

`dynamic` консервативен: он не хранит component families, variants или общие component styles. Такие решения остаются в component-scoped projection.

## Открыто

- точная schema grammar и канонический nesting order;
- список supported global axes;
- глубина behavior contract: только published states либо также events/transitions.
