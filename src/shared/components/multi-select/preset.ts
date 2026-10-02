import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Multi Select visual projection. Slots: root / label / control / placeholder /
 * count / toggle / listbox / option / optionLabel / check / hint / error.
 *
 * A trigger that shows the current selection as removable chips and opens an
 * inline `role="listbox"` of option rows. Chips reuse the public `Tag`
 * component, so the recipe owns only the trigger and the popup. The overlay is
 * rendered in place (no portal), matching Popover / Dialog in this repo.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/selected -> brand.50.background (exact)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step)
 * - focus/ring -> brand.500.background
 * - action/disabled-bg -> common.100.background
 * - shadow/500 -> semantic.shadow.500
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's trigger pads 6px / 10px (`x3` / `x5`) with a 6px (`x3`)
 * gap and a 300px width; the port keeps the padding/gap and fills the width.
 * Pen's overflow counter reads the mono face; the foundation ships only `body`,
 * so the counter uses `body` + `xs`. The search row inside Pen's popup is out of
 * scope; the listbox is a plain multi-select list.
 */
export const multiSelectRecipe = defineSlotRecipe({
    className: "multiSelect",
    slots: [
        "root",
        "label",
        "control",
        "placeholder",
        "count",
        "toggle",
        "listbox",
        "option",
        "optionLabel",
        "check",
        "hint",
        "error",
    ],

    base: {
        root: {
            position: "relative",
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
            flexWrap: "wrap",
            alignItems: "center",
            gap: "x3",
            minHeight: "x20",
            paddingBlock: "x3",
            paddingInline: "x5",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            _focusWithin: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        placeholder: {
            flex: "1",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        count: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        toggle: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            marginInlineStart: "auto",
            padding: "x1",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.600.background",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        listbox: {
            position: "absolute",
            zIndex: "20",
            top: "calc(100% + {spacing.x2})",
            left: "0",
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            width: "100%",
            minWidth: "max-content",
            padding: "x3",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 10px 28px {colors.semantic.shadow.500}",
        },

        option: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            width: "100%",
            paddingBlock: "x4",
            paddingInline: "x5",
            borderRadius: "sm",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.50.text",
            textAlign: "left",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _enabled: {
                _hover: { backgroundColor: "semantic.common.100.background", },
            },
        },

        optionLabel: {
            flex: "1",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "currentColor",
        },

        check: {
            flexShrink: "0",
            color: "semantic.brand.700.background",
            opacity: "0",
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
        invalid: {
            true: {
                control: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                control: {
                    backgroundColor: "semantic.common.100.background",
                    cursor: "not-allowed",
                },
                placeholder: { color: "semantic.common.400.background", },
                count: { color: "semantic.common.400.background", },
                toggle: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },

        selected: {
            true: {
                option: {
                    backgroundColor: "semantic.brand.50.background",
                    _enabled: {
                        _hover: { backgroundColor: "semantic.brand.50.background", },
                    },
                },
                optionLabel: { fontWeight: "semibold", },
                check: { opacity: "1", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
        selected: false,
    },
});

export const multiSelectPreset = definePreset({
    name: "@no-launchpad/multi-select",
    theme: { slotRecipes: { multiSelect: multiSelectRecipe, }, },
});
