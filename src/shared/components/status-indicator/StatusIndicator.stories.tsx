import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { StatusIndicator, } from "./status-indicator";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x12",
});

const meta = {
    title: "Components/Feedback & status/Status Indicator",
    component: StatusIndicator,
    args: { label: "Online", },
} satisfies Meta<typeof StatusIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive: Story = { args: { tone: "positive", }, };
export const Neutral: Story = { args: { tone: "neutral", label: "Idle", }, };
export const Negative: Story = { args: { tone: "negative", label: "Offline", }, };
export const Brand: Story = { args: { tone: "brand", label: "New", }, };

export const Tones: Story = {
    render: () => (
        <div className={row}>
            <StatusIndicator label="Idle" tone="neutral" />
            <StatusIndicator label="Online" tone="positive" />
            <StatusIndicator label="Offline" tone="negative" />
            <StatusIndicator label="New" tone="brand" />
        </div>
    ),
};
