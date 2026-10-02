import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Field visual projection. Slots: root / labelRow / label / required / control /
 * hint / error.
 *
 * Field is the composition wrapper that gives any control a label, an optional
 * required marker, a hint and a validation message. It is not a control itself:
 * the control is passed as the only child and receives the field's `id`,
 * `required`, `aria-invalid` and `aria-describedby`. The slot contract mirrors
 * `Input` (root / label / control / error) and adds `labelRow`, `required` and
 * `hint`.
 *
 * Pen references the newer role layer:
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - feedback/negative-fg -> negative.700.background (exact)
 *
 * Approximations: Pen's Field label is sentence-case `sm` / `medium` /
 * `text/primary` (unlike `Input`'s uppercased field-label face). The port keeps
 * Pen's face because Field wraps arbitrary controls and the label is a visible
 * control name, not the compact mono field-label used inside `Input`. The label
 * row gap is Pen's 4px (`x2`) and the root gap 6px (`x3`).
 */
export const fieldRecipe = defineSlotRecipe({
    className: "field",
    slots: [ "root", "labelRow", "label", "required", "control", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        labelRow: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
        },

        label: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        required: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.negative.700.background",
        },

        control: {
            width: "100%",
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
        disabled: {
            true: {
                label: { color: "semantic.common.400.background", },
                required: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        disabled: false,
    },
});

export const fieldPreset = definePreset({
    name: "@no-launchpad/field",
    theme: { slotRecipes: { field: fieldRecipe, }, },
});
