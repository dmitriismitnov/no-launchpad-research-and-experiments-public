import type { ButtonHTMLAttributes, ComponentProps, KeyboardEvent, } from "react";
import { useEffect, useRef, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { calendar, } from "@shared/styled-system/recipes";

import {
    addDays,
    addMonths,
    formatDateLabel,
    formatIso,
    formatMonthLabel,
    getDaysInMonth,
    isSameDay,
    isSameMonth,
    normalizeRange,
    normalizeWeekStart,
    pickRange,
    startOfMonth,
    startOfWeek,
    toDateOnly,
    WEEKDAY_LABELS,
    WEEKDAY_LONG_LABELS,
} from "./date-utils";
import type { DateRange, } from "./date-utils";

export type { DateRange, } from "./date-utils";

export type CalendarSurface = "overlay" | "embedded";

/** Pen-documented selection modes: one day, or a start/end pair. */
export type CalendarSelectionMode = "single" | "range";

/**
 * Внутренняя ячейка месяца из мастера Calendar Day: кнопка с числом,
 * радиусом `sm` и состояниями selected / today / inRange / outsideMonth /
 * disabled. Является деталью реализации `Calendar` и не экспортируется.
 */
type CalendarDayProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onSelect"> & {
    /** Календарный день, который представляет ячейка. */
    date: Date;
    /** Помечает день выбранным. */
    selected?: boolean;
    /** Помечает день сегодняшним. */
    today?: boolean;
    /** Помечает день внутри выбранного диапазона. */
    inRange?: boolean;
    /** Выключает выбор и фокус дня. */
    disabled?: boolean;
    /** Помечает день соседнего месяца. */
    outsideMonth?: boolean;
    /** Доступное имя дня; по умолчанию — полная дата. */
    label?: string;
    /** Вызывается с днём при выборе. */
    onSelect?: (date: Date) => void;
};

const CalendarDay = ({
    date,
    selected = false,
    today = false,
    inRange = false,
    disabled = false,
    outsideMonth = false,
    label,
    onSelect,
    className,
    onClick,
    ...props
}: CalendarDayProps) => {
    const styles = calendar({ selected, today, inRange, outsideMonth, disabled, });

    return (
        <button
            {...props}
            type="button"
            data-date={formatIso(date)}
            className={cx(styles.day, className)}
            aria-selected={selected || undefined}
            aria-current={today ? "date" : undefined}
            aria-disabled={disabled || undefined}
            aria-label={label ?? formatDateLabel(date)}
            disabled={disabled}
            onClick={(event) => {
                onClick?.(event);
                onSelect?.(date);
            }}
        >
            {date.getDate()}
        </button>
    );
};

type CalendarBaseProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Контролируемый отображаемый месяц; передавайте с `onMonthChange`. */
    month?: Date;
    /** Начальный отображаемый месяц, когда контрол неконтролируемый. */
    defaultMonth?: Date;
    /** Вызывается с новым отображаемым месяцем при навигации. */
    onMonthChange?: (month: Date) => void;
    /** Ранняя доступная дата; более ранние дни отключаются. */
    min?: Date;
    /** Поздняя доступная дата; более поздние дни отключаются. */
    max?: Date;
    /** Сегодняшний день; по умолчанию — системная дата. */
    today?: Date;
    /** Первый день недели: 0 — воскресенье, 1 — понедельник. */
    weekStartsOn?: number;
    /** Заголовок месяца; по умолчанию выводится из месяца. */
    monthLabel?: string;
    /** Возвращает true для недоступного дня. */
    isDateDisabled?: (date: Date) => boolean;
    /** Оформление: самостоятельная карточка (`overlay`) или вложенная (`embedded`). */
    surface?: CalendarSurface;
    /** Доступное имя сетки. */
    "aria-label"?: string;
    /** Доступные имена кнопок навигации. */
    previousMonthLabel?: string;
    /** Доступные имена кнопок навигации. */
    nextMonthLabel?: string;
};

/** Контроль выбора одного дня: `value` / `onChange` или `defaultValue`. */
export type CalendarSingleProps = CalendarBaseProps & {
    selectionMode?: "single";
    /** Контролируемый выбранный день; передавайте с `onChange`. */
    value?: Date | null;
    /** Начальный выбранный день, когда контрол неконтролируемый. */
    defaultValue?: Date | null;
    /** Вызывается с выбранным днём. */
    onChange?: (date: Date) => void;
};

