import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Button, } from "@shared/components/button";

import { Drawer, } from "./drawer";

describe("drawer composition", () => {
    test("renders an edge panel with a title, body and actions", () => {
        const markup = renderToStaticMarkup(
            <Drawer
                title="Filters"
                description="Narrow the component list."
                actions={<Button>Apply</Button>}
                defaultOpen
            >
                <p>Extra body</p>
            </Drawer>,
        );

        expect(markup).toContain("drawer__root");
        expect(markup).toContain("drawer__overlay");
        expect(markup).toContain("drawer__panel");
        expect(markup).toContain("drawer__header");
        expect(markup).toContain("drawer__title");
        expect(markup).toContain("drawer__close");
        expect(markup).toContain("drawer__body");
        expect(markup).toContain("drawer__description");
        expect(markup).toContain("drawer__footer");
        expect(markup).toContain("Filters");
        expect(markup).toContain("Narrow the component list.");
        expect(markup).toContain("Extra body");
        expect(markup).toContain(`role="dialog"`);
        expect(markup).toContain(`aria-modal="true"`);
    });

    test("omits the panel while closed", () => {
        const markup = renderToStaticMarkup(
            <Drawer title="Filters" trigger="Open" />,
        );

        expect(markup).toContain("drawer__root");
        expect(markup).not.toContain("drawer__panel");
        expect(markup).not.toContain(`role="dialog"`);
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(<Drawer title="Filters" open={false} />);

        expect(markup).not.toContain("drawer__panel");
    });

    test("applies the side variant to the panel", () => {
        const markup = renderToStaticMarkup(<Drawer title="Filters" side="left" defaultOpen />);

        expect(markup).toContain("drawer__panel--side_left");
    });

    test("omits the scrim when withScrim is false", () => {
        const markup = renderToStaticMarkup(
            <Drawer title="Filters" withScrim={false} defaultOpen />,
        );

        expect(markup).toContain("drawer__panel");
        expect(markup).not.toContain("drawer__overlay");
        expect(markup).not.toContain(`aria-modal="true"`);
    });

    test("omits the body when there is no description or children", () => {
        const markup = renderToStaticMarkup(<Drawer title="Filters" defaultOpen />);

        expect(markup).not.toContain("drawer__body");
        expect(markup).not.toContain("drawer__description");
    });

    test("omits the footer when there are no actions", () => {
        const markup = renderToStaticMarkup(<Drawer title="Filters" defaultOpen />);

        expect(markup).not.toContain("drawer__footer");
    });

    test("renders a close control with an accessible name", () => {
        const markup = renderToStaticMarkup(<Drawer title="Filters" defaultOpen />);

        expect(markup).toContain(`aria-label="Close"`);
        expect(markup).toContain("autofocus");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Drawer title="Filters" data-testid="d" />);

        expect(markup).toContain(`data-testid="d"`);
    });
});
