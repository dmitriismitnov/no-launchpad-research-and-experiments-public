import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Radio Group visual projection. Slots: root / label / options / hint / error.
 *
 * A labelled `role="radiogroup"` that composes the public `Radio` control. The
 * group owns the shared `name`, the selected `value` and the error contract;
 * each `Radio` keeps its native input as the source of truth.
 *
 * Pen references the newer role layer:
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - feedback/negative-fg -> negative.700.background (exact)
 *
 * Approximations: Pen's vertical group is a 10px (`x5`) gap and the horizontal
 * group 24px (`x12`); the port expresses both on the `xN` scale. Pen's invalid
 * specimen marks a single option; the port passes `invalid` to every radio so
 * the group reads as one invalid control, and the message sits under the group.
 */
export const radioGroupRecipe = defineSlotRecipe({
    className: "radioGroup",
    slots: [ "root", "label", "options", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
        },

        label: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        options: {
            display: "flex",
            flexDirection: "column",
            gap: "x5",
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
        orientation: {
            vertical: {
                options: { flexDirection: "column", gap: "x5", },
            },
            horizontal: {
                options: { flexDirection: "row", flexWrap: "wrap", gap: "x12", },
            },
        },

        disabled: {
            true: {
                label: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        orientation: "vertical",
        disabled: false,
    },
});

export const radioGroupPreset = definePreset({
    name: "@no-launchpad/radio-group",
    theme: { slotRecipes: { radioGroup: radioGroupRecipe, }, },
});
