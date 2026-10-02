import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Popover, } from "./popover";

describe("popover composition", () => {
    test("renders an anchored dialog with a header and content", () => {
        const markup = renderToStaticMarkup(
            <Popover
                trigger="Open"
                title="Notifications"
                description="Choose what you want to hear about."
                defaultOpen
            >
                <p>Content</p>
            </Popover>,
        );

        expect(markup).toContain("popover__root");
        expect(markup).toContain("popover__trigger");
        expect(markup).toContain("popover__surface");
        expect(markup).toContain("popover__content");
        expect(markup).toContain("popover__title");
        expect(markup).toContain("popover__description");
        expect(markup).toContain("Notifications");
        expect(markup).toContain("Choose what you want to hear about.");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain("Content");
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(<Popover trigger="Open">Content</Popover>);

        expect(markup).toContain("popover__root");
        expect(markup).not.toContain("popover__surface");
        expect(markup).not.toContain("Content");
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" open={false}>Content</Popover>,
        );

        expect(markup).not.toContain("popover__surface");
    });

    test("omits the header when no title or description is given", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" defaultOpen>
                Body
            </Popover>,
        );

        expect(markup).not.toContain("popover__title");
        expect(markup).not.toContain("popover__description");
        expect(markup).toContain("popover__content");
    });

    test("labels the trigger with its expanded state", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" defaultOpen aria-label="Notifications">
                Body
            </Popover>,
        );

        expect(markup).toContain(`aria-haspopup="dialog"`);
        expect(markup).toContain(`aria-expanded="true"`);
    });

    test("applies the placement variant to the surface", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" placement="right" defaultOpen>
                Body
            </Popover>,
        );

        expect(markup).toContain("popover__surface--placement_right");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Popover trigger="Open" data-testid="p">Body</Popover>);

        expect(markup).toContain(`data-testid="p"`);
    });
});
