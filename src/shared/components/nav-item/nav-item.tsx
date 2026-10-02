import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { navItem, } from "@shared/styled-system/recipes";

export type NavItemProps = Omit<ComponentProps<"a">, "children"> & {
    /** Visible entry text; the entry has no other content. */
    label: string;
    /** Optional leading glyph. */
    icon?: IconName;
    /** Marks the entry as the current page and paints the selected surface. */
    active?: boolean;
    /** Presentational disabled state: muted colour and no pointer events. */
    disabled?: boolean;
};

/**
 * Horizontal navigation entry. An active entry is exposed as `aria-current`
 * and painted with the selected surface; the icon and label switch together.
 * It is an anchor, not a router: the consumer owns navigation behaviour.
 */
export const NavItem = ({
    label,
    icon,
    active = false,
    disabled = false,
    className,
    ...props
}: NavItemProps) => {
    const styles = navItem({ active, disabled, });

    return (
        <a
            {...props}
            className={cx(styles.root, className)}
            {...( active
                ? { "aria-current": "page", }
                : {} )}
            {...( disabled
                ? { "aria-disabled": true, tabIndex: -1, }
                : {} )}
        >
            {icon !== undefined && <Icon className={styles.icon} name={icon} size="sm" />}
            <span className={styles.label}>{label}</span>
        </a>
    );
};
