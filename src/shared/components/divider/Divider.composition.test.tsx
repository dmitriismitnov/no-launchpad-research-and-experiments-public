import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Divider, } from "./divider";

describe("divider composition", () => {
    test("renders a horizontal separator by default", () => {
        const markup = renderToStaticMarkup(<Divider />);

        expect(markup).toContain("dividerRule");
        expect(markup).toContain('role="separator"');
        expect(markup).toContain('aria-orientation="horizontal"');
        expect(markup).toContain("dividerRule--orientation_horizontal");
    });

    test("switches to a vertical separator", () => {
        const markup = renderToStaticMarkup(<Divider orientation="vertical" />);

        expect(markup).toContain('aria-orientation="vertical"');
        expect(markup).toContain("dividerRule--orientation_vertical");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Divider data-testid="rule" />);

        expect(markup).toContain(`data-testid="rule"`);
    });
});
