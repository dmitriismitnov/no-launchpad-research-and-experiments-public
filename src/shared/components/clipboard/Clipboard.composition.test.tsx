import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Clipboard, } from "./clipboard";
import { clipboardRecipe, } from "./preset";

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

    // Pen `Jfhu9` master / `wsiFp` documentation: root fill `surface/sunken`
    // with a `border/subtle` boundary, value `text/primary`, copy control
    // `text/secondary` and a 2px outer `focus/ring` on the copy control. The
    // confirmation/error icons and the error/copied/hover states are BLOCKED
    // (no public props; no `feedback/*` Foundation roles).
    test("paints the sunken surface, subtle boundary and copy roles", () => {
        const root = clipboardRecipe.base?.["root"] as Record<string, unknown> | undefined;
        const value = clipboardRecipe.base?.["value"] as Record<string, unknown> | undefined;
        const copy = clipboardRecipe.base?.["copy"] as Record<string, unknown> | undefined;

        expect(root).toMatchObject({
            backgroundColor: "semantic.surface.sunken",
            borderColor: "semantic.border.subtle",
        });
        expect(value?.["color"]).toBe("semantic.text.primary");
        expect(copy?.["color"]).toBe("semantic.text.secondary");
        expect(copy?.["outlineWidth"]).toMatchObject({ _focusVisible: "{borderWidths.thick}", });
        expect(copy?.["outlineColor"]).toMatchObject({ _focusVisible: "semantic.focus.ring", });
    });
});
