import type { ComponentProps, ReactNode, } from "react";
import { useState, } from "react";

import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { carousel, } from "@shared/styled-system/recipes";

export type CarouselSlide = {
    /** Accessible name for the slide and its dot control. */
    label: string;
    /** Optional glyph shown when the slide has no custom content. */
    icon?: IconName;
    /** Custom slide content; replaces the placeholder glyph. */
    content?: ReactNode;
};

export type CarouselProps = Omit<ComponentProps<"section">, "children"> & {
    /** Slides to move through, in order. */
    slides: readonly CarouselSlide[];
    /** Controlled current index; pass with `onCurrentChange` to own it. */
    current?: number;
    /** Initial index when uncontrolled. */
    defaultCurrent?: number;
    /** Called with the next index when a control or dot is activated. */
    onCurrentChange?: (index: number) => void;
    /** Presentational disabled state: muted controls and no movement. */
    disabled?: boolean;
    /** Accessible name for the carousel region. */
    label?: string;
};

/**
 * Static carousel. It shows one slide at a time with previous/next controls and
 * dot indicators, and never autoplays. The current index is uncontrolled by
 * default, or controlled with `current` / `onCurrentChange`; the controls are
 * disabled at the bounds.
 */
export const Carousel = ({
    slides,
    current,
    defaultCurrent = 0,
    onCurrentChange,
    disabled = false,
    label = "Carousel",
    className,
    ...props
}: CarouselProps) => {
    const [ uncontrolledCurrent, setUncontrolledCurrent, ] = useState(defaultCurrent);
    const isControlled = current !== undefined;
    const lastIndex = slides.length - 1;
    const active = clamp(isControlled ? current : uncontrolledCurrent, 0, lastIndex);
    const styles = carousel({ disabled, });
    const currentStyles = carousel({ disabled, current: true, });
    const activeSlide = slides[active];

    const goTo = (next: number) => {
        if ( disabled || slides.length === 0 ) {
            return;
        }

        const clamped = clamp(next, 0, lastIndex);

        if ( clamped === active ) {
            return;
        }

        if ( !isControlled ) {
            setUncontrolledCurrent(clamped);
        }

        onCurrentChange?.(clamped);
    };

    return (
        <section
            {...props}
            aria-roledescription="carousel"
            aria-label={label}
            className={cx(styles.root, className)}
        >
            <div className={styles.viewport}>
                <button
                    type="button"
                    className={styles.control}
                    aria-label="Previous slide"
                    disabled={disabled || active <= 0}
                    onClick={() => goTo(active - 1)}
                >
                    <Icon name="chevron-left" size="sm" />
                </button>
                {activeSlide !== undefined && (
                    <div
                        className={styles.slide}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${active + 1} of ${slides.length}: ${activeSlide.label}`}
                    >
                        {activeSlide.content
                            ?? <Icon className={styles.slideGlyph} name={activeSlide.icon ?? "image"} size="lg" />}
                    </div>
                )}
                <button
                    type="button"
                    className={styles.control}
                    aria-label="Next slide"
                    disabled={disabled || active >= lastIndex}
                    onClick={() => goTo(active + 1)}
                >
                    <Icon name="chevron-right" size="sm" />
                </button>
            </div>
            {slides.length > 0 && (
                <div className={styles.dots}>
                    {slides.map((slide, index) => (
                        <button
                            key={`${slide.label}-${index}`}
                            type="button"
                            className={cx(styles.dot, index === active && currentStyles.dot)}
                            aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                            aria-current={index === active ? "true" : undefined}
                            disabled={disabled}
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

function clamp(value: number, min: number, max: number): number {
    if ( max < min ) {
        return min;
    }

    return Math.min(Math.max(value, min), max);
}
