import type { ChangeEvent, ClipboardEvent, ComponentProps, FocusEvent, KeyboardEvent, } from "react";
import { useId, useRef, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { pinInput, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Pin Input. Значение — строка: контролируемое (`value` +
 * `onChange`) или неконтролируемое (`defaultValue`). Один input владеет всем
 * кодом: ячейки — презентационные, а `aria-invalid` / `aria-describedby`
 * принадлежат единственному контролу.
 */
export type PinInputProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Видимый лейбл над ячейками; связывается с контролом через aria-labelledby. */
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
 * Код из N ячеек. Pen `K8gNTw` (`znfZu`): один доступный input владеет кодом
 * (`autocomplete="one-time-code"`), а ячейки — презентационными; активная
 * ячейка отмечается рамкой. Ввод продвигает маркер, Backspace возвращает на
 * шаг назад, стрелки двигают маркер, вставка заполняет весь код. Живой регион
 * `polite` объявляет, сколько символов осталось (`X856Z2`).
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
    const [ focused, setFocused, ] = useState(false);
    const [ caret, setCaret, ] = useState(() => clampCaret(( defaultValue ?? value ?? "" ).length, length));
    const inputRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;
    const digits = Array.from({ length, }, (_, index) => currentValue[index] ?? "");
    const generatedId = useId();
    const baseId = id ?? generatedId;
    const inputId = `${baseId}-input`;
    const labelId = `${baseId}-label`;
    const hintId = `${baseId}-hint`;
    const errorId = `${baseId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = pinInput({ invalid, disabled, });
    const accessibleName = ariaLabel ?? ( hasText(label) ? label : "Verification code" );
    const activeIndex = Math.min(caret, length - 1);
    const remaining = Math.max(length - currentValue.length, 0);

    const commit = (next: string) => {
        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        onChange?.(next);
    };

    const syncCaret = (position: number) => setCaret(clampCaret(position, length));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = sanitize(event.target.value).slice(0, length);

        commit(next);
        syncCaret(event.target.selectionStart ?? next.length);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if ( event.key === "ArrowLeft" || event.key === "ArrowRight" ) {
            event.preventDefault();

            const step = event.key === "ArrowLeft" ? -1 : 1;
            // Bound to the typed value so the marker and the native caret stay
            // identical: a native caret cannot be placed past the end of the
            // value, and without this the browser would silently clamp the
            // selection while the decorative marker moved on.
            const next = clampCaret(caret + step, currentValue.length);

            syncCaret(next);
            inputRef.current?.setSelectionRange(next, next);
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const pasted = sanitize(event.clipboardData.getData("text")).slice(0, length);

        if ( pasted === "" ) {
            return;
        }

        event.preventDefault();
        commit(pasted);
        syncCaret(pasted.length);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        syncCaret(event.target.selectionStart ?? currentValue.length);
    };

    return (
        <div {...divProps} className={cx(styles.root, className)}>
            {hasText(label) && (
                <label className={styles.label} id={labelId} htmlFor={inputId}>
                    {label}
                </label>
            )}
            <div className={styles.cells} onClick={() => inputRef.current?.focus()}>
                {digits.map((digit, index) => (
                    <span
                        key={index}
                        className={styles.cell}
                        aria-hidden="true"
                        data-active={focused && index === activeIndex ? "true" : undefined}
                    >
                        {masked && digit !== "" ? "•" : digit}
                    </span>
                ))}
            </div>
            <input
                ref={inputRef}
                id={inputId}
                type={masked ? "password" : "text"}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={length}
                value={currentValue}
                disabled={disabled}
                aria-label={hasText(label) ? undefined : accessibleName}
                aria-labelledby={hasText(label) ? labelId : undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={styles.input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onFocus={handleFocus}
                onBlur={() => setFocused(false)}
            />
            <span className={styles.live} role="status" aria-live="polite">
                {remainingLabel(remaining)}
            </span>
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

/** Оставляет только допустимые символы кода. */
function sanitize(value: string): string {
    return value.replace(/[^a-zA-Z0-9]/g, "");
}

/** Держит позицию каретки в диапазоне `0..length`. */
function clampCaret(position: number, length: number): number {
    if ( !Number.isFinite(position) ) {
        return 0;
    }

    return Math.min(Math.max(Math.trunc(position), 0), length);
}

/** Объявление оставшихся символов для живого региона. */
function remainingLabel(remaining: number): string {
    return remaining === 1 ? "1 character remaining" : `${remaining} characters remaining`;
}

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
