import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Pagination, } from "./pagination";
import { paginationRecipe, } from "./preset";

describe("pagination composition", () => {
    test("renders a labelled navigation landmark with page buttons", () => {
        const markup = renderToStaticMarkup(<Pagination page={2} totalPages={8} />);

        expect(markup).toContain("pagination__root");
        expect(markup).toContain("pagination__item");
        expect(markup).toContain(`<nav`);
        expect(markup).toContain(`aria-label="Pagination"`);
        expect(markup).toContain(`aria-label="Previous page"`);
        expect(markup).toContain(`aria-label="Next page"`);
    });

    test("marks the current page and does not link it", () => {
        const markup = renderToStaticMarkup(<Pagination page={2} totalPages={8} />);

        expect(markup).toContain("pagination__itemCurrent");
        expect(markup).toContain(`aria-current="page"`);
    });

    test("disables previous on the first page", () => {
        const markup = renderToStaticMarkup(<Pagination page={1} totalPages={8} />);
        const previous = markup.match(/<button[^>]*aria-label="Previous page"[^>]*>/)?.[0] ?? "";

        expect(previous).toContain("disabled");
    });

    test("disables next on the last page", () => {
        const markup = renderToStaticMarkup(<Pagination page={8} totalPages={8} />);
        const next = markup.match(/<button[^>]*aria-label="Next page"[^>]*>/)?.[0] ?? "";

        expect(next).toContain("disabled");
    });

    test("inserts ellipses to hide ranges", () => {
        const markup = renderToStaticMarkup(<Pagination page={5} totalPages={8} />);

        expect(markup).toContain("pagination__ellipsis");
        expect(markup).toContain("…");
        expect(markup).toContain(`aria-label="Page 1"`);
        expect(markup).toContain(`aria-label="Page 8"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Pagination page={1} totalPages={1} data-testid="p" />,
        );

        expect(markup).toContain(`data-testid="p"`);
    });

    // Pen `DdvJi` master / `yQPcK` token contract: the focus-visible specimen
    // (`bPKuW`/`LLO1f`) rings `focus/ring`, not the brand fill. Geometry stays
    // the shared 2px ring at offset 0.
    test("paints the shared focus ring role on its controls", () => {
        expect(paginationRecipe.base?.["item"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });
});
