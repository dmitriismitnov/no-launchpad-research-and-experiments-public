import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ThemeSwitchPreview, } from "./theme-switch-preview";

describe("theme switch preview composition", () => {
    test("renders the same content in explicit light and dark contexts", () => {
        // Pen `Foundation — Theme comparison` (`YpWB5` / `YQ6kU`) places two
        // instances of `q5xZR3`, one with `theme: light` and one with
        // `theme: dark`; the same instances render in both themes.
        const markup = renderToStaticMarkup(
            <ThemeSwitchPreview>
                <span data-probe="content">Preview</span>
            </ThemeSwitchPreview>,
        );

        expect(markup).toContain("themeSwitchPreview__root");
        expect(markup).toContain('data-theme="light"');
        expect(markup).toContain('data-theme="dark"');
        expect(markup.match(/data-probe="content"/g)?.length).toBe(2);
        expect(markup.match(/>Preview</g)?.length).toBe(2);
    });

    test("is a passive comparison, not a theme-setting control", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview>Body</ThemeSwitchPreview>);

        expect(markup).not.toContain('role="switch"');
        expect(markup).not.toContain("<input");
    });

    test("names the comparison and exposes visible captions", () => {
        const markup = renderToStaticMarkup(
            <ThemeSwitchPreview label="Theme comparison">Body</ThemeSwitchPreview>,
        );

        expect(markup).toContain('role="group"');
        expect(markup).toContain('aria-label="Theme comparison"');
        expect(markup).toContain("Light");
        expect(markup).toContain("Dark");
    });

    test("accepts native div attributes", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview data-testid="theme">Body</ThemeSwitchPreview>);

        expect(markup).toContain('data-testid="theme"');
    });

    test("requires the compared content at the type level", () => {
        // @ts-expect-error the preview compares content; children are required
        const missing = <ThemeSwitchPreview />;

        expect(missing).toBeDefined();
    });
});
