import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Textarea, } from "./textarea";

describe("Textarea composition", () => {
    test("links a label to the control and forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Textarea label="Описание" name="bio" placeholder="Расскажите о себе" required rows={4} />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("<textarea");
        expect(markup).toContain("Описание");
        expect(markup).toContain('name="bio"');
        expect(markup).toContain('placeholder="Расскажите о себе"');
        expect(markup).toContain('rows="4"');
        expect(markup).toContain("required");
    });

    test("omits the label element when label is absent or blank", () => {
        expect(renderToStaticMarkup(<Textarea />)).not.toContain("<label");
        expect(renderToStaticMarkup(<Textarea label="   " />)).not.toContain("<label");
    });

    test("invalid textarea sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Textarea invalid error="Слишком длинно" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Слишком длинно");
        expect(markup).toContain("<p");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Textarea error="Слишком длинно" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Слишком длинно");
    });

    test("consumer id is reused for htmlFor and aria-describedby", () => {
        const markup = renderToStaticMarkup(<Textarea id="bio" label="Bio" invalid error="Нужен текст" />);

        expect(markup).toContain('for="bio"');
        expect(markup).toContain('id="bio"');
        expect(markup).toContain('id="bio-error"');
        expect(markup).toContain('aria-describedby="bio-error"');
    });

    test("renders a character counter when maxLength is set", () => {
        const markup = renderToStaticMarkup(<Textarea maxLength={200} defaultValue="abc" />);

        expect(markup).toContain("textarea__counter");
        expect(markup).toContain("3 / 200");
    });

    test("announces the remaining characters when a limit exists", () => {
        const markup = renderToStaticMarkup(<Textarea maxLength={200} defaultValue="abc" />);

        expect(markup).toContain('role="status"');
        expect(markup).toContain('aria-live="polite"');
        expect(markup).toContain("197 characters remaining");
    });

    test("omits the counter when maxLength is absent and showCount is not forced", () => {
        expect(renderToStaticMarkup(<Textarea />)).not.toContain("textarea__counter");
        expect(renderToStaticMarkup(<Textarea showCount />)).toContain("textarea__counter");
    });

    test("merges className with the control class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Textarea className="my-area" />);

        expect(markup).toContain("my-area");
        expect(markup).toContain("textarea__control");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Textarea invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
