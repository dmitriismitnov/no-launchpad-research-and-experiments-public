import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Tour, type TourProps, } from "./tour";

const steps = [
    { title: "Welcome to No Launchpad", body: "This short tour covers the three essentials.", },
    { title: "Compose from tokens", body: "Every component reads foundation variables.", },
    { title: "Publish with confidence", body: "The same tokens drive light and dark.", },
] as const;

const meta = {
    title: "Components/Overlays/Tour",
    component: Tour,
    args: {
        steps,
        trigger: "Start tour",
    },
} satisfies Meta<typeof Tour>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, defaultStep: 1, },
};

export const FinalStep: Story = {
    args: { defaultOpen: true, defaultStep: 2, },
};

export const Right: Story = {
    args: { defaultOpen: true, placement: "right", },
};

export const Advance: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Start tour", }));
        await expect(canvas.getByText("Step 1 of 3")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Next", }));
        await expect(canvas.getByText("Step 2 of 3")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Skip tour", }));
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: TourProps) => (
    <ThemeShell theme={theme}>
        <Tour {...args} />
    </ThemeShell>
);

// Pen Tour token contract: the trigger focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead of the
// brand fill. Light discriminates; dark is non-discriminating and is not
// claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Start tour", });

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};

// Pen Tour token contract: the bubble resolves `semantic.surface.overlay` +
// `semantic.border.subtle`, and the footer separator resolves
// `semantic.border.subtle` — all discriminating in each theme.
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const surface = canvas.getByRole("dialog");
        const surfaceStyle = getComputedStyle(surface);
        const footer = canvasElement.querySelector(".tour__footer") as Element;
        const footerStyle = getComputedStyle(footer);

        await expect(surfaceStyle.backgroundColor).toBe(background);
        await expect(surfaceStyle.borderColor).toBe(border);
        await expect(footerStyle.borderTopColor).toBe(border);
    };

export const SurfaceLight: Story = {
    args: { defaultOpen: true, },
    render: renderIn("light"),
    play: assertSurface("rgb(255, 255, 255)", "rgb(226, 232, 240)"),
};

export const SurfaceDark: Story = {
    args: { defaultOpen: true, },
    render: renderIn("dark"),
    play: assertSurface("rgb(30, 41, 59)", "rgb(30, 41, 59)"),
};

// Pen Tour token contract: the inactive dots resolve `semantic.border.strong`
// (`rgb(148, 163, 184)` in dark) and the current dot resolves
// `semantic.action.primary.background` (`rgb(21, 128, 61)`). Both dark roles
// discriminate (old neutral.500 dot; old green.300 current dot); the light
// roles are non-discriminating and are not claimed.
export const DotsDark: Story = {
    args: { defaultOpen: true, defaultStep: 1, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const dots = canvasElement.querySelectorAll(".tour__dot");
        const inactive = dots[0] as Element;
        const current = canvasElement.querySelector(".tour__dot--current_true") as Element;

        await expect(getComputedStyle(inactive).backgroundColor).toBe("rgb(148, 163, 184)");
        await expect(getComputedStyle(current).backgroundColor).toBe("rgb(21, 128, 61)");
    },
};

// Pen Tour token contract: Next is the primary action
// (`action/primary-bg` `rgb(21, 128, 61)` + `action/primary-fg`
// `rgb(255, 255, 255)`) and Back is the secondary action
// (`action/secondary-border` `rgb(148, 163, 184)` +
// `action/secondary-fg` `rgb(241, 245, 249)`). All discriminating in dark; the
// light roles are non-discriminating or value-equivalent and are not claimed.
export const ActionsDark: Story = {
    args: { defaultOpen: true, defaultStep: 1, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const next = canvas.getByRole("button", { name: "Next", });
        const back = canvas.getByRole("button", { name: "Back", });
        const nextStyle = getComputedStyle(next);
        const backStyle = getComputedStyle(back);

        await expect(nextStyle.backgroundColor).toBe("rgb(21, 128, 61)");
        await expect(nextStyle.color).toBe("rgb(255, 255, 255)");
        await expect(backStyle.borderColor).toBe("rgb(148, 163, 184)");
        await expect(backStyle.color).toBe("rgb(241, 245, 249)");
    },
};
