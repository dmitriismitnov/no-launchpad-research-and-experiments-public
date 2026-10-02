import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Splitter, } from "./splitter";

describe("splitter composition", () => {
    test("renders both panes around a separator with a grip", () => {
        const markup = renderToStaticMarkup(<Splitter start="Editor" end="Preview" />);

        expect(markup).toContain("splitter__root");
        expect(markup).toContain("splitter__paneStart");
        expect(markup).toContain("splitter__paneEnd");
        expect(markup).toContain("splitter__handle");
        expect(markup).toContain("splitter__grip");
        expect(markup).toContain("Editor");
        expect(markup).toContain("Preview");
        expect(markup).toContain(`role="separator"`);
    });

    test("uses a vertical divider for the default horizontal split", () => {
        const markup = renderToStaticMarkup(<Splitter start="A" end="B" />);

        expect(markup).toContain(`aria-orientation="vertical"`);
        expect(markup).toContain("splitter__root--orientation_horizontal");
        expect(markup).not.toContain("splitter__root--orientation_vertical");
    });

    test("stacks the panes and flips the divider in the vertical split", () => {
        const markup = renderToStaticMarkup(
            <Splitter orientation="vertical" start="Top" end="Bottom" />,
        );

        expect(markup).toContain(`aria-orientation="horizontal"`);
        expect(markup).toContain("splitter__root--orientation_vertical");
        expect(markup).toContain("Top");
        expect(markup).toContain("Bottom");
    });

    test("hides the decorative grip from assistive technology", () => {
        const markup = renderToStaticMarkup(<Splitter start="A" end="B" />);

        expect(markup).toContain(`aria-hidden="true"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Splitter start="A" end="B" data-testid="split" />,
        );

        expect(markup).toContain(`data-testid="split"`);
    });
});
