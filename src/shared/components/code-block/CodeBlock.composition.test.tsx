import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { CodeBlock, } from "./code-block";
import { codeBlockRecipe, } from "./preset";

describe("code block composition", () => {
    const code = 'import { tokens } from "@nolaunchpad/core";\n\nconst button = tokens.semantic.brand[600];';

    test("renders a numbered row per source line", () => {
        const markup = renderToStaticMarkup(<CodeBlock code={code} />);

        expect(markup).toContain("codeBlock__root");
        expect(markup).toContain("codeBlock__head");
        expect(markup).toContain("codeBlock__dotNegative");
        expect(markup).toContain("codeBlock__dotNeutral");
        expect(markup).toContain("codeBlock__dotPositive");
        expect(markup).toContain("codeBlock__code");
        expect(markup).toContain("codeBlock__line");
        expect(markup).toContain("codeBlock__lineNumber");
        expect(markup).toContain("codeBlock__lineCode");
        expect(markup).toContain("import { tokens } from");
        expect(markup.match(/codeBlock__line\b/g)?.length).toBe(3);
        expect(markup).toContain(">3<");
    });

    test("renders the optional filename", () => {
        const markup = renderToStaticMarkup(<CodeBlock code="const a = 1;" filename="tokens.ts" />);

        expect(markup).toContain("codeBlock__file");
        expect(markup).toContain("tokens.ts");
    });

    test("omits the copy button when there is no handler", () => {
        const markup = renderToStaticMarkup(<CodeBlock code="const a = 1;" />);

        expect(markup).not.toContain("codeBlock__copy");
        expect(markup).not.toContain("<button");
    });

    test("renders a labelled copy button when onCopy is provided", () => {
        const markup = renderToStaticMarkup(
            <CodeBlock code="const a = 1;" onCopy={() => {}} />,
        );

        expect(markup).toContain("codeBlock__copy");
        expect(markup).toContain("<button");
        expect(markup).toContain(`aria-label="Copy code"`);
        expect(markup).toContain("icon--size_sm");
    });

    test("accepts a custom copy label", () => {
        const markup = renderToStaticMarkup(
            <CodeBlock code="const a = 1;" onCopy={() => {}} copyLabel="Скопировать" />,
        );

        expect(markup).toContain(`aria-label="Скопировать"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <CodeBlock code="const a = 1;" data-testid="c" />,
        );

        expect(markup).toContain(`data-testid="c"`);
    });

    // Pen `th3Nd` master / `VLMbo` documentation: the copy control carries a
    // 2px outer `focus/ring`. The block surface (`tooltip/bg`) and the
    // file/copy/line-number text (`tooltip/fg`), the window dots
    // (`feedback/*-fg`) and the error/hover copy/copied states are BLOCKED: the
    // code foundation ships no `semantic.tooltip.*` / `semantic.feedback.*`
    // roles and the states need new public props.
    test("paints the copy control focus ring", () => {
        const copy = codeBlockRecipe.base?.["copy"] as Record<string, unknown> | undefined;

        expect(copy?.["outlineStyle"]).toMatchObject({ _focusVisible: "solid", });
        expect(copy?.["outlineWidth"]).toMatchObject({ _focusVisible: "{borderWidths.thick}", });
        expect(copy?.["outlineColor"]).toMatchObject({ _focusVisible: "semantic.focus.ring", });
    });
});
