import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { RadioGroup, } from "./radio-group";

const options = [
    { value: "starter", label: "Starter", },
    { value: "team", label: "Team", },
    { value: "enterprise", label: "Enterprise", disabled: true, },
] as const;

describe("Radio Group composition", () => {
    test("renders a labelled radiogroup with a shared name and native radios", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup label="ПЛАН" name="plan" defaultValue="team" options={options} />,
        );

        expect(markup).toContain('role="radiogroup"');
        expect(markup).toContain("ПЛАН");
        expect(markup).toContain('type="radio"');
        expect(markup).toContain('name="plan"');
        expect(markup).toContain('value="starter"');
        expect(markup).toContain("Starter");
        expect(markup).toContain("Team");
        expect(markup).toContain("checked");
    });

    test("invalid sets aria-invalid on the group and links the error", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup label="ПЛАН" invalid error="Выберите план" options={options} />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Выберите план");
    });

    test("error without invalid renders no message", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup label="ПЛАН" error="Выберите план" options={options} />,
        );

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Выберите план");
    });

    test("horizontal orientation switches the options row", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup label="ПЛАН" orientation="horizontal" options={options} />,
        );

        expect(markup).toContain("radioGroup__options--orientation_horizontal");
    });

    test("vertical orientation is the default options column", () => {
        const markup = renderToStaticMarkup(<RadioGroup label="ПЛАН" options={options} />);

        expect(markup).toContain("radioGroup__options--orientation_vertical");
        expect(markup).not.toContain("radioGroup__options--orientation_horizontal");
    });

    test("links the group to the error text as its described-by", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup id="plan" label="ПЛАН" invalid error="Выберите план" options={options} />,
        );
        const group = /role="radiogroup"[^>]*/u.exec(markup)?.[0] ?? "";
        const describedBy = /aria-describedby="([^"]+)"/u.exec(group)?.[1];

        expect(describedBy).toBe("plan-error");
        expect(markup).toContain('id="plan-error"');
    });

    test("each option keeps its own accessible label from the group name", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup label="ПЛАН" name="plan" options={options} />,
        );

        expect(markup).toContain('name="plan"');
        expect(markup).toContain("Starter");
        expect(markup).toContain("Team");
        expect(markup).toContain("Enterprise");
    });

    test("disabled marks every radio disabled", () => {
        const markup = renderToStaticMarkup(<RadioGroup label="ПЛАН" disabled options={options} />);

        expect(markup).toContain("disabled");
    });

    test("falls back to aria-label when there is no visible label", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup aria-label="План" options={options} />,
        );

        expect(markup).toContain('aria-label="План"');
        expect(markup).not.toContain('role="radiogroup" aria-labelledby');
    });

    test("per-option disabled is forwarded", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup label="ПЛАН" options={[ { value: "team", label: "Team", disabled: true, }, ]} />,
        );

        expect(markup).toContain("disabled");
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(
            <RadioGroup className="my-group" label="ПЛАН" options={options} />,
        );

        expect(markup).toContain("my-group");
        expect(markup).toContain("radioGroup__root");
    });
});
