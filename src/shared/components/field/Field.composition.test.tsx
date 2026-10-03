import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Field, } from "./field";

describe("Field composition", () => {
    test("links the label to a native control and wires required and hint", () => {
        const markup = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" required hint="Строчные буквы, без пробелов.">
                <input name="workspace" defaultValue="acme-design" />
            </Field>,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="workspace"');
        expect(markup).toContain('id="workspace"');
        expect(markup).toContain("Рабочая область");
        expect(markup).toContain("required");
        expect(markup).toContain('aria-describedby="workspace-hint"');
        expect(markup).toContain('id="workspace-hint"');
        expect(markup).toContain("Строчные буквы, без пробелов.");
    });

    test("invalid sets aria-invalid and the error replaces the hint", () => {
        const markup = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" invalid hint="Подсказка" error="Обязательное поле">
                <input />
            </Field>,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="workspace-error"');
        expect(markup).toContain('id="workspace-error"');
        expect(markup).toContain("Обязательное поле");
        expect(markup).not.toContain("Подсказка");
    });

    test("error without invalid renders no message", () => {
        const markup = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" error="Обязательное поле">
                <input />
            </Field>,
        );

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Обязательное поле");
    });

    test("omits the label row when there is no label and no required marker", () => {
        const markup = renderToStaticMarkup(
            <Field>
                <input />
            </Field>,
        );

        expect(markup).not.toContain("<label");
        expect(markup).not.toContain("field__required");
    });

    test("disabled marks the native control and the label", () => {
        const markup = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" disabled>
                <input />
            </Field>,
        );

        expect(markup).toContain("disabled");
        expect(markup).toContain("field__label");
    });

    test("generates a matching id pair when none is supplied", () => {
        const markup = renderToStaticMarkup(
            <Field label="Имя">
                <input />
            </Field>,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain('id="');
    });

    test("keeps a consumer-provided control id for both label and wiring", () => {
        const markup = renderToStaticMarkup(
            <Field label="Имя" hint="Как к вам обращаться">
                <input id="email" />
            </Field>,
        );

        expect(markup).toContain('for="email"');
        expect(markup).toContain('id="email"');
        expect(markup).toContain('aria-describedby="email-hint"');
    });

    test("announces the hint and the error when they change", () => {
        const hint = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" hint="Подсказка">
                <input />
            </Field>,
        );
        const error = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" invalid error="Ошибка">
                <input />
            </Field>,
        );

        for ( const markup of [ hint, error, ] ) {
            expect(markup).toContain('role="status"');
            expect(markup).toContain('aria-live="polite"');
        }

        expect(hint).toContain("Подсказка");
        expect(error).toContain("Ошибка");
    });

    test("exposes required and disabled as states on a non-native control", () => {
        const markup = renderToStaticMarkup(
            <Field id="workspace" label="Рабочая область" required disabled>
                <div role="textbox" />
            </Field>,
        );

        expect(markup).toContain('aria-required="true"');
        expect(markup).toContain('aria-disabled="true"');
    });
});
