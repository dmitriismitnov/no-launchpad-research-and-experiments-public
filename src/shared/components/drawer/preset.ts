import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Drawer visual projection. Slots: root / trigger / overlay / panel / header /
 * title / close / body / description / footer.
 *
 * An edge-anchored modal panel over a scrim. It is rendered in place: the
 * overlay and panel are viewport-fixed rather than portaled, and the consumer
 * passes the footer actions as nodes. `side` picks the anchored edge.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/focus/*`, `semantic/shadow/*`):
 * - overlay/scrim -> a fixed literal (the foundation has no scrim token)
 * - surface/overlay -> semantic.surface.overlay
 * - border/subtle -> semantic.border.subtle (panel frame and footer separator)
 * - focus/ring -> semantic.focus.ring (trigger, close)
 * - text/primary -> semantic.text.primary
 * - text/secondary -> semantic.text.secondary
 * - text/tertiary -> semantic.text.tertiary
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: the scrim is a literal `rgba(15, 23, 42, 0.72)` because there
 * is no semantic scrim token; it matches Pen's light value and stays dark in the
 * dark theme. Pen fixes the panel at 360px and radius `lg` (the code radii stop
 * at `md`); an edge panel rounds only its inner corners so the outer edge stays
 * flush with the viewport. The Pen master is a free-floating specimen with
 * uniform corners, so the inner-edge rounding is an edge-anchoring adaptation.
 * Focus trapping, focus return, scroll locking and resizing are out of scope;
 * the close control receives `autoFocus`.
 */
export const drawerRecipe = defineSlotRecipe({
    className: "drawer",
    slots: [
        "root",
        "trigger",
        "overlay",
        "panel",
        "header",
        "title",
        "close",
        "body",
        "description",
        "footer",
    ],

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
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        overlay: {
            position: "fixed",
            inset: "0",
            zIndex: "30",
            backgroundColor: "rgba(15, 23, 42, 0.72)",
        },

        panel: {
            position: "fixed",
            zIndex: "31",
            top: "0",
            bottom: "0",
            display: "flex",
            flexDirection: "column",
            width: "360px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            backgroundColor: "semantic.surface.overlay",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x8",
            paddingBlockStart: "x10",
            paddingInline: "x10",
            paddingBlockEnd: "x6",
        },

        title: {
            flex: "1",
            minWidth: "0",
            fontFamily: "body",
            fontSize: "lg",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.primary",
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
            color: "semantic.text.tertiary",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        body: {
            display: "flex",
            flexDirection: "column",
            gap: "x6",
            flex: "1",
            minHeight: "0",
            paddingInline: "x10",
            paddingBlockEnd: "x8",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },

        footer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "x6",
            paddingBlockStart: "x8",
            paddingInline: "x10",
            paddingBlockEnd: "x10",
            borderTopWidth: "thin",
            borderTopStyle: "solid",
            borderTopColor: "semantic.border.subtle",
        },
    },

    variants: {
        side: {
            right: {
                panel: {
                    right: "0",
                    borderTopLeftRadius: "md",
                    borderBottomLeftRadius: "md",
                },
            },
            left: {
                panel: {
                    left: "0",
                    borderTopRightRadius: "md",
                    borderBottomRightRadius: "md",
                },
            },
        },
    },

    defaultVariants: { side: "right", },
});

export const drawerPreset = definePreset({
    name: "@no-launchpad/drawer",
    theme: { slotRecipes: { drawer: drawerRecipe, }, },
});
