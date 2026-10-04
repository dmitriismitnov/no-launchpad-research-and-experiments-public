import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Editable, } from "./editable";
import { editableRecipe, } from "./preset";

describe("Editable composition", () => {
    test("renders a focusable read view with the value and affordance", () => {
        const markup = renderToStaticMarkup(<Editable value="Workspace name" />);

        expect(markup).toContain("<button");
        expect(markup).toContain('aria-label="Edit Workspace name"');
        expect(markup).toContain("Workspace name");
        expect(markup).toContain("editable__icon");
        expect(markup).toContain("editable__value");
    });

    test("omits the affordance when it is turned off", () => {
        const markup = renderToStaticMarkup(<Editable value="Workspace name" affordance={false} />);

        expect(markup).not.toContain("editable__icon");
    });

    test("shows the placeholder for an empty value", () => {
        const markup = renderToStaticMarkup(<Editable value="" placeholder="Без названия" />);

        expect(markup).toContain("Без названия");
    });

    test("invalid shows the error and links it to the read view", () => {
        const markup = renderToStaticMarkup(
            <Editable value="Workspace name" invalid error="Слишком длинное имя" />,
        );

        expect(markup).toContain("editable__control--invalid_true");
        expect(markup).toContain("Слишком длинное имя");
        expect(markup).toContain('aria-describedby="');
    });

    test("disabled marks the read view", () => {
        const markup = renderToStaticMarkup(<Editable value="Workspace name" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("editable__control--disabled_true");
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(<Editable value="Workspace name" className="my-editable" />);

        expect(markup).toContain("my-editable");
        expect(markup).toContain("editable__root");
    });

    test("accepts a custom read-view label", () => {
        const markup = renderToStaticMarkup(
            <Editable value="Workspace name" editLabel="Переименовать" />,
        );

        expect(markup).toContain('aria-label="Переименовать"');
    });

    test("the editor exposes keyboard-reachable confirm and cancel controls", () => {
        const markup = renderToStaticMarkup(<Editable value="Workspace name" saving />);

        expect(markup).toContain('aria-label="Confirm"');
        expect(markup).toContain('aria-label="Cancel"');
        expect(markup).toContain("editable__confirm");
        expect(markup).toContain("editable__cancel");
        expect(markup.match(/<button/g)?.length).toBe(2);
    });

    test("saving keeps the edit field in place and shows a progress indicator", () => {
        const markup = renderToStaticMarkup(<Editable value="Workspace name" saving />);

        expect(markup).toContain("editable__input");
        expect(markup).toContain('aria-busy="true"');
        expect(markup).toContain('aria-label="Saving"');
        expect(markup).not.toContain('aria-label="Edit Workspace name"');
    });

    test("the saving indicator rotates and stops under reduced motion", () => {
        const saving = editableRecipe.base?.["saving"] as Record<string, unknown> | undefined;
        const reduced = saving?.["@media (prefers-reduced-motion: reduce)"] as
            | Record<string, unknown>
            | undefined;

        expect(saving?.["animation"]).toBe("spin 1s linear infinite");
        expect(reduced?.["animation"]).toBe("none");
    });
});
