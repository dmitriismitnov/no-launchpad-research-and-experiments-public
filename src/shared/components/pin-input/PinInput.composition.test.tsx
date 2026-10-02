import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { PinInput, } from "./pin-input";

describe("Pin Input composition", () => {
    test("renders one labelled group with four single-character cells", () => {
        const markup = renderToStaticMarkup(
            <PinInput label="КОД" length={4} defaultValue="482" />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('role="group"');
        expect(markup).toContain("КОД");
        expect(markup.match(/pinInput__cell /g)?.length).toBe(4);
        expect(markup.match(/maxLength|maxlength/g)?.length).toBe(4);
        expect(markup.toLowerCase()).toContain('autocomplete="one-time-code"');
    });

    test("prefills cells from defaultValue", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} defaultValue="482" />);

        expect(markup).toContain('value="4"');
        expect(markup).toContain('value="8"');
        expect(markup).toContain('value="2"');
    });

    test("invalid sets aria-invalid on each cell and links the error", () => {
        const markup = renderToStaticMarkup(
            <PinInput label="КОД" length={4} invalid error="Неверный код" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Неверный код");
    });

    test("error without invalid renders no message", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} error="Неверный код" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Неверный код");
    });

    test("masked renders password inputs", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} masked />);

        expect(markup.match(/type="password"/g)?.length).toBe(4);
    });

    test("renders a hidden field carrying the name when one is provided", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} name="code" defaultValue="482" />);

        expect(markup).toContain('type="hidden"');
        expect(markup).toContain('name="code"');
        expect(markup).toContain('value="482"');
    });

    test("disabled marks every cell", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} disabled />);

        expect(markup.match(/disabled=""/g)?.length).toBe(4);
    });

    test("uses aria-label when there is no visible label", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} aria-label="Код входа" />);

        expect(markup).toContain('aria-label="Код входа"');
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(<PinInput length={4} className="my-pin" />);

        expect(markup).toContain("my-pin");
        expect(markup).toContain("pinInput__root");
    });
});
