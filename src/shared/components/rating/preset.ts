import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Rating visual projection. Slots: root / star / valueLabel.
 *
 * A row of icon buttons that capture an ordered score. The empty glyph reads
 * the `border/strong` boundary colour and the filled glyph reads `text/primary`,
 * giving a clear filled/empty split in both themes without introducing a new
 * accent role.
 *
 * Pen references the newer role layer:
 * - border/strong -> common.50.border.strong (empty star, light exact)
 * - text/primary -> common.50.text (filled star, exact)
 * - text/secondary -> common.700.background (value label, exact)
 * - text/disabled -> common.400.background (exact)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 *
 * Approximations: Pen's master draws every star in `border/strong` and the
 * documentation specimens do not paint a filled state, so the port defines the
 * filled star as `text/primary` — the strongest neutral content colour — and
 * keeps hover preview purely stateful. Pen's 20px glyph is the `md` icon; the
 * `size` prop exposes the shared `sm` / `md` / `lg` steps. The hover row fill
 * from Pen's `surface/hover` is not reproduced.
 */
export const ratingRecipe = defineSlotRecipe({
    className: "rating",
    slots: [ "root", "star", "valueLabel", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x2",
        },

        star: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.50.border.strong",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        valueLabel: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },
    },

    variants: {
        filled: {
            true: {
                star: { color: "semantic.common.50.text", },
            },
        },

        disabled: {
            true: {
                star: {
                    color: "semantic.common.400.background",
                    cursor: "not-allowed",
                },
                valueLabel: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        filled: false,
        disabled: false,
    },
});

export const ratingPreset = definePreset({
    name: "@no-launchpad/rating",
    theme: { slotRecipes: { rating: ratingRecipe, }, },
});
