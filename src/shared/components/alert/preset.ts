import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Alert visual projection. Slots: root / header / icon / title / dismiss / body.
 *
 * A feedback banner. The `tone` variant selects the semantic feedback role
 * (neutral | positive | negative | brand); neutral is the base and the remaining
 * tones override only the surface, boundary and foreground slots. The body keeps
 * the shared muted foreground so long-form copy stays legible in every tone.
 *
 * Pen `Q2PWF` master names the newer role layer (`semantic/feedback/*`,
 * `semantic/text/*`). The named `feedback/*` roles are BLOCKED in the
 * foundation, so each alias keeps its value-equal matrix token:
 * - neutral-fg -> feedback/neutral-fg (neutral.700/200); exact match with
 *   common.50.icon
 * - positive-bg -> feedback/positive-bg (green.50/950); exact match with
 *   positive.50.background
 * - positive-fg -> feedback/positive-fg (green.700/300); exact match with
 *   positive.700.background
 * - negative-bg -> feedback/negative-bg (red.50/950); exact match with
 *   negative.50.background
 * - negative-fg -> feedback/negative-fg (red.700/300); exact match with
 *   negative.700.background
 * - text/secondary (body) and text/tertiary (dismiss) are exact matches with
 *   common.700.background and common.600.background
 * The neutral surface/boundary and the positive/negative boundaries stay on
 * the closest matrix alias (common.50.background, common.200.divider,
 * positive.50.border.strong, negative.50.border.strong); their dark/light
 * steps differ from Pen and are recorded BLOCKED / INFO, not changed.
 * feedback/info and feedback-brand are not in this slice.
 */
export const alertRecipe = defineSlotRecipe({
    className: "alert",
    slots: [ "root", "header", "icon", "title", "dismiss", "body", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x5",
            padding: "x8",
            borderWidth: "thin",
            borderStyle: "solid",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            borderColor: "semantic.common.200.divider",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x5",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.50.icon",
        },

        title: {
            flex: "1",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.icon",
        },

        dismiss: {
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
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },
    },

    variants: {
        tone: {
            neutral: {},
            positive: {
                root: {
                    backgroundColor: "semantic.positive.50.background",
                    borderColor: "semantic.positive.50.border.strong",
                },
                icon: { color: "semantic.positive.700.background", },
                title: { color: "semantic.positive.700.background", },
            },
            negative: {
                root: {
                    backgroundColor: "semantic.negative.50.background",
                    borderColor: "semantic.negative.50.border.strong",
                },
                icon: { color: "semantic.negative.700.background", },
                title: { color: "semantic.negative.700.background", },
            },
            brand: {
                root: {
                    backgroundColor: "semantic.brand.50.background",
                    borderColor: "semantic.brand.50.border.strong",
                },
                icon: { color: "semantic.brand.700.background", },
                title: { color: "semantic.brand.700.background", },
            },
        },
    },

    defaultVariants: { tone: "neutral", },
});

export const alertPreset = definePreset({
    name: "@no-launchpad/alert",
    theme: { slotRecipes: { alert: alertRecipe, }, },
});
