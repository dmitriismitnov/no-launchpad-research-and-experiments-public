import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Slider, type SliderProps, } from "./slider";

describe("Slider composition", () => {
    test("links a label to a native range and renders the visual parts", () => {
        const markup = renderToStaticMarkup(<Slider label="Громкость" name="volume" min={0} max={100} />);

        expect(markup).toContain('type="range"');
        expect(markup).toContain('name="volume"');
        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("Громкость");
        expect(markup).toContain("slider__track");
        expect(markup).toContain("slider__range");
        expect(markup).toContain("slider__thumb");
    });

    test("the native input carries the peer class used by the focus state", () => {
        const markup = renderToStaticMarkup(<Slider />);

        expect(markup).toContain("slider__input");
        expect(markup).toContain("peer");
    });

    test("positions the fill and thumb from the controlled value", () => {
        const markup = renderToStaticMarkup(<Slider value={25} min={0} max={100} onChange={() => {}} />);

        expect(markup).toContain("width:25%");
        expect(markup).toContain("left:25%");
    });

    test("positions the fill from the uncontrolled default value", () => {
        const markup = renderToStaticMarkup(<Slider defaultValue={50} min={0} max={100} showValue />);

        expect(markup).toContain("width:50%");
        expect(markup).toContain("left:50%");
        expect(markup).toContain(">50<");
    });

    test("formats the displayed value and exposes it as aria-valuetext", () => {
        const markup = renderToStaticMarkup(
            <Slider defaultValue={50} showValue formatValue={(value) => `${value}%`} />,
        );

        expect(markup).toContain(">50%<");
        expect(markup).toContain('aria-valuetext="50%"');
    });

    test("omits the header when there is no label and no value", () => {
        const markup = renderToStaticMarkup(<Slider />);

        expect(markup).not.toContain("slider__header");
        expect(markup).not.toContain("slider__value");
    });

    test("invalid slider sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Slider label="Громкость" invalid error="Слишком громко" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Слишком громко");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Slider error="Слишком громко" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Слишком громко");
    });

    test("marks the input disabled and applies the disabled variant", () => {
        const markup = renderToStaticMarkup(<Slider label="Громкость" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("slider__range--disabled_true");
    });

    test("merges className with the input class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Slider className="my-slider" />);

        expect(markup).toContain("my-slider");
        expect(markup).toContain("slider__input");
    });

    test("rejects the size prop and strips type and children from untyped callers", () => {
        // @ts-expect-error size is not a public prop
        const withSize = <Slider size="sm" />;
        const untypedProps = {
            size: "sm",
            type: "text",
            children: "injected",
        } as unknown as SliderProps;
        const markup = renderToStaticMarkup(<Slider {...untypedProps} />);

        expect(withSize).toBeDefined();
        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain('type="text"');
        expect(markup).toContain('type="range"');
        expect(markup).not.toContain("injected");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Slider invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
