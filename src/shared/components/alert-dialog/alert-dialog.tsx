import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useId, useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { alertDialog, } from "@shared/styled-system/recipes";

export type AlertDialogProps = Omit<ComponentProps<"div">, "children" | "title"> & {
    /** Dialog heading; also its accessible name. */
    title: string;
    /** Supporting copy stating the consequence. */
    description?: string;
    /** Extra body content rendered after the description. */
    children?: ReactNode;
    /** Optional control that opens the dialog. */
    trigger?: ReactNode;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** Called when the dialog is dismissed by the close control. */
    onClose?: () => void;
    /** Called when the cancel action is pressed. */
    onCancel?: () => void;
    /** Called when the confirm action is pressed. */
    onConfirm?: () => void;
    /** Cancel action label. */
    cancelLabel?: string;
    /** Confirm action label; name the object it affects. */
    confirmLabel?: string;
    /** Accessible name for the close control. */
    closeLabel?: string;
    /** Paints the confirm action with the danger role and blocks scrim / Escape dismiss. */
    destructive?: boolean;
    /** Leading glyph; defaults to the warning triangle. */
    icon?: IconName;
};

/**
 * Centered modal for destructive or irreversible decisions. Open state is
 * uncontrolled by default, or controlled with `open` / `onOpenChange`. A
 * `destructive` dialog cannot be dismissed by the scrim or `Escape`; it requires
 * an explicit cancel or confirm. It renders in place (no portal), and focus
 * starts on the safer cancel action. Focus trapping, focus return and scroll
 * locking are the consumer's responsibility.
 */
export const AlertDialog = ({
    title,
    description,
    children,
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    onClose,
    onCancel,
    onConfirm,
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    closeLabel,
    destructive = false,
    icon = "triangle-alert",
    className,
    onKeyDown,
    ...props
}: AlertDialogProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const titleId = useId();
    const descriptionId = useId();
    const styles = alertDialog({ destructive, });
    const hasDescription = hasText(description);

    const requestOpenChange = (next: boolean) => {
        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const handleDismiss = () => {
        requestOpenChange(false);
        onClose?.();
    };

    const handleCancel = () => {
        requestOpenChange(false);
        onCancel?.();
    };

    const handleConfirm = () => {
        requestOpenChange(false);
        onConfirm?.();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen && !destructive ) {
            handleDismiss();
        }
    };

    const handleScrimClick = () => {
        if ( !destructive ) {
            handleDismiss();
        }
    };

    return (
        <div {...props} className={cx(styles.root, className)} onKeyDown={handleKeyDown}>
            {trigger !== undefined && (
                <button
                    type="button"
                    className={styles.trigger}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    onClick={() => requestOpenChange(true)}
                >
                    {trigger}
                </button>
            )}
            {isOpen && (
                <>
                    <div className={styles.overlay} aria-hidden="true" onClick={handleScrimClick} />
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        aria-describedby={hasDescription ? descriptionId : undefined}
                        className={styles.surface}
                    >
                        <div className={styles.header}>
                            <Icon className={styles.icon} name={icon} size="md" />
                            <h2 id={titleId} className={styles.title}>{title}</h2>
                            <button
                                type="button"
                                className={styles.close}
                                aria-label={closeLabel ?? "Close"}
                                onClick={handleDismiss}
                            >
                                <Icon name="x" size="md" />
                            </button>
                        </div>
                        {( hasDescription || children != null ) && (
                            <div className={styles.body}>
                                {hasDescription && (
                                    <p id={descriptionId} className={styles.description}>
                                        {description}
                                    </p>
                                )}
                                {children}
                            </div>
                        )}
                        <div className={styles.footer}>
                            <button
                                type="button"
                                className={styles.cancel}
                                onClick={handleCancel}
                                autoFocus
                            >
                                {cancelLabel}
                            </button>
                            <button
                                type="button"
                                className={styles.confirm}
                                onClick={handleConfirm}
                            >
                                {confirmLabel}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

/** An empty description is meaningful: it removes the paragraph entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
