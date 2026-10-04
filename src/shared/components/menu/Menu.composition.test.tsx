import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Menu, MenuDivider, MenuItem, } from "./menu";
import { menuRecipe, } from "./preset";

describe("menu composition", () => {
    test("renders a labelled menu surface with rows", () => {
        const markup = renderToStaticMarkup(
            <Menu label="Actions">
                <MenuItem label="Rename" />
                <MenuItem label="Duplicate" shortcut="⌘D" />
            </Menu>,
        );

        expect(markup).toContain("menu__root");
        expect(markup).toContain("menu__label");
        expect(markup).toContain(`role="menu"`);
        expect(markup).toContain("menu__item");
        expect(markup).toContain("menu__itemLabel");
        expect(markup).toContain(`role="menuitem"`);
        expect(markup).toContain("Actions");
        expect(markup).toContain("⌘D");
    });

    test("renders the leading icon and trailing affordances on a row", () => {
        const markup = renderToStaticMarkup(
            <MenuItem label="Components" icon="settings" checked submenu />,
        );

        expect(markup).toContain("menu__icon");
        expect(markup).toContain("menu__check");
        expect(markup).toContain("menu__submenu");
        expect(markup).toContain("menu__item--checked_true");
    });

    test("paints a destructive row with the danger tone", () => {
        const markup = renderToStaticMarkup(<MenuItem label="Delete" tone="danger" />);

        expect(markup).toContain("menu__itemLabel--tone_danger");
    });

    test("disables a disabled row", () => {
        const markup = renderToStaticMarkup(<MenuItem label="Export" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("menu__item--disabled_true");
    });

    test("renders a separator", () => {
        const markup = renderToStaticMarkup(<MenuDivider />);

        expect(markup).toContain("menu__divider");
        expect(markup).toContain(`role="separator"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Menu data-testid="m">
                <MenuItem label="Rename" data-testid="mi" />
            </Menu>,
        );

        expect(markup).toContain(`data-testid="m"`);
        expect(markup).toContain(`data-testid="mi"`);
    });

    // Pen `GLufg` / Menu Item `CX1vE` token contract `C6zTA`: the row
    // focus-indicator uses `focus/ring`, not the brand fill. Geometry stays the
    // shared 2px ring with offset 0.
    test("paints the shared focus ring role", () => {
        expect(menuRecipe.base?.["item"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });

    // Pen `GLufg`: the overlay card resolves the named surface/border roles
    // rather than the common step ramp.
    test("resolves the overlay card surface roles", () => {
        expect(menuRecipe.base?.["root"]).toMatchObject({
            backgroundColor: "semantic.surface.overlay",
            borderColor: "semantic.border.subtle",
        });
    });

    // Pen `CX1vE`: the row hover uses the `surface/hover` role.
    test("resolves the row hover surface role", () => {
        expect(menuRecipe.base?.["item"]).toMatchObject({
            _hover: { backgroundColor: "semantic.surface.hover", },
        });
    });

    // Pen `CX1vE`: the check glyph uses the `text/link` role.
    test("resolves the check glyph to the link text role", () => {
        expect(menuRecipe.base?.["check"]).toMatchObject({
            color: "semantic.text.link",
        });
    });

    // Regression: the quiet rule stays on the common step ramp; only the card
    // boundary moves to the named `border/subtle` role.
    test("keeps the divider on the common step ramp", () => {
        expect(menuRecipe.base?.["divider"]).toMatchObject({
            backgroundColor: "semantic.common.200.divider",
        });
    });
});
