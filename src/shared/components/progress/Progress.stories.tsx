import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Progress, } from "./progress";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x8",
    width: "320px",
});

const meta = {
    title: "Components/Feedback & status/Progress",
    component: Progress,
    args: { value: 60, label: "Progress", },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { value: 0, }, };

export const Complete: Story = { args: { value: 100, }, };

export const CustomMax: Story = { args: { value: 3, max: 4, }, };

export const Values: Story = {
    render: () => (
        <div className={stack}>
            <Progress value={10} label="10%" />
            <Progress value={40} label="40%" />
            <Progress value={75} label="75%" />
            <Progress value={100} label="100%" />
        </div>
    ),
};
