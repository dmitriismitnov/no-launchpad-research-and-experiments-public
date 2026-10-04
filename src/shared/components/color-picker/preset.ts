import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Color Picker visual projection. Slots: root / control / field / swatch /
 * value / chevron / palette / swatchButton / hint / error.
 *
 * A swatch trigger that opens a palette inside the shared `Popover`. The
 * palette is a fixed 6-column grid of small swatches; the selected one gets a
 * 2px `text/primary` ring (`WHWWK`) and the chevron rotates 180° while open
 * (`E8X0Qf`). Colour values themselves are data, so they are painted with an
 * inline `background-color`, while the chrome reads semantic tokens.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's trigger is 180x40 and its palette cards are 220px with
 * 12px padding; the port fills the width and lets the popover own the card.
 * Pen renders the value in the mono face; the foundation ships only `body`, so
 * the value composes `body` + `xs`. Pen's opacity field is out of scope.
 */
export const colorPickerRecipe = defineSlotRecipe({
    className: "colorPicker",
    slots: [ "root", "control", "field", "swatch", "value", "chevron", "palette", "swatchButton", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        control: {
            display: "flex",
            width: "100%",
        },

        field: {
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
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            // The trigger is now the native button itself; own the resets and
            // focus ring the shared Popover wrapper used to provide.
            paddingBlock: "x0",
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            textAlign: "left",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        swatch: {
            flexShrink: "0",
            width: "x10",
            height: "x10",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
        },

        value: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "left",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.50.text",
        },

        chevron: {
            flexShrink: "0",
            color: "semantic.common.600.background",
            transitionProperty: "transform",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease",
        },

        palette: {
            display: "grid",
            gridTemplateColumns: "repeat(6, 24px)",
            gap: "x4",
        },

        swatchButton: {
            width: "24px",
            height: "24px",
            padding: "0",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "transparent",
            cursor: "pointer",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
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
        open: {
            true: {
                field: { borderColor: "semantic.brand.500.background", },
                chevron: { transform: "rotate(180deg)", },
            },
        },

        invalid: {
            true: {
                field: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                field: { backgroundColor: "semantic.common.100.background", },
                value: { color: "semantic.common.400.background", },
                chevron: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },

        selected: {
            true: {
                swatchButton: {
                    borderColor: "semantic.common.50.text",
                    borderWidth: "{borderWidths.thick}",
                },
            },
        },
    },

    defaultVariants: {
        open: false,
        invalid: false,
        disabled: false,
        selected: false,
    },
});

export const colorPickerPreset = definePreset({
    name: "@no-launchpad/color-picker",
    theme: { slotRecipes: { colorPicker: colorPickerRecipe, }, },
});
