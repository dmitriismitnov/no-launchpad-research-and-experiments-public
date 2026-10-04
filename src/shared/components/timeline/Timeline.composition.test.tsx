import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { timelineRecipe, } from "./preset";
import { Timeline, } from "./timeline";

describe("timeline composition", () => {
    test("renders a marker per event and a connector between them", () => {
        const markup = renderToStaticMarkup(
            <Timeline
                items={[
                    { title: "Foundation published", meta: "Mar 2", },
                    { title: "Components in review", meta: "In progress", },
                    { title: "States catalogue", meta: "Upcoming", },
                ]}
            />,
        );

        expect(markup).toContain("timeline__root");
        expect(markup).toContain("timeline__item");
        expect(markup).toContain("timeline__rail");
        expect(markup).toContain("timeline__marker");
        expect(markup).toContain("timeline__line");
        expect(markup).toContain("timeline__text");
        expect(markup).toContain("timeline__title");
        expect(markup).toContain("timeline__meta");
        expect(markup).toContain("Foundation published");
        expect(markup).toContain("Mar 2");
        expect(markup.match(/timeline__item\b/g)?.length).toBe(3);
        expect(markup.match(/timeline__line\b/g)?.length).toBe(2);
    });

    test("omits the connector on a single row", () => {
        const markup = renderToStaticMarkup(<Timeline items={[ { title: "Only", }, ]} />);

        expect(markup).toContain("timeline__marker");
        expect(markup).not.toContain("timeline__line");
    });

    test("omits empty metadata", () => {
        const markup = renderToStaticMarkup(
            <Timeline items={[ { title: "Only", meta: "   ", }, ]} />,
        );

        expect(markup).toContain("timeline__title");
        expect(markup).not.toContain("timeline__meta");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Timeline items={[]} data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });

    // Pen master `z4hUE9` / `d5pll` and documentation `K7WV8o`: the rail marker
    // is a `surface/raised` dot with a `border/strong` functional boundary; the
    // connector is `border/subtle`; the title `text/primary`; metadata
    // `text/secondary`. The static timeline has no focusable slot (audit
    // focus-indicator 0/0), so no focus ring is projected.
    test("paints the rail marker, connector and text roles", () => {
        const marker = timelineRecipe.base?.["marker"] as Record<string, unknown> | undefined;
        const line = timelineRecipe.base?.["line"] as Record<string, unknown> | undefined;
        const title = timelineRecipe.base?.["title"] as Record<string, unknown> | undefined;
        const meta = timelineRecipe.base?.["meta"] as Record<string, unknown> | undefined;

        expect(marker).toMatchObject({
            backgroundColor: "semantic.surface.raised",
            borderColor: "semantic.border.strong",
        });
        expect(line?.["backgroundColor"]).toBe("semantic.border.subtle");
        expect(title?.["color"]).toBe("semantic.text.primary");
        expect(meta?.["color"]).toBe("semantic.text.secondary");
    });
});
