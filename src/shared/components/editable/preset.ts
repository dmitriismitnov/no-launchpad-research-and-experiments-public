import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Editable visual projection. Slots: root / control / value / icon / editor /
 * input / actions / confirm / cancel / saving / error.
 *
 * Inline text that switches to an input in place. The read view is a focusable
 * button whose affordance glyph only appears on hover and focus (`LiBiT`); the
 * edit view is a single labelled input with keyboard-reachable Confirm and
 * Cancel controls (`XrUb6`). While `saving` the field stays and a rotating
 * indicator reports progress (`y6mZ4`).
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
 * keeps both as `6px` / `x4`. Pen's multiline variant stays out of scope. Pen
 * draws the pencil at 14px in `text/tertiary`; the foundation ships the `sm`
 * icon (16px) in `text/tertiary`.
 */
export const editableRecipe = defineSlotRecipe({
    className: "editable",
    slots: [
        "root",
        "control",
        "value",
        "icon",
        "editor",
        "input",
        "actions",
        "confirm",
        "cancel",
        "saving",
        "error",
    ],

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
            _hover: {
                backgroundColor: "semantic.common.100.background",
                "& .editable__icon": { opacity: "1", },
            },
            _focusVisible: { "& .editable__icon": { opacity: "1", }, },
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

        // Pen `zoEMh` `LiBiT`: the affordance shows on hover and focus, never
        // permanently.
        icon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
            opacity: "0",
            transitionProperty: "opacity",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease",
        },

        editor: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
            width: "100%",
        },

        input: {
            flex: "1",
            minWidth: "0",
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

        actions: {
            display: "flex",
            alignItems: "center",
            gap: "x1",
            flexShrink: "0",
        },

        confirm: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "x10",
            height: "x10",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            borderRadius: "sm",
            cursor: "pointer",
            color: "semantic.common.600.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _hover: { backgroundColor: "semantic.common.100.background", },
            _disabled: {
                color: "semantic.common.400.background",
                cursor: "not-allowed",
                _hover: { backgroundColor: "transparent", },
            },
        },

        cancel: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "x10",
            height: "x10",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            borderRadius: "sm",
            cursor: "pointer",
            color: "semantic.common.600.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _hover: { backgroundColor: "semantic.common.100.background", },
            _disabled: {
                color: "semantic.common.400.background",
                cursor: "not-allowed",
                _hover: { backgroundColor: "transparent", },
            },
        },

        // Pen `zoEMh` `y6mZ4`: keep the field in place and show progress.
        saving: {
            flexShrink: "0",
            color: "semantic.common.600.background",
            animation: "spin 1s linear infinite",
            "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
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
                    _hover: {
                        backgroundColor: "transparent",
                        "& .editable__icon": { opacity: "0", },
                    },
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
