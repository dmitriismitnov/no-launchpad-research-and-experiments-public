import type { ComponentProps, } from "react";
import { useId, useState, } from "react";

import { Calendar, } from "@shared/components/calendar";
import { type DateRange, formatIso, normalizeRange, } from "@shared/components/calendar/date-utils";
import { Icon, } from "@shared/components/icon";
import { Popover, } from "@shared/components/popover";
import { cx, } from "@shared/styled-system/css";
import { datePicker, } from "@shared/styled-system/recipes";

/** Public selection modes of the Date Picker. */
export type DatePickerSelectionMode = "single" | "range";

type DatePickerBaseProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Текст пустого триггера. */
    placeholder?: string;
    /** Ранняя доступная дата. */
    min?: Date;
    /** Поздняя доступная дата. */
    max?: Date;
    /** Сегодняшний день; по умолчанию — системная дата. */
    today?: Date;
    /** Первый день недели: 0 — воскресенье, 1 — понедельник. */
    weekStartsOn?: number;
    /** Контролируемое открытие; передавайте с `onOpenChange`. */
    open?: boolean;
    /** Начальное открытие, когда контрол неконтролируемый. */
    defaultOpen?: boolean;
    /** Вызывается с новым состоянием открытия. */
    onOpenChange?: (open: boolean) => void;
    /** Отключает открытие. */
    disabled?: boolean;
    /** Помечает триггер невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Подсказка под триггером; скрывается, когда показана ошибка. */
    hint?: string;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Доступное имя календаря. */
    calendarLabel?: string;
    /** Доступные имена кнопок навигации. */
    previousMonthLabel?: string;
    /** Доступные имена кнопок навигации. */
    nextMonthLabel?: string;
};

/** Контроль одного дня: `value` / `onChange` или `defaultValue`; выбор закрывает панель. */
export type DatePickerSingleProps = DatePickerBaseProps & {
    selectionMode?: "single";
    /** Контролируемая выбранная дата; передавайте с `onChange`. */
    value?: Date | null;
    /** Начальная дата, когда контрол неконтролируемый. */
    defaultValue?: Date | null;
    /** Вызывается с выбранной датой. */
    onChange?: (date: Date) => void;
};

/**
 * Контроль диапазона: `{ start, end }` через `value` / `onChange` или
 * `defaultValue`. Первый выбор оставляет панель открытой, второй закрывает её.
 */
export type DatePickerRangeProps = DatePickerBaseProps & {
    selectionMode: "range";
    /** Контролируемый диапазон; передавайте с `onChange`. */
    value?: DateRange | null;
    /** Начальный диапазон, когда контрол неконтролируемый. */
    defaultValue?: DateRange | null;
    /** Вызывается с новым диапазоном после каждого выбора. */
    onChange?: (range: DateRange) => void;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

/**
 * Триггер даты с календарём во всплывающей панели. Поверхность — общий
 * `Popover` без портала, содержимое — `Calendar` в режиме `embedded`. В
 * режиме `range` панель остаётся открытой после выбора начала и
 * закрывается после выбора конца; `Escape` и клик вне закрывают её без
 * изменения значения. `hint` / `error` связаны с триггером через
 * `aria-describedby`, `invalid` выставляет `aria-invalid`.
 */
export const DatePicker = (props: DatePickerProps) => {
    const {
        selectionMode = "single",
        value,
        defaultValue,
        onChange,
        placeholder = "Select date",
        min,
        max,
        today,
        weekStartsOn,
        open,
        defaultOpen = false,
        onOpenChange,
        disabled = false,
        invalid = false,
        hint,
        error,
        calendarLabel = "Choose date",
        previousMonthLabel,
        nextMonthLabel,
        className,
        ...rest
    } = props as DatePickerBaseProps & {
        selectionMode?: DatePickerSelectionMode;
        value?: Date | DateRange | null;
        defaultValue?: Date | DateRange | null;
        onChange?: ((date: Date) => void) | ((range: DateRange) => void);
    };
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<Date | DateRange | null>(
        () => defaultValue ?? null,
    );
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isRange = selectionMode === "range";
    const isValueControlled = value !== undefined;
    const isOpenControlled = open !== undefined;
    const selectedValue = isValueControlled ? value : uncontrolledValue;
    const selectedDate = isRange ? null : ( ( selectedValue as Date | null | undefined ) ?? null );
    const selectedRange = isRange ? normalizeRange(selectedValue as DateRange | null | undefined) : {};
    const isOpen = isOpenControlled ? open : uncontrolledOpen;
    const generatedId = useId();
    const hintId = `${generatedId}-hint`;
    const errorId = `${generatedId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = datePicker({ open: isOpen, invalid, disabled, });
    const displayValue = isRange
        ? formatRange(selectedRange, placeholder)
        : ( selectedDate === null || selectedDate === undefined ? placeholder : formatIso(selectedDate) );

    const requestOpenChange = (next: boolean) => {
        if ( disabled ) {
            return;
        }

        if ( !isOpenControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const handleDateChange = (date: Date) => {
        if ( !isValueControlled ) {
            setUncontrolledValue(date);
        }

        ( onChange as ((date: Date) => void) | undefined )?.(date);
        requestOpenChange(false);
    };

    const handleRangeChange = (range: DateRange) => {
        if ( !isValueControlled ) {
            setUncontrolledValue(range);
        }

        ( onChange as ((range: DateRange) => void) | undefined )?.(range);

        if ( range.start !== undefined && range.end !== undefined ) {
            requestOpenChange(false);
        }
    };

    return (
        <div {...rest} className={cx(styles.root, className)}>
            <Popover
                className={styles.control}
                placement="bottom"
                label={calendarLabel}
                open={isOpen}
                onOpenChange={requestOpenChange}
                trigger={
                    <button
                        type="button"
                        className={styles.field}
                        disabled={disabled}
                        aria-invalid={invalid || undefined}
                        aria-describedby={describedBy}
                    >
                        <Icon name="calendar" size="sm" className={styles.icon} />
                        <span className={styles.value}>{displayValue}</span>
                    </button>
                }
            >
                {isRange
                    ? (
                        <Calendar
                            selectionMode="range"
                            surface="embedded"
                            value={selectedRange}
                            onChange={handleRangeChange}
                            min={min}
                            max={max}
                            today={today}
                            weekStartsOn={weekStartsOn}
                            aria-label={calendarLabel}
                            previousMonthLabel={previousMonthLabel}
                            nextMonthLabel={nextMonthLabel}
                        />
                    )
                    : (
                        <Calendar
                            selectionMode="single"
                            surface="embedded"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={min}
                            max={max}
                            today={today}
                            weekStartsOn={weekStartsOn}
                            aria-label={calendarLabel}
                            previousMonthLabel={previousMonthLabel}
                            nextMonthLabel={nextMonthLabel}
                        />
                    )}
            </Popover>
            {showHint && <p className={styles.hint} id={hintId}>{hint}</p>}
            {showError && <p className={styles.error} id={errorId}>{error}</p>}
        </div>
    );
};

/** ISO endpoints joined with an en dash; a partial range shows the start only. */
function formatRange(range: DateRange, placeholder: string): string {
    if ( range.start === undefined ) {
        return placeholder;
    }

    return range.end === undefined
        ? formatIso(range.start)
        : `${formatIso(range.start)} – ${formatIso(range.end)}`;
}

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
