import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Code Block visual projection. Slots: root / head / dotNegative / dotNeutral /
 * dotPositive / file / copy / code / line / lineNumber / lineCode.
 *
 * A dark code surface with a window header and one row per source line. The
 * anatomy is closed: the component maps the code string into numbered rows and
 * paints the optional copy control.
 *
 * Pen `th3Nd` (master) / `VLMbo` (documentation): named parts `root · filename
 * bar · copy control · line numbers · code lines`; state contract `default ·
 * error · hover copy · copied · focus-visible`. The copy control's `focus/ring`
 * indicator (2px outer) resolves `semantic.focus.ring`.
 *
 * The block surface and the file/copy/line-number text resolve Pen's
 * `tooltip/bg` + `tooltip/fg`, and the window dots resolve `feedback/negative-fg`
 * / `feedback/positive-fg`. The code foundation ships no `semantic.tooltip.*` or
 * `semantic.feedback.*` named roles (the Tooltip component records the same gap),
 * so the block keeps the inverse `common.900` pair and the Badge 600 dot
 * convention as value-mapped approximations. The `with filename` / `with line
 * numbers` / `wrapped` / `diff` variants and the `error` / `hover copy` /
 * `copied` states need new public props or the missing Foundation roles; they are
 * recorded BLOCKED, not implemented.
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
            outlineColor: { _focusVisible: "semantic.focus.ring", },
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
