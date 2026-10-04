import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Breadcrumbs, } from "./breadcrumbs";
import { breadcrumbsRecipe, } from "./preset";

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

    // Pen `Bvk23` anatomy `i2SiX` names an icon part and the public variants
    // `H5sLG` include "with icon"; the glyph is decorative.
    test("renders a decorative icon inside a crumb link", () => {
        const markup = renderToStaticMarkup(
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/", icon: "folder", },
                    { label: "Components", href: "/components", },
                    { label: "Button", },
                ]}
            />,
        );
        const firstAnchor = markup.slice(0, markup.indexOf("</a>") + 4);

        expect(firstAnchor).toContain("breadcrumbs__link");
        expect(firstAnchor).toContain("breadcrumbs__icon");
        expect(markup).toContain("icon--size_sm");
        expect(markup).toContain(`aria-hidden="true"`);
    });

    test("renders no icon slot when no crumb asks for one", () => {
        const markup = renderToStaticMarkup(<Breadcrumbs items={items} />);

        expect(markup).not.toContain("breadcrumbs__icon");
    });

    // Pen `Bvk23` token contract `A57dA`: the focus-indicator row uses
    // `focus/ring`; the 2px padding-box ring geometry is unchanged.
    test("paints the shared focus ring role on the crumb link", () => {
        expect(breadcrumbsRecipe.base?.["link"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "2px", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });
});
