import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

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
});
