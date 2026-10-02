import type { ComponentProps, ReactNode, } from "react";

import { cx, } from "@shared/styled-system/css";
import { splitter, } from "@shared/styled-system/recipes";

export type SplitterOrientation = "horizontal" | "vertical";

export type SplitterProps = Omit<ComponentProps<"div">, "children"> & {
    /** First pane; left in horizontal, top in vertical. */
    start: ReactNode;
    /** Second pane; right in horizontal, bottom in vertical. */
    end: ReactNode;
    /** Split direction; `horizontal` places the panes side by side. */
    orientation?: SplitterOrientation;
};

/**
 * Two-pane layout with a static divider. The panes are consumer slots and the
 * divider is a `separator`; there is no drag or resize behaviour.
 */
export const Splitter = ({
    start,
    end,
    orientation = "horizontal",
    className,
    ...props
}: SplitterProps) => {
    const styles = splitter({ orientation, });
    // A horizontal split has a vertical divider, and vice versa.
    const dividerOrientation = orientation === "horizontal" ? "vertical" : "horizontal";

    return (
        <div {...props} className={cx(styles.root, className)}>
            <div className={cx(styles.pane, styles.paneStart)}>{start}</div>
            <div className={styles.handle} role="separator" aria-orientation={dividerOrientation}>
                <span className={styles.grip} aria-hidden="true" />
            </div>
            <div className={cx(styles.pane, styles.paneEnd)}>{end}</div>
        </div>
    );
};
