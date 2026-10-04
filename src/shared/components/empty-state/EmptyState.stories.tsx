import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

import { EmptyState, } from "./empty-state";

const frame = css({ width: "420px", });

const meta = {
    title: "Components/Feedback & status/Empty State",
    component: EmptyState,
    args: {
        title: "No tokens yet",
        description: "Create your first semantic token to get started.",
        icon: "settings",
    },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
    args: {
        action: <Button size="sm">New token</Button>,
    },
};

export const TitleOnly: Story = {
    args: { description: undefined, icon: undefined, },
};

export const InFrame: Story = {
    render: (args) => (
        <div className={frame}>
            <EmptyState {...args} />
        </div>
    ),
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `Kj5Nm` token contract: raised surface and subtle boundary (both
// discriminate per theme), value-equal icon/title/description roles and the
// value-equal `lg` radius.
const emptyStateColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    icon: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
    title: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    description: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
} as const;

const assertEmptyStateTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("empty-state-tokens");
        const icon = root.querySelector(".emptyState__icon") as HTMLElement;
        const title = root.querySelector(".emptyState__title") as HTMLElement;
        const description = root.querySelector(".emptyState__description") as HTMLElement;

        await expect(getComputedStyle(root).backgroundColor).toBe(emptyStateColours.surface[theme]);
        await expect(getComputedStyle(root).borderTopColor).toBe(emptyStateColours.border[theme]);
        await expect(getComputedStyle(root).borderTopLeftRadius).toBe("16px");
        await expect(getComputedStyle(icon).color).toBe(emptyStateColours.icon[theme]);
        await expect(getComputedStyle(title).color).toBe(emptyStateColours.title[theme]);
        await expect(getComputedStyle(description).color).toBe(emptyStateColours.description[theme]);
    };

const emptyStateTokens = (
    <EmptyState
        data-testid="empty-state-tokens"
        title="No tokens yet"
        description="Create your first semantic token to get started."
        icon="settings"
    />
);

export const TokenSurfaceLight: Story = {
    render: () => <ThemeShell theme="light">{emptyStateTokens}</ThemeShell>,
    play: assertEmptyStateTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => <ThemeShell theme="dark">{emptyStateTokens}</ThemeShell>,
    play: assertEmptyStateTokens("dark"),
};
