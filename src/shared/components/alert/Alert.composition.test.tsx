import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Alert, } from "./alert";
import { alertRecipe, } from "./preset";

describe("alert composition", () => {
    test("renders the title and body in their slots", () => {
        const markup = renderToStaticMarkup(
            <Alert title="Heads up" description="Something happened." />,
        );

        expect(markup).toContain("alert__root");
        expect(markup).toContain("alert__header");
        expect(markup).toContain("alert__title");
        expect(markup).toContain("alert__body");
        expect(markup).toContain("Heads up");
        expect(markup).toContain("Something happened.");
        expect(markup).toContain(`role="alert"`);
    });

    test("omits the body when the description is empty", () => {
        const markup = renderToStaticMarkup(<Alert title="Heads up" description="   " />);

        expect(markup).not.toContain("alert__body");
    });

    test("renders the optional icon", () => {
        const markup = renderToStaticMarkup(<Alert title="Saved" icon="check" />);

        expect(markup).toContain("alert__icon");
        expect(markup).toContain("icon--size_md");
    });

    test("omits the icon when none is provided", () => {
        const markup = renderToStaticMarkup(<Alert title="Saved" />);

        expect(markup).not.toContain("alert__icon");
    });

    test("renders a dismiss button with an accessible name", () => {
        const markup = renderToStaticMarkup(<Alert title="Saved" onDismiss={() => {}} />);

        expect(markup).toContain("alert__dismiss");
        expect(markup).toContain("<button");
        expect(markup).toContain(`aria-label="Dismiss Saved"`);
    });

    test("applies the tone to the root slot", () => {
        const markup = renderToStaticMarkup(<Alert title="Failed" tone="negative" />);

        expect(markup).toContain("alert__root--tone_negative");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Alert title="Saved" data-testid="a" />);

        expect(markup).toContain(`data-testid="a"`);
    });

    // Pen `Q2PWF` token contract: the icon and title read `feedback/neutral-fg`
    // and the positive/negative surfaces and foregrounds are value-equal matrix
    // aliases. The named feedback/* roles are BLOCKED in the foundation, so
    // these are regression assertions (no production change).
    test("paints the feedback foreground and positive/negative surface roles", () => {
        expect(alertRecipe.base?.["icon"]).toMatchObject({ color: "semantic.common.50.icon", });
        expect(alertRecipe.base?.["title"]).toMatchObject({ color: "semantic.common.50.icon", });
        expect(alertRecipe.variants?.["tone"]?.["positive"]?.["root"]).toMatchObject({
            backgroundColor: "semantic.positive.50.background",
        });
        expect(alertRecipe.variants?.["tone"]?.["positive"]?.["icon"]).toMatchObject({
            color: "semantic.positive.700.background",
        });
        expect(alertRecipe.variants?.["tone"]?.["negative"]?.["root"]).toMatchObject({
            backgroundColor: "semantic.negative.50.background",
        });
        expect(alertRecipe.variants?.["tone"]?.["negative"]?.["icon"]).toMatchObject({
            color: "semantic.negative.700.background",
        });
    });
});
