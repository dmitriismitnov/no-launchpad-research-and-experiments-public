import type { ComponentProps, } from "react";
import { useEffect, useId, useRef, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { checkbox, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Checkbox. Компонент владеет `aria-invalid` и
 * `aria-describedby`; нативный `<input type="checkbox">` остаётся источником
 * состояния (`checked` / `defaultChecked` / `onChange`).
 */
export type CheckboxProps = Omit<ComponentProps<"input">, "size" | "children" | "type"> & {
    /** Видимый текст рядом с контролом; связывается через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Смешанное состояние; доменное свойство input, выставляется через ref. */
    indeterminate?: boolean;
};

/**
 * Флажок: нативный checkbox под кастомным 18px квадратом. Квадрат и глиф
 * следуют нативным `:checked` / `:indeterminate` / `:focus-visible` через
 * `peer`-условия, поэтому поведение остаётся браузерным.
 */
export const Checkbox = ({
    label,
    invalid = false,
    error,
    indeterminate = false,
    className,
    id,
    ...props
}: CheckboxProps) => {
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
    const styles = checkbox({ invalid, disabled: inputProps.disabled === true, });
    const innerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if ( innerRef.current != null ) {
            innerRef.current.indeterminate = indeterminate;
        }
    }, [ indeterminate, ]);

    return (
        <div className={styles.root}>
            <label className={styles.label} htmlFor={controlId}>
                <span className={styles.control}>
                    <input
                        {...inputProps}
                        ref={innerRef}
                        id={controlId}
                        type="checkbox"
                        className={cx(styles.input, "peer", className)}
                        aria-invalid={invalid || undefined}
                        aria-describedby={showError ? errorId : undefined}
                    />
                    <span className={styles.box} aria-hidden="true" />
                    <Icon className={styles.mark} name={indeterminate ? "minus" : "check"} size="sm" />
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
