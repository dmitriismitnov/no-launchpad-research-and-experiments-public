import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { AlertDialog, } from "./alert-dialog";

describe("alert dialog composition", () => {
    test("renders a modal alertdialog with icon, copy and actions", () => {
        const markup = renderToStaticMarkup(
            <AlertDialog
                title="Delete component?"
                description="This action cannot be undone."
                confirmLabel="Delete"
                defaultOpen
            />,
        );

        expect(markup).toContain("alertDialog__root");
        expect(markup).toContain("alertDialog__overlay");
        expect(markup).toContain("alertDialog__surface");
        expect(markup).toContain("alertDialog__header");
        expect(markup).toContain("alertDialog__icon");
        expect(markup).toContain("alertDialog__title");
        expect(markup).toContain("alertDialog__close");
        expect(markup).toContain("alertDialog__body");
        expect(markup).toContain("alertDialog__description");
        expect(markup).toContain("alertDialog__footer");
        expect(markup).toContain("alertDialog__cancel");
        expect(markup).toContain("alertDialog__confirm");
        expect(markup).toContain("Delete component?");
        expect(markup).toContain("Delete");
        expect(markup).toContain("Cancel");
        expect(markup).toContain(`role="alertdialog"`);
        expect(markup).toContain(`aria-modal="true"`);
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(
            <AlertDialog title="Delete component?" trigger="Open" />,
        );

        expect(markup).toContain("alertDialog__root");
        expect(markup).not.toContain("alertDialog__surface");
        expect(markup).not.toContain(`role="alertdialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <AlertDialog title="Delete component?" open={false} />,
        );

        expect(markup).not.toContain("alertDialog__surface");
    });

    test("applies the destructive variant to the confirm action", () => {
        const markup = renderToStaticMarkup(
            <AlertDialog title="Delete component?" destructive confirmLabel="Delete" defaultOpen />,
        );

        expect(markup).toContain("alertDialog__confirm--destructive_true");
    });

    test("focuses the safer cancel action", () => {
        const markup = renderToStaticMarkup(<AlertDialog title="Delete component?" defaultOpen />);

        expect(markup).toMatch(/alertDialog__cancel[^>]*autofocus/);
    });

    test("omits the body when there is no description or children", () => {
        const markup = renderToStaticMarkup(<AlertDialog title="Delete component?" defaultOpen />);

        expect(markup).not.toContain("alertDialog__body");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<AlertDialog title="Delete component?" data-testid="a" />);

        expect(markup).toContain(`data-testid="a"`);
    });
});
