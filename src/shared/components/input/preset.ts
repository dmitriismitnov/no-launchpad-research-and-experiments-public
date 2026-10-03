import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Input visual projection. Slots: root / label / control / input / prefixIcon /
 * suffixIcon / error.
 * Colors come from the semantic layer; the recipe never branches on
 * `_light` / `_dark`.
 *
 * `control` is the bordered surface and the native `input` sits transparently
 * inside it, so the optional `prefixIcon` / `suffixIcon` slots share the same
 * boundary. This mirrors the Pen `dO8tX` anatomy (`root · prefix icon · value
 * or placeholder · suffix slot · focus ring`) and the sibling Number Input /
 * Select control wrapper. The icon slots are decorative and inherit the
 * tertiary content role; the control owns the focus ring (`:focus-within`).
 *
 * The label face is a deliberate approximation: the reference uses a mono
 * field-label face, but the foundation ships only the `body` (Inter) font,
 * so the label composes `body` + `xs` + `medium` + `wide` + `uppercase`.
 * Adding a mono face is a separate font-pipeline step (see design-spec).
 */
export const inputRecipe = defineSlotRecipe({
    className: "input",
    slots: [ "root", "label", "control", "input", "prefixIcon", "suffixIcon", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
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

        control: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            width: "100%",
            height: "x25",
            paddingInline: "x6",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            outlineStyle: { _focusWithin: "solid", },
            outlineWidth: { _focusWithin: "{borderWidths.thick}", },
            outlineOffset: { _focusWithin: "0", },
            outlineColor: { _focusWithin: "semantic.brand.500.background", },
        },

        input: {
            flex: "1",
            minWidth: "0",
            width: "100%",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "inherit",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            outlineStyle: "none",
            cursor: { _disabled: "not-allowed", },
            "&::placeholder": {
                color: "semantic.common.500.background",
            },
        },

        prefixIcon: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "x8",
            height: "x8",
            color: "semantic.common.600.background",
        },

        suffixIcon: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "x8",
            height: "x8",
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
                control: {
                    borderColor: "semantic.negative.600.background",
                },
            },
        },

        disabled: {
            true: {
                control: {
                    cursor: "not-allowed",
                    opacity: 0.45,
                },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const inputPreset = definePreset({
    name: "@no-launchpad/input",
    theme: { slotRecipes: { input: inputRecipe, }, },
});
