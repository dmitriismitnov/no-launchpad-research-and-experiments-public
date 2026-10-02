import type { ComponentProps, KeyboardEvent, MouseEvent, ReactElement, ReactNode, } from "react";
import { cloneElement, useCallback, useEffect, useId, useRef, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { popover, } from "@shared/styled-system/recipes";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";

/** Behaviour and ARIA the Popover projects onto a composed trigger element. */
type TriggerElementProps = {
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    "aria-haspopup"?: "dialog";
    "aria-expanded"?: boolean;
};

export type PopoverProps = Omit<ComponentProps<"div">, "children"> & {
    /**
     * The control that opens the surface. Pass one trigger element — a public
     * `Button`, `ButtonIcon` or `<a>` — and the Popover clones it in place with
     * the open behaviour and ARIA instead of wrapping it. A string is a
     * shorthand that renders a Popover-owned `<button type="button">`.
     */
    trigger: ReactElement | string;
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

    const requestOpenChange = useCallback((next: boolean) => {
        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    }, [ isControlled, onOpenChange, ]);

    // Outside presses close the surface; the listener exists only while open and
    // depends on the stable `requestOpenChange` callback.
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
    }, [ isOpen, requestOpenChange, ]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            requestOpenChange(false);
        }
    };

    const toggleOpen = (event: MouseEvent<HTMLElement>) => {
        if ( event.defaultPrevented ) {
            return;
        }

        requestOpenChange(!isOpen);
    };

    // A string keeps the backward-compatible shorthand and is always rendered as
    // a Popover-owned button. An element is cloned in place, so a public Button
    // or anchor stays the single interactive node and keeps its own classes.
    const triggerNode = typeof trigger === "string"
        ? (
            <button
                type="button"
                className={styles.trigger}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={toggleOpen}
            >
                {trigger}
            </button>
        )
        : cloneElement(trigger as ReactElement<TriggerElementProps>, {
            onClick: (event: MouseEvent<HTMLElement>) => {
                ( trigger as ReactElement<TriggerElementProps> ).props.onClick?.(event);
                toggleOpen(event);
            },
            "aria-haspopup": "dialog",
            "aria-expanded": isOpen,
        });

    return (
        <div {...props} ref={rootRef} className={cx(styles.root, className)} onKeyDown={handleKeyDown}>
            {triggerNode}
            {isOpen && (
                <div
                    role="dialog"
                    aria-label={title === undefined ? ( hasText(label) ? label : "Popover" ) : undefined}
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

/** An empty or whitespace string counts as absent; the dialog always stays named. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
