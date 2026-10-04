import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Divider, } from "./divider";
import { dividerRecipe, } from "./preset";

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

    // Pen `vZUUG` / `Uyuv7` token contract: the rule already paints the quiet
    // divider role `common/200/divider`, independent of orientation. Regression
    // coverage only — no production change.
    test("paints the divider role", () => {
        expect(dividerRecipe.base).toMatchObject({
            backgroundColor: "semantic.common.200.divider",
        });
    });
});
