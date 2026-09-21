# Component Axes Model

## Четыре категории

- **Component variants:** публичные координаты компонента, выбираемые в макете и при использовании: `visual`, `size`.
- **System contexts:** условия, которые включаются приложением, окружением или пользователем: `theme`, позднее `density`.
- **Behavior states:** состояния от runtime или business logic: `disabled`, `loading`, `invalid`, `selected`, `open`.
- **Interaction conditions:** сигналы платформы: `_hover`, `_focusVisible`, `_active`.

Variants желательно делать ортогональными. Если групп `m`, а в группе `i` есть `nᵢ` значений, потенциальное число базовых комбинаций равно `∏ᵢ₌₁ᵐ nᵢ`. Например, `visual(2) × size(3) = 6`.

System contexts расширяют пространство анализа, но rules пишутся property-local только там, где реально меняется решение. `theme` обычно влияет на visual properties, `density` — на sizing properties. Behavior states могут пересекать все оси, но `disabled` чаще является overriding state: он подавляет interactive response, а не создаёт полный новый слой сочетаний.

Рабочий Panda nesting order: `theme -> hover -> focusVisible`. Density и behavior states добавляются после проверки на реальных компонентах.
