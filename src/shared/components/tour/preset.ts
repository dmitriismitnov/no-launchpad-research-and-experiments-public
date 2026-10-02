import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Tour visual projection. Slots: root / trigger / surface / content / step /
 * title / body / footer / dots / dot / back / next / close.
 *
 * A step bubble with a progress indicator, a title and body, and back / next
 * actions. The active dot is flagged by the `current` variant. `placement`
 * anchors the bubble to its positioning root. The target highlight, focus
 * trapping and focus return are out of scope.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/shadow/*`, `semantic/action/*`):
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - border/strong -> common.50.border.strong (inactive dots, secondary border)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/primary-fg -> common.50.background (inverse foreground pair)
 * - action/secondary-* -> transparent fill + common.50.border.strong border +
 *   common.50.text foreground (Pen's secondary action roles)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: Pen fixes the bubble at 340px and uses the mono family for the
 * step counter; the code foundation ships no mono token, so it reads the body
 * family. Pen's `Back` and `Next` actions are 40px (`x20`) and 32px tall
 * respectively; both are normalised to `x20` to match the repo's action height.
 * The 6px / 16px progress dots and all gaps/padding are on-scale and exact.
 */
export const tourRecipe = defineSlotRecipe({
    className: "tour",
    slots: [
        "root",
        "trigger",
        "surface",
        "content",
        "step",
        "title",
        "body",
        "footer",
        "dots",
        "dot",
        "back",
        "next",
        "close",
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

        surface: {
            position: "absolute",
            zIndex: "20",
            width: "340px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        content: {
            display: "flex",
            flexDirection: "column",
            gap: "x4",
            padding: "x8",
        },

        step: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "tight",
            letterSpacing: "wide",
            color: "semantic.common.600.background",
        },

        title: {
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        body: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },

        footer: {
            display: "flex",
            alignItems: "center",
            gap: "x5",
            paddingBlockStart: "x6",
            paddingInline: "x8",
            paddingBlockEnd: "x8",
            borderTopWidth: "thin",
            borderTopStyle: "solid",
            borderTopColor: "semantic.common.200.divider",
        },

        dots: {
            display: "flex",
            alignItems: "center",
            gap: "x3",
            flex: "1",
        },

        dot: {
            flexShrink: "0",
            width: "x3",
            height: "x3",
            borderRadius: "9999px",
            backgroundColor: "semantic.common.50.border.strong",
        },

        back: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            height: "x20",
            gap: "x4",
            paddingInline: "x8",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            borderRadius: "sm",
            backgroundColor: {
                base: "transparent",
                _hover: "semantic.common.100.background",
            },
            cursor: "pointer",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            color: "semantic.common.50.text",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _disabled: {
                cursor: "not-allowed",
                color: "semantic.common.400.background",
                borderColor: "semantic.common.200.divider",
                backgroundColor: "transparent",
                _hover: { backgroundColor: "transparent", },
            },
        },

        next: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            height: "x20",
            gap: "x4",
            paddingInline: "x8",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "sm",
            backgroundColor: "semantic.brand.700.background",
            cursor: "pointer",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            color: "semantic.common.50.background",
            opacity: { base: 1, _hover: 0.85, },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
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
    },

    variants: {
        placement: {
            top: { surface: { bottom: "calc(100% + 0.5rem)", left: "50%", transform: "translateX(-50%)", }, },
            right: { surface: { left: "calc(100% + 0.5rem)", top: "0", }, },
            bottom: { surface: { top: "calc(100% + 0.5rem)", left: "50%", transform: "translateX(-50%)", }, },
            left: { surface: { right: "calc(100% + 0.5rem)", top: "0", }, },
        },

        current: {
            true: {
                dot: {
                    width: "x8",
                    backgroundColor: "semantic.brand.700.background",
                },
            },
        },
    },

    defaultVariants: { placement: "bottom", current: false, },
});

export const tourPreset = definePreset({
    name: "@no-launchpad/tour",
    theme: { slotRecipes: { tour: tourRecipe, }, },
});
