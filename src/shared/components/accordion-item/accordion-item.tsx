import type { ComponentProps, ReactNode, } from "react";
import { useId, useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { accordionItem, } from "@shared/styled-system/recipes";

export type AccordionItemProps = Omit<ComponentProps<"div">, "children" | "title"> & {
    /** Visible trigger heading; always rendered. */
    title: string;
    /** Collapsible body; unmounted while the item is closed. */
    children?: ReactNode;
    /** Controlled open state; pass with `onOpenChange` to own the state. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state on every toggle. */
    onOpenChange?: (open: boolean) => void;
    /** Presentational disabled state: muted trigger and no interaction. */
    disabled?: boolean;
};

/**
 * Disclosure row. It is uncontrolled by default, or controlled with `open` and
 * `onOpenChange`. The trigger exposes `aria-expanded` and controls the panel;
 * the panel is a labelled `region`.
 */
export const AccordionItem = ({
    title,
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    className,
    ...props
}: AccordionItemProps) => {
    const [ uncontrolledOpen, setUncontrolledOpen, ] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const styles = accordionItem({ open: isOpen, disabled, });
    const generatedId = useId();
    const triggerId = `${generatedId}-trigger`;
    const panelId = `${generatedId}-panel`;

    const handleToggle = () => {
        if ( disabled ) {
            return;
        }

        const next = !isOpen;

        if ( !isControlled ) {
            setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
    };

    return (
        <div {...props} className={cx(styles.root, className)}>
            <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={disabled}
                onClick={handleToggle}
            >
                <span className={styles.title}>{title}</span>
                <Icon className={styles.chevron} name="chevron-down" size="sm" />
            </button>
            {isOpen && (
                <div className={styles.panel} id={panelId} role="region" aria-labelledby={triggerId}>
                    {children}
                </div>
            )}
        </div>
    );
};
