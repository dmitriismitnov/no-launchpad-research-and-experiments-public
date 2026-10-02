import type { ComponentProps, } from "react";
import { useId, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { select as selectRecipe, } from "@shared/styled-system/recipes";

/**
 * Один вариант нативного `<option>`. Значение — стабильный ключ, label —
 * видимый текст.
 */
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

/**
 * Публичные пропсы Select. Контрол — нативный `<select>`, поэтому клавиатура,
 * type-ahead, отправка формы и озвучивание выбранного варианта остаются
 * нативными. Компонент владеет `aria-invalid` и `aria-describedby`.
 */
export type SelectProps = Omit<ComponentProps<"select">, "size" | "children"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Подсказка под контролом; скрывается, когда показана ошибка. */
    hint?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Варианты списка в порядке отображения. */
    options: readonly SelectOption[];
    /** Текст пустого варианта; при заданном значении не показывается. */
    placeholder?: string;
};

/**
 * Нативный селект под общим полевым контрактом `Input`: лейбл сверху,
 * hint/error снизу, декоративный шеврон и связка ARIA. Popup и поиск из Pen
 * заменены системным выпадающим списком.
 */
export const Select = ({
    label,
    hint,
    invalid = false,
    error,
    options,
    placeholder,
    disabled = false,
    className,
    id,
    ...props
}: SelectProps) => {
    const {
        size: _size,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": _ariaDescribedBy,
        ...selectProps
    } = props as ComponentProps<"select">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = selectRecipe({ invalid, disabled, });

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <div className={styles.control}>
                <select
                    {...selectProps}
                    id={controlId}
                    disabled={disabled}
                    className={cx(styles.select, className)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                >
                    {hasText(placeholder) && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <Icon name="chevron-down" size="sm" className={styles.chevron} />
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
