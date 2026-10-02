import type { ComponentProps, ReactNode, } from "react";
import { Children, createContext, useContext, useId, useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { treeItem, } from "@shared/styled-system/recipes";

/**
 * Nesting depth, fed to `aria-level` and used to indent the nested group.
 * A node without a parent defaults to the first level.
 */
const TreeDepthContext = createContext(0);

export type TreeItemProps = Omit<ComponentProps<"div">, "children" | "onSelect"> & {
    /** Visible row text; the row has no other label. */
    label: string;
    /** Optional leading glyph. */
    icon?: IconName;
    /** Nested `TreeItem` nodes; their presence makes the node expandable. */
    children?: ReactNode;
    /** Controlled expanded state; pass with `onExpandedChange` to own it. */
    expanded?: boolean;
    /** Initial expanded state when uncontrolled. */
    defaultExpanded?: boolean;
    /** Called with the next expanded state on every toggle. */
    onExpandedChange?: (expanded: boolean) => void;
    /** Marks the node as the selected one. */
    selected?: boolean;
    /** Presentational disabled state: muted row and no interaction. */
    disabled?: boolean;
    /** Called when the selectable row is activated. */
    onSelect?: () => void;
};

/**
 * Tree node. It owns its expand/collapse state (uncontrolled by default, or
 * controlled with `expanded` / `onExpandedChange`) and renders its nested items
 * in a labelled group. The expander is a separate hit area from the selectable
 * row, and both expose an accessible name.
 */
export const TreeItem = ({
    label,
    icon,
    children,
    expanded,
    defaultExpanded = false,
    onExpandedChange,
    selected = false,
    disabled = false,
    onSelect,
    className,
    ...props
}: TreeItemProps) => {
    const depth = useContext(TreeDepthContext);
    const hasChildren = Children.count(children) > 0;
    const [ uncontrolledExpanded, setUncontrolledExpanded, ] = useState(defaultExpanded);
    const isControlled = expanded !== undefined;
    const isExpanded = hasChildren && ( isControlled ? expanded : uncontrolledExpanded );
    const styles = treeItem({ expanded: isExpanded, selected, disabled, });
    const groupId = useId();

    const handleToggle = () => {
        if ( disabled || !hasChildren ) {
            return;
        }

        const next = !isExpanded;

        if ( !isControlled ) {
            setUncontrolledExpanded(next);
        }

        onExpandedChange?.(next);
    };

    return (
        <div
            {...props}
            role="treeitem"
            aria-level={depth + 1}
            aria-selected={selected}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-disabled={disabled || undefined}
            className={cx(styles.root, className)}
        >
            <div className={styles.row}>
                {hasChildren
                    ? (
                        <button
                            type="button"
                            className={styles.expander}
                            aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
                            aria-controls={isExpanded ? groupId : undefined}
                            disabled={disabled}
                            onClick={handleToggle}
                        >
                            <Icon className={styles.expanderIcon} name="chevron-right" size="sm" />
                        </button>
                    )
                    : <span className={styles.expanderSpacer} aria-hidden="true" />}
                <button
                    type="button"
                    className={styles.content}
                    disabled={disabled}
                    onClick={onSelect}
                >
                    {icon !== undefined && <Icon className={styles.icon} name={icon} size="sm" />}
                    <span className={styles.label}>{label}</span>
                </button>
            </div>
            {isExpanded && (
                <div role="group" id={groupId} className={styles.group}>
                    <TreeDepthContext.Provider value={depth + 1}>
                        {children}
                    </TreeDepthContext.Provider>
                </div>
            )}
        </div>
    );
};
