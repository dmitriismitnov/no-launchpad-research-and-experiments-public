import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { progressRingRecipe, } from "./preset";
import { ProgressRing, } from "./progress-ring";

describe("progress ring composition", () => {
    test("exposes the value as an accessible progressbar", () => {
        const markup = renderToStaticMarkup(<ProgressRing value={60} label="Upload" />);

        expect(markup).toContain("progressRing__root");
        expect(markup).toContain("progressRing__svg");
        expect(markup).toContain("progressRing__track");
        expect(markup).toContain("progressRing__arc");
        expect(markup).toContain(`role="progressbar"`);
        expect(markup).toContain(`aria-valuenow="60"`);
        expect(markup).toContain(`aria-valuemin="0"`);
        expect(markup).toContain(`aria-valuemax="100"`);
        expect(markup).toContain(`aria-label="Upload"`);
    });

    test("draws the arc with a dash offset derived from the value", () => {
        const markup = renderToStaticMarkup(<ProgressRing value={25} />);

        expect(markup).toContain("stroke-dasharray=");
        expect(markup).toContain("stroke-dashoffset=");
    });

    test("sizes the root and the svg from the size prop", () => {
        const markup = renderToStaticMarkup(<ProgressRing value={50} size={64} thickness={6} />);

        expect(markup).toContain("width:64px");
        expect(markup).toContain(`width="64"`);
        expect(markup).toContain(`viewBox="0 0 64 64"`);
    });

    test("clamps values outside the range", () => {
        const markup = renderToStaticMarkup(<ProgressRing value={140} />);

        expect(markup).toContain(`aria-valuenow="100"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<ProgressRing value={10} data-testid="r" />);

        expect(markup).toContain(`data-testid="r"`);
    });

    // Pen `yz7HH` token contract: the track stroke reads `surface/sunken` and
    // the arc stroke `action/primary-bg` (both discriminate in dark only).
    test("paints the sunken track and primary arc strokes", () => {
        expect(progressRingRecipe.base?.["track"]).toMatchObject({
            stroke: "semantic.surface.sunken",
        });
        expect(progressRingRecipe.base?.["arc"]).toMatchObject({
            stroke: "semantic.action.primary.background",
        });
    });
});
