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
 * `semantic/border/*`, `semantic/text/*`), resolved against the Pen
 * documentation frame `K7WV8o` and the masters `z4hUE9` (Timeline) / `d5pll`
 * (Timeline Item):
 * - marker surface -> semantic.surface.raised (white light / neutral.900 dark)
 * - marker boundary -> semantic.border.strong (neutral.500 light / neutral.400 dark)
 * - connector -> semantic.border.subtle (neutral.200/800)
 * - title -> semantic.text.primary (neutral.900/50)
 * - metadata -> semantic.text.secondary (neutral.700/300)
 *
 * The static timeline has no focusable slot (Pen focus-indicator audit 0/0), so
 * no focus ring is projected.
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
            borderColor: "semantic.border.strong",
            backgroundColor: "semantic.surface.raised",
        },

        line: {
            width: "{borderWidths.thick}",
            height: "x20",
            backgroundColor: "semantic.border.subtle",
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
            color: "semantic.text.primary",
        },

        meta: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.secondary",
        },
    },
});

export const timelinePreset = definePreset({
    name: "@no-launchpad/timeline",
    theme: { slotRecipes: { timeline: timelineRecipe, }, },
});
