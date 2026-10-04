import type { ChangeEvent, ComponentProps, DragEvent, } from "react";
import { useId, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { fileUpload, } from "@shared/styled-system/recipes";

/**
 * Внешний статус загрузки, которым владеет потребитель. Компонент только
 * визуализирует его; транспорта, повторов и разбора файлов здесь нет.
 */
type FileUploadStatus = "idle" | "uploading" | "complete" | "error";

/**
 * Публичные пропсы File Upload. Контрол — нативный `<input type="file">`,
 * скрытый под dropzone-меткой; выбранные файлы сообщаются через
 * `onFilesChange`, а количество показывается текстом. Внешнее состояние
 * (`status` / `progress` / `fileName` / `statusMessage`) рисуется без
 * собственного транспорта.
 */
export type FileUploadProps =
    & Omit<
        ComponentProps<"input">,
        "type" | "children" | "value" | "defaultValue" | "onChange" | "status"
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
        /** Внешний статус загрузки, которым владеет потребитель. */
        status?: FileUploadStatus;
        /** Прогресс 0–100 для статуса `uploading`. */
        progress?: number;
        /** Имя обрабатываемого файла. */
        fileName?: string;
        /** Текстовое пояснение статуса (в том числе причина ошибки). */
        statusMessage?: string;
    };

/**
 * Приём файлов перетаскиванием или выбором. Клик и клавиатура открывают
 * системный диалог через нативную метку, drag-and-drop обрабатывается на
 * метке, а количество выбранных файлов выводится строкой. Внешнее состояние
 * (`status`) рисует загрузку, успех или ошибку, не меняя геометрию dropzone;
 * прогресс объявляется через `role="progressbar"`.
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
    status = "idle",
    progress = 0,
    fileName,
    statusMessage,
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
    const isStatusError = status === "error";
    const invalidState = invalid || isStatusError;
    const errorText = isStatusError ? statusMessage : error;
    const showError = invalidState && hasText(errorText);
    const showHint = !showError && hasText(hint);
    const describedBy = showError ? errorId : ( showHint ? hintId : undefined );
    const clampedProgress = clampProgress(progress);
    const styles = fileUpload({ dragging: isDragging, invalid: invalidState, disabled, });
    const showStatus = status === "uploading" || status === "complete";

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
                    aria-invalid={invalidState || undefined}
                    aria-describedby={describedBy}
                    onChange={handleChange}
                />
                <Icon name="upload" size="lg" className={styles.icon} />
                <span className={styles.title}>{title}</span>
                {hasText(description) && <span className={styles.description}>{description}</span>}
                {( showStatus || hasText(fileName) ) && (
                    <span className={styles.status} role="status" aria-live="polite">
                        {status === "complete" && <Icon name="check" size="sm" className={styles.statusIcon} />}
                        {hasText(fileName) && <span className={styles.fileName}>{fileName}</span>}
                        {status === "uploading" && (
                            <span
                                className={styles.progressTrack}
                                role="progressbar"
                                aria-label="Upload progress"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={clampedProgress}
                            >
                                <span
                                    className={styles.progressBar}
                                    style={{ width: `${clampedProgress}%`, }}
                                />
                            </span>
                        )}
                        {hasText(statusMessage) && <span className={styles.statusMessage}>{statusMessage}</span>}
                    </span>
                )}
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
                    {errorText}
                </p>
            )}
        </div>
    );
};

const toFileArray = (list: FileList | null): File[] => list === null ? [] : Array.from(list);

const defaultCountLabel = (count: number): string => count === 1 ? "1 file selected" : `${count} files selected`;

/** Держит внешний прогресс в 0..100. */
function clampProgress(progress: number): number {
    if ( !Number.isFinite(progress) ) {
        return 0;
    }

    return Math.min(Math.max(Math.round(progress), 0), 100);
}

/** Пустая или пробельная строка считается отсутствующей и не рендерит область. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
