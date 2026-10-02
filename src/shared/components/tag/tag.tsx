import type { ComponentProps, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { tag, } from "@shared/styled-system/recipes";

export type TagProps = Omit<ComponentProps<"span">, "children"> & {
    /** Visible chip text. */
    label: string;
    /** Renders the dismiss affordance when provided. */
    onClose?: () => void;
    /** Accessible name for the dismiss button. */
    closeLabel?: string;
};

/** Bordered chip with a label and an optional dismiss action. */
export const Tag = ({ label, onClose, closeLabel, className, ...props }: TagProps) => {
    const styles = tag();

    return (
        <span {...props} className={cx(styles.root, className)}>
            <span className={styles.label}>{label}</span>
            {onClose !== undefined && (
                <button
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label={closeLabel ?? `Remove ${label}`}
                >
                    <Icon name="x" size="sm" />
                </button>
            )}
        </span>
    );
};
