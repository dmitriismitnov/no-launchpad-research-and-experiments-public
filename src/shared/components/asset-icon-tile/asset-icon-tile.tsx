import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { assetIconTile, } from "@shared/styled-system/recipes";

export type AssetIconTileProps = Omit<ComponentProps<"span">, "children"> & {
    /** Icon key to frame. */
    name: IconName;
    /** Accessible name. Omit for a purely decorative tile. */
    label?: string;
};

/**
 * Square, centred frame for one icon glyph. The icon inventory composes these
 * tiles; the glyph itself stays the shared `Icon`, so the tile paints the
 * surface and the glyph inherits its colour from it.
 */
export const AssetIconTile = ({ name, label, className, ...props }: AssetIconTileProps) => {
    const styles = assetIconTile();

    return (
        <span {...props} className={cx(styles, className)}>
            <Icon name={name} size="md" label={label} />
        </span>
    );
};
