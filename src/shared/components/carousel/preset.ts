import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Carousel visual projection. Slots: root / viewport / control / slide /
 * slideGlyph / dots / dot.
 *
 * A static carousel: one slide is shown at a time, flanked by previous/next
 * controls, with a centred row of dot indicators. There is no autoplay; the
 * consumer owns the current index.
 *
 * Pen references the newer role layer (`semantic/action/*`, `semantic/surface/*`,
 * `semantic/border/*`, `semantic/text/*`):
 * - action/secondary-bg -> common.50.background (light near-exact; dark one step)
 * - action/secondary-bg-hover -> common.100.background (light exact; dark one step)
 * - action/secondary-border -> common.50.border.strong (light exact; dark one step)
 * - action/secondary-fg -> common.50.icon (one step)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - surface/sunken -> common.100.background (light exact; dark one step)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/tertiary -> common.600.background (exact)
 * - action/disabled-bg -> common.100.background (light exact; dark one step)
 *
 * Approximations: Pen fixes each control at 40px square (`x20`, exact), the
 * slide at 200px tall (literal; the `xN` scale cannot express it) and the active
 * dot at 20px wide (`x10`, exact). Pen draws a 32px slide glyph; the `Icon`
 * scale's `lg` is 24px. Pen's previous/next use `arrow-left` / `arrow-right`;
 * the icon set carries `chevron-left` / `chevron-right`, so the controls use
 * chevrons. Disabled paints the root with `action/disabled-bg` and mutes the
 * controls and dots.
 */
export const carouselRecipe = defineSlotRecipe({
    className: "carousel",
    slots: [ "root", "viewport", "control", "slide", "slideGlyph", "dots", "dot", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x6",
            width: "100%",
        },

        viewport: {
            display: "flex",
            alignItems: "center",
            gap: "x6",
        },

        control: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "x20",
            height: "x20",
            padding: "0",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.icon",
            cursor: "pointer",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            _hover: { backgroundColor: "semantic.common.100.background", },
            _disabled: {
                cursor: "not-allowed",
                color: "semantic.common.400.background",
                backgroundColor: "semantic.common.100.background",
                _hover: { backgroundColor: "semantic.common.100.background", },
            },
        },

        slide: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "1",
            minWidth: "0",
            height: "200px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.100.background",
        },

        slideGlyph: {
            color: "semantic.common.600.background",
        },

        dots: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "x3",
        },

        dot: {
            width: "x4",
            height: "x4",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "9999px",
            backgroundColor: "semantic.common.50.border.strong",
            cursor: "pointer",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            _disabled: {
                cursor: "not-allowed",
                backgroundColor: "semantic.common.400.background",
            },
        },
    },

    variants: {
        current: {
            true: {
                dot: {
                    width: "x10",
                    backgroundColor: "semantic.brand.700.background",
                },
            },
        },

        disabled: {
            true: {
                root: {
                    backgroundColor: "semantic.common.100.background",
                    borderRadius: "md",
                },
            },
        },
    },

    defaultVariants: {
        current: false,
        disabled: false,
    },
});

export const carouselPreset = definePreset({
    name: "@no-launchpad/carousel",
    theme: { slotRecipes: { carousel: carouselRecipe, }, },
});
