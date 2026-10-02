import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ThemeSwitchPreview, } from "./theme-switch-preview";

describe("theme switch preview composition", () => {
    test("renders sun, the shared switch and moon", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview />);

        expect(markup).toContain("themeSwitchPreview__root");
        expect(markup).toContain("themeSwitchPreview__sun");
        expect(markup).toContain("themeSwitchPreview__moon");
        expect(markup).toContain('role="switch"');
        expect(markup).toContain('aria-label="Dark theme"');
        expect(markup).toContain("switch__track");
        expect(markup).toContain("icon--size_sm");
    });

    test("defaults to light with the switch off", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview />);

        expect(markup).toContain('aria-checked="false"');
        expect(markup).toContain("themeSwitchPreview__root--theme_light");
    });

    test("supports an uncontrolled dark default", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview defaultTheme="dark" />);

        expect(markup).toContain('aria-checked="true"');
        expect(markup).toContain("themeSwitchPreview__root--theme_dark");
    });

    test("supports a controlled theme", () => {
        const markup = renderToStaticMarkup(
            <ThemeSwitchPreview theme="dark" onThemeChange={() => {}} />,
        );

        expect(markup).toContain('aria-checked="true"');
        expect(markup).toContain("themeSwitchPreview__root--theme_dark");
    });

    test("uses a custom accessible name", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview label="Night mode" />);

        expect(markup).toContain('aria-label="Night mode"');
    });

    test("forwards the disabled state to the switch", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("themeSwitchPreview__root--disabled_true");
        expect(markup).toContain("switch__control--disabled_true");
    });

    test("accepts native div attributes", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview data-testid="theme" id="theme-switch" />);

        expect(markup).toContain('data-testid="theme"');
        expect(markup).toContain('id="theme-switch"');
    });

    test("rejects children at the type level", () => {
        // @ts-expect-error the control owns its structure; children are not public
        const withChildren = <ThemeSwitchPreview>Light</ThemeSwitchPreview>;

        expect(withChildren).toBeDefined();
    });
});
