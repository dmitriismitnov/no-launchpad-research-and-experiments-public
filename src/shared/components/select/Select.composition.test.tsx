import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Select, type SelectProps, } from "./select";

const options = [
    { value: "starter", label: "Starter", },
    { value: "team", label: "Team", },
    { value: "enterprise", label: "Enterprise", disabled: true, },
] as const;

describe("Select composition", () => {
    test("renders a native select with the label, options and placeholder", () => {
        const markup = renderToStaticMarkup(
            <Select
                label="КОМАНДА"
                name="team"
                placeholder="Выберите команду"
                defaultValue="team"
                options={options}
            />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("<select");
        expect(markup).toContain('name="team"');
        expect(markup).toContain("КОМАНДА");
        expect(markup).toContain("Выберите команду");
        expect(markup).toContain('value="starter"');
        expect(markup).toContain("Enterprise");
        expect(markup).toContain("select__select");
        expect(markup).toContain("select__chevron");
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
        const markup = renderToStaticMarkup(
            <Select label="КОМАНДА" error="Выберите значение" options={options} />,
        );

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Выберите значение");
    });

    test("consumer id is reused for htmlFor and aria-describedby", () => {
        const markup = renderToStaticMarkup(
            <Select id="team" label="КОМАНДА" invalid error="Выберите значение" options={options} />,
        );

        expect(markup).toContain('for="team"');
        expect(markup).toContain('id="team"');
        expect(markup).toContain('id="team-error"');
        expect(markup).toContain('aria-describedby="team-error"');
    });

    test("disabled marks the native select", () => {
        const markup = renderToStaticMarkup(<Select label="КОМАНДА" options={options} disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("select__select--disabled_true");
    });

    test("merges className with the select class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Select className="my-select" options={options} />);

        expect(markup).toContain("my-select");
        expect(markup).toContain("select__select");
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
