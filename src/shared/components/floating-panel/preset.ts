import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Floating Panel visual projection. Slots: root / trigger / panel / header /
 * icon / title / collapse / close / body.
 *
 * A small tool or inspector surface pinned to a viewport corner. `placement`
 * picks the corner; `collapsible` adds a collapse control that hides the body.
 * It renders in place (no portal) and stays static: dragging, resizing and
 * persistence are out of scope.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/shadow/*`):
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: Pen fixes the panel at 320px, pads 14px and insets it from the
 * viewport; the width and 14px padding are literals because the `xN` scale
 * cannot express them, and the corner inset uses `x10` (20px). Pen uses a
 * `minus` glyph for the collapse control; the icon set now carries `minus` /
 * `plus`, so collapse and expand swap glyphs. The `dragging` state and resize
 * affordance are presentational only in Pen and are out of scope here.
 */
export const floatingPanelRecipe = defineSlotRecipe({
    className: "floatingPanel",
    slots: [ "root", "trigger", "panel", "header", "icon", "title", "collapse", "close", "body", ],

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

        panel: {
            position: "fixed",
            zIndex: "20",
            display: "flex",
            flexDirection: "column",
            gap: "x6",
            width: "320px",
            padding: "14px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.700.background",
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

        collapse: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.common.600.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        close: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.common.600.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        body: {
            display: "flex",
            flexDirection: "column",
            gap: "x6",
        },
    },

    variants: {
        placement: {
            "top-left": { panel: { top: "x10", left: "x10", }, },
            "top-right": { panel: { top: "x10", right: "x10", }, },
            "bottom-left": { panel: { bottom: "x10", left: "x10", }, },
            "bottom-right": { panel: { bottom: "x10", right: "x10", }, },
        },
    },

    defaultVariants: { placement: "bottom-right", },
});

export const floatingPanelPreset = definePreset({
    name: "@no-launchpad/floating-panel",
    theme: { slotRecipes: { floatingPanel: floatingPanelRecipe, }, },
});
