import type { ComponentProps, } from "react";
import { useId, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { slider, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Slider. Значение — число; компонент владеет `aria-invalid`
 * и `aria-describedby`, а `type` фиксирован как `range`.
 */
export type SliderProps =
    & Omit<
        ComponentProps<"input">,
        "size" | "children" | "type" | "value" | "defaultValue" | "min" | "max"
    >
    & {
        /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
        label?: string;
        /** Помечает контрол невалидным: негативная дорожка + показ error. */
        invalid?: boolean;
        /** Сообщение об ошибке; показывается только когда invalid === true. */
        error?: string;
        /** Показывает текущее значение рядом с лейблом; по умолчанию выключено. */
        showValue?: boolean;
        /** Формат отображаемого значения; также задаёт `aria-valuetext`. */
        formatValue?: (value: number) => string;
        /** Контролируемое значение; передавайте с `onChange`. */
        value?: number;
        /** Начальное значение, когда слайдер неконтролируемый. */
        defaultValue?: number;
        /** Нижняя граница; по умолчанию 0. */
        min?: number;
        /** Верхняя граница; по умолчанию 100. */
        max?: number;
    };

/**
 * Ползунок: нативный `<input type="range">` над стилизованной дорожкой.
 * Дорожка, заливка и бегунок отражают значение; клавиатура и перетаскивание
 * остаются нативными.
 */
export const Slider = ({
    label,
    invalid = false,
    error,
    showValue = false,
    formatValue,
    value,
    defaultValue,
    min: minProp,
    max: maxProp,
    className,
    id,
    ref,
    ...props
}: SliderProps) => {
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
    const styles = slider({ invalid, disabled: inputProps.disabled === true, });
    const min = minProp ?? 0;
    const max = maxProp ?? 100;
    const [ uncontrolledValue, setUncontrolledValue, ] = useState(() => clamp(defaultValue ?? min, min, max));
    const isControlled = value !== undefined;
    const currentValue = clamp(isControlled ? value : uncontrolledValue, min, max);
    const percent = max === min ? 0 : ( ( currentValue - min ) / ( max - min ) ) * 100;
    const displayValue = formatValue != null ? formatValue(currentValue) : String(currentValue);

    const handleChange: NonNullable<ComponentProps<"input">["onChange"]> = (event) => {
        const next = Number(event.target.value);

        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        inputProps.onChange?.(event);
    };

    return (
        <div className={styles.root}>
            {( hasText(label) || showValue ) && (
                <div className={styles.header}>
                    {hasText(label) && (
                        <label className={styles.label} htmlFor={controlId}>
                            {label}
                        </label>
                    )}
                    {showValue && <span className={styles.value}>{displayValue}</span>}
                </div>
            )}
            <div className={styles.control}>
                <span className={styles.track} aria-hidden="true" />
                <span className={styles.range} style={{ width: `${percent}%`, }} aria-hidden="true" />
                <span className={styles.thumb} style={{ left: `${percent}%`, }} aria-hidden="true" />
                <input
                    {...inputProps}
                    ref={ref}
                    id={controlId}
                    type="range"
                    min={min}
                    max={max}
                    value={currentValue}
                    onChange={handleChange}
                    className={cx(styles.input, "peer", className)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={showError ? errorId : undefined}
                    aria-valuetext={formatValue != null ? displayValue : undefined}
                />
            </div>
            {showError && (
                <p className={styles.error} id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
};

function clamp(value: number, min: number, max: number): number {
    if ( !Number.isFinite(value) ) {
        return min;
    }

    if ( max < min ) {
        return min;
    }

    return Math.min(Math.max(value, min), max);
}

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
