import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Accordion Item visual projection. Slots: root / trigger / title / chevron /
 * panel.
 *
 * A disclosure row: a full-width trigger (title plus reflecting chevron) over a
 * collapsible panel. The root owns the separator boundary between items; the
 * component owns the open state.
 *
 * Pen references the newer role layer (`semantic/text/*`, `semantic/border/*`):
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/disabled -> common.400.background (exact, both themes)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 *
 * Approximations: Pen pads the trigger 14px block / 4px inline; the scale has no
 * `x7`, so the block padding is `x6` (12px) and the inline padding is `x2` (4px,
 * exact). Pen toggles the chevron by rotation; the panel is unmounted when
 * closed rather than hidden.
 */
export const accordionItemRecipe = defineSlotRecipe({
    className: "accordionItem",
    slots: [ "root", "trigger", "title", "chevron", "panel", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            borderBottomWidth: "thin",
            borderBottomStyle: "solid",
            borderBottomColor: "semantic.common.200.divider",
        },

        trigger: {
            display: "flex",
            alignItems: "center",
            gap: "x6",
            width: "100%",
            paddingBlock: "x6",
            paddingInline: "x2",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            textAlign: "left",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            _hover: { backgroundColor: "semantic.common.100.background", },
        },

        title: {
            flex: "1",
            minWidth: "0",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        chevron: {
            flexShrink: "0",
            color: "semantic.common.700.background",
            transitionProperty: "transform",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease",
        },

        panel: {
            paddingInline: "x2",
            paddingBlockEnd: "x6",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.700.background",
        },
    },

    variants: {
        open: {
            true: {
                chevron: { transform: "rotate(180deg)", },
            },
        },

        disabled: {
            true: {
                trigger: {
                    cursor: "not-allowed",
                    pointerEvents: "none",
                    _hover: { backgroundColor: "transparent", },
                },
                title: { color: "semantic.common.400.background", },
                chevron: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        open: false,
        disabled: false,
    },
});

export const accordionItemPreset = definePreset({
    name: "@no-launchpad/accordion-item",
    theme: { slotRecipes: { accordionItem: accordionItemRecipe, }, },
});
