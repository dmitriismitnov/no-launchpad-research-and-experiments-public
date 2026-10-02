import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Skeleton, } from "./skeleton";

describe("skeleton composition", () => {
    test("renders a hidden placeholder with the recipe class", () => {
        const markup = renderToStaticMarkup(<Skeleton />);

        expect(markup).toContain("skeleton");
        expect(markup).toContain('aria-hidden="true"');
    });

    test("lets the consumer set the box through native attributes", () => {
        const markup = renderToStaticMarkup(
            <Skeleton style={{ width: "12rem", height: "1rem", }} data-testid="line" />,
        );

        expect(markup).toContain("width:12rem");
        expect(markup).toContain(`data-testid="line"`);
    });

    test("merges an external className", () => {
        const markup = renderToStaticMarkup(<Skeleton className="consumer" />);

        expect(markup).toContain("consumer");
        expect(markup).toContain("skeleton");
    });
});
