import type { ComponentProps, } from "react";
import { useId, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { dateInput, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Date Input. Контрол — нативный `<input type="text">`
 * с декоративной иконкой календаря. Компонент владеет `aria-invalid` и
 * `aria-describedby`; потребительские значения этих двух атрибутов
 * игнорируются, чтобы связь «контрол ↔ ошибка» оставалась корректной.
 */
export type DateInputProps = Omit<ComponentProps<"input">, "size" | "children" | "type"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Подсказка под контролом; скрывается, когда показана ошибка. */
    hint?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
};

/**
 * Типизируемое поле даты под общим контрактом `Input`: лейбл сверху,
 * hint/error снизу, иконка календаря внутри поля и связка ARIA. Значение —
 * обычная строка; разбор и формат остаются за потребителем, а `placeholder`
 * подсказывает ожидаемый вид (`YYYY-MM-DD`).
 */
export const DateInput = ({
    label,
    hint,
    invalid = false,
    error,
    disabled = false,
    className,
    id,
    ...props
}: DateInputProps) => {
    const {
        size: _size,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": _ariaDescribedBy,
        ...inputProps
    } = props as ComponentProps<"input">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = dateInput({ invalid, disabled, });

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <div className={styles.control}>
                <Icon name="calendar" size="sm" className={styles.icon} />
                <input
                    {...inputProps}
                    id={controlId}
                    type="text"
                    disabled={disabled}
                    className={cx(styles.input, className)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                />
            </div>
            {showHint && (
                <p className={styles.hint} id={hintId}>
                    {hint}
                </p>
            )}
            {showError && (
                <p className={styles.error} id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
};

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
