import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { HoverCard, } from "./hover-card";

describe("hover card composition", () => {
    test("renders the user row and bio when open by default", () => {
        const markup = renderToStaticMarkup(
            <HoverCard
                name="Ada Rivera"
                role="Design Systems Lead"
                bio="Maintains the foundation layer."
                defaultOpen
            >
                Ada
            </HoverCard>,
        );

        expect(markup).toContain("hoverCard__root");
        expect(markup).toContain("hoverCard__trigger");
        expect(markup).toContain("hoverCard__surface");
        expect(markup).toContain("hoverCard__avatar");
        expect(markup).toContain("hoverCard__initials");
        expect(markup).toContain("hoverCard__name");
        expect(markup).toContain("hoverCard__role");
        expect(markup).toContain("hoverCard__bio");
        expect(markup).toContain("Ada Rivera");
        expect(markup).toContain("Design Systems Lead");
        expect(markup).toContain(`role="dialog"`);
    });

    test("names the surface from label, falling back to name", () => {
        const byName = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" defaultOpen>Ada</HoverCard>,
        );
        const byLabel = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" label="Profile preview" defaultOpen>Ada</HoverCard>,
        );

        expect(byName).toContain(`aria-label="Ada Rivera"`);
        expect(byLabel).toContain(`aria-label="Profile preview"`);
    });

    test("binds the trigger to the dialog surface", () => {
        const open = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" defaultOpen>Ada</HoverCard>,
        );
        const closed = renderToStaticMarkup(<HoverCard name="Ada Rivera">Ada</HoverCard>);

        expect(open).toContain(`aria-haspopup="dialog"`);
        expect(open).toMatch(/aria-controls="[^"]+"/);
        expect(open).toContain(`aria-expanded="true"`);
        expect(closed).toContain(`aria-expanded="false"`);
    });

    test("derives initials from the name", () => {
        const markup = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" defaultOpen>Ada</HoverCard>,
        );

        expect(markup).toContain(">AR<");
    });

    test("prefers supplied initials", () => {
        const markup = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" initials="ZZ" defaultOpen>Ada</HoverCard>,
        );

        expect(markup).toContain(">ZZ<");
    });

    test("omits the surface while closed", () => {
        const markup = renderToStaticMarkup(<HoverCard name="Ada Rivera">Ada</HoverCard>);

        expect(markup).not.toContain("hoverCard__surface");
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" open={false}>Ada</HoverCard>,
        );

        expect(markup).not.toContain("hoverCard__surface");
    });

    test("omits the role and bio when not provided", () => {
        const markup = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" defaultOpen>Ada</HoverCard>,
        );

        expect(markup).not.toContain("hoverCard__role");
        expect(markup).not.toContain("hoverCard__bio");
    });

    test("renders the optional actions", () => {
        const markup = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" actions={<button type="button">Follow</button>} defaultOpen>
                Ada
            </HoverCard>,
        );

        expect(markup).toContain("hoverCard__actions");
        expect(markup).toContain("Follow");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <HoverCard name="Ada Rivera" data-testid="h">Ada</HoverCard>,
        );

        expect(markup).toContain(`data-testid="h"`);
    });
});
