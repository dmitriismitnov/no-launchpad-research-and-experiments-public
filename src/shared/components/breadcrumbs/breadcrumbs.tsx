import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { breadcrumbs, } from "@shared/styled-system/recipes";

export type BreadcrumbItem = {
    /** Visible crumb text. */
    label: string;
    /** Link target; the last crumb is never linked and ignores this. */
    href?: string;
};

export type BreadcrumbsProps = Omit<ComponentProps<"nav">, "children"> & {
    /** Trail in order; the final entry is the current page. */
    items: readonly BreadcrumbItem[];
    /** Accessible name for the breadcrumb navigation. */
    label?: string;
    /** Separator glyph; defaults to a right chevron. */
    separatorIcon?: IconName;
};

/**
 * Ordered trail of ancestor links. The component owns the list semantics: a
 * `<nav>` wrapping an `<ol>`, with the last crumb marked `aria-current`.
 */
export const Breadcrumbs = ({
    items,
    label = "Breadcrumb",
    separatorIcon = "chevron-right",
    className,
    ...props
}: BreadcrumbsProps) => {
    const styles = breadcrumbs();

    return (
        <nav {...props} aria-label={label} className={cx(styles.root, className)}>
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1;

                    return (
                        <li key={index} className={styles.item}>
                            {isCurrent
                                ? <span className={styles.current} aria-current="page">{item.label}</span>
                                : <a className={styles.link} href={item.href}>{item.label}</a>}
                            {!isCurrent && (
                                <Icon
                                    className={styles.separator}
                                    name={separatorIcon}
                                    size="sm"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
