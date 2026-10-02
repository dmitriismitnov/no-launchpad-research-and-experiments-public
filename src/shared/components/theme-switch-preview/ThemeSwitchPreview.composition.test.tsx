import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { themeSwitchPreviewRecipe, } from "./preset";
import { ThemeSwitchPreview, } from "./theme-switch-preview";

describe("theme switch preview composition", () => {
    test("projects the fixed 420x383 Pen master frame", () => {
        // Pen `Theme Switch Preview` master (`q5xZR3`): a 420x383 vertical
        // block, `surface/raised` fill, `lg` radius, `border/subtle` stroke,
        // 20px padding and a 14px root gap.
        expect(themeSwitchPreviewRecipe.base?.["root"]).toMatchObject({
            display: "flex",
            flexDirection: "column",
            gap: "x7",
            width: "420px",
            height: "383px",
            padding: "x10",
            borderRadius: "lg",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            backgroundColor: "semantic.surface.raised",
            color: "semantic.text.primary",
        });
    });

    test("renders the fixed Pen anatomy with the Pen copy once", () => {
        // `q5xZR3` Head (moon + "Theme preview" + `theme` badge), Buttons,
        // Input, Badges, Card and Tabs, composed from the existing public
        // components only.
        const markup = renderToStaticMarkup(<ThemeSwitchPreview />);

        expect(markup).toContain("themeSwitchPreview__root");
        expect(markup).toContain("icon--size_sm");
        expect(markup).toContain("Theme preview");
        expect(markup).toContain(">theme<");
        expect(markup).toContain(">Primary<");
        expect(markup).toContain(">Secondary<");
        expect(markup).toContain('value="team@acme.dev"');
        expect(markup).toContain(">Selected<");
        expect(markup).toContain(">Passing<");
        expect(markup).toContain(">Draft<");
        expect(markup).toContain("Card title");
        expect(markup).toContain(">Preview<");
        expect(markup).toContain(">Code<");
    });

    test("is a single passive block: no theme context or controller", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview />);

        expect(markup.match(/themeSwitchPreview__root/g)?.length).toBe(1);
        expect(markup).not.toContain("data-theme");
        expect(markup).not.toContain('role="switch"');
        expect(markup).not.toContain("aria-checked");
    });

    test("accepts native div attributes", () => {
        const markup = renderToStaticMarkup(
            <ThemeSwitchPreview data-testid="preview" id="theme-preview" />,
        );

        expect(markup).toContain('data-testid="preview"');
        expect(markup).toContain('id="theme-preview"');
    });

    test("owns its content: children are not part of the API", () => {
        // @ts-expect-error the fixed master owns its content; children are not public
        const withChildren = <ThemeSwitchPreview>Body</ThemeSwitchPreview>;

        expect(withChildren).toBeDefined();
    });
});
