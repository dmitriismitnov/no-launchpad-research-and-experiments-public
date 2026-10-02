import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Carousel, } from "./carousel";

const slides = [
    { label: "Overview", icon: "image", },
    { label: "Tokens", icon: "image", },
    { label: "Components", icon: "image", },
] as const;

describe("carousel composition", () => {
    test("renders controls, the current slide and a dot per slide", () => {
        const markup = renderToStaticMarkup(<Carousel slides={slides} />);

        expect(markup).toContain("carousel__root");
        expect(markup).toContain("carousel__viewport");
        expect(markup).toContain("carousel__control");
        expect(markup).toContain("carousel__slide");
        expect(markup).toContain("carousel__slideGlyph");
        expect(markup).toContain("carousel__dots");
        expect(markup).toContain("carousel__dot--current_true");
        expect(markup.match(/aria-label="Go to slide/g)?.length).toBe(3);
        expect(markup).toContain("1 of 3: Overview");
        expect(markup).toContain(`aria-roledescription="carousel"`);
    });

    test("drives the active slide from the controlled index", () => {
        const markup = renderToStaticMarkup(<Carousel slides={slides} current={2} />);

        expect(markup).toContain("3 of 3: Components");
        expect(markup).toContain(`aria-current="true"`);
    });

    test("disables the controls at the bounds", () => {
        const first = renderToStaticMarkup(<Carousel slides={slides} current={0} />);
        const last = renderToStaticMarkup(<Carousel slides={slides} current={2} />);

        expect(first).toContain(`aria-label="Previous slide" disabled`);
        expect(last).toContain(`aria-label="Next slide" disabled`);
    });

    test("renders custom slide content", () => {
        const markup = renderToStaticMarkup(
            <Carousel slides={[ { label: "Custom", content: <span>Custom body</span>, }, ]} />,
        );

        expect(markup).toContain("Custom body");
        expect(markup).not.toContain("carousel__slideGlyph");
    });

    test("renders an empty carousel without slides", () => {
        const markup = renderToStaticMarkup(<Carousel slides={[]} />);

        expect(markup).toContain("carousel__root");
        expect(markup).not.toContain("carousel__slide");
        expect(markup).not.toContain("carousel__dots");
    });

    test("mutes and disables the controls", () => {
        const markup = renderToStaticMarkup(<Carousel slides={slides} disabled />);

        expect(markup).toContain("carousel__root--disabled_true");
        expect(markup).toContain("disabled");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Carousel slides={slides} data-testid="c" />);

        expect(markup).toContain(`data-testid="c"`);
    });
});
