import { describe, expect, test, } from "bun:test";
import { createRef, } from "react";
import { renderToStaticMarkup, } from "react-dom/server";

import { ICON_CODEPOINTS, } from "../icon/manifest.generated";

import * as buttonIconModule from "./button-icon";
import { ButtonIcon, } from "./button-icon";

const glyph = (name: keyof typeof ICON_CODEPOINTS): string => String.fromCodePoint(ICON_CODEPOINTS[name]);

describe("buttonIcon composition", () => {
    test("renders the named icon as a decorative glyph in the icon slot", () => {
        const markup = renderToStaticMarkup(<ButtonIcon icon="check" label="Save" />);

        expect(markup).toContain("buttonIcon__icon");
        expect(markup).toContain("icon--size_sm");
        expect(markup).toContain(`aria-hidden="true"`);
        expect(markup).toContain(glyph("check"));
        // The label slot belongs to the text Button and must not appear here.
        expect(markup).not.toContain("buttonIcon__label");
    });

    test("owns the accessible name and keeps the glyph from duplicating it", () => {
        const markup = renderToStaticMarkup(<ButtonIcon icon="x" label="Close" />);

        expect(markup).toContain(`aria-label="Close"`);
        // Exactly one accessible name: the button's. The glyph stays decorative.
        expect(markup.match(/aria-label=/g)?.length).toBe(1);
        expect(markup).not.toContain(`role="img"`);
    });

    test("pairs each button size with an explicit icon size", () => {
        const small = renderToStaticMarkup(<ButtonIcon size="sm" icon="check" label="Save" />);
        const medium = renderToStaticMarkup(<ButtonIcon size="md" icon="check" label="Save" />);

        // Both square sizes keep the x8 slot, so both pair with Icon sm.
        expect(small).toContain("icon--size_sm");
        expect(medium).toContain("icon--size_sm");
    });

    test("passes native button attributes through", () => {
        const markup = renderToStaticMarkup(
            <ButtonIcon type="submit" disabled icon="check" label="Continue" />,
        );

        expect(markup).toContain(`type="submit"`);
        expect(markup).toContain("disabled");
        expect(markup).toContain(`aria-label="Continue"`);
    });

    test("forwards a ref to the native button", () => {
        const ref = createRef<HTMLButtonElement>();
        const markup = renderToStaticMarkup(<ButtonIcon ref={ref} icon="check" label="Save" />);

        expect(markup).toContain("<button");
    });

    test("exports only the public component from the module", () => {
        expect(Object.keys(buttonIconModule)).toEqual([ "ButtonIcon", ]);
    });

    test("rejects unknown names, nodes, children and a missing label at the type level", () => {
        // @ts-expect-error an unknown icon name is not assignable to IconName
        const unknownName = <ButtonIcon icon="definitely-not-an-icon" label="x" />;
        // @ts-expect-error a ReactNode is not assignable to IconName
        const nodeValue = <ButtonIcon icon={<span />} label="x" />;
        // @ts-expect-error the accessible name is required
        const missingLabel = <ButtonIcon icon="check" />;
        // @ts-expect-error an icon-only button has no children
        const withChildren = <ButtonIcon icon="check" label="x">text</ButtonIcon>;

        expect(unknownName).toBeDefined();
        expect(nodeValue).toBeDefined();
        expect(missingLabel).toBeDefined();
        expect(withChildren).toBeDefined();
    });
});
