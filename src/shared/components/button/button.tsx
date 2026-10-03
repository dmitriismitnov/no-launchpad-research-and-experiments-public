import type { ComponentProps, } from "react";

import { Icon, type IconName, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { button, } from "@shared/styled-system/recipes";

export type ButtonTone = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md";
/** Pen `IcuBw` width axis: intrinsic `hug` or fill-container `full`. */
export type ButtonWidth = "hug" | "full";

export type ButtonProps = ComponentProps<"button"> & {
    tone?: ButtonTone;
    size?: ButtonSize;
    /**
     * Pen width axis. `hug` (default) is intrinsic; `full` fills the parent
     * container, matching the Pen `MboG8` / `GW4Jy` full-width references.
     */
    width?: ButtonWidth;
    /**
     * Pen loading state. Disables the control from interaction and shows a
     * decorative spinner while keeping the label/icon layout width and the
     * accessible name.
     */
    loading?: boolean;
    /** Icon rendered before the label; the button owns its size and colour. */
    prefixIcon?: IconName;
    /** Icon rendered after the label; the button owns its size and colour. */
    suffixIcon?: IconName;
};

/**
 * Public button. Takes icon names rather than nodes: it creates the `Icon` and
 * pairs its size from the button size, so a consumer never picks the icon size
 * or colour, and the icon stays decorative.
 */
export const Button = ({
    tone = "primary",
    size = "md",
    width = "hug",
    loading = false,
    disabled,
    prefixIcon,
    suffixIcon,
    children,
    className,
    ...props
}: ButtonProps) => {
    const styles = button({ tone, size, width, loading, });
    const iconSize = ICON_SIZE_BY_BUTTON_SIZE[size];

    return (
        <button
            {...props}
            disabled={disabled === true || loading}
            data-loading={loading ? "true" : undefined}
            className={cx(styles.root, className)}
        >
            {prefixIcon != null && (
                <span className={styles.prefixIcon}>
                    <Icon name={prefixIcon} size={iconSize} />
                </span>
            )}
            {children != null && <span className={styles.label}>{children}</span>}
            {suffixIcon != null && (
                <span className={styles.suffixIcon}>
                    <Icon name={suffixIcon} size={iconSize} />
                </span>
            )}
            {loading && (
                // Pen `IcuBw` anatomy (`utSXT`) `spinner` part. Decorative: the
                // label keeps the accessible name and the layout width.
                <span className={styles.spinner}>
                    <Icon name="loader" size={iconSize} />
                </span>
            )}
        </button>
    );
};

/**
 * Button-owned pairing between a button size and the icon size it renders.
 * Not exported.
 *
 * Icon and Button size names are independent; the pairing is set by the button
 * slot geometry, not by matching `sm` to `sm`. Both slots are currently `x8`,
 * so both button sizes pair with Icon `sm`.
 */
const ICON_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, IconSize> = {
    sm: "sm",
    md: "sm",
};
