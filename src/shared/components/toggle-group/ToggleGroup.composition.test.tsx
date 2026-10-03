import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ToggleGroup, type ToggleGroupOption, } from "./toggle-group";

const options: readonly ToggleGroupOption[] = [
    { value: "grid", label: "Grid", },
    { value: "list", label: "List", },
    { value: "board", label: "Board", disabled: true, },
];

const iconOptions: readonly ToggleGroupOption[] = [
    { value: "grid", icon: "layout-grid", "aria-label": "Grid view", },
    { value: "list", icon: "menu", "aria-label": "List view", },
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

    test("renders the exclusive projection as a radiogroup of radios", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup selectionMode="single" options={options} defaultValue={[ "list", ]} aria-label="View" />,
        );

        expect(markup).toContain('role="radiogroup"');
        expect(markup.match(/role="radio"/g)?.length).toBe(options.length);
        expect(markup).not.toContain("aria-pressed");
        expect(markup.match(/aria-checked="true"/g)?.length).toBe(1);
    });

    test("keeps multiple mode as a group of pressed-state buttons", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup
                selectionMode="multiple"
                options={options}
                defaultValue={[ "grid", "list", ]}
                aria-label="View"
            />,
        );

        expect(markup).toContain('role="group"');
        expect(markup).not.toContain('role="radio"');
        expect(markup.match(/aria-pressed="true"/g)?.length).toBe(2);
    });

    test("single mode renders only the first value of a malformed controlled array", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup
                selectionMode="single"
                options={options}
                value={[ "grid", "list", "board", ]}
                aria-label="View"
            />,
        );
        const checked = markup.match(/aria-checked="(?:true|false)"/g);

        expect(checked?.length).toBe(options.length);
        expect(checked?.[0]).toBe('aria-checked="true"');
        expect(markup.match(/aria-checked="true"/g)?.length).toBe(1);
    });

    test("single mode roves a single tab stop onto the selected enabled item", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup selectionMode="single" options={options} defaultValue={[ "list", ]} aria-label="View" />,
        );

        expect(markup.match(/tabindex="0"/g)?.length).toBe(1);
        expect(markup.match(/tabindex="-1"/g)?.length).toBe(options.length - 1);
    });

    test("single mode falls back to the first enabled item when nothing is selected", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup selectionMode="single" options={options} aria-label="View" />,
        );

        expect(markup.match(/tabindex="0"/g)?.length).toBe(1);
    });

    test("renders icon-only options with their accessible names and no label slot", () => {
        const markup = renderToStaticMarkup(
            <ToggleGroup options={iconOptions} aria-label="View" />,
        );

        expect(markup).toContain("toggleGroup__icon");
        expect(markup).not.toContain("toggleGroup__label");
        expect(markup).toContain('aria-label="Grid view"');
        expect(markup).toContain('aria-label="List view"');
    });

    test("renders two, three and four exclusive segments", () => {
        for ( const size of [ 2, 3, 4, ] ) {
            const sized: readonly ToggleGroupOption[] = Array.from(
                { length: size, },
                (_, index) => ( { value: `option-${index}`, label: `Option ${index + 1}`, } ),
            );
            const markup = renderToStaticMarkup(
                <ToggleGroup selectionMode="single" options={sized} aria-label="View" />,
            );

            expect(markup.match(/role="radio"/g)?.length).toBe(size);
        }
    });

    test("rejects an option without a label or accessible name", () => {
        const unnamed = [ { value: "grid", icon: "check", }, ] as unknown as readonly ToggleGroupOption[];

        expect(() =>
            renderToStaticMarkup(
                <ToggleGroup options={unnamed} aria-label="View" />,
            )
        ).toThrow(/non-empty/);
    });
});
