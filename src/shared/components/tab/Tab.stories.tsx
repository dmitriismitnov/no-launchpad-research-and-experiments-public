import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Tab, TabList, type TabProps, } from "./tab";

const panel = css({
    paddingBlock: "x6",
    fontFamily: "body",
    fontSize: "sm",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.common.700.background",
});

const meta = {
    title: "Components/Navigation & disclosure/Tab",
    component: Tab,
    args: { label: "Overview", },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
    args: { active: true, },
};

export const WithIcon: Story = {
    args: { icon: "layout-grid", },
};

export const Disabled: Story = {
    args: { disabled: true, },
};

export const Row: Story = {
    render: () => (
        <div>
            <TabList>
                <Tab label="Overview" active />
                <Tab label="Tokens" />
                <Tab label="Components" icon="settings" />
                <Tab label="Archived" disabled />
            </TabList>
            <p className={panel}>Panel content for the active tab.</p>
        </div>
    ),
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

const renderIn = (theme: "light" | "dark") => (args: TabProps) => (
    <ThemeShell theme={theme}>
        <Tab {...args} />
    </ThemeShell>
);

// Pen `CCpkF` (`vfPHi`) token contract: the focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`), green.500 dark
// (`rgb(34, 197, 94)`) — with the shared 2px geometry. Only the light role is
// discriminating: in dark both the old brand fill and `focus/ring` resolve
// green.500, so `FocusVisibleDark` is recorded as non-discriminating.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("tab", { name: "Overview", });

    await user.tab();
    await expect(trigger).toHaveFocus();

    const style = getComputedStyle(trigger);
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

// Pen `VWQNE`: inactive triggers reserve no indicator space; the active trigger
// carries the 2px indicator against its bottom padding, adding the 8px gap plus
// the 2px bar (10px) to the trigger height. Pen `HcOEO`/`f2iIiG` keep the
// indicator off. Absolute Pen bounds (33/43) assume the font-default 17px label;
// this system pins `lineHeight: normal` (1.4 -> 20px), so the measurable, token-
// independent contract is the 10px indicator contribution and its position.
const assertIndicatorGeometry = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const active = canvas.getByRole("tab", { name: "Overview", });
    const inactive = canvas.getByRole("tab", { name: "Tokens", });

    const activeBox = active.getBoundingClientRect();
    const inactiveBox = inactive.getBoundingClientRect();
    await expect(Math.round(activeBox.height - inactiveBox.height)).toBe(10);

    const indicator = active.querySelector(".tab__indicator") as HTMLElement;
    await expect(indicator).not.toBeNull();

    const indicatorBox = indicator.getBoundingClientRect();
    await expect(Math.round(indicatorBox.height)).toBe(2);
    await expect(Math.round(activeBox.bottom - indicatorBox.bottom)).toBe(8);
    await expect(inactive.querySelector(".tab__indicator")).toBeNull();
};

export const IndicatorGeometry: Story = {
    render: () => (
        <TabList>
            <Tab label="Overview" active />
            <Tab label="Tokens" />
            <Tab label="Components" />
        </TabList>
    ),
    play: assertIndicatorGeometry,
};
