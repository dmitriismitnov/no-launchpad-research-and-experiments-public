import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { ProgressRing, } from "./progress-ring";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
});

const meta = {
    title: "Components/Feedback & status/Progress Ring",
    component: ProgressRing,
    args: { value: 60, label: "Progress", },
} satisfies Meta<typeof ProgressRing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { value: 0, }, };

export const Complete: Story = { args: { value: 100, }, };

export const Sizes: Story = {
    render: () => (
        <div className={row}>
            <ProgressRing value={40} size={32} thickness={3} label="40%" />
            <ProgressRing value={60} size={40} thickness={4} label="60%" />
            <ProgressRing value={80} size={64} thickness={6} label="80%" />
        </div>
    ),
};

export const Values: Story = {
    render: () => (
        <div className={row}>
            <ProgressRing value={0} label="0%" />
            <ProgressRing value={25} label="25%" />
            <ProgressRing value={50} label="50%" />
            <ProgressRing value={75} label="75%" />
            <ProgressRing value={100} label="100%" />
        </div>
    ),
};
