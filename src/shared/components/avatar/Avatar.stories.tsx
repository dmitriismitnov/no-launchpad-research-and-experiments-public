import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Avatar, } from "./avatar";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
});

const meta = {
    title: "Components/Data display/Avatar",
    component: Avatar,
    args: { name: "Alice Ryder", },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Sizes: Story = {
    render: () => (
        <div className={row}>
            <Avatar name="Alice Ryder" size="sm" />
            <Avatar name="Alice Ryder" size="md" />
            <Avatar name="Alice Ryder" size="lg" />
        </div>
    ),
};

export const Image: Story = {
    args: {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%2316A34A'/%3E%3C/svg%3E",
    },
};

export const Presence: Story = {
    render: () => (
        <div className={row}>
            <Avatar name="Alice Ryder" presence="online" />
            <Avatar name="Alice Ryder" presence="away" />
            <Avatar name="Alice Ryder" presence="busy" />
            <Avatar name="Alice Ryder" presence="offline" />
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

// Pen `q9qgrL` / `YoSlU` token contract: the presence outline is the raised
// surface role and the online presence dot is the feedback positive step 700
// role. Away/busy/offline are retained (INFO) and covered as regression. Only
// the light values discriminate; the dark pairs are asserted for completeness.
const presenceColours = {
    online: { light: "rgb(21, 128, 61)", dark: "rgb(134, 239, 172)", },
    away: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
    busy: { light: "rgb(220, 38, 38)", dark: "rgb(248, 113, 113)", },
    offline: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
} as const;

const presenceOutline = { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", } as const;

const assertPresenceTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);

        for ( const [ presence, colours, ] of Object.entries(presenceColours) ) {
            const root = canvas.getByTestId(`avatar-${presence}`);
            const dot = root.querySelector(".avatar__presence") as HTMLElement;
            const style = getComputedStyle(dot);

            await expect(style.backgroundColor).toBe(colours[theme]);
            await expect(style.borderColor).toBe(presenceOutline[theme]);
            await expect(style.borderWidth).toBe("2px");
        }
    };

const presenceRow = (
    <div className={row}>
        <Avatar name="Alice Ryder" presence="online" data-testid="avatar-online" />
        <Avatar name="Alice Ryder" presence="away" data-testid="avatar-away" />
        <Avatar name="Alice Ryder" presence="busy" data-testid="avatar-busy" />
        <Avatar name="Alice Ryder" presence="offline" data-testid="avatar-offline" />
    </div>
);

export const PresenceTokensLight: Story = {
    render: () => <ThemeShell theme="light">{presenceRow}</ThemeShell>,
    play: assertPresenceTokens("light"),
};

export const PresenceTokensDark: Story = {
    render: () => <ThemeShell theme="dark">{presenceRow}</ThemeShell>,
    play: assertPresenceTokens("dark"),
};
