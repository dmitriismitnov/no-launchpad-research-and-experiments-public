import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Toast, } from "./toast";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    alignItems: "flex-start",
});

const meta = {
    title: "Components/Feedback & status/Toast",
    component: Toast,
    args: {
        title: "Saved",
        description: "Your changes are live.",
        icon: "check",
    },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Neutral: Story = {
    args: { tone: "neutral", title: "Heads up", icon: "settings", },
};

export const Negative: Story = {
    args: { tone: "negative", title: "Upload failed", icon: "x", },
};

export const Brand: Story = {
    args: { tone: "brand", title: "New feature", icon: "settings", },
};

export const WithAction: Story = {
    args: { action: { label: "Undo", onClick: () => {}, }, },
};

export const Dismissible: Story = {
    args: { onDismiss: () => {}, },
};

export const Stack: Story = {
    render: () => (
        <div className={stack}>
            <Toast title="Saved" description="Your changes are live." icon="check" />
            <Toast
                title="Upload failed"
                description="The file could not be processed."
                tone="negative"
                icon="x"
                action={{ label: "Retry", onClick: () => {}, }}
            />
        </div>
    ),
};
