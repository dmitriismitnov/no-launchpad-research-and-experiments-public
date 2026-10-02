import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { DateInput, type DateInputProps, } from "./date-input";

describe("DateInput composition", () => {
    test("renders a labelled text field with the calendar affordance", () => {
        const markup = renderToStaticMarkup(
            <DateInput label="ДАТА" name="date" placeholder="ГГГГ-ММ-ДД" />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("ДАТА");
        expect(markup).toContain('type="text"');
        expect(markup).toContain('name="date"');
        expect(markup).toContain('placeholder="ГГГГ-ММ-ДД"');
        expect(markup).toContain("dateInput__icon");
        expect(markup).toContain("dateInput__input");
    });

    test("shows the hint and hides it when an error is shown", () => {
        const withHint = renderToStaticMarkup(<DateInput label="ДАТА" hint="Формат ISO." />);
        const withError = renderToStaticMarkup(
            <DateInput label="ДАТА" invalid hint="Формат ISO." error="Нужна дата" />,
        );

        expect(withHint).toContain("Формат ISO.");
        expect(withHint).toContain('aria-describedby="');
        expect(withError).toContain("Нужна дата");
        expect(withError).not.toContain("Формат ISO.");
    });

    test("invalid sets aria-invalid and links the error", () => {
        const markup = renderToStaticMarkup(
            <DateInput id="date" label="ДАТА" invalid error="Нужна дата" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('id="date-error"');
        expect(markup).toContain('aria-describedby="date-error"');
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<DateInput label="ДАТА" error="Нужна дата" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Нужна дата");
    });

    test("disabled marks the native input", () => {
        const markup = renderToStaticMarkup(<DateInput label="ДАТА" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("dateInput__control--disabled_true");
    });

    test("merges className with the input class, not replacing it", () => {
        const markup = renderToStaticMarkup(<DateInput className="my-date" />);

        expect(markup).toContain("my-date");
        expect(markup).toContain("dateInput__input");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <DateInput invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });

    test("strips size, type and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            type: "date",
            children: "injected",
        } as unknown as DateInputProps;
        const markup = renderToStaticMarkup(<DateInput {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain('type="date"');
        expect(markup).not.toContain("injected");
    });
});
