import type { ComponentProps, } from "react";
import { useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { toggleGroup, } from "@shared/styled-system/recipes";

export type ToggleGroupOption = {
    /** Stable value pressed into the group array. */
    value: string;
    /** Visible label; the item's accessible name. */
    label: string;
    /** Per-item disabled state; the group-level `disabled` also applies. */
    disabled?: boolean;
};

/**
 * Публичные пропсы Toggle Group. Значение — массив нажатых опций: одиночный
 * выбор это массив из одного элемента. Состояние контролируемое (`value` +
 * `onChange`) или неконтролируемое (`defaultValue`).
 */
export type ToggleGroupProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Опции группы в порядке отображения. */
    options: readonly ToggleGroupOption[];
    /** Контролируемый набор нажатых значений; передавайте с `onChange`. */
    value?: readonly string[];
    /** Начальный набор нажатых значений, когда группа неконтролируемая. */
    defaultValue?: readonly string[];
    /** Вызывается с следующим набором при каждом переключении. */
    onChange?: (value: string[]) => void;
    /** Отключает все элементы группы. */
    disabled?: boolean;
    /** Доступное имя группы; обязательно, потому что группа не имеет видимого заголовка. */
    "aria-label": string;
};

/**
 * Группа кнопок-переключателей на общей поверхности. Каждый элемент несёт
 * `aria-pressed`; группа помечена `role="group"`.
 */
export const ToggleGroup = ({
    options,
    value,
    defaultValue,
    onChange,
    disabled = false,
    className,
    ...props
}: ToggleGroupProps) => {
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<string[]>(() => [ ...( defaultValue ?? [] ), ]);
    const isControlled = value !== undefined;
    const pressedValues = isControlled ? [ ...value, ] : uncontrolledValue;
    const styles = toggleGroup();

    const handleToggle = (optionValue: string) => {
        const isPressed = pressedValues.includes(optionValue);
        const next = isPressed
            ? pressedValues.filter((entry) => entry !== optionValue)
            : [ ...pressedValues, optionValue, ];

        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        onChange?.(next);
    };

    return (
        <div {...props} role="group" className={cx(styles.root, className)}>
            {options.map((option) => {
                const itemDisabled = disabled || option.disabled === true;
                const isPressed = pressedValues.includes(option.value);
                const itemStyles = toggleGroup({ pressed: isPressed, disabled: itemDisabled, });

                return (
                    <button
                        key={option.value}
                        type="button"
                        className={itemStyles.item}
                        aria-pressed={isPressed}
                        disabled={itemDisabled}
                        onClick={() => handleToggle(option.value)}
                    >
                        <span className={itemStyles.label}>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
