import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Toast, } from "./toast";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    alignItems: "flex-start",
});

const meta = {
    title: "Components/Feedback & status/Toast",
    component: Toast,
    args: {
        title: "Saved",
        description: "Your changes are live.",
        icon: "check",
    },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Neutral: Story = {
    args: { tone: "neutral", title: "Heads up", icon: "settings", },
};

export const Negative: Story = {
    args: { tone: "negative", title: "Upload failed", icon: "x", },
};

export const Brand: Story = {
    args: { tone: "brand", title: "New feature", icon: "settings", },
};

export const WithAction: Story = {
    args: { action: { label: "Undo", onClick: () => {}, }, },
};

export const Dismissible: Story = {
    args: { onDismiss: () => {}, },
};

export const Stack: Story = {
    render: () => (
        <div className={stack}>
            <Toast title="Saved" description="Your changes are live." icon="check" />
            <Toast
                title="Upload failed"
                description="The file could not be processed."
                tone="negative"
                icon="x"
                action={{ label: "Retry", onClick: () => {}, }}
            />
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

// Pen `F1P1XX` token contract: overlay surface, subtle boundary, text/link
// action and the value-equal title/body/dismiss roles. Both themes are
// captured; the surface and boundary discriminate in both, the action in dark.
const toastColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(30, 41, 59)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    action: { light: "rgb(21, 128, 61)", dark: "rgb(74, 222, 128)", },
    title: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    body: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
    dismiss: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
} as const;

const assertToastTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("toast-tokens");
    const action = root.querySelector(".toast__action") as HTMLElement;
    const title = root.querySelector(".toast__title") as HTMLElement;
    const body = root.querySelector(".toast__body") as HTMLElement;
    const dismiss = root.querySelector(".toast__dismiss") as HTMLElement;

    await expect(getComputedStyle(root).backgroundColor).toBe(toastColours.surface[theme]);
    await expect(getComputedStyle(root).borderTopColor).toBe(toastColours.border[theme]);
    await expect(getComputedStyle(action).color).toBe(toastColours.action[theme]);
    await expect(getComputedStyle(title).color).toBe(toastColours.title[theme]);
    await expect(getComputedStyle(body).color).toBe(toastColours.body[theme]);
    await expect(getComputedStyle(dismiss).color).toBe(toastColours.dismiss[theme]);
};

const toastTokens = (
    <Toast
        data-testid="toast-tokens"
        title="Saved"
        description="Your changes are live."
        icon="check"
        action={{ label: "Undo", onClick: () => {}, }}
        onDismiss={() => {}}
    />
);

export const TokenSurfaceLight: Story = {
    render: () => <ThemeShell theme="light">{toastTokens}</ThemeShell>,
    play: assertToastTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => <ThemeShell theme="dark">{toastTokens}</ThemeShell>,
    play: assertToastTokens("dark"),
};
