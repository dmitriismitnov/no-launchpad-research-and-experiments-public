import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { statistic, } from "@shared/styled-system/recipes";

export type StatisticTone = "neutral" | "positive" | "negative" | "brand";

export type StatisticTrend = "neutral" | "up" | "down";

export type StatisticProps = Omit<ComponentProps<"div">, "children"> & {
    /** Short metric name; always rendered. */
    label: string;
    /** Prominent metric value; always rendered. */
    value: string;
    /** Supporting delta copy; omitted when empty. */
    delta?: string;
    /** Colour role for the value. */
    tone?: StatisticTone;
    /** Direction the delta represents; paints the delta and its glyph. */
    trend?: StatisticTrend;
    /** Optional leading glyph for the delta, e.g. a trend arrow. */
    deltaIcon?: IconName;
};

/**
 * Metric readout: a muted label, a prominent value and an optional delta line.
 * The component is purely presentational; trend is a declared meaning, not a
 * computation.
 */
export const Statistic = ({
    label,
    value,
    delta,
    tone = "neutral",
    trend = "neutral",
    deltaIcon,
    className,
    ...props
}: StatisticProps) => {
    const styles = statistic({ tone, trend, });

    return (
        <div {...props} className={cx(styles.root, className)}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
            {hasText(delta) && (
                <span className={styles.delta}>
                    {deltaIcon !== undefined && <Icon className={styles.deltaIcon} name={deltaIcon} size="sm" />}
                    <span className={styles.deltaText}>{delta}</span>
                </span>
            )}
        </div>
    );
};

/** An empty delta is meaningful: it removes the line entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
