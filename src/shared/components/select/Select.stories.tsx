import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import type { SelectOption, SelectProps, } from "./select";
import { Select, } from "./select";

import { css, } from "@shared/styled-system/css";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "260px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: SelectProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Select {...args} />
        </div>
    </ThemeShell>
);

const options: readonly SelectOption[] = [
    { value: "starter", label: "Starter", },
    { value: "team", label: "Team", },
    { value: "enterprise", label: "Enterprise", disabled: true, },
];

// The PEN reference (`Select`, id `tOLtR`) with its closed, empty trigger.
const reference: SelectProps = {
    label: "КОМАНДА",
    placeholder: "Выберите команду",
    options,
};

const meta = {
    title: "Components/Forms & selection/Select",
    component: Select,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "placeholder", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        placeholder: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
    args: { options, },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "КОМАНДА",
        placeholder: "Выберите команду",
        options,
        invalid: false,
        error: "Выберите значение",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const select = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await expect(select).toHaveValue("");
        await expect(canvas.getByRole("option", { name: "Team", })).toBeTruthy();
    },
};

export const Filled: Story = {
    args: { ...reference, defaultValue: "team", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("combobox", { name: "КОМАНДА", })).toHaveValue("team");
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Выберите значение", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const select = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await expect(select).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Выберите значение");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("combobox", { name: "КОМАНДА", })).toBeDisabled();
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "КОМАНДА", });

    await expect(getComputedStyle(select).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeControl(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeControl(context, "rgb(2, 6, 23)"),
};
