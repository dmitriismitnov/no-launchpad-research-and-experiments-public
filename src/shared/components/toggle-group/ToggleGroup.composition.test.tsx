import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ToggleGroup, type ToggleGroupOption, } from "./toggle-group";

const options: readonly ToggleGroupOption[] = [
    { value: "grid", label: "Grid", },
    { value: "list", label: "List", },
    { value: "board", label: "Board", disabled: true, },
];

describe("ToggleGroup composition", () => {
    test("renders a labelled group of pressed-state buttons", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup options={options} aria-label="View" />,
        );

        expect(markup).toContain('role="group"');
        expect(markup).toContain('aria-label="View"');
        expect(markup).toContain("toggleGroup__root");
        expect(markup).toContain("toggleGroup__item");
        expect(markup).toContain("toggleGroup__label");
        expect(markup).toContain("Grid");
        expect(markup).toContain('aria-pressed="false"');
    });

    test("reflects the uncontrolled default value", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup options={options} defaultValue={[ "list", ]} aria-label="View" />,
        );

        expect(markup).toContain('aria-pressed="true"');
    });

    test("reflects a controlled value", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup options={options} value={[ "grid", "list", ]} aria-label="View" />,
        );

        expect(markup.match(/aria-pressed="true"/g)?.length).toBe(2);
    });

    test("disables the whole group", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup options={options} disabled aria-label="View" />,
        );

        expect(markup.match(/disabled=""/g)?.length).toBe(options.length);
    });

    test("merges className instead of replacing the root class", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup options={options} aria-label="View" className="my-group" />,
        );

        expect(markup).toContain("my-group");
        expect(markup).toContain("toggleGroup__root");
    });
});
