import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Button, } from "@shared/components/button";

import { Dialog, } from "./dialog";

describe("dialog composition", () => {
    test("renders a modal surface with a title, body and actions", () => {
        const markup = renderToStaticMarkup(
            <Dialog
                title="Publish foundation v2.3?"
                description="This updates 6 components."
                actions={<Button>Publish</Button>}
                defaultOpen
            >
                <p>Extra body</p>
            </Dialog>,
        );

        expect(markup).toContain("dialog__root");
        expect(markup).toContain("dialog__overlay");
        expect(markup).toContain("dialog__surface");
        expect(markup).toContain("dialog__header");
        expect(markup).toContain("dialog__title");
        expect(markup).toContain("dialog__close");
        expect(markup).toContain("dialog__body");
        expect(markup).toContain("dialog__description");
        expect(markup).toContain("dialog__footer");
        expect(markup).toContain("Publish foundation v2.3?");
        expect(markup).toContain("This updates 6 components.");
        expect(markup).toContain("Extra body");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-modal="true"`);
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(
            <Dialog title="Publish?" trigger="Open" />,
        );

        expect(markup).toContain("dialog__root");
        expect(markup).not.toContain("dialog__surface");
        expect(markup).not.toContain(`role="dialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <Dialog title="Publish?" open={false} />,
        );

        expect(markup).not.toContain("dialog__surface");
    });

    test("omits the body when there is no description or children", () => {
        const markup = renderToStaticMarkup(<Dialog title="Publish?" defaultOpen />);

        expect(markup).not.toContain("dialog__body");
        expect(markup).not.toContain("dialog__description");
    });

    test("omits the footer when there are no actions", () => {
        const markup = renderToStaticMarkup(<Dialog title="Publish?" defaultOpen />);

        expect(markup).not.toContain("dialog__footer");
    });

    test("renders a close control with an accessible name", () => {
        const markup = renderToStaticMarkup(<Dialog title="Publish?" defaultOpen />);

        expect(markup).toContain(`aria-label="Close"`);
        expect(markup).toContain("autofocus");
    });

    test("applies the size variant to the surface", () => {
        const markup = renderToStaticMarkup(<Dialog title="Publish?" size="lg" defaultOpen />);

        expect(markup).toContain("dialog__surface--size_lg");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Dialog title="Publish?" data-testid="d" />);

        expect(markup).toContain(`data-testid="d"`);
    });
});
