import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Button, } from "@shared/components/button";

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

    test("falls back to an accessible name when no title or label is given", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" defaultOpen>
                Body
            </Popover>,
        );

        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-label="Popover"`);
    });

    test("prefers the explicit label over the fallback name", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" label="Notifications" defaultOpen>
                Body
            </Popover>,
        );

        expect(markup).toContain(`aria-label="Notifications"`);
    });

    test("names the dialog from the title, not the label", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger="Open" title="Notifications" label="Fallback" defaultOpen>
                Body
            </Popover>,
        );

        expect(markup).toContain(`aria-labelledby`);
        expect(markup).not.toContain(`aria-label="Fallback"`);
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

    test("clones a public Button as the direct trigger without nesting", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger={<Button>Open</Button>} defaultOpen>
                Body
            </Popover>,
        );

        expect(markup.match(/<button/g)?.length).toBe(1);
        expect(markup).toContain("button__root");
        expect(markup).toContain(`aria-haspopup="dialog"`);
        expect(markup).toContain(`aria-expanded="true"`);
    });

    test("clones an anchor as the direct trigger without adding a button", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger={<a href="/docs">Docs</a>} defaultOpen>
                Body
            </Popover>,
        );

        expect(markup).not.toContain("<button");
        expect(markup).toContain(`<a href="/docs"`);
        expect(markup).toContain(`aria-haspopup="dialog"`);
        expect(markup).toContain(`aria-expanded="true"`);
    });

    test("does not inject the visual trigger class into a composed trigger", () => {
        const markup = renderToStaticMarkup(
            <Popover trigger={<Button>Open</Button>}>Body</Popover>,
        );

        expect(markup).not.toContain("popover__trigger");
    });
});
