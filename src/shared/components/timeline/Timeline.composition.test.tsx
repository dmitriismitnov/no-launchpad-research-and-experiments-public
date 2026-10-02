import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

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
});
