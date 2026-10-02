import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ICON_CODEPOINTS, } from "../icon/manifest.generated";
import { Checkbox, type CheckboxProps, } from "./checkbox";

describe("Checkbox composition", () => {
    test("links a label to a native checkbox and renders the visual parts", () => {
        const markup = renderToStaticMarkup(<Checkbox label="Согласен" name="terms" required />);

        expect(markup).toContain('type="checkbox"');
        expect(markup).toContain('name="terms"');
        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("Согласен");
        expect(markup).toContain("checkbox__control");
        expect(markup).toContain("checkbox__box");
        expect(markup).toContain("checkbox__mark");
        expect(markup).toContain("required");
    });

    test("the native input carries the peer class used by the visual state", () => {
        const markup = renderToStaticMarkup(<Checkbox />);

        expect(markup).toContain("checkbox__input");
        expect(markup).toContain("peer");
    });

    test("renders the check glyph by default and the minus glyph when indeterminate", () => {
        const checked = renderToStaticMarkup(<Checkbox />);
        const mixed = renderToStaticMarkup(<Checkbox indeterminate />);

        expect(checked).toContain(String.fromCodePoint(ICON_CODEPOINTS["check"]));
        expect(mixed).toContain(String.fromCodePoint(ICON_CODEPOINTS["minus"]));
    });

    test("forwards checked and defaultChecked without owning state", () => {
        const controlled = renderToStaticMarkup(<Checkbox checked readOnly />);
        const uncontrolled = renderToStaticMarkup(<Checkbox defaultChecked />);

        expect(controlled).toContain("checked");
        expect(uncontrolled).toContain("checked");
    });

    test("invalid checkbox sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Checkbox invalid error="Обязательное поле" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Обязательное поле");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Checkbox error="Обязательное поле" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Обязательное поле");
    });

    test("marks the input disabled", () => {
        const markup = renderToStaticMarkup(<Checkbox label="Согласен" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("checkbox__box--disabled_true");
    });

    test("omits the text span when label is absent or blank", () => {
        expect(renderToStaticMarkup(<Checkbox />)).not.toContain("checkbox__text");
        expect(renderToStaticMarkup(<Checkbox label="   " />)).not.toContain("checkbox__text");
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop
        const withSize = <Checkbox size="sm" />;

        expect(withSize).toBeDefined();
    });

    test("strips size, type and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            type: "radio",
            children: "injected",
        } as unknown as CheckboxProps;
        const markup = renderToStaticMarkup(<Checkbox {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain('type="radio"');
        expect(markup).toContain('type="checkbox"');
        expect(markup).not.toContain("injected");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Checkbox invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
