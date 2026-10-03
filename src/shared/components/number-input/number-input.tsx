import type { ComponentProps, } from "react";
import { useId, useRef, useState, } from "react";

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
 * Числовое поле с необязательными кнопками-степперами. Контролем остаётся
 * нативный `<input type="number">`; кнопки используют `stepUp` / `stepDown`,
 * которые сами клампят значение к `min` / `max`. Pen `EZfrL` показывает
 * состояние «min / max reached», поэтому при достижении границы кластер
 * степпера деактивируется, а значение всё ещё можно ввести с клавиатуры.
 */
export const NumberInput = ({
    label,
    invalid = false,
    error,
    unit,
    stepper = true,
    disabled = false,
    readOnly = false,
    className,
    id,
    value,
    defaultValue,
    onChange,
    min,
    max,
    step,
    ...props
}: NumberInputProps) => {
    const {
        size: _size,
        type: _type,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": externalDescribedBy,
        ...inputProps
    } = props as ComponentProps<"input">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = numberInput({ invalid, disabled, });
    const innerRef = useRef<HTMLInputElement>(null);
    const [ uncontrolledValue, setUncontrolledValue, ] = useState(
        () => ( defaultValue == null ? "" : String(defaultValue) ),
    );
    const currentValue = value !== undefined ? String(value) : uncontrolledValue;
    const currentNumber = toFiniteNumber(currentValue);
    const minNumber = toFiniteNumber(min);
    const maxNumber = toFiniteNumber(max);
    const atMin = currentNumber !== undefined && minNumber !== undefined && currentNumber <= minNumber;
    const atMax = currentNumber !== undefined && maxNumber !== undefined && currentNumber >= maxNumber;
    // Pen `EZfrL` (`ox2RF` / `W1OqsJ`): a reached bound disables the whole
    // stepper (`Stepper ENABLED=false`) so neither button can move the value
    // off a bound; the native input stays editable and is the only way out.
    // `readOnly` and `disabled` deactivate the accelerator the same way.
    const stepperDisabled = disabled || readOnly || atMin || atMax;

    const handleChange: NonNullable<ComponentProps<"input">["onChange"]> = (event) => {
        if ( value === undefined ) {
            setUncontrolledValue(event.target.value);
        }

        onChange?.(event);
    };

    const handleStep = (direction: 1 | -1) => {
        const input = innerRef.current;

        if ( disabled || readOnly || stepperDisabled || input == null ) {
            return;
        }

        if ( direction === 1 ) {
            input.stepUp();
        } else {
            input.stepDown();
        }

        if ( value === undefined ) {
            setUncontrolledValue(input.value);
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
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={cx(styles.input, className)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={showError ? errorId : externalDescribedBy}
                />
                {hasText(unit) && <span className={styles.unit}>{unit}</span>}
                {stepper && (
                    <span className={styles.stepper}>
                        <button
                            type="button"
                            className={styles.stepButton}
                            aria-label="Increase value"
                            disabled={stepperDisabled}
                            onClick={() => handleStep(1)}
                        >
                            <Icon name="plus" size="sm" />
                        </button>
                        <button
                            type="button"
                            className={styles.stepButton}
                            aria-label="Decrease value"
                            disabled={stepperDisabled}
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

/** Число из строкового/числового пропса; `undefined`, если его нельзя разобрать. */
function toFiniteNumber(value: string | number | undefined): number | undefined {
    if ( value === undefined || value === "" ) {
        return undefined;
    }

    const parsed = typeof value === "number" ? value : Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
}
