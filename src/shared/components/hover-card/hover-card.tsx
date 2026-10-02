import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useId, useState, } from "react";

import { cx, } from "@shared/styled-system/css";
import { hoverCard, } from "@shared/styled-system/recipes";

export type HoverCardPlacement = "top" | "right" | "bottom" | "left";

export type HoverCardProps = Omit<ComponentProps<"span">, "children"> & {
    /** Full name shown as the preview heading. */
    name: string;
    /** Optional role or subtitle under the name. */
    role?: string;
    /** Optional supporting copy. */
    bio?: string;
    /** Avatar initials; derived from `name` when omitted. */
    initials?: string;
    /** Optional trailing actions row. */
    actions?: ReactNode;
    /** Side of the trigger the surface is anchored to. */
    placement?: HoverCardPlacement;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** Accessible name; defaults to `name`. */
    label?: string;
    /** The element the preview describes. */
    children: ReactNode;
};

/**
 * Rich preview shown on hover or focus of its trigger. Open state is uncontrolled
 * by default, or controlled with `open` / `onOpenChange`; `Escape` hides it. The
 * surface renders in place (no portal), never traps focus and is described by its
 * trigger. A consumer that needs an open delay, collision handling or a
 * different parts composition owns that behaviour.
 */
export const HoverCard = ({
    name,
    role,
    bio,
    initials,
    actions,
    placement = "bottom",
    open,
    defaultOpen = false,
    onOpenChange,
    label,
    children,
    className,
    onKeyDown,
    ...props
}: HoverCardProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const surfaceId = useId();
    const styles = hoverCard({ placement, });
    const initialsText = initials ?? deriveInitials(name);

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
                <span
                    id={surfaceId}
                    role="tooltip"
                    aria-label={label ?? name}
                    className={styles.surface}
                >
                    <span className={styles.content}>
                        <span className={styles.user}>
                            {initialsText !== "" && (
                                <span className={styles.avatar} aria-hidden="true">
                                    <span className={styles.initials}>{initialsText}</span>
                                </span>
                            )}
                            <span className={styles.meta}>
                                <span className={styles.name}>{name}</span>
                                {role !== undefined && <span className={styles.role}>{role}</span>}
                            </span>
                        </span>
                        {bio !== undefined && <span className={styles.bio}>{bio}</span>}
                        {actions !== undefined && <span className={styles.actions}>{actions}</span>}
                    </span>
                </span>
            )}
        </span>
    );
};

/** First letter of the first two words; an empty name yields no initials. */
function deriveInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .filter((part) => part !== "")
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}
