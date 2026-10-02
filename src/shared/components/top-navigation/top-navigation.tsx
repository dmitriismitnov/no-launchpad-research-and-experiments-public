import type { ComponentProps, ReactNode, } from "react";

import { cx, } from "@shared/styled-system/css";
import { topNavigation, } from "@shared/styled-system/recipes";

export type TopNavigationSurface = "base" | "transparent";

export type TopNavigationProps = Omit<ComponentProps<"header">, "children"> & {
    /** Leading lockup, typically a `Brand`. */
    brand: ReactNode;
    /** Navigation entries, typically `NavItem`s. */
    nav?: ReactNode;
    /** Trailing actions, typically links and a `Button`. */
    actions?: ReactNode;
    /** Bar fill; `transparent` keeps the boundary without a surface. */
    surface?: TopNavigationSurface;
};

/**
 * Full-width top bar. The three regions are consumer slots and the bar only owns
 * their layout, so it composes `Brand`, `NavItem` and buttons without gaining
 * routing or menu behaviour.
 */
export const TopNavigation = ({
    brand,
    nav,
    actions,
    surface = "base",
    className,
    ...props
}: TopNavigationProps) => {
    const styles = topNavigation({ surface, });

    return (
        <header {...props} className={cx(styles.root, className)}>
            <div className={styles.brand}>{brand}</div>
            {nav !== undefined && <nav className={styles.nav}>{nav}</nav>}
            <div className={styles.spacer} />
            {actions !== undefined && <div className={styles.actions}>{actions}</div>}
        </header>
    );
};
