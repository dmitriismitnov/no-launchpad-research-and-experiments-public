import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Toggle, } from "./toggle";

describe("Toggle composition", () => {
    test("renders a pressed-state button with the label in its slot", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" />);

        expect(markup).toContain("toggle__root");
        expect(markup).toContain("toggle__label");
        expect(markup).toContain("Bold");
        expect(markup).toContain('type="button"');
        expect(markup).toContain('aria-pressed="false"');
    });

    test("reflects the pressed state in aria-pressed", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" pressed />);

        expect(markup).toContain('aria-pressed="true"');
    });

    test("renders an optional decorative icon in its slot", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" icon="check" />);

        expect(markup).toContain("toggle__icon");
        expect(markup).toContain('aria-hidden="true"');
    });

    test("omits the icon when no name is given", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" />);

        expect(markup).not.toContain("toggle__icon");
    });

    test("marks the button disabled", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("toggle__root--disabled_true");
    });

    test("merges className instead of replacing the root class", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" className="my-toggle" />);

        expect(markup).toContain("my-toggle");
        expect(markup).toContain("toggle__root");
    });

    test("forwards native button attributes and an explicit type", () => {
        const markup = renderToStaticMarkup(<Toggle label="Bold" type="submit" data-testid="t" />);

        expect(markup).toContain('type="submit"');
        expect(markup).toContain('data-testid="t"');
    });
});
