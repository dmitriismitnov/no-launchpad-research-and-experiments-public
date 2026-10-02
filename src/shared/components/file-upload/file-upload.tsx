import type { ChangeEvent, ComponentProps, DragEvent, } from "react";
import { useId, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { fileUpload, } from "@shared/styled-system/recipes";

/**
 * Публичные пропсы File Upload. Контрол — нативный `<input type="file">`,
 * скрытый под dropzone-меткой; выбранные файлы сообщаются через
 * `onFilesChange`, а количество показывается текстом.
 */
export type FileUploadProps =
    & Omit<
        ComponentProps<"input">,
        "type" | "children" | "value" | "defaultValue" | "onChange"
    >
    & {
        /** Заголовок dropzone. */
        title?: string;
        /** Поддерживающая строка под заголовком. */
        description?: string;
        /** Подсказка под dropzone; скрывается, когда показана ошибка. */
        hint?: string;
        /** Помечает dropzone невалидным: негативная рамка + показ error. */
        invalid?: boolean;
        /** Сообщение об ошибке; показывается только когда invalid === true. */
        error?: string;
        /** Вызывается с новым списком при выборе или сбросе файлов. */
        onFilesChange?: (files: File[]) => void;
        /** Строит текст счётчика; по умолчанию `N files selected`. */
        countLabel?: (count: number) => string;
    };

/**
 * Приём файлов перетаскиванием или выбором. Клик по всей области открывает
 * системный диалог, drag-and-drop обрабатывается на метке, а количество
 * выбранных файлов выводится строкой. Прогресс загрузки — за потребителем.
 */
export const FileUpload = ({
    title = "Drop files here",
    description = "or browse — PNG, SVG up to 10 MB",
    hint,
    invalid = false,
    error,
    disabled = false,
    onFilesChange,
    countLabel,
    className,
    id,
    ...props
}: FileUploadProps) => {
    const [ isDragging, setIsDragging, ] = useState(false);
    const [ files, setFiles, ] = useState<File[]>([]);
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const styles = fileUpload({ dragging: isDragging, invalid, disabled, });

    const report = (next: File[]) => {
        setFiles(next);
        onFilesChange?.(next);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        report(toFileArray(event.target.files));
    };

    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        if ( disabled ) {
            return;
        }

        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        if ( disabled ) {
            return;
        }

        event.preventDefault();
        setIsDragging(false);
        report(toFileArray(event.dataTransfer.files));
    };

    return (
        <div className={styles.wrapper}>
            <label
                htmlFor={controlId}
                className={cx(styles.root, className)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    {...props}
                    id={controlId}
                    type="file"
                    disabled={disabled}
                    className={styles.input}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    onChange={handleChange}
                />
                <Icon name="upload" size="lg" className={styles.icon} />
                <span className={styles.title}>{title}</span>
                {hasText(description) && <span className={styles.description}>{description}</span>}
                {files.length > 0 && (
                    <span className={styles.count}>
                        {countLabel?.(files.length) ?? defaultCountLabel(files.length)}
                    </span>
                )}
            </label>
            {showHint && (
                <p className={styles.hint} id={hintId}>
                    {hint}
                </p>
            )}
            {showError && (
                <p className={styles.error} id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
};

const toFileArray = (list: FileList | null): File[] => list === null ? [] : Array.from(list);

const defaultCountLabel = (count: number): string => count === 1 ? "1 file selected" : `${count} files selected`;

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
