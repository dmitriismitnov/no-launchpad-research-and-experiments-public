import type { ComponentProps, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { clipboard, } from "@shared/styled-system/recipes";

export type ClipboardProps = Omit<ComponentProps<"div">, "children"> & {
    /** Readonly value shown in the field. */
    value: string;
    /** Renders the copy affordance when provided. */
    onCopy?: () => void;
    /** Accessible name for the copy button. */
    copyLabel?: string;
};

/**
 * Single-line readonly field with an optional copy control. Copy is a consumer
 * callback; the component does not read or write the system clipboard.
 */
export const Clipboard = ({ value, onCopy, copyLabel, className, ...props }: ClipboardProps) => {
    const styles = clipboard();

    return (
        <div {...props} className={cx(styles.root, className)}>
            <span className={styles.value}>{value}</span>
            {onCopy !== undefined && (
                <button
                    type="button"
                    className={styles.copy}
                    onClick={onCopy}
                    aria-label={copyLabel ?? "Copy"}
                >
                    <Icon name="copy" size="sm" />
                </button>
            )}
        </div>
    );
};
