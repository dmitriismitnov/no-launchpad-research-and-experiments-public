import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { StatusIndicator, } from "./status-indicator";

describe("status indicator composition", () => {
    test("renders the dot and the label in their slots", () => {
        const markup = renderToStaticMarkup(<StatusIndicator label="Online" />);

        expect(markup).toContain("statusIndicator__root");
        expect(markup).toContain("statusIndicator__dot");
        expect(markup).toContain("statusIndicator__label");
        expect(markup).toContain("Online");
    });

    test("paints the dot from the tone", () => {
        const markup = renderToStaticMarkup(<StatusIndicator label="Online" tone="positive" />);

        expect(markup).toContain("statusIndicator__dot--tone_positive");
    });

    test("accepts native span attributes", () => {
        const markup = renderToStaticMarkup(<StatusIndicator label="Online" data-testid="s" />);

        expect(markup).toContain(`data-testid="s"`);
    });
});
