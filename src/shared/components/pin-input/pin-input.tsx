import type { ChangeEvent, ClipboardEvent, ComponentProps, KeyboardEvent, } from "react";
import { useId, useRef, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { pinInput, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Pin Input. Значение — строка: контролируемое (`value` +
 * `onChange`) или неконтролируемое (`defaultValue`). Компонент владеет
 * `aria-invalid` и `aria-describedby` на каждой ячейке.
 */
export type PinInputProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Видимый лейбл над ячейками; связывается с группой через aria-labelledby. */
    label?: string;
    /** Число ячеек кода. */
    length?: number;
    /** Контролируемое значение; передавайте с `onChange`. */
    value?: string;
    /** Начальное значение, когда контрол неконтролируемый. */
    defaultValue?: string;
    /** Вызывается с новой строкой при каждом вводе, удалении и вставке. */
    onChange?: (value: string) => void;
    /** Отключает ввод. */
    disabled?: boolean;
    /** Помечает ввод невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Подсказка под ячейками; скрывается, когда показана ошибка. */
    hint?: string;
    /** Маскирует введённые символы. */
    masked?: boolean;
    /** Имя скрытого поля для отправки формы. */
    name?: string;
    /** Доступное имя группы, когда нет видимого лейбла. */
    "aria-label"?: string;
};

/**
 * Код из N односимвольных ячеек. Ввод продвигает фокус вперёд, Backspace
 * очищает и возвращает назад, стрелки двигают фокус, вставка заполняет ячейки
 * целиком. Ячейки несут одну общую группу с `aria-labelledby` и собственные
 * `aria-label`, поэтому весь код озвучивается как одно поле.
 */
export const PinInput = ({
    label,
    length = 6,
    value,
    defaultValue,
    onChange,
    disabled = false,
    invalid = false,
    error,
    hint,
    masked = false,
    name,
    className,
    id,
    ...props
}: PinInputProps) => {
    const { "aria-label": ariaLabel, ...divProps } = props;
    const [ uncontrolledValue, setUncontrolledValue, ] = useState(defaultValue ?? "");
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;
    const digits = Array.from({ length, }, (_, index) => currentValue[index] ?? "");
    const generatedId = useId();
    const baseId = id ?? generatedId;
    const labelId = `${baseId}-label`;
    const hintId = `${baseId}-hint`;
    const errorId = `${baseId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = pinInput({ invalid, disabled, });
    const accessibleName = ariaLabel ?? ( hasText(label) ? label : "Verification code" );

    const commit = (next: string) => {
        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        onChange?.(next);
    };

    const focusCell = (index: number) => {
        const target = inputsRef.current[index];

        target?.focus();
        target?.select();
    };

    const setCharAt = (index: number, char: string): string => {
        const chars = Array.from({ length, }, (_, position) => currentValue[position] ?? "");
        chars[index] = char;

        return chars.join("");
    };

    const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const char = event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(-1);

        if ( char !== "" && index > currentValue.length ) {
            focusCell(currentValue.length);

            return;
        }

        commit(setCharAt(index, char));

        if ( char !== "" && index < length - 1 ) {
            focusCell(index + 1);
        }
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
        if ( event.key === "Backspace" && ( currentValue[index] ?? "" ) === "" && index > 0 ) {
            event.preventDefault();
            commit(setCharAt(index - 1, ""));
            focusCell(index - 1);

            return;
        }

        if ( event.key === "ArrowLeft" && index > 0 ) {
            event.preventDefault();
            focusCell(index - 1);

            return;
        }

        if ( event.key === "ArrowRight" && index < length - 1 ) {
            event.preventDefault();
            focusCell(index + 1);
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
        const pasted = event.clipboardData
            .getData("text")
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, length);

        if ( pasted === "" ) {
            return;
        }

        event.preventDefault();
        commit(Array.from({ length, }, (_, index) => pasted[index] ?? "").join(""));
        focusCell(Math.min(pasted.length, length - 1));
    };

    return (
        <div
            {...divProps}
            role="group"
            aria-label={hasText(label) ? undefined : accessibleName}
            aria-labelledby={hasText(label) ? labelId : undefined}
            className={cx(styles.root, className)}
        >
            {hasText(label) && (
                <label className={styles.label} id={labelId} htmlFor={`${baseId}-0`}>
                    {label}
                </label>
            )}
            <div className={styles.cells} onPaste={handlePaste}>
                {digits.map((digit, index) => (
                    <span key={index} className={styles.cell}>
                        <input
                            ref={(element) => {
                                inputsRef.current[index] = element;
                            }}
                            id={`${baseId}-${index}`}
                            type={masked ? "password" : "text"}
                            inputMode="numeric"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                            maxLength={1}
                            value={digit}
                            disabled={disabled}
                            aria-label={`${accessibleName} character ${index + 1}`}
                            aria-invalid={invalid || undefined}
                            aria-describedby={describedBy}
                            className={styles.input}
                            onChange={handleChange(index)}
                            onKeyDown={handleKeyDown(index)}
                            onFocus={(event) => event.target.select()}
                        />
                    </span>
                ))}
            </div>
            {hasText(name) && <input type="hidden" name={name} value={currentValue} />}
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
