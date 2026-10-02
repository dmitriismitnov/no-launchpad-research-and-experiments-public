import type { ComponentProps, KeyboardEvent, ReactNode, } from "react";
import { useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { floatingPanel, } from "@shared/styled-system/recipes";

export type FloatingPanelPlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type FloatingPanelProps = Omit<ComponentProps<"div">, "children" | "title"> & {
    /** Panel heading; also its accessible name. */
    title: string;
    /** Leading glyph; defaults to the sliders tool mark. */
    icon?: IconName;
    /** Panel content. */
    children?: ReactNode;
    /** Optional control that opens the panel. */
    trigger?: ReactNode;
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state. */
    onOpenChange?: (open: boolean) => void;
    /** Called when the panel is dismissed by the close control or Escape. */
    onClose?: () => void;
    /** Accessible name for the close control. */
    closeLabel?: string;
    /** Shows a collapse control that hides the body. */
    collapsible?: boolean;
    /** Controlled collapsed state; pass with `onCollapsedChange` to own it. */
    collapsed?: boolean;
    /** Initial collapsed state when uncontrolled. */
    defaultCollapsed?: boolean;
    /** Called with the next collapsed state. */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Viewport corner the panel is pinned to. */
    placement?: FloatingPanelPlacement;
    /** Accessible name override; defaults to the title. */
    label?: string;
};

/**
 * Small tool or inspector surface pinned to a viewport corner. Open state is
 * uncontrolled by default, or controlled with `open` / `onOpenChange`; when
 * `collapsible` is set, the body can be collapsed independently (uncontrolled by
 * default, or controlled with `collapsed` / `onCollapsedChange`). `Escape` closes
 * it. It renders in place (no portal) and is static: dragging, resizing and
 * session persistence are out of scope, and focus is never moved on mount.
 */
export const FloatingPanel = ({
    title,
    icon = "sliders-horizontal",
    children,
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    onClose,
    closeLabel,
    collapsible = false,
    collapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    placement = "bottom-right",
    label,
    className,
    onKeyDown,
    ...props
}: FloatingPanelProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const [ uncontrolledCollapsed, setUncontrolledCollapsed, ] = useState(defaultCollapsed);
    const isOpenControlled = open !== undefined;
    const isCollapsedControlled = collapsed !== undefined;
    const isOpen = isOpenControlled ? open : uncontrolledOpen;
    const isCollapsed = isCollapsedControlled ? collapsed : uncontrolledCollapsed;
    const styles = floatingPanel({ placement, });

    const requestOpenChange = (next: boolean) => {
        if ( !isOpenControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    const requestClose = () => {
        requestOpenChange(false);
        onClose?.();
    };

    const requestCollapsedChange = (next: boolean) => {
        if ( !isCollapsedControlled ) {
            setUncontrolledCollapsed(next);
        }

        onCollapsedChange?.(next);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            requestClose();
        }
    };

    const showBody = children != null && ( !collapsible || !isCollapsed );

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
            {isOpen && (
                <section
                    role="region"
                    aria-label={label ?? title}
                    className={styles.panel}
                >
                    <div className={styles.header}>
                        <Icon className={styles.icon} name={icon} size="sm" />
                        <p className={styles.title}>{title}</p>
                        {collapsible && (
                            <button
                                type="button"
                                className={styles.collapse}
                                aria-expanded={!isCollapsed}
                                aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
                                onClick={() => requestCollapsedChange(!isCollapsed)}
                            >
                                <Icon name={isCollapsed ? "plus" : "minus"} size="sm" />
                            </button>
                        )}
                        <button
                            type="button"
                            className={styles.close}
                            aria-label={closeLabel ?? "Close"}
                            onClick={() => requestClose()}
                        >
                            <Icon name="x" size="sm" />
                        </button>
                    </div>
                    {showBody && <div className={styles.body}>{children}</div>}
                </section>
            )}
        </div>
    );
};
