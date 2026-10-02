import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Clipboard, } from "./clipboard";

describe("clipboard composition", () => {
    test("renders the readonly value without a copy button by default", () => {
        const markup = renderToStaticMarkup(<Clipboard value="npm i @nolaunchpad/tokens" />);

        expect(markup).toContain("clipboard__root");
        expect(markup).toContain("clipboard__value");
        expect(markup).toContain("npm i @nolaunchpad/tokens");
        expect(markup).not.toContain("clipboard__copy");
        expect(markup).not.toContain("<button");
    });

    test("renders a labelled copy button when onCopy is provided", () => {
        const markup = renderToStaticMarkup(
            <Clipboard value="npm i" onCopy={() => {}} />,
        );

        expect(markup).toContain("clipboard__copy");
        expect(markup).toContain("<button");
        expect(markup).toContain(`aria-label="Copy"`);
        expect(markup).toContain("icon--size_sm");
    });

    test("accepts a custom copy label", () => {
        const markup = renderToStaticMarkup(
            <Clipboard value="npm i" onCopy={() => {}} copyLabel="Скопировать" />,
        );

        expect(markup).toContain(`aria-label="Скопировать"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Clipboard value="npm i" data-testid="c" />);

        expect(markup).toContain(`data-testid="c"`);
    });
});
