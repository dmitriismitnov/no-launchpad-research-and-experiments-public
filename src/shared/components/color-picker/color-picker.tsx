import type { ComponentProps, } from "react";
import { useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { Popover, } from "@shared/components/popover";
import { cx, } from "@shared/styled-system/css";
import { colorPicker, } from "@shared/styled-system/recipes";

/**
 * Палитра по умолчанию: 12 значений из foundation `palette` — по одной
 * ступени 600 и 500 для blue, sky, cyan, green, red и neutral. Значения
 * совпадают с `src/shared/styles/foundation/colors/palette.ts`; здесь они
 * литералы, потому что это данные выбора, а не оформление.
 */
export const COLOR_PICKER_PALETTE = [
    "#2563EB",
    "#0284C7",
    "#0891B2",
    "#16A34A",
    "#DC2626",
    "#475569",
    "#3B82F6",
    "#0EA5E9",
    "#06B6D4",
    "#22C55E",
    "#EF4444",
    "#64748B",
] as const;

/**
 * Публичные пропсы Color Picker. Значение — строка цвета (обычно hex),
 * контролируемая (`value` + `onChange`) или неконтролируемая (`defaultValue`).
 * Палитра — список значений для свотчей; открытие управляется `Popover`.
 */
export type ColorPickerProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
    /** Контролируемое значение цвета; передавайте с `onChange`. */
    value?: string;
    /** Начальное значение, когда контрол неконтролируемый. */
    defaultValue?: string;
    /** Вызывается с выбранным цветом. */
    onChange?: (value: string) => void;
    /** Доступные цвета палитры. */
    palette?: readonly string[];
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
};

/**
 * Выбор цвета из палитры. Триггер показывает свотч и значение, панель —
 * сетку свотчей во всплывающей поверхности общего `Popover` без портала.
 * Выбор закрывает панель; `Escape` и клик вне возвращают фокус к триггеру.
 */
export const ColorPicker = ({
    value,
    defaultValue = COLOR_PICKER_PALETTE[0],
    onChange,
    palette = COLOR_PICKER_PALETTE,
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    invalid = false,
    hint,
    error,
    className,
    ...props
}: ColorPickerProps) => {
    const [ uncontrolledValue, setUncontrolledValue, ] = useState(defaultValue);
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isValueControlled = value !== undefined;
    const isOpenControlled = open !== undefined;
    const current = isValueControlled ? value : uncontrolledValue;
    const isOpen = isOpenControlled ? open : uncontrolledOpen;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const styles = colorPicker({ open: isOpen, invalid, disabled, });

    const requestOpenChange = (next: boolean) => {
        if ( disabled ) {
            return;
        }

        if ( !isOpenControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const selectColor = (color: string) => {
        if ( !isValueControlled ) {
            setUncontrolledValue(color);
        }

        onChange?.(color);
        requestOpenChange(false);
    };

    return (
        <div {...props} className={cx(styles.root, className)}>
            <Popover
                className={styles.control}
                placement="bottom"
                label="Color palette"
                open={isOpen}
                onOpenChange={requestOpenChange}
                trigger={
                    <button type="button" className={styles.field} disabled={disabled}>
                        <span
                            className={styles.swatch}
                            style={{ backgroundColor: current, }}
                            aria-hidden="true"
                        />
                        <span className={styles.value}>{current}</span>
                        <Icon name="chevron-down" size="sm" className={styles.chevron} />
                    </button>
                }
            >
                <div className={styles.palette} role="listbox" aria-label="Color palette">
                    {palette.map((color) => {
                        const isSelected = color === current;
                        const swatchStyles = colorPicker({ selected: isSelected, });

                        return (
                            <button
                                key={color}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                aria-label={color}
                                className={swatchStyles.swatchButton}
                                style={{ backgroundColor: color, }}
                                onClick={() => selectColor(color)}
                            />
                        );
                    })}
                </div>
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
