import type { ComponentProps, KeyboardEvent, } from "react";
import { useState, } from "react";

import { Icon, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { rating, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Rating. Значение — число от 0 до `max`: контролируемое
 * (`value` + `onChange`) или неконтролируемое (`defaultValue`). `readOnly`
 * делает строку неинтерактивной, `size` выбирает шкалу глифа.
 */
export type RatingProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Контролируемая оценка; передавайте с `onChange`. */
    value?: number;
    /** Начальная оценка, когда контрол неконтролируемый. */
    defaultValue?: number;
    /** Вызывается с новой оценкой при выборе. */
    onChange?: (value: number) => void;
    /** Верхняя граница шкалы. */
    max?: number;
    /** Отключает выбор. */
    disabled?: boolean;
    /** Показывает оценку без взаимодействия. */
    readOnly?: boolean;
    /** Доступное имя группы. */
    label?: string;
    /** Размер глифа из общей шкалы Icon. */
    size?: IconSize;
    /** Показывает числовую оценку рядом со звёздами. */
    showValue?: boolean;
};

/**
 * Оценка из N глифов. Интерактивная строка — `role="radiogroup"` с кнопками
 * `role="radio"`: стрелки, Home и End меняют оценку, наведение показывает
 * предпросмотр. `readOnly` выводит строку как одно изображение без контролов.
 */
export const Rating = ({
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    disabled = false,
    readOnly = false,
    label,
    size = "md",
    showValue = false,
    className,
    onKeyDown,
    ...props
}: RatingProps) => {
    const [ uncontrolledValue, setUncontrolledValue, ] = useState(defaultValue);
    const [ hoverValue, setHoverValue, ] = useState<number | null>(null);
    const isControlled = value !== undefined;
    const current = clamp(isControlled ? value : uncontrolledValue, max);
    const isInteractive = !readOnly && !disabled;
    const displayValue = hoverValue ?? current;
    const styles = rating({ disabled, });

    const commit = (next: number) => {
        const clamped = clamp(next, max);

        if ( !isControlled ) {
            setUncontrolledValue(clamped);
        }

        onChange?.(clamped);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( !isInteractive || event.defaultPrevented ) {
            return;
        }

        if ( event.key === "ArrowRight" || event.key === "ArrowUp" ) {
            event.preventDefault();
            commit(current + 1);
        } else if ( event.key === "ArrowLeft" || event.key === "ArrowDown" ) {
            event.preventDefault();
            commit(current - 1);
        } else if ( event.key === "Home" ) {
            event.preventDefault();
            commit(1);
        } else if ( event.key === "End" ) {
            event.preventDefault();
            commit(max);
        }
    };

    return (
        <div
            {...props}
            className={cx(styles.root, className)}
            role={isInteractive ? "radiogroup" : "img"}
            aria-label={isInteractive ? ( label ?? "Rating" ) : `${current} out of ${max}`}
            onKeyDown={handleKeyDown}
            onMouseLeave={() => setHoverValue(null)}
        >
            {Array.from({ length: max, }, (_, index) => {
                const score = index + 1;
                const isFilled = score <= displayValue;
                const starStyles = rating({ filled: isFilled, disabled, });
                const isTabStop = current === score || ( current === 0 && score === 1 );

                if ( !isInteractive ) {
                    return (
                        <span key={score} className={starStyles.star} aria-hidden="true">
                            <Icon name="star" size={size} />
                        </span>
                    );
                }

                return (
                    <button
                        key={score}
                        type="button"
                        role="radio"
                        aria-checked={current === score}
                        aria-label={`${score} of ${max}`}
                        tabIndex={isTabStop ? 0 : -1}
                        className={starStyles.star}
                        onClick={() => commit(score)}
                        onMouseEnter={() => setHoverValue(score)}
                    >
                        <Icon name="star" size={size} />
                    </button>
                );
            })}
            {showValue && (
                <span className={styles.valueLabel}>
                    {`${current} / ${max}`}
                </span>
            )}
        </div>
    );
};

/** Держит оценку в `0..max`. */
function clamp(value: number, max: number): number {
    if ( !Number.isFinite(value) ) {
        return 0;
    }

    return Math.min(Math.max(Math.trunc(value), 0), max);
}
