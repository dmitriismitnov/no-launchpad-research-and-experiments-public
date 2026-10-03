import type { ComponentProps, KeyboardEvent, } from "react";
import { useEffect, useId, useRef, useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { select as selectRecipe, } from "@shared/styled-system/recipes";

/**
 * Один вариант списка. Значение — стабильный ключ, label — видимый текст.
 * Форма совпадает с `SelectOption` из Pen `GjzX0` (Option).
 */
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

/**
 * Добавочная группа вариантов. Рендерится после плоского списка `options`;
 * группы не заменяют плоские варианты, а дополняют их.
 */
export type SelectGroup = {
    label: string;
    options: readonly SelectOption[];
};

/**
 * Публичные пропсы Select. Pen `tOLtR` — это combobox: закрытый триггер со
 * значением/плейсхолдером и выпадающий popup с опциями. `Option` (`GjzX0`) и
 * `Select Popup` (`aXD61`) остаются внутренней анатомией и не экспортируются.
 *
 * Выбор контролируемый (`value` + `onChange`) или неконтролируемый
 * (`defaultValue`). `searchable` показывает поле ввода в popup, но компонент
 * сам никогда не фильтрует варианты: он отдаёт `query` наружу через
 * `onQueryChange` и не применяет политику поиска.
 */
export type SelectProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue" | "children"> & {
    /** Лейбл над контролом; связывается с триггером через aria-labelledby. */
    label?: string;
    /** Подсказка под контролом; скрывается, когда показана ошибка. */
    hint?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Плоские варианты в порядке отображения. */
    options: readonly SelectOption[];
    /** Добавочные группы вариантов; рендерятся после плоского списка. */
    groups?: readonly SelectGroup[];
    /** Текст пустого контрола. */
    placeholder?: string;
    /** Отключает триггер. */
    disabled?: boolean;
    /** Декоративная иконка перед значением; размер и цвет задаёт Select. */
    prefixIcon?: IconName;
    /** Контролируемое значение; передавайте с `onChange`. */
    value?: string;
    /** Начальное значение, когда контрол неконтролируемый. */
    defaultValue?: string;
    /** Вызывается с выбранным значением. */
    onChange?: (value: string) => void;
    /** Показывает поле поиска в popup; фильтрация не выполняется компонентом. */
    searchable?: boolean;
    /** Контролируемый текст запроса; передавайте с `onQueryChange`. */
    query?: string;
    /** Начальный текст запроса, когда контрол неконтролируемый. */
    defaultQuery?: string;
    /** Вызывается с новым текстом запроса. */
    onQueryChange?: (query: string) => void;
};

type Placement = "top" | "bottom";

const ROW_HEIGHT = 36;
const MAX_POPUP_HEIGHT = 288;

/**
 * Combobox с одним значением. Триггер держит combobox-семантику
 * (`aria-expanded` / `aria-activedescendant`), popup — `role="listbox"` без
 * портала. Стрелки перемещают активную опцию (пропуская disabled), `Enter`
 * выбирает, `Escape` закрывает без выбора. `Option` и внутренний popup
 * остаются приватными частями этого файла.
 */
