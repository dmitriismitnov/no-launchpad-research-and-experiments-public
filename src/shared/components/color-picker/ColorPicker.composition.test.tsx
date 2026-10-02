import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ColorPicker, } from "./color-picker";

describe("ColorPicker composition", () => {
    test("renders a closed trigger with the swatch and value", () => {
        const markup = renderToStaticMarkup(<ColorPicker defaultValue="#2563EB" />);

        expect(markup).toContain("colorPicker__field");
        expect(markup).toContain("colorPicker__swatch");
        expect(markup).toContain("colorPicker__value");
        expect(markup).toContain("#2563EB");
        expect(markup).toContain('aria-haspopup="dialog"');
        expect(markup).toContain('aria-expanded="false"');
        expect(markup).not.toContain("popover__surface");
        expect(markup).not.toContain('role="listbox"');
    });

    test("renders the palette inside the popover when open", () => {
        const markup = renderToStaticMarkup(<ColorPicker defaultValue="#2563EB" defaultOpen />);

        expect(markup).toContain("popover__surface");
        expect(markup).toContain('role="listbox"');
        expect(markup.match(/role="option"/g)?.length).toBe(12);
        expect(markup).toContain('aria-selected="true"');
        expect(markup).toContain("colorPicker__swatchButton--selected_true");
    });

    test("accepts a custom palette", () => {
        const markup = renderToStaticMarkup(
            <ColorPicker palette={[ "#111111", "#222222", ]} defaultOpen />,
        );

        expect(markup.match(/role="option"/g)?.length).toBe(2);
        expect(markup).toContain('aria-label="#111111"');
    });

    test("invalid field shows the error and the invalid class", () => {
        const markup = renderToStaticMarkup(<ColorPicker invalid error="Некорректный цвет" />);

        expect(markup).toContain("colorPicker__field--invalid_true");
        expect(markup).toContain("Некорректный цвет");
    });

    test("hides the hint while the error is shown", () => {
        const withHint = renderToStaticMarkup(<ColorPicker hint="Hex-значение." />);
        const withError = renderToStaticMarkup(
            <ColorPicker invalid hint="Hex-значение." error="Некорректный цвет" />,
        );

        expect(withHint).toContain("Hex-значение.");
        expect(withError).not.toContain("Hex-значение.");
    });

    test("disabled marks the field", () => {
        const markup = renderToStaticMarkup(<ColorPicker disabled />);

        expect(markup).toContain("colorPicker__field--disabled_true");
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(<ColorPicker className="my-color" />);

        expect(markup).toContain("my-color");
        expect(markup).toContain("colorPicker__root");
    });
});
