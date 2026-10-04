import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Context Menu visual projection. Slots: root / trigger / surface.
 *
 * An object-scoped menu: a positioning root, an optional trigger area that
 * opens the surface, and the menu surface itself placed at the pointer or at
 * the `x` / `y` offsets. The surface reuses the `Menu` component, so the
 * context-menu recipe adds only positioning and the trigger chrome.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/border/*`,
 * `semantic/text/*`):
 * - surface/raised -> semantic.surface.raised (trigger chrome; white light; dark one step)
 * - border/subtle -> semantic.border.subtle (trigger chrome)
 * - text/tertiary -> common.600.background (exact)
 *
 * Approximations: Pen fixes the trigger area at 96px tall (literal; the `xN`
 * scale cannot express it) and the surface at 240px wide (`minWidth`). Pen's
 * mono trigger caption reads the body family because the code foundation ships
 * no mono token. Keyboard navigation and focus management belong to the
 * consumer; the surface is the existing `Menu`.
 */
export const contextMenuRecipe = defineSlotRecipe({
    className: "contextMenu",
    slots: [ "root", "trigger", "surface", ],

    base: {
        root: {
            position: "relative",
            display: "block",
            width: "100%",
        },

        trigger: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "96px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.raised",
            cursor: "context-menu",
            userSelect: "none",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        surface: {
            position: "absolute",
            zIndex: "10",
            minWidth: "240px",
        },
    },
});

export const contextMenuPreset = definePreset({
    name: "@no-launchpad/context-menu",
    theme: { slotRecipes: { contextMenu: contextMenuRecipe, }, },
});