export const Select = ({
    label,
    hint,
    invalid = false,
    error,
    options,
    groups,
    placeholder,
    disabled = false,
    prefixIcon,
    value,
    defaultValue,
    onChange,
    searchable = false,
    query,
    defaultQuery,
    onQueryChange,
    className,
    id,
    ...props
}: SelectProps) => {
    const {
        "aria-label": ariaLabel,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": externalDescribedBy,
        size: _size,
        children: _children,
        onKeyDown,
        ...divProps
    } = props as ComponentProps<"div"> & { size?: unknown; };
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<string | undefined>(defaultValue);
    const [ uncontrolledQuery, setUncontrolledQuery, ] = useState(defaultQuery ?? "");
    const [ isOpen, setIsOpen, ] = useState(false);
    const [ placement, setPlacement, ] = useState<Placement>("bottom");
    const [ activeIndex, setActiveIndex, ] = useState(-1);
    const [ announcement, setAnnouncement, ] = useState("");
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const baseId = id ?? generatedId;
    const labelId = `${baseId}-label`;
    const listboxId = `${baseId}-listbox`;
    const hintId = `${baseId}-hint`;
    const errorId = `${baseId}-error`;
    const isControlled = value !== undefined;
    const isQueryControlled = query !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;
    const currentQuery = isQueryControlled ? query : uncontrolledQuery;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : externalDescribedBy );
    const styles = selectRecipe({ invalid, disabled, });
    const groupEntries = collectGroupEntries(options, groups);
    const ordered: SelectOption[] = [
        ...options,
        ...( groups ?? [] ).flatMap((group) => [ ...group.options, ]),
    ];
    const selectedOption = ordered.find((option) => option.value === currentValue);
    const displayValue = selectedOption?.label ?? ( hasText(currentValue) ? currentValue : undefined );
    const optionId = (index: number) => `${baseId}-option-${index}`;

    const enabledIndices = (): number[] =>
        ordered.reduce<number[]>((indices, option, index) => {
            if ( option.disabled !== true ) {
                indices.push(index);
            }

            return indices;
        }, []);

    const firstEnabled = (): number => enabledIndices()[0] ?? -1;
    const lastEnabled = (): number => {
        const indices = enabledIndices();

        return indices.length === 0 ? -1 : ( indices[indices.length - 1] ?? -1 );
    };

    const measurePlacement = (): Placement => {
        const trigger = triggerRef.current;

        if ( trigger === null ) {
            return "bottom";
        }

        const rect = trigger.getBoundingClientRect();
        const estimated = Math.min(ordered.length * ROW_HEIGHT + 12, MAX_POPUP_HEIGHT);
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        return spaceBelow < estimated && spaceAbove > spaceBelow ? "top" : "bottom";
    };

    const openPopup = () => {
        if ( disabled ) {
            return;
        }

        setPlacement(measurePlacement());

        const selectedIndex = ordered.findIndex(
            (option) => option.value === currentValue && option.disabled !== true,
        );

        setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled());
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setActiveIndex(-1);
        triggerRef.current?.focus();
    };

    const selectOption = (option: SelectOption) => {
        if ( disabled || option.disabled === true ) {
            return;
        }

        if ( !isControlled ) {
            setUncontrolledValue(option.value);
        }

        onChange?.(option.value);
        setAnnouncement(`${option.label} selected`);
        setIsOpen(false);
        setActiveIndex(-1);
        triggerRef.current?.focus();
    };

    const moveActive = (delta: number) => {
        const indices = enabledIndices();

        if ( indices.length === 0 ) {
            return;
        }

        const position = indices.indexOf(activeIndex);
        const nextPosition = position === -1
            ? ( delta > 0 ? 0 : indices.length - 1 )
            : ( position + delta + indices.length ) % indices.length;
        const next = indices[nextPosition];

        if ( next !== undefined ) {
            setActiveIndex(next);
        }
    };

    const handleQueryChange: NonNullable<ComponentProps<"input">["onChange"]> = (event) => {
        const next = event.target.value;

        if ( !isQueryControlled ) {
            setUncontrolledQuery(next);
        }

        onQueryChange?.(next);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( disabled ) {
            return;
        }

        const { key, } = event;

        if ( key === "Escape" ) {
            if ( isOpen ) {
                event.preventDefault();
                closePopup();
            }

            return;
        }

        if ( key === "ArrowDown" || key === "ArrowUp" ) {
            event.preventDefault();

            if ( !isOpen ) {
                openPopup();

                return;
            }

            moveActive(key === "ArrowDown" ? 1 : -1);

            return;
        }

        if ( !isOpen ) {
            return;
        }

        if ( key === "Home" ) {
            event.preventDefault();
            setActiveIndex(firstEnabled());

            return;
        }

        if ( key === "End" ) {
            event.preventDefault();
            setActiveIndex(lastEnabled());

            return;
        }

        if ( key === "Enter" || key === " " ) {
            const option = ordered[activeIndex];

            if ( option !== undefined && option.disabled !== true ) {
                event.preventDefault();
                selectOption(option);
            }
        }
    };

    // Closing on an outside press mirrors Popover; the listener exists only while open.
    useEffect(() => {
        if ( !isOpen ) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if ( rootRef.current !== null && !rootRef.current.contains(event.target as Node) ) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [ isOpen, ]);

    // The search field takes focus when the popup opens so typing reaches it.
    useEffect(() => {
        if ( isOpen && searchable ) {
            searchRef.current?.focus();
        }
    }, [ isOpen, searchable, ]);

    const renderRow = (option: SelectOption, index: number) => {
        const isSelected = option.value === currentValue;
        const isActive = index === activeIndex;

        return (
            <button
                key={`${option.value}-${index}`}
                id={optionId(index)}
                type="button"
                role="option"
                aria-selected={isSelected}
                data-active={isActive ? "true" : undefined}
                disabled={disabled || option.disabled === true}
                className={styles.option}
                onClick={() => selectOption(option)}
            >
                <span className={styles.optionLabel}>{option.label}</span>
                <Icon
                    name="check"
                    size="sm"
                    className={styles.optionCheck}
                    data-selected={isSelected ? "true" : undefined}
                />
            </button>
        );
    };

    return (
        <div {...divProps} ref={rootRef} className={styles.root} onKeyDown={handleKeyDown}>
            {hasText(label) && (
                <span className={styles.label} id={labelId}>
                    {label}
                </span>
            )}
            <div className={styles.control}>
                <button
                    ref={triggerRef}
                    type="button"
                    id={baseId}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={listboxId}
                    aria-labelledby={hasText(label) ? labelId : undefined}
                    aria-label={hasText(label) ? undefined : ( ariaLabel ?? "Select" )}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
                    disabled={disabled}
                    className={cx(styles.trigger, className)}
                    onClick={() => {
                        if ( isOpen ) {
                            closePopup();
                        } else {
                            openPopup();
                        }
                    }}
                >
                    {prefixIcon != null && (
                        <span className={styles.prefixIcon}>
                            <Icon name={prefixIcon} size="sm" />
                        </span>
                    )}
                    {displayValue !== undefined
                        ? <span className={styles.value}>{displayValue}</span>
                        : <span className={styles.placeholder}>{placeholder ?? ""}</span>}
                    <span className={styles.chevron}>
                        <Icon name="chevron-down" size="sm" />
                    </span>
                </button>
                <div className={styles.popup} data-placement={placement} hidden={!isOpen}>
                    {searchable && (
                        <div className={styles.search}>
                            <input
                                ref={searchRef}
                                type="text"
                                className={styles.searchInput}
                                value={currentQuery}
                                placeholder="Search…"
                                aria-label={hasText(label) ? `${label} search` : "Search"}
                                aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
                                onChange={handleQueryChange}
                            />
                        </div>
                    )}
                    <div
                        id={listboxId}
                        role="listbox"
                        aria-labelledby={hasText(label) ? labelId : undefined}
                        aria-label={hasText(label) ? undefined : ( ariaLabel ?? "Options" )}
                        className={styles.listbox}
                    >
                        {options.map((option, index) => renderRow(option, index))}
                        {groupEntries.map(({ group, start, }) => (
                            <div key={group.label} role="group" aria-label={group.label} className={styles.group}>
                                <div className={styles.groupLabel} aria-hidden="true">
                                    {group.label}
                                </div>
                                {group.options.map((option, offset) =>
                                    renderRow(option, start + offset)
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <span className={styles.status} role="status" aria-live="polite">
                {announcement}
            </span>
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

/** Плоские опции идут первыми; каждая группа получает сквозной индекс опции. */
function collectGroupEntries(
    options: readonly SelectOption[],
    groups: readonly SelectGroup[] | undefined,
): { group: SelectGroup; start: number; }[] {
    const entries: { group: SelectGroup; start: number; }[] = [];
    let cursor = options.length;

    for ( const group of groups ?? [] ) {
        entries.push({ group, start: cursor, });
        cursor += group.options.length;
    }

    return entries;
}
