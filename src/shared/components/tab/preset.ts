import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Tab visual projection. Slots: list / root / icon / label / indicator.
 *
 * A tab trigger: a column of label (optional glyph) and an active indicator bar.
 * `TabList` owns the shared bottom boundary; each `Tab` owns its own fill and
 * indicator, so a consumer arranges the triggers.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/action/*`):
 * - surface/selected -> brand.50.background (exact, both themes)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - action/disabled-bg -> common.100.background (light exact; dark one step)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/disabled -> common.400.background (exact, both themes)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 *
 * Approximations: Pen gaps the trigger 8px (`x4`, exact), pads 8px block / 4px
 * inline (`x4` / `x2`, exact) and draws a 2px indicator (`{borderWidths.thick}`,
 * exact) whose radius is a pill. Pen spaces tab triggers 28px; the scale has no
 * `x14`, so the list uses `x12` (24px). The `pill` variant and the scrollable,
 * badge and icon-only cases from the master are out of scope.
 */
export const tabRecipe = defineSlotRecipe({
    className: "tab",
    slots: [ "list", "root", "icon", "label", "indicator", ],

    base: {
        list: {
            display: "flex",
            alignItems: "stretch",
            gap: "x12",
            borderBottomWidth: "thin",
            borderBottomStyle: "solid",
            borderBottomColor: "semantic.common.200.divider",
        },

        root: {
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "x4",
            paddingBlock: "x4",
            paddingInline: "x2",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "sm",
            cursor: "pointer",
            backgroundColor: "transparent",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _hover: { backgroundColor: "semantic.common.100.background", },
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.700.background",
        },

        label: {
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.700.background",
        },

        indicator: {
            width: "100%",
            height: "{borderWidths.thick}",
            borderRadius: "full",
            backgroundColor: "semantic.brand.700.background",
            opacity: 0,
        },
    },

    variants: {
        active: {
            true: {
                root: {
                    backgroundColor: "semantic.brand.50.background",
                    _hover: { backgroundColor: "semantic.brand.50.background", },
                },
                icon: { color: "semantic.common.50.text", },
                label: { color: "semantic.common.50.text", },
                indicator: { opacity: 1, },
            },
        },

        disabled: {
            true: {
                root: {
                    cursor: "not-allowed",
                    backgroundColor: "semantic.common.100.background",
                    _hover: { backgroundColor: "semantic.common.100.background", },
                },
                icon: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
                indicator: { opacity: 0, },
            },
        },
    },

    defaultVariants: {
        active: false,
        disabled: false,
    },
});

export const tabPreset = definePreset({
    name: "@no-launchpad/tab",
    theme: { slotRecipes: { tab: tabRecipe, }, },
});
