import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Switch, type SwitchProps, } from "./switch";

describe("Switch composition", () => {
    test("renders a labelled switch with the native checkbox underneath", () => {
        const markup = renderToStaticMarkup(<Switch label="Уведомления" name="notify" />);

        expect(markup).toContain('type="checkbox"');
        expect(markup).toContain('role="switch"');
        expect(markup).toContain('name="notify"');
        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("Уведомления");
        expect(markup).toContain("switch__track");
        expect(markup).toContain("switch__thumb");
    });

    test("associates the label with the switch through matching for/id", () => {
        const markup = renderToStaticMarkup(<Switch id="notify" label="Уведомления" />);

        expect(markup).toContain('for="notify"');
        expect(markup).toContain('id="notify"');
    });

    test("reflects the checked state in both checked and aria-checked", () => {
        const off = renderToStaticMarkup(<Switch label="Off" />);
        const on = renderToStaticMarkup(<Switch label="On" defaultChecked />);

        expect(off).toContain('aria-checked="false"');
        expect(off).not.toMatch(/\schecked=""/);
        expect(on).toContain('aria-checked="true"');
        expect(on).toMatch(/\schecked=""/);
    });

    test("supports a controlled checked value", () => {
        const markup = renderToStaticMarkup(<Switch label="On" checked onChange={() => {}} />);

        expect(markup).toContain('aria-checked="true"');
    });

    test("the native input carries the peer class used by the visual state", () => {
        const markup = renderToStaticMarkup(<Switch />);

        expect(markup).toContain("switch__input");
        expect(markup).toContain("peer");
    });

    test("invalid switch sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Switch invalid error="Требуется согласие" />);

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Требуется согласие");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Switch error="Требуется согласие" />);

        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Требуется согласие");
    });

    test("marks the input disabled", () => {
        const markup = renderToStaticMarkup(<Switch label="Уведомления" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("switch__control--disabled_true");
    });

    test("omits the text span when label is absent or blank", () => {
        expect(renderToStaticMarkup(<Switch />)).not.toContain("switch__text");
        expect(renderToStaticMarkup(<Switch label="   " />)).not.toContain("switch__text");
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop
        const withSize = <Switch size="sm" />;

        expect(withSize).toBeDefined();
    });

    test("strips size, type and children from untyped callers", () => {
        const untypedProps = {
            size: "sm",
            type: "radio",
            children: "injected",
        } as unknown as SwitchProps;
        const markup = renderToStaticMarkup(<Switch {...untypedProps} />);

        expect(markup).not.toContain('size="sm"');
        expect(markup).not.toContain('type="radio"');
        expect(markup).toContain('type="checkbox"');
        expect(markup).not.toContain("injected");
    });

    test("owns aria-invalid and aria-describedby, ignoring consumer values", () => {
        const markup = renderToStaticMarkup(
            <Switch invalid error="Ошибка" aria-invalid={false} aria-describedby="external" />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).not.toContain("external");
    });
});
