import type { Meta, StoryObj, } from "@storybook/react-vite";

import { CodeBlock, } from "./code-block";

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
