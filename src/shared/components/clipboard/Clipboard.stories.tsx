import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Clipboard, } from "./clipboard";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    width: "320px",
});

const meta = {
    title: "Components/Data display/Clipboard",
    component: Clipboard,
    args: { value: "npm i @nolaunchpad/tokens", },
} satisfies Meta<typeof Clipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCopy: Story = {
    args: { onCopy: () => {}, },
};

export const Values: Story = {
    render: () => (
        <div className={stack}>
            <Clipboard value="npm i @nolaunchpad/tokens" onCopy={() => {}} />
            <Clipboard value="pnpm add @nolaunchpad/core" onCopy={() => {}} />
            <Clipboard value="bun add @nolaunchpad/icons" onCopy={() => {}} />
        </div>
    ),
};
