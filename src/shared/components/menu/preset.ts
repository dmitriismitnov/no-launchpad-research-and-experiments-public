import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Menu visual projection. Slots: root / label / item / icon / itemLabel /
 * shortcut / check / submenu / divider.
 *
 * A single menu surface. `Menu` owns the overlay card and the optional group
 * label; `MenuItem` owns the row and its trailing shortcut, check and submenu
 * affordances; `MenuDivider` is the quiet rule between groups.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/action/*`, `semantic/feedback/*`):
 * - surface/overlay -> semantic.surface.overlay (overlay card; light exact; dark one step)
 * - surface/hover -> semantic.surface.hover (row hover; light exact; dark one step)
 * - surface/selected -> brand.50.background (exact, both themes)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/link -> semantic.text.link (check glyph; light exact; dark one step brighter)
 * - text/disabled -> common.400.background (exact, both themes)
 * - feedback/negative-fg -> negative.700.background (exact)
 * - border/subtle -> semantic.border.subtle (overlay card)
 * - shadow/500 -> semantic.shadow.500 (pair with Pen's 0 10px 28px offset)
 *
 * The quiet `divider` rule stays on the common step ramp
 * (`semantic.common.200.divider`).
 *
 * Approximations: Pen fixes the surface at 220px; the component exposes it as a
 * literal `minWidth`. Pen pads the row 8px block / 10px inline (`x4` / `x5`,
 * exact) and gaps it 10px (`x5`, exact). Pen's mono label and shortcut read the
 * body family because the code foundation ships no mono token. The popup
 * positioning and submenu flyout behaviour are out of scope.
 */
export const menuRecipe = defineSlotRecipe({
    className: "menu",
    slots: [
        "root",
        "label",
        "item",
        "icon",
        "itemLabel",
        "shortcut",
        "check",
        "submenu",
        "divider",
    ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            minWidth: "220px",
            padding: "x3",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.overlay",
            boxShadow: "0 10px 28px {colors.semantic.shadow.500}",
        },

        label: {
            paddingBlock: "x3",
            paddingInline: "x5",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
            color: "semantic.common.600.background",
        },

        item: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "x5",
            paddingBlock: "x4",
            paddingInline: "x5",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "sm",
            backgroundColor: "transparent",
            cursor: "pointer",
            textAlign: "left",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            _hover: { backgroundColor: "semantic.surface.hover", },
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.700.background",
        },

        itemLabel: {
            flex: "1",
            minWidth: "0",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        shortcut: {
            flexShrink: "0",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        check: {
            flexShrink: "0",
            color: "semantic.text.link",
        },

        submenu: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        divider: {
            width: "100%",
            height: "{borderWidths.thin}",
            backgroundColor: "semantic.common.200.divider",
        },
    },

    variants: {
        tone: {
            neutral: {},
            danger: {
                itemLabel: { color: "semantic.negative.700.background", },
            },
        },

        checked: {
            true: {
                item: {
                    backgroundColor: "semantic.brand.50.background",
                    _hover: { backgroundColor: "semantic.brand.50.background", },
                },
            },
        },

        disabled: {
            true: {
                item: {
                    cursor: "not-allowed",
                    pointerEvents: "none",
                    _hover: { backgroundColor: "transparent", },
                },
                itemLabel: { color: "semantic.common.400.background", },
                icon: { color: "semantic.common.400.background", },
                shortcut: { color: "semantic.common.400.background", },
                check: { color: "semantic.common.400.background", },
                submenu: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        tone: "neutral",
        checked: false,
        disabled: false,
    },
});

export const menuPreset = definePreset({
    name: "@no-launchpad/menu",
    theme: { slotRecipes: { menu: menuRecipe, }, },
});
