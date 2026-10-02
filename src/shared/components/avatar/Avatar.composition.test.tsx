import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Avatar, } from "./avatar";

describe("avatar composition", () => {
    test("falls back to initials derived from the name", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" />);

        expect(markup).toContain("avatar__fallback");
        expect(markup).toContain("avatar__initials");
        expect(markup).toContain("AR");
        expect(markup).toContain('role="img"');
        expect(markup).toContain('aria-label="Alice Ryder"');
    });

    test("lets explicit initials win over the name", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" initials="Q" />);

        expect(markup).toContain(">Q<");
    });

    test("renders the image instead of the fallback when src is set", () => {
        const markup = renderToStaticMarkup(<Avatar src="/alice.png" name="Alice Ryder" />);

        expect(markup).toContain("<img");
        expect(markup).toContain(`src="/alice.png"`);
        expect(markup).toContain(`alt="Alice Ryder"`);
        expect(markup).not.toContain("avatar__fallback");
    });

    test("renders a presence dot for the chosen state", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" presence="online" />);

        expect(markup).toContain("avatar__presence");
        expect(markup).toContain("avatar__presence--presence_online");
    });

    test("applies the size to the root slot", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" size="lg" />);

        expect(markup).toContain("avatar__root--size_lg");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice" data-testid="a" />);

        expect(markup).toContain(`data-testid="a"`);
    });
});
