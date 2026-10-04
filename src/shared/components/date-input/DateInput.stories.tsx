import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { DateInput, type DateInputProps, } from "./date-input";

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

const renderIn = (theme: "light" | "dark") => (args: DateInputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <DateInput {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Date Input`, id `ivx6N`) as a typed field.
const reference: DateInputProps = {
    label: "ДАТА",
    placeholder: "ГГГГ-ММ-ДД",
    hint: "Формат ISO 8601.",
};

const meta = {
    title: "Components/Forms & selection/Date Input",
    component: DateInput,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "placeholder", "hint", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        placeholder: { control: { type: "text", }, },
        hint: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ДАТА",
        placeholder: "ГГГГ-ММ-ДД",
        hint: "Формат ISO 8601.",
        invalid: false,
        error: "Укажите дату.",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ДАТА", });

        await expect(input).toHaveAttribute("placeholder", "ГГГГ-ММ-ДД");
        await expect(canvasElement.textContent).toContain("Формат ISO 8601.");
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Укажите дату.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ДАТА", });
        const describedBy = input.getAttribute("aria-describedby");

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(describedBy).not.toBeNull();
        await expect(describedBy === null ? null : document.getElementById(describedBy)).not.toBeNull();
        await expect(canvasElement.textContent).toContain("Укажите дату.");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("textbox", { name: "ДАТА", })).toBeDisabled();
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "ДАТА", });
    const control = input.closest(".dateInput__control") as Element;

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

// --- Both-theme computed-style evidence for the documented Pen states ---
//
// Verification/spec-lock stories (not a behaviour RED): they assert the
// already-shipped `dateInput` recipe against Pen `ivx6N`. The recipe maps
// `surface/raised` -> `common.50.background`, `border/strong` ->
// `common.50.border.strong`, `feedback/negative-border` ->
// `negative.600.background`, and `action/disabled-*` -> `common.100.background`
// / `common.400.background`; the focus ring is the shared `brand.500.background`.

const inputOf = (canvasElement: HTMLElement): HTMLInputElement =>
    canvasElement.querySelector(".dateInput__input") as HTMLInputElement;

const controlOf = (canvasElement: HTMLElement): Element =>
    canvasElement.querySelector(".dateInput__control") as Element;

const iconOf = (canvasElement: HTMLElement): Element => canvasElement.querySelector(".dateInput__icon") as Element;

const labelOf = (canvasElement: HTMLElement): Element => canvasElement.querySelector(".dateInput__label") as Element;

const errorOf = (canvasElement: HTMLElement): Element => canvasElement.querySelector(".dateInput__error") as Element;

const assertEmptyState = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    { surface, border, value, placeholder, }: {
        surface: string;
        border: string;
        value: string;
        placeholder: string;
    },
): Promise<void> => {
    const control = controlOf(canvasElement);
    const input = inputOf(canvasElement);

    // 40px field (`x20`), `surface/raised` + `border/strong`.
    await expect(getComputedStyle(control).height).toBe("40px");
    await expect(getComputedStyle(control).backgroundColor).toBe(surface);
    await expect(getComputedStyle(control).borderTopColor).toBe(border);
    // Empty value reads `text/primary`; the placeholder is the muted cue.
    await expect(input.value).toBe("");
    await expect(getComputedStyle(input).color).toBe(value);
    await expect(getComputedStyle(input, "::placeholder").color).toBe(placeholder);
    // The calendar glyph is decorative only.
    await expect(iconOf(canvasElement)).toHaveAttribute("aria-hidden", "true");
};

export const EmptyState: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) =>
        assertEmptyState(context, {
            surface: "rgb(248, 250, 252)",
            border: "rgb(100, 116, 139)",
            value: "rgb(15, 23, 42)",
            placeholder: "rgb(100, 116, 139)",
        }),
};

export const DarkEmptyState: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) =>
        assertEmptyState(context, {
            surface: "rgb(2, 6, 23)",
            border: "rgb(100, 116, 139)",
            value: "rgb(248, 250, 252)",
            placeholder: "rgb(100, 116, 139)",
        }),
};

const assertFilledState = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    value: string,
): Promise<void> => {
    const input = inputOf(canvasElement);

    await expect(input.value).toBe("2025-03-14");
    await expect(getComputedStyle(input).color).toBe(value);
};

export const FilledState: Story = {
    args: { ...reference, value: "2025-03-14", readOnly: true, },
    render: renderIn("light"),
    play: async (context) => assertFilledState(context, "rgb(15, 23, 42)"),
};

export const DarkFilledState: Story = {
    args: { ...reference, value: "2025-03-14", readOnly: true, },
    render: renderIn("dark"),
    play: async (context) => assertFilledState(context, "rgb(248, 250, 252)"),
};

const assertFocusRing = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    ring: string,
): Promise<void> => {
    const control = controlOf(canvasElement);
    const input = inputOf(canvasElement);

    input.focus();

    await expect(document.activeElement).toBe(input);
    await expect(getComputedStyle(control).outlineStyle).toBe("solid");
    await expect(getComputedStyle(control).outlineWidth).toBe("2px");
    await expect(getComputedStyle(control).outlineColor).toBe(ring);
};

export const FocusVisible: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertFocusRing(context, "rgb(34, 197, 94)"),
};

export const DarkFocusVisible: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertFocusRing(context, "rgb(34, 197, 94)"),
};

const assertInvalidState = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    { border, errorText, }: { border: string; errorText: string; },
): Promise<void> => {
    const input = inputOf(canvasElement);

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(getComputedStyle(controlOf(canvasElement)).borderTopColor).toBe(border);
    await expect(getComputedStyle(errorOf(canvasElement)).color).toBe(errorText);
    await expect(canvasElement.textContent).toContain("Укажите дату.");
};

export const InvalidState: Story = {
    args: { ...reference, invalid: true, error: "Укажите дату.", },
    render: renderIn("light"),
    play: async (context) =>
        assertInvalidState(context, {
            border: "rgb(220, 38, 38)",
            errorText: "rgb(220, 38, 38)",
        }),
};

export const DarkInvalidState: Story = {
    args: { ...reference, invalid: true, error: "Укажите дату.", },
    render: renderIn("dark"),
    play: async (context) =>
        assertInvalidState(context, {
            border: "rgb(248, 113, 113)",
            errorText: "rgb(248, 113, 113)",
        }),
};

const assertDisabledState = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    { surface, foreground, }: { surface: string; foreground: string; },
): Promise<void> => {
    const input = inputOf(canvasElement);

    await expect(input).toBeDisabled();
    await expect(getComputedStyle(input).cursor).toBe("not-allowed");
    await expect(getComputedStyle(controlOf(canvasElement)).backgroundColor).toBe(surface);
    await expect(getComputedStyle(input).color).toBe(foreground);
    await expect(getComputedStyle(iconOf(canvasElement)).color).toBe(foreground);
    await expect(getComputedStyle(labelOf(canvasElement)).color).toBe(foreground);
};

export const DisabledState: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async (context) =>
        assertDisabledState(context, {
            surface: "rgb(241, 245, 249)",
            foreground: "rgb(148, 163, 184)",
        }),
};

export const DarkDisabledState: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("dark"),
    play: async (context) =>
        assertDisabledState(context, {
            surface: "rgb(15, 23, 42)",
            foreground: "rgb(71, 85, 105)",
        }),
};
