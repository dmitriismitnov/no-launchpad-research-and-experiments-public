import type { ComponentProps, } from "react";
import { useId, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { switchControl, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Switch. Компонент владеет `aria-invalid` и
 * `aria-describedby`; роль зафиксирована как `switch`, а состояние
 * контролируется (`checked` + `onChange`) или нет (`defaultChecked`).
 */
export type SwitchProps = Omit<ComponentProps<"input">, "size" | "children" | "type"> & {
    /** Видимый текст рядом с контролом; связывается через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
};

/**
 * Переключатель: нативный checkbox под `role="switch"` и `aria-checked`.
 * Дорожка и бегунок следуют состоянию через `peer`-условия.
 */
export const Switch = ({
    label,
    invalid = false,
    error,
    checked,
    defaultChecked,
    onChange,
    className,
    id,
    ...props
}: SwitchProps) => {
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
    const [ uncontrolledChecked, setUncontrolledChecked, ] = useState(defaultChecked === true);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : uncontrolledChecked;
    const styles = switchControl({ invalid, disabled: inputProps.disabled === true, });

    const handleChange: NonNullable<ComponentProps<"input">["onChange"]> = (event) => {
        if ( !isControlled ) {
            setUncontrolledChecked(event.target.checked);
        }

        onChange?.(event);
    };

    return (
        <div className={styles.root}>
            <label className={styles.label} htmlFor={controlId}>
                <span className={styles.control}>
                    <input
                        {...inputProps}
                        id={controlId}
                        type="checkbox"
                        role="switch"
                        checked={isChecked}
                        onChange={handleChange}
                        className={cx(styles.input, "peer", className)}
                        aria-checked={isChecked}
                        aria-invalid={invalid || undefined}
                        aria-describedby={showError ? errorId : undefined}
                    />
                    <span className={styles.track} aria-hidden="true">
                        <span className={styles.thumb} />
                    </span>
                </span>
                {hasText(label) && <span className={styles.text}>{label}</span>}
            </label>
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
