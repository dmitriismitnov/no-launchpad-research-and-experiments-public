import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ThemeSwitchPreview, } from "./theme-switch-preview";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const row = css({
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "x12",
});

const meta = {
    title: "Components/Forms & selection/Theme Switch Preview",
    component: ThemeSwitchPreview,
    parameters: {
        layout: "fullscreen",
        controls: { disable: true, },
    },
} satisfies Meta<typeof ThemeSwitchPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: () => (
        <div className={shell}>
            <ThemeSwitchPreview />
        </div>
    ),
};

export const TwoThemes: Story = {
    render: () => (
        <div className={shell}>
            <div className={row}>
                <div data-theme="light">
                    <ThemeSwitchPreview />
                </div>
                <div data-theme="dark">
                    <ThemeSwitchPreview />
                </div>
            </div>
        </div>
    ),
    play: async ({ canvasElement, }) => {
        const light = canvasElement.querySelector(
            '[data-theme="light"] .themeSwitchPreview__root',
        ) as Element;
        const dark = canvasElement.querySelector(
            '[data-theme="dark"] .themeSwitchPreview__root',
        ) as Element;

        await expect(light).not.toBeNull();
        await expect(dark).not.toBeNull();
        // Pen `q5xZR3` block fill is `surface/raised`: white in light,
        // neutral.900 in dark.
        await expect(getComputedStyle(light).backgroundColor).toBe("rgb(255, 255, 255)");
        await expect(getComputedStyle(dark).backgroundColor).toBe("rgb(15, 23, 42)");
        // Two instances of the same passive master, never a controller.
        await expect(canvasElement.querySelectorAll(".themeSwitchPreview__root").length).toBe(2);
        await expect(canvasElement.querySelector('[role="switch"]')).toBeNull();
    },
};
