import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { CodeBlock, } from "./code-block";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const frame = css({ width: "420px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const snippet = `import { tokens } from "@nolaunchpad/core";

const button = tokens.semantic.brand[600];
export const primary = button.background;`;

const meta = {
    title: "Components/Data display/Code Block",
    component: CodeBlock,
    args: {
        code: snippet,
        filename: "tokens.ts",
    },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCopy: Story = {
    args: { onCopy: () => {}, },
};

export const WithoutFilename: Story = {
    args: { filename: undefined, },
};

// Pen `th3Nd` / `VLMbo`: the copy control's `focus/ring` discriminates in light
// only (green.600 vs green.500; dark is green.500 either way). The block
// surface/text (`tooltip/*`), the window dots (`feedback/*-fg`) and the
// error/hover copy/copied states are BLOCKED (missing Foundation roles / new
// props), so they carry no assertion.
const assertCodeFocus = (ring: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const copy = canvasElement.querySelector(".codeBlock__copy") as HTMLElement;

    await user.tab();
    await expect(copy).toHaveFocus();

    const style = getComputedStyle(copy);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(ring);
};

const renderFocus = (theme: "light" | "dark") => () => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <CodeBlock code={"const a = 1;\nconst b = 2;"} filename="tokens.ts" onCopy={() => {}} />
        </div>
    </ThemeShell>
);

export const TokenFocusLight: Story = {
    args: {},
    render: renderFocus("light"),
    play: assertCodeFocus("rgb(22, 163, 74)"),
};

export const TokenFocusDark: Story = {
    args: {},
    render: renderFocus("dark"),
    play: assertCodeFocus("rgb(34, 197, 94)"),
};
