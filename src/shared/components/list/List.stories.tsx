import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { List, } from "./list";

const files = [
    { title: "primitive-tokens.json", meta: "12 KB · 2h ago", trailing: "JSON", icon: "file", },
    { title: "semantic-tokens.json", meta: "48 KB · 2h ago", trailing: "JSON", icon: "file", },
    { title: "Button.tsx", meta: "Edited by Ada", trailing: "TSX", icon: "file", },
    { title: "Archived notes", meta: "Read only", trailing: "—", icon: "file", },
] as const;

const meta = {
    title: "Components/Data display/List",
    component: List,
    args: { items: files, },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcons: Story = {
    args: {
        items: [
            { title: "Foundation published", meta: "Mar 2", trailing: "Done", },
            { title: "Components in review", meta: "In progress", trailing: "12", },
        ],
    },
};

export const TitlesOnly: Story = {
    args: {
        items: [
            { title: "Design tokens", },
            { title: "Components", },
            { title: "Patterns", },
        ],
    },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const frame = css({ width: "420px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `fgxmm` / `h9Cf2t` (docs `dm7Dn`): raised surface and subtle boundary
// discriminate in both themes; the icon `text/secondary` discriminates in both
// themes; the title `text/primary`, metadata `text/tertiary` and trailing
// `text/tertiary` are value-equal role renames (asserted, not claimed RED). The
// doc's row focus rule belongs to the BLOCKED selectable row.
const listColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    icon: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
    title: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    meta: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
    trailing: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
} as const;

const assertListTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("list-tokens");
    const icon = root.querySelector(".list__itemIcon") as HTMLElement;
    const title = root.querySelector(".list__itemTitle") as HTMLElement;
    const meta = root.querySelector(".list__itemMeta") as HTMLElement;
    const trailing = root.querySelector(".list__itemTrailing") as HTMLElement;

    await expect(getComputedStyle(root).backgroundColor).toBe(listColours.surface[theme]);
    await expect(getComputedStyle(root).borderTopColor).toBe(listColours.border[theme]);
    await expect(getComputedStyle(icon).color).toBe(listColours.icon[theme]);
    await expect(getComputedStyle(title).color).toBe(listColours.title[theme]);
    await expect(getComputedStyle(meta).color).toBe(listColours.meta[theme]);
    await expect(getComputedStyle(trailing).color).toBe(listColours.trailing[theme]);
};

const listTokens = (
    <List
        data-testid="list-tokens"
        items={[
            { title: "primitive-tokens.json", meta: "12 KB · 2h ago", trailing: "JSON", icon: "file", },
            { title: "Button.tsx", meta: "Edited by Ada", trailing: "TSX", icon: "file", },
        ]}
    />
);

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>{listTokens}</div>
        </ThemeShell>
    ),
    play: assertListTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>{listTokens}</div>
        </ThemeShell>
    ),
    play: assertListTokens("dark"),
};
