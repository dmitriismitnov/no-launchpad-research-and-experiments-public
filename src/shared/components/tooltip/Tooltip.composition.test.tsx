import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { tooltipRecipe, } from "./preset";
import { Tooltip, } from "./tooltip";

describe("tooltip composition", () => {
    test("renders a labelled tooltip surface for the trigger", () => {
        const markup = renderToStaticMarkup(
            <Tooltip label="Duplicate" defaultOpen>
                <span>Copy</span>
            </Tooltip>,
        );

        expect(markup).toContain("tooltip__root");
        expect(markup).toContain("tooltip__trigger");
        expect(markup).toContain("tooltip__surface");
        expect(markup).toContain("tooltip__label");
        expect(markup).toContain("Duplicate");
        expect(markup).toContain(`role="tooltip"`);
        expect(markup).toContain("aria-describedby");
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(<Tooltip label="Duplicate">Copy</Tooltip>);

        expect(markup).toContain("tooltip__root");
        expect(markup).not.toContain("tooltip__surface");
        expect(markup).not.toContain("aria-describedby");
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <Tooltip label="Duplicate" open={false}>
                Copy
            </Tooltip>,
        );

        expect(markup).not.toContain("tooltip__surface");
    });

    test("renders the optional shortcut", () => {
        const markup = renderToStaticMarkup(
            <Tooltip label="Duplicate" shortcut="⌘D" defaultOpen>
                Copy
            </Tooltip>,
        );

        expect(markup).toContain("tooltip__shortcut");
        expect(markup).toContain("⌘D");
    });

    test("applies the placement variant to the surface", () => {
        const markup = renderToStaticMarkup(
            <Tooltip label="Duplicate" placement="right" defaultOpen>
                Copy
            </Tooltip>,
        );

        expect(markup).toContain("tooltip__surface--placement_right");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Tooltip label="Duplicate" data-testid="t">Copy</Tooltip>);

        expect(markup).toContain(`data-testid="t"`);
    });

    // Pen `eEhwI` / doc `UO5oQ`, token contract `EOGvS`: the trigger focus
    // indicator resolves `focus/ring`, not the brand fill. The shared 2px ring
    // geometry and zero offset are unchanged.
    test("paints the shared focus ring role on the trigger", () => {
        expect(tooltipRecipe.base?.["trigger"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
        });
        expect(tooltipRecipe.base?.["trigger"]).toMatchObject({
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });
});
