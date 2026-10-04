import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { AlertDialog, } from "./alert-dialog";
import { alertDialogRecipe, } from "./preset";

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

    // Pen Alert Dialog token contract: the trigger, close, cancel and confirm
    // focus indicators resolve `focus/ring`, not the brand fill. The light role
    // discriminates; dark is non-discriminating and is not claimed.
    test("paints the shared focus ring role on the trigger, close, cancel and confirm", () => {
        for ( const slot of [ "trigger", "close", "cancel", "confirm", ] ) {
            expect(alertDialogRecipe.base?.[slot]).toMatchObject({
                outlineColor: { _focusVisible: "semantic.focus.ring", },
            });
        }
    });

    // Pen Alert Dialog token contract: the modal surface resolves
    // `surface/overlay` and the `border/subtle` structural boundary. Both
    // discriminate in each theme.
    test("resolves the modal surface roles", () => {
        expect(alertDialogRecipe.base?.["surface"]).toMatchObject({
            backgroundColor: "semantic.surface.overlay",
            borderColor: "semantic.border.subtle",
        });
    });

    // Pen Alert Dialog: the cancel action is the quieter secondary control
    // (`action/secondary-*`). The dark border and hover discriminate; the light
    // border discriminates (neutral.700 -> neutral.500).
    test("resolves the secondary cancel action roles", () => {
        expect(alertDialogRecipe.base?.["cancel"]).toMatchObject({
            borderColor: "semantic.action.secondary.border",
            color: "semantic.action.secondary.foreground",
            backgroundColor: { _hover: "semantic.action.secondary.hover", },
        });
    });

    // Pen Alert Dialog: the destructive confirm action resolves
    // `action/danger-bg` + `action/danger-fg`. The dark pair discriminates
    // (red.400 -> red.600 fill; red.950 -> white text); light fill is
    // non-discriminating (red.600 both) and is not claimed.
    test("resolves the destructive confirm action roles", () => {
        expect(alertDialogRecipe.variants?.["destructive"]?.["true"]?.["confirm"]).toMatchObject({
            backgroundColor: "semantic.action.danger.background",
            color: "semantic.action.danger.foreground",
        });
    });

    // Pen Alert Dialog: the named content roles (`text/primary`,
    // `text/secondary`, `text/tertiary`) are value-equivalent to the previous
    // common step ramp.
    test("resolves the named text roles", () => {
        expect(alertDialogRecipe.base?.["title"]).toMatchObject({ color: "semantic.text.primary", });
        expect(alertDialogRecipe.base?.["description"]).toMatchObject({
            color: "semantic.text.secondary",
        });
        expect(alertDialogRecipe.base?.["close"]).toMatchObject({ color: "semantic.text.tertiary", });
    });
});
