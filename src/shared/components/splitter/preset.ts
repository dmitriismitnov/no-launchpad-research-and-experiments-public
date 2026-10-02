import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Splitter visual projection. Slots: root / pane / paneStart / paneEnd /
 * handle / grip.
 *
 * A two-pane layout with a divider. The divider is static: it carries
 * `role="separator"` and the correct `aria-orientation`, but there is no drag
 * behaviour. `orientation` only swaps the axis; `horizontal` places panes side
 * by side, `vertical` stacks them.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/border/*`,
 * `semantic/text/*`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - surface/sunken -> common.100.background (light exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - border/strong -> common.50.border.strong (the Pen grip colour)
 * - text/tertiary -> common.600.background (exact)
 *
 * Approximations: Pen's 10px handle and 2px grip are literals (the `xN` scale has
 * no such steps); the pane text reads the tertiary role but the panes are
 * consumer content, so their inner styling is inherited rather than owned.
 */
export const splitterRecipe = defineSlotRecipe({
    className: "splitter",
    slots: [ "root", "pane", "paneStart", "paneEnd", "handle", "grip", ],

    base: {
        root: {
            display: "flex",
            alignItems: "stretch",
            overflow: "hidden",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
        },

        pane: {
            flex: "1",
            minWidth: "0",
            minHeight: "0",
            padding: "x6",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.600.background",
        },

        paneStart: {
            backgroundColor: "semantic.common.100.background",
        },

        paneEnd: {
            backgroundColor: "semantic.common.50.background",
        },

        handle: {
            display: "flex",
            flexShrink: "0",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "semantic.common.50.background",
        },

        grip: {
            flexShrink: "0",
            borderRadius: "9999px",
            backgroundColor: "semantic.common.50.border.strong",
        },
    },

    variants: {
        orientation: {
            horizontal: {
                root: { flexDirection: "row", },
                handle: { width: "x5", alignSelf: "stretch", },
                grip: { width: "x1", height: "x20", },
            },
            vertical: {
                root: { flexDirection: "column", },
                handle: { height: "x5", alignSelf: "stretch", },
                grip: { width: "x20", height: "x1", },
            },
        },
    },

    defaultVariants: { orientation: "horizontal", },
});

export const splitterPreset = definePreset({
    name: "@no-launchpad/splitter",
    theme: { slotRecipes: { splitter: splitterRecipe, }, },
});
