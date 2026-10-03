import type { ComponentProps, } from "react";
import { useId, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { input, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Input. Компонент владеет `aria-invalid`. Собственная
 * ошибка (`invalid` + непустой `error`) владеет `aria-describedby` и
 * переопределяет внешнее значение; без локальной ошибки внешний
 * `aria-describedby` (например, от `Field`) сохраняется.
 */
export type InputProps = Omit<ComponentProps<"input">, "size" | "children"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
    /** Декоративная иконка перед полем; размер и цвет задаёт Input. */
    prefixIcon?: IconName;
    /** Декоративная иконка после поля; размер и цвет задаёт Input. */
    suffixIcon?: IconName;
};

/**
 * Текстовое поле с необязательными декоративными иконками-слотами.
 * Контролем остаётся нативный `<input>`, поэтому type/required/readOnly и
 * остальное поведение формы нативные; иконки — украшение и не имеют
 * доступного имени (Pen `dO8tX`: prefix icon · value · suffix slot).
 */
export const Input = ({
    label,
    invalid = false,
    error,
    prefixIcon,
    suffixIcon,
    disabled,
    className,
    id,
    ...props
}: InputProps) => {
    const {
        size: _size,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": externalDescribedBy,
        ...inputProps
    } = props as ComponentProps<"input">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = input({ invalid, disabled: disabled === true, });

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <div className={styles.control}>
                {prefixIcon != null && (
                    <span className={styles.prefixIcon}>
                        <Icon name={prefixIcon} size="sm" />
                    </span>
                )}
                <input
                    {...inputProps}
                    disabled={disabled}
                    id={controlId}
                    className={cx(styles.input, className)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={showError ? errorId : externalDescribedBy}
                />
                {suffixIcon != null && (
                    <span className={styles.suffixIcon}>
                        <Icon name={suffixIcon} size="sm" />
                    </span>
                )}
            </div>
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
