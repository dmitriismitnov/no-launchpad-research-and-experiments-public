import type { HTMLAttributes, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { spinner, } from "@shared/styled-system/recipes";

export type SpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    /** Accessible name. Omit for a purely decorative spinner. */
    label?: string;
};

/**
 * Rotating loader glyph. Decorative by default; passing `label` exposes it as a
 * status for assistive technology.
 */
export const Spinner = ({ label, className, ...props }: SpinnerProps) => {
    const styles = spinner();

    return (
        <span
            {...props}
            className={cx(styles, className)}
            {...( label === undefined
                ? { "aria-hidden": true, }
                : { role: "status", "aria-label": label, } )}
        >
            <Icon name="loader" size="lg" />
        </span>
    );
};
