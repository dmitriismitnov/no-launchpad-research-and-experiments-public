import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Alert, } from "./alert";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    width: "420px",
});

const meta = {
    title: "Components/Feedback & status/Alert",
    component: Alert,
    args: {
        title: "Heads up",
        description: "Something happened that you should know about.",
    },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Positive: Story = {
    args: { tone: "positive", title: "All good", icon: "check", },
};

export const Negative: Story = {
    args: {
        tone: "negative",
        title: "Upload failed",
        description: "The file could not be processed. Try again.",
        icon: "x",
    },
};

export const Brand: Story = {
    args: { tone: "brand", title: "New feature", icon: "settings", },
};

export const Dismissible: Story = {
    args: { onDismiss: () => {}, icon: "check", },
};

export const AllTones: Story = {
    render: () => (
        <div className={stack}>
            <Alert title="Neutral" description="Informational copy." icon="settings" />
            <Alert title="Positive" description="Saved successfully." tone="positive" icon="check" />
            <Alert title="Negative" description="Something went wrong." tone="negative" icon="x" />
            <Alert title="Brand" description="A new capability." tone="brand" icon="settings" />
        </div>
    ),
};
