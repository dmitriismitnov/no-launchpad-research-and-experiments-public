import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { mediaPlaceholder, } from "@shared/styled-system/recipes";

export type MediaPlaceholderProps = Omit<ComponentProps<"div">, "children"> & {
    /** Centred glyph; defaults to the `image` icon. */
    icon?: IconName;
    /** Caption under the glyph; omitted when empty. */
    label?: string;
};

/**
 * Muted 16:9 surface standing in for missing media. The glyph reuses the Icon
 * component, so its colour inherits the placeholder's muted text role.
 */
export const MediaPlaceholder = ({
    icon = "image",
    label,
    className,
    ...props
}: MediaPlaceholderProps) => {
    const styles = mediaPlaceholder();

    return (
        <div {...props} className={cx(styles.root, className)}>
            <Icon className={styles.icon} name={icon} size="lg" />
            {hasText(label) && <span className={styles.label}>{label}</span>}
        </div>
    );
};

/** An empty label is meaningful: it removes the caption entirely. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
