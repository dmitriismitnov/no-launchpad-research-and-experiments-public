import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Link, } from "./link";

describe("link composition", () => {
    test("renders an anchor with the label slot", () => {
        const markup = renderToStaticMarkup(<Link href="/docs">Read the docs</Link>);

        expect(markup).toContain("link__root");
        expect(markup).toContain("link__label");
        expect(markup).toContain("Read the docs");
        expect(markup).toContain(`href="/docs"`);
        expect(markup).toContain("<a");
        expect(markup).toContain("link__root--tone_link");
        expect(markup).toContain("link__root--underline_hover");
    });

    test("switches tone and underline through variants", () => {
        const markup = renderToStaticMarkup(
            <Link href="/docs" tone="subtle" underline="always">Subtle</Link>,
        );

        expect(markup).toContain("link__root--tone_subtle");
        expect(markup).toContain("link__root--underline_always");
    });

    test("renders a leading glyph when requested", () => {
        const markup = renderToStaticMarkup(
            <Link href="/docs" leadingIcon="file">Docs</Link>,
        );

        expect(markup).toContain("link__leadingIcon");
        expect(markup).toContain("icon--size_sm");
    });

    test("renders the external glyph through the shorthand", () => {
        const markup = renderToStaticMarkup(
            <Link href="https://example.com" external>Open changelog</Link>,
        );

        expect(markup).toContain("link__trailingIcon");
    });

    test("omits glyph slots by default", () => {
        const markup = renderToStaticMarkup(<Link href="/">Plain</Link>);

        expect(markup).not.toContain("link__leadingIcon");
        expect(markup).not.toContain("link__trailingIcon");
    });

    test("marks a disabled link and removes it from the tab order", () => {
        const markup = renderToStaticMarkup(<Link href="/" disabled>Disabled</Link>);

        expect(markup).toContain(`aria-disabled="true"`);
        expect(markup).toContain(`tabindex="-1"`);
        expect(markup).toContain("link__root--disabled_true");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Link href="/" data-testid="l">Docs</Link>);

        expect(markup).toContain(`data-testid="l"`);
    });
});
