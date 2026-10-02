import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { NumberInput, type NumberInputProps, } from "./number-input";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "280px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: NumberInputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <NumberInput {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Number Input`, id `EZfrL`): value 8 with its stepper.
const reference: NumberInputProps = {
    label: "КОЛИЧЕСТВО",
    defaultValue: 8,
    min: 0,
    max: 64,
};

const meta = {
    title: "Components/Forms & selection/Number Input",
    component: NumberInput,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "unit", "stepper", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        unit: { control: { type: "text", }, },
        stepper: { control: { type: "boolean", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "КОЛИЧЕСТВО",
        defaultValue: 8,
        unit: "px",
        invalid: false,
        error: "Enter a number",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("spinbutton", { name: "КОЛИЧЕСТВО", })).toHaveValue(8);
    },
};

export const Stepper: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("spinbutton", { name: "КОЛИЧЕСТВО", });

        await fireEvent.click(canvas.getByRole("button", { name: "Increase value", }));
        await expect(input).toHaveValue(9);

        await fireEvent.click(canvas.getByRole("button", { name: "Decrease value", }));
        await expect(input).toHaveValue(8);
    },
};

export const WithoutStepper: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 8, stepper: false, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("button", { name: "Increase value", })).toBeNull();
    },
};

export const Invalid: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 99, invalid: true, error: "Too large.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("spinbutton", { name: "КОЛИЧЕСТВО", });

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Too large.");
    },
};

export const Disabled: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 4, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("spinbutton", { name: "КОЛИЧЕСТВО", });

        await expect(input).toBeDisabled();
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const control = canvasElement.querySelector(".numberInput__control") as Element;

    await expect(getComputedStyle(control).backgroundColor).toBe(background);
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
