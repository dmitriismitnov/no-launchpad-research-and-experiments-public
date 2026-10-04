import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Spinner, } from "./spinner";

const meta = {
    title: "Components/Feedback & status/Spinner",
    component: Spinner,
    args: { label: "Loading", },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decorative: Story = { args: { label: undefined, }, };

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

// Pen `lpijt` token contract: the glyph reads `text/secondary`, value-equal to
// the prior `common.700.background` alias in both themes.
const spinnerColours = { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", } as const;

const assertSpinnerTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("spinner-tokens");

        await expect(getComputedStyle(root).color).toBe(spinnerColours[theme]);
    };

export const TokenColorLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <Spinner data-testid="spinner-tokens" label="Loading" />
        </ThemeShell>
    ),
    play: assertSpinnerTokens("light"),
};

export const TokenColorDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <Spinner data-testid="spinner-tokens" label="Loading" />
        </ThemeShell>
    ),
    play: assertSpinnerTokens("dark"),
};
