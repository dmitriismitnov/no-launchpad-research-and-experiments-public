import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ToggleGroup, type ToggleGroupOption, } from "./toggle-group";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const options: readonly ToggleGroupOption[] = [
    { value: "grid", label: "Grid", },
    { value: "list", label: "List", },
    { value: "board", label: "Board", },
];

// The PEN reference (`Toggle Group`, id `e5ySA`) with its "List" segment on.
const renderReference = (theme: "light" | "dark") => (
    <ThemeShell theme={theme}>
        <ToggleGroup options={options} defaultValue={[ "list", ]} aria-label="View" />
    </ThemeShell>
);

const meta = {
    title: "Components/Actions/Toggle Group",
    component: ToggleGroup,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "disabled", ],
        },
    },
    argTypes: {
        disabled: { control: { type: "boolean", }, },
    },
    args: {
        options,
        "aria-label": "View",
    },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { options, "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
};

export const ReferenceLight: Story = {
    render: () => renderReference("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "List", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const ReferenceDark: Story = {
    render: () => renderReference("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "List", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const MultiSelect: Story = {
    args: { options, "aria-label": "View", defaultValue: [ "grid", "board", ], },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Grid", })).toHaveAttribute("aria-pressed", "true");
        await expect(canvas.getByRole("button", { name: "Board", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const Interactive: Story = {
    args: { options, "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const list = canvas.getByRole("button", { name: "List", });

        await fireEvent.click(list);
        await expect(list).toHaveAttribute("aria-pressed", "true");

        await fireEvent.click(list);
        await expect(list).toHaveAttribute("aria-pressed", "false");
    },
};

export const Disabled: Story = {
    args: { options, "aria-label": "View", disabled: true, },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Grid", })).toBeDisabled();
    },
};
