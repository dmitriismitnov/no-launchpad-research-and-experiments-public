import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { list, } from "@shared/styled-system/recipes";

export type ListItem = {
    /** Primary row label; always rendered. */
    title: string;
    /** Secondary row copy; omitted when empty. */
    meta?: string;
    /** Trailing value; omitted when empty. */
    trailing?: string;
    /** Optional leading glyph. */
    icon?: IconName;
};

export type ListProps = Omit<ComponentProps<"ul">, "children"> & {
    /** Rows to render, in order. */
    items: readonly ListItem[];
};

/**
 * Vertical collection of rows. The list is declarative: rows are plain data and
 * every optional part disappears when its value is empty.
 */
export const List = ({ items, className, ...props }: ListProps) => {
    const styles = list();

    return (
        <ul {...props} className={cx(styles.root, className)}>
            {items.map((item, index) => (
                <li key={index} className={styles.item}>
                    {item.icon !== undefined && <Icon className={styles.itemIcon} name={item.icon} size="sm" />}
                    <span className={styles.itemText}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        {hasText(item.meta) && <span className={styles.itemMeta}>{item.meta}</span>}
                    </span>
                    {hasText(item.trailing) && <span className={styles.itemTrailing}>{item.trailing}</span>}
                </li>
            ))}
        </ul>
    );
};

/** An empty optional is meaningful: it removes that part entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
