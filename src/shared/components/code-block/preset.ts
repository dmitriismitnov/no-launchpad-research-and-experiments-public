import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Code Block visual projection. Slots: root / head / dotNegative / dotNeutral /
 * dotPositive / file / copy / code / line / lineNumber / lineCode.
 *
 * A dark code surface with a window header and one row per source line. The
 * anatomy is closed: the component maps the code string into numbered rows and
 * paints the optional copy control.
 *
 * Pen references `semantic/tooltip/bg` + `semantic/tooltip/fg`. The code
 * foundation has no always-dark tooltip role, so the block uses the inverse
 * `common.900` pair, which keeps the surface dark with light copy in the light
 * theme and flips to a light surface with dark copy in the dark theme:
 * - tooltip/bg -> common.900.background (light exact neutral.900; inverts in dark)
 * - tooltip/fg -> common.900.text (pairs with the surface in both themes)
 * - muted line numbers -> common.900.icon
 * - window dots -> negative.600.background / positive.600.background,
 *   matching the Badge dot convention
 *
 * Approximations: Pen's mono family (IBM Plex Mono) has no code token, so the
 * body family is used. Pen highlights the active line with `palette/blue/*`;
 * the code matrix has no `info`/blue semantic group, so highlighting is out of
 * scope. Pen pads code rows 14px inline; the scale has no x7, so `x6` is used.
 */
export const codeBlockRecipe = defineSlotRecipe({
    className: "codeBlock",
    slots: [
        "root",
        "head",
        "dotNegative",
        "dotNeutral",
        "dotPositive",
        "file",
        "copy",
        "code",
        "line",
        "lineNumber",
        "lineCode",
    ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "md",
            backgroundColor: "semantic.common.900.background",
            color: "semantic.common.900.text",
        },

        head: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
            paddingBlock: "x5",
            paddingInline: "x6",
        },

        dotNegative: {
            flexShrink: "0",
            width: "x4",
            height: "x4",
            borderRadius: "9999px",
            backgroundColor: "semantic.negative.600.background",
        },

        dotNeutral: {
            flexShrink: "0",
            width: "x4",
            height: "x4",
            borderRadius: "9999px",
            backgroundColor: "semantic.common.900.icon",
        },

        dotPositive: {
            flexShrink: "0",
            width: "x4",
            height: "x4",
            borderRadius: "9999px",
            backgroundColor: "semantic.positive.600.background",
        },

        file: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.common.900.text",
        },

        copy: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.common.900.text",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        code: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            margin: "0",
            paddingBlockStart: "x4",
            paddingBlockEnd: "x6",
            overflowX: "auto",
        },

        line: {
            display: "flex",
            gap: "x6",
            paddingBlock: "x1",
            paddingInline: "x6",
        },

        lineNumber: {
            flexShrink: "0",
            width: "x8",
            textAlign: "right",
            userSelect: "none",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.900.icon",
        },

        lineCode: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            whiteSpace: "pre",
            color: "semantic.common.900.text",
        },
    },
});

export const codeBlockPreset = definePreset({
    name: "@no-launchpad/code-block",
    theme: { slotRecipes: { codeBlock: codeBlockRecipe, }, },
});
