import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { EmptyState, } from "./empty-state";

describe("empty state composition", () => {
    test("renders the title and description", () => {
        const markup = renderToStaticMarkup(
            <EmptyState title="No tokens yet" description="Create your first token." />,
        );

        expect(markup).toContain("emptyState__root");
        expect(markup).toContain("emptyState__title");
        expect(markup).toContain("emptyState__description");
        expect(markup).toContain("No tokens yet");
        expect(markup).toContain("Create your first token.");
    });

    test("omits the description when it is empty", () => {
        const markup = renderToStaticMarkup(<EmptyState title="No tokens yet" description=" " />);

        expect(markup).not.toContain("emptyState__description");
    });

    test("renders the optional icon", () => {
        const markup = renderToStaticMarkup(<EmptyState title="No tokens yet" icon="settings" />);

        expect(markup).toContain("emptyState__icon");
        expect(markup).toContain("icon--size_lg");
    });

    test("omits the icon when none is provided", () => {
        const markup = renderToStaticMarkup(<EmptyState title="No tokens yet" />);

        expect(markup).not.toContain("emptyState__icon");
    });

    test("renders the action slot when provided", () => {
        const markup = renderToStaticMarkup(
            <EmptyState title="No tokens yet" action={<button type="button">New token</button>} />,
        );

        expect(markup).toContain("emptyState__action");
        expect(markup).toContain("New token");
    });

    test("omits the action when none is provided", () => {
        const markup = renderToStaticMarkup(<EmptyState title="No tokens yet" />);

        expect(markup).not.toContain("emptyState__action");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<EmptyState title="No tokens yet" data-testid="e" />);

        expect(markup).toContain(`data-testid="e"`);
    });
});
