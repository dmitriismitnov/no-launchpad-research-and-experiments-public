import type { Meta, StoryObj, } from "@storybook/react-vite";

import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

import { EmptyState, } from "./empty-state";

const frame = css({ width: "420px", });

const meta = {
    title: "Components/Feedback & status/Empty State",
    component: EmptyState,
    args: {
        title: "No tokens yet",
        description: "Create your first semantic token to get started.",
        icon: "settings",
    },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
    args: {
        action: <Button size="sm">New token</Button>,
    },
};

export const TitleOnly: Story = {
    args: { description: undefined, icon: undefined, },
};

export const InFrame: Story = {
    render: (args) => (
        <div className={frame}>
            <EmptyState {...args} />
        </div>
    ),
};
