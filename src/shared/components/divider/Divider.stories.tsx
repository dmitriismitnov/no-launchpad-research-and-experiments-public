import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Divider, } from "./divider";

const row = css({
    display: "flex",
    alignItems: "stretch",
    gap: "x8",
    height: "x16",
});

const column = css({ display: "flex", flexDirection: "column", gap: "x8", width: "240px", });

const meta = {
    title: "Components/Layout & structure/Divider",
    component: Divider,
    args: { orientation: "horizontal", },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    render: (args) => (
        <div className={column}>
            <Divider {...args} />
        </div>
    ),
};

export const Vertical: Story = {
    args: { orientation: "vertical", },
    render: (args) => (
        <div className={row}>
            <span>Left</span>
            <Divider {...args} />
            <span>Right</span>
        </div>
    ),
};
