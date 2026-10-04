import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { NavItem, } from "./nav-item";
import { navItemRecipe, } from "./preset";

describe("nav item composition", () => {
    test("renders an anchor with the label slot", () => {
        const markup = renderToStaticMarkup(<NavItem href="/" label="Overview" />);

        expect(markup).toContain("navItem__root");
        expect(markup).toContain("navItem__label");
        expect(markup).toContain("Overview");
        expect(markup).toContain(`href="/"`);
    });

    test("renders the icon slot when an icon is given", () => {
        const markup = renderToStaticMarkup(<NavItem href="/" label="Overview" icon="gauge" />);

        expect(markup).toContain("navItem__icon");
        expect(markup).toContain("icon--size_sm");
    });

    test("marks the active entry as the current page", () => {
        const markup = renderToStaticMarkup(<NavItem href="/" label="Overview" active />);

        expect(markup).toContain(`aria-current="page"`);
        expect(markup).toContain("navItem__root--active_true");
    });

    test("marks a disabled entry and removes it from the tab order", () => {
        const markup = renderToStaticMarkup(<NavItem href="/" label="Overview" disabled />);

        expect(markup).toContain(`aria-disabled="true"`);
        expect(markup).toContain(`tabindex="-1"`);
        expect(markup).toContain("navItem__root--disabled_true");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<NavItem href="/" label="Overview" data-testid="n" />);

        expect(markup).toContain(`data-testid="n"`);
    });

    // Documented hover state: the quiet surface role. Browser hover timing is
    // not asserted; the recipe selector is the contract.
    test("documents the hover surface state", () => {
        const root = navItemRecipe.base?.["root"] as Record<string, unknown> | undefined;

        expect(root?.["_hover"]).toMatchObject({
            backgroundColor: "semantic.common.100.background",
        });
    });

    // Pen `l8wwSv` / Top Navigation token contract `iosjR`: the focus-indicator
    // rows use `focus/ring`. `current` stays a single `aria-current` item.
    test("paints the shared focus ring role", () => {
        expect(navItemRecipe.base?.["root"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });
});
