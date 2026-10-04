import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { toastRecipe, } from "./preset";
import { Toast, } from "./toast";

describe("toast composition", () => {
    test("renders the copy as a polite status region", () => {
        const markup = renderToStaticMarkup(
            <Toast title="Saved" description="Your changes are live." />,
        );

        expect(markup).toContain("toast__root");
        expect(markup).toContain("toast__content");
        expect(markup).toContain("toast__title");
        expect(markup).toContain("toast__body");
        expect(markup).toContain("Saved");
        expect(markup).toContain("Your changes are live.");
        expect(markup).toContain(`role="status"`);
        expect(markup).toContain(`aria-live="polite"`);
    });

    test("omits the body when the description is empty", () => {
        const markup = renderToStaticMarkup(<Toast title="Saved" description="  " />);

        expect(markup).not.toContain("toast__body");
    });

    test("renders the optional icon", () => {
        const markup = renderToStaticMarkup(<Toast title="Saved" icon="check" />);

        expect(markup).toContain("toast__icon");
    });

    test("omits the icon when none is provided", () => {
        const markup = renderToStaticMarkup(<Toast title="Saved" />);

        expect(markup).not.toContain("toast__icon");
    });

    test("renders the optional action", () => {
        const markup = renderToStaticMarkup(
            <Toast title="Saved" action={{ label: "Undo", onClick: () => {}, }} />,
        );

        expect(markup).toContain("toast__action");
        expect(markup).toContain("Undo");
    });

    test("omits the action when none is provided", () => {
        const markup = renderToStaticMarkup(<Toast title="Saved" />);

        expect(markup).not.toContain("toast__action");
    });

    test("renders a dismiss button with an accessible name", () => {
        const markup = renderToStaticMarkup(<Toast title="Saved" onDismiss={() => {}} />);

        expect(markup).toContain("toast__dismiss");
        expect(markup).toContain(`aria-label="Dismiss Saved"`);
    });

    test("applies the tone to the root slot", () => {
        const markup = renderToStaticMarkup(<Toast title="Failed" tone="negative" />);

        expect(markup).toContain("toast__root--tone_negative");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Toast title="Saved" data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });

    // Pen `F1P1XX` token contract: the overlay surface, subtle boundary and the
    // text/link action are the discriminating roles; title/body/dismiss are
    // value-equal role renames asserted as regression.
    test("paints the overlay surface, subtle boundary and copy roles", () => {
        expect(toastRecipe.base?.["root"]).toMatchObject({
            backgroundColor: "semantic.surface.overlay",
            borderColor: "semantic.border.subtle",
        });
        expect(toastRecipe.base?.["action"]).toMatchObject({ color: "semantic.text.link", });
        expect(toastRecipe.base?.["title"]).toMatchObject({ color: "semantic.text.primary", });
        expect(toastRecipe.base?.["body"]).toMatchObject({ color: "semantic.text.secondary", });
        expect(toastRecipe.base?.["dismiss"]).toMatchObject({ color: "semantic.text.tertiary", });
    });
});
