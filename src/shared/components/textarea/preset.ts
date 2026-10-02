import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Textarea visual projection. Slots: root / label / control / footer / counter /
 * error.
 *
 * The multiline sibling of `Input`: it shares the field contract (label above,
 * error below, `aria-invalid` / `aria-describedby`) and adds the optional
 * character counter. Colors come from the semantic layer; the recipe never
 * branches on `_light` / `_dark`.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: the field label above the control matches `Input`'s
 * uppercased label (Pen keeps a mono field-label face the foundation does not
 * ship). Pen's 96px control height is a literal on the `xN` scale. Pen swaps
 * the disabled surface for `action/disabled-bg`; this recipe uses the shared
 * `Input` opacity treatment instead so every form control disables alike.
 */
export const textareaRecipe = defineSlotRecipe({
    className: "textarea",
    slots: [ "root", "label", "control", "footer", "counter", "error", ],

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
            minHeight: "96px",
            paddingBlock: "x5",
            paddingInline: "x6",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            resize: "vertical",
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

        footer: {
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
        },

        counter: {
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

export const textareaPreset = definePreset({
    name: "@no-launchpad/textarea",
    theme: { slotRecipes: { textarea: textareaRecipe, }, },
});
