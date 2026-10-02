import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Statistic, } from "./statistic";

const stack = css({
    display: "flex",
    gap: "x12",
    flexWrap: "wrap",
});

const meta = {
    title: "Components/Data display/Statistic",
    component: Statistic,
    args: {
        label: "Active users",
        value: "48.2K",
        delta: "+12.4% vs last week",
        trend: "up",
        deltaIcon: "trending-up",
    },
} satisfies Meta<typeof Statistic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDelta: Story = {
    args: { label: "Revenue", value: "$12.4K", delta: "+8% vs last month", },
};

export const Trends: Story = {
    render: () => (
        <div className={stack}>
            <Statistic
                label="Active users"
                value="48.2K"
                delta="+12.4%"
                trend="up"
                deltaIcon="trending-up"
            />
            <Statistic
                label="Churn"
                value="1.2%"
                delta="-0.4%"
                trend="down"
                deltaIcon="trending-up"
            />
            <Statistic label="Sessions" value="91.3K" delta="No change" trend="neutral" />
        </div>
    ),
};

export const Tones: Story = {
    render: () => (
        <div className={stack}>
            <Statistic label="Neutral" value="48.2K" tone="neutral" />
            <Statistic label="Positive" value="+12.4%" tone="positive" />
            <Statistic label="Negative" value="-3.1%" tone="negative" />
            <Statistic label="Brand" value="4.9" tone="brand" />
        </div>
    ),
};
