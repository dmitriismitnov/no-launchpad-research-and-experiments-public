import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { NumberInput, type NumberInputProps, } from "./number-input";

/** Извлекает открывающий тег кнопки-степпера по её доступному имени. */
const stepperButton = (markup: string, name: string): string =>
    markup.match(new RegExp(`<button[^>]*aria-label="${name}"[^>]*>`))?.[0] ?? "";

/** Проверяет нативный атрибут `disabled`, не путая его с `--disabled_false`. */
const isStepperDisabled = (markup: string, name: string): boolean =>
    /\sdisabled(?:="")?(?=[\s>])/.test(stepperButton(markup, name));

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

    test("exposes the numeric role, bounds and step to the native control", () => {
        const markup = renderToStaticMarkup(
            <NumberInput label="Количество" min={0} max={64} step={2} />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('type="number"');
        expect(markup).toContain('min="0"');
        expect(markup).toContain('max="64"');
        expect(markup).toContain('step="2"');
    });

    test("disables only the saturated direction when an uncontrolled value reaches a bound", () => {
        const atMin = renderToStaticMarkup(<NumberInput defaultValue={0} min={0} max={64} />);
        const atMax = renderToStaticMarkup(<NumberInput defaultValue={64} min={0} max={64} />);

        expect(isStepperDisabled(atMin, "Decrease value")).toBe(true);
        expect(isStepperDisabled(atMin, "Increase value")).toBe(false);
        expect(isStepperDisabled(atMax, "Increase value")).toBe(true);
        expect(isStepperDisabled(atMax, "Decrease value")).toBe(false);
    });

    test("disables only the saturated direction when a controlled value reaches a bound", () => {
        const atMin = renderToStaticMarkup(<NumberInput value={0} min={0} max={64} readOnly />);
        const atMax = renderToStaticMarkup(<NumberInput value={64} min={0} max={64} readOnly />);

        expect(isStepperDisabled(atMin, "Decrease value")).toBe(true);
        expect(isStepperDisabled(atMin, "Increase value")).toBe(false);
        expect(isStepperDisabled(atMax, "Increase value")).toBe(true);
        expect(isStepperDisabled(atMax, "Decrease value")).toBe(false);
    });

    test("keeps both stepper directions enabled between the bounds", () => {
        const markup = renderToStaticMarkup(<NumberInput defaultValue={8} min={0} max={64} />);

        expect(isStepperDisabled(markup, "Increase value")).toBe(false);
        expect(isStepperDisabled(markup, "Decrease value")).toBe(false);
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
