import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { NavItem, } from "./nav-item";

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
});
