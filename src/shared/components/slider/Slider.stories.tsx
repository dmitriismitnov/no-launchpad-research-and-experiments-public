import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Slider, type SliderProps, } from "./slider";

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

const renderIn = (theme: "light" | "dark") => (args: SliderProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Slider {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Slider`, id `z57yzW`): 280px track, ~57% filled.
const reference: SliderProps = {
    label: "OPACITY",
    defaultValue: 57,
    min: 0,
    max: 100,
    showValue: true,
};

const meta = {
    title: "Components/Forms & selection/Slider",
    component: Slider,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "showValue", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        showValue: { control: { type: "boolean", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { label: "OPACITY", defaultValue: 57, showValue: true, invalid: false, error: "Out of range", },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        await expect(slider).toHaveValue("57");
        await expect(canvasElement.textContent).toContain("57");
    },
};

export const Interactive: Story = {
    args: { label: "OPACITY", defaultValue: 57, showValue: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        await fireEvent.change(slider, { target: { value: "80", }, });
        await expect(slider).toHaveValue("80");
        await expect(canvasElement.textContent).toContain("80");
    },
};

export const Formatted: Story = {
    args: { label: "OPACITY", defaultValue: 50, showValue: true, formatValue: (value) => `${value}%`, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("slider", { name: "OPACITY", })).toHaveAttribute("aria-valuetext", "50%");
    },
};

export const Invalid: Story = {
    args: { label: "OPACITY", defaultValue: 57, invalid: true, error: "Out of range", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        await expect(slider).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Out of range");
    },
};

export const Disabled: Story = {
    args: { label: "OPACITY", defaultValue: 57, showValue: true, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        await expect(slider).toBeDisabled();
    },
};

const assertThemeTrack = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const track = canvasElement.querySelector(".slider__track") as Element;

    await expect(getComputedStyle(track).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeTrack(context, "rgb(241, 245, 249)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeTrack(context, "rgb(15, 23, 42)"),
};
