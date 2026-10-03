import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

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

export const ValueByDefault: Story = {
    args: { label: "OPACITY", defaultValue: 57, min: 0, max: 100, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelector(".slider__value")).not.toBeNull();
        await expect(canvasElement.textContent).toContain("57");
    },
};

export const DarkValueByDefault: Story = {
    args: { label: "OPACITY", defaultValue: 57, min: 0, max: 100, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.textContent).toContain("57");
    },
};

export const ValueOptOut: Story = {
    args: { label: "OPACITY", defaultValue: 57, min: 0, max: 100, showValue: false, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelector(".slider__value")).toBeNull();
        await expect(canvasElement.textContent).not.toContain("57");
    },
};

// The vitest browser user-event does not drive range arrow keys, so the native
// keyboard stepping is exercised through the provider's CDP session.
const pressKey = async (key: string, code: string, virtualKeyCode: number): Promise<void> => {
    const { cdp, } = await import("vitest/browser");
    const session = cdp();
    const base = {
        key,
        code,
        windowsVirtualKeyCode: virtualKeyCode,
        nativeVirtualKeyCode: virtualKeyCode,
    };

    await session.send("Input.dispatchKeyEvent", { ...base, type: "keyDown", });
    await session.send("Input.dispatchKeyEvent", { ...base, type: "keyUp", });
};

export const Keyboard: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, step: 5, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });
        const user = userEvent.setup();

        await user.tab();
        await expect(slider).toHaveFocus();

        await pressKey("ArrowRight", "ArrowRight", 39);
        await expect(slider).toHaveValue("55");

        await pressKey("Home", "Home", 36);
        await expect(slider).toHaveValue("0");

        await pressKey("End", "End", 35);
        await expect(slider).toHaveValue("100");
    },
};

const thumbStyle = (canvasElement: HTMLElement): CSSStyleDeclaration =>
    getComputedStyle(canvasElement.querySelector(".slider__thumb") as Element);

export const ThumbHover: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        slider.setAttribute("data-hover", "true");

        const style = thumbStyle(canvasElement);

        await expect(style.width).toBe("24px");
        await expect(style.height).toBe("24px");
        await expect(style.borderTopColor).toBe("rgb(22, 101, 52)");
    },
};

export const DarkThumbHover: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        slider.setAttribute("data-hover", "true");

        const style = thumbStyle(canvasElement);

        await expect(style.width).toBe("24px");
        await expect(style.borderTopColor).toBe("rgb(187, 247, 208)");
    },
};

export const ThumbFocus: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        await user.tab();

        const style = thumbStyle(canvasElement);

        await expect(style.width).toBe("28px");
        await expect(style.height).toBe("28px");
        await expect(style.borderTopColor).toBe("rgb(22, 163, 74)");
    },
};

export const DarkThumbFocus: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        await user.tab();

        const style = thumbStyle(canvasElement);

        await expect(style.width).toBe("28px");
        await expect(style.borderTopColor).toBe("rgb(34, 197, 94)");
    },
};

export const ThumbActive: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        slider.setAttribute("data-active", "true");

        const style = thumbStyle(canvasElement);

        await expect(style.width).toBe("22px");
        await expect(style.height).toBe("22px");
        await expect(style.backgroundColor).toBe("rgb(21, 128, 61)");
    },
};

export const DarkThumbActive: Story = {
    args: { label: "OPACITY", defaultValue: 50, min: 0, max: 100, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const slider = canvas.getByRole("slider", { name: "OPACITY", });

        slider.setAttribute("data-active", "true");

        const style = thumbStyle(canvasElement);

        await expect(style.width).toBe("22px");
        await expect(style.backgroundColor).toBe("rgb(134, 239, 172)");
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

// A disabled range must not react to pointer state, whether the harness drives
// the native `:hover`/`:active` or the synthetic `[data-hover]`/`[data-active]`
// markers. The thumb stays 20px with the disabled fill and border.
const assertDisabledThumb = async (
    canvasElement: HTMLElement,
    expected: { border: string; background: string; },
): Promise<void> => {
    const style = thumbStyle(canvasElement);

    await expect(style.width).toBe("20px");
    await expect(style.height).toBe("20px");
    await expect(style.borderTopColor).toBe(expected.border);
    await expect(style.backgroundColor).toBe(expected.background);
};

const disabledPointer = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    expected: { border: string; background: string; },
): Promise<void> => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider", { name: "OPACITY", });

    slider.setAttribute("data-hover", "true");
    await assertDisabledThumb(canvasElement, expected);

    slider.removeAttribute("data-hover");
    slider.setAttribute("data-active", "true");
    await assertDisabledThumb(canvasElement, expected);
};

const lightDisabledThumb = { border: "rgb(148, 163, 184)", background: "rgb(241, 245, 249)", };
const darkDisabledThumb = { border: "rgb(71, 85, 105)", background: "rgb(15, 23, 42)", };

export const DisabledPointer: Story = {
    args: { label: "OPACITY", defaultValue: 57, showValue: true, disabled: true, },
    render: renderIn("light"),
    play: async (context) => disabledPointer(context, lightDisabledThumb),
};

export const DarkDisabledPointer: Story = {
    args: { label: "OPACITY", defaultValue: 57, showValue: true, disabled: true, },
    render: renderIn("dark"),
    play: async (context) => disabledPointer(context, darkDisabledThumb),
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
