import type { ComponentProps, MouseEvent, } from "react";
import { useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { toggle, } from "@shared/styled-system/recipes";

type ToggleBaseProps = Omit<ComponentProps<"button">, "children" | "value"> & {
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
 * Публичные пропсы Toggle. Кнопка с `aria-pressed`; состояние может быть
 * контролируемым (`pressed` + `onPressedChange`) или неконтролируемым
 * (`defaultPressed`).
 *
 * Форма с видимым `label` берёт доступное имя из текста. Иконковая форма без
 * текста обязана передать непустой `aria-label`.
 */
export type ToggleProps =
    & ToggleBaseProps
    & (
        | {
            /** Видимый текст; источник доступного имени. */
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
    "aria-label": ariaLabel,
    onClick,
    ...props
}: ToggleProps) => {
    const [ uncontrolledPressed, setUncontrolledPressed, ] = useState(defaultPressed);
    const isControlled = pressed !== undefined;
    const isPressed = isControlled ? pressed : uncontrolledPressed;
    const hasLabel = label !== undefined && label.length > 0;

    if ( !hasLabel && ( ariaLabel === undefined || ariaLabel.length === 0 ) ) {
        throw new Error(
            "Toggle: provide a non-empty `label`, or a non-empty `aria-label` for the icon-only form.",
        );
    }

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
            aria-label={hasLabel ? undefined : ariaLabel}
            disabled={disabled}
            onClick={handleClick}
        >
            {icon != null && <Icon className={styles.icon} name={icon} size="sm" />}
            {hasLabel && <span className={styles.label}>{label}</span>}
        </button>
    );
};
