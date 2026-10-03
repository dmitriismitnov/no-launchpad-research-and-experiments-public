import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * ButtonIcon visual projection.
 * Anatomy, public variants and all visual rules live together.
 * Slots: root / icon.
 *
 * Icon-only sibling of Button: same `tone`/`size` vocabulary and the same
 * semantic action roles, but a square geometry and no `label` slot. Colours
 * come from the semantic layer, which switches theme inside the token; the
 * recipe never branches on `_light` / `_dark`.
 */
export const buttonIconRecipe = defineSlotRecipe({
    className: "buttonIcon",
    slots: [ "root", "icon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // The square is fixed by `size`, so any user-agent padding would
            // only squeeze the glyph.
            paddingInline: "x0",
            paddingBlock: "x0",
            borderRadius: "md",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        icon: {
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
                icon: {
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
                icon: {
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
                icon: {
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

            // Pen `Icon Button` (L72UAx) destructive (`LVKWA`): the same danger
            // role as the Button, so the two controls never diverge.
            destructive: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "semantic.action.danger.background",
                        _enabled: {
                            _hover: "semantic.action.danger.hover",
                            _active: "semantic.action.danger.hover",
                        },
                        _disabled: "semantic.action.disabled.background",
                    },
                },
                icon: {
                    color: {
                        base: "semantic.action.danger.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },
        },

        // The square matches the height of the same-sized Button, so the two
        // controls line up. Pen's documented `Icon Button` (`L72UAx`) is a 40px
        // square with an 18px glyph; the 32px `Sm` keeps a 16px glyph. The
        // ButtonIcon owns its glyph geometry, so the medium slot scales the
        // paired `Icon` up to the 18px box.
        size: {
            sm: { root: { width: "x16", height: "x16", }, },
            md: {
                root: { width: "x20", height: "x20", },
                icon: {
                    width: "x9",
                    height: "x9",
                    // `recipes.slots` loses to the Icon recipe's own unlayered
                    // `recipes` rules, so the paired glyph only reaches the 18px
                    // box when this override is important.
                    "& .icon": {
                        fontSize: "{sizes.x9}!",
                        width: "x9!",
                        height: "x9!",
                    },
                },
            },
        },
    },

    defaultVariants: {
        tone: "primary",
        size: "md",
    },
});

export const buttonIconPreset = definePreset({
    name: "@no-launchpad/button-icon",
    theme: {
        slotRecipes: {
            buttonIcon: buttonIconRecipe,
        },
    },
});
