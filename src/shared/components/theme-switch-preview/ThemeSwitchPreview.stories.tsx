import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, within, } from "storybook/test";

import { Badge, } from "@shared/components/badge";
import { Button, } from "@shared/components/button";
import { Card, } from "@shared/components/card";
import { Icon, } from "@shared/components/icon";
import { Input, } from "@shared/components/input";
import { Tab, TabList, } from "@shared/components/tab";
import { css, } from "@shared/styled-system/css";

import { ThemeSwitchPreview, } from "./theme-switch-preview";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const stack = css({
    display: "grid",
    gap: "x8",
});

const head = css({
    display: "flex",
    alignItems: "center",
    gap: "x5",
});

const title = css({
    flex: "1",
    fontSize: "md",
    fontWeight: "semibold",
    lineHeight: "tight",
});

const row = css({
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "x5",
});

// The Pen `Theme Switch Preview` master (`q5xZR3`) anatomy: head, actions,
// input, badges, card and tabs, composed from the shared components. The
// preview renders this one composition in both theme contexts.
const Showcase = () => (
    <div className={stack}>
        <div className={head}>
            <Icon name="moon" size="sm" />
            <span className={title}>Theme preview</span>
            <Badge label="theme" withDot={false} />
        </div>
        <div className={row}>
            <Button tone="primary">Primary</Button>
            <Button tone="secondary">Secondary</Button>
        </div>
        <Input label="Email" defaultValue="team@acme.dev" readOnly />
        <div className={row}>
            <Badge label="Selected" tone="brand" />
            <Badge label="Passing" tone="positive" />
            <Badge label="Draft" />
        </div>
        <Card variant="plain" title="Card title" description="Readable in both themes." />
        <TabList>
            <Tab label="Preview" active />
            <Tab label="Code" />
        </TabList>
    </div>
);

const meta = {
    title: "Components/Forms & selection/Theme Switch Preview",
    component: ThemeSwitchPreview,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "lightLabel", "darkLabel", ],
        },
    },
    args: {
        label: "Theme switch preview",
        lightLabel: "Light",
        darkLabel: "Dark",
        children: <Showcase />,
    },
    argTypes: {
        label: { control: { type: "text", }, },
        lightLabel: { control: { type: "text", }, },
        darkLabel: { control: { type: "text", }, },
        children: { control: false, },
    },
} satisfies Meta<typeof ThemeSwitchPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: (args) => (
        <div className={shell}>
            <ThemeSwitchPreview {...args}>
                <Showcase />
            </ThemeSwitchPreview>
        </div>
    ),
};

export const TwoThemes: Story = {
    render: () => (
        <div className={shell}>
            <ThemeSwitchPreview>
                <Showcase />
            </ThemeSwitchPreview>
        </div>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const light = canvasElement.querySelector('[data-theme="light"]') as Element;
        const dark = canvasElement.querySelector('[data-theme="dark"]') as Element;

        await expect(light).not.toBeNull();
        await expect(dark).not.toBeNull();
        // The same composition is mounted once per context.
        await expect(canvas.getAllByRole("button", { name: "Primary", }).length).toBe(2);
        await expect(canvas.getAllByText("Card title").length).toBe(2);
        await expect(canvasElement.querySelector('[role="switch"]')).toBeNull();
    },
};

export const Surfaces: Story = {
    render: () => (
        <div className={shell}>
            <ThemeSwitchPreview>
                <span>Body</span>
            </ThemeSwitchPreview>
        </div>
    ),
    play: async ({ canvasElement, }) => {
        // Pen `q5xZR3` block fill is `surface/raised`: white in light,
        // neutral.900 in dark.
        const light = canvasElement.querySelector(
            '[data-theme="light"] .themeSwitchPreview__surface',
        ) as Element;
        const dark = canvasElement.querySelector(
            '[data-theme="dark"] .themeSwitchPreview__surface',
        ) as Element;

        await expect(getComputedStyle(light).backgroundColor).toBe("rgb(255, 255, 255)");
        await expect(getComputedStyle(dark).backgroundColor).toBe("rgb(15, 23, 42)");
    },
};
