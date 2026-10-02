import type { ComponentProps, } from "react";
import { useId, } from "react";

import { cx, } from "@shared/styled-system/css";
import { radio, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Radio. Компонент владеет `aria-invalid` и
 * `aria-describedby`; нативный `<input type="radio">` остаётся источником
 * состояния (`checked` / `defaultChecked` / `onChange`) и групповой связи
 * через `name` / `value`.
 */
export type RadioProps = Omit<ComponentProps<"input">, "size" | "children" | "type"> & {
    /** Видимый текст рядом с контролом; связывается через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
};

/**
 * Одиночный радиоконтроль: нативный radio под кастомным кругом. Круг и точка
 * следуют нативным `:checked` / `:focus-visible` через `peer`-условия. Это
 * контрол, который позже будет использовать Radio Group.
 */
export const Radio = ({
    label,
    invalid = false,
    error,
    className,
    id,
    ...props
}: RadioProps) => {
    const {
        size: _size,
        children: _children,
        "aria-invalid": _ariaInvalid,
        "aria-describedby": _ariaDescribedBy,
        ...inputProps
    } = props as ComponentProps<"input">;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = radio({ invalid, disabled: inputProps.disabled === true, });

    return (
        <div className={styles.root}>
            <label className={styles.label} htmlFor={controlId}>
                <span className={styles.control}>
                    <input
                        {...inputProps}
                        id={controlId}
                        type="radio"
                        className={cx(styles.input, "peer", className)}
                        aria-invalid={invalid || undefined}
                        aria-describedby={showError ? errorId : undefined}
                    />
                    <span className={styles.box} aria-hidden="true" />
                    <span className={styles.dot} aria-hidden="true" />
                </span>
                {hasText(label) && <span className={styles.text}>{label}</span>}
            </label>
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
