import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { TreeItem, } from "./tree-item";

describe("tree item composition", () => {
    test("renders a labelled row with a spacer for a leaf", () => {
        const markup = renderToStaticMarkup(<TreeItem label="Button" icon="layout-grid" />);

        expect(markup).toContain("treeItem__root");
        expect(markup).toContain("treeItem__row");
        expect(markup).toContain("treeItem__content");
        expect(markup).toContain("treeItem__icon");
        expect(markup).toContain("treeItem__label");
        expect(markup).toContain(`role="treeitem"`);
        expect(markup).toContain(`aria-level="1"`);
        expect(markup).toContain("Button");
    });

    test("renders an expander and a nested group when open by default", () => {
        const markup = renderToStaticMarkup(
            <TreeItem label="Foundation" icon="folder" defaultExpanded>
                <TreeItem label="Primitive tokens" icon="palette" />
            </TreeItem>,
        );

        expect(markup).toContain("treeItem__expander");
        expect(markup).toContain(`aria-expanded="true"`);
        expect(markup).toContain(`role="group"`);
        expect(markup).toContain("treeItem__group");
        expect(markup).toContain("Primitive tokens");
        expect(markup).toContain(`aria-level="2"`);
    });

    test("omits the group while collapsed", () => {
        const markup = renderToStaticMarkup(
            <TreeItem label="Components" icon="folder">
                <TreeItem label="Button" />
            </TreeItem>,
        );

        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("treeItem__group");
        expect(markup).not.toContain("Button");
    });

    test("honours a controlled expanded state", () => {
        const markup = renderToStaticMarkup(
            <TreeItem label="Locked" expanded={false}>
                <TreeItem label="Hidden" />
            </TreeItem>,
        );

        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("treeItem__group");
    });

    test("marks the selected node", () => {
        const markup = renderToStaticMarkup(<TreeItem label="Semantic tokens" selected />);

        expect(markup).toContain(`aria-selected="true"`);
        expect(markup).toContain("treeItem__root--selected_true");
    });

    test("mutes and disables the row", () => {
        const markup = renderToStaticMarkup(<TreeItem label="Archived" disabled />);

        expect(markup).toContain(`aria-disabled="true"`);
        expect(markup).toContain("treeItem__root--disabled_true");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<TreeItem label="Node" data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });
});
