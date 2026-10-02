import type { Meta, StoryObj, } from "@storybook/react-vite";

import { Badge, } from "./badge";

const meta = {
    title: "Components/Feedback & status/Badge",
    component: Badge,
    args: { label: "Active", },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: "neutral", }, };
export const Positive: Story = { args: { tone: "positive", label: "Healthy", }, };
export const Negative: Story = { args: { tone: "negative", label: "Failed", }, };
export const Brand: Story = { args: { tone: "brand", label: "New", }, };
export const WithoutDot: Story = { args: { withDot: false, }, };
