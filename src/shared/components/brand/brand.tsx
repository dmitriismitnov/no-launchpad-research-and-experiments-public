import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { brand, } from "@shared/styled-system/recipes";

export type BrandProps = Omit<ComponentProps<"span">, "children"> & {
    /** Visible product name; defaults to `No Launchpad`. */
    name?: string;
};

/**
 * Product lockup: a solid rounded mark plus the wordmark. Decorative shape only,
 * so the lockup needs no glyph; wrap it in a `Link` when it should navigate.
 */
export const Brand = ({ name = "No Launchpad", className, ...props }: BrandProps) => {
    const styles = brand();

    return (
        <span {...props} className={cx(styles.root, className)}>
            <span className={styles.mark} aria-hidden="true" />
            <span className={styles.wordmark}>{name}</span>
        </span>
    );
};
