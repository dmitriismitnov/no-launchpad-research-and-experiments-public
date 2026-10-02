import type { ComponentProps, ReactNode, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { emptyState, } from "@shared/styled-system/recipes";

export type EmptyStateProps = Omit<ComponentProps<"div">, "children"> & {
    /** Short headline; always rendered. */
    title: string;
    /** Supporting copy; omitted when empty. */
    description?: string;
    /** Optional centred glyph. */
    icon?: IconName;
    /** Optional action; rendered below the copy when provided. */
    action?: ReactNode;
};

/**
 * Centred placeholder for an empty collection. Layout only; the optional action
 * is a consumer slot and carries its own behaviour.
 */
export const EmptyState = ({
    title,
    description,
    icon,
    action,
    className,
    ...props
}: EmptyStateProps) => {
    const styles = emptyState();

    return (
        <div {...props} className={cx(styles.root, className)}>
            {icon !== undefined && <Icon className={styles.icon} name={icon} size="lg" />}
            <p className={styles.title}>{title}</p>
            {hasText(description) && <p className={styles.description}>{description}</p>}
            {action !== undefined && <div className={styles.action}>{action}</div>}
        </div>
    );
};

/** An empty description is meaningful: it removes the paragraph entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
