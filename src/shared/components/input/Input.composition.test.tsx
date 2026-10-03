import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ICON_CODEPOINTS, } from "../icon/manifest.generated";

import { Input, type InputProps, } from "./input";

const glyph = (name: keyof typeof ICON_CODEPOINTS): string => String.fromCodePoint(ICON_CODEPOINTS[name]);

describe("Input composition", () => {
    test("links a label to the control and forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Input label="Имя" name="name" type="text" placeholder="Как к вам обращаться" required />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("Имя");
        expect(markup).toContain('name="name"');
        expect(markup).toContain('type="text"');
        expect(markup).toContain('placeholder="Как к вам обращаться"');
        expect(markup).toContain("required");
    });

    test("omits the label element when label is absent or blank", () => {
        expect(renderToStaticMarkup(<Input />)).not.toContain("<label");
        expect(renderToStaticMarkup(<Input label="   " />)).not.toContain("<label");
    });

    test("invalid input sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Input invalid error="Заполните поле" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Заполните поле");
        expect(markup).toContain("<p");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Input error="Заполните поле" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Заполните поле");
    });

    test("consumer id is reused for htmlFor and aria-describedby", () => {
        const markup = renderToStaticMarkup(<Input id="email" label="Email" invalid error="Нужен email" />);

        expect(markup).toContain('for="email"');
        expect(markup).toContain('id="email"');
        expect(markup).toContain('id="email-error"');
        expect(markup).toContain('aria-describedby="email-error"');
    });

    test("className is merged with the input class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Input className="my-field" />);

        expect(markup).toContain("my-field");
        expect(markup).toContain("input__input");
    });

    test("forwards the documented native input types", () => {
        for ( const type of [ "text", "email", "password", "search", ] as const ) {
            const markup = renderToStaticMarkup(<Input type={type} />);

            expect(markup).toContain(`type="${type}"`);
        }
    });

    test("forwards the required and read-only native states", () => {
        const markup = renderToStaticMarkup(<Input required readOnly defaultValue="fixed" />);

        expect(markup).toContain("required");
        expect(markup).toMatch(/readonly/i);
        expect(markup).toContain('value="fixed"');
        expect(markup).not.toContain("aria-invalid");
    });

    test("renders decorative prefix and suffix icons in their slots", () => {
        const markup = renderToStaticMarkup(<Input prefixIcon="mail" suffixIcon="x" />);

        expect(markup).toContain("input__prefixIcon");
        expect(markup).toContain("input__suffixIcon");
        expect(markup).toContain("icon--size_sm");
        expect(markup).toContain(glyph("mail"));
        expect(markup).toContain(glyph("x"));
        expect(markup).toContain(`aria-hidden="true"`);
        expect(markup).not.toContain(`role="img"`);
    });

    test("omits the icon slots when no icons are supplied", () => {
        const markup = renderToStaticMarkup(<Input />);

        expect(markup).not.toContain("input__prefixIcon");
        expect(markup).not.toContain("input__suffixIcon");
    });

    test("rejects unknown icon names and ReactNode at the type level", () => {
        // @ts-expect-error an unknown icon name is not assignable to IconName
        const unknown = <Input prefixIcon="definitely-not-an-icon" />;
        // @ts-expect-error a ReactNode is not assignable to IconName
        const node = <Input suffixIcon={<span />} />;

        expect(unknown).toBeDefined();
        expect(node).toBeDefined();
    });

    test("invalid without a non-blank error keeps aria-invalid and renders no message", () => {
        const noError = renderToStaticMarkup(<Input invalid />);
        const blankError = renderToStaticMarkup(<Input invalid error="   " />);

        for ( const markup of [ noError, blankError, ] ) {
            expect(markup).toContain('aria-invalid="true"');
            expect(markup).not.toContain("<p");
            expect(markup).not.toContain("aria-describedby");
        }
    });

    test("forwards value, defaultValue and onChange without owning state", () => {
        const controlled = renderToStaticMarkup(<Input value="typed" onChange={() => {}} readOnly />);
        const uncontrolled = renderToStaticMarkup(<Input defaultValue="initial" />);

        expect(controlled).toContain('value="typed"');
        expect(uncontrolled).toContain('value="initial"');
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop in v1
        const withSize = <Input size="sm" />;

        expect(withSize).toBeDefined();
    });

    test("strips size and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            children: "injected",
        } as unknown as InputProps;
        const markup = renderToStaticMarkup(<Input {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain("injected");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Input invalid error="Заполните поле" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
