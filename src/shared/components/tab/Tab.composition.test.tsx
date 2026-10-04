import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { tabRecipe, } from "./preset";
import { Tab, TabList, } from "./tab";

describe("tab composition", () => {
    test("renders a tablist row around tab triggers", () => {
        const markup = renderToStaticMarkup(
            <TabList>
                <Tab label="Overview" active />
                <Tab label="Tokens" />
            </TabList>,
        );

        expect(markup).toContain("tab__list");
        expect(markup).toContain(`role="tablist"`);
        expect(markup).toContain("tab__root");
        expect(markup).toContain("tab__label");
        expect(markup).toContain("tab__indicator");
        expect(markup).toContain(`role="tab"`);
        expect(markup).toContain("Overview");
    });

    test("marks the active trigger as selected and applies its variant", () => {
        const markup = renderToStaticMarkup(<Tab label="Overview" active />);

        expect(markup).toContain(`aria-selected="true"`);
        expect(markup).toContain("tab__root--active_true");
    });

    test("leaves an inactive trigger unselected", () => {
        const markup = renderToStaticMarkup(<Tab label="Tokens" />);

        expect(markup).toContain(`aria-selected="false"`);
        expect(markup).not.toContain("tab__root--active_true");
    });

    // Pen `z2jG4r` (`PRWpN.enabled=false` by default) and `VWQNE` (`t1` enables
    // the indicator, every other tab leaves it off): only the active trigger
    // carries an indicator, so an inactive trigger reserves no indicator space.
    test("renders the indicator only for the active trigger", () => {
        const active = renderToStaticMarkup(<Tab label="Overview" active />);
        const inactive = renderToStaticMarkup(<Tab label="Tokens" />);

        expect(active).toContain("tab__indicator");
        expect(inactive).not.toContain("tab__indicator");
    });

    // Pen `CCpkF` (`vfPHi`) token contract: the focus-indicator row resolves
    // `focus/ring`, not the brand fill. Geometry stays the shared 2px ring.
    test("paints the shared focus ring role", () => {
        expect(tabRecipe.base?.["root"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });

    test("renders the icon slot when an icon is given", () => {
        const markup = renderToStaticMarkup(<Tab label="Overview" icon="layout-grid" />);

        expect(markup).toContain("tab__icon");
        expect(markup).toContain("icon--size_sm");
    });

    test("disables a disabled trigger", () => {
        const markup = renderToStaticMarkup(<Tab label="Archived" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("tab__root--disabled_true");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Tab label="Overview" data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });
});
