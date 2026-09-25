import type { ButtonHTMLAttributes, ReactNode, } from "react";

import { Icon, type IconName, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { button, } from "@shared/styled-system/recipes";

export type ButtonTone = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md";

/**
 * Button-owned pairing between a button size and the icon size it renders.
 *
 * Icon and Button size names are independent; the pairing is set by the button
 * slot geometry, not by matching `sm` to `sm`. Both slots are currently `x8`,
 * so both button sizes pair with Icon `sm`.
 */
const ICON_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, IconSize> = {
    sm: "sm",
    md: "sm",
};

/**
 * Internal, node-based button.
 *
 * Owns the DOM, the slots and the recipe, and accepts arbitrary nodes in the
 * icon slots. Not exported: the public `Button` is the only supported entry
 * point, so the node API stays a private implementation detail.
 */
const _Button = ({
    tone = "primary",
    size = "md",
    prefixIcon,
    suffixIcon,
    children,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: ButtonTone;
    size?: ButtonSize;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
}) => {
    const styles = button({ tone, size, });

    return (
        <button {...props} className={cx(styles.root, className)}>
            {prefixIcon != null && <span className={styles.prefixIcon}>{prefixIcon}</span>}
            {children != null && <span className={styles.label}>{children}</span>}
            {suffixIcon != null && <span className={styles.suffixIcon}>{suffixIcon}</span>}
        </button>
    );
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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
export const Button = ({ prefixIcon, suffixIcon, size = "md", ...props }: ButtonProps) => {
    const iconSize = ICON_SIZE_BY_BUTTON_SIZE[size];

    return (
        <_Button
            {...props}
            size={size}
            prefixIcon={prefixIcon === undefined
                ? undefined
                : <Icon name={prefixIcon} size={iconSize} />}
            suffixIcon={suffixIcon === undefined
                ? undefined
                : <Icon name={suffixIcon} size={iconSize} />}
        />
    );
};
