import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { badge, } from "@shared/styled-system/recipes";

export type BadgeTone = "neutral" | "positive" | "negative" | "brand";

export type BadgeProps = Omit<ComponentProps<"span">, "children"> & {
    /** Visible label; the badge has no other content. */
    label: string;
    tone?: BadgeTone;
    /** Renders the leading status dot; on by default. */
    withDot?: boolean;
};

/**
 * Small status label: a coloured dot plus text. The dot paints from the tone's
 * semantic role; the label always reads the neutral text role.
 */
export const Badge = ({
    label,
    tone = "neutral",
    withDot = true,
    className,
    ...props
}: BadgeProps) => {
    const styles = badge({ tone, });

    return (
        <span {...props} className={cx(styles.root, className)}>
            {withDot && <span className={styles.dot} aria-hidden="true" />}
            <span className={styles.label}>{label}</span>
        </span>
    );
};
