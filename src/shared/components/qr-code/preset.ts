import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * QR Code visual projection (Pen master `kQTMg`, documentation `dF7N0`). Slots:
 * root / grid / cell / cellFilled.
 *
 * A deterministic placeholder code: a fixed 7x7 module grid painted as a CSS
 * grid of cells. The component does not encode data and ships no QR dependency;
 * the pattern is a visual stand-in, not a scannable code (see the component).
 * Pen's `size: sm · md · lg`, `with caption` and `with logo` variants, the extra
 * `caption` part and the "encodes a short value" generation policy are BLOCKED
 * (new props, an encoder dependency and a generation policy).
 *
 * Resolved Pen roles:
 * - root surface/raised -> `semantic.surface.raised`
 * - root boundary border/subtle -> `semantic.border.subtle`
 * - modules text/primary -> `semantic.text.primary`
 *
 * Pen's audit reports `focus-indicator 0/0`, so no focus role is projected.
 *
 * Approximations: Pen spaces modules 3px and pads the surface 8px; the scale has
 * no `x1.5`, so the grid gap is `x1` (2px) and the padding is `x4` (8px, exact).
 * Pen's surface is 84px wide with an auto height; the component renders a fixed
 * square so the placeholder has a stable footprint.
 */
export const qrCodeRecipe = defineSlotRecipe({
    className: "qrCode",
    slots: [ "root", "grid", "cell", "cellFilled", ],

    base: {
        root: {
            width: "84px",
            height: "84px",
            padding: "x4",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.raised",
        },

        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(7, 1fr)",
            gap: "x1",
            width: "100%",
            height: "100%",
        },

        cell: {
            backgroundColor: "transparent",
        },

        cellFilled: {
            backgroundColor: "semantic.text.primary",
        },
    },
});

export const qrCodePreset = definePreset({
    name: "@no-launchpad/qr-code",
    theme: { slotRecipes: { qrCode: qrCodeRecipe, }, },
});
