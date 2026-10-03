import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Select, type SelectGroup, type SelectProps, } from "./select";

const options = [
    { value: "starter", label: "Starter", },
    { value: "team", label: "Team", },
    { value: "enterprise", label: "Enterprise", disabled: true, },
] as const;

const groups: readonly SelectGroup[] = [
    {
        label: "FOUNDATION",
        options: [
            { value: "colors", label: "Colors", },
            { value: "type", label: "Type", },
        ],
    },
    {
        label: "COMPONENTS",
        options: [
            { value: "button", label: "Button", },
        ],
    },
];

describe("Select composition", () => {
    test("renders a combobox trigger with its label, placeholder and chevron", () => {
        const markup = renderToStaticMarkup(
            <Select label="КОМАНДА" placeholder="Выберите команду" options={options} />,
        );

        expect(markup).toContain('role="combobox"');
        expect(markup).toContain('aria-haspopup="listbox"');
        expect(markup).toContain('aria-expanded="false"');
        expect(markup).toContain('aria-labelledby="');
        expect(markup).toContain("select__trigger");
        expect(markup).toContain("select__label");
        expect(markup).toContain("select__placeholder");
        expect(markup).toContain("Выберите команду");
        expect(markup).toContain("select__chevron");
        expect(markup).not.toContain("<select");
    });

    test("shows the selected option label from a controlled value", () => {
        const markup = renderToStaticMarkup(
            <Select label="КОМАНДА" value="team" onChange={() => {}} options={options} />,
        );

        expect(markup).toContain("select__value");
        expect(markup).toContain(">Team<");
        expect(markup).not.toContain("select__placeholder");
    });

    test("shows the selected option label from an uncontrolled defaultValue", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" defaultValue="starter" options={options} />);

        expect(markup).toContain("select__value");
        expect(markup).toContain(">Starter<");
    });

    test("renders flat options and additive grouped options in the listbox", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" options={options} groups={groups} />);

        expect(markup).toContain('role="listbox"');
        expect(markup).toContain('role="option"');
        expect(markup).toContain("Starter");
        expect(markup).toContain('role="group"');
        expect(markup).toContain("FOUNDATION");
        expect(markup).toContain("COMPONENTS");
        expect(markup).toContain("Colors");
        expect(markup).toContain("Button");
    });

    test("renders a decorative prefix icon", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" prefixIcon="folder" options={options} />);

        expect(markup).toContain("select__prefixIcon");
        expect(markup).toContain('aria-hidden="true"');
    });

    test("renders a search field reflecting the uncontrolled default query", () => {
        const markup = renderToStaticMarkup(
            <Select label="КОМАНДА" searchable defaultQuery="ab" options={options} />,
        );

        expect(markup).toContain("select__searchInput");
        expect(markup).toContain('value="ab"');
    });

    test("renders no search field when not searchable", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" options={options} />);

        expect(markup).not.toContain("select__searchInput");
    });

    test("always renders a polite selected-status region", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" options={options} />);

        expect(markup).toContain("select__status");
        expect(markup).toContain('role="status"');
        expect(markup).toContain('aria-live="polite"');
    });

    test("invalid sets aria-invalid and the error replaces the hint", () => {
        const markup = renderToStaticMarkup(
            <Select label="КОМАНДА" invalid hint="Подсказка" error="Выберите значение" options={options} />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Выберите значение");
        expect(markup).not.toContain("Подсказка");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" error="Выберите значение" options={options} />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Выберите значение");
    });

    test("consumer id is reused for the trigger, label and described error", () => {
        const markup = renderToStaticMarkup(
            <Select id="team" label="КОМАНДА" invalid error="Выберите значение" options={options} />,
        );

        expect(markup).toContain('id="team"');
        expect(markup).toContain('id="team-label"');
        expect(markup).toContain('id="team-error"');
        expect(markup).toContain('aria-labelledby="team-label"');
        expect(markup).toContain('aria-describedby="team-error"');
    });

    test("disabled marks the trigger", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" options={options} disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("select__trigger--disabled_true");
    });

    test("merges className with the trigger class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Select className="my-select" options={options} />);

        expect(markup).toContain("my-select");
        expect(markup).toContain("select__trigger");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Select invalid error="Ошибка" options={options} aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });

    test("strips size and children from untyped callers", () => {
        const untypedProps = {
            size: 4,
            children: "injected",
            options,
        } as unknown as SelectProps;
        const markup = renderToStaticMarkup(<Select {...untypedProps} />);

        expect(markup).not.toContain('size="4"');
        expect(markup).not.toContain("injected");
    });
});
