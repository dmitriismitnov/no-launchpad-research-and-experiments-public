import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Brand, type BrandProps, } from "./brand";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x12",
    flexWrap: "wrap",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: BrandProps) => (
    <ThemeShell theme={theme}>
        <Brand {...args} />
    </ThemeShell>
);

const meta = {
    title: "Components/Navigation & disclosure/Brand",
    component: Brand,
} satisfies Meta<typeof Brand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomName: Story = {
    args: { name: "Acme", },
};

export const Pair: Story = {
    render: () => (
        <div className={row}>
            <Brand />
            <Brand name="Acme" />
        </div>
    ),
};

// Pen `MGoSj`: a decorative mark plus the wordmark. The lockup is not a link;
// the wordmark is the only accessible text.
const assertLockup = (name: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const lockup = canvas.getByText(name);

    await expect(lockup.classList.contains("brand__wordmark")).toBe(true);

    const root = canvasElement.querySelector(".brand__root") as HTMLElement;
    const mark = root.querySelector(".brand__mark") as Element;
    await expect(mark).toHaveAttribute("aria-hidden", "true");
    await expect(root.getAttribute("href")).toBeNull();
};

export const LockupLight: Story = {
    render: renderIn("light"),
    play: assertLockup("No Launchpad"),
};

export const LockupDark: Story = {
    render: renderIn("dark"),
    play: assertLockup("No Launchpad"),
};

export const CustomNameLockup: Story = {
    args: { name: "Acme", },
    render: renderIn("light"),
    play: assertLockup("Acme"),
};
