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
    play: async ({ canvasElement, }) => {
        const root = canvasElement.querySelector(".themeSwitchPreview__root") as HTMLElement;

        // One named static image, not a live control group.
        await expect(root).not.toBeNull();
        await expect(root.getAttribute("role")).toBe("img");
        await expect(root.getAttribute("aria-label")).toBe("Theme preview");

        // Every apparent control is inert: not focusable, not aria-hidden and
        // not rendered disabled, so the preview suppresses interaction without
        // faking the disabled styling or hiding focusable content.
        const controls = root.querySelectorAll(
            'button, input, [role="tablist"], [role="tab"]',
        );

        await expect(controls.length).toBeGreaterThan(0);

        for ( const control of [ ...controls, ] ) {
            await expect(control.closest("[inert]")).not.toBeNull();
            await expect(control.closest('[aria-hidden="true"]')).toBeNull();
            await expect(control.matches("[disabled]")).toBe(false);
        }

        // Pen `q5xZR3` geometry and copy are untouched by the inert pass.
        await expect(getComputedStyle(root).width).toBe("420px");
        await expect(getComputedStyle(root).height).toBe("383px");
        await expect(root.textContent).toContain("Theme preview");
        await expect(root.textContent).toContain("Card title");
    },
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
