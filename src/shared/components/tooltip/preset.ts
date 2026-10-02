import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Tooltip visual projection. Slots: root / trigger / surface / label / shortcut.
 *
 * A short, non-interactive hint anchored to the element it describes. The
 * trigger is the positioning root, so the consumer supplies the visible control
 * and the component wraps it; the surface is absolutely placed by `placement`.
 *
 * Pen references the newer role layer (`semantic/tooltip/*`):
 * - tooltip/bg -> common.900.background (light exact neutral.900; dark inverts)
 * - tooltip/fg -> common.900.text (light exact neutral.50)
 *
 * Approximations: the code foundation has no theme-invariant dark surface, so
 * the light tooltip is exact (neutral.900 fill, neutral.50 text) while the dark
 * theme inverts to a light surface. Pen's `radius/sm` maps to `sm`. The mono
 * shortcut reads the body family because the code foundation ships no mono
 * token. The optional delay, arrow and collision handling are out of scope.
 */
export const tooltipRecipe = defineSlotRecipe({
    className: "tooltip",
    slots: [ "root", "trigger", "surface", "label", "shortcut", ],

    base: {
        root: {
            position: "relative",
            display: "inline-flex",
        },

        trigger: {
            display: "inline-flex",
            alignItems: "center",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        surface: {
            position: "absolute",
            zIndex: "20",
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
            maxWidth: "240px",
            paddingBlock: "x3",
            paddingInline: "x5",
            borderRadius: "sm",
            backgroundColor: "semantic.common.900.background",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.900.text",
        },

        shortcut: {
            flexShrink: "0",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.900.text",
        },
    },

    variants: {
        placement: {
            top: {
                surface: { bottom: "calc(100% + 0.5rem)", left: "50%", transform: "translateX(-50%)", },
            },
            bottom: {
                surface: { top: "calc(100% + 0.5rem)", left: "50%", transform: "translateX(-50%)", },
            },
            left: {
                surface: { right: "calc(100% + 0.5rem)", top: "50%", transform: "translateY(-50%)", },
            },
            right: {
                surface: { left: "calc(100% + 0.5rem)", top: "50%", transform: "translateY(-50%)", },
            },
        },
    },

    defaultVariants: { placement: "top", },
});

export const tooltipPreset = definePreset({
    name: "@no-launchpad/tooltip",
    theme: { slotRecipes: { tooltip: tooltipRecipe, }, },
});
