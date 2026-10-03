import type { ComponentProps, ReactNode, } from "react";
import { cloneElement, isValidElement, useId, } from "react";

import { Input, } from "../input/input";
import { NumberInput, } from "../number-input/number-input";
import { Textarea, } from "../textarea/textarea";

import { cx, } from "@shared/styled-system/css";
import { field, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Field. Field — обёртка, а не контрол: единственный ребёнок
 * получает `id`, `aria-invalid`, `aria-describedby` и, если это нативный
 * `input` / `select` / `textarea`, также `required` и `disabled`.
 */
export type FieldProps = Omit<ComponentProps<"div">, "children"> & {
    /** Видимый лейбл поля; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Показывает маркер `*` и выставляет `required` на нативном контроле. */
    required?: boolean;
    /** Подсказка под контролом; скрывается, когда показана ошибка. */
    hint?: string;
    /** Помечает контрол невалидным; error показывается только вместе с invalid. */
    invalid?: boolean;
    /** Сообщение об ошибке; заменяет hint и появляется только при invalid. */
    error?: string;
    /** Помечает контрол и подписи недоступными. */
    disabled?: boolean;
    /** Идентификатор контрола; по умолчанию берётся у ребёнка или генерируется. */
    id?: string;
    /** Единственный контрол, который оборачивает поле. */
    children?: ReactNode;
};

/** Атрибуты, которые Field проецирует на контрол-ребёнок. */
type FieldControlProps = {
    id?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    error?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-required"?: boolean;
    "aria-disabled"?: boolean;
};

const NATIVE_FORM_CONTROLS = new Set([ "input", "select", "textarea", ]);

/** Компоненты проекта, которым Field передаёт свой полный state-контракт. */
const PROJECT_CONTROLS = new Set<unknown>([ Input, Textarea, NumberInput, ]);

/**
 * Обёртка поля: лейбл, необязательный маркер обязательности, hint и error.
 * Связывает лейбл с контролом и владеет `aria-invalid` / `aria-describedby`.
 * Контрол передаётся единственным ребёнком.
 *
 * `Input` / `Textarea` / `NumberInput` получают полный state-контракт
 * (`id`, `required`, `disabled`, `invalid`) и активное описание Field; их
 * локальный `error` сбрасывается, чтобы видимая ошибка и `id="…-error"`
 * оставались ровно в одном месте. Нативные `input` / `select` / `textarea`
 * и произвольные React-дети сохраняют прежнее обобщённое поведение: ID, ARIA
 * state и, при отсутствии активного описания Field, собственный
 * `aria-describedby` ребёнка.
 */
export const Field = ({
    label,
    required = false,
    hint,
    invalid = false,
    error,
    disabled = false,
    id,
    children,
    className,
    ...props
}: FieldProps) => {
    const generatedId = useId();
    const child = isValidElement<FieldControlProps>(children) ? children : null;
    const controlId = id ?? child?.props.id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const childDescribedBy = child?.props["aria-describedby"];
    const describedBy = showError
        ? errorId
        : ( showHint ? hintId : childDescribedBy );
    const styles = field({ disabled, });
    const isNativeControl = child !== null
        && typeof child.type === "string"
        && NATIVE_FORM_CONTROLS.has(child.type);
    const isProjectControl = child !== null && PROJECT_CONTROLS.has(child.type);

    const control = child === null
        ? children
        : isProjectControl
        ? cloneElement(child, {
            id: controlId,
            required: required || undefined,
            disabled: disabled || undefined,
            invalid: invalid || undefined,
            error: undefined,
            "aria-describedby": describedBy,
        })
        : cloneElement(child, {
            id: controlId,
            "aria-describedby": describedBy,
            "aria-invalid": invalid || undefined,
            ...( isNativeControl
                ? { required: required || undefined, disabled: disabled || undefined, }
                : { "aria-required": required || undefined, "aria-disabled": disabled || undefined, } ),
        });

    return (
        <div {...props} className={cx(styles.root, className)}>
            {( hasText(label) || required ) && (
                <span className={styles.labelRow}>
                    {hasText(label) && (
                        <label className={styles.label} htmlFor={controlId}>
                            {label}
                        </label>
                    )}
                    {required && (
                        <span className={styles.required} aria-hidden="true">
                            *
                        </span>
                    )}
                </span>
            )}
            <div className={styles.control}>{control}</div>
            {showHint && (
                <p className={styles.hint} id={hintId} role="status" aria-live="polite">
                    {hint}
                </p>
            )}
            {showError && (
                <p className={styles.error} id={errorId} role="status" aria-live="polite">
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
