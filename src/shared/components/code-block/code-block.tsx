import type { ComponentProps, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { codeBlock, } from "@shared/styled-system/recipes";

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
    /** Source text; split into numbered rows on new lines. */
    code: string;
    /** Optional window title; omitted when empty. */
    filename?: string;
    /** Renders the copy affordance when provided. */
    onCopy?: () => void;
    /** Accessible name for the copy button. */
    copyLabel?: string;
};

/**
 * Dark code surface with a window header and numbered source rows. Copy is a
 * consumer callback: the component never touches the clipboard itself.
 */
export const CodeBlock = ({
    code,
    filename,
    onCopy,
    copyLabel,
    className,
    ...props
}: CodeBlockProps) => {
    const styles = codeBlock();
    const lines = code.replace(/\r\n/g, "\n").split("\n");

    return (
        <div {...props} className={cx(styles.root, className)}>
            <div className={styles.head}>
                <span className={styles.dotNegative} aria-hidden="true" />
                <span className={styles.dotNeutral} aria-hidden="true" />
                <span className={styles.dotPositive} aria-hidden="true" />
                <span className={styles.file}>{hasText(filename) ? filename : null}</span>
                {onCopy !== undefined && (
                    <button
                        type="button"
                        className={styles.copy}
                        onClick={onCopy}
                        aria-label={copyLabel ?? "Copy code"}
                    >
                        <Icon name="copy" size="sm" />
                    </button>
                )}
            </div>
            <pre className={styles.code}>
                {lines.map((line, index) => (
                    <span key={index} className={styles.line}>
                        <span className={styles.lineNumber} aria-hidden="true">{index + 1}</span>
                        <code className={styles.lineCode}>{line}</code>
                    </span>
                ))}
            </pre>
        </div>
    );
};

/** An empty filename is meaningful: it leaves the window title blank. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
