import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { progressRing, } from "@shared/styled-system/recipes";

export type ProgressRingProps = Omit<ComponentProps<"div">, "children"> & {
    /** Current value, clamped to `0..max`. */
    value: number;
    max?: number;
    /** Outer diameter in pixels. */
    size?: number;
    /** Ring thickness in pixels. */
    thickness?: number;
    /** Accessible name for the progressbar. */
    label?: string;
};

/**
 * Circular progress indicator. The arc length comes from `strokeDasharray` /
 * `strokeDashoffset` on an SVG circle; `size` and `thickness` stay runtime
 * geometry so the ring can scale with its context.
 */
export const ProgressRing = ({
    value,
    max = 100,
    size = 40,
    thickness = 4,
    label,
    className,
    style,
    ...props
}: ProgressRingProps) => {
    const styles = progressRing();
    const clamped = clamp(value, max);
    const radius = ( size - thickness ) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * ( 1 - ( max > 0 ? clamped / max : 0 ) );
    const center = size / 2;

    return (
        <div
            {...props}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={clamped}
            {...( label !== undefined ? { "aria-label": label, } : {} )}
            className={cx(styles.root, className)}
            style={{ width: size, height: size, ...style, }}
        >
            <svg
                className={styles.svg}
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                aria-hidden="true"
            >
                <circle
                    className={styles.track}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={thickness}
                />
                <circle
                    className={styles.arc}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={thickness}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
        </div>
    );
};

function clamp(value: number, max: number): number {
    return Math.min(Math.max(value, 0), max);
}
