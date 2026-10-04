import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Avatar visual projection. Slots: root / image / fallback / initials / presence.
 *
 * Pen `q9qgrL` master / `YoSlU` documentation: the round surface paints from the
 * brand role; the optional presence outline reads the raised surface role
 * `surface/raised` and the online presence dot reads `positive/700/background`.
 * The away / busy / offline tones are retained from the prior slice (INFO:
 * `occasional/600`, `negative/600`, `common/600`); the icon fallback, stacked
 * group and disabled/hover/focus semantics documented by Pen are recorded
 * BLOCKED, not implemented here.
 */
export const avatarRecipe = defineSlotRecipe({
    className: "avatar",
    slots: [ "root", "image", "fallback", "initials", "presence", ],

    base: {
        root: {
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            overflow: "hidden",
            borderRadius: "full",
            backgroundColor: "semantic.brand.100.background",
            color: "semantic.brand.100.text",
        },

        image: {
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },

        fallback: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
        },

        initials: {
            fontFamily: "body",
            fontWeight: "semibold",
            lineHeight: "tight",
            letterSpacing: "normal",
        },

        presence: {
            position: "absolute",
            insetBlockEnd: "x2",
            insetInlineEnd: "x2",
            width: "x5",
            height: "x5",
            borderRadius: "full",
            borderWidth: "thick",
            borderStyle: "solid",
            borderColor: "semantic.surface.raised",
        },
    },

    variants: {
        size: {
            sm: { root: { width: "x16", height: "x16", }, initials: { fontSize: "xs", }, },
            md: { root: { width: "x20", height: "x20", }, initials: { fontSize: "sm", }, },
            lg: { root: { width: "x24", height: "x24", }, initials: { fontSize: "md", }, },
        },

        presence: {
            online: { presence: { backgroundColor: "semantic.positive.700.background", }, },
            away: { presence: { backgroundColor: "semantic.occasional.600.background", }, },
            busy: { presence: { backgroundColor: "semantic.negative.600.background", }, },
            offline: { presence: { backgroundColor: "semantic.common.600.background", }, },
        },
    },

    defaultVariants: { size: "md", },
});

export const avatarPreset = definePreset({
    name: "@no-launchpad/avatar",
    theme: { slotRecipes: { avatar: avatarRecipe, }, },
});
