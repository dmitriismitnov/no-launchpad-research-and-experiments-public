import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";
import { useState, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ThemeSwitchPreview, type ThemeSwitchValue, } from "./theme-switch-preview";

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

const InteractiveDemo = () => {
    const [ theme, setTheme, ] = useState<ThemeSwitchValue>("light");

    return (
        <div data-theme={theme} data-testid="scope">
            <div className={shell}>
                <ThemeSwitchPreview theme={theme} onThemeChange={setTheme} />
            </div>
        </div>
    );
};

const meta = {
    title: "Components/Forms & selection/Theme Switch Preview",
    component: ThemeSwitchPreview,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "disabled", "defaultTheme", ],
        },
    },
    args: { label: "Dark theme", defaultTheme: "light", disabled: false, },
    argTypes: {
        label: { control: { type: "text", }, },
        defaultTheme: {
            control: { type: "select", },
            options: [ "light", "dark", ],
        },
        theme: { control: false, },
        onThemeChange: { control: false, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof ThemeSwitchPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: (args) => (
        <ThemeShell theme="light">
            <ThemeSwitchPreview {...args} />
        </ThemeShell>
    ),
};

export const Reference: Story = {
    render: (args) => (
        <ThemeShell theme="light">
            <ThemeSwitchPreview {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Dark theme", });

        await expect(control).toHaveAttribute("aria-checked", "false");
    },
};

export const Dark: Story = {
    args: { defaultTheme: "dark", },
    render: (args) => (
        <ThemeShell theme="dark">
            <ThemeSwitchPreview {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Dark theme", });

        await expect(control).toHaveAttribute("aria-checked", "true");
    },
};

export const Interactive: Story = {
    render: () => <InteractiveDemo />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const control = canvas.getByRole("switch", { name: "Dark theme", });
        const scope = canvasElement.querySelector('[data-testid="scope"]') as Element;

        await expect(control).toHaveAttribute("aria-checked", "false");
        await expect(scope).toHaveAttribute("data-theme", "light");

        await fireEvent.click(control);

        await expect(control).toHaveAttribute("aria-checked", "true");
        await expect(scope).toHaveAttribute("data-theme", "dark");
    },
};

export const Disabled: Story = {
    args: { disabled: true, },
    render: (args) => (
        <ThemeShell theme="light">
            <ThemeSwitchPreview {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("switch", { name: "Dark theme", })).toBeDisabled();
    },
};

const assertRootBackground = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const root = canvasElement.querySelector(".themeSwitchPreview__root") as Element;

    await expect(getComputedStyle(root).backgroundColor).toBe(background);
};

export const Light: Story = {
    render: () => (
        <ThemeShell theme="light">
            <ThemeSwitchPreview />
        </ThemeShell>
    ),
    play: async (context) => assertRootBackground(context, "rgb(248, 250, 252)"),
};

export const DarkSurface: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <ThemeSwitchPreview />
        </ThemeShell>
    ),
    play: async (context) => assertRootBackground(context, "rgb(2, 6, 23)"),
};
