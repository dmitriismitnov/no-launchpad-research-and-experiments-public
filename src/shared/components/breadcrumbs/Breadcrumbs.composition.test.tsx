import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Breadcrumbs, } from "./breadcrumbs";

describe("breadcrumbs composition", () => {
    const items = [
        { label: "Foundation", href: "/foundation", },
        { label: "Components", href: "/components", },
        { label: "Button", },
    ] as const;

    test("renders an ordered trail with separators between crumbs", () => {
        const markup = renderToStaticMarkup(<Breadcrumbs items={items} />);

        expect(markup).toContain("breadcrumbs__root");
        expect(markup).toContain("breadcrumbs__list");
        expect(markup).toContain("breadcrumbs__item");
        expect(markup).toContain("breadcrumbs__link");
        expect(markup).toContain("breadcrumbs__separator");
        expect(markup).toContain("breadcrumbs__current");
        expect(markup).toContain("<nav");
        expect(markup).toContain(`aria-label="Breadcrumb"`);
        expect(markup).toContain("<ol");
        expect(markup).toContain("<li");
    });

    test("links every crumb except the current one and separators only between", () => {
        const markup = renderToStaticMarkup(<Breadcrumbs items={items} />);

        expect(markup.match(/breadcrumbs__link\b/g)?.length).toBe(2);
        expect(markup.match(/breadcrumbs__separator\b/g)?.length).toBe(2);
        expect(markup.match(/breadcrumbs__current\b/g)?.length).toBe(1);
        expect(markup).toContain(`aria-current="page"`);
    });

    test("accepts a custom accessible name and separator glyph", () => {
        const markup = renderToStaticMarkup(
            <Breadcrumbs items={items} label="Хлебные крошки" separatorIcon="arrow-right" />,
        );

        expect(markup).toContain(`aria-label="Хлебные крошки"`);
        expect(markup).toContain("breadcrumbs__separator");
    });

    test("renders a single current crumb without separators", () => {
        const markup = renderToStaticMarkup(<Breadcrumbs items={[ { label: "Home", }, ]} />);

        expect(markup).not.toContain("breadcrumbs__separator");
        expect(markup).not.toContain("breadcrumbs__link");
        expect(markup).toContain("breadcrumbs__current");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Breadcrumbs items={items} data-testid="bc" />);

        expect(markup).toContain(`data-testid="bc"`);
    });
});
