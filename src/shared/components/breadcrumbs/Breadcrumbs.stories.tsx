import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Breadcrumbs, type BreadcrumbsProps, } from "./breadcrumbs";

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

const renderIn = (theme: "light" | "dark") => (args: BreadcrumbsProps) => (
    <ThemeShell theme={theme}>
        <Breadcrumbs {...args} />
    </ThemeShell>
);

const trail = [
    { label: "Foundation", href: "#", },
    { label: "Components", href: "#", },
    { label: "Button", },
] as const;

// Pen `Bvk23` public variants `H5sLG` include "with icon"; the glyph is
// decorative and lives inside the crumb link.
const iconTrail = [
    { label: "Home", href: "#", icon: "folder", },
    { label: "Components", href: "#", icon: "layout-grid", },
    { label: "Button", },
] as const;

const meta = {
    title: "Components/Navigation & disclosure/Breadcrumbs",
    component: Breadcrumbs,
    args: { items: trail, },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCrumb: Story = {
    args: { items: [ { label: "Home", }, ], },
};

export const CustomSeparator: Story = {
    args: { items: trail, separatorIcon: "arrow-right", },
};

const assertCrumbIcons = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb", });
    const link = nav.querySelector(".breadcrumbs__link") as HTMLElement;

    await expect(link).not.toBeNull();

    const slot = link.querySelector(".breadcrumbs__icon") as Element;
    await expect(slot).not.toBeNull();

    // The icon slot is the glyph element itself (the `icon` class is merged
    // onto the same node) and stays decorative.
    await expect(slot).toHaveAttribute("aria-hidden", "true");
    await expect(slot.classList.contains("icon")).toBe(true);
};

export const WithIcons: Story = {
    args: { items: iconTrail, },
    render: renderIn("light"),
    play: assertCrumbIcons,
};

export const DarkWithIcons: Story = {
    args: { items: iconTrail, },
    render: renderIn("dark"),
    play: assertCrumbIcons,
};

// Pen `Bvk23` token contract `A57dA`: the crumb focus indicator resolves
// `semantic.focus.ring` with the shared 2px padding-box geometry.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb", });
    const link = nav.querySelector(".breadcrumbs__link") as HTMLElement;

    await user.tab();
    await expect(link).toHaveFocus();

    const style = getComputedStyle(link);
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
