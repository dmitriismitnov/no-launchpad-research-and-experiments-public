import type { ComponentProps, } from "react";

import { Icon, type IconName, type IconSize, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { buttonIcon, } from "@shared/styled-system/recipes";

export type ButtonIconTone = "primary" | "secondary" | "ghost" | "destructive";
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
    /**
     * Pen loading state (`R3LwyT`). Disables the control from interaction and
     * swaps the glyph for a decorative loader in the same square slot.
     */
    loading?: boolean;
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
    loading = false,
    disabled,
    className,
    ...props
}: ButtonIconProps) => {
    const styles = buttonIcon({ tone, size, loading, });
    const iconSize = ICON_SIZE_BY_BUTTON_ICON_SIZE[size];

    return (
        <button
            {...props}
            disabled={disabled === true || loading}
            data-loading={loading ? "true" : undefined}
            aria-label={label}
            className={cx(styles.root, className)}
        >
            <span className={styles.icon}>
                <Icon name={loading ? "loader" : icon} size={iconSize} />
            </span>
        </button>
    );
};

/**
 * ButtonIcon-owned pairing between a button size and the structural Icon size
 * it renders. Not exported.
 *
 * Icon and ButtonIcon size names are independent; the pairing is set by the
 * button slot geometry, not by matching `sm` to `sm`. Both button sizes pass
 * Icon `sm` as the structural input: the `sm` square keeps that `x8` (16px)
 * glyph, while the `md` recipe overrides the paired slot to `x9` (18px), so the
 * effective glyph grows without changing the Icon input.
 */
const ICON_SIZE_BY_BUTTON_ICON_SIZE: Record<ButtonIconSize, IconSize> = {
    sm: "sm",
    md: "sm",
};
