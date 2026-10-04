import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { PinInput, } from "./pin-input";

describe("Pin Input composition", () => {
    test("renders one accessible code input with one-time-code autocomplete", () => {
        const markup = renderToStaticMarkup(<PinInput label="КОД" length={4} />);
        const lower = markup.toLowerCase();

        expect(markup.match(/pinInput__input /g)?.length).toBe(1);
        expect(markup).toContain('type="text"');
        expect(lower).toContain('inputmode="numeric"');
        expect(lower).toContain('maxlength="4"');
        expect(lower).toContain('autocomplete="one-time-code"');
        expect(markup).not.toContain('role="group"');
    });

    test("renders length presentational cells hidden from assistive tech", () => {
        const markup = renderToStaticMarkup(<PinInput length={6} />);

        expect(markup.match(/pinInput__cell /g)?.length).toBe(6);
        expect(markup.match(/aria-hidden="true"/g)?.length).toBe(6);
        expect(markup.match(/<input/g)?.length).toBe(1);
    });

    test("links the visible label to the single input", () => {
        const markup = renderToStaticMarkup(<PinInput label="КОД" length={4} id="code" />);

        expect(markup).toContain("<label");
        expect(markup).toContain('for="code-input"');
        expect(markup).toContain('id="code-input"');
        expect(markup).toContain('aria-labelledby="code-label"');
        expect(markup).toContain("КОД");
    });

    test("announces the remaining characters in a polite live region", () => {
        const empty = renderToStaticMarkup(<PinInput length={4} />);
        const partial = renderToStaticMarkup(<PinInput length={4} defaultValue="48" />);
        const one = renderToStaticMarkup(<PinInput length={1} />);

        expect(empty).toContain('role="status"');
        expect(empty).toContain('aria-live="polite"');
        expect(empty).toContain("4 characters remaining");
        expect(partial).toContain("2 characters remaining");
        expect(one).toContain("1 character remaining");
    });

    test("prefills the presentational cells from defaultValue", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} defaultValue="482" />);

        expect(markup).toContain('value="482"');
        expect(markup).toContain(">4</span>");
        expect(markup).toContain(">8</span>");
        expect(markup).toContain(">2</span>");
    });

    test("invalid sets aria-invalid on the single input and links the error", () => {
        const markup = renderToStaticMarkup(
            <PinInput label="КОД" length={4} invalid error="Неверный код" />,
        );

        expect(markup.match(/aria-invalid="true"/g)?.length).toBe(1);
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Неверный код");
    });

    test("error without invalid renders no message", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} error="Неверный код" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Неверный код");
    });

    test("masked renders dots in the cells instead of the digits", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} defaultValue="482" masked />);

        expect(markup.match(/type="password"/g)?.length).toBe(1);
        expect(markup.match(/>•</g)?.length).toBe(3);
        expect(markup).not.toContain(">4</span>");
        expect(markup).not.toContain(">8</span>");
        expect(markup).not.toContain(">2</span>");
    });

    test("renders a hidden field carrying the name when one is provided", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} name="code" defaultValue="482" />);

        expect(markup).toContain('type="hidden"');
        expect(markup).toContain('name="code"');
        expect(markup).toContain('value="482"');
    });

    test("disabled disables the single input", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} disabled />);

        expect(markup.match(/disabled=""/g)?.length).toBe(1);
        expect(markup).toContain("pinInput__root--disabled_true");
    });

    test("uses aria-label when there is no visible label", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} aria-label="Код входа" />);

        expect(markup).toContain('aria-label="Код входа"');
        expect(markup).not.toContain('aria-labelledby="');
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} className="my-pin" />);

        expect(markup).toContain("my-pin");
        expect(markup).toContain("pinInput__root");
    });
});
