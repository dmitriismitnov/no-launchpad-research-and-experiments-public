import type { ComponentProps, } from "react";

import { Icon, type IconName, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { button, } from "@shared/styled-system/recipes";

export type ButtonTone = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md";

export type ButtonProps = ComponentProps<"button"> & {
    tone?: ButtonTone;
    size?: ButtonSize;
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
    prefixIcon,
    suffixIcon,
    children,
    className,
    ...props
}: ButtonProps) => {
    const styles = button({ tone, size, });
    const iconSize = ICON_SIZE_BY_BUTTON_SIZE[size];

    return (
        <button {...props} className={cx(styles.root, className)}>
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
