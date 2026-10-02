import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * File Upload visual projection. Slots: root / input / icon / title /
 * description / count / hint / error.
 *
 * A dropzone-styled label over a hidden native `<input type="file">`. The label
 * is the whole surface, so a click anywhere opens the platform picker and the
 * control stays keyboard reachable; drag events are handled on the label and
 * reported through `onFilesChange`. The selected count is a plain text row.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen fixes the dropzone at 280x150 with a `lg` radius; the
 * foundation has no `lg`, so the port uses `md` and keeps the 150px height as a
 * literal. Pen's file row, per-file progress and retry affordance are out of
 * scope for this port: the component reports the file count and leaves upload
 * progress to the consumer. Pen renders the supporting copy as a mono-ish
 * caption; the port composes `body` + `sm`.
 */
export const fileUploadRecipe = defineSlotRecipe({
    className: "fileUpload",
    slots: [ "wrapper", "root", "input", "icon", "title", "description", "count", "hint", "error", ],

    base: {
        wrapper: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        root: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "x4",
            width: "100%",
            minHeight: "150px",
            padding: "x12",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            cursor: "pointer",
            _hover: { backgroundColor: "semantic.common.100.background", },
            _focusWithin: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        input: {
            position: "absolute",
            width: "1px",
            height: "1px",
            margin: "-1px",
            padding: "0",
            overflow: "hidden",
            borderWidth: "0",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
        },

        icon: {
            color: "semantic.common.600.background",
        },

        title: {
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            textAlign: "center",
            color: "semantic.common.50.text",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            textAlign: "center",
            color: "semantic.common.700.background",
        },

        count: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            textAlign: "center",
            color: "semantic.common.50.text",
        },

        hint: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        error: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.negative.600.background",
        },
    },

    variants: {
        dragging: {
            true: {
                root: {
                    borderColor: "semantic.brand.500.background",
                    backgroundColor: "semantic.brand.50.background",
                },
            },
        },

        invalid: {
            true: {
                root: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                root: {
                    backgroundColor: "semantic.common.100.background",
                    cursor: "not-allowed",
                    _hover: { backgroundColor: "semantic.common.100.background", },
                },
                icon: { color: "semantic.common.400.background", },
                title: { color: "semantic.common.400.background", },
                description: { color: "semantic.common.400.background", },
                count: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        dragging: false,
        invalid: false,
        disabled: false,
    },
});

export const fileUploadPreset = definePreset({
    name: "@no-launchpad/file-upload",
    theme: { slotRecipes: { fileUpload: fileUploadRecipe, }, },
});
