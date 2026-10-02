import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Menu, MenuDivider, MenuItem, } from "./menu";

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
});
