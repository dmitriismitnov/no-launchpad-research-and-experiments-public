import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

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
});
