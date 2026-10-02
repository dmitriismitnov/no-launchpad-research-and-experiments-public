import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Number Input visual projection. Slots: root / label / control / input / unit /
 * stepper / stepButton / error.
 *
 * A native `<input type="number">` inside a bordered control, with optional
 * plus / minus stepper buttons. It shares the field contract with `Input`
 * (label, error, `aria-invalid` / `aria-describedby`). Colors come from the
 * semantic layer; the recipe never branches on `_light` / `_dark`.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's stepper uses up / down chevrons at 14px; the icon set
 * has `plus` / `minus`, which the stepper uses instead. Pen's 40px control
 * height is the `x20` scale step. The focus ring sits on the control through
 * `:focus-within`, so it can also appear on pointer focus; `Input` uses
 * `:focus-visible` because its control is the focusable element itself.
 */
export const numberInputRecipe = defineSlotRecipe({
    className: "numberInput",
    slots: [ "root", "label", "control", "input", "unit", "stepper", "stepButton", "error", ],

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
            height: "x20",
            paddingInline: "x6",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
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
            "&::-webkit-inner-spin-button": { appearance: "none", margin: "0", },
            "&::-webkit-outer-spin-button": { appearance: "none", margin: "0", },
        },

        unit: {
            flexShrink: "0",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        stepper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: "0",
        },

        stepButton: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "x8",
            height: "x8",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.600.background",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _enabled: {
                _hover: { color: "semantic.common.50.text", },
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

        disabled: {
            true: {
                control: {
                    cursor: "not-allowed",
                    opacity: 0.45,
                },
                stepButton: {
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

export const numberInputPreset = definePreset({
    name: "@no-launchpad/number-input",
    theme: { slotRecipes: { numberInput: numberInputRecipe, }, },
});
