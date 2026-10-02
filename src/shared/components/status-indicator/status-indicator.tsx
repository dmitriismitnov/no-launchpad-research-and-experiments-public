import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { statusIndicator, } from "@shared/styled-system/recipes";

export type StatusIndicatorTone = "neutral" | "positive" | "negative" | "brand";

export type StatusIndicatorProps = Omit<ComponentProps<"span">, "children"> & {
    /** Visible status text. */
    label: string;
    tone?: StatusIndicatorTone;
};

/** A coloured status dot plus its label. */
export const StatusIndicator = ({
    label,
    tone = "neutral",
    className,
    ...props
}: StatusIndicatorProps) => {
    const styles = statusIndicator({ tone, });

    return (
        <span {...props} className={cx(styles.root, className)}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
        </span>
    );
};
