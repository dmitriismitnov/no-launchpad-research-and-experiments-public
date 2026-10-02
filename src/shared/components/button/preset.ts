import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Button visual projection.
 * Anatomy, public variants and all visual rules live together.
 * Slots: root / prefixIcon / label / suffixIcon.
 *
 * Colours come from the semantic layer, which switches theme inside the token;
 * the recipe never branches on `_light` / `_dark`.
 *
 * The action roles are Pen's: `primary` is the green action fill, `secondary`
 * is a raised surface with a functional boundary, `ghost` is transparent with a
 * hover surface. Feedback is a colour swap, never an opacity fade or a shadow.
 * The label and both icon slots paint from one foreground per tone.
 */
export const buttonRecipe = defineSlotRecipe({
    className: "button",
    slots: [ "root", "prefixIcon", "label", "suffixIcon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // Pen `Button` (IcuBw): 40px control, 8px gap, 10px radius.
            height: "x20",
            gap: "x4",
            borderRadius: "md",
            paddingBlock: "x5",
            paddingInline: "x8",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        prefixIcon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },

        label: {
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            letterSpacing: "normal",
        },

        suffixIcon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },
    },

    variants: {
        tone: {
            primary: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "semantic.action.primary.background",
                        _enabled: {
                            _hover: "semantic.action.primary.hover",
                            _active: "semantic.action.primary.active",
                        },
                        _disabled: "semantic.action.disabled.background",
                    },
                },
                label: {
                    color: {
                        base: "semantic.action.primary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.action.primary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.action.primary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },

            secondary: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: "semantic.action.secondary.border",
                    backgroundColor: {
                        base: "semantic.action.secondary.background",
                        _enabled: {
                            _hover: "semantic.action.secondary.hover",
                            _active: "semantic.action.secondary.hover",
                        },
                        _disabled: "semantic.action.disabled.background",
                    },
                },
                label: {
                    color: {
                        base: "semantic.action.secondary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.action.secondary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.action.secondary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },

            ghost: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "transparent",
                        _enabled: {
                            _hover: "semantic.action.ghost.hover",
                            _active: "semantic.surface.selected",
                        },
                        _disabled: "semantic.action.disabled.background",
                    },
                },
                label: {
                    color: {
                        base: "semantic.text.secondary",
                        _enabled: {
                            _hover: "semantic.action.ghost.foreground",
                            _active: "semantic.text.secondary",
                        },
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.text.secondary",
                        _enabled: {
                            _hover: "semantic.action.ghost.foreground",
                            _active: "semantic.text.secondary",
                        },
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.text.secondary",
                        _enabled: {
                            _hover: "semantic.action.ghost.foreground",
                            _active: "semantic.text.secondary",
                        },
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },
        },

        // Pen documents `md` (40px) and a 32px `sm`; both are supported.
        size: {
            sm: {
                root: { height: "x16", paddingBlock: "x3", paddingInline: "x6", },
            },
            md: {
                root: { paddingInline: "x8", },
            },
        },
    },

    defaultVariants: {
        tone: "primary",
        size: "md",
    },
});

export const buttonPreset = definePreset({
    name: "@no-launchpad/button",
    theme: { slotRecipes: { button: buttonRecipe, }, },
});
