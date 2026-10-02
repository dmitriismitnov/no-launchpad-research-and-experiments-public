import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { scrollArea, } from "@shared/styled-system/recipes";

export type ScrollAreaProps = ComponentProps<"div"> & {
    /** Accessible name for the scroll region, when it needs one. */
    label?: string;
    /** Maximum viewport height before the surface scrolls. Defaults to `10rem`. */
    maxHeight?: string;
};

/**
 * Clipped surface that scrolls its content. Scrolling is native CSS `overflow`;
 * the scrollbar is restyled with pseudo-elements rather than simulated, so
 * keyboard, wheel, touch and scroll-anchoring keep working. The viewport is
 * focusable so the region is scrollable from the keyboard.
 */
export const ScrollArea = ({
    label,
    maxHeight = "10rem",
    className,
    children,
    ...props
}: ScrollAreaProps) => {
    const styles = scrollArea();

    return (
        <div {...props} className={cx(styles.root, className)}>
            <div
                className={styles.viewport}
                style={{ maxHeight, }}
                tabIndex={0}
                {...( label === undefined ? {} : { role: "region", "aria-label": label, } )}
            >
                {children}
            </div>
        </div>
    );
};
