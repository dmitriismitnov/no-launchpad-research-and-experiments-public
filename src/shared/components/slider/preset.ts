import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Slider visual projection. Slots: root / header / label / value / control /
 * input / track / range / thumb / error.
 *
 * A native `<input type="range">` (transparent, covering the control) over a
 * 4px track, a filled range and a 20px thumb. The fill and thumb position are
 * set inline from the resolved value; focus / disabled state follows the native
 * input through Panda's `peer` conditions. Colors come from the semantic layer;
 * the recipe never branches on `_light` / `_dark`.
 *
 * Pen references the newer role layer:
 * - surface/sunken -> common.100.background (light exact; dark one step)
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - text/disabled -> common.400.background (exact)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/primary-bg-hover -> brand.800.background
 * - action/disabled-bg -> common.100.background
 * - shadow/300 -> semantic.shadow.300
 * - focus/ring -> brand.500.background
 *
 * Pen `lLkUG` thumb states (`z57yzW`): the 20px thumb grows to 24px with a
 * `brand.800` stroke on hover, to 28px with the `focus/ring` stroke on
 * focus-visible, and to a 22px `action/primary` fill while dragging/active.
 * These follow the native range through `peer` conditions, so the input
 * precedes the decorative track/range/thumb in the DOM. Pen's 4px track and
 * 20px thumb are the `x2` / `x10` scale steps; the 24/28/22px thumb states are
 * off the scale and stay literals. Pen's `disabled` fill uses `text/disabled`;
 * the port reads `common.400.background` for the same value. The range variant
 * (two thumbs), the tick marks and the numeric fallback are out of scope.
 */
export const sliderRecipe = defineSlotRecipe({
    className: "slider",
    slots: [ "root", "header", "label", "value", "control", "input", "track", "range", "thumb", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "x4",
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

        value: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },

        control: {
            position: "relative",
            width: "100%",
            height: "x10",
        },

        input: {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            margin: "0",
            opacity: "0",
            cursor: { base: "pointer", _disabled: "not-allowed", },
        },

        track: {
            position: "absolute",
            top: "50%",
            left: "0",
            width: "100%",
            height: "x2",
            transform: "translateY(-50%)",
            borderRadius: "full",
            backgroundColor: "semantic.common.100.background",
            // The native range sits underneath and owns every pointer event.
            pointerEvents: "none",
        },

        range: {
            position: "absolute",
            top: "50%",
            left: "0",
            height: "x2",
            transform: "translateY(-50%)",
            borderRadius: "full",
            backgroundColor: "semantic.brand.700.background",
            pointerEvents: "none",
        },

        thumb: {
            position: "absolute",
            top: "50%",
            width: "x10",
            height: "x10",
            transform: "translate(-50%, -50%)",
            borderRadius: "full",
            borderWidth: "{borderWidths.thick}",
            borderStyle: "solid",
            borderColor: "semantic.brand.700.background",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 1px 2px {colors.semantic.shadow.300}",
            pointerEvents: "none",
            // Pen `lLkUG` "Hover thumb": 24px with the `action/primary-bg-hover`
            // stroke. (`_peerHover` also matches `[data-hover]`.)
            _peerHover: {
                width: "24px",
                height: "24px",
                borderColor: "semantic.brand.800.background",
            },
            // Pen `lLkUG` "Focus thumb": 28px with the `focus/ring` stroke; the
            // outline keeps the Pen focus ring outside the control.
            _peerFocusVisible: {
                width: "28px",
                height: "28px",
                borderColor: "semantic.focus.ring",
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.focus.ring",
            },
            // Pen `lLkUG` "Dragging": 22px filled with `action/primary-bg`.
            // (`_peerActive` also matches `[data-active]`.)
            _peerActive: {
                width: "22px",
                height: "22px",
                borderColor: "semantic.brand.700.background",
                backgroundColor: "semantic.brand.700.background",
            },
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
                range: { backgroundColor: "semantic.negative.600.background", },
                thumb: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                range: { backgroundColor: "semantic.common.400.background", },
                thumb: {
                    borderColor: "semantic.common.400.background",
                    backgroundColor: "semantic.common.100.background",
                },
                value: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const sliderPreset = definePreset({
    name: "@no-launchpad/slider",
    theme: { slotRecipes: { slider: sliderRecipe, }, },
});
