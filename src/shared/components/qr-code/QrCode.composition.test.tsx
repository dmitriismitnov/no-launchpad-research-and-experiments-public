import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { qrCodeRecipe, } from "./preset";
import { QrCode, } from "./qr-code";

describe("qr code composition", () => {
    test("renders a labelled image surface with a full module grid", () => {
        const markup = renderToStaticMarkup(<QrCode />);

        expect(markup).toContain("qrCode__root");
        expect(markup).toContain("qrCode__grid");
        expect(markup).toContain(`role="img"`);
        expect(markup).toContain(`aria-label="QR code placeholder"`);
        expect(markup.match(/qrCode__cell\b/g)?.length).toBe(49);
        expect(markup.match(/qrCode__cellFilled\b/g)?.length).toBe(41);
    });

    test("accepts a custom accessible label", () => {
        const markup = renderToStaticMarkup(<QrCode label="Scan to open the app" />);

        expect(markup).toContain(`aria-label="Scan to open the app"`);
    });

    test("hides the decorative grid from assistive technology", () => {
        const markup = renderToStaticMarkup(<QrCode />);

        expect(markup).toContain(`aria-hidden="true"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<QrCode data-testid="q" />);

        expect(markup).toContain(`data-testid="q"`);
    });

    test("rejects children at the type level", () => {
        // @ts-expect-error the code owns its grid; children are not public
        const withChildren = <QrCode>child</QrCode>;

        expect(withChildren).toBeDefined();
    });

    // Pen `kQTMg` master / `dF7N0` documentation: root fill `surface/raised` with
    // a `border/subtle` boundary and `text/primary` modules. The `size: sm · md ·
    // lg`, `with caption` and `with logo` variants, the extra `caption` part and
    // the "encodes a short value" generation policy are BLOCKED (new props,
    // encoder dependency and generation policy).
    test("paints the raised surface, subtle boundary and primary module roles", () => {
        const root = qrCodeRecipe.base?.["root"] as Record<string, unknown> | undefined;
        const cellFilled = qrCodeRecipe.base?.["cellFilled"] as Record<string, unknown> | undefined;

        expect(root).toMatchObject({
            backgroundColor: "semantic.surface.raised",
            borderColor: "semantic.border.subtle",
        });
        expect(cellFilled?.["backgroundColor"]).toBe("semantic.text.primary");
    });
});
