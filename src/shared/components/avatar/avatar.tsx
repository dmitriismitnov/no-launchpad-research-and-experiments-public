import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { avatar, } from "@shared/styled-system/recipes";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarPresence = "online" | "away" | "busy" | "offline";

export type AvatarProps = Omit<ComponentProps<"span">, "children"> & {
    /** Image source. When absent the initials fallback is shown. */
    src?: string;
    /** Image alternative text; falls back to `name`. */
    alt?: string;
    /** Full name used to derive the initials fallback and its accessible name. */
    name?: string;
    /** Explicit initials; wins over `name`. */
    initials?: string;
    size?: AvatarSize;
    /** Optional presence dot painted from the Badge tone roles. */
    presence?: AvatarPresence;
};

const initialsFromName = (name: string | undefined): string => {
    if ( name === undefined ) {
        return "";
    }

    return name
        .trim()
        .split(/\s+/)
        .filter((part) => part.length > 0)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();
};

/**
 * Round surface for a person or entity. Shows the supplied image, or an
 * initials fallback derived from `name`, plus an optional presence dot. The
 * initials are decorative: the accessible name comes from `alt` / `name`.
 */
export const Avatar = ({
    src,
    alt,
    name,
    initials,
    size = "md",
    presence,
    className,
    ...props
}: AvatarProps) => {
    const styles = avatar({ size, presence, });
    const label = alt ?? name ?? "";
    const withImage = src !== undefined;

    return (
        <span
            {...props}
            className={cx(styles.root, className)}
            {...( !withImage && label !== ""
                ? { role: "img", "aria-label": label, }
                : {} )}
        >
            {withImage
                ? <img className={styles.image} src={src} alt={label} />
                : (
                    <span className={styles.fallback} aria-hidden="true">
                        <span className={styles.initials}>{initials ?? initialsFromName(name)}</span>
                    </span>
                )}
            {presence !== undefined && <span className={styles.presence} aria-hidden="true" />}
        </span>
    );
};
