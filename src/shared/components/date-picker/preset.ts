import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Date Picker visual projection. Slots: root / control / field / icon / value /
 * hint / error.
 *
 * A date trigger that opens the `Calendar` inside the shared `Popover`. The
 * popover owns the overlay and the open/close behaviour; this recipe styles the
 * trigger field (the same field as `Date Input`) and the optional message under
 * it. `Calendar surface="embedded"` drops its own card so the popover is the
 * only surface.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's trigger is a typed Date Input. The shared `Popover`
 * wraps its trigger in a button, so the picker trigger is a button styled as
 * the Date Input field and the value is chosen from the calendar; typed entry
 * lives in the standalone `Date Input`. Pen renders the value in the mono face;
 * the foundation ships only `body`, so the value composes `body` + `sm`.
 */
export const datePickerRecipe = defineSlotRecipe({
    className: "datePicker",
    slots: [ "root", "control", "field", "icon", "value", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        control: {
            display: "flex",
            width: "100%",
        },

        field: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            width: "100%",
            height: "x20",
            paddingInline: "x6",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            cursor: { base: "pointer", _disabled: "not-allowed", },
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        value: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "left",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
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
        open: {
            true: {
                field: { borderColor: "semantic.brand.500.background", },
            },
        },

        invalid: {
            true: {
                field: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                field: { backgroundColor: "semantic.common.100.background", },
                value: { color: "semantic.common.400.background", },
                icon: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        open: false,
        invalid: false,
        disabled: false,
    },
});

export const datePickerPreset = definePreset({
    name: "@no-launchpad/date-picker",
    theme: { slotRecipes: { datePicker: datePickerRecipe, }, },
});
