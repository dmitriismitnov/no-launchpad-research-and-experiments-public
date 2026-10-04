import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Alert, } from "./alert";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    width: "420px",
});

const meta = {
    title: "Components/Feedback & status/Alert",
    component: Alert,
    args: {
        title: "Heads up",
        description: "Something happened that you should know about.",
    },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Positive: Story = {
    args: { tone: "positive", title: "All good", icon: "check", },
};

export const Negative: Story = {
    args: {
        tone: "negative",
        title: "Upload failed",
        description: "The file could not be processed. Try again.",
        icon: "x",
    },
};

export const Brand: Story = {
    args: { tone: "brand", title: "New feature", icon: "settings", },
};

export const Dismissible: Story = {
    args: { onDismiss: () => {}, icon: "check", },
};

export const AllTones: Story = {
    render: () => (
        <div className={stack}>
            <Alert title="Neutral" description="Informational copy." icon="settings" />
            <Alert title="Positive" description="Saved successfully." tone="positive" icon="check" />
            <Alert title="Negative" description="Something went wrong." tone="negative" icon="x" />
            <Alert title="Brand" description="A new capability." tone="brand" icon="settings" />
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

// Pen `Q2PWF` token contract: the neutral feedback foreground and the
// positive/negative surfaces and foregrounds are value-equal matrix aliases
// (no production change), asserted as regression in both themes. The named
// `feedback/*` roles remain BLOCKED in the foundation.
const alertColours = {
    neutralSurface: { light: "rgb(248, 250, 252)", dark: "rgb(2, 6, 23)", },
    neutralBorder: { light: "rgb(203, 213, 225)", dark: "rgb(51, 65, 85)", },
    neutralFg: { light: "rgb(51, 65, 85)", dark: "rgb(226, 232, 240)", },
    positiveSurface: { light: "rgb(240, 253, 244)", dark: "rgb(5, 46, 22)", },
    positiveFg: { light: "rgb(21, 128, 61)", dark: "rgb(134, 239, 172)", },
    negativeSurface: { light: "rgb(254, 242, 242)", dark: "rgb(69, 10, 10)", },
    negativeFg: { light: "rgb(185, 28, 28)", dark: "rgb(252, 165, 165)", },
} as const;

const alertTokens = (
    <div className={stack}>
        <Alert data-testid="alert-neutral" title="Neutral" icon="settings" />
        <Alert data-testid="alert-positive" title="Positive" tone="positive" icon="check" />
        <Alert data-testid="alert-negative" title="Negative" tone="negative" icon="x" />
    </div>
);

const assertAlertTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const neutral = canvas.getByTestId("alert-neutral");
    const positive = canvas.getByTestId("alert-positive");
    const negative = canvas.getByTestId("alert-negative");

    await expect(getComputedStyle(neutral).backgroundColor).toBe(alertColours.neutralSurface[theme]);
    await expect(getComputedStyle(neutral).borderTopColor).toBe(alertColours.neutralBorder[theme]);
    await expect(getComputedStyle(neutral.querySelector(".alert__icon") as HTMLElement).color).toBe(
        alertColours.neutralFg[theme],
    );
    await expect(getComputedStyle(neutral.querySelector(".alert__title") as HTMLElement).color).toBe(
        alertColours.neutralFg[theme],
    );
    await expect(getComputedStyle(positive).backgroundColor).toBe(alertColours.positiveSurface[theme]);
    await expect(getComputedStyle(positive.querySelector(".alert__icon") as HTMLElement).color).toBe(
        alertColours.positiveFg[theme],
    );
    await expect(getComputedStyle(negative).backgroundColor).toBe(alertColours.negativeSurface[theme]);
    await expect(getComputedStyle(negative.querySelector(".alert__icon") as HTMLElement).color).toBe(
        alertColours.negativeFg[theme],
    );
};

export const TokenRolesLight: Story = {
    render: () => <ThemeShell theme="light">{alertTokens}</ThemeShell>,
    play: assertAlertTokens("light"),
};

export const TokenRolesDark: Story = {
    render: () => <ThemeShell theme="dark">{alertTokens}</ThemeShell>,
    play: assertAlertTokens("dark"),
};
