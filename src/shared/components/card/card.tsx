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

export type CardProps = Omit<ComponentProps<"article">, "children" | "dangerouslySetInnerHTML"> & {
    title: string;
    description?: string;
    media?: CardMedia;
    header?: CardHeader;
    footer?: CardFooter;
    actionButton?: ButtonProps;
};

/** `media.alt` is deliberately exempt: an empty alt is meaningful. */
const hasText = (value: string | undefined): boolean => value != null && value.trim() !== "";

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
    const {
        children: _children,
        dangerouslySetInnerHTML: _dangerouslySetInnerHTML,
        ...articleProps
    } = props as ComponentProps<"article">;
    const hasHeader = hasText(header?.label) || header?.icon != null;
    const hasPrimaryNote = hasText(footer?.primaryNote);
    const hasSecondaryNote = hasText(footer?.secondaryNote);
    const hasFooter = hasPrimaryNote || hasSecondaryNote || actionButton != null;

    return (
        <article {...articleProps} className={cx(styles.root, className)}>
            {media != null
                ? (
                    <span className={styles.media}>
                        <img src={media.src} alt={media.alt} />
                    </span>
                )
                : (
                    // Must be inline so the trusted local SVG inherits the slot's `currentColor`.
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
                                <Button {...actionButton} size={actionButton.size ?? "sm"} />
                            </span>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};
