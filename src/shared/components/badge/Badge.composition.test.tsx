import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Badge, } from "./badge";

describe("badge composition", () => {
    test("renders the dot and the label in their slots", () => {
        const markup = renderToStaticMarkup(<Badge label="Active" />);

        expect(markup).toContain("badge__root");
        expect(markup).toContain("badge__dot");
        expect(markup).toContain("badge__label");
        expect(markup).toContain("Active");
    });

    test("omits the dot when withDot is false", () => {
        const markup = renderToStaticMarkup(<Badge label="Active" withDot={false} />);

        expect(markup).not.toContain("badge__dot");
    });

    test("accepts native span attributes", () => {
        const markup = renderToStaticMarkup(<Badge label="New" data-testid="b" />);

        expect(markup).toContain(`data-testid="b"`);
    });
});
