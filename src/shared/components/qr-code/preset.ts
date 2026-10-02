import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * QR Code visual projection. Slots: root / grid / cell / cellFilled.
 *
 * A deterministic placeholder code: a fixed 7x7 module grid painted as a CSS
 * grid of cells. The component does not encode data and ships no QR dependency;
 * the pattern is a visual stand-in, not a scannable code (see the component).
 *
 * Pen references the newer role layer (`semantic/surface/raised`,
 * `semantic/border/subtle`, `semantic/text/primary`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (the Pen module colour)
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
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
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
            backgroundColor: "semantic.common.50.text",
        },
    },
});

export const qrCodePreset = definePreset({
    name: "@no-launchpad/qr-code",
    theme: { slotRecipes: { qrCode: qrCodeRecipe, }, },
});
