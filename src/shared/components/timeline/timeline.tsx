import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { timeline, } from "@shared/styled-system/recipes";

export type TimelineItem = {
    /** Event title; always rendered. */
    title: string;
    /** Supporting detail; omitted when empty. */
    meta?: string;
};

export type TimelineProps = Omit<ComponentProps<"ol">, "children"> & {
    /** Events to render, in order. The last row drops its connector. */
    items: readonly TimelineItem[];
};

/**
 * Vertical event sequence. Each row renders a ring marker and a connector line;
 * the connector is dropped on the final row so the rail ends cleanly.
 */
export const Timeline = ({ items, className, ...props }: TimelineProps) => {
    const styles = timeline();

    return (
        <ol {...props} className={cx(styles.root, className)}>
            {items.map((item, index) => (
                <li key={index} className={styles.item}>
                    <span className={styles.rail} aria-hidden="true">
                        <span className={styles.marker} />
                        {index < items.length - 1 && <span className={styles.line} />}
                    </span>
                    <span className={styles.text}>
                        <span className={styles.title}>{item.title}</span>
                        {hasText(item.meta) && <span className={styles.meta}>{item.meta}</span>}
                    </span>
                </li>
            ))}
        </ol>
    );
};

/** An empty meta is meaningful: it removes the detail line entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
