import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { List, } from "./list";

describe("list composition", () => {
    test("renders one item per entry with title, meta and trailing", () => {
        const markup = renderToStaticMarkup(
            <List
                items={[
                    {
                        title: "primitive-tokens.json",
                        meta: "12 KB · 2h ago",
                        trailing: "JSON",
                        icon: "file",
                    },
                    { title: "Button.tsx", meta: "Edited by Ada", trailing: "TSX", },
                ]}
            />,
        );

        expect(markup).toContain("list__root");
        expect(markup).toContain("list__item");
        expect(markup).toContain("list__itemIcon");
        expect(markup).toContain("list__itemText");
        expect(markup).toContain("list__itemTitle");
        expect(markup).toContain("list__itemMeta");
        expect(markup).toContain("list__itemTrailing");
        expect(markup).toContain("primitive-tokens.json");
        expect(markup).toContain("12 KB · 2h ago");
        expect(markup).toContain("JSON");
        expect(markup).toContain("Button.tsx");
        expect(markup.match(/list__item\b/g)?.length).toBe(2);
    });

    test("omits optional parts when empty", () => {
        const markup = renderToStaticMarkup(
            <List items={[ { title: "Only title", meta: "  ", trailing: "", }, ]} />,
        );

        expect(markup).toContain("list__itemTitle");
        expect(markup).not.toContain("list__itemIcon");
        expect(markup).not.toContain("list__itemMeta");
        expect(markup).not.toContain("list__itemTrailing");
    });

    test("renders an empty list when there are no items", () => {
        const markup = renderToStaticMarkup(<List items={[]} />);

        expect(markup).toContain("list__root");
        expect(markup).not.toContain("list__item");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<List items={[]} data-testid="l" />);

        expect(markup).toContain(`data-testid="l"`);
    });
});
