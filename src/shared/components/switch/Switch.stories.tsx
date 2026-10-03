import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Switch, type SwitchProps, } from "./switch";

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

const renderIn = (theme: "light" | "dark") => (args: SwitchProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Switch {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Switch`, id `BQvnn`).
const reference: SwitchProps = { label: "Switch", };

const meta = {
    title: "Components/Forms & selection/Switch",
    component: Switch,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { label: "Switch", invalid: false, error: "Required", },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Switch", });

        await expect(control).toHaveAttribute("aria-checked", "false");
    },
};

export const On: Story = {
    args: { ...reference, defaultChecked: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("switch", { name: "Switch", })).toHaveAttribute("aria-checked", "true");
    },
};

export const Interactive: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Switch", });

        await fireEvent.click(control);
        await expect(control).toHaveAttribute("aria-checked", "true");

        await fireEvent.click(control);
        await expect(control).toHaveAttribute("aria-checked", "false");
    },
};

export const SpaceToggles: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Switch", });
        const user = userEvent.setup();

        await user.tab();
        await expect(control).toHaveFocus();

        await user.keyboard(" ");
        await expect(control).toHaveAttribute("aria-checked", "true");

        await user.keyboard(" ");
        await expect(control).toHaveAttribute("aria-checked", "false");
    },
};

export const LabelClickToggles: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Switch", });
        const user = userEvent.setup();

        await user.click(canvas.getByText("Switch"));
        await expect(control).toHaveAttribute("aria-checked", "true");

        await user.click(canvas.getByText("Switch"));
        await expect(control).toHaveAttribute("aria-checked", "false");
    },
};

export const DarkOn: Story = {
    args: { ...reference, defaultChecked: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Switch", });
        const track = canvasElement.querySelector(".switch__track") as Element;

        await expect(control).toHaveAttribute("aria-checked", "true");
        await expect(getComputedStyle(track).backgroundColor).toBe("rgb(134, 239, 172)");
    },
};

export const DarkDisabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("switch", { name: "Switch", })).toBeDisabled();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Required", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Switch", });

        await expect(control).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Required");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("switch", { name: "Switch", })).toBeDisabled();
    },
};

const assertThemeTrack = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const track = canvasElement.querySelector(".switch__track") as Element;

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
