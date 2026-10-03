import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";
import { useState, } from "react";

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

// Pen `EZfrL` (`ox2RF` / `W1OqsJ`): a reached bound disables the saturated
// stepper direction, so the value is never trapped at the bound.
const assertMinReached = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Decrease value", })).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "Increase value", })).not.toBeDisabled();
};

const assertMaxReached = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Increase value", })).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "Decrease value", })).not.toBeDisabled();
};

export const MinReached: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 0, min: 0, max: 64, },
    render: renderIn("light"),
    play: assertMinReached,
};

export const DarkMinReached: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 0, min: 0, max: 64, },
    render: renderIn("dark"),
    play: assertMinReached,
};

export const MaxReached: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 64, min: 0, max: 64, },
    render: renderIn("light"),
    play: assertMaxReached,
};

export const DarkMaxReached: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 64, min: 0, max: 64, },
    render: renderIn("dark"),
    play: assertMaxReached,
};

// Pen `EZfrL` content rule: clamp silently at min / max; typing stays available.
export const StepperClamp: Story = {
    args: { label: "КОЛИЧЕСТВО", defaultValue: 2, min: 0, max: 3, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("spinbutton", { name: "КОЛИЧЕСТВО", });
        const increase = canvas.getByRole("button", { name: "Increase value", });
        const decrease = canvas.getByRole("button", { name: "Decrease value", });

        await fireEvent.click(increase);
        await expect(input).toHaveValue(3);
        await expect(increase).toBeDisabled();

        for ( let step = 0; step < 4; step += 1 ) {
            await fireEvent.click(decrease);
        }

        await expect(input).toHaveValue(0);
        await expect(decrease).toBeDisabled();
    },
};

const ControlledStepper = () => {
    const [ value, setValue, ] = useState(2);

    return (
        <NumberInput
            label="КОЛИЧЕСТВО"
            min={0}
            max={3}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
        />
    );
};

const controlledClampPlay = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "КОЛИЧЕСТВО", });
    const increase = canvas.getByRole("button", { name: "Increase value", });

    await fireEvent.click(increase);
    await expect(input).toHaveValue(3);
    await expect(increase).toBeDisabled();
};

export const ControlledClamp: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>
                <ControlledStepper />
            </div>
        </ThemeShell>
    ),
    play: controlledClampPlay,
};

export const DarkControlledClamp: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>
                <ControlledStepper />
            </div>
        </ThemeShell>
    ),
    play: controlledClampPlay,
};
