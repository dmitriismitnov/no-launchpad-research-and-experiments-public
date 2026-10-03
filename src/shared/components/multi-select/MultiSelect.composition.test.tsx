import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { MultiSelect, type MultiSelectProps, } from "./multi-select";

const options = [
    { value: "foundation", label: "foundation", },
    { value: "semantic", label: "semantic", },
    { value: "components", label: "components", },
    { value: "patterns", label: "patterns", },
] as const;

describe("Multi Select composition", () => {
    test("renders the label, chips, overflow counter and toggle", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect
                label="ТЕГИ"
                maxVisible={2}
                defaultValue={[ "foundation", "semantic", "components", ]}
                options={options}
            />,
        );

        expect(markup).toContain("<span");
        expect(markup).toContain("ТЕГИ");
        expect(markup).toContain("foundation");
        expect(markup).toContain("semantic");
        expect(markup).toContain("+1");
        expect(markup).toContain("multiSelect__toggle");
        expect(markup).toContain('aria-haspopup="listbox"');
        expect(markup).toContain('aria-expanded="false"');
    });

    test("renders a placeholder when nothing is selected", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" placeholder="Выберите теги" options={options} />,
        );

        expect(markup).toContain("Выберите теги");
        expect(markup).toContain("multiSelect__placeholder");
    });

    test("gives every chip remove button an accessible name", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" defaultValue={[ "foundation", ]} options={options} />,
        );

        expect(markup).toContain('aria-label="Remove foundation"');
    });

    test("disabled hides the chip remove buttons", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" defaultValue={[ "foundation", ]} options={options} disabled />,
        );

        expect(markup).not.toContain('aria-label="Remove foundation"');
        expect(markup).toContain("disabled");
    });

    test("invalid sets aria-invalid and links the error", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" invalid error="Выберите тег" options={options} />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Выберите тег");
    });

    test("error without invalid renders no message", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" error="Выберите тег" options={options} />,
        );

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Выберите тег");
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect className="my-multi" label="ТЕГИ" options={options} />,
        );

        expect(markup).toContain("my-multi");
        expect(markup).toContain("multiSelect__root");
    });

    test("owns aria-describedby, ignoring a consumer value", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect
                label="ТЕГИ"
                invalid
                error="Ошибка"
                options={options}
                aria-describedby="external"
            />,
        );

        expect(markup).not.toContain("external");
        expect(markup).toContain('aria-describedby="');
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop in v1
        const withSize = <MultiSelect size="sm" options={options} />;

        expect(withSize).toBeDefined();
    });

    test("strips size and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            children: "injected",
            options,
        } as unknown as MultiSelectProps;
        const markup = renderToStaticMarkup(<MultiSelect {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain("injected");
    });

    test("announces the selected count in a polite status region", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" defaultValue={[ "foundation", "semantic", ]} options={options} />,
        );

        expect(markup).toContain("multiSelect__status");
        expect(markup).toContain('role="status"');
        expect(markup).toContain('aria-live="polite"');
        expect(markup).toContain("2 selected");
    });

    test("announces the max selection count when maxSelected is set", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect
                label="ТЕГИ"
                maxSelected={3}
                defaultValue={[ "foundation", ]}
                options={options}
            />,
        );

        expect(markup).toContain("1 of 3 selected");
    });

    test("renders a search field reflecting the uncontrolled default query when searchable", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect label="ТЕГИ" searchable defaultQuery="fo" options={options} />,
        );

        expect(markup).toContain("multiSelect__searchInput");
        expect(markup).toContain('value="fo"');
    });

    test("renders no search field when not searchable", () => {
        const markup = renderToStaticMarkup(<MultiSelect label="ТЕГИ" options={options} />);

        expect(markup).not.toContain("multiSelect__searchInput");
    });

    test("marks unselected options as max reached at the cap but keeps selected options removable", () => {
        const markup = renderToStaticMarkup(
            <MultiSelect
                label="ТЕГИ"
                maxSelected={2}
                defaultValue={[ "foundation", "semantic", ]}
                options={options}
            />,
        );

        expect(markup).toContain("multiSelect__option");
        expect(markup).toContain('data-max-reached="true"');
        // The two selected options stay selectable so they can be removed.
        expect(markup).toContain('aria-selected="true"');
        expect(markup).toContain('aria-label="Remove foundation"');
    });
});
