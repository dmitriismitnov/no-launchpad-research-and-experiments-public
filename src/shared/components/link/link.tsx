import type { ComponentProps, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { link, } from "@shared/styled-system/recipes";

export type LinkTone = "link" | "subtle" | "primary";
export type LinkUnderline = "hover" | "always" | "none";

export type LinkProps = ComponentProps<"a"> & {
    /** Foreground role; `link` is the brand link colour. */
    tone?: LinkTone;
    /** When the underline appears; defaults to on hover. */
    underline?: LinkUnderline;
    /** Optional leading glyph, passed through to `Icon`. */
    leadingIcon?: IconName;
    /** Optional trailing glyph, passed through to `Icon`. */
    trailingIcon?: IconName;
    /** Shorthand for a trailing `external-link` glyph. */
    external?: boolean;
    /** Presentational disabled state: muted colour and no pointer events. */
    disabled?: boolean;
};

/** Screen-reader-only announcement appended to an external link. */
const externalAnnouncement = "External link";

/**
 * Inline anchor. The label is the anchor's only text; an optional glyph may sit
 * before or after it. `external` is sugar for the trailing link glyph and adds
 * a visually-hidden announcement that the link leaves the site (`DTTTs`); the
 * glyph itself stays decorative.
 */
export const Link = ({
    tone = "link",
    underline = "hover",
    leadingIcon,
    trailingIcon,
    external = false,
    disabled = false,
    className,
    children,
    ...props
}: LinkProps) => {
    const styles = link({ tone, underline, disabled, });
    const resolvedTrailing = trailingIcon ?? ( external ? "external-link" : undefined );

    return (
        <a
            {...props}
            className={cx(styles.root, className)}
            {...( disabled
                ? { "aria-disabled": true, tabIndex: -1, }
                : {} )}
        >
            {leadingIcon !== undefined && <Icon className={styles.leadingIcon} name={leadingIcon} size="sm" />}
            <span className={styles.label}>{children}</span>
            {resolvedTrailing !== undefined && (
                <Icon className={styles.trailingIcon} name={resolvedTrailing} size="sm" />
            )}
            {external && <span className={styles.visuallyHidden}>{externalAnnouncement}</span>}
        </a>
    );
};
