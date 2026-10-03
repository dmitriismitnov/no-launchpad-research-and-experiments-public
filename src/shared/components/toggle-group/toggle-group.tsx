import type { ComponentProps, KeyboardEvent, } from "react";
import { useRef, useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { toggleGroup, } from "@shared/styled-system/recipes";

type ToggleGroupOptionBase = {
    /** Stable value pressed into the group array. */
    value: string;
    /** Необязательный ведущий глиф; декоративный, если есть видимый текст. */
    icon?: IconName;
    /** Per-item disabled state; the group-level `disabled` also applies. */
    disabled?: boolean;
};

/**
 * Одна опция группы: с видимым `label` или иконковая, которой нужен непустой
 * `aria-label`.
 */
export type ToggleGroupOption =
    & ToggleGroupOptionBase
    & (
        | {
            /** Visible label; the item's accessible name. */
            label: string;
            /** Необязательное явное доступное имя. */
            "aria-label"?: string;
        }
        | {
            /** Иконковая форма без видимого текста. */
            label?: undefined;
            /** Обязательное непустое доступное имя для иконковой формы. */
            "aria-label": string;
        }
    );

/** Режим выбора группы: один активный элемент или независимые переключатели. */
type ToggleGroupSelectionMode = "single" | "multiple";

/**
 * Публичные пропсы Toggle Group. Значение — массив выбранных опций: в
 * `single`-режиме значим только первый элемент. Состояние контролируемое
 * (`value` + `onChange`) или неконтролируемое (`defaultValue`).
 */
export type ToggleGroupProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Опции группы в порядке отображения. */
    options: readonly ToggleGroupOption[];
    /** `single` — ровно один активный элемент (radiogroup); `multiple` — по умолчанию. */
    selectionMode?: ToggleGroupSelectionMode;
    /** Контролируемый набор выбранных значений; передавайте с `onChange`. */
    value?: readonly string[];
    /** Начальный набор выбранных значений, когда группа неконтролируемая. */
    defaultValue?: readonly string[];
    /** Вызывается с следующим набором при каждом изменении. */
    onChange?: (value: string[]) => void;
    /** Отключает все элементы группы. */
    disabled?: boolean;
    /** Доступное имя группы; обязательно, потому что группа не имеет видимого заголовка. */
    "aria-label": string;
};

/**
 * Группа переключателей на общей поверхности. В `multiple`-режиме каждый
 * элемент несёт `aria-pressed` внутри `role="group"`. В `single`-режиме группа
 * проецируется как `role="radiogroup"`: элементы несут роль `radio` и
 * `aria-checked`, один tab stop, стрелки двигают фокус по включённым элементам,
 * а Enter/Space выбирают сфокусированный элемент.
 */
export const ToggleGroup = ({
    options,
    selectionMode = "multiple",
    value,
    defaultValue,
    onChange,
    disabled = false,
    className,
    onKeyDown,
    ...props
}: ToggleGroupProps) => {
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<string[]>(() => [ ...( defaultValue ?? [] ), ]);
    const [ focusedValue, setFocusedValue, ] = useState<string | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const isControlled = value !== undefined;
    const isSingle = selectionMode === "single";
    const selectedValues = isControlled ? [ ...value, ] : uncontrolledValue;
    const selectedValue = isSingle ? selectedValues[0] : undefined;
    const enabledValues = options
        .filter((option) => !disabled && option.disabled !== true)
        .map((option) => option.value);
    const selectedIsEnabled = selectedValue !== undefined && enabledValues.includes(selectedValue);
    const focusedIsEnabled = focusedValue !== null && enabledValues.includes(focusedValue);
    const tabStop = focusedIsEnabled
        ? focusedValue
        : selectedIsEnabled
        ? selectedValue
        : enabledValues[0];
    const styles = toggleGroup();

    const handleSelect = (optionValue: string) => {
        if ( isSingle ) {
            if ( optionValue === selectedValue ) {
                return;
            }

            if ( !isControlled ) {
                setUncontrolledValue([ optionValue, ]);
            }

            setFocusedValue(optionValue);
            onChange?.([ optionValue, ]);

            return;
        }

        const isPressed = selectedValues.includes(optionValue);
        const next = isPressed
            ? selectedValues.filter((entry) => entry !== optionValue)
            : [ ...selectedValues, optionValue, ];

        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        onChange?.(next);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( !isSingle || event.defaultPrevented ) {
            return;
        }

        const delta = event.key === "ArrowRight" || event.key === "ArrowDown"
            ? 1
            : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? -1
            : 0;

        if ( delta === 0 ) {
            return;
        }

        const target = event.target as HTMLElement | null;
        const currentIndex = target === null
            ? -1
            : itemRefs.current.findIndex((item) => item === target || item?.contains(target) === true);

        if ( currentIndex < 0 ) {
            return;
        }

        event.preventDefault();

        const nextIndex = findEnabledIndex(itemRefs.current, currentIndex, delta);

        if ( nextIndex < 0 ) {
            return;
        }

        const nextOption = options[nextIndex];

        if ( nextOption !== undefined ) {
            setFocusedValue(nextOption.value);
        }

        itemRefs.current[nextIndex]?.focus();
    };

    return (
        <div
            {...props}
            role={isSingle ? "radiogroup" : "group"}
            className={cx(styles.root, className)}
            onKeyDown={handleKeyDown}
        >
            {options.map((option, index) => {
                const itemDisabled = disabled || option.disabled === true;
                const hasLabel = option.label !== undefined && option.label.length > 0;
                const optionName = hasLabel ? option.label : option["aria-label"];

                if ( !hasLabel && ( optionName === undefined || optionName.length === 0 ) ) {
                    throw new Error(
                        "ToggleGroup: every option needs a non-empty `label` or `aria-label`.",
                    );
                }

                const isPressed = isSingle ? option.value === selectedValue : selectedValues.includes(option.value);
                const isTabStop = !isSingle || option.value === tabStop;
                const itemStyles = toggleGroup({ pressed: isPressed, disabled: itemDisabled, });

                return (
                    <button
                        key={option.value}
                        ref={(node) => {
                            itemRefs.current[index] = node;
                        }}
                        type="button"
                        role={isSingle ? "radio" : undefined}
                        aria-checked={isSingle ? isPressed : undefined}
                        aria-pressed={isSingle ? undefined : isPressed}
                        aria-label={hasLabel ? undefined : optionName}
                        tabIndex={isSingle ? ( isTabStop ? 0 : -1 ) : undefined}
                        className={itemStyles.item}
                        disabled={itemDisabled}
                        onClick={() => handleSelect(option.value)}
                        onFocus={() => {
                            if ( isSingle ) {
                                setFocusedValue(option.value);
                            }
                        }}
                    >
                        {option.icon != null && <Icon className={itemStyles.icon} name={option.icon} size="sm" />}
                        {hasLabel && <span className={itemStyles.label}>{option.label}</span>}
                    </button>
                );
            })}
        </div>
    );
};

/** Индекс следующего включённого элемента с переносом, пропуская disabled. */
function findEnabledIndex(
    refs: Array<HTMLButtonElement | null>,
    currentIndex: number,
    delta: number,
): number {
    const count = refs.length;

    if ( count === 0 ) {
        return -1;
    }

    let index = currentIndex;

    for ( let step = 0; step < count; step += 1 ) {
        index = ( index + delta + count ) % count;

        if ( refs[index]?.disabled !== true ) {
            return index;
        }
    }

    return -1;
}
