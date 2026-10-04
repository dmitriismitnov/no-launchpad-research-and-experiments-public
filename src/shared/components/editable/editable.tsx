import type { ChangeEvent, ComponentProps, KeyboardEvent, } from "react";
import { useEffect, useId, useRef, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { editable, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы Editable. Значение контролируется `value`; правка
 * подтверждается `onSave` (Enter или кнопка Confirm) и отменяется Escape или
 * кнопкой Cancel. Потеря фокуса (blur) не сохраняет. `saving` удерживает поле
 * правки на месте и показывает внешний индикатор прогресса; собственного
 * асинхронного цикла здесь нет.
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
        /** Вызывается при отмене правки. */
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
        /** Внешнее состояние сохранения; удерживает поле и показывает прогресс. */
        saving?: boolean;
    };

/**
 * Редактирование значения на месте. В режиме чтения — фокусируемая кнопка с
 * значением и карандашом (карандаш виден при наведении и фокусе, Pen `LiBiT`);
 * по клику, Enter или Space она сменяется контролируемым полем с кнопками
 * Confirm и Cancel (`XrUb6`). Enter и Confirm сохраняют через `onSave`,
 * Escape и Cancel отменяют и возвращают прежнее значение. `saving` удерживает
 * поле правки на месте и показывает индикатор прогресса (Pen `y6mZ4`).
 *
 * Потеря фокуса (blur) намеренно НЕ сохраняет: с явной кнопкой Cancel
 * автосохранение по blur было бы гонкой, поэтому подтверждение возможно только
 * через Enter или кнопку Confirm, а Escape или Cancel возвращают прежнее
 * значение.
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
    saving = false,
    className,
    ...props
}: EditableProps) => {
    const [ isEditing, setIsEditing, ] = useState(false);
    const [ draft, setDraft, ] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const errorId = useId();
    const showError = hasText(error);
    const styles = editable({ invalid, disabled, });
    const showEditor = isEditing || saving;

    useEffect(() => {
        if ( showEditor ) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [ showEditor, ]);

    const startEdit = () => {
        if ( disabled ) {
            return;
        }

        setDraft(value);
        setIsEditing(true);
    };

    const commit = () => {
        if ( saving ) {
            return;
        }

        setIsEditing(false);
        onSave?.(draft);
    };

    const cancel = () => {
        if ( saving ) {
            return;
        }

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
            {showEditor
                ? (
                    <div className={styles.editor} aria-busy={saving || undefined}>
                        <input
                            {...props}
                            ref={inputRef}
                            className={styles.input}
                            value={draft}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={saving}
                            aria-label={inputLabel ?? "Edit value"}
                            aria-invalid={invalid || undefined}
                            aria-describedby={showError ? errorId : undefined}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className={styles.actions}>
                            {saving && <Icon name="loader" size="sm" label="Saving" className={styles.saving} />}
                            <button
                                type="button"
                                className={styles.confirm}
                                aria-label="Confirm"
                                disabled={disabled || saving}
                                onClick={commit}
                            >
                                <Icon name="check" size="sm" />
                            </button>
                            <button
                                type="button"
                                className={styles.cancel}
                                aria-label="Cancel"
                                disabled={disabled || saving}
                                onClick={cancel}
                            >
                                <Icon name="x" size="sm" />
                            </button>
                        </div>
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
