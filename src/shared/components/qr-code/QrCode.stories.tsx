import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { QrCode, } from "./qr-code";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
});

const meta = {
    title: "Components/Data display/QR Code",
    component: QrCode,
} satisfies Meta<typeof QrCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Labelled: Story = {
    args: { label: "Scan to open the app", },
};

export const Pair: Story = {
    parameters: { controls: { disable: true, }, },
    render: () => (
        <div className={row}>
            <QrCode label="Scan to open the app" />
            <QrCode label="Scan to join the workspace" />
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

// Pen `kQTMg` / `dF7N0`: root `surface/raised` and boundary `border/subtle`
// discriminate in both themes; the `cellFilled` modules `text/primary` are a
// value-equal role rename. Pen's audit reports `focus-indicator 0/0`.
const qrCodeColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    module: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
} as const;

const assertQrCodeTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("qr-code-tokens");
    const filled = root.querySelector(".qrCode__cellFilled") as HTMLElement;

    await expect(getComputedStyle(root).backgroundColor).toBe(qrCodeColours.surface[theme]);
    await expect(getComputedStyle(root).borderTopColor).toBe(qrCodeColours.border[theme]);
    await expect(getComputedStyle(filled).backgroundColor).toBe(qrCodeColours.module[theme]);
};

const qrCodeTokens = <QrCode data-testid="qr-code-tokens" />;

export const TokenSurfaceLight: Story = {
    render: () => <ThemeShell theme="light">{qrCodeTokens}</ThemeShell>,
    play: assertQrCodeTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => <ThemeShell theme="dark">{qrCodeTokens}</ThemeShell>,
    play: assertQrCodeTokens("dark"),
};
