import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { dividerRule, } from "@shared/styled-system/recipes";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = Omit<ComponentProps<"div">, "children"> & {
    orientation?: DividerOrientation;
};

/**
 * A 1px rule. The colour reads the divider semantic role; orientation only
 * swaps the axis.
 */
export const Divider = ({ orientation = "horizontal", className, ...props }: DividerProps) => {
    const styles = dividerRule({ orientation, });

    return (
        <div
            {...props}
            role="separator"
            aria-orientation={orientation}
            className={cx(styles, className)}
        />
    );
};
