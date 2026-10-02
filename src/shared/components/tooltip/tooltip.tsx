import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useId, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { tooltip, } from "@shared/styled-system/recipes";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export type TooltipProps = Omit<ComponentProps<"span">, "children"> & {
    /** Tooltip copy; a fragment, never a sentence with a full stop. */
    label: string;
    /** Optional trailing keyboard shortcut hint. */
    shortcut?: string;
    /** Side of the trigger the surface is anchored to. */
    placement?: TooltipPlacement;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** The element the tooltip describes. */
    children: ReactNode;
};

/**
 * Short hint shown on hover or focus of its trigger. Open state is uncontrolled
 * by default, or controlled with `open` / `onOpenChange`; `Escape` hides it. The
 * surface is rendered in place (no portal), positioned relative to the trigger.
 * It is never focusable and never traps focus; a consumer that needs a delay,
 * collision handling or an arrow owns that behaviour.
 */
export const Tooltip = ({
    label,
    shortcut,
    placement = "top",
    open,
    defaultOpen = false,
    onOpenChange,
    children,
    className,
    onKeyDown,
    ...props
}: TooltipProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const surfaceId = useId();
    const styles = tooltip({ placement, });

    const requestOpenChange = (next: boolean) => {
        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            requestOpenChange(false);
        }
    };

    return (
        <span {...props} className={cx(styles.root, className)}>
            <span
                className={styles.trigger}
                tabIndex={0}
                aria-describedby={isOpen ? surfaceId : undefined}
                onMouseEnter={() => requestOpenChange(true)}
                onMouseLeave={() => requestOpenChange(false)}
                onFocus={() => requestOpenChange(true)}
                onBlur={() => requestOpenChange(false)}
                onKeyDown={handleKeyDown}
            >
                {children}
            </span>
            {isOpen && (
                <span id={surfaceId} role="tooltip" className={styles.surface}>
                    <span className={styles.label}>{label}</span>
                    {shortcut !== undefined && <span className={styles.shortcut}>{shortcut}</span>}
                </span>
            )}
        </span>
    );
};
