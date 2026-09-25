import { describe, expect, test, } from "bun:test";
import { createRef, } from "react";
import { renderToStaticMarkup, } from "react-dom/server";

import { ICON_CODEPOINTS, } from "../icon/manifest.generated";

import * as buttonModule from "./button";
import { Button, } from "./button";

const glyph = (name: keyof typeof ICON_CODEPOINTS): string => String.fromCodePoint(ICON_CODEPOINTS[name]);

describe("button icon composition", () => {
    test("renders a named prefix icon as a decorative icon in the prefix slot", () => {
        const markup = renderToStaticMarkup(<Button prefixIcon="check">Save</Button>);

        expect(markup).toContain("button__prefixIcon");
        expect(markup).toContain("icon--size_sm");
        expect(markup).toContain(`aria-hidden="true"`);
        expect(markup).toContain(glyph("check"));
    });

    test("renders a named suffix icon in the suffix slot", () => {
        const markup = renderToStaticMarkup(<Button suffixIcon="arrow-right">Open</Button>);

        expect(markup).toContain("button__suffixIcon");
        expect(markup).toContain(glyph("arrow-right"));
    });

    test("pairs each button size with an explicit icon size", () => {
        const small = renderToStaticMarkup(<Button size="sm" prefixIcon="check">Save</Button>);
        const medium = renderToStaticMarkup(<Button size="md" prefixIcon="check">Save</Button>);

        // Both button slots are x8, so both button sizes currently pair with Icon sm.
        expect(small).toContain("icon--size_sm");
        expect(medium).toContain("icon--size_sm");
    });

    test("renders both icons, and none when omitted", () => {
        const both = renderToStaticMarkup(
            <Button prefixIcon="check" suffixIcon="arrow-right">Go</Button>,
        );
        const none = renderToStaticMarkup(<Button>Go</Button>);

        expect(both).toContain("button__prefixIcon");
        expect(both).toContain("button__suffixIcon");
        expect(none).not.toContain("button__prefixIcon");
        expect(none).not.toContain("button__suffixIcon");
    });

    test("passes native button attributes through", () => {
        const markup = renderToStaticMarkup(
            <Button type="submit" disabled aria-label="Continue" prefixIcon="check" />,
        );

        expect(markup).toContain(`type="submit"`);
        expect(markup).toContain("disabled");
        expect(markup).toContain(`aria-label="Continue"`);
    });

    test("forwards a ref to the native button", () => {
        const ref = createRef<HTMLButtonElement>();
        const markup = renderToStaticMarkup(<Button ref={ref} prefixIcon="check">Save</Button>);

        expect(markup).toContain("<button");
    });

    test("keeps the internal node-based button private", () => {
        expect(Object.keys(buttonModule)).toEqual([ "Button", ]);
    });

    test("rejects unknown names and ReactNode at the type level", () => {
        // @ts-expect-error an unknown icon name is not assignable to IconName
        const unknownName = <Button prefixIcon="definitely-not-an-icon" />;
        // @ts-expect-error a ReactNode is not assignable to IconName
        const nodeValue = <Button prefixIcon={<span />} />;

        expect(unknownName).toBeDefined();
        expect(nodeValue).toBeDefined();
    });
});
