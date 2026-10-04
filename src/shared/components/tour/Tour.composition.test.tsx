import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { tourRecipe, } from "./preset";
import { Tour, } from "./tour";

const steps = [
    { title: "Welcome", body: "Start with an overview.", },
    { title: "Compose from tokens", body: "Every component reads the foundation.", },
    { title: "Ship it", body: "Publish when you are ready.", },
] as const;

describe("tour composition", () => {
    test("renders a step bubble with a counter, dots and actions", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} defaultStep={1} defaultOpen />,
        );

        expect(markup).toContain("tour__root");
        expect(markup).toContain("tour__surface");
        expect(markup).toContain("tour__content");
        expect(markup).toContain("tour__step");
        expect(markup).toContain("tour__title");
        expect(markup).toContain("tour__body");
        expect(markup).toContain("tour__footer");
        expect(markup).toContain("tour__dots");
        expect(markup).toContain("tour__dot");
        expect(markup).toContain("tour__back");
        expect(markup).toContain("tour__next");
        expect(markup).toContain("tour__close");
        expect(markup).toContain("Step 2 of 3");
        expect(markup).toContain("Compose from tokens");
        expect(markup).toContain("Every component reads the foundation.");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-label="Product tour"`);
    });

    test("marks the current dot with the current variant", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} defaultStep={1} defaultOpen />,
        );

        expect(markup).toContain("tour__dot--current_true");
    });

    test("disables Back on the first step", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} defaultOpen />);

        expect(markup).toContain("disabled");
    });

    test("labels the final action as Finish", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} defaultStep={2} defaultOpen />,
        );

        expect(markup).toContain("Finish");
        expect(markup).toContain("Step 3 of 3");
    });

    test("omits the skip control when not skippable", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} skippable={false} defaultOpen />,
        );

        expect(markup).not.toContain("tour__close");
        expect(markup).not.toContain(`aria-label="Skip tour"`);
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} trigger="Start" />);

        expect(markup).toContain("tour__root");
        expect(markup).not.toContain("tour__surface");
        expect(markup).not.toContain(`role="dialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} open={false} />);

        expect(markup).not.toContain("tour__surface");
    });

    test("applies the placement variant to the surface", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} placement="right" defaultOpen />,
        );

        expect(markup).toContain("tour__surface--placement_right");
    });

    test("renders nothing when there are no steps", () => {
        const markup = renderToStaticMarkup(<Tour steps={[]} defaultOpen />);

        expect(markup).toContain("tour__root");
        expect(markup).not.toContain("tour__surface");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });

    // Pen Tour token contract: the trigger, back, next and close focus
    // indicators resolve `focus/ring`, not the brand fill. The light role
    // discriminates; dark is non-discriminating and is not claimed.
    test("paints the shared focus ring role on the trigger, back, next and close", () => {
        for ( const slot of [ "trigger", "back", "next", "close", ] ) {
            expect(tourRecipe.base?.[slot]).toMatchObject({
                outlineColor: { _focusVisible: "semantic.focus.ring", },
            });
        }
    });

    // Pen Tour token contract: the bubble resolves `surface/overlay` and the
    // `border/subtle` structural boundary, and the footer separator resolves the
    // same boundary. All discriminate in each theme.
    test("resolves the bubble surface and footer boundary roles", () => {
        expect(tourRecipe.base?.["surface"]).toMatchObject({
            backgroundColor: "semantic.surface.overlay",
            borderColor: "semantic.border.subtle",
        });
        expect(tourRecipe.base?.["footer"]).toMatchObject({
            borderTopColor: "semantic.border.subtle",
        });
    });

    // Pen Tour token contract: the inactive dots resolve the `border/strong`
    // boundary and the current dot resolves `action/primary-bg`. The dark roles
    // discriminate (neutral.500 -> neutral.400; green.300 -> green.700); the
    // light roles are non-discriminating and are not claimed.
    test("resolves the dot and current dot roles", () => {
        expect(tourRecipe.base?.["dot"]).toMatchObject({
            backgroundColor: "semantic.border.strong",
        });
        expect(tourRecipe.variants?.["current"]?.["true"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.action.primary.background",
        });
    });

    // Pen Tour token contract: Back is the secondary action
    // (`action/secondary-*`) and Next is the primary action
    // (`action/primary-bg` + `action/primary-fg`). Both dark pairs discriminate
    // (green.300 -> green.700 fill; neutral.950 -> white next text); the light
    // roles are value-equivalent or non-discriminating.
    test("resolves the action roles", () => {
        expect(tourRecipe.base?.["back"]).toMatchObject({
            borderColor: "semantic.action.secondary.border",
            color: "semantic.action.secondary.foreground",
            backgroundColor: { _hover: "semantic.action.secondary.hover", },
        });
        expect(tourRecipe.base?.["next"]).toMatchObject({
            backgroundColor: "semantic.action.primary.background",
            color: "semantic.action.primary.foreground",
        });
    });

    // Pen Tour: the named content roles (`text/tertiary`, `text/primary`,
    // `text/secondary`) are value-equivalent to the previous common step ramp.
    test("resolves the named text roles", () => {
        expect(tourRecipe.base?.["step"]).toMatchObject({ color: "semantic.text.tertiary", });
        expect(tourRecipe.base?.["title"]).toMatchObject({ color: "semantic.text.primary", });
        expect(tourRecipe.base?.["body"]).toMatchObject({ color: "semantic.text.secondary", });
    });
});
