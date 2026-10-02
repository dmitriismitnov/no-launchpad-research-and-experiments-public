import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Tour, } from "./tour";

const steps = [
    { title: "Welcome", body: "Start with an overview.", },
    { title: "Compose from tokens", body: "Every component reads the foundation.", },
    { title: "Ship it", body: "Publish when you are ready.", },
] as const;

describe("tour composition", () => {
    test("renders a step bubble with a counter, dots and actions", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} defaultStep={1} defaultOpen />,
        );

        expect(markup).toContain("tour__root");
        expect(markup).toContain("tour__surface");
        expect(markup).toContain("tour__content");
        expect(markup).toContain("tour__step");
        expect(markup).toContain("tour__title");
        expect(markup).toContain("tour__body");
        expect(markup).toContain("tour__footer");
        expect(markup).toContain("tour__dots");
        expect(markup).toContain("tour__dot");
        expect(markup).toContain("tour__back");
        expect(markup).toContain("tour__next");
        expect(markup).toContain("tour__close");
        expect(markup).toContain("Step 2 of 3");
        expect(markup).toContain("Compose from tokens");
        expect(markup).toContain("Every component reads the foundation.");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-label="Product tour"`);
    });

    test("marks the current dot with the current variant", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} defaultStep={1} defaultOpen />,
        );

        expect(markup).toContain("tour__dot--current_true");
    });

    test("disables Back on the first step", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} defaultOpen />);

        expect(markup).toContain("disabled");
    });

    test("labels the final action as Finish", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} defaultStep={2} defaultOpen />,
        );

        expect(markup).toContain("Finish");
        expect(markup).toContain("Step 3 of 3");
    });

    test("omits the skip control when not skippable", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} skippable={false} defaultOpen />,
        );

        expect(markup).not.toContain("tour__close");
        expect(markup).not.toContain(`aria-label="Skip tour"`);
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} trigger="Start" />);

        expect(markup).toContain("tour__root");
        expect(markup).not.toContain("tour__surface");
        expect(markup).not.toContain(`role="dialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} open={false} />);

        expect(markup).not.toContain("tour__surface");
    });

    test("applies the placement variant to the surface", () => {
        const markup = renderToStaticMarkup(
            <Tour steps={steps} placement="right" defaultOpen />,
        );

        expect(markup).toContain("tour__surface--placement_right");
    });

    test("renders nothing when there are no steps", () => {
        const markup = renderToStaticMarkup(<Tour steps={[]} defaultOpen />);

        expect(markup).toContain("tour__root");
        expect(markup).not.toContain("tour__surface");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Tour steps={steps} data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });
});
