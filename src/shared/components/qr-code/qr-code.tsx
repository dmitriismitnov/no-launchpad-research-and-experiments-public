import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { qrCode, } from "@shared/styled-system/recipes";

/**
 * Deterministic placeholder pattern lifted from the Pen master (7x7 modules).
 * It is decorative: the component does not encode the label or any data, so the
 * shape is not a scannable QR code.
 */
const QR_PATTERN = [
    "1110111",
    "1111111",
    "1111111",
    "0110110",
    "1111101",
    "1111011",
    "1110110",
] as const;

export type QrCodeProps = Omit<ComponentProps<"div">, "children"> & {
    /** Accessible name; defaults to `QR code placeholder`. */
    label?: string;
};

/**
 * QR code placeholder. Rendering is a deterministic CSS grid with no encoding
 * dependency: the Pen master is a fixed decorative pattern, not data-bearing, so
 * a real encoder would add weight with no benefit. Use a dedicated QR library
 * when a scannable code is needed.
 */
export const QrCode = ({ label = "QR code placeholder", className, ...props }: QrCodeProps) => {
    const styles = qrCode();

    return (
        <div {...props} role="img" aria-label={label} className={cx(styles.root, className)}>
            <div className={styles.grid} aria-hidden="true">
                {QR_PATTERN.flatMap((row, rowIndex) =>
                    [ ...row, ].map((cell, cellIndex) => (
                        <span
                            key={`${rowIndex}-${cellIndex}`}
                            className={cx(styles.cell, cell === "1" && styles.cellFilled)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
