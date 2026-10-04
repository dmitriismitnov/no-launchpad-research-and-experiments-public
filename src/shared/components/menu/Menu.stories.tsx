import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Menu, MenuDivider, MenuItem, type MenuProps, } from "./menu";

const meta = {
    title: "Components/Navigation & disclosure/Menu",
    component: Menu,
    args: {
        label: "Actions",
        children: (
            <>
                <MenuItem label="Rename" shortcut="⌘R" />
                <MenuItem label="Duplicate" shortcut="⌘D" />
                <MenuItem label="Export" icon="file" submenu />
                <MenuDivider />
                <MenuItem label="Delete" tone="danger" />
            </>
        ),
    },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
    args: {
        label: undefined,
        children: (
            <>
                <MenuItem label="Default" shortcut="⌘D" />
                <MenuItem label="Checked" checked />
                <MenuItem label="With icon" icon="settings" />
                <MenuItem label="Submenu" submenu />
                <MenuItem label="Disabled" disabled />
            </>
        ),
    },
};

export const Grouped: Story = {
    args: {
        label: "Foundation",
        children: (
            <>
                <MenuItem label="Primitive tokens" />
                <MenuItem label="Semantic tokens" checked />
                <MenuDivider />
                <MenuItem label="Button" />
                <MenuItem label="Select" submenu />
            </>
        ),
    },
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("menu")).toBeTruthy();
        await expect(canvas.getByRole("menuitem", { name: /Semantic tokens/, })).toBeTruthy();
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

const renderIn = (theme: "light" | "dark") => (args: MenuProps) => (
    <ThemeShell theme={theme}>
        <Menu {...args} />
    </ThemeShell>
);

// Pen `GLufg` / `CX1vE` token contract `C6zTA`: the row focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`), green.500 dark
// (`rgb(34, 197, 94)`) — with the shared 2px geometry and offset 0. Only the
// light role discriminates: in dark both the old brand fill and `focus/ring`
// resolve green.500, so `FocusVisibleDark` is recorded as non-discriminating.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const item = canvas.getByRole("menuitem", { name: /Rename/, });

    await user.tab();
    await expect(item).toHaveFocus();

    const style = getComputedStyle(item);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(outline);
};

export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: assertFocusRing("rgb(22, 163, 74)"),
};

export const FocusVisibleDark: Story = {
    render: renderIn("dark"),
    play: assertFocusRing("rgb(34, 197, 94)"),
};

// Pen `GLufg`: the overlay card resolves `semantic.surface.overlay` and
// `semantic.border.subtle` — both discriminating in each theme (the old common
// step ramp resolves neutral.50 / neutral.300 light and neutral.950 /
// neutral.700 dark).
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const surface = canvas.getByRole("menu");
        const style = getComputedStyle(surface);

        await expect(style.backgroundColor).toBe(background);
        await expect(style.borderColor).toBe(border);
    };

export const SurfaceLight: Story = {
    render: renderIn("light"),
    play: assertSurface("rgb(255, 255, 255)", "rgb(226, 232, 240)"),
};

export const SurfaceDark: Story = {
    render: renderIn("dark"),
    play: assertSurface("rgb(30, 41, 59)", "rgb(30, 41, 59)"),
};

// Pen `CX1vE`: the check glyph resolves `semantic.text.link` — green.700 light
// (`rgb(21, 128, 61)`), green.400 dark (`rgb(74, 222, 128)`). Only the dark
// role discriminates: light green.700 is shared by the old brand fill and
// `text/link`, so `CheckedGlyphLight` is recorded as non-discriminating.
const assertCheckColor = (color: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const check = canvasElement.querySelector(".menu__check") as Element;
    const style = getComputedStyle(check);
    await expect(style.color).toBe(color);
};

export const CheckedGlyphLight: Story = {
    render: renderIn("light"),
    args: { label: undefined, children: <MenuItem label="Checked" checked />, },
    play: assertCheckColor("rgb(21, 128, 61)"),
};

export const CheckedGlyphDark: Story = {
    render: renderIn("dark"),
    args: { label: undefined, children: <MenuItem label="Checked" checked />, },
    play: assertCheckColor("rgb(74, 222, 128)"),
};
