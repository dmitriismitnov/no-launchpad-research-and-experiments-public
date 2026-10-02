import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Step, } from "./step";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x6",
});

const connector = css({
    flex: "1",
    height: "{borderWidths.thick}",
    backgroundColor: "semantic.common.200.divider",
});

const column = css({
    display: "flex",
    flexDirection: "column",
    gap: "x8",
});

const meta = {
    title: "Components/Navigation & disclosure/Step",
    component: Step,
    args: { number: 1, label: "Foundation", state: "completed", },
    argTypes: {
        state: {
            control: { type: "select", },
            options: [ "completed", "current", "upcoming", "error", ],
        },
    },
} satisfies Meta<typeof Step>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Completed: Story = {};
export const Current: Story = { args: { number: 2, label: "Components", state: "current", }, };
export const Upcoming: Story = { args: { number: 3, label: "States", state: "upcoming", }, };
export const Error: Story = { args: { number: 2, label: "Validate", state: "error", }, };

export const WithDescription: Story = {
    args: {
        number: 2,
        label: "Components",
        state: "current",
        description: "Port the remaining masters.",
    },
};

export const Horizontal: Story = {
    render: () => (
        <div className={row}>
            <Step number={1} label="Foundation" state="completed" />
            <span className={connector} />
            <Step number={2} label="Components" state="current" />
            <span className={connector} />
            <Step number={3} label="States" state="upcoming" />
            <span className={connector} />
            <Step number={4} label="Screens" state="upcoming" />
        </div>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText("Components").closest("[aria-current]")).toHaveAttribute(
            "aria-current",
            "step",
        );
    },
};

export const Stack: Story = {
    render: () => (
        <div className={column}>
            <Step number={1} label="Foundation" state="completed" description="Tokens and roles." />
            <Step number={2} label="Components" state="current" description="Port the masters." />
            <Step number={3} label="States" state="upcoming" />
            <Step number={4} label="Screens" state="upcoming" />
        </div>
    ),
};
