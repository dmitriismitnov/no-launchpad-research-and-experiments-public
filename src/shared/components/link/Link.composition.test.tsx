import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Link, } from "./link";
import { linkRecipe, } from "./preset";

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

    // Pen `QWV5n` accessibility contract `DTTTs`: "External links announce that
    // they leave the site." The glyph stays decorative; an sr-only phrase
    // carries the meaning.
    test("announces that an external link leaves the site", () => {
        const markup = renderToStaticMarkup(
            <Link href="https://example.com" external>Open changelog</Link>,
        );

        expect(markup).toContain("link__visuallyHidden");
        expect(markup).toContain("External link");
        expect(markup).toContain("link__trailingIcon");
        expect(markup).toContain(`aria-hidden="true"`);
    });

    test("does not announce an internal link", () => {
        const markup = renderToStaticMarkup(<Link href="/docs">Docs</Link>);

        expect(markup).not.toContain("link__visuallyHidden");
    });

    // Pen `QWV5n` token contract `Z4EDge`: the focus-indicator row uses
    // `focus/ring`, not the brand fill. Geometry stays the shared 2px ring.
    test("paints the shared focus ring role", () => {
        expect(linkRecipe.base?.["root"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "2px", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
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
