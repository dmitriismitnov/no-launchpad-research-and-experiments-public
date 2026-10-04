import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { tab, } from "@shared/styled-system/recipes";

export type TabListProps = Omit<ComponentProps<"div">, "children"> & {
    /** The tab triggers. The list only owns their row and shared boundary. */
    children: ComponentProps<"div">["children"];
};

/**
 * Tab row. It is the `tablist` landmark and the shared bottom boundary; the
 * `Tab` triggers own their own fill and indicator.
 */
export const TabList = ({ children, className, ...props }: TabListProps) => {
    const styles = tab();

    return (
        <div {...props} role="tablist" className={cx(styles.list, className)}>
            {children}
        </div>
    );
};

export type TabProps = Omit<ComponentProps<"button">, "children"> & {
    /** Visible tab text; the trigger has no other label. */
    label: string;
    /** Optional leading glyph. */
    icon?: IconName;
    /** Marks the trigger as the selected tab and reveals the indicator. */
    active?: boolean;
    /** Presentational disabled state: muted colour and no pointer events. */
    disabled?: boolean;
};

/**
 * Single controlled tab trigger. It is a `tab` and exposes its selection with
 * `aria-selected`; the consumer pairs it with a `TabList` and its panel.
 */
export const Tab = ({
    label,
    icon,
    active = false,
    disabled = false,
    className,
    ...props
}: TabProps) => {
    const styles = tab({ active, disabled, });

    return (
        <button
            {...props}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled}
            className={cx(styles.root, className)}
        >
            {icon !== undefined && <Icon className={styles.icon} name={icon} size="sm" />}
            <span className={styles.label}>{label}</span>
            {active && <span className={styles.indicator} aria-hidden="true" />}
        </button>
    );
};
