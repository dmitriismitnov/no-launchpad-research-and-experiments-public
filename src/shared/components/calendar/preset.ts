import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Calendar visual projection. Slots: root / header / monthLabel / navButton /
 * grid / weekdays / weekday / week / day.
 *
 * A month grid of `CalendarDay` buttons with a month heading and previous/next
 * navigation. `day` is the shared cell geometry; the selected, today, in-range,
 * outside-month and disabled states are its public variants.
 *
 * Pen references the newer role layer:
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - surface/selected -> brand.50.background (exact)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/primary-fg -> common.50.background (inverse foreground pair)
 * - brand/100 background -> brand.100.background (exact, range band)
 * - brand/100 text -> brand.100.text (exact)
 * - focus/ring -> brand.500.background
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 10px 28px)
 *
 * Approximations: Pen fixes the overlay at 292px and the day cell at 36x32;
 * the cell is a literal height because the `xN` scale cannot express 32px.
 * Pen draws the day number in the mono face; the foundation ships only `body`,
 * so the number composes `body` + `xs` + `1.1`. The embedded surface variant
 * drops the border, shadow and padding so a popover can own the card.
 */
export const calendarRecipe = defineSlotRecipe({
    className: "calendar",
    slots: [ "root", "header", "monthLabel", "navButton", "grid", "weekdays", "weekday", "week", "day", ],

    base: {
        root: {
            width: "292px",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            width: "100%",
        },

        monthLabel: {
            flex: "1",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        navButton: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "x8",
            height: "x8",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "sm",
            backgroundColor: "transparent",
            color: "semantic.common.700.background",
            cursor: "pointer",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _hover: { color: "semantic.common.50.text", },
        },

        grid: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
        },

        weekdays: {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            width: "100%",
        },

        weekday: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "32px",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "1.1",
            textAlign: "center",
            color: "semantic.common.600.background",
        },

        week: {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            width: "100%",
        },

        day: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "32px",
            padding: "0",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "transparent",
            backgroundColor: "transparent",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "1.1",
            color: "semantic.common.50.text",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "-2px", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _enabled: {
                _hover: { backgroundColor: "semantic.common.100.background", },
            },
        },
    },

    variants: {
        surface: {
            overlay: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "x4",
                    padding: "x6",
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: "semantic.common.200.divider",
                    borderRadius: "md",
                    backgroundColor: "semantic.common.50.background",
                    boxShadow: "0 10px 28px {colors.semantic.shadow.500}",
                },
            },
            embedded: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "x4",
                    width: "100%",
                },
            },
        },

        selected: {
            true: {
                day: {
                    backgroundColor: "semantic.brand.700.background",
                    color: "semantic.common.50.background",
                    _enabled: {
                        _hover: { backgroundColor: "semantic.brand.700.background", },
                    },
                },
            },
        },

        today: {
            true: {
                day: {
                    borderColor: "semantic.brand.700.background",
                    color: "semantic.brand.700.background",
                },
            },
        },

        inRange: {
            true: {
                day: {
                    backgroundColor: "semantic.brand.100.background",
                    color: "semantic.brand.100.text",
                    _enabled: {
                        _hover: { backgroundColor: "semantic.brand.100.background", },
                    },
                },
            },
        },

        outsideMonth: {
            true: {
                day: { color: "semantic.common.600.background", },
            },
        },

        disabled: {
            true: {
                day: { color: "semantic.common.400.background", opacity: 0.6, },
            },
        },
    },

    defaultVariants: {
        surface: "overlay",
        selected: false,
        today: false,
        inRange: false,
        outsideMonth: false,
        disabled: false,
    },
});

export const calendarPreset = definePreset({
    name: "@no-launchpad/calendar",
    theme: { slotRecipes: { calendar: calendarRecipe, }, },
});
