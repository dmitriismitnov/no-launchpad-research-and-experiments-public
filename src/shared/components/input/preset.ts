import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Input visual projection. Slots: root / label / control / error.
 * Colors come from the semantic layer; the recipe never branches on
 * `_light` / `_dark`.
 *
 * The label face is a deliberate approximation: the reference uses a mono
 * field-label face, but the foundation ships only the `body` (Inter) font,
 * so the label composes `body` + `xs` + `medium` + `wide` + `uppercase`.
 * Adding a mono face is a separate font-pipeline step (see design-spec).
 */
export const inputRecipe = defineSlotRecipe({
    className: "input",
    slots: [ "root", "label", "control", "error", ],

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
            width: "100%",
            height: "x25",
            paddingInline: "x6",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            cursor: { _disabled: "not-allowed", },
            opacity: { _disabled: 0.45, },
            "&::placeholder": {
                color: "semantic.common.500.background",
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
                control: {
                    borderColor: "semantic.negative.600.background",
                },
            },
        },
    },

    defaultVariants: {
        invalid: false,
    },
});

export const inputPreset = definePreset({
    name: "@no-launchpad/input",
    theme: { slotRecipes: { input: inputRecipe, }, },
});
