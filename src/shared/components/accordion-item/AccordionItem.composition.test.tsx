import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { AccordionItem, } from "./accordion-item";

describe("accordion item composition", () => {
    test("renders a trigger and a labelled panel when open by default", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="What are primitive tokens?" defaultOpen>
                Immutable raw values owned by the foundation layer.
            </AccordionItem>,
        );

        expect(markup).toContain("accordionItem__root");
        expect(markup).toContain("accordionItem__trigger");
        expect(markup).toContain("accordionItem__title");
        expect(markup).toContain("accordionItem__chevron");
        expect(markup).toContain("accordionItem__panel");
        expect(markup).toContain(`aria-expanded="true"`);
        expect(markup).toContain(`role="region"`);
        expect(markup).toContain("Immutable raw values");
    });

    test("omits the panel while closed", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="How do themes work?">Detail content.</AccordionItem>,
        );

        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("accordionItem__panel");
        expect(markup).not.toContain("Detail content.");
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="Controlled" open={false}>
                Hidden
            </AccordionItem>,
        );

        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("accordionItem__panel");
    });

    test("mutes and disables the trigger", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="Deprecated" disabled>
                Hidden
            </AccordionItem>,
        );

        expect(markup).toContain("accordionItem__root--disabled_true");
        expect(markup).toContain("disabled");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="Settings" data-testid="a" />,
        );

        expect(markup).toContain(`data-testid="a"`);
    });
});
