# Сравнение подходов

Задача 7 плана. Ветка `experiment/button-icon-composition`.

**Итог: выбран вариант B; приватный `_Button` удалён по ревью пользователя.**

## Подходы

- **A.** Исходный `Button` с `prefixIcon`/`suffixIcon` как `ReactNode`; потребитель
  сам создаёт `Icon` и выбирает его размер.
- **B.** Один публичный `Button` принимает `IconName` и сам создаёт `Icon` —
  итоговый вариант.
- **C.** Приватный node-based `_Button` + публичный icon-based `Button` —
  реализован, признан избыточным и удалён по ревью.

## Метрики (на момент сравнения)

| Метрика | B | C |
| --- | --- | --- |
| Строк в `button.tsx` | 63 | 87 |
| Компонентов | 1 | 2 (один приватный) |
| Типов props | 1 | 2 (второй приватный, выведен из публичного) |
| Публичный API | `ButtonProps` (`IconName`) | идентичен |
| Лишний импорт | — | `ReactNode` |
| Прослойка передачи props | нет | есть |

Таблица историческая. B измерялся временно в рабочем дереве до фикса `ref`;
постоянной реализацией тогда была C, итогом стал B (после свёртывания — 64
строки, один компонент, один публичный тип). Разница между вариантами — около
24 строк и один компонент.

## Ключевой факт

Публичный API B и C **идентичен**: и там, и там `Button` принимает `IconName` и
сам управляет размером и цветом иконки. Разделение `_Button`/`Button` меняет
только внутреннюю структуру, поэтому пользы для потребителя не даёт по
определению.

## Что даёт C

- Разделение ответственностей: `_Button` владеет DOM, слотами и recipe;
  публичный `Button` — адаптацией «имя → узел» и подбором размера.
- Node-возможность слота остаётся внутренней и не попадает в публичный API.
- При появлении неиконочного содержимого слота (например, индикатора загрузки)
  точка расширения уже существует.

## Что стоит

- +20 строк, второй компонент, второй (приватный) тип props, лишний импорт.
- Косвенность: чтобы увидеть разметку, нужно перейти в `_Button`.
- Node-гибкость `_Button` **непроверяема снаружи** — он не экспортируется,
  поэтому его «польза» не покрыта тестами и не может быть использована
  потребителем.

## Вывод

По критерию README («понятная польза, которую нельзя объяснить только
предполагаемыми будущими потребностями») **доказуемой текущей пользы у `_Button`
нет**: единственный аргумент — будущий неиконочный контент слота, то есть
гипотеза.

При этом цена мала и ограничена внутренней структурой: публичный API, DOM и
визуальный результат не меняются, а разделение обратимо.

## Решение

- Изначально (ruling Task 7) C оставлен: цена мала, публичный API не меняется.
- **Изменено по ревью пользователя:** `_Button` удалён, реализация сведена к B.
  Прогноз подтвердился — слой не давал доказуемой пользы, а свёртывание не
  изменило ни публичный API, ни DOM, ни визуальный результат (`test:visual`
  прошёл без обновления baseline).
- Итог: `button.tsx` 64 строки, один компонент, один публичный тип props;
  приватной осталась только таблица `ICON_SIZE_BY_BUTTON_SIZE`.
- Связка `Button ↔ Icon` (принятие `IconName`, владение размером и цветом) даёт
  результат независимо от разделения — подтверждено тестами.

## Фрагмент B (исторический)

Запись того, как выглядел вариант B на момент сравнения. **Не является заменой
текущего `button.tsx`:** в `ButtonTone` ниже ещё присутствует удалённый
`tone="icon"`, а назначение цвета по слотам живёт в `preset.ts` и в этот фрагмент
не входит. Актуальная реализация —
`src/shared/components/button/button.tsx`.

```tsx
import type { ComponentProps, } from "react";

import { Icon, type IconName, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { button, } from "@shared/styled-system/recipes";

export type ButtonTone = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md";

const ICON_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, IconSize> = {
    sm: "sm",
    md: "sm",
};

export type ButtonProps = ComponentProps<"button"> & {
    tone?: ButtonTone;
    size?: ButtonSize;
    prefixIcon?: IconName;
    suffixIcon?: IconName;
};

export const Button = ({
    tone = "primary",
    size = "md",
    prefixIcon,
    suffixIcon,
    children,
    className,
    ...props
}: ButtonProps) => {
    const styles = button({ tone, size, });
    const iconSize = ICON_SIZE_BY_BUTTON_SIZE[size];

    return (
        <button {...props} className={cx(styles.root, className)}>
            {prefixIcon != null && (
                <span className={styles.prefixIcon}>
                    <Icon name={prefixIcon} size={iconSize} />
                </span>
            )}
            {children != null && <span className={styles.label}>{children}</span>}
            {suffixIcon != null && (
                <span className={styles.suffixIcon}>
                    <Icon name={suffixIcon} size={iconSize} />
                </span>
            )}
        </button>
    );
};
```
