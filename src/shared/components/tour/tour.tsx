import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { tour, } from "@shared/styled-system/recipes";

export type TourPlacement = "top" | "right" | "bottom" | "left";

export type TourStep = {
    /** Step heading. */
    title: string;
    /** Optional supporting copy under the heading. */
    body?: string;
};

export type TourProps = Omit<ComponentProps<"div">, "children"> & {
    /** Steps to walk through, in order. */
    steps: readonly TourStep[];
    /** Optional control that opens the tour. */
    trigger?: ReactNode;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** Controlled step index (0-based); pass with `onStepChange` to own it. */
    step?: number;
    /** Initial step index when uncontrolled. */
    defaultStep?: number;
    /** Called with the next step index when Back or Next is used. */
    onStepChange?: (index: number) => void;
    /** Called when the final step is completed. */
    onFinish?: () => void;
    /** Called when the tour is skipped or dismissed. */
    onSkip?: () => void;
    /** Shows the skip / dismiss control. */
    skippable?: boolean;
    /** Next action label on all but the final step. */
    nextLabel?: string;
    /** Final step action label. */
    finishLabel?: string;
    /** Back action label. */
    backLabel?: string;
    /** Accessible name for the skip / dismiss control. */
    skipLabel?: string;
    /** Side of the positioning root the bubble is anchored to. */
    placement?: TourPlacement;
    /** Accessible name for the tour dialog. */
    label?: string;
};

/**
 * Step-by-step onboarding bubble with a progress counter and dots, a title, an
 * optional body, and Back / Next actions. Open state and step index are
 * uncontrolled by default, or controlled with `open` / `onOpenChange` and
 * `step` / `onStepChange`. The final step's action calls `onFinish`; the skip
 * control and `Escape` call `onSkip`. It renders in place (no portal) with no
 * target highlight, focus trap or focus return.
 */
export const Tour = ({
    steps,
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    step,
    defaultStep = 0,
    onStepChange,
    onFinish,
    onSkip,
    skippable = true,
    nextLabel = "Next",
    finishLabel = "Finish",
    backLabel = "Back",
    skipLabel,
    placement = "bottom",
    label = "Product tour",
    className,
    onKeyDown,
    ...props
}: TourProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const [ uncontrolledStep, setUncontrolledStep, ] = useState(defaultStep);
    const isOpenControlled = open !== undefined;
    const isStepControlled = step !== undefined;
    const isOpen = isOpenControlled ? open : uncontrolledOpen;
    const total = steps.length;
    const lastIndex = total - 1;
    const active = clampStep(isStepControlled ? step : uncontrolledStep, lastIndex);
    const activeStep = steps[active];
    const isFirst = active <= 0;
    const isLast = active >= lastIndex;
    const styles = tour({ placement, });
    const currentStyles = tour({ placement, current: true, });

    const requestOpenChange = (next: boolean) => {
        if ( !isOpenControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const requestStepChange = (next: number) => {
        const clamped = clampStep(next, lastIndex);

        if ( !isStepControlled ) {
            setUncontrolledStep(clamped);
        }

        onStepChange?.(clamped);
    };

    const handleNext = () => {
        if ( isLast ) {
            requestOpenChange(false);
            onFinish?.();

            return;
        }

        requestStepChange(active + 1);
    };

    const handleSkip = () => {
        requestOpenChange(false);
        onSkip?.();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            handleSkip();
        }
    };

    return (
        <div {...props} className={cx(styles.root, className)} onKeyDown={handleKeyDown}>
            {trigger !== undefined && (
                <button
                    type="button"
                    className={styles.trigger}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    onClick={() => requestOpenChange(true)}
                >
                    {trigger}
                </button>
            )}
            {isOpen && activeStep !== undefined && (
                <div role="dialog" aria-label={label} className={styles.surface}>
                    <div className={styles.content}>
                        <p className={styles.step}>{`Step ${active + 1} of ${total}`}</p>
                        <p className={styles.title}>{activeStep.title}</p>
                        {activeStep.body != null && <p className={styles.body}>{activeStep.body}</p>}
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.dots} aria-hidden="true">
                            {steps.map((_, index) => (
                                <span
                                    key={index}
                                    className={cx(styles.dot, index === active && currentStyles.dot)}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            className={styles.back}
                            disabled={isFirst}
                            onClick={() => requestStepChange(active - 1)}
                        >
                            {backLabel}
                        </button>
                        <button
                            type="button"
                            className={styles.next}
                            onClick={handleNext}
                        >
                            {isLast ? finishLabel : nextLabel}
                        </button>
                        {skippable && (
                            <button
                                type="button"
                                className={styles.close}
                                aria-label={skipLabel ?? "Skip tour"}
                                onClick={handleSkip}
                            >
                                <Icon name="x" size="sm" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

function clampStep(value: number, lastIndex: number): number {
    if ( lastIndex < 0 ) {
        return 0;
    }

    return Math.min(Math.max(value, 0), lastIndex);
}
