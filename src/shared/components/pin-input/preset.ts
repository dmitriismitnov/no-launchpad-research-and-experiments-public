import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Pin Input visual projection. Slots: root / label / cells / cell / input /
 * live / hint / error.
 *
 * A row of presentational cells over one visually hidden native input that
 * owns the whole code. The active cell (`[data-active='true']`) draws the focus
 * ring, so the visible marker tracks the single accessible control. Pen
 * `K8gNTw` (`znfZu`) requires one accessible input for the whole code.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/disabled-bg -> common.100.background
 * - action/disabled-fg -> common.400.background
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's cell is 40px wide (`x20`) and 44px tall, which is off
 * the `xN` scale, so the height stays a literal `44px`. Pen renders the digit in
 * the mono face; the foundation ships only `body`, so the digit uses
 * `body` + `md`. Pen's focused cell doubles the ring to 2px; the port uses the
 * shared `borderWidths.thick` ring, matching every other control.
 */
export const pinInputRecipe = defineSlotRecipe({
    className: "pinInput",
    slots: [ "root", "label", "cells", "cell", "input", "live", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
            color: "semantic.common.600.background",
        },

        cells: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
        },

        cell: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "x20",
            height: "44px",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "regular",
            lineHeight: "normal",
            "&[data-active='true']": {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        // The single native input owns the value but is visually hidden; the
        // cells carry the presentation (Pen `K8gNTw` `znfZu`).
        input: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            borderWidth: "0",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
        },

        // Remaining-character announcement (Pen `K8gNTw` `X856Z2`).
        live: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
        },

        hint: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        error: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.negative.600.background",
        },
    },

    variants: {
        invalid: {
            true: {
                cell: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                cell: {
                    backgroundColor: "semantic.common.100.background",
                    color: "semantic.common.400.background",
                },
                label: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const pinInputPreset = definePreset({
    name: "@no-launchpad/pin-input",
    theme: { slotRecipes: { pinInput: pinInputRecipe, }, },
});
