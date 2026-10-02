import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Radio, type RadioProps, } from "./radio";

describe("Radio composition", () => {
    test("links a label to a native radio and renders the visual parts", () => {
        const markup = renderToStaticMarkup(
            <Radio label="Стартер" name="plan" value="starter" required />,
        );

        expect(markup).toContain('type="radio"');
        expect(markup).toContain('name="plan"');
        expect(markup).toContain('value="starter"');
        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("Стартер");
        expect(markup).toContain("radio__control");
        expect(markup).toContain("radio__box");
        expect(markup).toContain("radio__dot");
        expect(markup).toContain("required");
    });

    test("the native input carries the peer class used by the visual state", () => {
        const markup = renderToStaticMarkup(<Radio />);

        expect(markup).toContain("radio__input");
        expect(markup).toContain("peer");
    });

    test("forwards checked and defaultChecked without owning state", () => {
        const controlled = renderToStaticMarkup(<Radio checked readOnly />);
        const uncontrolled = renderToStaticMarkup(<Radio defaultChecked />);

        expect(controlled).toContain("checked");
        expect(uncontrolled).toContain("checked");
    });

    test("invalid radio sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Radio invalid error="Выберите вариант" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Выберите вариант");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Radio error="Выберите вариант" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Выберите вариант");
    });

    test("marks the input disabled", () => {
        const markup = renderToStaticMarkup(<Radio label="Стартер" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("radio__box--disabled_true");
    });

    test("omits the text span when label is absent or blank", () => {
        expect(renderToStaticMarkup(<Radio />)).not.toContain("radio__text");
        expect(renderToStaticMarkup(<Radio label="   " />)).not.toContain("radio__text");
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop
        const withSize = <Radio size="sm" />;

        expect(withSize).toBeDefined();
    });

    test("strips size, type and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            type: "checkbox",
            children: "injected",
        } as unknown as RadioProps;
        const markup = renderToStaticMarkup(<Radio {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain('type="checkbox"');
        expect(markup).toContain('type="radio"');
        expect(markup).not.toContain("injected");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Radio invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
