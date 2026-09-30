import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Card visual projection.
 * Anatomy, public variants and all visual rules live together.
 * Slots: root / media / body / header / title / description / footer /
 *        footerPrimary / footerSecondary / actionButton.
 *
 * `Card / Catalog` in the PEN design system is the visual source. The card is a
 * single static surface: one light fill, a hairline divider, a surface radius
 * and a soft shadow. There are deliberately no public `tone` or `size`
 * variants in v1.
 *
 * Colours come from the semantic layer, which switches theme inside the token;
 * the recipe does not branch on `_light` / `_dark`.
 *
 * Colour is assigned per slot, never on `root`: text slots paint from the
 * semantic `.text` / `.icon` / `.background` projections the reference uses, so
 * `root` keeps only what belongs to the card as a whole (fill, border, radius,
 * shadow).
 *
 * Note on muted text: the semantic layer has no dedicated "quiet on surface"
 * text role. The PEN reference resolves muted text (the header marker, the
 * description, the footer secondary note) with `common.<step>.background`
 * projections, and this recipe mirrors that mapping rather than inventing a new
 * role. See the experiment's design notes.
 *
 * Typography is composed per text slot from atomic foundation tokens (family,
 * size, weight, line height, tracking); `root` owns none of it.
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
            gap: "x4",
            padding: "x4",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 8px 22px {colors.semantic.shadow.500}",
        },

        // The media slot is always present. `color` is the skeleton's paint:
        // the asset is monochrome `currentColor`, so the slot drives both the
        // tile fill and the glyph tone.
        media: {
            flexShrink: "0",
            width: "full",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: "sm",
            backgroundColor: "semantic.common.200.background",
            color: "semantic.common.500.background",
            "& > img": {
                display: "block",
                width: "full",
                height: "full",
                objectFit: "cover",
            },
            "& > svg": {
                display: "block",
                width: "full",
                height: "full",
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
            justifyContent: "space_between",
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

        // A top divider only: the card's own border already draws the sides.
        footer: {
            display: "flex",
            justifyContent: "space_between",
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
        },

        footerSecondary: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            color: "semantic.common.600.background",
        },

        // Pushed to the trailing edge so an action-only footer still anchors
        // the button right, and a notes-plus-action footer keeps the button
        // detached from the note pair.
        actionButton: {
            flexShrink: "0",
            marginInlineStart: "auto",
        },
    },
});

export const cardPreset = definePreset({
    name: "@no-launchpad/card",
    theme: { slotRecipes: { card: cardRecipe, }, },
});
