import type { ComponentProps, } from "react";

import { Button, type ButtonProps, } from "@shared/components/button";
import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { card, } from "@shared/styled-system/recipes";

import cardMediaSkeleton from "./assets/card-media.skeleton.svg?raw";

export type CardMedia = {
    src: string;
    alt: string;
};

export type CardHeader = {
    label?: string;
    icon?: IconName;
};

export type CardFooter = {
    primaryNote?: string;
    secondaryNote?: string;
};

export type CardProps = Omit<ComponentProps<"article">, "children"> & {
    /** Card title. Rendered as an `h3`; the caller owns the document outline. */
    title: string;
    description?: string;
    media?: CardMedia;
    header?: CardHeader;
    footer?: CardFooter;
    /** Footer action. Card creates the `Button` and defaults it to `sm`. */
    actionButton?: ButtonProps;
};

/**
 * Optional text is present only when it carries non-blank content. A blank
 * string would otherwise create an empty region with visible padding and, in
 * the footer, a divider with nothing under it.
 *
 * Deliberately not applied to `media.alt`: an empty alt is meaningful.
 */
const hasText = (value: string | undefined): boolean => value != null && value.trim() !== "";

/**
 * Public static card.
 *
 * A single non-interactive `<article>` that owns its whole structure: there is
 * no `children` position and no card-level click or hover behaviour. Layout is a
 * media slot plus a body of optional regions; each region renders only when its
 * data is present.
 *
 * `media` is all-or-nothing. Supplied media renders as an `<img>` with the
 * caller's `alt`. Without `media` the card shows its bundled monochrome
 * skeleton, inlined so the asset's `currentColor` inherits the media slot's
 * colour in both themes; the slot is marked decorative.
 *
 * `actionButton` reuses `ButtonProps` rather than a reduced Card-specific copy:
 * Card supplies `size="sm"` before spreading, so an explicit size wins.
 */
export const Card = ({
    title,
    description,
    media,
    header,
    footer,
    actionButton,
    className,
    ...props
}: CardProps) => {
    const styles = card();
    const hasHeader = hasText(header?.label) || header?.icon != null;
    const hasPrimaryNote = hasText(footer?.primaryNote);
    const hasSecondaryNote = hasText(footer?.secondaryNote);
    const hasFooter = hasPrimaryNote || hasSecondaryNote || actionButton != null;

    return (
        <article {...props} className={cx(styles.root, className)}>
            {media != null
                ? (
                    <span className={styles.media}>
                        <img src={media.src} alt={media.alt} />
                    </span>
                )
                : (
                    // Trusted, local, id-free monochrome asset. Inlining it is
                    // what lets `currentColor` inherit the media slot colour,
                    // which an `<img>` boundary would block.
                    <span
                        className={styles.media}
                        aria-hidden="true"
                        dangerouslySetInnerHTML={{ __html: cardMediaSkeleton, }}
                    />
                )}

            <div className={styles.body}>
                {hasHeader && (
                    <div className={styles.header}>
                        {hasText(header?.label) && <span>{header?.label}</span>}
                        {header?.icon != null && <Icon name={header.icon} size="sm" />}
                    </div>
                )}

                <h3 className={styles.title}>{title}</h3>

                {hasText(description) && <p className={styles.description}>{description}</p>}

                {hasFooter && (
                    <div className={styles.footer}>
                        {hasPrimaryNote && <span className={styles.footerPrimary}>{footer?.primaryNote}</span>}
                        {hasSecondaryNote && <span className={styles.footerSecondary}>{footer?.secondaryNote}</span>}
                        {actionButton != null && (
                            <span className={styles.actionButton}>
                                <Button size="sm" {...actionButton} />
                            </span>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};
