import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Splitter visual projection (Pen master `U4KfQj`, documentation `ZVJu8`).
 * Slots: root / pane / paneStart / paneEnd / handle / grip.
 *
 * A two-pane layout with a static `role="separator"` divider; there is no drag
 * behaviour. `orientation` only swaps the axis; `horizontal` places panes side
 * by side, `vertical` stacks them. Pen's "keyboard-operable separator", size
 * persistence, `with minimums`/`collapsible` and hover/dragging/disabled states
 * are BLOCKED (they need new props, drag/resize behaviour or ARIA work).
 *
 * Resolved Pen roles:
 * - root surface/raised -> `semantic.surface.raised`
 * - root boundary border/subtle -> `semantic.border.subtle`
 * - paneStart surface/sunken -> `semantic.surface.sunken`
 * - paneEnd / handle surface/raised -> `semantic.surface.raised`
 * - grip border/strong -> `semantic.border.strong`
 * - pane copy text/tertiary -> `semantic.text.tertiary`
 *
 * Pen's focus specimen `GydgT` draws `focus/ring` on the (not focusable) root;
 * the code renders no focusable slot, so the focus role is not projected.
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
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.raised",
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
            color: "semantic.text.tertiary",
        },

        paneStart: {
            backgroundColor: "semantic.surface.sunken",
        },

        paneEnd: {
            backgroundColor: "semantic.surface.raised",
        },

        handle: {
            display: "flex",
            flexShrink: "0",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "semantic.surface.raised",
        },

        grip: {
            flexShrink: "0",
            borderRadius: "9999px",
            backgroundColor: "semantic.border.strong",
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
