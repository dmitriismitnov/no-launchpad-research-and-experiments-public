import type { ComponentProps, } from "react";
import { useEffect, useId, useRef, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { Tag, } from "@shared/components/tag";
import { cx, } from "@shared/styled-system/css";
import { multiSelect, } from "@shared/styled-system/recipes";

/**
 * Один вариант списка Multi Select. Значение — стабильный ключ, label —
 * видимый текст и текст чипа.
 */
export type MultiSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

/**
 * Публичные пропсы Multi Select. Значение — массив выбранных значений:
 * контролируемое (`value` + `onChange`) или неконтролируемое (`defaultValue`).
 */
export type MultiSelectProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Опции списка в порядке отображения. */
    options: readonly MultiSelectOption[];
    /** Лейбл над контролом; связывается с контролом через aria-labelledby. */
    label?: string;
    /** Подсказка под контролом; скрывается, когда показана ошибка. */
    hint?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Контролируемый набор выбранных значений; передавайте с `onChange`. */
    value?: readonly string[];
    /** Начальный набор значений, когда контрол неконтролируемый. */
    defaultValue?: readonly string[];
    /** Вызывается с новым набором при выборе или удалении чипа. */
    onChange?: (value: string[]) => void;
    /** Текст пустого контрола. */
    placeholder?: string;
    /** Отключает контрол и все опции. */
    disabled?: boolean;
    /** Сколько чипов показывать до счётчика переполнения. */
    maxVisible?: number;
    /** Доступное имя контрола, когда нет видимого лейбла. */
    "aria-label"?: string;
};

/**
 * Множественный выбор с чипами. Чипы — публичный `Tag`; список — встроенный
 * `role="listbox"` с `aria-multiselectable`, без порталов. Открытие и закрытие
 * управляются кнопкой-шевроном; `Escape` и клик вне закрывают список.
 */
export const MultiSelect = ({
    options,
    label,
    hint,
    invalid = false,
    error,
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled = false,
    maxVisible = 3,
    className,
    id,
    ...props
}: MultiSelectProps) => {
    const {
        "aria-label": ariaLabel,
        "aria-describedby": _ariaDescribedBy,
        "aria-invalid": _ariaInvalid,
        onKeyDown,
        ...divProps
    } = props;
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<string[]>(() => [ ...( defaultValue ?? [] ), ]);
    const [ isOpen, setIsOpen, ] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const isControlled = value !== undefined;
    const selected = isControlled ? [ ...value, ] : uncontrolledValue;
    const generatedId = useId();
    const baseId = id ?? generatedId;
    const labelId = `${baseId}-label`;
    const listboxId = `${baseId}-listbox`;
    const hintId = `${baseId}-hint`;
    const errorId = `${baseId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = multiSelect({ invalid, disabled, });
    const optionByValue = new Map(options.map((option) => [ option.value, option, ]));
    const selectedOptions = selected.map(
        (entry) => optionByValue.get(entry) ?? { value: entry, label: entry, },
    );
    const visibleOptions = maxVisible >= 0 ? selectedOptions.slice(0, maxVisible) : selectedOptions;
    const hiddenCount = selectedOptions.length - visibleOptions.length;

    const commit = (next: string[]) => {
        if ( !isControlled ) {
            setUncontrolledValue(next);
        }

        onChange?.(next);
    };

    const toggleOption = (optionValue: string) => {
        if ( disabled ) {
            return;
        }

        const isSelected = selected.includes(optionValue);
        commit(
            isSelected
                ? selected.filter((entry) => entry !== optionValue)
                : [ ...selected, optionValue, ],
        );
    };

    useEffect(() => {
        if ( !isOpen ) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if ( rootRef.current !== null && !rootRef.current.contains(event.target as Node) ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [ isOpen, ]);

    return (
        <div
            {...divProps}
            ref={rootRef}
            className={cx(styles.root, className)}
            onKeyDown={(event) => {
                onKeyDown?.(event);

                if ( event.key === "Escape" && isOpen ) {
                    setIsOpen(false);
                }
            }}
        >
            {hasText(label) && (
                <span className={styles.label} id={labelId}>
                    {label}
                </span>
            )}
            <div className={styles.control}>
                {selectedOptions.length === 0 && hasText(placeholder) && (
                    <span className={styles.placeholder}>{placeholder}</span>
                )}
                {visibleOptions.map((option) => (
                    <Tag
                        key={option.value}
                        label={option.label}
                        {...( disabled
                            ? {}
                            : {
                                onClose: () => toggleOption(option.value),
                                closeLabel: `Remove ${option.label}`,
                            } )}
                    />
                ))}
                {hiddenCount > 0 && <span className={styles.count}>{`+${hiddenCount}`}</span>}
                <button
                    type="button"
                    className={styles.toggle}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={listboxId}
                    aria-label={hasText(label) ? `${label} options` : ( ariaLabel ?? "Options" )}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    disabled={disabled}
                    onClick={() => setIsOpen((open) => !open)}
                >
                    <Icon name="chevron-down" size="sm" />
                </button>
            </div>
            {isOpen && (
                <div
                    id={listboxId}
                    role="listbox"
                    aria-multiselectable="true"
                    aria-labelledby={hasText(label) ? labelId : undefined}
                    aria-label={hasText(label) ? undefined : ariaLabel}
                    className={styles.listbox}
                >
                    {options.map((option) => {
                        const isSelected = selected.includes(option.value);
                        const optionStyles = multiSelect({
                            invalid,
                            disabled,
                            selected: isSelected,
                        });

                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                className={optionStyles.option}
                                disabled={disabled || option.disabled === true}
                                onClick={() => toggleOption(option.value)}
                            >
                                <span className={optionStyles.optionLabel}>{option.label}</span>
                                <Icon name="check" size="sm" className={optionStyles.check} />
                            </button>
                        );
                    })}
                </div>
            )}
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
