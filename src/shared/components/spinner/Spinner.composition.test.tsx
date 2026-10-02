import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Spinner, } from "./spinner";

describe("spinner composition", () => {
    test("renders the loader glyph and is decorative by default", () => {
        const markup = renderToStaticMarkup(<Spinner />);

        expect(markup).toContain("spinner");
        expect(markup).toContain("icon--size_lg");
        expect(markup).toContain('aria-hidden="true"');
        expect(markup).not.toContain('role="status"');
    });

    test("exposes a status role when labelled", () => {
        const markup = renderToStaticMarkup(<Spinner label="Loading" />);

        expect(markup).toContain('role="status"');
        expect(markup).toContain('aria-label="Loading"');
        // Only the inner glyph stays decorative; the wrapper carries the status.
        expect(markup).not.toContain('class="spinner" aria-hidden');
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Spinner data-testid="spin" />);

        expect(markup).toContain(`data-testid="spin"`);
    });
});
