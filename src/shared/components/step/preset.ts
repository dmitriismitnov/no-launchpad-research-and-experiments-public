import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Step visual projection. Slots: root / marker / markerContent / text / title /
 * description.
 *
 * A numbered progress marker plus its label and optional description. The
 * `state` variant repaints the marker and title to distinguish completed,
 * current, upcoming and error steps; the connector between steps belongs to the
 * composition, not to a single step.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/action/*`,
 * `semantic/feedback/*`, `semantic/text/*`, `semantic/border/*`):
 * - surface/sunken -> common.100.background (light exact; dark one step)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/primary-fg -> common.50.background (inverse foreground pair)
 * - feedback/positive-bg -> positive.50.background (exact, both themes)
 * - feedback/positive-border -> positive.50.border.strong (light one step; dark exact)
 * - feedback/positive-fg -> positive.700.background (exact)
 * - feedback/negative-bg -> negative.50.background (exact, both themes)
 * - feedback/negative-border -> negative.50.border.strong (light exact; dark one step)
 * - feedback/negative-fg -> negative.700.background (exact)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 *
 * Approximations: Pen draws a 26px marker, which the `xN` scale cannot express,
 * so it is a literal. Pen's xs marker uses the mono family; the code foundation
 * ships no mono token, so it reads the body family. Pen's state contract paints
 * the current step onto `surface/selected`, while its public specimens paint the
 * current marker with `action/primary-bg`; the specimens win here. The connector
 * and the clickable variant are out of scope.
 */
export const stepRecipe = defineSlotRecipe({
    className: "step",
    slots: [ "root", "marker", "markerContent", "text", "title", "description", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
            gap: "x5",
        },

        marker: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "26px",
            height: "26px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderRadius: "full",
        },

        markerContent: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "tight",
        },

        text: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
        },

        title: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
        },

        description: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.600.background",
        },
    },

    variants: {
        state: {
            upcoming: {
                marker: {
                    backgroundColor: "semantic.common.100.background",
                    borderColor: "semantic.common.50.border.strong",
                    color: "semantic.text.secondary",
                },
                title: { color: "semantic.common.700.background", },
            },

            current: {
                marker: {
                    backgroundColor: "semantic.brand.700.background",
                    borderColor: "semantic.common.50.border.strong",
                    color: "semantic.common.50.background",
                },
                title: { color: "semantic.common.50.text", },
            },

            completed: {
                marker: {
                    backgroundColor: "semantic.positive.50.background",
                    borderColor: "semantic.positive.50.border.strong",
                    color: "semantic.positive.700.background",
                },
                title: { color: "semantic.common.50.text", },
            },

            error: {
                marker: {
                    backgroundColor: "semantic.negative.50.background",
                    borderColor: "semantic.negative.50.border.strong",
                    color: "semantic.negative.700.background",
                },
                title: { color: "semantic.common.50.text", },
            },
        },
    },

    defaultVariants: { state: "upcoming", },
});

export const stepPreset = definePreset({
    name: "@no-launchpad/step",
    theme: { slotRecipes: { step: stepRecipe, }, },
});
