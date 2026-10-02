import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Toggle, type ToggleProps, } from "./toggle";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
    flexWrap: "wrap",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: ToggleProps) => (
    <ThemeShell theme={theme}>
        <div className={row}>
            <Toggle {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Toggle`, id `gkK5e`) expressed as an ordinary composition.
const reference: ToggleProps = {
    label: "Bold",
    icon: "check",
};

const meta = {
    title: "Components/Actions/Toggle",
    component: Toggle,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "pressed", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        pressed: { control: { type: "boolean", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { label: "Bold", pressed: false, disabled: false, },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole("button", { name: "Bold", });

        await expect(toggle).toHaveAttribute("aria-pressed", "false");
    },
};

export const Pressed: Story = {
    args: { ...reference, pressed: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Bold", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const WithoutIcon: Story = {
    args: { label: "Italic", },
    render: renderIn("light"),
};

export const Disabled: Story = {
    args: { label: "Disabled toggle", disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Disabled toggle", })).toBeDisabled();
    },
};

const assertThemeSurface = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", { name: "Bold", });

    await expect(getComputedStyle(toggle).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeSurface(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeSurface(context, "rgb(2, 6, 23)"),
};
