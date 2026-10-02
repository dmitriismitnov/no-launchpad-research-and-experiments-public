import type { ChangeEvent, ComponentProps, KeyboardEvent, } from "react";
import { useEffect, useId, useRef, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { editable, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Editable. Значение контролируется `value`; правка
 * подтверждается `onSave` (Enter или потеря фокуса) и отменяется Escape.
 */
export type EditableProps =
    & Omit<
        ComponentProps<"input">,
        "value" | "defaultValue" | "onChange" | "size" | "children" | "onBlur" | "onKeyDown"
    >
    & {
        /** Контролируемое значение. */
        value: string;
        /** Вызывается с подтверждённым значением. */
        onSave?: (value: string) => void;
        /** Вызывается при отмене правки через Escape. */
        onCancel?: () => void;
        /** Текст пустого значения в режиме чтения. */
        placeholder?: string;
        /** Доступное имя кнопки чтения; по умолчанию `Edit <value>`. */
        editLabel?: string;
        /** Доступное имя поля правки. */
        inputLabel?: string;
        /** Отключает правку. */
        disabled?: boolean;
        /** Помечает поле невалидным. */
        invalid?: boolean;
        /** Сообщение об ошибке под контролом. */
        error?: string;
        /** Показывает карандаш рядом со значением. */
        affordance?: boolean;
    };

/**
 * Редактирование значения на месте. В режиме чтения — фокусируемая кнопка с
 * значением и карандашом; по клику, Enter или Space она сменяется
 * контролируемым полем. Enter и потеря фокуса сохраняют через `onSave`,
 * Escape отменяет и возвращает прежнее значение.
 */
export const Editable = ({
    value,
    onSave,
    onCancel,
    placeholder,
    editLabel,
    inputLabel,
    disabled = false,
    invalid = false,
    error,
    affordance = true,
    className,
    ...props
}: EditableProps) => {
    const [ isEditing, setIsEditing, ] = useState(false);
    const [ draft, setDraft, ] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const errorId = useId();
    const showError = hasText(error);
    const styles = editable({ invalid, disabled, });

    useEffect(() => {
        if ( isEditing ) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [ isEditing, ]);

    const startEdit = () => {
        if ( disabled ) {
            return;
        }

        setDraft(value);
        setIsEditing(true);
    };

    const commit = () => {
        setIsEditing(false);
        onSave?.(draft);
    };

    const cancel = () => {
        setDraft(value);
        setIsEditing(false);
        onCancel?.();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if ( event.key === "Enter" ) {
            event.preventDefault();
            commit();
        } else if ( event.key === "Escape" ) {
            event.preventDefault();
            cancel();
        }
    };

    return (
        <div className={cx(styles.root, className)}>
            {isEditing
                ? (
                    <div className={styles.editor}>
                        <input
                            {...props}
                            ref={inputRef}
                            className={styles.input}
                            value={draft}
                            placeholder={placeholder}
                            disabled={disabled}
                            aria-label={inputLabel ?? "Edit value"}
                            aria-invalid={invalid || undefined}
                            aria-describedby={showError ? errorId : undefined}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={commit}
                        />
                    </div>
                )
                : (
                    <button
                        type="button"
                        className={styles.control}
                        disabled={disabled}
                        aria-label={editLabel ?? `Edit ${value}`}
                        aria-describedby={showError ? errorId : undefined}
                        onClick={startEdit}
                    >
                        <span className={styles.value}>{value === "" ? placeholder : value}</span>
                        {affordance && <Icon name="pencil" size="sm" className={styles.icon} />}
                    </button>
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
