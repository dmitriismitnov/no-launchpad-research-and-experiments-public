import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { statisticRecipe, } from "./preset";
import { Statistic, } from "./statistic";

describe("statistic composition", () => {
    test("renders the label and value in their slots", () => {
        const markup = renderToStaticMarkup(<Statistic label="Revenue" value="48.2K" />);

        expect(markup).toContain("statistic__root");
        expect(markup).toContain("statistic__label");
        expect(markup).toContain("statistic__value");
        expect(markup).toContain("Revenue");
        expect(markup).toContain("48.2K");
    });

    test("renders the delta line with an optional glyph", () => {
        const markup = renderToStaticMarkup(
            <Statistic
                label="Revenue"
                value="48.2K"
                delta="+12.4% vs last week"
                deltaIcon="trending-up"
            />,
        );

        expect(markup).toContain("statistic__delta");
        expect(markup).toContain("statistic__deltaText");
        expect(markup).toContain("statistic__deltaIcon");
        expect(markup).toContain("+12.4% vs last week");
        expect(markup).toContain("icon--size_sm");
    });

    test("omits the delta when empty", () => {
        const markup = renderToStaticMarkup(
            <Statistic label="Revenue" value="48.2K" delta="   " />,
        );

        expect(markup).not.toContain("statistic__delta");
    });

    test("paints the value from the tone", () => {
        const markup = renderToStaticMarkup(
            <Statistic label="Errors" value="12" tone="negative" />,
        );

        expect(markup).toContain("statistic__value--tone_negative");
    });

    test("paints the delta from the trend", () => {
        const markup = renderToStaticMarkup(
            <Statistic label="Revenue" value="48.2K" delta="+12%" trend="up" />,
        );

        expect(markup).toContain("statistic__delta--trend_up");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Statistic label="Revenue" value="48.2K" data-testid="s" />,
        );

        expect(markup).toContain(`data-testid="s"`);
    });

    // Pen `CjnzL` master / `gLCov` documentation / `FMXaz` anatomy: label
    // `text/tertiary`, value `text/primary`, delta glyph `text/secondary` and
    // delta copy `text/primary`. The delta glyph/copy roles discriminate in
    // both themes; label/value are value-equal role renames (regression,
    // asserted not claimed as RED).
    test("paints the label, value and delta roles", () => {
        const base = statisticRecipe.base as Record<string, unknown>;

        expect(base["label"]).toMatchObject({ color: "semantic.text.tertiary", });
        expect(base["value"]).toMatchObject({ color: "semantic.text.primary", });
        expect(base["deltaIcon"]).toMatchObject({ color: "semantic.text.secondary", });
        expect(base["deltaText"]).toMatchObject({ color: "semantic.text.primary", });
    });

    // Pen `gLCov` state contract: `positive delta` / `negative delta` resolve
    // `feedback/positive-fg` / `feedback/negative-fg` on the glyph and copy.
    // Those named feedback roles are BLOCKED in the Foundation; the value-equal
    // `positive|negative.700.background` matrix roles are used instead.
    test("paints the up and down trend roles on the delta glyph and copy", () => {
        const trend = statisticRecipe.variants?.["trend"] as Record<string, unknown> | undefined;

        expect(trend?.["up"]).toMatchObject({
            deltaIcon: { color: "semantic.positive.700.background", },
            deltaText: { color: "semantic.positive.700.background", },
        });
        expect(trend?.["down"]).toMatchObject({
            deltaIcon: { color: "semantic.negative.700.background", },
            deltaText: { color: "semantic.negative.700.background", },
        });
    });
});
