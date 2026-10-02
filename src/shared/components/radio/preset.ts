import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Radio visual projection. Slots: root / label / control / input / box / dot /
 * text / error.
 *
 * A single radio control: a native `<input type="radio">` under a circular
 * 18px box with an 8px selected dot. The box and dot style themselves through
 * Panda's `peer` conditions, so they follow the native `:checked` /
 * `:focus-visible` / `:disabled` state without JavaScript. This is the control
 * a future Radio Group composes; the group layout is out of scope.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 *
 * Approximations: Pen's 18px box and 8px dot are off the `xN` scale and stay
 * literals. Pen's selected ring is `action/primary-bg`; the selected radio
 * reads the same brand step as the checkbox fill.
 */
export const radioRecipe = defineSlotRecipe({
    className: "radio",
    slots: [ "root", "label", "control", "input", "box", "dot", "text", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
        },

        label: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
            cursor: { base: "pointer", _disabled: "not-allowed", },
        },

        control: {
            position: "relative",
            flexShrink: "0",
            width: "18px",
            height: "18px",
        },

        input: {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            margin: "0",
            opacity: "0",
            cursor: "inherit",
        },

        box: {
            position: "absolute",
            inset: "0",
            display: "block",
            borderRadius: "full",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            _peerChecked: {
                borderColor: "semantic.brand.700.background",
            },
            _peerFocusVisible: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        dot: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "x4",
            height: "x4",
            borderRadius: "full",
            backgroundColor: "semantic.brand.700.background",
            opacity: "0",
            _peerChecked: { opacity: "1", },
        },

        text: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
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
                box: {
                    borderColor: "semantic.negative.600.background",
                },
            },
        },

        disabled: {
            true: {
                box: {
                    backgroundColor: "semantic.common.100.background",
                    cursor: "not-allowed",
                },
                text: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const radioPreset = definePreset({
    name: "@no-launchpad/radio",
    theme: { slotRecipes: { radio: radioRecipe, }, },
});