/** Контроль диапазона: `{ start, end }` через `value` / `onChange` или `defaultValue`. */
export type CalendarRangeProps = CalendarBaseProps & {
    selectionMode: "range";
    /** Контролируемый диапазон; передавайте с `onChange`. */
    value?: DateRange | null;
    /** Начальный диапазон, когда контрол неконтролируемый. */
    defaultValue?: DateRange | null;
    /** Вызывается с новым диапазоном после каждого выбора. */
    onChange?: (range: DateRange) => void;
};

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

/**
 * Сетка месяца. Управление: `month` / `onMonthChange` и `value` / `onChange`.
 * `selectionMode` выбирает один день либо диапазон; в режиме `range` первый
 * выбор задаёт начало, второй — конец, а следующий начинает новый диапазон.
 * Стрелки двигают фокус по дням, `PageUp` / `PageDown` — по месяцам,
 * `Home` / `End` — по краям недели; выбранные, сегодняшний и недоступные дни
 * объявляются через `aria-selected` / `aria-current` / `aria-disabled`.
 */
export const Calendar = (props: CalendarProps) => {
    const {
        selectionMode = "single",
        month,
        defaultMonth,
        onMonthChange,
        value,
        defaultValue,
        onChange,
        min,
        max,
        today,
        weekStartsOn = 1,
        monthLabel,
        isDateDisabled,
        surface = "overlay",
        previousMonthLabel = "Previous month",
        nextMonthLabel = "Next month",
        className,
        onKeyDown,
        "aria-label": ariaLabel = "Calendar",
        ...rest
    } = props as CalendarBaseProps & {
        selectionMode?: CalendarSelectionMode;
        value?: Date | DateRange | null;
        defaultValue?: Date | DateRange | null;
        onChange?: ((date: Date) => void) | ((range: DateRange) => void);
    };
    const isRange = selectionMode === "range";
    const weekStart = normalizeWeekStart(weekStartsOn);
    const todayDate = toDateOnly(today ?? new Date());
    const minDate = min === undefined ? undefined : toDateOnly(min);
    const maxDate = max === undefined ? undefined : toDateOnly(max);
    const isMonthControlled = month !== undefined;
    const isValueControlled = value !== undefined;
    const initialValue = isValueControlled ? value : defaultValue;
    const initialRange = isRange ? normalizeRange(initialValue as DateRange | null | undefined) : {};
    const initialAnchor = isRange
        ? ( initialRange.start ?? initialRange.end )
        : ( ( initialValue as Date | null | undefined ) ?? undefined );
    const [ uncontrolledMonth, setUncontrolledMonth, ] = useState<Date>(
        () => startOfMonth(defaultMonth ?? initialAnchor ?? todayDate),
    );
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<Date | DateRange | null>(
        () => defaultValue ?? null,
    );
    const [ focusedDate, setFocusedDate, ] = useState<Date>(
        () => toDateOnly(initialAnchor ?? todayDate),
    );
    const gridRef = useRef<HTMLDivElement>(null);
    const pendingFocusRef = useRef(false);
    const displayMonth = startOfMonth(isMonthControlled ? month : uncontrolledMonth);
    const rawValue = isValueControlled ? value : uncontrolledValue;
    const selectedDate = isRange ? null : ( ( rawValue as Date | null | undefined ) ?? null );
    const selectedRange = isRange ? normalizeRange(rawValue as DateRange | null | undefined) : {};
    const styles = calendar({ surface, });

    const firstOfMonth = startOfMonth(displayMonth);
    const leadingDays = ( firstOfMonth.getDay() - weekStart + 7 ) % 7;
    const daysInMonth = getDaysInMonth(displayMonth);
    const totalCells = Math.ceil(( leadingDays + daysInMonth ) / 7) * 7;
    const gridStart = addDays(firstOfMonth, -leadingDays);
    const days = Array.from({ length: totalCells, }, (_, index) => addDays(gridStart, index));
    const weeks = Array.from(
        { length: totalCells / 7, },
        (_, index) => days.slice(index * 7, index * 7 + 7),
    );
    const weekdayLabels = Array.from({ length: 7, }, (_, index) => {
        const day = ( weekStart + index ) % 7;

        return { short: WEEKDAY_LABELS[day], long: WEEKDAY_LONG_LABELS[day], };
    });

    useEffect(() => {
        if ( !pendingFocusRef.current ) {
            return;
        }

        pendingFocusRef.current = false;

        const target = gridRef.current?.querySelector<HTMLButtonElement>(
            `[data-date="${formatIso(focusedDate)}"]`,
        );

        target?.focus();
    }, [ focusedDate, displayMonth, ]);

    const isDisabled = (date: Date): boolean => {
        const isOutOfRange = ( minDate !== undefined && date < minDate )
            || ( maxDate !== undefined && date > maxDate );

        return isOutOfRange || isDateDisabled?.(date) === true;
    };

    const isSelected = (date: Date): boolean => {
        if ( isRange ) {
            const { start, end, } = selectedRange;

            return ( start !== undefined && isSameDay(date, start) )
                || ( end !== undefined && isSameDay(date, end) );
        }

        return selectedDate !== null && isSameDay(date, selectedDate);
    };

    const isInRange = (date: Date): boolean => {
        const { start, end, } = selectedRange;

        if ( start === undefined || end === undefined ) {
            return false;
        }

        return date > start && date < end;
    };

    const changeMonth = (next: Date) => {
        const target = startOfMonth(next);

        if ( !isMonthControlled ) {
            setUncontrolledMonth(target);
        }

        onMonthChange?.(target);
    };

    const selectDate = (date: Date) => {
        if ( isDisabled(date) ) {
            return;
        }

        setFocusedDate(date);

        if ( isRange ) {
            const next = pickRange(selectedRange, date);

            if ( !isValueControlled ) {
                setUncontrolledValue(next);
            }

            ( onChange as ((range: DateRange) => void) | undefined )?.(next);
        } else {
            if ( !isValueControlled ) {
                setUncontrolledValue(date);
            }

            ( onChange as ((date: Date) => void) | undefined )?.(date);
        }

        if ( !isSameMonth(date, displayMonth) ) {
            changeMonth(date);
        }
    };

    const moveFocus = (next: Date) => {
        setFocusedDate(next);

        if ( !isSameMonth(next, displayMonth) ) {
            changeMonth(next);
        }

        pendingFocusRef.current = true;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.defaultPrevented ) {
            return;
        }

        let next: Date | null = null;

        switch ( event.key ) {
            case "ArrowRight":
                next = addDays(focusedDate, 1);
                break;
            case "ArrowLeft":
                next = addDays(focusedDate, -1);
                break;
            case "ArrowDown":
                next = addDays(focusedDate, 7);
                break;
            case "ArrowUp":
                next = addDays(focusedDate, -7);
                break;
            case "Home":
                next = startOfWeek(focusedDate, weekStart);
                break;
            case "End":
                next = addDays(startOfWeek(focusedDate, weekStart), 6);
                break;
            case "PageUp":
                next = addMonths(focusedDate, -1);
                break;
            case "PageDown":
                next = addMonths(focusedDate, 1);
                break;
            default:
                break;
        }

        if ( next === null ) {
            return;
        }

        event.preventDefault();
        moveFocus(next);
    };

    return (
        <div className={cx(styles.root, className)} {...rest}>
            <div className={styles.header}>
                <p className={styles.monthLabel} aria-live="polite">
                    {monthLabel ?? formatMonthLabel(displayMonth)}
                </p>
                <button
                    type="button"
                    className={styles.navButton}
                    aria-label={previousMonthLabel}
                    onClick={() => changeMonth(addMonths(displayMonth, -1))}
                >
                    <Icon name="chevron-left" size="sm" />
                </button>
                <button
                    type="button"
                    className={styles.navButton}
                    aria-label={nextMonthLabel}
                    onClick={() => changeMonth(addMonths(displayMonth, 1))}
                >
                    <Icon name="chevron-right" size="sm" />
                </button>
            </div>
            <div
                ref={gridRef}
                role="grid"
                aria-label={ariaLabel}
                className={styles.grid}
                onKeyDown={handleKeyDown}
            >
                <div className={styles.weekdays} role="row">
                    {weekdayLabels.map(({ short, long, }, index) => (
                        <span
                            key={`${long}-${index}`}
                            role="columnheader"
                            aria-label={long}
                            className={styles.weekday}
                        >
                            {short}
                        </span>
                    ))}
                </div>
                {weeks.map((week, weekIndex) => (
                    <div className={styles.week} role="row" key={weekIndex}>
                        {week.map((date) => (
                            <CalendarDay
                                key={formatIso(date)}
                                role="gridcell"
                                date={date}
                                selected={isSelected(date)}
                                today={isSameDay(date, todayDate)}
                                inRange={isInRange(date)}
                                outsideMonth={!isSameMonth(date, displayMonth)}
                                disabled={isDisabled(date)}
                                tabIndex={isSameDay(date, focusedDate) ? 0 : -1}
                                onSelect={selectDate}
                                onFocus={() => setFocusedDate(date)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
