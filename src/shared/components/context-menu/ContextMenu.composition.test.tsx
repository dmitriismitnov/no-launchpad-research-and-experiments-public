import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { MenuDivider, MenuItem, } from "@shared/components/menu";

import { ContextMenu, } from "./context-menu";
import { contextMenuRecipe, } from "./preset";

describe("context menu composition", () => {
    test("renders a trigger area and a labelled menu surface when open by default", () => {
        const markup = renderToStaticMarkup(
            <ContextMenu label="Actions" defaultOpen trigger="Right-click area">
                <MenuItem label="Rename" shortcut="⌘R" />
                <MenuDivider />
                <MenuItem label="Delete" tone="danger" />
            </ContextMenu>,
        );

        expect(markup).toContain("contextMenu__root");
        expect(markup).toContain("contextMenu__trigger");
        expect(markup).toContain("contextMenu__surface");
        expect(markup).toContain("Right-click area");
        expect(markup).toContain(`role="menu"`);
        expect(markup).toContain(`aria-label="Actions"`);
        expect(markup).toContain("menu__item");
        expect(markup).toContain("Rename");
        expect(markup).toContain("Delete");
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(
            <ContextMenu label="Actions" trigger="Right-click area">
                <MenuItem label="Rename" />
            </ContextMenu>,
        );

        expect(markup).toContain("contextMenu__root");
        expect(markup).not.toContain("contextMenu__surface");
        expect(markup).not.toContain("Rename");
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <ContextMenu label="Actions" open={false}>
                <MenuItem label="Rename" />
            </ContextMenu>,
        );

        expect(markup).not.toContain("contextMenu__surface");
    });

    test("places the surface at the given offsets", () => {
        const markup = renderToStaticMarkup(
            <ContextMenu label="Actions" defaultOpen x={120} y={48}>
                <MenuItem label="Rename" />
            </ContextMenu>,
        );

        expect(markup).toContain("left:120px");
        expect(markup).toContain("top:48px");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<ContextMenu data-testid="cm" />);

        expect(markup).toContain(`data-testid="cm"`);
    });

    // Pen `rokhq` / doc `w7EbR`: the trigger chrome resolves the raised surface
    // and subtle border roles rather than the common step ramp.
    test("resolves the trigger surface roles", () => {
        expect(contextMenuRecipe.base?.["trigger"]).toMatchObject({
            backgroundColor: "semantic.surface.raised",
            borderColor: "semantic.border.subtle",
        });
    });
});
