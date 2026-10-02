import type { ComponentProps, MouseEvent, } from "react";
import { useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { toggle, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Toggle. Кнопка с `aria-pressed`; состояние может быть
 * контролируемым (`pressed` + `onPressedChange`) или неконтролируемым
 * (`defaultPressed`).
 */
export type ToggleProps = Omit<ComponentProps<"button">, "children" | "value"> & {
    /** Видимый текст; единственный источник доступного имени. */
    label: string;
    /** Необязательный ведущий глиф; всегда декоративный. */
    icon?: IconName;
    /** Контролируемое нажатое состояние; передавайте с `onPressedChange`. */
    pressed?: boolean;
    /** Начальное нажатое состояние, когда компонент неконтролируемый. */
    defaultPressed?: boolean;
    /** Вызывается со следующим нажатым состоянием при каждом переключении. */
    onPressedChange?: (pressed: boolean) => void;
};

/**
 * Кнопка-переключатель. Не владеет контекстом кнопки: `aria-pressed` всегда
 * отражает состояние, а `type` по умолчанию `button`.
 */
export const Toggle = ({
    label,
    icon,
    pressed,
    defaultPressed = false,
    onPressedChange,
    disabled = false,
    className,
    onClick,
    ...props
}: ToggleProps) => {
    const [ uncontrolledPressed, setUncontrolledPressed, ] = useState(defaultPressed);
    const isControlled = pressed !== undefined;
    const isPressed = isControlled ? pressed : uncontrolledPressed;
    const styles = toggle({ pressed: isPressed, disabled, });

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if ( event.defaultPrevented || disabled ) {
            return;
        }

        const next = !isPressed;

        if ( !isControlled ) {
            setUncontrolledPressed(next);
        }

        onPressedChange?.(next);
    };

    return (
        <button
            {...props}
            type={props.type ?? "button"}
            className={cx(styles.root, className)}
            aria-pressed={isPressed}
            disabled={disabled}
            onClick={handleClick}
        >
            {icon != null && <Icon className={styles.icon} name={icon} size="sm" />}
            <span className={styles.label}>{label}</span>
        </button>
    );
};
