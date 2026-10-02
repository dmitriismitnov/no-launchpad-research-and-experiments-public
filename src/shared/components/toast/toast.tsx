import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { toast, } from "@shared/styled-system/recipes";

export type ToastTone = "neutral" | "positive" | "negative" | "brand";

export type ToastAction = {
    label: string;
    onClick: () => void;
};

export type ToastProps = Omit<ComponentProps<"div">, "children"> & {
    /** Short headline; always rendered. */
    title: string;
    /** Supporting copy; omitted when empty. */
    description?: string;
    tone?: ToastTone;
    /** Optional leading glyph; the tone decides its colour. */
    icon?: IconName;
    /** Optional inline action rendered after the copy. */
    action?: ToastAction;
    /** Renders the dismiss affordance when provided. */
    onDismiss?: () => void;
    /** Accessible name for the dismiss button. */
    dismissLabel?: string;
};

/**
 * Compact notification surface with an optional action and dismiss control. It
 * is a polite live region so assistive technology announces it when it appears.
 */
export const Toast = ({
    title,
    description,
    tone = "positive",
    icon,
    action,
    onDismiss,
    dismissLabel,
    className,
    ...props
}: ToastProps) => {
    const styles = toast({ tone, });

    return (
        <div
            {...props}
            role="status"
            aria-live="polite"
            className={cx(styles.root, className)}
        >
            {icon !== undefined && <Icon className={styles.icon} name={icon} size="md" />}
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                {hasText(description) && <p className={styles.body}>{description}</p>}
            </div>
            {action !== undefined && (
                <button type="button" className={styles.action} onClick={action.onClick}>
                    {action.label}
                </button>
            )}
            {onDismiss !== undefined && (
                <button
                    type="button"
                    className={styles.dismiss}
                    onClick={onDismiss}
                    aria-label={dismissLabel ?? `Dismiss ${title}`}
                >
                    <Icon name="x" size="sm" />
                </button>
            )}
        </div>
    );
};

/** An empty description is meaningful: it removes the paragraph entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
