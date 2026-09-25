import type { ComponentProps, } from "react";

import { Icon, type IconName, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { buttonIcon, } from "@shared/styled-system/recipes";

export type ButtonIconTone = "primary" | "secondary" | "ghost";
export type ButtonIconSize = "sm" | "md";

export type ButtonIconProps = Omit<ComponentProps<"button">, "children"> & {
    /** Icon key rendered as the whole content of the button. */
    icon: IconName;
    /**
     * Accessible name. An icon-only button has no visible text, so the name is
     * required and owned by the button; the glyph stays decorative.
     */
    label: string;
    tone?: ButtonIconTone;
    size?: ButtonIconSize;
};

/**
 * Public icon-only button. Takes an icon name rather than a node: it creates
 * the `Icon` and pairs its size from the button size, so a consumer never picks
 * the icon size or colour. The glyph is decorative; `label` carries the
 * accessible name.
 */
export const ButtonIcon = ({
    icon,
    label,
    tone = "primary",
    size = "md",
    className,
    ...props
}: ButtonIconProps) => {
    const styles = buttonIcon({ tone, size, });
    const iconSize = ICON_SIZE_BY_BUTTON_ICON_SIZE[size];

    return (
        <button {...props} aria-label={label} className={cx(styles.root, className)}>
            <span className={styles.icon}>
                <Icon name={icon} size={iconSize} />
            </span>
        </button>
    );
};

/**
 * ButtonIcon-owned pairing between a button size and the icon size it renders.
 * Not exported.
 *
 * Icon and ButtonIcon size names are independent; the pairing is set by the
 * button slot geometry, not by matching `sm` to `sm`. Both slots are currently
 * `x8`, so both sizes pair with Icon `sm`.
 */
const ICON_SIZE_BY_BUTTON_ICON_SIZE: Record<ButtonIconSize, IconSize> = {
    sm: "sm",
    md: "sm",
};
