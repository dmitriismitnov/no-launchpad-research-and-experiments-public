import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useEffect, useId, useRef, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { popover, } from "@shared/styled-system/recipes";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";

export type PopoverProps = Omit<ComponentProps<"div">, "children"> & {
    /** The control that opens the surface. */
    trigger: ReactNode;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** Side of the trigger the surface is anchored to. */
    placement?: PopoverPlacement;
    /** Optional surface title. */
    title?: string;
    /** Optional supporting copy under the title. */
    description?: string;
    /** Accessible name used when no title is rendered. */
    label?: string;
    /** Surface content rendered after the title and description. */
    children?: ReactNode;
};

/**
 * Light overlay anchored to a trigger. Open state is uncontrolled by default, or
 * controlled with `open` / `onOpenChange`. `Escape` and an outside pointer press
 * close it and focus stays with the consumer; the surface is rendered in place
 * (no portal) with no focus trap. A consumer that needs an arrow, modal mode or
 * collision handling owns that behaviour.
 */
export const Popover = ({
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    placement = "bottom",
    title,
    description,
    label,
    children,
    className,
    onKeyDown,
    ...props
}: PopoverProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const rootRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const descriptionId = useId();
    const styles = popover({ placement, });

    const requestOpenChange = (next: boolean) => {
        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    useEffect(() => {
        if ( !isOpen ) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if ( rootRef.current !== null && !rootRef.current.contains(event.target as Node) ) {
                requestOpenChange(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    });

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            requestOpenChange(false);
        }
    };

    return (
        <div {...props} ref={rootRef} className={cx(styles.root, className)} onKeyDown={handleKeyDown}>
            <button
                type="button"
                className={styles.trigger}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => requestOpenChange(!isOpen)}
            >
                {trigger}
            </button>
            {isOpen && (
                <div
                    role="dialog"
                    aria-label={title === undefined ? label : undefined}
                    aria-labelledby={title !== undefined ? titleId : undefined}
                    aria-describedby={description !== undefined ? descriptionId : undefined}
                    className={styles.surface}
                >
                    <div className={styles.content}>
                        {title !== undefined && <p id={titleId} className={styles.title}>{title}</p>}
                        {description !== undefined && (
                            <p id={descriptionId} className={styles.description}>{description}</p>
                        )}
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
