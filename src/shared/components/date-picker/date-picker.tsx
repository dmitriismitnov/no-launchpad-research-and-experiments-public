import type { ComponentProps, } from "react";
import { useState, } from "react";

import { Calendar, } from "@shared/components/calendar";
import { formatIso, } from "@shared/components/calendar/date-utils";
import { Icon, } from "@shared/components/icon";
import { Popover, } from "@shared/components/popover";
import { cx, } from "@shared/styled-system/css";
import { datePicker, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Date Picker. Значение — контролируемая (`value` +
 * `onChange`) или неконтролируемая (`defaultValue`) дата; открытие управляется
 * `open` + `onOpenChange`. Триггер — кнопка, оформленная как поле Date Input,
 * поэтому ввод остаётся за отдельным `Date Input`, а пикер отвечает за обзор
 * календаря.
 */
export type DatePickerProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Контролируемая выбранная дата; передавайте с `onChange`. */
    value?: Date | null;
    /** Начальная дата, когда контрол неконтролируемый. */
    defaultValue?: Date | null;
    /** Вызывается с выбранной датой. */
    onChange?: (date: Date) => void;
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
    nextMonthLabel?: string;
};

/**
 * Триггер даты с календарём во всплывающей панели. Поверхность — общий
 * `Popover` без портала, содержимое — публичный `Calendar` в режиме
 * `embedded`; выбор дня закрывает панель, `Escape` и клик вне закрывают её
 * без изменения значения.
 */
export const DatePicker = ({
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
    ...props
}: DatePickerProps) => {
    const [ uncontrolledValue, setUncontrolledValue, ] = useState<Date | null>(() => defaultValue ?? null);
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isValueControlled = value !== undefined;
    const isOpenControlled = open !== undefined;
    const selectedDate = isValueControlled ? value : uncontrolledValue;
    const isOpen = isOpenControlled ? open : uncontrolledOpen;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const styles = datePicker({ open: isOpen, invalid, disabled, });

    const requestOpenChange = (next: boolean) => {
        if ( disabled ) {
            return;
        }

        if ( !isOpenControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const selectDate = (date: Date) => {
        if ( !isValueControlled ) {
            setUncontrolledValue(date);
        }

        onChange?.(date);
        requestOpenChange(false);
    };

    return (
        <div {...props} className={cx(styles.root, className)}>
            <Popover
                className={styles.control}
                placement="bottom"
                label={calendarLabel}
                open={isOpen}
                onOpenChange={requestOpenChange}
                trigger={
                    <button type="button" className={styles.field} disabled={disabled}>
                        <Icon name="calendar" size="sm" className={styles.icon} />
                        <span className={styles.value}>
                            {selectedDate === null || selectedDate === undefined
                                ? placeholder
                                : formatIso(selectedDate)}
                        </span>
                    </button>
                }
            >
                <Calendar
                    surface="embedded"
                    value={selectedDate ?? null}
                    onChange={selectDate}
                    min={min}
                    max={max}
                    today={today}
                    weekStartsOn={weekStartsOn}
                    aria-label={calendarLabel}
                    previousMonthLabel={previousMonthLabel}
                    nextMonthLabel={nextMonthLabel}
                />
            </Popover>
            {showHint && <p className={styles.hint}>{hint}</p>}
            {showError && <p className={styles.error}>{error}</p>}
        </div>
    );
};

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
