import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { splitterRecipe, } from "./preset";
import { Splitter, } from "./splitter";

describe("splitter composition", () => {
    test("renders both panes around a separator with a grip", () => {
        const markup = renderToStaticMarkup(<Splitter start="Editor" end="Preview" />);

        expect(markup).toContain("splitter__root");
        expect(markup).toContain("splitter__paneStart");
        expect(markup).toContain("splitter__paneEnd");
        expect(markup).toContain("splitter__handle");
        expect(markup).toContain("splitter__grip");
        expect(markup).toContain("Editor");
        expect(markup).toContain("Preview");
        expect(markup).toContain(`role="separator"`);
    });

    test("uses a vertical divider for the default horizontal split", () => {
        const markup = renderToStaticMarkup(<Splitter start="A" end="B" />);

        expect(markup).toContain(`aria-orientation="vertical"`);
        expect(markup).toContain("splitter__root--orientation_horizontal");
        expect(markup).not.toContain("splitter__root--orientation_vertical");
    });

    test("stacks the panes and flips the divider in the vertical split", () => {
        const markup = renderToStaticMarkup(
            <Splitter orientation="vertical" start="Top" end="Bottom" />,
        );

        expect(markup).toContain(`aria-orientation="horizontal"`);
        expect(markup).toContain("splitter__root--orientation_vertical");
        expect(markup).toContain("Top");
        expect(markup).toContain("Bottom");
    });

    test("hides the decorative grip from assistive technology", () => {
        const markup = renderToStaticMarkup(<Splitter start="A" end="B" />);

        expect(markup).toContain(`aria-hidden="true"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Splitter start="A" end="B" data-testid="split" />,
        );

        expect(markup).toContain(`data-testid="split"`);
    });

    // Pen `U4KfQj` master / `ZVJu8` documentation: root fill `surface/raised`
    // with a `border/subtle` boundary; the start pane is `surface/sunken`, the
    // end pane and handle are `surface/raised`, the grip is `border/strong` and
    // the pane copy is `text/tertiary`. The handle focus specimen `GydgT` draws
    // `focus/ring` on the root, but the code renders no focusable slot, so the
    // focus correction is BLOCKED (no `tabIndex` added). The minimums/collapsible
    // variants, hover/dragging/disabled states and size persistence are BLOCKED.
    test("paints the raised surface, subtle boundary, pane surfaces and grip roles", () => {
        const root = splitterRecipe.base?.["root"] as Record<string, unknown> | undefined;
        const pane = splitterRecipe.base?.["pane"] as Record<string, unknown> | undefined;
        const paneStart = splitterRecipe.base?.["paneStart"] as Record<string, unknown> | undefined;
        const paneEnd = splitterRecipe.base?.["paneEnd"] as Record<string, unknown> | undefined;
        const handle = splitterRecipe.base?.["handle"] as Record<string, unknown> | undefined;
        const grip = splitterRecipe.base?.["grip"] as Record<string, unknown> | undefined;

        expect(root).toMatchObject({
            backgroundColor: "semantic.surface.raised",
            borderColor: "semantic.border.subtle",
        });
        expect(paneStart?.["backgroundColor"]).toBe("semantic.surface.sunken");
        expect(paneEnd?.["backgroundColor"]).toBe("semantic.surface.raised");
        expect(handle?.["backgroundColor"]).toBe("semantic.surface.raised");
        expect(grip?.["backgroundColor"]).toBe("semantic.border.strong");
        expect(pane?.["color"]).toBe("semantic.text.tertiary");
    });
});
