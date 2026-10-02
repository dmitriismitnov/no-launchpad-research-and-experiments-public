import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { menu, } from "@shared/styled-system/recipes";

export type MenuProps = Omit<ComponentProps<"div">, "children"> & {
    /** Optional non-interactive group label rendered above the rows. */
    label?: string;
    /** The menu rows and dividers. */
    children?: ComponentProps<"div">["children"];
};

/**
 * Menu surface. It is a presentational `menu` container: the consumer places the
 * `MenuItem`s and `MenuDivider`s, so no open, positioning or keyboard behaviour
 * is owned here.
 */
export const Menu = ({ label, children, className, ...props }: MenuProps) => {
    const styles = menu();

    return (
        <div {...props} role="menu" className={cx(styles.root, className)}>
            {label !== undefined && <div className={styles.label}>{label}</div>}
            {children}
        </div>
    );
};

export type MenuItemTone = "neutral" | "danger";

export type MenuItemProps = Omit<ComponentProps<"button">, "children"> & {
    /** Visible row text; the row has no other label. */
    label: string;
    /** Optional leading glyph. */
    icon?: IconName;
    /** Trailing keyboard shortcut, typically a key chord. */
    shortcut?: string;
    /** Marks the row as selected and reveals the trailing check. */
    checked?: boolean;
    /** Reveals the trailing submenu chevron. */
    submenu?: boolean;
    /** `danger` paints a destructive row; it is never the default. */
    tone?: MenuItemTone;
    /** Presentational disabled state: muted row and no pointer events. */
    disabled?: boolean;
};

/**
 * Menu row. It is a `menuitem`; a leading glyph and the trailing shortcut, check
 * and submenu affordances are independent, so a consumer composes only the ones
 * it needs.
 */
export const MenuItem = ({
    label,
    icon,
    shortcut,
    checked = false,
    submenu = false,
    tone = "neutral",
    disabled = false,
    className,
    ...props
}: MenuItemProps) => {
    const styles = menu({ tone, checked, disabled, });

    return (
        <button
            {...props}
            type="button"
            role="menuitem"
            disabled={disabled}
            className={cx(styles.item, className)}
        >
            {icon !== undefined && <Icon className={styles.icon} name={icon} size="sm" />}
            <span className={styles.itemLabel}>{label}</span>
            {shortcut !== undefined && <span className={styles.shortcut}>{shortcut}</span>}
            {checked && <Icon className={styles.check} name="check" size="sm" />}
            {submenu && <Icon className={styles.submenu} name="chevron-right" size="sm" />}
        </button>
    );
};

export type MenuDividerProps = Omit<ComponentProps<"div">, "children">;

/** Quiet rule between menu groups. */
export const MenuDivider = ({ className, ...props }: MenuDividerProps) => {
    const styles = menu();

    return <div {...props} role="separator" className={cx(styles.divider, className)} />;
};
