import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { NumberInput, type NumberInputProps, } from "./number-input";

describe("NumberInput composition", () => {
    test("links a label to the number control and forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <NumberInput label="Количество" name="count" defaultValue={8} min={0} max={64} required />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain('type="number"');
        expect(markup).toContain("Количество");
        expect(markup).toContain('name="count"');
        expect(markup).toContain('value="8"');
        expect(markup).toContain('min="0"');
        expect(markup).toContain('max="64"');
        expect(markup).toContain("required");
    });

    test("renders plus and minus stepper buttons by default", () => {
        const markup = renderToStaticMarkup(<NumberInput />);

        expect(markup).toContain("numberInput__stepper");
        expect(markup).toContain('aria-label="Increase value"');
        expect(markup).toContain('aria-label="Decrease value"');
    });

    test("omits the stepper when stepper is false", () => {
        const markup = renderToStaticMarkup(<NumberInput stepper={false} />);

        expect(markup).not.toContain("numberInput__stepper");
    });

    test("renders an optional unit", () => {
        const markup = renderToStaticMarkup(<NumberInput unit="px" />);

        expect(markup).toContain("numberInput__unit");
        expect(markup).toContain("px");
    });

    test("invalid control sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<NumberInput invalid error="Введите число" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Введите число");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<NumberInput error="Введите число" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Введите число");
    });

    test("merges className with the input class, not replacing it", () => {
        const markup = renderToStaticMarkup(<NumberInput className="my-number" />);

        expect(markup).toContain("my-number");
        expect(markup).toContain("numberInput__input");
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop
        const withSize = <NumberInput size="sm" />;

        expect(withSize).toBeDefined();
    });

    test("strips size, type and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            type: "text",
            children: "injected",
        } as unknown as NumberInputProps;
        const markup = renderToStaticMarkup(<NumberInput {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain('type="text"');
        expect(markup).toContain('type="number"');
        expect(markup).not.toContain("injected");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <NumberInput invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
