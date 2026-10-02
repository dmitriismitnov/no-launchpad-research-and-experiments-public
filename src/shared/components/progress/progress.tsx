import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { progress, } from "@shared/styled-system/recipes";

export type ProgressProps = Omit<ComponentProps<"div">, "children"> & {
    /** Current value, clamped to `0..max`. */
    value: number;
    max?: number;
    /** Accessible name for the progressbar. */
    label?: string;
};

/**
 * Horizontal progress bar. The value is clamped, exposed through
 * `aria-valuenow` and painted as an inline fill percentage.
 */
export const Progress = ({ value, max = 100, label, className, ...props }: ProgressProps) => {
    const styles = progress();
    const clamped = clamp(value, max);

    return (
        <div
            {...props}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={clamped}
            {...( label !== undefined ? { "aria-label": label, } : {} )}
            className={cx(styles.root, className)}
        >
            <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${percentage(clamped, max)}%`, }} />
            </div>
        </div>
    );
};

function clamp(value: number, max: number): number {
    return Math.min(Math.max(value, 0), max);
}

function percentage(value: number, max: number): number {
    return max > 0 ? ( value / max ) * 100 : 0;
}
