import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Divider, } from "./divider";

const row = css({
    display: "flex",
    alignItems: "stretch",
    gap: "x8",
    height: "x16",
});

const column = css({ display: "flex", flexDirection: "column", gap: "x8", width: "240px", });

const meta = {
    title: "Components/Layout & structure/Divider",
    component: Divider,
    args: { orientation: "horizontal", },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    render: (args) => (
        <div className={column}>
            <Divider {...args} />
        </div>
    ),
};

export const Vertical: Story = {
    args: { orientation: "vertical", },
    render: (args) => (
        <div className={row}>
            <span>Left</span>
            <Divider {...args} />
            <span>Right</span>
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

// Pen `vZUUG` / `Uyuv7` token contract: the rule paints the quiet divider role
// `common/200/divider` (neutral.300 light, neutral.700 dark), independent of
// orientation. Both-theme regression evidence only; no production change.
const dividerColour = { light: "rgb(203, 213, 225)", dark: "rgb(51, 65, 85)", } as const;

const assertDividerTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const horizontal = canvas.getByTestId("divider-horizontal");
        const vertical = canvas.getByTestId("divider-vertical");

        await expect(getComputedStyle(horizontal).backgroundColor).toBe(dividerColour[theme]);
        await expect(getComputedStyle(vertical).backgroundColor).toBe(dividerColour[theme]);
    };

const rules = (
    <div className={column}>
        <Divider data-testid="divider-horizontal" />
        <div className={row}>
            <span>Left</span>
            <Divider orientation="vertical" data-testid="divider-vertical" />
            <span>Right</span>
        </div>
    </div>
);

export const RuleTokensLight: Story = {
    render: () => <ThemeShell theme="light">{rules}</ThemeShell>,
    play: assertDividerTokens("light"),
};

export const RuleTokensDark: Story = {
    render: () => <ThemeShell theme="dark">{rules}</ThemeShell>,
    play: assertDividerTokens("dark"),
};
