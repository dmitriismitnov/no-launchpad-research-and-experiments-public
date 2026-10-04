import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { progressRecipe, } from "./preset";
import { Progress, } from "./progress";

describe("progress composition", () => {
    test("exposes the value as an accessible progressbar", () => {
        const markup = renderToStaticMarkup(<Progress value={60} label="Upload" />);

        expect(markup).toContain("progress__root");
        expect(markup).toContain("progress__track");
        expect(markup).toContain("progress__fill");
        expect(markup).toContain(`role="progressbar"`);
        expect(markup).toContain(`aria-valuenow="60"`);
        expect(markup).toContain(`aria-valuemin="0"`);
        expect(markup).toContain(`aria-valuemax="100"`);
        expect(markup).toContain(`aria-label="Upload"`);
    });

    test("paints the fill width from the value", () => {
        const markup = renderToStaticMarkup(<Progress value={25} />);

        expect(markup).toContain("width:25%");
    });

    test("supports a custom max", () => {
        const markup = renderToStaticMarkup(<Progress value={3} max={4} />);

        expect(markup).toContain(`aria-valuemax="4"`);
        expect(markup).toContain("width:75%");
    });

    test("clamps values outside the range", () => {
        const high = renderToStaticMarkup(<Progress value={140} />);
        const low = renderToStaticMarkup(<Progress value={-10} />);

        expect(high).toContain(`aria-valuenow="100"`);
        expect(high).toContain("width:100%");
        expect(low).toContain(`aria-valuenow="0"`);
        expect(low).toContain("width:0%");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Progress value={10} data-testid="p" />);

        expect(markup).toContain(`data-testid="p"`);
    });

    // Pen `tTGQi` token contract: the track reads `surface/sunken` and the fill
    // `action/primary-bg` (both discriminate in dark); the `full` radius is
    // value-equal to the prior literal.
    test("paints the sunken track and primary fill", () => {
        expect(progressRecipe.base?.["track"]).toMatchObject({
            backgroundColor: "semantic.surface.sunken",
            borderRadius: "full",
        });
        expect(progressRecipe.base?.["fill"]).toMatchObject({
            backgroundColor: "semantic.action.primary.background",
            borderRadius: "full",
        });
    });
});
