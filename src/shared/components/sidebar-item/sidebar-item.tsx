import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { sidebarItem, } from "@shared/styled-system/recipes";

export type SidebarItemProps = Omit<ComponentProps<"a">, "children"> & {
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
 * Vertical navigation entry for a sidebar rail. An active entry is exposed as
 * `aria-current` and painted with the selected surface. It is an anchor, not a
 * router: the consumer owns navigation behaviour.
 */
export const SidebarItem = ({
    label,
    icon,
    active = false,
    disabled = false,
    className,
    ...props
}: SidebarItemProps) => {
    const styles = sidebarItem({ active, disabled, });

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
