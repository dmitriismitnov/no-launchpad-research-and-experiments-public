# Сравнение подходов

Задача 7 плана. Ветка `experiment/button-icon-composition`.

## Подходы

- **A.** Исходный `Button` с `prefixIcon`/`suffixIcon` как `ReactNode`; потребитель
  сам создаёт `Icon` и выбирает его размер.
- **B.** Один публичный `Button` принимает `IconName` и сам создаёт `Icon`
  (измерен временно, без постоянной второй версии).
- **C.** Приватный node-based `_Button` + публичный icon-based `Button`
  (текущая реализация).

## Метрики

| Метрика | B | C |
| --- | --- | --- |
| Строк в `button.tsx` | 63 | 87 |
| Компонентов | 1 | 2 (один приватный) |
| Типов props | 1 | 2 (второй приватный, выведен из публичного) |
| Публичный API | `ButtonProps` (`IconName`) | идентичен |
| Лишний импорт | — | `ReactNode` |
| Прослойка передачи props | нет | есть |

B измерен временно, в рабочем дереве, до фикса `ref` (см. Important в ревью); фикс
меняет базовый тип в обоих вариантах одинаково, поэтому разница ≈ 24 строки и один
компонент сохраняется. Постоянная реализация — C. Готового артефакта B в истории
нет; эквивалентный фрагмент приведён в конце заметки.

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

## Решение и рекомендация

- **Решение (ruling Task 7):** оставить C в текущем виде как согласованную модель
  и default плана; не удалять в этом прогоне.
- **Рекомендация:** если в обозримом будущем не появится конкретный неиконочный
  потребитель слота, `_Button` остаётся чистой прослойкой — тогда его следует
  свернуть до B (минус ≈ 24 строки, минус компонент и тип). Правка — фрагмент B в
  конце заметки.
- Отдельно: сама связка `Button ↔ Icon` (принятие `IconName`, владение размером
  и цветом) даёт результат независимо от судьбы `_Button` — это подтверждено
  тестами и отсутствием визуальных изменений.

## Фрагмент B (эквивалент свёрнутого варианта)

Пригоден как замена `button.tsx` целиком: публичный API, включая `ref`,
сохраняется.

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
