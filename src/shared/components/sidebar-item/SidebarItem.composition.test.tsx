import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { sidebarItemRecipe, } from "./preset";
import { SidebarItem, } from "./sidebar-item";

describe("sidebar item composition", () => {
    test("renders an anchor with the label slot", () => {
        const markup = renderToStaticMarkup(<SidebarItem href="/" label="Dashboard" />);

        expect(markup).toContain("sidebarItem__root");
        expect(markup).toContain("sidebarItem__label");
        expect(markup).toContain("Dashboard");
        expect(markup).toContain(`href="/"`);
    });

    test("renders the icon slot when an icon is given", () => {
        const markup = renderToStaticMarkup(
            <SidebarItem href="/" label="Dashboard" icon="layout-grid" />,
        );

        expect(markup).toContain("sidebarItem__icon");
        expect(markup).toContain("icon--size_sm");
    });

    test("marks the active entry as the current page", () => {
        const markup = renderToStaticMarkup(<SidebarItem href="/" label="Dashboard" active />);

        expect(markup).toContain(`aria-current="page"`);
        expect(markup).toContain("sidebarItem__root--active_true");
    });

    test("marks a disabled entry and removes it from the tab order", () => {
        const markup = renderToStaticMarkup(<SidebarItem href="/" label="Dashboard" disabled />);

        expect(markup).toContain(`aria-disabled="true"`);
        expect(markup).toContain(`tabindex="-1"`);
        expect(markup).toContain("sidebarItem__root--disabled_true");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <SidebarItem href="/" label="Dashboard" data-testid="s" />,
        );

        expect(markup).toContain(`data-testid="s"`);
    });

    // Documented hover state: the quiet surface role. Browser hover timing is
    // not asserted; the recipe selector is the contract.
    test("documents the hover surface state", () => {
        const root = sidebarItemRecipe.base?.["root"] as Record<string, unknown> | undefined;

        expect(root?.["_hover"]).toMatchObject({
            backgroundColor: "semantic.common.100.background",
        });
    });

    // Pen `EagLC` / Sidebar navigation token contract `uhiC3`: the
    // focus-indicator row uses `focus/ring`. Active stays `aria-current`.
    test("paints the shared focus ring role", () => {
        expect(sidebarItemRecipe.base?.["root"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });
});
