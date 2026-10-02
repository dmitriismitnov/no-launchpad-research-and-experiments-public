import type { ComponentProps, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { step, } from "@shared/styled-system/recipes";

export type StepState = "completed" | "current" | "upcoming" | "error";

export type StepProps = Omit<ComponentProps<"div">, "children"> & {
    /** 1-based marker number; shown until the step is completed. */
    number: number;
    /** Visible step label; always rendered. */
    label: string;
    /** Supporting copy; omitted when empty. */
    description?: string;
    /** Progress state; repaints the marker and label. */
    state?: StepState;
};

/**
 * Single progress step: a numbered marker, its label and an optional
 * description. Completed steps show a check, the current step is exposed with
 * `aria-current="step"` and the remaining states only repaint the marker.
 */
export const Step = ({
    number,
    label,
    description,
    state = "upcoming",
    className,
    ...props
}: StepProps) => {
    const styles = step({ state, });
    const isCompleted = state === "completed";
    const isError = state === "error";

    return (
        <div
            {...props}
            className={cx(styles.root, className)}
            {...( state === "current"
                ? { "aria-current": "step", }
                : {} )}
        >
            <span className={styles.marker}>
                {isCompleted
                    ? <Icon name="check" size="sm" />
                    : <span className={styles.markerContent}>{isError ? "!" : number}</span>}
            </span>
            <span className={styles.text}>
                <span className={styles.title}>{label}</span>
                {hasText(description) && <span className={styles.description}>{description}</span>}
            </span>
        </div>
    );
};

/** An empty description is meaningful: it removes the detail line entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
