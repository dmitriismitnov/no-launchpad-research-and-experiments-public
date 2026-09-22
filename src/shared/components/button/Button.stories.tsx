import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { css, } from "@shared/styled-system/css";

import { Button, } from "./button";

const shell = css({
    padding: "x12",
    backgroundColor: {
        _light: "surface.raised.light",
        _dark: "surface.raised.dark",
    },
    color: {
        _light: "ink.strong.light",
        _dark: "ink.strong.dark",
    },
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

const tones = [ "primary", "secondary", "ghost", ] as const;

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: { layout: "fullscreen", },
    argTypes: {
        tone: {
            control: { type: "select", },
            options: [ "primary", "secondary", "ghost", ],
        },
        size: {
            control: { type: "select", },
            options: [ "sm", "md", ],
        },
        children: {
            control: { type: "text", },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        children: "Button",
        tone: "primary",
        size: "md",
    },
    render: (args) => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button {...args} />
            </div>
        </ThemeShell>
    ),
};

export const AllTones: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
            </div>
        </ThemeShell>
    ),
};

export const Sizes: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
            </div>
        </ThemeShell>
    ),
};

export const LightTheme: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
            </div>
        </ThemeShell>
    ),
};

export const DarkTheme: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
            </div>
        </ThemeShell>
    ),
};
