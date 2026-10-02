import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

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
});
