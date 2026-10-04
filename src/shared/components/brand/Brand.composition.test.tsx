import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Brand, } from "./brand";

describe("brand composition", () => {
    test("renders the mark and the default wordmark", () => {
        const markup = renderToStaticMarkup(<Brand />);

        expect(markup).toContain("brand__root");
        expect(markup).toContain("brand__mark");
        expect(markup).toContain("brand__wordmark");
        expect(markup).toContain("No Launchpad");
    });

    test("accepts a custom name", () => {
        const markup = renderToStaticMarkup(<Brand name="Acme" />);

        expect(markup).toContain("Acme");
        expect(markup).not.toContain("No Launchpad");
    });

    test("keeps the mark decorative", () => {
        const markup = renderToStaticMarkup(<Brand />);

        expect(markup).toContain(`aria-hidden="true"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Brand data-testid="b" />);

        expect(markup).toContain(`data-testid="b"`);
    });

    // Pen `MGoSj` is a lockup, not a destination: the root is a span with no
    // link semantics, the mark is decorative, and the wordmark is the only text.
    test("stays a non-interactive lockup", () => {
        const markup = renderToStaticMarkup(<Brand />);

        expect(markup).not.toContain("href");
        expect(markup).not.toContain("tabindex");
        expect(markup).not.toContain('role="link"');
        expect(markup).toContain("brand__mark");
        expect(markup).toContain(`aria-hidden="true"`);
        expect(markup).toContain("No Launchpad");
    });
});
