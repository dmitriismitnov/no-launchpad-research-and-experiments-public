import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Avatar, } from "./avatar";
import { avatarRecipe, } from "./preset";

describe("avatar composition", () => {
    test("falls back to initials derived from the name", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" />);

        expect(markup).toContain("avatar__fallback");
        expect(markup).toContain("avatar__initials");
        expect(markup).toContain("AR");
        expect(markup).toContain('role="img"');
        expect(markup).toContain('aria-label="Alice Ryder"');
    });

    test("lets explicit initials win over the name", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" initials="Q" />);

        expect(markup).toContain(">Q<");
    });

    test("renders the image instead of the fallback when src is set", () => {
        const markup = renderToStaticMarkup(<Avatar src="/alice.png" name="Alice Ryder" />);

        expect(markup).toContain("<img");
        expect(markup).toContain(`src="/alice.png"`);
        expect(markup).toContain(`alt="Alice Ryder"`);
        expect(markup).not.toContain("avatar__fallback");
    });

    test("renders a presence dot for the chosen state", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" presence="online" />);

        expect(markup).toContain("avatar__presence");
        expect(markup).toContain("avatar__presence--presence_online");
    });

    test("applies the size to the root slot", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice Ryder" size="lg" />);

        expect(markup).toContain("avatar__root--size_lg");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Avatar name="Alice" data-testid="a" />);

        expect(markup).toContain(`data-testid="a"`);
    });

    // Pen `q9qgrL` / `YoSlU` token contract: the presence outline is the raised
    // surface role and the online presence dot is the feedback positive step
    // 700 role. Both are discriminating light values.
    test("paints the presence dot and its outline from the role tokens", () => {
        expect(avatarRecipe.base?.["presence"]).toMatchObject({
            borderColor: "semantic.surface.raised",
        });
        expect(avatarRecipe.variants?.["presence"]?.["online"]?.["presence"]).toMatchObject({
            backgroundColor: "semantic.positive.700.background",
        });
    });

    // Pen `q9qgrL` public variants list `presence`; the away/busy/offline tones
    // are retained unchanged (INFO) in this slice.
    test("keeps the secondary presence tones", () => {
        expect(avatarRecipe.variants?.["presence"]?.["away"]?.["presence"]).toMatchObject({
            backgroundColor: "semantic.occasional.600.background",
        });
        expect(avatarRecipe.variants?.["presence"]?.["busy"]?.["presence"]).toMatchObject({
            backgroundColor: "semantic.negative.600.background",
        });
        expect(avatarRecipe.variants?.["presence"]?.["offline"]?.["presence"]).toMatchObject({
            backgroundColor: "semantic.common.600.background",
        });
    });
});
