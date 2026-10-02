import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { alert, } from "@shared/styled-system/recipes";

export type AlertTone = "neutral" | "positive" | "negative" | "brand";

export type AlertProps = Omit<ComponentProps<"div">, "children"> & {
    /** Short headline; always rendered. */
    title: string;
    /** Supporting copy; omitted when empty. */
    description?: string;
    tone?: AlertTone;
    /** Optional leading glyph; the tone decides its colour. */
    icon?: IconName;
    /** Renders the dismiss affordance when provided. */
    onDismiss?: () => void;
    /** Accessible name for the dismiss button. */
    dismissLabel?: string;
};

/**
 * Feedback banner: an optional tone-coloured icon, a title and optional body
 * copy. The tone selects the semantic feedback role and never branches on
 * theme.
 */
export const Alert = ({
    title,
    description,
    tone = "neutral",
    icon,
    onDismiss,
    dismissLabel,
    className,
    ...props
}: AlertProps) => {
    const styles = alert({ tone, });

    return (
        <div {...props} role="alert" className={cx(styles.root, className)}>
            <div className={styles.header}>
                {icon !== undefined && <Icon className={styles.icon} name={icon} size="md" />}
                <p className={styles.title}>{title}</p>
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
            {hasText(description) && <p className={styles.body}>{description}</p>}
        </div>
    );
};

/** An empty description is meaningful: it removes the paragraph entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
