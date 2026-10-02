import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { themeSwitchPreviewRecipe, } from "./preset";
import { ThemeSwitchPreview, } from "./theme-switch-preview";

const VOID_TAGS = new Set([ "input", "img", "br", "hr", "meta", "link", "source", "area", "base", "col", ]);

type ControlFacts = {
    tag: string;
    inert: boolean;
    ariaHidden: boolean;
    disabled: boolean;
};

/**
 * Walk the static markup as a tag stream and record, for every control that a
 * sighted user would read as interactive (`button`, `input`, `role="tab"`,
 * `role="tablist"`), whether it sits inside an `inert` / `aria-hidden` subtree
 * and whether it is natively disabled. The component's fixed structure makes an
 * exact nesting walk cheap and avoids a DOM runtime in the runner.
 */
const controlFacts = (markup: string): ControlFacts[] => {
    const stack: { inert: boolean; ariaHidden: boolean; }[] = [ { inert: false, ariaHidden: false, }, ];
    const controls: ControlFacts[] = [];
    const tagPattern = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;

    for ( const match of markup.matchAll(tagPattern) ) {
        const [ , closing, rawTag, rawAttributes, selfClosing, ] = match;
        const tag = rawTag!.toLowerCase();
        const attributes = rawAttributes ?? "";

        if ( closing === "/" ) {
            if ( stack.length > 1 ) {
                stack.pop();
            }

            continue;
        }

        const parent = stack[stack.length - 1]!;
        const isInert = parent.inert || /\binert\b/.test(attributes);
        const isAriaHidden = parent.ariaHidden || /aria-hidden="true"/.test(attributes);
        const isControl = tag === "button" || tag === "input"
            || /role="tab(list)?"/.test(attributes);

        if ( isControl ) {
            controls.push({
                tag,
                inert: isInert,
                ariaHidden: isAriaHidden,
                disabled: /(^|\s)disabled/.test(attributes),
            });
        }

        if ( !selfClosing && !VOID_TAGS.has(tag) ) {
            stack.push({ inert: isInert, ariaHidden: isAriaHidden, });
        }
    }

    return controls;
};

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

    test("is one named static image: role=img aria-label='Theme preview'", () => {
        // The fixed master is a passive preview, so it is announced as a single
        // image rather than a live control group.
        const markup = renderToStaticMarkup(<ThemeSwitchPreview />);

        expect(markup.match(/themeSwitchPreview__root/g)?.length).toBe(1);
        expect(markup).toMatch(/<div[^>]*role="img"[^>]*aria-label="Theme preview"/);
    });

    test("forcibly owns role=img and aria-label after consumer props", () => {
        // Forced after the spread so a consumer cannot turn the preview back
        // into a labelled region or a controller.
        const markup = renderToStaticMarkup(
            <ThemeSwitchPreview role="presentation" aria-label="Overridden" />,
        );

        expect(markup).toMatch(/<div[^>]*role="img"[^>]*aria-label="Theme preview"/);
        expect(markup).not.toContain("Overridden");
        expect(markup).not.toContain('role="presentation"');
    });

    test("puts every apparent button, input and tab control inside an inert subtree", () => {
        const markup = renderToStaticMarkup(<ThemeSwitchPreview />);
        const controls = controlFacts(markup);

        expect(controls.map((control) => control.tag)).toEqual([
            "button",
            "button",
            "input",
            "div",
            "button",
            "button",
        ]);

        for ( const control of controls ) {
            // Inert is the only suppression: the controls stay in the DOM,
            // fully present, and are neither aria-hidden nor rendered disabled.
            expect(control.inert).toBe(true);
            expect(control.ariaHidden).toBe(false);
            expect(control.disabled).toBe(false);
        }
    });

    test("owns its content: children are not part of the API", () => {
        // @ts-expect-error the fixed master owns its content; children are not public
        const withChildren = <ThemeSwitchPreview>Body</ThemeSwitchPreview>;

        expect(withChildren).toBeDefined();
    });
});
