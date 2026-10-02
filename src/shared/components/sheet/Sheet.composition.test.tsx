import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Button, } from "@shared/components/button";

import { Sheet, } from "./sheet";

describe("sheet composition", () => {
    test("renders a bottom surface with a title, body and actions", () => {
        const markup = renderToStaticMarkup(
            <Sheet
                title="Share project"
                description="Anyone with the link can view it."
                actions={<Button>Copy link</Button>}
                defaultOpen
            >
                <p>Extra body</p>
            </Sheet>,
        );

        expect(markup).toContain("sheet__root");
        expect(markup).toContain("sheet__overlay");
        expect(markup).toContain("sheet__panel");
        expect(markup).toContain("sheet__header");
        expect(markup).toContain("sheet__title");
        expect(markup).toContain("sheet__close");
        expect(markup).toContain("sheet__body");
        expect(markup).toContain("sheet__description");
        expect(markup).toContain("sheet__footer");
        expect(markup).toContain("Share project");
        expect(markup).toContain("Anyone with the link can view it.");
        expect(markup).toContain("Extra body");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-modal="true"`);
    });

    test("applies the side variant to the panel", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" side="right" defaultOpen />);

        expect(markup).toContain("sheet__panel--side_right");
    });

    test("draws the grabber only when handle is set", () => {
        const withHandle = renderToStaticMarkup(<Sheet title="Share" handle defaultOpen />);
        const withoutHandle = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(withHandle).toContain("sheet__handle");
        expect(withoutHandle).not.toContain("sheet__handle");
    });

    test("omits the panel while closed", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" trigger="Open" />);

        expect(markup).toContain("sheet__root");
        expect(markup).not.toContain("sheet__panel");
        expect(markup).not.toContain(`role="dialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" open={false} />);

        expect(markup).not.toContain("sheet__panel");
    });

    test("omits the scrim when withScrim is false", () => {
        const markup = renderToStaticMarkup(
            <Sheet title="Share" withScrim={false} defaultOpen />,
        );

        expect(markup).toContain("sheet__panel");
        expect(markup).not.toContain("sheet__overlay");
        expect(markup).not.toContain(`aria-modal="true"`);
    });

    test("omits the body when there is no description or children", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(markup).not.toContain("sheet__body");
        expect(markup).not.toContain("sheet__description");
    });

    test("omits the footer when there are no actions", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(markup).not.toContain("sheet__footer");
    });

    test("renders a close control with an accessible name", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" defaultOpen />);

        expect(markup).toContain(`aria-label="Close"`);
        expect(markup).toContain("autofocus");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Sheet title="Share" data-testid="s" />);

        expect(markup).toContain(`data-testid="s"`);
    });
});
