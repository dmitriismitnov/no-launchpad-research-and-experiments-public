import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { NavItem, type NavItemProps, } from "./nav-item";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const bar = css({
    display: "flex",
    alignItems: "center",
    gap: "x2",
    padding: "x4",
    borderRadius: "sm",
    backgroundColor: "semantic.common.50.background",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.common.200.divider",
});

const column = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "x2",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: NavItemProps) => (
    <ThemeShell theme={theme}>
        <NavItem {...args} />
    </ThemeShell>
);

const meta = {
    title: "Components/Navigation & disclosure/Nav Item",
    component: NavItem,
    args: { href: "#", label: "Overview", },
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
    render: () => (
        <div className={column}>
            <NavItem href="#" label="Default" />
            <NavItem href="#" label="Current" active />
            <NavItem href="#" label="With icon" icon="gauge" />
            <NavItem href="#" label="Disabled" disabled />
        </div>
    ),
};

export const InBar: Story = {
    render: () => (
        <div className={bar}>
            <NavItem href="#" label="Overview" active />
            <NavItem href="#" label="Components" />
            <NavItem href="#" label="Pricing" />
        </div>
    ),
};

// Pen `l8wwSv` documented states: default · hover · current · focus-visible ·
// disabled. The focus indicator resolves the shared `focus/ring` role.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const item = canvas.getByRole("link", { name: "Overview", });

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

const assertActive =
    (background: string, foreground: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const item = canvas.getByRole("link", { name: "Overview", });
        const label = item.querySelector(".navItem__label") as Element;

        await expect(item).toHaveAttribute("aria-current", "page");
        await expect(getComputedStyle(item).backgroundColor).toBe(background);
        await expect(getComputedStyle(label).color).toBe(foreground);
    };

export const ActiveLight: Story = {
    args: { active: true, },
    render: renderIn("light"),
    play: assertActive("rgb(240, 253, 244)", "rgb(21, 128, 61)"),
};

export const ActiveDark: Story = {
    args: { active: true, },
    render: renderIn("dark"),
    play: assertActive("rgb(5, 46, 22)", "rgb(134, 239, 172)"),
};

const assertDisabled = (foreground: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByRole("link", { name: "Overview", });
    const label = item.querySelector(".navItem__label") as Element;

    await expect(item).toHaveAttribute("aria-disabled", "true");
    await expect(item).toHaveAttribute("tabindex", "-1");
    await expect(getComputedStyle(item).cursor).toBe("not-allowed");
    await expect(getComputedStyle(label).color).toBe(foreground);
};

export const DisabledLight: Story = {
    args: { disabled: true, },
    render: renderIn("light"),
    play: assertDisabled("rgb(148, 163, 184)"),
};

export const DisabledDark: Story = {
    args: { disabled: true, },
    render: renderIn("dark"),
    play: assertDisabled("rgb(71, 85, 105)"),
};
