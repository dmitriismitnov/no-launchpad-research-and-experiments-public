import type { HTMLAttributes, } from "react";

import { cx, } from "@shared/styled-system/css";
import { icon, } from "@shared/styled-system/recipes";

import "./icon.css";
import { ICON_CODEPOINTS, type IconName, } from "./manifest.generated";

export type IconSize = "sm" | "md" | "lg" | "xl";

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    /** Icon key: the name of a source SVG file. */
    name: IconName;
    size?: IconSize;
    /** Accessible name. When omitted the icon is decorative. */
    label?: string;
};

/**
 * Asset component: renders one glyph of the generated icon font.
 *
 * Decorative by default. Passing `label` makes it meaningful and gives it an
 * accessible name; the colour is inherited through `currentColor`.
 */
export const Icon = ({ name, size = "md", label, className, ...props }: IconProps) => {
    const styles = icon({ size, });
    const isDecorative = label === undefined;

    return (
        <span
            {...props}
            className={cx(styles, className)}
            {...( isDecorative
                ? { "aria-hidden": true, }
                : { role: "img", "aria-label": label, } )}
        >
            {String.fromCodePoint(ICON_CODEPOINTS[name])}
        </span>
    );
};
