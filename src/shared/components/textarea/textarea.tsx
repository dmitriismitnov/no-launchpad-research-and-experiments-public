import type { ComponentProps, } from "react";
import { useId, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { textarea, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Textarea. Компонент владеет `aria-invalid` и
 * `aria-describedby`: потребительские значения этих двух атрибутов
 * игнорируются, чтобы связь «контрол ↔ ошибка» оставалась корректной.
 */
export type TextareaProps = Omit<ComponentProps<"textarea">, "children"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Показывает счётчик символов; по умолчанию включён при заданном `maxLength`. */
    showCount?: boolean;
};

/**
 * Многострочное текстовое поле. Делит контракт `Input`: тот же лейбл,
 * ошибка и связка ARIA, плюс необязательный счётчик символов снизу.
 */
export const Textarea = ({
    label,
    invalid = false,
    error,
    showCount,
    className,
    id,
    maxLength,
    value,
    defaultValue,
    onChange,
    ...props
}: TextareaProps) => {
    const {
        "aria-invalid": _ariaInvalid,
        "aria-describedby": _ariaDescribedBy,
        ...textareaProps
    } = props as ComponentProps<"textarea">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = textarea({ invalid, });
    const [ uncontrolledLength, setUncontrolledLength, ] = useState(
        () => String(defaultValue ?? "").length,
    );
    const currentLength = value !== undefined ? String(value).length : uncontrolledLength;
    const showCounter = showCount ?? maxLength != null;

    const handleChange: NonNullable<ComponentProps<"textarea">["onChange"]> = (event) => {
        if ( value === undefined ) {
            setUncontrolledLength(event.target.value.length);
        }

        onChange?.(event);
    };

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <textarea
                {...textareaProps}
                id={controlId}
                maxLength={maxLength}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={cx(styles.control, className)}
                aria-invalid={invalid || undefined}
                aria-describedby={showError ? errorId : undefined}
            />
            {showCounter && (
                <div className={styles.footer}>
                    <span className={styles.counter} role="status" aria-live="polite">
                        {maxLength != null && (
                            <span className={styles.visuallyHidden}>
                                {Math.max(maxLength - currentLength, 0)} characters remaining
                            </span>
                        )}
                        <span aria-hidden={maxLength != null ? true : undefined}>
                            {maxLength != null ? `${currentLength} / ${maxLength}` : currentLength}
                        </span>
                    </span>
                </div>
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
