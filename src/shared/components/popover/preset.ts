import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Popover visual projection. Slots: root / trigger / surface / content / title /
 * description.
 *
 * A light overlay surface anchored to a trigger. The trigger is the positioning
 * root and the surface is placed by `placement`; `title` and `description` are
 * the optional header, and any remaining content is rendered after them.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/shadow/*`):
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: Pen fixes the surface at 280px; the component exposes it as a
 * literal `minWidth`. The arrow, modal/non-modal modes and menu-content variant
 * are out of scope; a consumer composes menu or form content through `children`.
 */
export const popoverRecipe = defineSlotRecipe({
    className: "popover",
    slots: [ "root", "trigger", "surface", "content", "title", "description", ],

    base: {
        root: {
            position: "relative",
            display: "inline-flex",
        },

        trigger: {
            display: "inline-flex",
            alignItems: "center",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        surface: {
            position: "absolute",
            zIndex: "20",
            display: "flex",
            flexDirection: "column",
            minWidth: "280px",
            maxWidth: "320px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        content: {
            display: "flex",
            flexDirection: "column",
            gap: "x4",
            padding: "x8",
        },

        title: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },
    },

    variants: {
        placement: {
            bottom: { surface: { top: "calc(100% + 0.5rem)", left: "0", }, },
            top: { surface: { bottom: "calc(100% + 0.5rem)", left: "0", }, },
            right: { surface: { left: "calc(100% + 0.5rem)", top: "0", }, },
            left: { surface: { right: "calc(100% + 0.5rem)", top: "0", }, },
        },
    },

    defaultVariants: { placement: "bottom", },
});

export const popoverPreset = definePreset({
    name: "@no-launchpad/popover",
    theme: { slotRecipes: { popover: popoverRecipe, }, },
});
