import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ScrollArea, } from "./scroll-area";

describe("scroll area composition", () => {
    test("renders a clipped root and a scrollable viewport", () => {
        const markup = renderToStaticMarkup(
            <ScrollArea>
                <p>Scrollable content line 1</p>
                <p>Scrollable content line 2</p>
            </ScrollArea>,
        );

        expect(markup).toContain("scrollArea__root");
        expect(markup).toContain("scrollArea__viewport");
        expect(markup).toContain("Scrollable content line 1");
        expect(markup).toContain(`tabindex="0"`);
        expect(markup).toContain(`style="max-height:10rem"`);
    });

    test("labels the viewport as a region when a label is supplied", () => {
        const markup = renderToStaticMarkup(
            <ScrollArea label="Release notes">content</ScrollArea>,
        );

        expect(markup).toContain(`role="region"`);
        expect(markup).toContain(`aria-label="Release notes"`);
    });

    test("leaves the viewport unlabelled by default", () => {
        const markup = renderToStaticMarkup(<ScrollArea>content</ScrollArea>);

        expect(markup).not.toContain(`role="region"`);
        expect(markup).not.toContain(`aria-label`);
    });

    test("accepts a custom maximum height", () => {
        const markup = renderToStaticMarkup(
            <ScrollArea maxHeight="20rem">content</ScrollArea>,
        );

        expect(markup).toContain(`style="max-height:20rem"`);
    });

    test("forwards native attributes to the root", () => {
        const markup = renderToStaticMarkup(<ScrollArea data-testid="s" />);

        expect(markup).toContain(`data-testid="s"`);
    });
});
