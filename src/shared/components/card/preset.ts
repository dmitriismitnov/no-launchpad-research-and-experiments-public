import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Fixed Card anatomy; semantic tokens own theme projection.
 *
 * Pen `Card` (ziJHM): a raised surface with a subtle boundary and a 16px
 * radius, a flush 140px sunken media surface and a 16px body with a 10px gap.
 * `Card Plain` (vTMbw) drops the media and keeps the same body. `Card Compact`
 * (XqPjN) drops the media and tightens the body to a 6px gap with `sm`/`xs`
 * type and a `tertiary` description. No variant carries a footer divider.
 */
export const cardRecipe = defineSlotRecipe({
    className: "card",
    slots: [
        "root",
        "media",
        "body",
        "header",
        "title",
        "description",
        "footer",
        "footerPrimary",
        "footerSecondary",
        "actionButton",
    ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x0",
            padding: "x0",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "lg",
            backgroundColor: "semantic.surface.raised",
            // Pen's Card master is clipped, so the flush media follows the
            // rounded corner instead of carrying its own radius.
            overflow: "hidden",
        },

        media: {
            flexShrink: "0",
            width: "100%",
            height: "140px",
            overflow: "hidden",
            backgroundColor: "semantic.surface.sunken",
            color: "semantic.text.tertiary",
            "& > img": {
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
            "& > svg": {
                display: "block",
                width: "100%",
                height: "100%",
            },
        },

        body: {
            display: "flex",
            flexDirection: "column",
            gap: "x5",
            padding: "x8",
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "x6",
            color: "semantic.text.tertiary",
        },

        title: {
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "tight",
            letterSpacing: "tight",
            color: "semantic.text.primary",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },

        // The primary note's auto margin separates it from the trailing group.
        footer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "x5",
        },

        footerPrimary: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            color: "semantic.text.tertiary",
            marginInlineEnd: "auto",
        },

        footerSecondary: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            color: "semantic.text.link",
        },

        actionButton: {
            flexShrink: "0",
        },
    },

    variants: {
        variant: {
            default: {},

            plain: {
                body: { gap: "x5", },
            },

            compact: {
                body: { gap: "x3", },
                title: { fontSize: "sm", },
                description: {
                    fontSize: "xs",
                    color: "semantic.text.tertiary",
                },
            },
        },
    },
});

export const cardPreset = definePreset({
    name: "@no-launchpad/card",
    theme: { slotRecipes: { card: cardRecipe, }, },
});
