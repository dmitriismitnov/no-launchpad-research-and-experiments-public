import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Switch visual projection. Slots: root / label / control / input / track /
 * thumb / text / error.
 *
 * A native `<input type="checkbox">` with `role="switch"` under a 40x22 track
 * and a 16px thumb. The track and thumb follow the resolved checked state
 * through Panda's `peer` conditions. Colors come from the semantic layer; the
 * recipe never branches on `_light` / `_dark`.
 *
 * Pen references the newer role layer:
 * - surface/sunken -> common.100.background (light exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/disabled-bg -> common.100.background
 * - shadow/300 -> semantic.shadow.300
 * - focus/ring -> brand.500.background
 *
 * Approximations: Pen's `Switch` master does not encode a distinct on-state
 * fill or thumb offset (its on and off specimens are identical), so the port
 * uses the conventional treatment from the same role set: the checked track
 * fills with `action/primary-bg` and the thumb slides by its own width plus the
 * track padding. Pen's 40 / 22 / 16 / 3px geometry are off the `xN` scale and
 * stay literals.
 *
 * The recipe key is `switchControl`, not `switch`: Panda's codegen emits
 * `export declare const switch`, which TypeScript rejects as a reserved word.
 * The generated classes are still `switch__*` through `className: "switch"`.
 */
export const switchControlRecipe = defineSlotRecipe({
    className: "switch",
    slots: [ "root", "label", "control", "input", "track", "thumb", "text", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
        },

        label: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x5",
            cursor: { base: "pointer", _disabled: "not-allowed", },
        },

        control: {
            position: "relative",
            flexShrink: "0",
            width: "40px",
            height: "22px",
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

        track: {
            position: "absolute",
            inset: "0",
            display: "flex",
            alignItems: "center",
            padding: "3px",
            borderRadius: "full",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.100.background",
            _peerChecked: {
                borderColor: "semantic.brand.700.background",
                backgroundColor: "semantic.brand.700.background",
            },
            _peerFocusVisible: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        thumb: {
            width: "16px",
            height: "16px",
            borderRadius: "full",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 1px 2px {colors.semantic.shadow.300}",
            transitionProperty: "transform",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease",
            _peerChecked: { transform: "translateX(18px)", },
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
                track: {
                    borderColor: "semantic.negative.600.background",
                },
            },
        },

        disabled: {
            true: {
                control: {
                    opacity: 0.45,
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

export const switchPreset = definePreset({
    name: "@no-launchpad/switch",
    theme: { slotRecipes: { switchControl: switchControlRecipe, }, },
});
