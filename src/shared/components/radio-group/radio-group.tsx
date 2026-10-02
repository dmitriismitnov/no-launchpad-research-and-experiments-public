import type { ChangeEvent, ComponentProps, } from "react";
import { useId, useState, } from "react";

import { Radio, } from "@shared/components/radio";
import { cx, } from "@shared/styled-system/css";
import { radioGroup, } from "@shared/styled-system/recipes";

/**
 * Один вариант группы. Значение — стабильный ключ, label — видимый текст
 * радио-контрола.
 */
export type RadioGroupOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

/**
 * Публичные пропсы Radio Group. Значение — одна строка: контролируемое
 * (`value` + `onChange`) или неконтролируемое (`defaultValue`). `onChange`
 * получает выбранное значение, а не событие.
 */
export type RadioGroupProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Опции группы в порядке отображения. */
    options: readonly RadioGroupOption[];
    /** Контролируемое выбранное значение. */
    value?: string;
    /** Начальное выбранное значение, когда группа неконтролируемая. */
    defaultValue?: string;
    /** Вызывается с выбранным значением при каждом переключении. */
    onChange?: (value: string) => void;
    /** Общее имя нативных radio; по умолчанию генерируется. */
    name?: string;
    /** Видимый заголовок группы; иначе задайте `aria-label`. */
    label?: string;
    /** Подсказка под группой; скрывается, когда показана ошибка. */
    hint?: string;
    /** Помечает группу и все radio невалидными. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Раскладка вариантов. */
    orientation?: "vertical" | "horizontal";
    /** Отключает все radio группы. */
    disabled?: boolean;
    /** Доступное имя группы, когда нет видимого `label`. */
    "aria-label"?: string;
};

/**
 * Группа одиночного выбора: `role="radiogroup"` над нативными `Radio` с общим
 * `name`. Лейбл группы связывается через `aria-labelledby`, ошибка через
 * `aria-describedby`, невалидность через `aria-invalid`.
 */
export const RadioGroup = ({
    options,
    value,
    defaultValue,
    onChange,
    name,
    label,
    hint,
    invalid = false,
    error,
    orientation = "vertical",
    disabled = false,
    className,
    id,
    ...props
}: RadioGroupProps) => {
    const { "aria-label": ariaLabel, ...divProps } = props;
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const selected = isControlled ? value : uncontrolledValue;
    const generatedId = useId();
    const generatedName = useId();
    const baseId = id ?? generatedId;
    const labelId = `${baseId}-label`;
    const hintId = `${baseId}-hint`;
    const errorId = `${baseId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = radioGroup({ orientation, disabled, });
    const groupName = name ?? generatedName;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = event.target.value;

        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        onChange?.(next);
    };

    return (
        <div
            {...divProps}
            role="radiogroup"
            aria-labelledby={hasText(label) ? labelId : undefined}
            aria-label={hasText(label) ? undefined : ariaLabel}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cx(styles.root, className)}
        >
            {hasText(label) && (
                <span className={styles.label} id={labelId}>
                    {label}
                </span>
            )}
            <div className={styles.options}>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        name={groupName}
                        value={option.value}
                        label={option.label}
                        checked={selected === option.value}
                        disabled={disabled || option.disabled === true}
                        invalid={invalid}
                        onChange={handleChange}
                    />
                ))}
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
