import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useId, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { dialog, } from "@shared/styled-system/recipes";

export type DialogSize = "sm" | "md" | "lg";

export type DialogProps = Omit<ComponentProps<"div">, "children" | "title"> & {
    /** Dialog heading; also its accessible name. */
    title: string;
    /** Optional supporting copy under the heading. */
    description?: string;
    /** Extra body content rendered after the description. */
    children?: ReactNode;
    /** Footer actions; rendered only when provided. */
    actions?: ReactNode;
    /** Optional control that opens the dialog. */
    trigger?: ReactNode;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** Called when the dialog is dismissed by the close control, scrim or Escape. */
    onClose?: () => void;
    /** Accessible name for the close control. */
    closeLabel?: string;
    /** Surface width. */
    size?: DialogSize;
};

/**
 * Centered modal surface with a title, optional description and footer actions.
 * Open state is uncontrolled by default, or controlled with `open` /
 * `onOpenChange`. The scrim and `Escape` dismiss it. It renders in place (no
 * portal) and focus moves only to the close control via `autoFocus`; focus
 * trapping, focus return and scroll locking are the consumer's responsibility.
 */
export const Dialog = ({
    title,
    description,
    children,
    actions,
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    onClose,
    closeLabel,
    size = "md",
    className,
    onKeyDown,
    ...props
}: DialogProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const titleId = useId();
    const descriptionId = useId();
    const styles = dialog({ size, });
    const hasDescription = hasText(description);

    const requestOpenChange = (next: boolean) => {
        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const requestClose = () => {
        requestOpenChange(false);
        onClose?.();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            requestClose();
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
                    <div
                        className={styles.overlay}
                        aria-hidden="true"
                        onClick={() => requestClose()}
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        aria-describedby={hasDescription ? descriptionId : undefined}
                        className={styles.surface}
                    >
                        <div className={styles.header}>
                            <h2 id={titleId} className={styles.title}>{title}</h2>
                            <button
                                type="button"
                                className={styles.close}
                                aria-label={closeLabel ?? "Close"}
                                onClick={() => requestClose()}
                                autoFocus
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
                        {actions != null && <div className={styles.footer}>{actions}</div>}
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
