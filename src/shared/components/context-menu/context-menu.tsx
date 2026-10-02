import type { ComponentProps, KeyboardEvent, MouseEvent, ReactNode, } from "react";
import { useState, } from "react";

import { Menu, } from "@shared/components/menu";
import { cx, } from "@shared/styled-system/css";
import { contextMenu, } from "@shared/styled-system/recipes";

export type ContextMenuPoint = {
    x: number;
    y: number;
};

export type ContextMenuProps = Omit<ComponentProps<"div">, "children"> & {
    /** Controlled open state; pass with `onOpenChange` to own it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state, and with the pointer point when known. */
    onOpenChange?: (open: boolean, point?: ContextMenuPoint) => void;
    /** Fixed horizontal offset of the surface; omit to place it at the pointer. */
    x?: number;
    /** Fixed vertical offset of the surface; omit to place it at the pointer. */
    y?: number;
    /** Accessible name for the menu surface. */
    label?: string;
    /** Optional trigger area content; the whole root still opens on right click. */
    trigger?: ReactNode;
    /** Menu rows and dividers from the public `Menu` API. */
    children?: ReactNode;
};

/**
 * Menu surface positioned over a trigger area. It reuses `Menu` / `MenuItem`
 * for the rows, so only the positioning and open state live here. The surface
 * opens at the pointer by default, or at the `x` / `y` offsets when given;
 * `Escape` closes it. Open state is uncontrolled by default, or controlled with
 * `open` / `onOpenChange`.
 */
export const ContextMenu = ({
    open,
    defaultOpen = false,
    onOpenChange,
    x,
    y,
    label,
    trigger,
    children,
    className,
    onContextMenu,
    onKeyDown,
    ...props
}: ContextMenuProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const [ point, setPoint, ] = useState<ContextMenuPoint>({ x: 0, y: 0, });
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const styles = contextMenu();
    const position = { left: x ?? point.x, top: y ?? point.y, };

    const requestOpenChange = (next: boolean, nextPoint?: ContextMenuPoint) => {
        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next, nextPoint);
    };

    const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
        onContextMenu?.(event);

        if ( event.defaultPrevented ) {
            return;
        }

        event.preventDefault();

        if ( x !== undefined && y !== undefined ) {
            requestOpenChange(true);

            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const nextPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top, };

        setPoint(nextPoint);
        requestOpenChange(true, nextPoint);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if ( event.key === "Escape" && isOpen ) {
            requestOpenChange(false);
        }
    };

    return (
        <div
            {...props}
            className={cx(styles.root, className)}
            onContextMenu={handleContextMenu}
            onKeyDown={handleKeyDown}
        >
            {trigger !== undefined && <div className={styles.trigger}>{trigger}</div>}
            {isOpen && (
                <Menu aria-label={label} className={styles.surface} style={position}>
                    {children}
                </Menu>
            )}
        </div>
    );
};
