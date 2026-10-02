import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Rating, } from "./rating";

describe("Rating composition", () => {
    test("renders a radiogroup of stars", () => {
        const markup = renderToStaticMarkup(<Rating defaultValue={4} label="Оценка" />);

        expect(markup).toContain('role="radiogroup"');
        expect(markup).toContain('aria-label="Оценка"');
        expect(markup.match(/role="radio"/g)?.length).toBe(5);
        expect(markup.match(/rating__star[^-]/g)?.length).toBe(5);
    });

    test("marks the selected star and labels every star", () => {
        const markup = renderToStaticMarkup(<Rating defaultValue={4} />);

        expect(markup.match(/aria-checked="true"/g)?.length).toBe(1);
        expect(markup).toContain('aria-label="1 of 5"');
        expect(markup).toContain('aria-label="4 of 5"');
        expect(markup).toContain('aria-label="5 of 5"');
    });

    test("fills stars up to the value", () => {
        const markup = renderToStaticMarkup(<Rating defaultValue={3} />);

        expect(markup.match(/rating__star--filled_true/g)?.length).toBe(3);
    });

    test("shows the numeric value when asked", () => {
        const markup = renderToStaticMarkup(<Rating defaultValue={4} showValue />);

        expect(markup).toContain("4 / 5");
        expect(markup).toContain("rating__valueLabel");
    });

    test("read-only renders one image, not controls", () => {
        const markup = renderToStaticMarkup(<Rating value={4} readOnly />);

        expect(markup).toContain('role="img"');
        expect(markup).toContain('aria-label="4 out of 5"');
        expect(markup).not.toContain('role="radio"');
    });

    test("disabled renders the disabled star colour", () => {
        const markup = renderToStaticMarkup(<Rating value={4} disabled />);

        expect(markup).toContain("rating__star--disabled_true");
        expect(markup).toContain('role="img"');
    });

    test("honours a custom maximum", () => {
        const markup = renderToStaticMarkup(<Rating defaultValue={3} max={10} />);

        expect(markup.match(/role="radio"/g)?.length).toBe(10);
        expect(markup).toContain('aria-label="3 of 10"');
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Rating className="my-rating" />);

        expect(markup).toContain("my-rating");
        expect(markup).toContain("rating__root");
    });
});
