import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Timeline visual projection. Slots: root / item / rail / marker / line /
 * text / title / meta.
 *
 * A vertical sequence of events. Each row owns a rail: a ring marker plus a
 * connector line. The line is omitted on the last row by the component so the
 * sequence does not trail off.
 *
 * Pen references the newer role layer (`semantic/surface/raised`,
 * `semantic/border/*`, `semantic/text/*`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - border/strong -> common.50.border.strong (neutral.500/400; code dark step same value)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 *
 * Approximations: Pen spaces rows 14px; the scale has no x7, so `x6` (12px) is
 * used. The 14px marker has no scale token and is a literal.
 */
export const timelineRecipe = defineSlotRecipe({
    className: "timeline",
    slots: [ "root", "item", "rail", "marker", "line", "text", "title", "meta", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x4",
            margin: "0",
            padding: "0",
            listStyleType: "none",
        },

        item: {
            display: "flex",
            alignItems: "flex-start",
            gap: "x6",
        },

        rail: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
        },

        marker: {
            flexShrink: "0",
            width: "14px",
            height: "14px",
            borderRadius: "9999px",
            borderWidth: "thick",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
        },

        line: {
            width: "{borderWidths.thick}",
            height: "x20",
            backgroundColor: "semantic.common.200.divider",
        },

        text: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            flex: "1",
            minWidth: "0",
        },

        title: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        meta: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.700.background",
        },
    },
});

export const timelinePreset = definePreset({
    name: "@no-launchpad/timeline",
    theme: { slotRecipes: { timeline: timelineRecipe, }, },
});
