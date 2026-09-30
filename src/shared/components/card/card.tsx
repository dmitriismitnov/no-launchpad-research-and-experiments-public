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

    return (
        <article {...articleProps} className={cx(styles.root, className)}>
            <Media media={media} styles={styles} />
            <Body
                title={title}
                description={description}
                header={header}
                footer={footer}
                actionButton={actionButton}
                styles={styles}
            />
        </article>
    );
};

type CardStyles = ReturnType<typeof card>;

type MediaProps = Pick<CardProps, "media"> & {
    styles: CardStyles;
};

type BodyProps = Pick<CardProps, "title" | "description" | "header" | "footer" | "actionButton"> & {
    styles: CardStyles;
};

type BodyHeaderProps = Pick<CardProps, "header"> & {
    styles: CardStyles;
};

type BodyFooterProps = Pick<CardProps, "footer" | "actionButton"> & {
    styles: CardStyles;
};

function Media({ media, styles, }: MediaProps) {
    if ( media != null ) {
        return (
            <span className={styles.media}>
                <img src={media.src} alt={media.alt} />
            </span>
        );
    }

    // Must be inline so the trusted local SVG inherits the slot's `currentColor`.
    return (
        <span
            className={styles.media}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: cardMediaSkeleton, }}
        />
    );
}

function Body({ title, description, header, footer, actionButton, styles, }: BodyProps) {
    return (
        <div className={styles.body}>
            <BodyHeader header={header} styles={styles} />
            <h3 className={styles.title}>{title}</h3>
            {hasText(description) && <p className={styles.description}>{description}</p>}
            <BodyFooter footer={footer} actionButton={actionButton} styles={styles} />
        </div>
    );
}

function BodyHeader({ header, styles, }: BodyHeaderProps) {
    const label = header?.label;

    if ( !hasText(label) && header?.icon == null ) {
        return null;
    }

    return (
        <div className={styles.header}>
            {hasText(label) && <span>{label}</span>}
            {header?.icon != null && <Icon name={header.icon} size="sm" />}
        </div>
    );
}

function BodyFooter({ footer, actionButton, styles, }: BodyFooterProps) {
    const primaryNote = footer?.primaryNote;
    const secondaryNote = footer?.secondaryNote;
    const hasPrimaryNote = hasText(primaryNote);
    const hasSecondaryNote = hasText(secondaryNote);

    if ( !hasPrimaryNote && !hasSecondaryNote && actionButton == null ) {
        return null;
    }

    return (
        <div className={styles.footer}>
            {hasPrimaryNote && <span className={styles.footerPrimary}>{primaryNote}</span>}
            {hasSecondaryNote && <span className={styles.footerSecondary}>{secondaryNote}</span>}
            {actionButton != null && (
                <span className={styles.actionButton}>
                    <Button {...actionButton} size={actionButton.size ?? "sm"} />
                </span>
            )}
        </div>
    );
}

/** `media.alt` is deliberately exempt: an empty alt is meaningful. */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
