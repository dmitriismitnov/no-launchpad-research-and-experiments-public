import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { stepRecipe, } from "./preset";
import { Step, } from "./step";

describe("step composition", () => {
    test("renders a numbered marker and label", () => {
        const markup = renderToStaticMarkup(<Step number={3} label="States" />);

        expect(markup).toContain("step__root");
        expect(markup).toContain("step__marker");
        expect(markup).toContain("step__markerContent");
        expect(markup).toContain("step__title");
        expect(markup).toContain("3");
        expect(markup).toContain("States");
    });

    test("renders a check marker for a completed step", () => {
        const markup = renderToStaticMarkup(
            <Step number={1} label="Foundation" state="completed" />,
        );

        expect(markup).toContain("step__root--state_completed");
        expect(markup).toContain("icon");
        expect(markup).not.toContain("step__markerContent");
    });

    test("exposes the current step as such", () => {
        const markup = renderToStaticMarkup(
            <Step number={2} label="Components" state="current" />,
        );

        expect(markup).toContain(`aria-current="step"`);
        expect(markup).toContain("step__root--state_current");
    });

    test("renders a description when one is given", () => {
        const markup = renderToStaticMarkup(
            <Step number={4} label="Screens" state="upcoming" description="Choose a layout" />,
        );

        expect(markup).toContain("step__description");
        expect(markup).toContain("Choose a layout");
    });

    test("renders an error marker", () => {
        const markup = renderToStaticMarkup(
            <Step number={2} label="Validate" state="error" />,
        );

        expect(markup).toContain("step__root--state_error");
        expect(markup).toContain("!");
    });

    // Pen `cAzIA` master (`f9QCHG` token contract): the upcoming marker number
    // (`PC2Eg`) and label (`t5z2Jc`) resolve `text/secondary`, not the numeric
    // `common.600` fill. The marker surface stays `surface/sunken` and its
    // boundary `border/strong`.
    test("paints the upcoming marker number with the text/secondary role", () => {
        expect(stepRecipe.variants?.["state"]?.["upcoming"]?.["marker"]).toMatchObject({
            color: "semantic.text.secondary",
        });
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Step number={1} label="One" data-testid="s" />);

        expect(markup).toContain(`data-testid="s"`);
    });
});
