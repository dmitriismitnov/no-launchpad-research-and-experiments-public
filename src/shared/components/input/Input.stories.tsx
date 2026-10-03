import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Input, type InputProps, } from "./input";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "320px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: InputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Input {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Input / Text`, id `YknUp`) expressed as an ordinary
// composition. Its field copy stays in the story, never in the public API.
const reference: InputProps = {
    label: "ИМЯ",
    placeholder: "Как к вам обращаться",
};

const meta = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "placeholder", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        placeholder: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ИМЯ",
        placeholder: "Как к вам обращаться",
        invalid: false,
        error: "Заполните поле",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ИМЯ", });

        await expect(input).toHaveAttribute("placeholder", "Как к вам обращаться");
    },
};

export const Minimal: Story = {
    args: { placeholder: "Без лейбла", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("textbox")).toBeTruthy();
        await expect(canvasElement.querySelectorAll("label").length).toBe(0);
    },
};

export const Invalid: Story = {
    args: { label: "ИМЯ", invalid: true, error: "Заполните поле", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ИМЯ", });
        const describedBy = input.getAttribute("aria-describedby");

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(describedBy).not.toBeNull();
        await expect(describedBy === null ? null : document.getElementById(describedBy)).not.toBeNull();
        await expect(canvasElement.textContent).toContain("Заполните поле");
    },
};

export const Disabled: Story = {
    args: { label: "ИМЯ", placeholder: "Как к вам обращаться", disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ИМЯ", });

        await expect(( input as HTMLInputElement ).disabled).toBe(true);
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const control = canvasElement.querySelector(".input__control") as Element;

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

// Pen `dO8tX` anatomy: the decorative prefix / suffix icons share the control
// boundary with the native value, and stay decorative (no accessible name).
const assertPrefixSuffix = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const control = canvasElement.querySelector(".input__control") as Element;
    const label = canvasElement.querySelector(".input__label") as Element;
    const prefix = canvasElement.querySelector(".input__prefixIcon") as Element;
    const suffix = canvasElement.querySelector(".input__suffixIcon") as Element;
    const glyph = canvasElement.querySelector(".input__prefixIcon .icon") as Element;

    await expect(control.contains(prefix)).toBe(true);
    await expect(control.contains(suffix)).toBe(true);
    await expect(glyph.getAttribute("aria-hidden")).toBe("true");
    // The icon slots paint from the tertiary text role, like the field label.
    await expect(getComputedStyle(prefix).color).toBe(getComputedStyle(label).color);
    await expect(getComputedStyle(suffix).color).toBe(getComputedStyle(label).color);
};

export const PrefixSuffix: Story = {
    args: { label: "ПОИСК", placeholder: "Найти", prefixIcon: "mail", suffixIcon: "x", },
    render: renderIn("light"),
    play: assertPrefixSuffix,
};

export const DarkPrefixSuffix: Story = {
    args: { label: "ПОИСК", placeholder: "Найти", prefixIcon: "mail", suffixIcon: "x", },
    render: renderIn("dark"),
    play: assertPrefixSuffix,
};

// Pen `dO8tX` states: read-only keeps the value visible but not editable.
const assertReadOnly = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const input = canvasElement.querySelector(".input__input") as HTMLInputElement;

    await expect(input.readOnly).toBe(true);
    await expect(input).toHaveValue("user@example.com");
    await expect(input).not.toHaveAttribute("aria-invalid", "true");
};

export const ReadOnly: Story = {
    args: { label: "EMAIL", defaultValue: "user@example.com", readOnly: true, },
    render: renderIn("light"),
    play: assertReadOnly,
};

export const DarkReadOnly: Story = {
    args: { label: "EMAIL", defaultValue: "user@example.com", readOnly: true, },
    render: renderIn("dark"),
    play: assertReadOnly,
};

// Pen `dO8tX` public variant `type: text · email · password · search`.
const assertNativeTypes = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const types = [ ...canvasElement.querySelectorAll(".input__input"), ].map(
        (node) => ( node as HTMLInputElement ).type,
    );

    await expect(types).toEqual([ "text", "email", "password", "search", ]);
};

export const NativeTypes: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>
                <Input label="TEXT" type="text" />
                <Input label="EMAIL" type="email" />
                <Input label="PASSWORD" type="password" />
                <Input label="SEARCH" type="search" />
            </div>
        </ThemeShell>
    ),
    play: assertNativeTypes,
};

export const DarkNativeTypes: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>
                <Input label="TEXT" type="text" />
                <Input label="EMAIL" type="email" />
                <Input label="PASSWORD" type="password" />
                <Input label="SEARCH" type="search" />
            </div>
        </ThemeShell>
    ),
    play: assertNativeTypes,
};
