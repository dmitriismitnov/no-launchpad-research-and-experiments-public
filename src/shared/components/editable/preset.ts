import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Editable visual projection. Slots: root / control / value / icon / editor /
 * input / error.
 *
 * Inline text that switches to an input in place. The read view is a focusable
 * button; the edit view is a single labelled input. The value reads
 * `text/primary` at `sm` / `medium`, the affordance glyph `text/tertiary`, and
 * the edit field adopts the shared focus ring.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's root pads 6px / 8px (`x4`) with a `sm` radius; the port
 * keeps both as `6px` / `x4`. Pen's saving state, confirm/cancel buttons and
 * multiline variant are out of scope: Enter confirms, Escape cancels and blur
 * confirms. Pen draws the pencil at 14px in `text/tertiary`; the foundation
 * ships the `sm` icon (16px) in `text/tertiary`.
 */
export const editableRecipe = defineSlotRecipe({
    className: "editable",
    slots: [ "root", "control", "value", "icon", "editor", "input", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        control: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "x4",
            width: "100%",
            paddingBlock: "6px",
            paddingInline: "x4",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "transparent",
            backgroundColor: "transparent",
            textAlign: "left",
            cursor: "text",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _hover: { backgroundColor: "semantic.common.100.background", },
        },

        value: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.common.50.text",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        editor: {
            width: "100%",
        },

        input: {
            width: "100%",
            paddingBlock: "6px",
            paddingInline: "x4",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.brand.500.background",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            outline: "none",
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
                control: { borderColor: "semantic.negative.600.background", },
                input: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                control: {
                    cursor: "not-allowed",
                    _hover: { backgroundColor: "transparent", },
                },
                value: { color: "semantic.common.400.background", },
                icon: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const editablePreset = definePreset({
    name: "@no-launchpad/editable",
    theme: { slotRecipes: { editable: editableRecipe, }, },
});
