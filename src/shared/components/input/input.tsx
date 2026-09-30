import type { ComponentProps, } from "react";
import { useId, } from "react";

import { cx, } from "@shared/styled-system/css";
import { input, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Input. Компонент владеет `aria-invalid` и
 * `aria-describedby`: потребительские значения этих двух атрибутов
 * игнорируются, чтобы связь «контрол ↔ ошибка» оставалась корректной.
 */
export type InputProps = Omit<ComponentProps<"input">, "size" | "children"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
};

export const Input = ({
    label,
    invalid = false,
    error,
    className,
    id,
    ...props
}: InputProps) => {
    const {
        size: _size,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": _ariaDescribedBy,
        ...inputProps
    } = props as ComponentProps<"input">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = input({ invalid, });

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <input
                {...inputProps}
                id={controlId}
                className={cx(styles.control, className)}
                aria-invalid={invalid || undefined}
                aria-describedby={showError ? errorId : undefined}
            />
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
