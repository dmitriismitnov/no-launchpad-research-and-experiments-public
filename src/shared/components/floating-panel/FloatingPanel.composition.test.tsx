import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { FloatingPanel, } from "./floating-panel";
import { floatingPanelRecipe, } from "./preset";

describe("floating panel composition", () => {
    test("renders a panel with a header, icon and body", () => {
        const markup = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" defaultOpen>
                <p>Body content</p>
            </FloatingPanel>,
        );

        expect(markup).toContain("floatingPanel__root");
        expect(markup).toContain("floatingPanel__panel");
        expect(markup).toContain("floatingPanel__header");
        expect(markup).toContain("floatingPanel__icon");
        expect(markup).toContain("floatingPanel__title");
        expect(markup).toContain("floatingPanel__close");
        expect(markup).toContain("floatingPanel__body");
        expect(markup).toContain("Canvas controls");
        expect(markup).toContain("Body content");
        expect(markup).toContain(`role="region"`);
        expect(markup).toContain(`aria-label="Canvas controls"`);
    });

    test("omits the panel while closed", () => {
        const markup = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" trigger="Open" />,
        );

        expect(markup).toContain("floatingPanel__root");
        expect(markup).not.toContain("floatingPanel__panel");
        expect(markup).not.toContain(`role="region"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" open={false} />,
        );

        expect(markup).not.toContain("floatingPanel__panel");
    });

    test("applies the placement variant to the panel", () => {
        const markup = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" placement="top-left" defaultOpen />,
        );

        expect(markup).toContain("floatingPanel__panel--placement_top-left");
    });

    test("renders a collapse control only when collapsible", () => {
        const collapsible = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" collapsible defaultOpen>
                <p>Body content</p>
            </FloatingPanel>,
        );
        const plain = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" defaultOpen>
                <p>Body content</p>
            </FloatingPanel>,
        );

        expect(collapsible).toContain("floatingPanel__collapse");
        expect(collapsible).toContain(`aria-expanded="true"`);
        expect(plain).not.toContain("floatingPanel__collapse");
    });

    test("hides the body while collapsed", () => {
        const markup = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" collapsible collapsed defaultOpen>
                <p>Body content</p>
            </FloatingPanel>,
        );

        expect(markup).toContain("floatingPanel__collapse");
        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("floatingPanel__body");
        expect(markup).not.toContain("Body content");
    });

    test("renders a labelled close control", () => {
        const markup = renderToStaticMarkup(<FloatingPanel title="Canvas controls" defaultOpen />);

        expect(markup).toContain(`aria-label="Close"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <FloatingPanel title="Canvas controls" data-testid="fp" />,
        );

        expect(markup).toContain(`data-testid="fp"`);
    });

    // Pen `J3VmmT` / doc `y3lqjy`, token contract `yt0ku`: the trigger, collapse
    // and close focus indicators resolve `focus/ring`, not the brand fill.
    test("paints the shared focus ring role on the controls", () => {
        for ( const slot of [ "trigger", "collapse", "close", ] ) {
            expect(floatingPanelRecipe.base?.[slot]).toMatchObject({
                outlineColor: { _focusVisible: "semantic.focus.ring", },
            });
        }
    });

    // Pen `J3VmmT` / doc `y3lqjy`: the panel resolves `surface/overlay` and the
    // `border/subtle` structural boundary at the `lg` (16px) radius instead of
    // the common step ramp and the `md` (10px) radius.
    test("resolves the overlay surface roles and radius", () => {
        expect(floatingPanelRecipe.base?.["panel"]).toMatchObject({
            backgroundColor: "semantic.surface.overlay",
        });
        expect(floatingPanelRecipe.base?.["panel"]).toMatchObject({
            borderColor: "semantic.border.subtle",
        });
        expect(floatingPanelRecipe.base?.["panel"]).toMatchObject({ borderRadius: "lg", });
    });

    // Pen `J3VmmT` / doc `y3lqjy`: the header and control roles resolve
    // `text/primary`, `text/secondary` and `text/tertiary` (value-equivalent to
    // the previous common step ramp).
    test("resolves the header and control text roles", () => {
        expect(floatingPanelRecipe.base?.["icon"]).toMatchObject({
            color: "semantic.text.secondary",
        });
        expect(floatingPanelRecipe.base?.["title"]).toMatchObject({
            color: "semantic.text.primary",
        });
        expect(floatingPanelRecipe.base?.["collapse"]).toMatchObject({
            color: "semantic.text.tertiary",
        });
        expect(floatingPanelRecipe.base?.["close"]).toMatchObject({
            color: "semantic.text.tertiary",
        });
    });
});
