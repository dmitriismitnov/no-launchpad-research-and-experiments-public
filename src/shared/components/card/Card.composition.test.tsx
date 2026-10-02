import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import * as cardModule from "./card";
import { Card, type CardProps, } from "./card";

describe("card composition", () => {
    test("renders an article with its required title and forwarded attributes", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" aria-label="Sensor family" data-card="catalog" />,
        );

        expect(markup).toContain("<article");
        expect(markup).toContain('aria-label="Sensor family"');
        expect(markup).toContain('data-card="catalog"');
        expect(markup).toContain("<h3");
        expect(markup).toContain("Pressure sensors");
    });

    test("uses the decorative skeleton when media is absent", () => {
        const markup = renderToStaticMarkup(<Card title="Pressure sensors" />);

        // The asset is inlined so its `currentColor` inherits the media slot.
        expect(markup).toContain('viewBox="0 0 1600 900"');
        expect(markup).toContain("currentColor");
        expect(markup).toContain("card__media");
        expect(markup).toContain('aria-hidden="true"');
        expect(markup).not.toContain("<img");
    });

    test("uses supplied media without a fallback image", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" media={{ src: "/sensor.jpg", alt: "Pressure gauge", }} />,
        );

        expect(markup).toContain("<img");
        expect(markup).toContain('src="/sensor.jpg"');
        expect(markup).toContain('alt="Pressure gauge"');
        expect(markup).not.toContain('viewBox="0 0 1600 900"');
    });

    test("keeps an empty supplied alt and never swaps it for the skeleton", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" media={{ src: "/decorative.jpg", alt: "", }} />,
        );

        expect(markup).toContain('src="/decorative.jpg"');
        expect(markup).toContain('alt=""');
        expect(markup).not.toContain('viewBox="0 0 1600 900"');
    });

    test("ignores unsafe article HTML from untyped callers", () => {
        const untypedProps = {
            title: "Pressure sensors",
            dangerouslySetInnerHTML: { __html: "<p>Injected markup</p>", },
        } as unknown as CardProps;
        const markup = renderToStaticMarkup(<Card {...untypedProps} />);

        expect(markup).toContain("Pressure sensors");
        expect(markup).not.toContain("Injected markup");
    });

    test("treats empty and whitespace-only optional text as absent", () => {
        const markup = renderToStaticMarkup(
            <Card
                title="Pressure sensors"
                description="   "
                header={{ label: "", }}
                footer={{ primaryNote: "", secondaryNote: "  ", }}
            />,
        );

        for ( const slot of [ "card__header", "card__description", "card__footer", ] ) {
            expect(markup).not.toContain(slot);
        }
    });

    test("omits a blank secondary note but keeps a real primary note", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" footer={{ primaryNote: "0…400 бар", secondaryNote: "", }} />,
        );

        expect(markup).toContain("card__footerPrimary");
        expect(markup).not.toContain("card__footerSecondary");
    });

    test("keeps an icon-only header alive without a blank label", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" header={{ label: "   ", icon: "gauge", }} />,
        );

        expect(markup).toContain("card__header");
        expect(markup).toContain("icon--size_sm");
    });

    test("omits every optional region on a title-only card", () => {
        const markup = renderToStaticMarkup(<Card title="Only title" />);

        for ( const slot of [ "card__header", "card__description", "card__footer", "card__actionButton", ] ) {
            expect(markup).not.toContain(slot);
        }

        expect(markup).toContain("card__media");
        expect(markup).toContain("card__title");
    });

    test("renders a header marker and a decorative icon when supplied", () => {
        const markup = renderToStaticMarkup(
            <Card
                title="Pressure sensors"
                media={{ src: "/sensor.jpg", alt: "Pressure gauge", }}
                header={{ label: "01", icon: "gauge", }}
            />,
        );
        const header = /<div class="card__header">([\s\S]*?)<\/div>/.exec(markup)?.[1];

        if ( header === undefined ) {
            throw new Error("Card must render the supplied header");
        }

        expect(header).toContain("01");
        expect(header).toContain("icon--size_sm");
        expect(header).toContain('aria-hidden="true"');
    });

    test("renders both footer notes when supplied", () => {
        const markup = renderToStaticMarkup(
            <Card
                title="Pressure sensors"
                footer={{ primaryNote: "0…400 бар", secondaryNote: "4…20 мА", }}
            />,
        );

        expect(markup).toContain("card__footerPrimary");
        expect(markup).toContain("0…400 бар");
        expect(markup).toContain("card__footerSecondary");
        expect(markup).toContain("4…20 мА");
    });

    test("renders a Card-created action button at the default small size", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" actionButton={{ children: "Details", }} />,
        );

        expect(markup).toContain("card__footer");
        expect(markup).toContain("card__actionButton");
        expect(markup).toContain("<button");
        expect(markup).toContain("button__root--size_sm");
        expect(markup).toContain("Details");
    });

    test("keeps the small action button default when its size is undefined", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" actionButton={{ children: "Details", size: undefined, }} />,
        );

        expect(markup).toContain("button__root--size_sm");
        expect(markup).not.toContain("button__root--size_md");
    });

    test("lets an explicit action button size override the default", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" actionButton={{ children: "Details", size: "md", }} />,
        );

        expect(markup).toContain("button__root--size_md");
        expect(markup).not.toContain("button__root--size_sm");
    });

    test("renders no empty note spans for an action-only footer", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" actionButton={{ children: "Details", }} />,
        );

        expect(markup).toContain("card__footer");
        expect(markup).not.toContain("card__footerPrimary");
        expect(markup).not.toContain("card__footerSecondary");
    });

    test("passes native article attributes through", () => {
        const markup = renderToStaticMarkup(
            <Card title="Pressure sensors" id="sensor-card" hidden className="consumer" />,
        );

        expect(markup).toContain('id="sensor-card"');
        expect(markup).toContain("hidden");
        expect(markup).toContain("consumer");
        expect(markup).toContain("card__root");
    });

    test("plain variant drops the media surface", () => {
        const markup = renderToStaticMarkup(
            <Card
                variant="plain"
                title="Plain card"
                media={{ src: "/ignored.jpg", alt: "Ignored", }}
            />,
        );

        expect(markup).toContain("card__root--variant_plain");
        expect(markup).toContain("card__body--variant_plain");
        expect(markup).not.toContain("card__media");
        expect(markup).not.toContain("<img");
        expect(markup).not.toContain('viewBox="0 0 1600 900"');
    });

    test("compact variant drops the media surface and tightens its slots", () => {
        const markup = renderToStaticMarkup(
            <Card variant="compact" title="Compact card" description="Dense metadata only." />,
        );

        expect(markup).toContain("card__root--variant_compact");
        expect(markup).toContain("card__title--variant_compact");
        expect(markup).not.toContain("card__media");
        expect(markup).toContain("Dense metadata only.");
    });

    test("default variant keeps the media skeleton and carries no variant class", () => {
        const markup = renderToStaticMarkup(<Card title="Default card" />);

        expect(markup).toContain("card__media");
        expect(markup).not.toContain("card__root--variant_default");
    });

    test("exports only the public card from the module", () => {
        expect(Object.keys(cardModule)).toEqual([ "Card", ]);
    });

    test("rejects children, injected HTML and incomplete media at the type level", () => {
        // @ts-expect-error the card owns its structure; children are not public
        const withChildren = <Card title="x">child</Card>;
        // @ts-expect-error card owns its content and cannot accept injected HTML
        const injectedHtml = <Card title="x" dangerouslySetInnerHTML={{ __html: "<p>x</p>", }} />;
        // @ts-expect-error supplied media requires both src and alt
        const withoutAlt = <Card title="x" media={{ src: "/x.jpg", }} />;

        expect(withChildren).toBeDefined();
        expect(injectedHtml).toBeDefined();
        expect(withoutAlt).toBeDefined();
    });
});
