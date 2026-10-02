import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { TopNavigation, } from "./top-navigation";

describe("top navigation composition", () => {
    test("renders the brand and spacer regions", () => {
        const markup = renderToStaticMarkup(<TopNavigation brand={<span>Brand</span>} />);

        expect(markup).toContain("topNavigation__root");
        expect(markup).toContain("topNavigation__brand");
        expect(markup).toContain("topNavigation__spacer");
        expect(markup).toContain("<header");
        expect(markup).toContain("Brand");
    });

    test("renders the nav and actions slots when provided", () => {
        const markup = renderToStaticMarkup(
            <TopNavigation
                brand={<span>Brand</span>}
                nav={<a href="/">Overview</a>}
                actions={<button type="button">Sign in</button>}
            />,
        );

        expect(markup).toContain("topNavigation__nav");
        expect(markup).toContain("topNavigation__actions");
        expect(markup).toContain("<nav");
        expect(markup).toContain("Overview");
        expect(markup).toContain("Sign in");
    });

    test("omits the nav and actions slots when not provided", () => {
        const markup = renderToStaticMarkup(<TopNavigation brand={<span>Brand</span>} />);

        expect(markup).not.toContain("topNavigation__nav");
        expect(markup).not.toContain("topNavigation__actions");
    });

    test("keeps the boundary without a fill in transparent mode", () => {
        const markup = renderToStaticMarkup(
            <TopNavigation brand={<span>Brand</span>} surface="transparent" />,
        );

        expect(markup).toContain("topNavigation__root--surface_transparent");
        expect(markup).toContain("topNavigation__root");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <TopNavigation brand={<span>Brand</span>} data-testid="tn" />,
        );

        expect(markup).toContain(`data-testid="tn"`);
    });
});
