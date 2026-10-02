import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Sheet visual projection. Slots: root / trigger / overlay / panel / handle /
 * header / title / close / body / description / footer.
 *
 * A touch-oriented surface anchored to an edge (bottom by default) over a scrim.
 * It is the bottom-anchored sibling of `Drawer`, so `side` also accepts `top`,
 * `left` and `right`. It renders in place (no portal) and takes footer actions as
 * nodes. An optional grabber `handle` is drawn at the anchored edge.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/shadow/*`, `semantic/overlay/*`):
 * - overlay/scrim -> a fixed literal (the foundation has no scrim token)
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - border/strong -> common.50.border.strong (handle)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 -8px 32px)
 *
 * Approximations: the scrim is a literal `rgba(15, 23, 42, 0.72)` because there
 * is no semantic scrim token. Pen fixes the specimen at 420px wide with a 16px
 * top radius (the code radii stop at `md`); the anchored edge rounds its inner
 * corners and the bottom/top sheets span the viewport width, matching the
 * documented "keeps the same width as the viewport" rule. Pen's header starts at
 * 18px, which the `xN` scale cannot express, so it is a literal. Snapping
 * heights, drag dismissal and the destructive-item variant are out of scope;
 * the close control receives `autoFocus`.
 */
export const sheetRecipe = defineSlotRecipe({
    className: "sheet",
    slots: [
        "root",
        "trigger",
        "overlay",
        "panel",
        "handle",
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
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
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
            display: "flex",
            flexDirection: "column",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        handle: {
            alignSelf: "center",
            flexShrink: "0",
            width: "40px",
            height: "4px",
            marginBlockStart: "x3",
            borderRadius: "9999px",
            backgroundColor: "semantic.common.50.border.strong",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x8",
            paddingBlockStart: "18px",
            paddingInline: "x10",
            paddingBlockEnd: "x5",
        },

        title: {
            flex: "1",
            minWidth: "0",
            fontFamily: "body",
            fontSize: "lg",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
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
            flex: "1",
            minHeight: "0",
            paddingInline: "x10",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },

        footer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "x6",
            paddingBlockStart: "x8",
            paddingInline: "x10",
            paddingBlockEnd: "x10",
        },
    },

    variants: {
        side: {
            bottom: {
                panel: {
                    left: "0",
                    right: "0",
                    bottom: "0",
                    maxHeight: "85vh",
                    borderTopLeftRadius: "md",
                    borderTopRightRadius: "md",
                    boxShadow: "0 -8px 32px {colors.semantic.shadow.500}",
                },
            },
            top: {
                panel: {
                    left: "0",
                    right: "0",
                    top: "0",
                    maxHeight: "85vh",
                    borderBottomLeftRadius: "md",
                    borderBottomRightRadius: "md",
                },
            },
            right: {
                panel: {
                    right: "0",
                    top: "0",
                    bottom: "0",
                    width: "360px",
                    borderTopLeftRadius: "md",
                    borderBottomLeftRadius: "md",
                },
            },
            left: {
                panel: {
                    left: "0",
                    top: "0",
                    bottom: "0",
                    width: "360px",
                    borderTopRightRadius: "md",
                    borderBottomRightRadius: "md",
                },
            },
        },
    },

    defaultVariants: { side: "bottom", },
});

export const sheetPreset = definePreset({
    name: "@no-launchpad/sheet",
    theme: { slotRecipes: { sheet: sheetRecipe, }, },
});
