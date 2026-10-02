import type { Meta, StoryObj, } from "@storybook/react-vite";

import { Spinner, } from "./spinner";

const meta = {
    title: "Components/Feedback & status/Spinner",
    component: Spinner,
    args: { label: "Loading", },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decorative: Story = { args: { label: undefined, }, };
