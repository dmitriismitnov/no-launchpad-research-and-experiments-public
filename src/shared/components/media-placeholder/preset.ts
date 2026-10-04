import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Media Placeholder visual projection (Pen master `SX6Gf`, documentation
 * `vUaGv`). Slots: root / icon / label.
 *
 * A muted 16:9 surface with a centred glyph and an optional caption. The root
 * owns the ratio, so a single placeholder fills any media slot. Pen's
 * `image · video · avatar`, `with ratio` and `with label` variants, the extra
 * `frame` part and the quiet non-content ARIA policy are BLOCKED (new
 * props/parts/behaviour).
 *
 * Resolved Pen roles:
 * - root surface/sunken -> `semantic.surface.sunken`
 * - root boundary border/subtle -> `semantic.border.subtle`
 * - icon text/tertiary -> `semantic.text.tertiary`
 * - label text/tertiary -> `semantic.text.tertiary`
 *
 * Pen's audit reports `focus-indicator 0/0`, so no focus role is projected.
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
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.sunken",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.text.tertiary",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.tertiary",
        },
    },
});

export const mediaPlaceholderPreset = definePreset({
    name: "@no-launchpad/media-placeholder",
    theme: { slotRecipes: { mediaPlaceholder: mediaPlaceholderRecipe, }, },
});
