import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Tag, } from "./tag";

describe("tag composition", () => {
    test("renders the label without a close button by default", () => {
        const markup = renderToStaticMarkup(<Tag label="Design" />);

        expect(markup).toContain("tag__root");
        expect(markup).toContain("tag__label");
        expect(markup).toContain("Design");
        expect(markup).not.toContain("tag__close");
        expect(markup).not.toContain("<button");
    });

    test("renders a dismiss button when onClose is provided", () => {
        const markup = renderToStaticMarkup(<Tag label="Design" onClose={() => {}} />);

        expect(markup).toContain("tag__close");
        expect(markup).toContain("<button");
        expect(markup).toContain(`aria-label="Remove Design"`);
        expect(markup).toContain("icon--size_sm");
    });

    test("accepts a custom close label", () => {
        const markup = renderToStaticMarkup(
            <Tag label="Design" onClose={() => {}} closeLabel="Убрать" />,
        );

        expect(markup).toContain(`aria-label="Убрать"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Tag label="Design" data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });
});
