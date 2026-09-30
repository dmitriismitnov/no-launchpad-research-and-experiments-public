import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/** Fixed Card anatomy; semantic tokens own theme projection. */
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
            gap: "x4",
            padding: "x4",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 8px 22px {colors.semantic.shadow.500}",
        },

        media: {
            flexShrink: "0",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: "sm",
            backgroundColor: "semantic.common.200.background",
            color: "semantic.common.500.background",
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
            gap: "x6",
            padding: "x6",
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "x4",
            color: "semantic.common.600.background",
        },

        title: {
            fontFamily: "body",
            fontSize: "lg",
            fontWeight: "semibold",
            lineHeight: "tight",
            letterSpacing: "tight",
            color: "semantic.common.50.text",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "relaxed",
            color: "semantic.common.600.background",
        },

        // The primary note's auto margin separates it from the trailing group.
        footer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "x4",
            borderTopWidth: "thin",
            borderTopStyle: "solid",
            borderTopColor: "semantic.common.200.divider",
            paddingTop: "x6",
        },

        footerPrimary: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            color: "semantic.common.50.text",
            marginInlineEnd: "auto",
        },

        footerSecondary: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            color: "semantic.common.600.background",
        },

        actionButton: {
            flexShrink: "0",
        },
    },
});

export const cardPreset = definePreset({
    name: "@no-launchpad/card",
    theme: { slotRecipes: { card: cardRecipe, }, },
});
