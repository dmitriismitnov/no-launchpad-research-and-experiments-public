import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import type { RadioGroupOption, RadioGroupProps, } from "./radio-group";
import { RadioGroup, } from "./radio-group";

import { css, } from "@shared/styled-system/css";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ display: "flex", flexDirection: "column", gap: "x8", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: RadioGroupProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <RadioGroup {...args} />
        </div>
    </ThemeShell>
);

const options: readonly RadioGroupOption[] = [
    { value: "starter", label: "Starter", },
    { value: "team", label: "Team", },
    { value: "enterprise", label: "Enterprise", },
];

// The PEN reference (`Radio Group`, id `IENTK`) with "Team" selected.
const reference: RadioGroupProps = {
    label: "ПЛАН",
    name: "plan",
    defaultValue: "team",
    options,
};

const meta = {
    title: "Components/Forms & selection/Radio Group",
    component: RadioGroup,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "orientation", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        orientation: { control: { type: "inline-radio", }, options: [ "vertical", "horizontal", ], },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
    args: { options, },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ПЛАН",
        name: "plan",
        options,
        orientation: "vertical",
        invalid: false,
        error: "Выберите план",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const group = canvas.getByRole("radiogroup", { name: "ПЛАН", });

        await expect(group).toBeTruthy();
        await expect(canvas.getByRole("radio", { name: "Team", })).toBeChecked();
    },
};

export const Interactive: Story = {
    args: { ...reference, defaultValue: "starter", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const starter = canvas.getByRole("radio", { name: "Starter", });
        const team = canvas.getByRole("radio", { name: "Team", });

        await expect(starter).toBeChecked();

        await fireEvent.click(team);
        await expect(team).toBeChecked();
        await expect(starter).not.toBeChecked();
    },
};

export const Horizontal: Story = {
    args: { ...reference, orientation: "horizontal", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelector(".radioGroup__options--orientation_horizontal")).not.toBeNull();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Выберите план", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radiogroup", { name: "ПЛАН", })).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Выберите план");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "Starter", })).toBeDisabled();
    },
};

export const WithoutLabel: Story = {
    args: { "aria-label": "План", name: "plan", options, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radiogroup", { name: "План", })).toBeTruthy();
    },
};
