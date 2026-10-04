import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Button, } from "@shared/components/button";

import { sheetRecipe, } from "./preset";
import { Sheet, } from "./sheet";

describe("sheet composition", () => {
    test("renders a bottom surface with a title, body and actions", () => {
        const markup = renderToStaticMarkup(
            <Sheet
                title="Share project"
                description="Anyone with the link can view it."
                actions={<Button>Copy link</Button>}
                defaultOpen
            >
                <p>Extra body</p>
            </Sheet>,
        );

        expect(markup).toContain("sheet__root");
        expect(markup).toContain("sheet__overlay");
        expect(markup).toContain("sheet__panel");
        expect(markup).toContain("sheet__header");
        expect(markup).toContain("sheet__title");
        expect(markup).toContain("sheet__close");
        expect(markup).toContain("sheet__body");
        expect(markup).toContain("sheet__description");
        expect(markup).toContain("sheet__footer");
        expect(markup).toContain("Share project");
        expect(markup).toContain("Anyone with the link can view it.");
        expect(markup).toContain("Extra body");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-modal="true"`);
    });

    test("applies the side variant to the panel", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" side="right" defaultOpen />);

        expect(markup).toContain("sheet__panel--side_right");
    });

    test("draws the grabber only when handle is set", () => {
        const withHandle = renderToStaticMarkup(<Sheet title="Share" handle defaultOpen />);
        const withoutHandle = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(withHandle).toContain("sheet__handle");
        expect(withoutHandle).not.toContain("sheet__handle");
    });

    test("omits the panel while closed", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" trigger="Open" />);

        expect(markup).toContain("sheet__root");
        expect(markup).not.toContain("sheet__panel");
        expect(markup).not.toContain(`role="dialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" open={false} />);

        expect(markup).not.toContain("sheet__panel");
    });

    test("omits the scrim when withScrim is false", () => {
        const markup = renderToStaticMarkup(
            <Sheet title="Share" withScrim={false} defaultOpen />,
        );

        expect(markup).toContain("sheet__panel");
        expect(markup).not.toContain("sheet__overlay");
        expect(markup).not.toContain(`aria-modal="true"`);
    });

    test("omits the body when there is no description or children", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(markup).not.toContain("sheet__body");
        expect(markup).not.toContain("sheet__description");
    });

    test("omits the footer when there are no actions", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(markup).not.toContain("sheet__footer");
    });

    test("renders a close control with an accessible name", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(markup).toContain(`aria-label="Close"`);
        expect(markup).toContain("autofocus");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" data-testid="s" />);

        expect(markup).toContain(`data-testid="s"`);
    });

    // Pen Sheet token contract: the trigger and close focus indicators resolve
    // `focus/ring`, not the brand fill. The light role discriminates; dark is
    // non-discriminating and is not claimed.
    test("paints the shared focus ring role on the trigger and close", () => {
        for ( const slot of [ "trigger", "close", ] ) {
            expect(sheetRecipe.base?.[slot]).toMatchObject({
                outlineColor: { _focusVisible: "semantic.focus.ring", },
            });
        }
    });

    // Pen Sheet token contract: the panel resolves `surface/overlay` and the
    // `border/subtle` structural boundary. Both discriminate in each theme.
    test("resolves the panel surface roles", () => {
        expect(sheetRecipe.base?.["panel"]).toMatchObject({
            backgroundColor: "semantic.surface.overlay",
            borderColor: "semantic.border.subtle",
        });
    });

    // Pen Sheet token contract: the grabber resolves the `border/strong`
    // functional boundary. The dark role discriminates (neutral.500 ->
    // neutral.400); the light role is value-equivalent (neutral.500 both).
    test("resolves the handle boundary role", () => {
        expect(sheetRecipe.base?.["handle"]).toMatchObject({
            backgroundColor: "semantic.border.strong",
        });
    });

    // Pen Sheet: the named content roles (`text/primary`, `text/secondary`,
    // `text/tertiary`) are value-equivalent to the previous common step ramp.
    test("resolves the named text roles", () => {
        expect(sheetRecipe.base?.["title"]).toMatchObject({ color: "semantic.text.primary", });
        expect(sheetRecipe.base?.["description"]).toMatchObject({
            color: "semantic.text.secondary",
        });
        expect(sheetRecipe.base?.["close"]).toMatchObject({ color: "semantic.text.tertiary", });
    });
});
