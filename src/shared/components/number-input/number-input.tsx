import type { ComponentProps, } from "react";
import { useId, useRef, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { numberInput, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Number Input. Компонент владеет `aria-invalid` и
 * `aria-describedby`; `type` фиксирован как `number`, а `size` отклонён, как у
 * `Input`.
 */
export type NumberInputProps = Omit<ComponentProps<"input">, "size" | "children" | "type"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Необязательная единица измерения справа от значения. */
    unit?: string;
    /** Показывает кнопки-степперы; включены по умолчанию. */
    stepper?: boolean;
};

/**
 * Числовое поле с необязательными кнопками-степперами. Нативный
 * `<input type="number">`; кнопки используют `stepUp` / `stepDown` и
 * пробрасывают нативное `input`-событие, поэтому работают и для
 * контролируемого, и для неконтролируемого режима.
 */
export const NumberInput = ({
    label,
    invalid = false,
    error,
    unit,
    stepper = true,
    disabled = false,
    className,
    id,
    ...props
}: NumberInputProps) => {
    const {
        size: _size,
        type: _type,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": _ariaDescribedBy,
        ...inputProps
    } = props as ComponentProps<"input">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = numberInput({ invalid, disabled, });
    const innerRef = useRef<HTMLInputElement>(null);

    const handleStep = (direction: 1 | -1) => {
        const input = innerRef.current;

        if ( disabled || input == null ) {
            return;
        }

        if ( direction === 1 ) {
            input.stepUp();
        } else {
            input.stepDown();
        }

        input.dispatchEvent(new Event("input", { bubbles: true, }));
    };

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <div className={styles.control}>
                <input
                    {...inputProps}
                    ref={innerRef}
                    id={controlId}
                    type="number"
                    disabled={disabled}
                    className={cx(styles.input, className)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={showError ? errorId : undefined}
                />
                {hasText(unit) && <span className={styles.unit}>{unit}</span>}
                {stepper && (
                    <span className={styles.stepper}>
                        <button
                            type="button"
                            className={styles.stepButton}
                            aria-label="Increase value"
                            disabled={disabled}
                            onClick={() => handleStep(1)}
                        >
                            <Icon name="plus" size="sm" />
                        </button>
                        <button
                            type="button"
                            className={styles.stepButton}
                            aria-label="Decrease value"
                            disabled={disabled}
                            onClick={() => handleStep(-1)}
                        >
                            <Icon name="minus" size="sm" />
                        </button>
                    </span>
                )}
            </div>
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
