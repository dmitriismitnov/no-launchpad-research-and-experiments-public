import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Media Placeholder visual projection. Slots: root / icon / label.
 *
 * A muted 16:9 surface with a centred glyph and an optional caption. The root
 * owns the ratio, so a single placeholder fills any media slot.
 *
 * Pen references the newer role layer (`semantic/surface/sunken`,
 * `semantic/border/subtle`, `semantic/text/*`):
 * - surface/sunken -> common.100.background (light exact; dark one step, the
 *   Skeleton/Spinner convention)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/tertiary -> common.600.background (exact)
 *
 * Approximations: Pen draws a 28px glyph; the Icon sizes top out at `lg` (24px),
 * so the glyph steps down one size. Pen's 8px gap maps to `x4` exactly.
 */
export const mediaPlaceholderRecipe = defineSlotRecipe({
    className: "mediaPlaceholder",
    slots: [ "root", "icon", "label", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "x4",
            width: "100%",
            aspectRatio: "16 / 9",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.100.background",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.600.background",
        },
    },
});

export const mediaPlaceholderPreset = definePreset({
    name: "@no-launchpad/media-placeholder",
    theme: { slotRecipes: { mediaPlaceholder: mediaPlaceholderRecipe, }, },
});
